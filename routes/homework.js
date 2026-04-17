const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const supabase = require('../services/supabase');
const { askGroq } = require('../services/groq');
const authMiddleware = require('../middleware/auth');
const planGuard = require('../middleware/planGuard');

const upload = multer({
  dest: path.join(__dirname, '..', 'uploads'),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

router.post('/upload', authMiddleware, planGuard, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File required (PDF or image)' });

    let extractedText = '';

    if (req.file.mimetype === 'application/pdf') {
      const pdfParse = require('pdf-parse');
      const buffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else {
      extractedText = req.body.extractedText || '[Image uploaded — text extracted on client side]';
    }

    fs.unlinkSync(req.file.path);

    const { data: hw, error: hwError } = await supabase.from('homework').insert({
      student_id: req.user.id,
      title: req.body.title || 'Homework ' + new Date().toLocaleDateString('en-IN'),
      language: req.student.language,
      class: req.student.class,
      status: 'submitted'
    }).select().single();

    if (hwError) return res.status(400).json({ error: hwError.message });

    const aiFeedback = await askGroq([
      { role: 'system', content: `You are a CBSE ${req.student.language} teacher for Class ${req.student.class}. A student has submitted homework. Analyze their answers carefully.

For each question/answer:
1. Check if the answer is correct
2. If WRONG: explain the error gently, show the correct answer, and give ONE similar practice question
3. If CORRECT: praise briefly and mention any small improvement possible
4. Give an overall score out of 10

Return JSON format:
{"questions": [{"question": "...", "studentAnswer": "...", "isCorrect": true/false, "feedback": "...", "correctAnswer": "...", "practiceQuestion": "..."}], "overallScore": 8, "encouragement": "...", "weakAreas": ["area1"]}` },
      { role: 'user', content: `Here is the student's homework:\n\n${extractedText}` }
    ], { max_tokens: 3000 });

    let feedback;
    try {
      const jsonMatch = aiFeedback.match(/\{[\s\S]*\}/);
      feedback = JSON.parse(jsonMatch[0]);
    } catch {
      feedback = { raw: aiFeedback, overallScore: null };
    }

    const { error: subError } = await supabase.from('submissions').insert({
      homework_id: hw.id,
      student_id: req.user.id,
      extracted_text: extractedText,
      ai_feedback: feedback,
      score: feedback.overallScore || null
    });

    if (subError) return res.status(400).json({ error: subError.message });

    await supabase.from('homework').update({ status: 'graded' }).eq('id', hw.id);

    const xp = (feedback.overallScore || 5) * 3;
    await supabase.from('students').update({
      total_xp: (req.student.total_xp || 0) + xp
    }).eq('id', req.user.id);

    res.json({ feedback, xpEarned: xp, homeworkId: hw.id });
  } catch (err) {
    if (req.file?.path) try { fs.unlinkSync(req.file.path); } catch {}
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const { data: homeworks } = await supabase
      .from('homework')
      .select('*, submissions(*)')
      .eq('student_id', req.user.id)
      .order('assigned_date', { ascending: false });

    res.json({ homeworks: homeworks || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/feedback', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .eq('homework_id', req.params.id)
      .eq('student_id', req.user.id)
      .single();

    res.json({ submission: data || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

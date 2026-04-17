const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
  getTextbooksForClass,
  getBoardPattern,
  extractFromText,
  generateLearningPath,
  saveUserTextbook,
  getUserTextbook,
  generateBoardPaper
} = require('../services/textbookExtractor');

const upload = multer({
  dest: path.join(__dirname, '..', 'uploads', 'textbooks'),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'];
    cb(null, allowed.includes(file.mimetype));
  }
});

router.get('/catalog', (req, res) => {
  try {
    const { language, studentClass } = req.query;
    if (!language || !studentClass) {
      return res.status(400).json({ error: 'language and studentClass required' });
    }
    const books = getTextbooksForClass(language, studentClass);
    res.json({ books, count: books.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/select', (req, res) => {
  try {
    const { email, textbookId, language, studentClass } = req.body;
    if (!email || !textbookId || !language || !studentClass) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const books = getTextbooksForClass(language, studentClass);
    const book = books.find(b => b.id === textbookId);

    if (!book) {
      return res.status(404).json({ error: 'Textbook not found in catalog' });
    }

    const learningPath = generateLearningPath(book.chapters, language, studentClass);

    const userData = {
      email,
      language,
      class: parseInt(studentClass),
      textbookId: book.id,
      textbookName: book.name,
      publisher: book.publisher,
      chapters: book.chapters,
      learningPath
    };

    saveUserTextbook(email, userData);
    res.json({ message: 'Textbook selected', data: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { email, language, studentClass, customName } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let text = '';

    if (file.mimetype === 'application/pdf') {
      try {
        const pdfParse = require('pdf-parse');
        const buffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(buffer);
        text = pdfData.text;
      } catch {
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'Could not read PDF. Please upload a clear image or type chapters manually.' });
      }
    } else if (file.mimetype === 'text/plain') {
      text = fs.readFileSync(file.path, 'utf-8');
    } else {
      fs.unlinkSync(file.path);
      return res.json({
        extracted: false,
        message: 'Image upload received. Please type your chapter names manually for best accuracy.',
        manualEntry: true
      });
    }

    fs.unlinkSync(file.path);

    if (!text.trim()) {
      return res.json({ extracted: false, message: 'Could not extract text. Please type chapters manually.', manualEntry: true });
    }

    const result = await extractFromText(text, language, studentClass);

    if (result?.chapters) {
      res.json({ extracted: true, chapters: result.chapters, customName: customName || 'Custom Textbook' });
    } else {
      res.json({ extracted: false, message: 'AI could not parse the content. Please type chapters manually.', manualEntry: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/confirm-custom', (req, res) => {
  try {
    const { email, language, studentClass, customName, chapters } = req.body;
    if (!email || !language || !studentClass || !chapters?.length) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const learningPath = generateLearningPath(chapters, language, studentClass);

    const userData = {
      email,
      language,
      class: parseInt(studentClass),
      textbookId: 'custom',
      textbookName: customName || 'Custom Textbook',
      publisher: 'Custom',
      chapters,
      learningPath
    };

    saveUserTextbook(email, userData);
    res.json({ message: 'Custom textbook saved', data: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/my-path', (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const data = getUserTextbook(email);
    if (!data) return res.json({ found: false });
    res.json({ found: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/board-pattern', (req, res) => {
  try {
    const { language } = req.query;
    const pattern = getBoardPattern(language || 'french');
    res.json({ pattern });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/generate-board-paper', async (req, res) => {
  try {
    const { language, studentClass, textbookId, examType } = req.body;
    if (!language || !studentClass) {
      return res.status(400).json({ error: 'language and studentClass required' });
    }

    const paper = await generateBoardPaper(language, studentClass, textbookId || '', examType || 'annual');

    if (paper) {
      res.json({ success: true, paper });
    } else {
      res.json({ success: false, error: 'Could not generate paper. Try again.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const { askGroq } = require('./groq');
const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'data', 'textbook-catalog.json');
const userDir = path.join(__dirname, '..', 'data', 'user-textbooks');

function getCatalog() {
  return JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
}

function getTextbooksForClass(language, studentClass) {
  const catalog = getCatalog();
  const langData = catalog[language];
  if (!langData) return [];
  return langData[String(studentClass)] || [];
}

function getBoardPattern(language) {
  const catalog = getCatalog();
  return catalog._boardPattern?.[language] || catalog._boardPattern?.french;
}

async function extractFromText(text, language, studentClass) {
  const prompt = `You are analyzing a table of contents from a ${language} textbook for CBSE Class ${studentClass}.
Extract all chapter names and their key topics from this text.
Return ONLY valid JSON in this exact format:
{"chapters": [{"number": 1, "title": "Chapter title here", "topics": ["topic1", "topic2"]}]}

Text:
${text.slice(0, 3000)}`;

  try {
    const result = await askGroq([{ role: 'user', content: prompt }], { temperature: 0.3, max_tokens: 2048 });
    const match = result.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return null;
  } catch (err) {
    console.error('AI extraction failed:', err.message);
    return null;
  }
}

function generateLearningPath(chapters, language, studentClass) {
  const isBoard = parseInt(studentClass) === 10;
  const examSchedule = isBoard
    ? [
        { name: 'UT1', month: 'July', chaptersRatio: 0.2 },
        { name: 'UT2', month: 'September', chaptersRatio: 0.4 },
        { name: 'Half-Yearly', month: 'December', chaptersRatio: 0.7 },
        { name: 'Pre-Board', month: 'January', chaptersRatio: 0.9 },
        { name: 'Board Exam', month: 'March', chaptersRatio: 1.0 }
      ]
    : [
        { name: 'UT1', month: 'July', chaptersRatio: 0.25 },
        { name: 'UT2', month: 'September', chaptersRatio: 0.5 },
        { name: 'Half-Yearly', month: 'December', chaptersRatio: 0.75 },
        { name: 'Annual', month: 'March', chaptersRatio: 1.0 }
      ];

  const total = chapters.length;
  const pathItems = chapters.map((ch, idx) => {
    const progress = (idx + 1) / total;
    const targetExam = examSchedule.find(e => progress <= e.chaptersRatio) || examSchedule[examSchedule.length - 1];
    return {
      week: idx + 1,
      chapter: ch.title,
      chapterNumber: ch.number,
      topics: ch.topics || [],
      targetExam: targetExam.name,
      targetMonth: targetExam.month,
      status: 'not_started'
    };
  });

  return { path: pathItems, examSchedule, isBoard };
}

function saveUserTextbook(email, data) {
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
  const hash = Buffer.from(email).toString('base64url').slice(0, 20);
  const filePath = path.join(userDir, `${hash}.json`);
  data.savedAt = new Date().toISOString();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return filePath;
}

function getUserTextbook(email) {
  const hash = Buffer.from(email).toString('base64url').slice(0, 20);
  const filePath = path.join(userDir, `${hash}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

async function generateBoardPaper(language, studentClass, textbookId, examType) {
  const catalog = getCatalog();
  const boardPattern = getBoardPattern(language);
  if (!boardPattern) return null;

  let textbookChapters = [];
  const langBooks = catalog[language]?.[String(studentClass)] || [];
  const book = langBooks.find(b => b.id === textbookId);
  if (book) textbookChapters = book.chapters;

  const chapterList = textbookChapters.map(c => `${c.number}. ${c.title} (${c.topics.join(', ')})`).join('\n');
  const langNames = { french: 'French', german: 'German', sanskrit: 'Sanskrit', spanish: 'Spanish', japanese: 'Japanese', korean: 'Korean', mandarin: 'Mandarin', russian: 'Russian' };
  const langName = langNames[language] || language;

  const isAnnual = examType === 'annual' || examType === 'board';
  const totalMarks = isAnnual ? 80 : (examType === 'half_yearly' ? 40 : 20);

  const prompt = `Generate a CBSE ${examType === 'board' ? 'Board Exam' : examType.replace('_', ' ')} paper for ${langName}, Class ${studentClass}.
Total marks: ${totalMarks}. Follow exact CBSE pattern.

${isAnnual ? `Paper has 4 sections:
Section A - Reading (unseen passage + MCQs): ${boardPattern.sections[0].marks} marks
Section B - Writing (letter/essay/dialogue): ${boardPattern.sections[1].marks} marks
Section C - Grammar (fill-ins, conjugation, transformation): ${boardPattern.sections[2].marks} marks
Section D - Literature (from student's textbook chapters): ${boardPattern.sections[3].marks} marks` : `
Generate ${totalMarks} marks worth of questions mixing MCQs, short answers, and grammar.`}

${chapterList ? `Student's textbook chapters for Section D:\n${chapterList}` : 'Use CBSE common syllabus topics.'}

Return valid JSON:
{
  "title": "paper title",
  "totalMarks": ${totalMarks},
  "sections": [
    {
      "name": "section name",
      "marks": number,
      "questions": [
        {
          "number": 1,
          "text": "question text in ${langName}",
          "type": "mcq|short|long|passage",
          "marks": number,
          "options": ["a","b","c","d"] (only for mcq),
          "answer": "correct answer",
          "skill": "grammar|reading|writing|literature"
        }
      ]
    }
  ]
}`;

  try {
    const result = await askGroq([{ role: 'user', content: prompt }], { temperature: 0.7, max_tokens: 4096 });
    const match = result.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return null;
  } catch (err) {
    console.error('Board paper generation failed:', err.message);
    return null;
  }
}

module.exports = {
  getCatalog,
  getTextbooksForClass,
  getBoardPattern,
  extractFromText,
  generateLearningPath,
  saveUserTextbook,
  getUserTextbook,
  generateBoardPaper
};

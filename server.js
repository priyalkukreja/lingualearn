require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/homework', require('./routes/homework'));
app.use('/api/exam', require('./routes/exam'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/pricing', require('./routes/pricing'));
app.use('/api/writing', require('./routes/writing'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/weakness', require('./routes/weakness'));
app.use('/api/textbook', require('./routes/textbook'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'signup.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'student-dashboard.html'));
});

app.get('/tutor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'ai-tutor.html'));
});

app.get('/my-homework', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'homework.html'));
});

app.get('/exam-prep', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'exam-prep.html'));
});

app.get('/voice-lab', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'voice-lab.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'pricing.html'));
});

app.get('/writing-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'writing-test.html'));
});

app.get('/weakness', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'weakness-dashboard.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'signup.html'));
});

app.get('/quiz-battle', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'quiz-battle.html'));
});

app.get('/mock-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'mock-test.html'));
});

app.get('/onboarding', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'onboarding.html'));
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`LinguaLearn server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

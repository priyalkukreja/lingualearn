/**
 * CBSE Complete Syllabus Data
 * Per language → per class → full year breakdown
 * Includes: chapters, topics, exam mapping, marks weightage
 *
 * Exam types: ut1, ut2, half_yearly, annual
 * Sections: reading, writing, grammar, literature
 */

const CBSE_SYLLABUS = {
  french: {
    6: {
      book: 'Entre Jeunes (or school-prescribed)',
      totalMarks: 80,
      sections: [
        {
          name: 'Comprehension (Reading)',
          marks: 10,
          exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Unseen Passage (Compréhension écrite)', marks: 5, exam: 'all', description: 'Read a short French passage and answer questions' },
            { name: 'True/False & MCQ from passage', marks: 5, exam: 'all', description: 'Identify correct statements from the text' },
          ]
        },
        {
          name: 'Writing (Expression écrite)',
          marks: 15,
          exams: ['half_yearly', 'annual'],
          topics: [
            { name: 'Informal Letter (to friend/family)', marks: 5, exam: 'half_yearly,annual', description: 'Write a letter inviting a friend, describing your day, etc.' },
            { name: 'Short Paragraph (40-50 words)', marks: 5, exam: 'all', description: 'Describe yourself, your school, your family' },
            { name: 'Dialogue Completion', marks: 5, exam: 'annual', description: 'Complete a conversation between two people' },
          ]
        },
        {
          name: 'Grammar (Grammaire)',
          marks: 30,
          exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Articles (le, la, les, un, une, des)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Definite and indefinite articles with gender' },
            { name: 'Subject Pronouns (je, tu, il...)', marks: 3, exam: 'ut1,half_yearly,annual', description: 'Personal pronouns and their usage' },
            { name: 'Verb Être (to be) conjugation', marks: 5, exam: 'ut1,half_yearly,annual', description: 'suis, es, est, sommes, êtes, sont' },
            { name: 'Verb Avoir (to have) conjugation', marks: 5, exam: 'ut2,half_yearly,annual', description: 'ai, as, a, avons, avez, ont' },
            { name: 'Adjective Agreement (gender/number)', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Adjectives must match noun gender and number' },
            { name: 'Negation (ne...pas)', marks: 3, exam: 'ut2,annual', description: 'Making sentences negative' },
            { name: 'Question Formation', marks: 3, exam: 'annual', description: 'Est-ce que, inversion, intonation' },
            { name: 'Prepositions (à, de, en, dans)', marks: 2, exam: 'annual', description: 'Location and direction prepositions' },
          ]
        },
        {
          name: 'Literature / Textbook (Leçons)',
          marks: 25,
          exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Leçon 0 — Bonjour! (Greetings & Alphabet)', marks: 5, exam: 'ut1', description: 'French alphabet, greetings, classroom phrases' },
            { name: 'Leçon 1 — La famille (Family)', marks: 5, exam: 'ut1,half_yearly', description: 'Family members, possessive adjectives' },
            { name: 'Leçon 2 — Au lycée (At school)', marks: 5, exam: 'ut2,half_yearly', description: 'School vocabulary, classroom objects' },
            { name: 'Leçon 3 — Les copains (Friends)', marks: 5, exam: 'ut2,half_yearly', description: 'Describing people, adjectives of appearance' },
            { name: 'Leçon 4 — Les activités (Activities)', marks: 5, exam: 'annual', description: 'Hobbies, daily activities, -er verbs' },
          ]
        }
      ]
    },
    7: {
      book: 'Entre Jeunes / Apprenons le français',
      totalMarks: 80,
      sections: [
        {
          name: 'Comprehension', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Longer passages with vocabulary questions' },
            { name: 'Passage-based MCQs', marks: 5, exam: 'all', description: 'Comprehension and inference questions' },
          ]
        },
        {
          name: 'Writing', marks: 15, exams: ['half_yearly', 'annual'],
          topics: [
            { name: 'Informal Letter', marks: 5, exam: 'half_yearly,annual', description: 'Letter about vacation, birthday, school trip' },
            { name: 'Paragraph Writing (60-80 words)', marks: 5, exam: 'all', description: 'My routine, my city, a festival' },
            { name: 'Dialogue Writing', marks: 5, exam: 'annual', description: 'At a shop, at school, meeting a friend' },
          ]
        },
        {
          name: 'Grammar', marks: 30, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Possessive Adjectives (mon, ma, mes...)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'My, your, his/her with gender agreement' },
            { name: 'Futur Proche (aller + infinitive)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Near future tense: je vais manger' },
            { name: 'Pronoms Personnels (COD)', marks: 4, exam: 'ut2,half_yearly,annual', description: 'me, te, le, la, nous, vous, les' },
            { name: 'Passé Composé with Avoir', marks: 5, exam: 'ut2,annual', description: "j'ai mangé, tu as fini, il a pris" },
            { name: 'Passé Composé with Être (DR MRS VANDERTRAMP)', marks: 5, exam: 'annual', description: 'Verbs of motion: allé, venu, parti...' },
            { name: 'Adverbs of Frequency', marks: 3, exam: 'half_yearly,annual', description: 'toujours, souvent, parfois, jamais' },
            { name: 'Imperative Mood', marks: 4, exam: 'annual', description: 'Commands: Mange!, Allons!, Finissez!' },
          ]
        },
        {
          name: 'Literature', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Leçon 0 — Révision', marks: 5, exam: 'ut1', description: 'Review of Class 6 basics' },
            { name: 'Leçon 1 — Faisons connaissance', marks: 5, exam: 'ut1,half_yearly', description: 'Getting to know people, nationalities' },
            { name: 'Leçon 2 — Ma famille', marks: 5, exam: 'ut2,half_yearly', description: 'Extended family, professions' },
            { name: 'Leçon 3 — Au restaurant', marks: 5, exam: 'ut2,half_yearly', description: 'Food vocabulary, ordering, partitive articles' },
            { name: 'Leçon 4-5 — Les vacances', marks: 5, exam: 'annual', description: 'Holidays, travel, past tense in context' },
          ]
        }
      ]
    },
    8: {
      book: 'Apprenons le français / Entre Jeunes',
      totalMarks: 80,
      sections: [
        {
          name: 'Comprehension', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Unseen Passage (Literary)', marks: 5, exam: 'all', description: 'Extract from story/article with questions' },
            { name: 'Unseen Passage (Factual)', marks: 5, exam: 'all', description: 'Information-based passage with MCQs' },
          ]
        },
        {
          name: 'Writing', marks: 20, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Formal Letter', marks: 5, exam: 'half_yearly,annual', description: 'To principal, to editor, complaint letter' },
            { name: 'Informal Letter', marks: 5, exam: 'ut1,ut2,half_yearly,annual', description: 'To friend about trip, festival, school event' },
            { name: 'Essay (120-150 words)', marks: 5, exam: 'annual', description: 'My ideal day, Technology, Environment' },
            { name: 'Dialogue / Message / Notice', marks: 5, exam: 'half_yearly,annual', description: 'Practical writing tasks' },
          ]
        },
        {
          name: 'Grammar', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Passé Composé (revision + irregular)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'All verbs including irregular past participles' },
            { name: 'Imparfait (Imperfect tense)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Descriptions in past, habitual actions' },
            { name: 'Passé Composé vs Imparfait', marks: 3, exam: 'annual', description: 'When to use which past tense' },
            { name: 'Pronoms COD (Direct Object)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'le, la, les replacing nouns' },
            { name: 'Pronoms COI (Indirect Object)', marks: 4, exam: 'ut2,annual', description: 'lui, leur' },
            { name: 'Futur Simple', marks: 4, exam: 'annual', description: 'je mangerai, tu finiras, il ira' },
          ]
        },
        {
          name: 'Literature', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Leçon 0 — Révision CE1', marks: 5, exam: 'ut1', description: 'Review of previous year' },
            { name: 'Leçon 1 — La rentrée', marks: 5, exam: 'ut1,half_yearly', description: 'Back to school, daily life' },
            { name: 'Leçon 2 — Vive les vacances', marks: 5, exam: 'ut2,half_yearly', description: 'Vacations, travel stories' },
            { name: 'Leçon 3 — Une journée de Pauline', marks: 5, exam: 'ut2,half_yearly', description: 'Daily routine, reflexive verbs' },
            { name: 'Leçon 4-6', marks: 5, exam: 'annual', description: 'Culture, advanced vocabulary' },
          ]
        }
      ]
    },
    9: {
      book: 'Apprenons le français (Part 4)',
      totalMarks: 80,
      sections: [
        {
          name: 'Comprehension', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Unseen Literary Passage', marks: 5, exam: 'all', description: 'Story extract with advanced vocabulary' },
            { name: 'Unseen Factual Passage', marks: 5, exam: 'all', description: 'Article/report with inference questions' },
          ]
        },
        {
          name: 'Writing', marks: 20, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Formal Letter (Board pattern)', marks: 5, exam: 'half_yearly,annual', description: 'Application, complaint, request letter' },
            { name: 'Essay / Article (150-200 words)', marks: 5, exam: 'annual', description: 'Social issues, environment, technology' },
            { name: 'Dialogue Writing', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Situational conversations' },
            { name: 'Message / Email / Notice', marks: 5, exam: 'ut1,annual', description: 'Short functional writing' },
          ]
        },
        {
          name: 'Grammar', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Pronoms Relatifs (qui, que, où)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Relative pronouns connecting clauses' },
            { name: 'Pronoms EN and Y', marks: 4, exam: 'ut2,half_yearly,annual', description: 'EN for quantity, Y for place' },
            { name: 'Plus-que-parfait', marks: 4, exam: 'ut2,annual', description: 'Pluperfect: had done' },
            { name: 'Conditionnel Présent', marks: 4, exam: 'annual', description: 'Would do: je mangerais, j\'irais' },
            { name: 'Subjonctif (introduction)', marks: 5, exam: 'annual', description: 'After il faut que, je veux que' },
            { name: 'Revision of all tenses', marks: 4, exam: 'annual', description: 'Present, PC, Imparfait, Futur, Conditionnel' },
          ]
        },
        {
          name: 'Literature', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Leçon 1 — Révision & new themes', marks: 6, exam: 'ut1,half_yearly', description: 'Review + new vocabulary themes' },
            { name: 'Leçon 2-3', marks: 6, exam: 'ut2,half_yearly', description: 'Cultural readings, advanced dialogues' },
            { name: 'Leçon 4-5', marks: 6, exam: 'annual', description: 'Literature pieces, poems' },
            { name: 'Full textbook revision', marks: 7, exam: 'annual', description: 'All chapters for board-pattern questions' },
          ]
        }
      ]
    },
    10: {
      book: 'Apprenons le français (Part 5) — Board Year',
      totalMarks: 80,
      sections: [
        {
          name: 'Comprehension', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Unseen Passage I (Literary)', marks: 5, exam: 'all', description: 'Board-level literary extract' },
            { name: 'Unseen Passage II (Factual)', marks: 5, exam: 'all', description: 'Board-level information passage' },
          ]
        },
        {
          name: 'Writing', marks: 20, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Formal/Informal Letter (Board)', marks: 5, exam: 'all', description: 'Board-pattern letter writing' },
            { name: 'Essay (200 words)', marks: 5, exam: 'half_yearly,annual', description: 'Board-level essay topics' },
            { name: 'Dialogue Completion (Board)', marks: 5, exam: 'all', description: 'Complete 6-8 line dialogue' },
            { name: 'Notice/Message/Email', marks: 5, exam: 'annual', description: 'Functional writing tasks' },
          ]
        },
        {
          name: 'Grammar', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'All Tenses Revision', marks: 5, exam: 'all', description: 'Present, PC, Imparfait, Futur, Conditionnel, PQP' },
            { name: 'Pronoms (all types)', marks: 5, exam: 'all', description: 'COD, COI, EN, Y, Relatifs' },
            { name: 'Voix Passive', marks: 3, exam: 'ut2,annual', description: 'Active to passive transformation' },
            { name: 'Discours Indirect', marks: 4, exam: 'annual', description: 'Reported speech' },
            { name: 'Subjonctif (full)', marks: 4, exam: 'annual', description: 'All subjunctive triggers and conjugation' },
            { name: 'Board Pattern Practice', marks: 4, exam: 'annual', description: 'Previous year board grammar questions' },
          ]
        },
        {
          name: 'Literature', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'Textbook Lessons 1-3', marks: 8, exam: 'ut1,ut2,half_yearly', description: 'Prose and dialogues' },
            { name: 'Textbook Lessons 4-6', marks: 8, exam: 'half_yearly,annual', description: 'Advanced prose' },
            { name: 'Poetry / Poems', marks: 5, exam: 'annual', description: 'Poem appreciation and questions' },
            { name: 'Full Literature Revision', marks: 4, exam: 'annual', description: 'Board-pattern literature questions' },
          ]
        }
      ]
    }
  },

  sanskrit: {
    6: {
      book: 'रुचिरा (प्रथम भाग)',
      totalMarks: 80,
      sections: [
        {
          name: 'अपठित अवबोधनम् (Unseen Comprehension)', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'अपठित गद्यांश (Unseen Prose)', marks: 5, exam: 'all', description: 'Read a passage and answer in Sanskrit' },
            { name: 'चित्र वर्णनम् (Picture Description)', marks: 5, exam: 'all', description: 'Describe a picture in Sanskrit sentences' },
          ]
        },
        {
          name: 'रचनात्मक कार्यम् (Writing)', marks: 15, exams: ['half_yearly', 'annual'],
          topics: [
            { name: 'पत्र लेखनम् (Letter Writing)', marks: 5, exam: 'half_yearly,annual', description: 'Formal/informal letter in Sanskrit' },
            { name: 'अनुच्छेद लेखनम् (Paragraph)', marks: 5, exam: 'all', description: '5-6 sentences on a topic' },
            { name: 'संवाद लेखनम् (Dialogue)', marks: 5, exam: 'annual', description: 'Conversation between two people' },
          ]
        },
        {
          name: 'व्याकरणम् (Grammar)', marks: 30, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'वर्णमाला & उच्चारण (Alphabet)', marks: 3, exam: 'ut1', description: 'Sanskrit alphabet, vowels, consonants' },
            { name: 'शब्द रूप — अकारान्त पुल्लिंग (राम)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Declension of masculine nouns ending in अ' },
            { name: 'शब्द रूप — आकारान्त स्त्रीलिंग (लता)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Declension of feminine nouns ending in आ' },
            { name: 'धातु रूप — लट् लकार (Present)', marks: 5, exam: 'ut1,ut2,half_yearly,annual', description: 'पठति, गच्छति, लिखति — present tense' },
            { name: 'धातु रूप — लृट् लकार (Future)', marks: 4, exam: 'annual', description: 'पठिष्यति — future tense forms' },
            { name: 'संख्या (Numbers 1-20)', marks: 3, exam: 'ut2,annual', description: 'एकम्, द्वे, त्रीणि...' },
            { name: 'अव्यय (Indeclinables)', marks: 3, exam: 'annual', description: 'अपि, एव, च, वा, सह, विना' },
            { name: 'विभक्ति पहचान (Case identification)', marks: 2, exam: 'half_yearly,annual', description: 'Identify which vibhakti is used' },
          ]
        },
        {
          name: 'पाठ्य पुस्तकम् (Textbook)', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'पाठ 1-3 (Lessons 1-3)', marks: 8, exam: 'ut1,half_yearly', description: 'शब्द परिचय, वाक्य निर्माण' },
            { name: 'पाठ 4-6 (Lessons 4-6)', marks: 8, exam: 'ut2,half_yearly', description: 'Stories and conversations' },
            { name: 'पाठ 7-10 (Lessons 7-10)', marks: 9, exam: 'annual', description: 'Advanced lessons, revision' },
          ]
        }
      ]
    },
    7: {
      book: 'रुचिरा (द्वितीय भाग)',
      totalMarks: 80,
      sections: [
        {
          name: 'अपठित अवबोधनम्', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'अपठित गद्यांश', marks: 5, exam: 'all', description: 'Unseen prose comprehension' },
            { name: 'अपठित पद्यांश / चित्र वर्णन', marks: 5, exam: 'all', description: 'Unseen poetry or picture description' },
          ]
        },
        {
          name: 'रचनात्मक कार्यम्', marks: 15, exams: ['half_yearly', 'annual'],
          topics: [
            { name: 'पत्र लेखनम्', marks: 5, exam: 'half_yearly,annual', description: 'Letter to friend/principal' },
            { name: 'निबंध / अनुच्छेद (Essay)', marks: 5, exam: 'annual', description: '8-10 sentences on a topic' },
            { name: 'संवाद लेखनम्', marks: 5, exam: 'annual', description: 'गुरु-शिष्य, मित्र-मित्र dialogue' },
          ]
        },
        {
          name: 'व्याकरणम्', marks: 30, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'नपुंसकलिंग शब्द रूप (फल)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Neuter gender declension' },
            { name: 'लङ् लकार (Past tense)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'अपठत्, अगच्छत् — past tense' },
            { name: 'विभक्ति — तृतीया & चतुर्थी', marks: 4, exam: 'ut1,ut2,half_yearly,annual', description: '3rd and 4th case usage' },
            { name: 'गुण संधि (अ+इ=ए)', marks: 5, exam: 'ut2,annual', description: 'Guna sandhi rules' },
            { name: 'दीर्घ संधि (अ+अ=आ)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Deergh sandhi rules' },
            { name: 'सर्वनाम (Pronouns — तत्, यत्, किम्)', marks: 4, exam: 'annual', description: 'Pronoun declension' },
            { name: 'उपसर्ग (Prefixes)', marks: 4, exam: 'annual', description: 'प्र, परा, अप, अनु, उप, etc.' },
          ]
        },
        {
          name: 'पाठ्य पुस्तकम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'],
          topics: [
            { name: 'पाठ 1-4', marks: 8, exam: 'ut1,half_yearly', description: 'Prose lessons with vocabulary' },
            { name: 'पाठ 5-8', marks: 8, exam: 'ut2,half_yearly', description: 'Stories and shlokas' },
            { name: 'पाठ 9-12', marks: 9, exam: 'annual', description: 'Full book revision' },
          ]
        }
      ]
    },
    8: {
      book: 'रुचिरा (तृतीय भाग)',
      totalMarks: 80,
      sections: [
        { name: 'अपठित अवबोधनम्', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'अपठित गद्यांश', marks: 5, exam: 'all', description: 'Advanced prose comprehension' },
          { name: 'अपठित पद्यांश', marks: 5, exam: 'all', description: 'Poetry comprehension' },
        ]},
        { name: 'रचनात्मक कार्यम्', marks: 20, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'पत्र लेखनम् (Formal + Informal)', marks: 5, exam: 'half_yearly,annual', description: 'Both types of letters' },
          { name: 'निबंध लेखनम्', marks: 5, exam: 'annual', description: 'Essay on given topic' },
          { name: 'अनुवाद (Hindi to Sanskrit)', marks: 5, exam: 'ut2,annual', description: 'Translation of 5 sentences' },
          { name: 'संवाद / चित्र वर्णन', marks: 5, exam: 'half_yearly,annual', description: 'Dialogue or picture description' },
        ]},
        { name: 'व्याकरणम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'लोट् लकार (Imperative)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Command forms: पठतु, गच्छतु' },
          { name: 'विधिलिङ् लकार (Should)', marks: 4, exam: 'ut2,half_yearly,annual', description: 'पठेत्, गच्छेत् — should forms' },
          { name: 'वृद्धि संधि (आ+इ=ऐ)', marks: 4, exam: 'ut1,annual', description: 'Vriddhi sandhi rules' },
          { name: 'यण् संधि (इ+अ=य)', marks: 4, exam: 'ut2,annual', description: 'Yan sandhi rules' },
          { name: 'समास (Compound words)', marks: 5, exam: 'annual', description: 'तत्पुरुष, कर्मधारय, द्वन्द्व' },
          { name: 'प्रत्यय (Suffixes)', marks: 4, exam: 'annual', description: 'क्त, क्तवतु, तुमुन्, क्त्वा' },
        ]},
        { name: 'पाठ्य पुस्तकम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'पाठ 1-4', marks: 8, exam: 'ut1,half_yearly', description: 'Prose and poetry' },
          { name: 'पाठ 5-8', marks: 8, exam: 'ut2,half_yearly', description: 'Advanced stories' },
          { name: 'पाठ 9-12 + Revision', marks: 9, exam: 'annual', description: 'Full syllabus' },
        ]}
      ]
    },
    9: {
      book: 'शेमुषी (प्रथम भाग) + व्याकरण वीथिः',
      totalMarks: 80,
      sections: [
        { name: 'अपठित अवबोधनम्', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'अपठित गद्यांश (Board pattern)', marks: 5, exam: 'all', description: 'Board-level unseen prose' },
          { name: 'अपठित पद्यांश (Board pattern)', marks: 5, exam: 'all', description: 'Board-level unseen poetry' },
        ]},
        { name: 'रचनात्मक कार्यम्', marks: 20, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'पत्र लेखनम् (Board pattern)', marks: 5, exam: 'all', description: 'Board-style formal/informal letter' },
          { name: 'अनुच्छेद / निबंध', marks: 5, exam: 'half_yearly,annual', description: 'Essay in Sanskrit' },
          { name: 'अनुवाद (5 sentences)', marks: 5, exam: 'annual', description: 'Hindi to Sanskrit translation' },
          { name: 'संवाद / चित्र वर्णन', marks: 5, exam: 'annual', description: 'Dialogue or picture writing' },
        ]},
        { name: 'व्याकरणम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'कर्मवाच्य (Passive Voice)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Active to passive transformation' },
          { name: 'भाववाच्य (Impersonal)', marks: 4, exam: 'ut2,annual', description: 'Impersonal passive voice' },
          { name: 'बहुव्रीहि समास', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Bahuvrihi compound words' },
          { name: 'तुमुन् & क्त्वा प्रत्यय', marks: 4, exam: 'ut1,annual', description: 'Infinitive and absolutive suffixes' },
          { name: 'सभी संधि (All Sandhi)', marks: 4, exam: 'annual', description: 'Complete sandhi revision' },
          { name: 'सभी लकार (All tenses)', marks: 4, exam: 'annual', description: 'लट्, लृट्, लङ्, लोट्, विधिलिङ्' },
        ]},
        { name: 'पाठ्य पुस्तकम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'शेमुषी पाठ 1-4', marks: 8, exam: 'ut1,half_yearly', description: 'Board textbook lessons' },
          { name: 'शेमुषी पाठ 5-7', marks: 8, exam: 'ut2,half_yearly', description: 'Prose and poetry' },
          { name: 'शेमुषी पाठ 8-10 + Full revision', marks: 9, exam: 'annual', description: 'Complete board preparation' },
        ]}
      ]
    },
    10: {
      book: 'शेमुषी (द्वितीय भाग) + व्याकरण वीथिः — BOARD YEAR',
      totalMarks: 80,
      sections: [
        { name: 'अपठित अवबोधनम्', marks: 10, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'अपठित गद्यांश (Board)', marks: 5, exam: 'all', description: 'Previous year board passages' },
          { name: 'अपठित पद्यांश (Board)', marks: 5, exam: 'all', description: 'Board-level poetry comprehension' },
        ]},
        { name: 'रचनात्मक कार्यम्', marks: 20, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'पत्र लेखनम्', marks: 5, exam: 'all', description: 'Board-pattern letters' },
          { name: 'निबंध / अनुच्छेद', marks: 5, exam: 'half_yearly,annual', description: 'Board-pattern essays' },
          { name: 'अनुवाद (Board pattern)', marks: 5, exam: 'annual', description: 'Translation as per board format' },
          { name: 'संवाद / सूचना', marks: 5, exam: 'annual', description: 'Dialogue and notice writing' },
        ]},
        { name: 'व्याकरणम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'सभी वाच्य (All voices)', marks: 5, exam: 'all', description: 'कर्तृ, कर्म, भाव वाच्य' },
          { name: 'सभी समास', marks: 5, exam: 'all', description: 'All compound word types' },
          { name: 'सभी संधि', marks: 5, exam: 'all', description: 'All sandhi rules' },
          { name: 'सभी प्रत्यय', marks: 5, exam: 'annual', description: 'All suffix types' },
          { name: 'Board Pattern Grammar', marks: 5, exam: 'annual', description: 'Previous year grammar questions' },
        ]},
        { name: 'पाठ्य पुस्तकम्', marks: 25, exams: ['ut1', 'ut2', 'half_yearly', 'annual'], topics: [
          { name: 'शेमुषी — गद्य पाठ (Prose)', marks: 10, exam: 'ut1,ut2,half_yearly,annual', description: 'All prose lessons' },
          { name: 'शेमुषी — पद्य पाठ (Poetry)', marks: 8, exam: 'half_yearly,annual', description: 'All poetry with meanings' },
          { name: 'Board Pattern Questions', marks: 7, exam: 'annual', description: 'Previous year textbook questions' },
        ]}
      ]
    }
  },

  german: {
    6: { book: 'Lehrwerk (School prescribed)', totalMarks: 80, sections: [
      { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Unseen passage', marks: 5, exam: 'all', description: 'Simple passage with MCQ' },
        { name: 'Picture-based questions', marks: 5, exam: 'all', description: 'Describe or answer from picture' },
      ]},
      { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
        { name: 'Short letter/email', marks: 5, exam: 'half_yearly,annual', description: 'Informal letter to friend' },
        { name: 'Paragraph (50-60 words)', marks: 5, exam: 'all', description: 'About family, school, hobby' },
        { name: 'Dialogue completion', marks: 5, exam: 'annual', description: 'Simple daily life dialogues' },
      ]},
      { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Nominativ articles (der/die/das)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Gender of nouns + nominative' },
        { name: 'Verb conjugation (sein, haben)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'bin, bist, ist, sind + habe, hast, hat...' },
        { name: 'Akkusativ', marks: 5, exam: 'ut2,half_yearly,annual', description: 'den, die, das + direct objects' },
        { name: 'Regular verb conjugation', marks: 5, exam: 'ut1,ut2,half_yearly,annual', description: 'spielen, lernen, wohnen' },
        { name: 'Numbers, colors, days', marks: 5, exam: 'ut1,annual', description: 'Zahlen, Farben, Wochentage' },
        { name: 'W-Fragen (Question words)', marks: 5, exam: 'ut2,annual', description: 'Wer, Was, Wo, Wie, Wann' },
      ]},
      { name: 'Textbook Lessons', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Lektion 1-2 (Greetings & Family)', marks: 8, exam: 'ut1,half_yearly', description: 'Hallo, Meine Familie' },
        { name: 'Lektion 3-4 (School & Hobbies)', marks: 8, exam: 'ut2,half_yearly', description: 'Meine Schule, Freizeit' },
        { name: 'Lektion 5+ (Full book)', marks: 9, exam: 'annual', description: 'Complete textbook' },
      ]}
    ]},
    7: { book: 'Lehrwerk Level 2', totalMarks: 80, sections: [
      { name: 'Reading', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Unseen passage', marks: 5, exam: 'all', description: 'Moderate difficulty' },
        { name: 'MCQ/True-False', marks: 5, exam: 'all', description: 'From passage' },
      ]},
      { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
        { name: 'Email/Letter', marks: 5, exam: 'half_yearly,annual', description: 'To friend about vacation/hobby' },
        { name: 'Paragraph', marks: 5, exam: 'all', description: 'Daily routine, city, food' },
        { name: 'Dialogue', marks: 5, exam: 'annual', description: 'At restaurant, asking directions' },
      ]},
      { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Trennbare Verben', marks: 5, exam: 'ut1,half_yearly,annual', description: 'aufstehen, einkaufen, fernsehen' },
        { name: 'Modalverben', marks: 5, exam: 'ut2,half_yearly,annual', description: 'können, müssen, dürfen, wollen' },
        { name: 'Perfekt (Past tense)', marks: 5, exam: 'ut2,annual', description: 'haben/sein + Partizip II' },
        { name: 'Dativ introduction', marks: 5, exam: 'annual', description: 'dem, der, dem + dative verbs' },
        { name: 'Prepositions with Akk/Dat', marks: 5, exam: 'annual', description: 'für, gegen, ohne + in, mit, von' },
        { name: 'Word order (Satzklammer)', marks: 5, exam: 'half_yearly,annual', description: 'Verb position rules' },
      ]},
      { name: 'Textbook', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Lektion 1-3', marks: 8, exam: 'ut1,half_yearly', description: 'Review + new topics' },
        { name: 'Lektion 4-6', marks: 8, exam: 'ut2,half_yearly', description: 'Daily life, food, transport' },
        { name: 'Full book', marks: 9, exam: 'annual', description: 'All lessons' },
      ]}
    ]},
    8: { book: 'Lehrwerk Level 3', totalMarks: 80, sections: [
      { name: 'Reading', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Unseen Passage I', marks: 5, exam: 'all', description: 'Narrative passage' },
        { name: 'Unseen Passage II', marks: 5, exam: 'all', description: 'Factual/information text' },
      ]},
      { name: 'Writing', marks: 20, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Formal Email', marks: 5, exam: 'half_yearly,annual', description: 'To hotel, school, office' },
        { name: 'Informal Letter', marks: 5, exam: 'all', description: 'To friend/family' },
        { name: 'Essay (100-120 words)', marks: 5, exam: 'annual', description: 'My dream, environment, hobby' },
        { name: 'Dialogue', marks: 5, exam: 'half_yearly,annual', description: 'Situational dialogues' },
      ]},
      { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Dativ (full)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'All dative usage' },
        { name: 'Perfekt (all verbs)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Regular and irregular' },
        { name: 'Nebensätze (weil, dass, ob)', marks: 5, exam: 'ut2,annual', description: 'Subordinate clauses' },
        { name: 'Wechselpräpositionen', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Two-way prepositions' },
        { name: 'Komparativ & Superlativ', marks: 5, exam: 'annual', description: 'Comparison of adjectives' },
      ]},
      { name: 'Textbook', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Lektion 1-3', marks: 8, exam: 'ut1,half_yearly', description: 'Prose lessons' },
        { name: 'Lektion 4-6', marks: 8, exam: 'ut2,half_yearly', description: 'Advanced themes' },
        { name: 'Full book + revision', marks: 9, exam: 'annual', description: 'Complete syllabus' },
      ]}
    ]},
    9: { book: 'Lehrwerk Advanced', totalMarks: 80, sections: [
      { name: 'Reading', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Unseen Passage (Literary)', marks: 5, exam: 'all', description: 'Board-level reading' },
        { name: 'Unseen Passage (Factual)', marks: 5, exam: 'all', description: 'Information-based text' },
      ]},
      { name: 'Writing', marks: 20, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Formal Letter (Board)', marks: 5, exam: 'all', description: 'Board pattern' },
        { name: 'Essay (150 words)', marks: 5, exam: 'half_yearly,annual', description: 'Advanced topics' },
        { name: 'Dialogue/Email', marks: 5, exam: 'annual', description: 'Practical writing' },
        { name: 'Report/Notice', marks: 5, exam: 'annual', description: 'Functional writing' },
      ]},
      { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Genitiv', marks: 4, exam: 'ut1,half_yearly,annual', description: '4th case' },
        { name: 'Konjunktiv II', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Subjunctive mood' },
        { name: 'Passiv', marks: 5, exam: 'ut2,annual', description: 'Passive voice' },
        { name: 'Relativsätze', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Relative clauses' },
        { name: 'Indirekte Rede', marks: 3, exam: 'annual', description: 'Reported speech' },
        { name: 'All cases revision', marks: 3, exam: 'annual', description: 'Nom/Akk/Dat/Gen' },
      ]},
      { name: 'Textbook', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Lektion 1-3', marks: 8, exam: 'ut1,half_yearly', description: 'Advanced prose' },
        { name: 'Lektion 4-6', marks: 8, exam: 'ut2,half_yearly', description: 'Literature + culture' },
        { name: 'Full revision', marks: 9, exam: 'annual', description: 'Board preparation' },
      ]}
    ]},
    10: { book: 'Lehrwerk — BOARD YEAR', totalMarks: 80, sections: [
      { name: 'Reading', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Unseen Passage I (Board)', marks: 5, exam: 'all', description: 'Board pattern' },
        { name: 'Unseen Passage II (Board)', marks: 5, exam: 'all', description: 'Board pattern' },
      ]},
      { name: 'Writing', marks: 20, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Letter (Board)', marks: 5, exam: 'all', description: 'Board-pattern letters' },
        { name: 'Essay (Board)', marks: 5, exam: 'half_yearly,annual', description: 'Board topics' },
        { name: 'Dialogue (Board)', marks: 5, exam: 'all', description: 'Board dialogues' },
        { name: 'Notice/Email', marks: 5, exam: 'annual', description: 'Functional writing' },
      ]},
      { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'All 4 Cases', marks: 5, exam: 'all', description: 'Complete case system' },
        { name: 'Konjunktiv + Passiv', marks: 5, exam: 'all', description: 'Advanced grammar' },
        { name: 'Nebensätze (all types)', marks: 5, exam: 'all', description: 'All subordinate clauses' },
        { name: 'Adjektivdeklination', marks: 5, exam: 'annual', description: 'Adjective endings' },
        { name: 'Board Grammar Practice', marks: 5, exam: 'annual', description: 'Previous year questions' },
      ]},
      { name: 'Textbook', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
        { name: 'Prose Lessons', marks: 10, exam: 'ut1,ut2,half_yearly,annual', description: 'All prose' },
        { name: 'Poetry/Culture', marks: 8, exam: 'half_yearly,annual', description: 'Poems + cultural texts' },
        { name: 'Board Pattern Questions', marks: 7, exam: 'annual', description: 'Previous year practice' },
      ]}
    ]}
  },

  spanish: {
    6: {
      book: 'Español — Libro de Texto (CBSE prescribed)',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (Comprensión lectora)', marks: 5, exam: 'all', description: 'Read a short Spanish passage and answer' },
          { name: 'True/False & MCQ', marks: 5, exam: 'all', description: 'Questions based on the passage' },
        ]},
        { name: 'Writing (Expresión escrita)', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Short Paragraph (40-50 words)', marks: 5, exam: 'all', description: 'Describe yourself, family, school' },
          { name: 'Informal Letter', marks: 5, exam: 'half_yearly,annual', description: 'Letter to a friend or family member' },
          { name: 'Dialogue Completion', marks: 5, exam: 'annual', description: 'Complete a conversation' },
        ]},
        { name: 'Grammar (Gramática)', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Articles (el, la, los, las, un, una)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Definite and indefinite articles' },
          { name: 'Subject Pronouns (yo, tú, él...)', marks: 3, exam: 'ut1,half_yearly,annual', description: 'Personal pronouns' },
          { name: 'Verb Ser/Estar (to be)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Two forms of to be and their usage' },
          { name: 'Verb Tener (to have)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Conjugation of tener' },
          { name: 'Adjective Agreement', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Gender and number agreement' },
          { name: 'Negation (no)', marks: 3, exam: 'ut2,annual', description: 'Making negative sentences' },
          { name: 'Question Words', marks: 3, exam: 'annual', description: '¿Qué? ¿Dónde? ¿Cómo? ¿Cuándo?' },
          { name: 'Prepositions (en, de, a, con)', marks: 2, exam: 'annual', description: 'Common prepositions' },
        ]},
        { name: 'Literature/Culture', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Lessons (Lecciones)', marks: 15, exam: 'all', description: 'Questions from prescribed chapters' },
          { name: 'Vocabulary & Expressions', marks: 5, exam: 'all', description: 'Key words, greetings, numbers, colours' },
          { name: 'Cultural Knowledge', marks: 5, exam: 'half_yearly,annual', description: 'Spanish-speaking countries, traditions' },
        ]}
      ]
    },
    7: {
      book: 'Español — Nivel 2',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Longer passage with inference questions' },
          { name: 'MCQ & Short Answers', marks: 5, exam: 'all', description: 'Factual and inferential questions' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Paragraph Writing (60-80 words)', marks: 5, exam: 'all', description: 'Describe daily routine, hobbies, town' },
          { name: 'Letter/Email', marks: 5, exam: 'half_yearly,annual', description: 'Informal letter or email' },
          { name: 'Dialogue/Message', marks: 5, exam: 'annual', description: 'Write a dialogue or leave a message' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Present Tense — Regular Verbs (-ar, -er, -ir)', marks: 6, exam: 'ut1,half_yearly,annual', description: 'Hablar, comer, vivir conjugation' },
          { name: 'Irregular Verbs (ir, hacer, poder)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Common irregular verb forms' },
          { name: 'Possessive Adjectives (mi, tu, su)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Showing ownership' },
          { name: 'Demonstratives (este, ese, aquel)', marks: 3, exam: 'ut2,annual', description: 'This, that, that over there' },
          { name: 'Reflexive Verbs (levantarse, llamarse)', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Daily routine verbs' },
          { name: 'Comparatives & Superlatives', marks: 4, exam: 'half_yearly,annual', description: 'más...que, menos...que, el más...' },
          { name: 'Sentence Reordering', marks: 4, exam: 'annual', description: 'Arrange words to form sentences' },
        ]},
        { name: 'Literature/Culture', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Comprehension and Q&A from lessons' },
          { name: 'Vocabulary Expansion', marks: 5, exam: 'all', description: 'Food, weather, body parts, directions' },
          { name: 'Cultural Texts', marks: 5, exam: 'half_yearly,annual', description: 'Festivals, geography, daily life in Spain/Latin America' },
        ]}
      ]
    },
    8: {
      book: 'Español — Nivel 3',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Medium-length passage with varied questions' },
          { name: 'Applied Questions', marks: 5, exam: 'all', description: 'Inference, vocabulary in context' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay/Paragraph (80-100 words)', marks: 5, exam: 'all', description: 'Topics: environment, technology, travel' },
          { name: 'Formal/Informal Letter', marks: 5, exam: 'half_yearly,annual', description: 'Both formal and informal formats' },
          { name: 'Story/Dialogue', marks: 5, exam: 'annual', description: 'Creative writing or dialogue' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Past Tense — Pretérito Indefinido', marks: 6, exam: 'ut1,half_yearly,annual', description: 'Simple past for completed actions' },
          { name: 'Imperfect Tense — Pretérito Imperfecto', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Ongoing past actions' },
          { name: 'Direct/Indirect Object Pronouns', marks: 5, exam: 'ut2,half_yearly,annual', description: 'lo, la, le, les placement' },
          { name: 'Future Tense (ir + a + infinitive)', marks: 4, exam: 'ut1,annual', description: 'Near future construction' },
          { name: 'Por vs Para', marks: 3, exam: 'half_yearly,annual', description: 'Two prepositions meaning for' },
          { name: 'Relative Pronouns (que, quien)', marks: 3, exam: 'annual', description: 'Connecting clauses' },
          { name: 'Connectors (pero, porque, también)', marks: 4, exam: 'annual', description: 'Linking ideas in writing' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 15, exam: 'all', description: 'Detailed Q&A from textbook' },
          { name: 'Vocabulary & Idioms', marks: 5, exam: 'all', description: 'Thematic vocabulary, common expressions' },
          { name: 'Culture & Civilization', marks: 5, exam: 'half_yearly,annual', description: 'Hispanic world culture' },
        ]}
      ]
    },
    9: {
      book: 'Español — Nivel 4',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Complex passage, advanced questions' },
          { name: 'Applied Grammar in Passage', marks: 5, exam: 'all', description: 'Identify tenses, structures in context' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (120-150 words)', marks: 8, exam: 'half_yearly,annual', description: 'Argumentative or descriptive essay' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Complaint, application, request' },
          { name: 'Dialogue/Story', marks: 5, exam: 'annual', description: 'Creative or situational writing' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Subjunctive Mood (Introduction)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Quiero que..., Es importante que...' },
          { name: 'Conditional Tense', marks: 5, exam: 'ut2,annual', description: 'Would do — hablaría, comería' },
          { name: 'Perfect Tenses (he hablado)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Present perfect construction' },
          { name: 'Passive Voice', marks: 3, exam: 'half_yearly,annual', description: 'Ser + past participle' },
          { name: 'Reported Speech', marks: 4, exam: 'annual', description: 'Indirect speech transformation' },
          { name: 'Advanced Connectors', marks: 3, exam: 'annual', description: 'sin embargo, además, por lo tanto' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'In-depth textbook Q&A' },
          { name: 'Poetry/Songs', marks: 8, exam: 'half_yearly,annual', description: 'Analysis of prescribed poems' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year style questions' },
        ]}
      ]
    },
    10: {
      book: 'Español — Nivel 5 (Board Year)',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Board-level passage comprehension' },
          { name: 'Applied Questions', marks: 5, exam: 'all', description: 'Inference, synonym, grammar in context' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (150+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Board-level essay topics' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Official letter format and language' },
          { name: 'Dialogue/Message/Story', marks: 5, exam: 'annual', description: 'Creative section' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'All Tenses Review', marks: 6, exam: 'all', description: 'Present, past, future, conditional, subjunctive' },
          { name: 'Subjunctive (Advanced)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Complex subjunctive constructions' },
          { name: 'Reported Speech', marks: 4, exam: 'half_yearly,annual', description: 'Direct to indirect conversion' },
          { name: 'Passive Voice', marks: 3, exam: 'half_yearly,annual', description: 'Active to passive transformation' },
          { name: 'Sentence Transformation', marks: 4, exam: 'annual', description: 'Rewrite using different structures' },
          { name: 'Error Correction', marks: 3, exam: 'annual', description: 'Find and fix grammatical errors' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'All prescribed prose lessons' },
          { name: 'Poetry', marks: 8, exam: 'half_yearly,annual', description: 'All prescribed poems with analysis' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year board questions' },
        ]}
      ]
    }
  },

  japanese: {
    6: {
      book: 'Japanese (Nihongo) — Introductory Level',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (Hiragana)', marks: 5, exam: 'all', description: 'Short passage in Hiragana with questions' },
          { name: 'MCQ & Matching', marks: 5, exam: 'all', description: 'Match words to meanings, true/false' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Hiragana Writing Practice', marks: 5, exam: 'all', description: 'Write Hiragana characters correctly' },
          { name: 'Short Self-Introduction (Jikoshoukai)', marks: 5, exam: 'half_yearly,annual', description: 'Watashi wa... desu. Write about yourself' },
          { name: 'Simple Sentences', marks: 5, exam: 'annual', description: 'Form basic Japanese sentences' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Hiragana (46 characters)', marks: 8, exam: 'ut1,half_yearly,annual', description: 'All basic Hiragana characters' },
          { name: 'Katakana (46 characters)', marks: 6, exam: 'ut2,half_yearly,annual', description: 'All basic Katakana characters' },
          { name: 'Particles (wa, ga, wo, ni, de)', marks: 5, exam: 'ut1,ut2,half_yearly,annual', description: 'Basic sentence particles' },
          { name: 'Desu/Masu form', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Polite sentence endings' },
          { name: 'Numbers, Days, Time', marks: 4, exam: 'ut2,annual', description: 'Counting, days of week, telling time' },
          { name: 'Question Words (nani, dare, doko)', marks: 3, exam: 'annual', description: 'What, who, where in Japanese' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Lessons', marks: 15, exam: 'all', description: 'Prescribed lesson Q&A' },
          { name: 'Greetings & Daily Expressions', marks: 5, exam: 'all', description: 'Ohayou, Konnichiwa, Arigatou, etc.' },
          { name: 'Japanese Culture', marks: 5, exam: 'half_yearly,annual', description: 'Festivals, food, school life in Japan' },
        ]}
      ]
    },
    7: {
      book: 'Japanese — Level 2',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (Hiragana + Katakana)', marks: 5, exam: 'all', description: 'Mixed script passage' },
          { name: 'Short Answer Questions', marks: 5, exam: 'all', description: 'Answer in Japanese' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Paragraph about Daily Life', marks: 5, exam: 'all', description: 'My day, my hobby, my family' },
          { name: 'Postcard/Short Letter', marks: 5, exam: 'half_yearly,annual', description: 'Japanese postcard format' },
          { name: 'Picture Description', marks: 5, exam: 'annual', description: 'Describe a picture in Japanese' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Basic Kanji (30-50 characters)', marks: 6, exam: 'ut1,ut2,half_yearly,annual', description: 'Common Kanji for daily words' },
          { name: 'Verb Groups (Ichidan, Godan)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Verb classification and conjugation' },
          { name: 'Te-form of verbs', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Connecting actions, requests' },
          { name: 'Adjectives (i-adjectives, na-adjectives)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Describing things in Japanese' },
          { name: 'Counters (mai, hon, nin)', marks: 4, exam: 'ut2,annual', description: 'Counting different objects' },
          { name: 'Location Words (ue, shita, naka)', marks: 5, exam: 'annual', description: 'Above, below, inside, beside' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Lesson-based Q&A' },
          { name: 'Thematic Vocabulary', marks: 5, exam: 'all', description: 'Food, transport, school, seasons' },
          { name: 'Cultural Knowledge', marks: 5, exam: 'half_yearly,annual', description: 'Japanese traditions, etiquette' },
        ]}
      ]
    },
    8: {
      book: 'Japanese — Level 3',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (with Kanji)', marks: 5, exam: 'all', description: 'Passage with basic Kanji' },
          { name: 'Comprehension Questions', marks: 5, exam: 'all', description: 'Factual and inferential' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (80-100 words)', marks: 5, exam: 'half_yearly,annual', description: 'Travel, future plans, school events' },
          { name: 'Letter (Tegami)', marks: 5, exam: 'half_yearly,annual', description: 'Formal Japanese letter structure' },
          { name: 'Diary Entry / Email', marks: 5, exam: 'annual', description: 'Japanese diary or email format' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Past Tense (-mashita, -ta)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Polite and plain past' },
          { name: 'Nai-form (Negative)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Negative verb forms' },
          { name: 'Tai-form (Want to)', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Expressing desires' },
          { name: 'Giving/Receiving (ageru, morau, kureru)', marks: 5, exam: 'ut2,annual', description: 'Exchange verbs' },
          { name: 'Kanji Expansion (80-100)', marks: 6, exam: 'all', description: 'More Kanji for daily use' },
          { name: 'Connecting Sentences (kara, node, kedo)', marks: 5, exam: 'annual', description: 'Because, although connectors' },
        ]},
        { name: 'Literature & Culture', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Detailed lesson questions' },
          { name: 'Vocabulary & Expressions', marks: 5, exam: 'all', description: 'Keigo basics, set phrases' },
          { name: 'Cultural Topics', marks: 5, exam: 'half_yearly,annual', description: 'Geography, society, pop culture of Japan' },
        ]}
      ]
    },
    9: {
      book: 'Japanese — Level 4',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Intermediate-level passage' },
          { name: 'Grammar Application in Context', marks: 5, exam: 'all', description: 'Identify structures in text' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (120+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Opinion essays, compare/contrast' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Business-style letter in Japanese' },
          { name: 'Creative Writing', marks: 5, exam: 'annual', description: 'Story or dialogue' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Potential Form (can do)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Expressing ability — dekiru, -eru/-areru' },
          { name: 'Conditional (tara, ba, nara)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'If-then constructions' },
          { name: 'Passive Voice', marks: 4, exam: 'ut2,annual', description: 'Passive construction in Japanese' },
          { name: 'Causative Form', marks: 4, exam: 'half_yearly,annual', description: 'Making someone do something' },
          { name: 'Kanji (120-150)', marks: 4, exam: 'all', description: 'Expanded Kanji knowledge' },
          { name: 'Honorific Language (Keigo basics)', marks: 3, exam: 'annual', description: 'Polite forms for formal situations' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'In-depth textbook analysis' },
          { name: 'Cultural Texts & Poetry', marks: 8, exam: 'half_yearly,annual', description: 'Haiku, cultural readings' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year style' },
        ]}
      ]
    },
    10: {
      book: 'Japanese — Level 5 (Board Year)',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Board-level Japanese passage' },
          { name: 'Applied Questions', marks: 5, exam: 'all', description: 'Vocabulary, grammar, inference' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (150+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Board-level essay' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Official letter in Japanese' },
          { name: 'Creative Section', marks: 5, exam: 'annual', description: 'Dialogue, story, or email' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'All Grammar Review', marks: 6, exam: 'all', description: 'All forms: te, nai, tai, potential, passive, causative' },
          { name: 'Complex Sentences', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Multi-clause constructions' },
          { name: 'Keigo (Honorifics)', marks: 4, exam: 'half_yearly,annual', description: 'Sonkeigo, kenjougo basics' },
          { name: 'Kanji (150-180)', marks: 5, exam: 'all', description: 'Board-level Kanji' },
          { name: 'Sentence Transformation', marks: 3, exam: 'annual', description: 'Convert between forms' },
          { name: 'Error Correction', marks: 2, exam: 'annual', description: 'Find errors in Japanese text' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'All prescribed lessons' },
          { name: 'Poetry & Culture', marks: 8, exam: 'half_yearly,annual', description: 'Haiku, cultural essays' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year board questions' },
        ]}
      ]
    }
  },

  korean: {
    6: {
      book: 'Korean (Hangugeo) — Introductory Level',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (Hangul)', marks: 5, exam: 'all', description: 'Short Korean passage with questions' },
          { name: 'MCQ & Matching', marks: 5, exam: 'all', description: 'Match Korean words to meanings' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Hangul Writing Practice', marks: 5, exam: 'all', description: 'Write Korean alphabet correctly' },
          { name: 'Self-Introduction (자기소개)', marks: 5, exam: 'half_yearly,annual', description: 'Name, age, nationality, hobbies' },
          { name: 'Simple Sentences', marks: 5, exam: 'annual', description: 'Basic Korean sentence formation' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Hangul (Vowels & Consonants)', marks: 8, exam: 'ut1,half_yearly,annual', description: 'All basic Hangul characters' },
          { name: 'Syllable Block Formation', marks: 5, exam: 'ut1,half_yearly,annual', description: 'How Korean syllables combine' },
          { name: 'Particles (은/는, 이/가, 을/를)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Subject and object markers' },
          { name: 'Basic Verbs (이다, 있다, 하다)', marks: 5, exam: 'ut1,ut2,half_yearly,annual', description: 'To be, to have/exist, to do' },
          { name: 'Numbers (Native + Sino-Korean)', marks: 4, exam: 'ut2,annual', description: 'Two number systems' },
          { name: 'Polite Ending (-요 form)', marks: 3, exam: 'annual', description: 'Polite speech level' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Lessons', marks: 15, exam: 'all', description: 'Prescribed chapter Q&A' },
          { name: 'Greetings & Expressions', marks: 5, exam: 'all', description: '안녕하세요, 감사합니다, etc.' },
          { name: 'Korean Culture', marks: 5, exam: 'half_yearly,annual', description: 'K-culture, food, traditions' },
        ]}
      ]
    },
    7: {
      book: 'Korean — Level 2',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Intermediate Hangul passage' },
          { name: 'Short Answer Questions', marks: 5, exam: 'all', description: 'Answer in Korean' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Daily Life Paragraph', marks: 5, exam: 'all', description: 'My school, my family, daily routine' },
          { name: 'Short Letter', marks: 5, exam: 'half_yearly,annual', description: 'Letter to friend in Korean' },
          { name: 'Picture/Situation Description', marks: 5, exam: 'annual', description: 'Describe using Korean' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Past Tense (-았/었어요)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Past tense formation' },
          { name: 'Future Tense (-ㄹ/을 거예요)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Future intentions' },
          { name: 'Connecting Particles (-고, -에서)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'And, at/from connectors' },
          { name: 'Adjective Usage', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Korean adjectives as verbs' },
          { name: 'Location & Direction Words', marks: 5, exam: 'ut2,annual', description: '위, 아래, 안, 밖, 옆' },
          { name: 'Counters (개, 명, 마리)', marks: 5, exam: 'annual', description: 'Counting units in Korean' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Lesson-based comprehension' },
          { name: 'Thematic Vocabulary', marks: 5, exam: 'all', description: 'Food, shopping, weather, health' },
          { name: 'Cultural Topics', marks: 5, exam: 'half_yearly,annual', description: 'Korean festivals, geography, society' },
        ]}
      ]
    },
    8: {
      book: 'Korean — Level 3',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Medium-difficulty Korean text' },
          { name: 'Inference & Vocabulary', marks: 5, exam: 'all', description: 'Contextual understanding' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (80-100 words)', marks: 5, exam: 'half_yearly,annual', description: 'Hobbies, travel, school life' },
          { name: 'Letter/Email', marks: 5, exam: 'half_yearly,annual', description: 'Formal and informal letters' },
          { name: 'Diary / Dialogue', marks: 5, exam: 'annual', description: 'Write diary entry or conversation' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Honorific System (존댓말)', marks: 6, exam: 'ut1,half_yearly,annual', description: 'Formal vs informal speech levels' },
          { name: 'Conditional (-면)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'If-then in Korean' },
          { name: 'Reason/Cause (-어서/아서, -니까)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Because constructions' },
          { name: 'Want to (-고 싶다)', marks: 4, exam: 'ut2,annual', description: 'Expressing desires' },
          { name: 'Can/Cannot (-ㄹ 수 있다/없다)', marks: 5, exam: 'half_yearly,annual', description: 'Expressing ability' },
          { name: 'Quoting (-라고, -다고)', marks: 5, exam: 'annual', description: 'Reported speech basics' },
        ]},
        { name: 'Literature & Culture', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Detailed lesson analysis' },
          { name: 'Vocabulary & Idioms', marks: 5, exam: 'all', description: 'Korean proverbs, set expressions' },
          { name: 'Cultural Knowledge', marks: 5, exam: 'half_yearly,annual', description: 'Modern Korea, media, education system' },
        ]}
      ]
    },
    9: {
      book: 'Korean — Level 4',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Advanced Korean passage' },
          { name: 'Applied Grammar Questions', marks: 5, exam: 'all', description: 'Grammar identification in context' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (120+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Opinion, descriptive, narrative' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Formal Korean letter structure' },
          { name: 'Creative Writing', marks: 5, exam: 'annual', description: 'Story or dialogue' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Passive Voice (-이/히/리/기)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Korean passive constructions' },
          { name: 'Causative (-이/히/리/기/우/추)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Making someone do something' },
          { name: 'Advanced Connectors (-는데, -더니)', marks: 5, exam: 'ut2,annual', description: 'Complex sentence linking' },
          { name: 'Relative Clauses (-는/ㄴ/을)', marks: 4, exam: 'half_yearly,annual', description: 'Describing nouns with clauses' },
          { name: 'Formal Writing Style', marks: 3, exam: 'annual', description: 'Written vs spoken Korean' },
          { name: 'Advanced Vocabulary', marks: 3, exam: 'all', description: 'Sino-Korean words, academic terms' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'In-depth textbook Q&A' },
          { name: 'Cultural Texts', marks: 8, exam: 'half_yearly,annual', description: 'Korean literature, folk tales' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year style' },
        ]}
      ]
    },
    10: {
      book: 'Korean — Level 5 (Board Year)',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Board-level Korean passage' },
          { name: 'Applied Questions', marks: 5, exam: 'all', description: 'Comprehension, vocabulary, grammar' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (150+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Board-level essay' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Official Korean letter' },
          { name: 'Creative Section', marks: 5, exam: 'annual', description: 'Dialogue, story, email' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'All Grammar Review', marks: 6, exam: 'all', description: 'Complete grammar revision' },
          { name: 'Advanced Honorifics', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Formal situations and writing' },
          { name: 'Complex Sentences', marks: 4, exam: 'half_yearly,annual', description: 'Multi-clause Korean' },
          { name: 'Reported Speech (Advanced)', marks: 4, exam: 'annual', description: 'All quoting forms' },
          { name: 'Sentence Transformation', marks: 3, exam: 'annual', description: 'Convert between forms' },
          { name: 'Error Correction', marks: 3, exam: 'annual', description: 'Find errors in Korean text' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'All prescribed lessons' },
          { name: 'Cultural Essays & Poetry', marks: 8, exam: 'half_yearly,annual', description: 'Korean poems and essays' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year board questions' },
        ]}
      ]
    }
  },

  mandarin: {
    6: {
      book: 'Mandarin Chinese — Introductory Level',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (Pinyin + Characters)', marks: 5, exam: 'all', description: 'Short passage with Pinyin support' },
          { name: 'MCQ & Matching', marks: 5, exam: 'all', description: 'Match characters to Pinyin/meanings' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Character Writing (Stroke Order)', marks: 5, exam: 'all', description: 'Write Chinese characters correctly' },
          { name: 'Self-Introduction (自我介绍)', marks: 5, exam: 'half_yearly,annual', description: 'Name, age, nationality, family' },
          { name: 'Simple Sentences', marks: 5, exam: 'annual', description: 'Form basic Mandarin sentences' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Pinyin (Tones & Initials/Finals)', marks: 8, exam: 'ut1,half_yearly,annual', description: 'All Pinyin sounds and 4 tones' },
          { name: 'Basic Characters (50-80)', marks: 6, exam: 'ut1,ut2,half_yearly,annual', description: 'Common everyday characters' },
          { name: 'Sentence Structure (SVO)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Subject + Verb + Object order' },
          { name: 'Shi (是) sentences', marks: 4, exam: 'ut1,half_yearly,annual', description: 'A is B constructions' },
          { name: 'Numbers, Dates, Time', marks: 4, exam: 'ut2,annual', description: 'Counting, calendar, clock' },
          { name: 'Question Particles (吗, 呢)', marks: 3, exam: 'annual', description: 'Forming questions in Chinese' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Lessons', marks: 15, exam: 'all', description: 'Prescribed chapter Q&A' },
          { name: 'Greetings & Expressions', marks: 5, exam: 'all', description: '你好, 谢谢, 再见, etc.' },
          { name: 'Chinese Culture', marks: 5, exam: 'half_yearly,annual', description: 'Festivals, food, geography of China' },
        ]}
      ]
    },
    7: {
      book: 'Mandarin — Level 2',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Passage with more characters' },
          { name: 'Short Answer Questions', marks: 5, exam: 'all', description: 'Answer in Chinese' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Paragraph (My School/Family)', marks: 5, exam: 'all', description: 'Describe daily life' },
          { name: 'Short Letter/Email', marks: 5, exam: 'half_yearly,annual', description: 'Chinese letter format' },
          { name: 'Picture Description', marks: 5, exam: 'annual', description: 'Describe a picture in Chinese' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Characters (100-150)', marks: 6, exam: 'all', description: 'Expanded character set' },
          { name: 'Measure Words (个, 本, 只, 条)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Classifiers for different nouns' },
          { name: 'Past Tense (了 particle)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Completed actions' },
          { name: 'Progressive (在...呢)', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Ongoing actions' },
          { name: 'Comparison (比)', marks: 5, exam: 'ut2,annual', description: 'A比B + adjective' },
          { name: 'Location Words (上, 下, 里, 外)', marks: 5, exam: 'annual', description: 'Position and direction' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Lesson-based Q&A' },
          { name: 'Thematic Vocabulary', marks: 5, exam: 'all', description: 'Food, shopping, transport, weather' },
          { name: 'Cultural Knowledge', marks: 5, exam: 'half_yearly,annual', description: 'Chinese traditions, zodiac, calligraphy' },
        ]}
      ]
    },
    8: {
      book: 'Mandarin — Level 3',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Intermediate Chinese text' },
          { name: 'Comprehension & Vocabulary', marks: 5, exam: 'all', description: 'Inference, character meanings' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (80-100 characters)', marks: 5, exam: 'half_yearly,annual', description: 'Travel, environment, technology' },
          { name: 'Letter/Email', marks: 5, exam: 'half_yearly,annual', description: 'Formal and informal' },
          { name: 'Dialogue / Diary', marks: 5, exam: 'annual', description: 'Conversation or diary entry' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Characters (180-220)', marks: 6, exam: 'all', description: 'More complex characters' },
          { name: 'Complement of Result (得)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Describing how well something is done' },
          { name: 'Experience (过)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Have done before' },
          { name: 'Duration (了...了)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Time duration expressions' },
          { name: 'Ba (把) Sentences', marks: 5, exam: 'ut2,annual', description: 'Disposal construction' },
          { name: 'Connecting Words (因为...所以, 虽然...但是)', marks: 5, exam: 'annual', description: 'Because...therefore, although...but' },
        ]},
        { name: 'Literature & Culture', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Detailed lesson analysis' },
          { name: 'Vocabulary & Idioms (成语)', marks: 5, exam: 'all', description: 'Chinese idioms and expressions' },
          { name: 'Cultural Topics', marks: 5, exam: 'half_yearly,annual', description: 'Chinese history, arts, modern society' },
        ]}
      ]
    },
    9: {
      book: 'Mandarin — Level 4',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Advanced Chinese passage' },
          { name: 'Grammar in Context', marks: 5, exam: 'all', description: 'Identify structures in text' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (120+ characters)', marks: 8, exam: 'half_yearly,annual', description: 'Opinion and descriptive essays' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Business letter in Chinese' },
          { name: 'Creative Writing', marks: 5, exam: 'annual', description: 'Story or dialogue' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Passive Voice (被)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Passive construction' },
          { name: 'Directional Complements', marks: 5, exam: 'ut2,half_yearly,annual', description: '上来, 下去, 出去, 进来' },
          { name: 'Complex Complements (得/不)', marks: 4, exam: 'ut2,annual', description: 'Potential complement forms' },
          { name: 'Characters (250-300)', marks: 5, exam: 'all', description: 'Advanced character knowledge' },
          { name: 'Sentence Patterns (越...越, 一边...一边)', marks: 3, exam: 'half_yearly,annual', description: 'Complex grammatical patterns' },
          { name: 'Formal Written Chinese', marks: 3, exam: 'annual', description: 'Written vs spoken style' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'In-depth textbook analysis' },
          { name: 'Poetry & Cultural Texts', marks: 8, exam: 'half_yearly,annual', description: 'Tang poetry, cultural readings' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year style' },
        ]}
      ]
    },
    10: {
      book: 'Mandarin — Level 5 (Board Year)',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Board-level Chinese passage' },
          { name: 'Applied Questions', marks: 5, exam: 'all', description: 'Vocabulary, grammar, inference' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (150+ characters)', marks: 8, exam: 'half_yearly,annual', description: 'Board-level essay' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Official Chinese letter' },
          { name: 'Creative Section', marks: 5, exam: 'annual', description: 'Dialogue, story, email' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'All Grammar Review', marks: 6, exam: 'all', description: 'Complete grammar revision' },
          { name: 'Advanced Sentence Patterns', marks: 5, exam: 'ut2,half_yearly,annual', description: 'All complex patterns' },
          { name: 'Characters (300-350)', marks: 5, exam: 'all', description: 'Board-level characters' },
          { name: 'Reported Speech', marks: 3, exam: 'half_yearly,annual', description: 'Indirect speech in Chinese' },
          { name: 'Sentence Transformation', marks: 3, exam: 'annual', description: 'Convert between structures' },
          { name: 'Error Correction', marks: 3, exam: 'annual', description: 'Find errors in Chinese text' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'All prescribed lessons' },
          { name: 'Poetry & Culture', marks: 8, exam: 'half_yearly,annual', description: 'Classical and modern poems' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year board questions' },
        ]}
      ]
    }
  },

  russian: {
    6: {
      book: 'Russian (Russkiy Yazyk) — Introductory Level',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage (Cyrillic)', marks: 5, exam: 'all', description: 'Short Russian passage with questions' },
          { name: 'MCQ & True/False', marks: 5, exam: 'all', description: 'Factual questions from passage' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Cyrillic Writing Practice', marks: 5, exam: 'all', description: 'Write Russian alphabet correctly' },
          { name: 'Self-Introduction', marks: 5, exam: 'half_yearly,annual', description: 'Меня зовут... Write about yourself' },
          { name: 'Simple Sentences', marks: 5, exam: 'annual', description: 'Basic Russian sentence formation' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Cyrillic Alphabet (33 letters)', marks: 8, exam: 'ut1,half_yearly,annual', description: 'All Russian letters and sounds' },
          { name: 'Gender of Nouns (м, ж, ср)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Masculine, feminine, neuter' },
          { name: 'Personal Pronouns (я, ты, он...)', marks: 4, exam: 'ut1,half_yearly,annual', description: 'Russian pronouns' },
          { name: 'Verb Быть & Present Tense', marks: 5, exam: 'ut2,half_yearly,annual', description: 'To be and basic verbs' },
          { name: 'Nominative Case', marks: 4, exam: 'ut2,annual', description: 'Subject case' },
          { name: 'Numbers & Dates', marks: 4, exam: 'annual', description: 'Counting, days, months' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Lessons', marks: 15, exam: 'all', description: 'Prescribed chapter Q&A' },
          { name: 'Greetings & Expressions', marks: 5, exam: 'all', description: 'Здравствуйте, Спасибо, До свидания' },
          { name: 'Russian Culture', marks: 5, exam: 'half_yearly,annual', description: 'Russia geography, traditions, food' },
        ]}
      ]
    },
    7: {
      book: 'Russian — Level 2',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Longer Cyrillic passage' },
          { name: 'Short Answers', marks: 5, exam: 'all', description: 'Answer in Russian' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Paragraph (Daily Life)', marks: 5, exam: 'all', description: 'My family, school, city' },
          { name: 'Short Letter', marks: 5, exam: 'half_yearly,annual', description: 'Informal letter to friend' },
          { name: 'Dialogue/Message', marks: 5, exam: 'annual', description: 'Write a dialogue or note' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Accusative Case (Винительный)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Direct object case' },
          { name: 'Prepositional Case (Предложный)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Location and about' },
          { name: 'Verb Conjugation Groups (I & II)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Two verb conjugation patterns' },
          { name: 'Possessive Pronouns (мой, твой, его)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'My, your, his/her' },
          { name: 'Adjective Agreement', marks: 5, exam: 'ut2,annual', description: 'Adjectives match noun gender/number' },
          { name: 'Past Tense (-л, -ла, -ло, -ли)', marks: 5, exam: 'annual', description: 'Past tense by gender' },
        ]},
        { name: 'Culture & Vocabulary', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Lesson-based comprehension' },
          { name: 'Thematic Vocabulary', marks: 5, exam: 'all', description: 'Food, transport, seasons, health' },
          { name: 'Cultural Topics', marks: 5, exam: 'half_yearly,annual', description: 'Russian festivals, literature, sports' },
        ]}
      ]
    },
    8: {
      book: 'Russian — Level 3',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Intermediate Russian text' },
          { name: 'Inference & Vocabulary', marks: 5, exam: 'all', description: 'Contextual understanding' },
        ]},
        { name: 'Writing', marks: 15, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (80-100 words)', marks: 5, exam: 'half_yearly,annual', description: 'Environment, travel, hobbies' },
          { name: 'Letter/Email', marks: 5, exam: 'half_yearly,annual', description: 'Formal and informal letters' },
          { name: 'Diary/Dialogue', marks: 5, exam: 'annual', description: 'Diary entry or conversation' },
        ]},
        { name: 'Grammar', marks: 30, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Dative Case (Дательный)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Indirect object, age expressions' },
          { name: 'Instrumental Case (Творительный)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'With, by means of' },
          { name: 'Genitive Case (Родительный)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Possession, absence, quantities' },
          { name: 'Aspect (Imperfective/Perfective)', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Completed vs ongoing actions' },
          { name: 'Motion Verbs (идти/ходить, ехать/ездить)', marks: 5, exam: 'annual', description: 'Directed vs non-directed motion' },
          { name: 'Comparative Forms', marks: 5, exam: 'annual', description: 'More/less, better/worse' },
        ]},
        { name: 'Literature & Culture', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Textbook Chapters', marks: 15, exam: 'all', description: 'Detailed lesson analysis' },
          { name: 'Vocabulary & Idioms', marks: 5, exam: 'all', description: 'Russian proverbs, set expressions' },
          { name: 'Cultural Knowledge', marks: 5, exam: 'half_yearly,annual', description: 'Russian arts, science, modern life' },
        ]}
      ]
    },
    9: {
      book: 'Russian — Level 4',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Advanced Russian passage' },
          { name: 'Applied Grammar Questions', marks: 5, exam: 'all', description: 'Case identification, verb aspect in context' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (120+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Opinion and descriptive essays' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Business-style Russian letter' },
          { name: 'Creative Writing', marks: 5, exam: 'annual', description: 'Story or dialogue' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'All 6 Cases Review', marks: 6, exam: 'all', description: 'Nom, Acc, Gen, Dat, Inst, Prep' },
          { name: 'Verbal Aspect (Advanced)', marks: 5, exam: 'ut1,half_yearly,annual', description: 'Aspect in complex sentences' },
          { name: 'Participles & Verbal Adverbs', marks: 4, exam: 'ut2,half_yearly,annual', description: 'Действующий, прочитав' },
          { name: 'Conditional/Subjunctive (бы)', marks: 4, exam: 'ut2,annual', description: 'Would, if constructions' },
          { name: 'Complex Sentences', marks: 3, exam: 'half_yearly,annual', description: 'который, чтобы, что clauses' },
          { name: 'Reported Speech', marks: 3, exam: 'annual', description: 'Direct to indirect' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'In-depth textbook analysis' },
          { name: 'Poetry & Cultural Texts', marks: 8, exam: 'half_yearly,annual', description: 'Pushkin, Lermontov excerpts' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year style' },
        ]}
      ]
    },
    10: {
      book: 'Russian — Level 5 (Board Year)',
      totalMarks: 80,
      sections: [
        { name: 'Reading Comprehension', marks: 10, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Unseen Passage', marks: 5, exam: 'all', description: 'Board-level Russian passage' },
          { name: 'Applied Questions', marks: 5, exam: 'all', description: 'Vocabulary, grammar, inference' },
        ]},
        { name: 'Writing', marks: 20, exams: ['half_yearly','annual'], topics: [
          { name: 'Essay (150+ words)', marks: 8, exam: 'half_yearly,annual', description: 'Board-level essay' },
          { name: 'Formal Letter', marks: 7, exam: 'half_yearly,annual', description: 'Official Russian letter' },
          { name: 'Creative Section', marks: 5, exam: 'annual', description: 'Dialogue, story, email' },
        ]},
        { name: 'Grammar', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'All Cases & Grammar Review', marks: 6, exam: 'all', description: 'Complete grammar revision' },
          { name: 'Advanced Verbal Forms', marks: 5, exam: 'ut2,half_yearly,annual', description: 'Participles, verbal adverbs, aspect' },
          { name: 'Complex Sentences', marks: 4, exam: 'half_yearly,annual', description: 'Multi-clause Russian' },
          { name: 'Sentence Transformation', marks: 4, exam: 'annual', description: 'Convert between structures' },
          { name: 'Error Correction', marks: 3, exam: 'annual', description: 'Find errors in Russian text' },
          { name: 'Formal Written Style', marks: 3, exam: 'annual', description: 'Academic/business Russian' },
        ]},
        { name: 'Literature', marks: 25, exams: ['ut1','ut2','half_yearly','annual'], topics: [
          { name: 'Prose Chapters', marks: 12, exam: 'all', description: 'All prescribed lessons' },
          { name: 'Poetry & Culture', marks: 8, exam: 'half_yearly,annual', description: 'Russian literature excerpts' },
          { name: 'Board Pattern Questions', marks: 5, exam: 'annual', description: 'Previous year board questions' },
        ]}
      ]
    }
  }
};

// Helper: Get syllabus for a student
function getSyllabus(language, cls) {
  return CBSE_SYLLABUS[language]?.[cls] || null;
}

// Helper: Get topics for a specific exam
function getExamTopics(language, cls, examType) {
  const syllabus = getSyllabus(language, cls);
  if (!syllabus) return [];

  const topics = [];
  for (const section of syllabus.sections) {
    for (const topic of section.topics) {
      if (topic.exam === 'all' || topic.exam.includes(examType)) {
        topics.push({ ...topic, section: section.name });
      }
    }
  }
  return topics;
}

// Helper: Get total marks for an exam type
function getExamMarks(language, cls, examType) {
  const topics = getExamTopics(language, cls, examType);
  return topics.reduce((sum, t) => sum + (t.marks || 0), 0);
}

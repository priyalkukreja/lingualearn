(function () {
  if (!requireAuth()) return;
  startSession();

  const student = getStudent();
  const lang = student?.language || 'french';
  const cls = student?.class || 8;

  if (student) {
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
  }

  // CBSE typical exam calendar (month index 0-based)
  const examCalendar = {
    ut1:         { label: 'Unit Test 1',  month: 6, day: 20 },
    ut2:         { label: 'Unit Test 2',  month: 8, day: 25 },
    half_yearly: { label: 'Half-Yearly',  month: 10, day: 15 },
    annual:      { label: 'Annual Exam',  month: 1, day: 20 }
  };

  // CBSE syllabus breakdown per language per class per exam
  const cbseSyllabus = {
    french: {
      6: {
        ut1: ['Leçon 0 — Bonjour!', 'Leçon 1 — La famille', 'Alphabet & Pronunciation'],
        ut2: ['Leçon 2 — Au lycée', 'Leçon 3 — Les copains', 'Articles définis/indéfinis'],
        half_yearly: ['Leçon 0–4', 'Articles', 'Être & Avoir conjugation', 'Adjectives agreement', 'Greetings & Introductions'],
        annual: ['Full Book — Leçon 0–7', 'All Grammar', 'Passé composé', 'Negation', 'Letter writing', 'Comprehension']
      },
      7: {
        ut1: ['Leçon 0 — Révision', 'Leçon 1 — Faisons connaissance', 'Articles partitifs'],
        ut2: ['Leçon 2 — Ma famille', 'Leçon 3 — Au restaurant', 'Pronoms personnels'],
        half_yearly: ['Leçon 0–4', 'Pronoms (je, tu, il…)', 'Futur proche', 'Adjectifs possessifs', 'Comprehension'],
        annual: ['Full Book — Leçon 0–8', 'All Grammar', 'Passé composé with avoir/être', 'Dialogue writing', 'Essay', 'Comprehension']
      },
      8: {
        ut1: ['Leçon 0 — Révision CE1', 'Leçon 1 — La rentrée', 'Passé composé revision'],
        ut2: ['Leçon 2 — Vive les vacances', 'Leçon 3 — Une journée de Pauline', 'Imparfait introduction'],
        half_yearly: ['Leçon 0–4', 'Passé composé vs Imparfait', 'Pronoms COD', 'Letter writing', 'Comprehension'],
        annual: ['Full Book', 'All Grammar', 'Pronoms COD/COI', 'Futur simple', 'Rédaction', 'Comprehension']
      },
      9: {
        ut1: ['Leçon 0 — Révision', 'Leçon 1', 'Subjonctif introduction', 'Pronoms relatifs (qui, que)'],
        ut2: ['Leçon 2–3', 'Plus-que-parfait', 'Pronoms EN/Y'],
        half_yearly: ['Leçon 0–4', 'All Tenses up to plus-que-parfait', 'Formal letter', 'Comprehension'],
        annual: ['Full Book', 'Conditionnel', 'All Pronouns', 'Essay & Letter', 'Literature', 'Comprehension']
      },
      10: {
        ut1: ['Leçon 0–1 Revision', 'Conditionnel présent', 'Pronoms relatifs avancés'],
        ut2: ['Leçon 2–3', 'Subjonctif', 'Voix passive'],
        half_yearly: ['Leçon 0–4', 'All Advanced Grammar', 'Formal/Informal letters', 'Comprehension'],
        annual: ['Complete Syllabus', 'All Grammar & Tenses', 'Essay, Letter, Dialogue', 'Literature & Poetry', 'Board pattern Comprehension']
      }
    },
    german: {
      6: {
        ut1: ['Lektion 1 — Hallo!', 'Alphabet & Numbers', 'Greetings'],
        ut2: ['Lektion 2 — Meine Familie', 'Lektion 3 — Meine Schule', 'Nominativ'],
        half_yearly: ['Lektion 1–4', 'Nominativ & Akkusativ', 'Verb conjugation (sein, haben)', 'Colors & Numbers'],
        annual: ['Full Book', 'All Cases', 'Present tense verbs', 'Letter writing', 'Comprehension']
      },
      7: {
        ut1: ['Lektion 1 — Revision', 'Lektion 2 — Freizeit', 'Trennbare Verben'],
        ut2: ['Lektion 3–4', 'Modalverben (können, müssen)', 'Akkusativ practice'],
        half_yearly: ['Lektion 1–5', 'Nominativ/Akkusativ', 'Modal verbs', 'Daily routine vocabulary'],
        annual: ['Full Book', 'All Grammar', 'Perfekt (past tense)', 'Dialogue & Letter', 'Comprehension']
      },
      8: {
        ut1: ['Lektion 1 — Wiederholung', 'Lektion 2', 'Dativ introduction'],
        ut2: ['Lektion 3–4', 'Dativ prepositions', 'Perfekt revision'],
        half_yearly: ['Lektion 1–5', 'Nom/Akk/Dativ', 'Perfekt', 'Wechselpräpositionen'],
        annual: ['Full Book', 'All Cases including Dativ', 'Nebensätze', 'Essay & Letter', 'Comprehension']
      },
      9: {
        ut1: ['Lektion 1–2', 'Genitiv introduction', 'Konjunktiv II'],
        ut2: ['Lektion 3–4', 'Passiv', 'Relativsätze'],
        half_yearly: ['Lektion 1–5', 'All 4 Cases', 'Konjunktiv II', 'Formal Letter'],
        annual: ['Full Book', 'All Grammar', 'Passiv & Konjunktiv', 'Essay, Letter, Dialogue', 'Comprehension']
      },
      10: {
        ut1: ['Lektion 1–2 Revision', 'Advanced Konjunktiv', 'Indirekte Rede'],
        ut2: ['Lektion 3–4', 'Passiv Perfekt', 'Relativpronomen'],
        half_yearly: ['Lektion 1–5', 'All Advanced Grammar', 'Formal & Informal Letters'],
        annual: ['Complete Syllabus', 'All Grammar & Cases', 'Essay, Letter, Dialogue', 'Literature', 'Board Pattern Questions']
      }
    },
    sanskrit: {
      6: {
        ut1: ['पाठ 1 — शब्द परिचय', 'वर्णमाला', 'अकारान्त पुल्लिंग शब्द रूप'],
        ut2: ['पाठ 2–3', 'आकारान्त स्त्रीलिंग', 'लट् लकार (भू, पठ्)'],
        half_yearly: ['पाठ 1–5', 'शब्द रूप (राम, लता)', 'धातु रूप (लट् लकार)', 'संख्या 1–20', 'अव्यय'],
        annual: ['सम्पूर्ण पुस्तक', 'सभी शब्द रूप', 'लट् & लृट् लकार', 'संधि (दीर्घ)', 'पत्र लेखन', 'अपठित गद्यांश']
      },
      7: {
        ut1: ['पाठ 1 — पुनरावृत्ति', 'पाठ 2', 'नपुंसकलिंग शब्द रूप'],
        ut2: ['पाठ 3–4', 'लङ् लकार', 'विभक्ति — तृतीया & चतुर्थी'],
        half_yearly: ['पाठ 1–6', 'सभी लिंग शब्द रूप', 'लट्, लृट्, लङ् लकार', 'गुण संधि'],
        annual: ['सम्पूर्ण पुस्तक', 'सभी धातु रूप', 'सभी संधि', 'समास', 'पत्र & निबंध', 'अपठित']
      },
      8: {
        ut1: ['पाठ 1–2', 'लोट् लकार', 'वृद्धि संधि'],
        ut2: ['पाठ 3–4', 'विधिलिङ् लकार', 'यण् संधि'],
        half_yearly: ['पाठ 1–6', 'सभी लकार (लट्, लृट्, लङ्, लोट्, विधिलिङ्)', 'संधि (दीर्घ, गुण, वृद्धि, यण्)'],
        annual: ['सम्पूर्ण पुस्तक', 'सभी लकार', 'सभी संधि & समास', 'उपसर्ग & प्रत्यय', 'पत्र, निबंध', 'अपठित']
      },
      9: {
        ut1: ['पाठ 1–2', 'कर्मवाच्य', 'तुमुन् & क्त्वा प्रत्यय'],
        ut2: ['पाठ 3–5', 'भाववाच्य', 'बहुव्रीहि समास'],
        half_yearly: ['पाठ 1–6', 'वाच्य परिवर्तन', 'सभी समास', 'अनुवाद'],
        annual: ['सम्पूर्ण पुस्तक', 'सभी व्याकरण', 'वाच्य, समास, संधि', 'पत्र, निबंध, अनुवाद', 'अपठित']
      },
      10: {
        ut1: ['पाठ 1–2 पुनरावृत्ति', 'Advanced वाच्य', 'प्रत्यय विस्तार'],
        ut2: ['पाठ 3–5', 'अलंकार', 'Advanced समास'],
        half_yearly: ['पाठ 1–6', 'सभी Advanced Grammar', 'Board Pattern Practice'],
        annual: ['सम्पूर्ण पाठ्यक्रम', 'सभी व्याकरण & साहित्य', 'पत्र, निबंध, अनुवाद', 'अपठित गद्यांश & पद्यांश', 'Board Pattern']
      }
    },
    spanish: {
      6: {
        ut1: ['Lección 1 — ¡Hola!', 'Alphabet & Pronunciation', 'Greetings & Numbers'],
        ut2: ['Lección 2 — Mi familia', 'Lección 3 — En la escuela', 'Articles (el, la, los, las)'],
        half_yearly: ['Lección 1–4', 'Ser & Estar', 'Present tense regular verbs', 'Adjective agreement'],
        annual: ['Full Book', 'All Grammar', 'Gustar', 'Pretérito introduction', 'Letter & Dialogue', 'Comprehension']
      },
      7: {
        ut1: ['Lección 1 — Revisión', 'Lección 2 — Mi rutina', 'Reflexive verbs'],
        ut2: ['Lección 3–4', 'Stem-changing verbs', 'Direct object pronouns'],
        half_yearly: ['Lección 1–5', 'All Present tense', 'Pronouns', 'Ser vs Estar mastery'],
        annual: ['Full Book', 'Pretérito indefinido', 'All Pronouns', 'Essay & Letter', 'Comprehension']
      },
      8: {
        ut1: ['Lección 1–2', 'Pretérito indefinido', 'Irregular preterites'],
        ut2: ['Lección 3–4', 'Imperfecto', 'Por vs Para'],
        half_yearly: ['Lección 1–5', 'Pretérito vs Imperfecto', 'Indirect object pronouns', 'Letter writing'],
        annual: ['Full Book', 'All Past tenses', 'Subjunctive intro', 'Essay, Letter, Dialogue', 'Comprehension']
      },
      9: {
        ut1: ['Lección 1–2', 'Futuro simple', 'Condicional'],
        ut2: ['Lección 3–4', 'Subjuntivo presente', 'Relative pronouns'],
        half_yearly: ['Lección 1–5', 'All Tenses', 'Subjuntivo', 'Formal Letter'],
        annual: ['Full Book', 'All Grammar', 'Subjuntivo & Condicional', 'Literature', 'Essay & Letter', 'Comprehension']
      },
      10: {
        ut1: ['Lección 1–2 Revisión', 'Advanced Subjuntivo', 'Voz pasiva'],
        ut2: ['Lección 3–4', 'Pluscuamperfecto', 'Reported speech'],
        half_yearly: ['Lección 1–5', 'All Advanced Grammar', 'Board Pattern Practice'],
        annual: ['Complete Syllabus', 'All Grammar & Tenses', 'Essay, Letter, Dialogue', 'Literature & Poetry', 'Board Pattern']
      }
    },
    japanese: {
      6: {
        ut1: ['Hiragana Chart', 'Self Introduction (Jikoshoukai)', 'Numbers 1–20'],
        ut2: ['Katakana Basics', 'Greetings (Aisatsu)', 'Classroom phrases'],
        half_yearly: ['Hiragana & Katakana', 'Numbers 1–100', 'Family vocabulary', 'です/ます form', 'Time expressions'],
        annual: ['Full Syllabus', 'All Kana', 'Basic particles (は, が, を, に)', 'Self intro & Daily routine', 'Comprehension']
      },
      7: {
        ut1: ['Hiragana/Katakana revision', 'Adjectives (い & な)', 'Location words'],
        ut2: ['て-form introduction', 'Counting objects', 'Days & Months'],
        half_yearly: ['All Kana', 'Verb groups', 'て-form', 'Adjectives', 'Basic Kanji (10–15)'],
        annual: ['Full Syllabus', 'ない-form', 'Past tense', 'All particles', 'Kanji (20–25)', 'Comprehension']
      },
      8: {
        ut1: ['Past tense revision', 'Potential form', 'Basic Kanji set 2'],
        ut2: ['たい-form (want to)', 'Giving/Receiving', 'Transport vocabulary'],
        half_yearly: ['All verb forms covered', 'Kanji (30–40)', 'Particle mastery', 'Letter format'],
        annual: ['Full Syllabus', 'All Grammar forms', 'Kanji (40–50)', 'Essay & Comprehension', 'Dialogue writing']
      },
      9: {
        ut1: ['Conditional form (たら/ば)', 'Passive voice', 'Kanji set 3'],
        ut2: ['Causative form', 'Humble & Honorific speech intro', 'Advanced Kanji'],
        half_yearly: ['All forms up to causative', 'Keigo basics', 'Kanji (50–60)', 'Formal letter'],
        annual: ['Full Syllabus', 'All Grammar', 'Keigo', 'Kanji (60–70)', 'Literature & Comprehension']
      },
      10: {
        ut1: ['Advanced Keigo', 'Causative-Passive', 'Kanji revision'],
        ut2: ['Complex sentences', 'Advanced particles', 'Essay practice'],
        half_yearly: ['All Advanced Grammar', 'Kanji (70–80)', 'Board Pattern Practice'],
        annual: ['Complete Syllabus', 'All Grammar & Kanji', 'Essay, Letter, Dialogue', 'Literature', 'Board Pattern']
      }
    },
    korean: {
      6: {
        ut1: ['Hangul Consonants & Vowels', 'Self Introduction', 'Numbers (Native 1–10)'],
        ut2: ['Hangul Double Consonants', 'Greetings & Politeness levels', 'Sino-Korean Numbers'],
        half_yearly: ['Complete Hangul', 'Numbers (Native & Sino)', 'Family vocabulary', '입니다/입니까 form', 'Basic particles (은/는, 이/가, 을/를)'],
        annual: ['Full Syllabus', 'All Hangul', 'Basic Grammar', 'Self intro & Daily life', 'Comprehension']
      },
      7: {
        ut1: ['Hangul revision', 'Past tense (-았/었)', 'Location particles'],
        ut2: ['Future tense (-겠/ㄹ 것이다)', 'Counters', 'Food vocabulary'],
        half_yearly: ['All tenses (present/past/future)', 'Particles mastery', 'Adjectives'],
        annual: ['Full Syllabus', 'All Grammar', 'Connectors (-고, -서)', 'Letter & Dialogue', 'Comprehension']
      },
      8: {
        ut1: ['Honorific speech (-시-)', 'Can/Cannot (-ㄹ 수 있다)', 'Vocabulary expansion'],
        ut2: ['Want to (-고 싶다)', 'Because (-기 때문에)', 'Transport & Directions'],
        half_yearly: ['All grammar forms', 'Honorifics', 'Complex sentences', 'Letter writing'],
        annual: ['Full Syllabus', 'All Grammar', 'Essay & Letter', 'Dialogue', 'Comprehension']
      },
      9: {
        ut1: ['Conditional (-면)', 'Passive voice', 'Advanced connectors'],
        ut2: ['Quoted speech (-다고 하다)', 'Formal vs Informal', 'Advanced vocabulary'],
        half_yearly: ['All forms up to quoted speech', 'Formal letter', 'Essay practice'],
        annual: ['Full Syllabus', 'All Grammar', 'Literature', 'Essay, Letter, Dialogue', 'Comprehension']
      },
      10: {
        ut1: ['Advanced quoted speech', 'Causative (-게 하다)', 'Revision'],
        ut2: ['Complex grammar patterns', 'Advanced writing', 'Idioms & Proverbs'],
        half_yearly: ['All Advanced Grammar', 'Board Pattern Practice'],
        annual: ['Complete Syllabus', 'All Grammar', 'Essay, Letter, Dialogue', 'Literature', 'Board Pattern']
      }
    },
    mandarin: {
      6: {
        ut1: ['Pinyin Tones (1–4)', 'Basic Greetings (你好)', 'Numbers 1–20'],
        ut2: ['Pinyin Finals & Initials', 'Self Introduction', 'Family members'],
        half_yearly: ['Complete Pinyin', 'Numbers 1–100', 'Basic Characters (20–30)', 'Simple sentences (是, 有)', 'Greetings & Introductions'],
        annual: ['Full Syllabus', 'All Pinyin', 'Characters (40–50)', 'Daily routine', 'Letter format', 'Comprehension']
      },
      7: {
        ut1: ['Pinyin revision', 'Time expressions', 'Characters set 2'],
        ut2: ['Past tense (了)', 'Location words (在, 里)', 'School vocabulary'],
        half_yearly: ['All tenses', 'Characters (60–70)', 'Measure words', 'Simple essay'],
        annual: ['Full Syllabus', 'Characters (80–90)', 'All Grammar', 'Essay & Letter', 'Comprehension']
      },
      8: {
        ut1: ['Progressive aspect (在...呢)', 'Comparison (比)', 'Characters set 3'],
        ut2: ['Complement of degree (得)', 'Direction complements', 'Travel vocabulary'],
        half_yearly: ['All grammar patterns', 'Characters (100–110)', 'Letter writing'],
        annual: ['Full Syllabus', 'All Grammar', 'Characters (120+)', 'Essay, Letter, Dialogue', 'Comprehension']
      },
      9: {
        ut1: ['把 construction', 'Passive (被)', 'Advanced Characters'],
        ut2: ['Conditional (如果...就)', 'Complex sentences', 'Formal writing'],
        half_yearly: ['All grammar forms', 'Formal letter', 'Characters (140+)'],
        annual: ['Full Syllabus', 'All Grammar', 'Literature', 'Essay & Letter', 'Comprehension']
      },
      10: {
        ut1: ['Advanced 把 & 被', 'Chengyu (成语)', 'Revision'],
        ut2: ['Complex writing', 'Advanced patterns', 'Mock practice'],
        half_yearly: ['All Advanced Grammar', 'Board Pattern Practice'],
        annual: ['Complete Syllabus', 'All Grammar & Characters', 'Essay, Letter, Dialogue', 'Literature', 'Board Pattern']
      }
    },
    russian: {
      6: {
        ut1: ['Cyrillic Alphabet', 'Greetings (Привет, Здравствуйте)', 'Numbers 1–20'],
        ut2: ['Self Introduction (Меня зовут...)', 'Family vocabulary', 'Gender of nouns'],
        half_yearly: ['Complete Alphabet', 'Numbers 1–100', 'Noun cases — Nominative & Accusative', 'Present tense verbs', 'Basic adjectives'],
        annual: ['Full Syllabus', 'All Alphabet & Pronunciation', 'Nom/Acc cases', 'Verb conjugation', 'Letter format', 'Comprehension']
      },
      7: {
        ut1: ['Alphabet revision', 'Dative case', 'Prepositional case'],
        ut2: ['Genitive case', 'Possessive pronouns', 'Daily routine'],
        half_yearly: ['4 Cases (Nom/Acc/Dat/Prep)', 'Verb aspects intro', 'Adjective agreement'],
        annual: ['Full Syllabus', 'All 4 Cases', 'Verb conjugation', 'Essay & Letter', 'Comprehension']
      },
      8: {
        ut1: ['Instrumental case', 'Verbs of motion', 'Past tense'],
        ut2: ['Genitive plural', 'Comparative adjectives', 'Transport vocabulary'],
        half_yearly: ['All 6 Cases', 'Past tense', 'Verbs of motion', 'Letter writing'],
        annual: ['Full Syllabus', 'All Cases & Verb aspects', 'Future tense', 'Essay, Letter, Dialogue', 'Comprehension']
      },
      9: {
        ut1: ['Verb aspects (perfective/imperfective)', 'Conditional mood', 'Advanced Cases'],
        ut2: ['Subjunctive (бы)', 'Passive participles', 'Formal writing'],
        half_yearly: ['All Grammar forms', 'Participles', 'Formal letter'],
        annual: ['Full Syllabus', 'All Grammar', 'Literature', 'Essay, Letter, Dialogue', 'Comprehension']
      },
      10: {
        ut1: ['Advanced verb aspects', 'Gerunds (деепричастие)', 'Revision'],
        ut2: ['Complex sentences', 'Advanced writing', 'Mock practice'],
        half_yearly: ['All Advanced Grammar', 'Board Pattern Practice'],
        annual: ['Complete Syllabus', 'All Grammar', 'Essay, Letter, Dialogue', 'Literature', 'Board Pattern']
      }
    }
  };

  // Last-minute revision sheets per language
  const revisionSheets = {
    french: [
      { icon: '🇫🇷', title: 'Articles & Pronouns', items: ['le, la, les (definite) — un, une, des (indefinite)', 'Pronoms: je, tu, il/elle, nous, vous, ils/elles', 'COD: me, te, le/la, nous, vous, les', 'COI: me, te, lui, nous, vous, leur', 'EN (quantity) & Y (place)'] },
      { icon: '📝', title: 'Key Verb Conjugations', items: ['Être: suis, es, est, sommes, êtes, sont', 'Avoir: ai, as, a, avons, avez, ont', 'Aller: vais, vas, va, allons, allez, vont', 'Faire: fais, fais, fait, faisons, faites, font', 'Passé composé = avoir/être + participe passé'] },
      { icon: '⚡', title: 'Must-Remember Rules', items: ['Negation: ne...pas, ne...jamais, ne...rien', 'Adjective goes AFTER noun (usually)', 'BANGS adjectives go BEFORE (Beauty, Age, Number, Good, Size)', 'Futur proche = aller + infinitive', 'DR MRS VANDERTRAMP verbs use être in passé composé'] }
    ],
    german: [
      { icon: '🇩🇪', title: 'Cases & Articles', items: ['Nominativ: der, die, das, die', 'Akkusativ: den, die, das, die', 'Dativ: dem, der, dem, den (+n)', 'Genitiv: des (+s), der, des (+s), der', 'Wechselpräpositionen: an, auf, in, über, unter, vor, hinter, neben, zwischen'] },
      { icon: '📝', title: 'Key Verbs', items: ['sein: bin, bist, ist, sind, seid, sind', 'haben: habe, hast, hat, haben, habt, haben', 'Modalverben: können, müssen, dürfen, sollen, wollen, mögen', 'Perfekt = haben/sein + Partizip II', 'Trennbare Verben: prefix goes to end'] },
      { icon: '⚡', title: 'Must-Remember', items: ['Verb always in 2nd position (main clause)', 'Time-Manner-Place word order', 'Weil/dass/ob → verb goes to END', 'Nicht vs Kein for negation', 'Adjective endings depend on article type'] }
    ],
    sanskrit: [
      { icon: '📖', title: 'शब्द रूप (Noun Forms)', items: ['राम (अकारान्त पुल्लिंग): रामः, रामौ, रामाः...', 'लता (आकारान्त स्त्रीलिंग): लता, लते, लताः...', 'फल (नपुंसकलिंग): फलम्, फले, फलानि...', 'विभक्ति: प्रथमा → सप्तमी + सम्बोधन', '7 विभक्ति × 3 वचन = 21 forms per शब्द'] },
      { icon: '📝', title: 'धातु रूप (Verb Forms)', items: ['लट् लकार (Present): पठति, पठतः, पठन्ति', 'लृट् लकार (Future): पठिष्यति...', 'लङ् लकार (Past): अपठत्...', 'लोट् लकार (Command): पठतु...', 'विधिलिङ् (Should): पठेत्...'] },
      { icon: '⚡', title: 'संधि & समास', items: ['दीर्घ संधि: अ+अ=आ, इ+इ=ई, उ+उ=ऊ', 'गुण संधि: अ+इ=ए, अ+उ=ओ', 'वृद्धि संधि: आ+इ=ऐ, आ+उ=औ', 'यण् संधि: इ+अ=य, उ+अ=व', 'तत्पुरुष, कर्मधारय, द्वन्द्व, बहुव्रीहि समास'] }
    ],
    spanish: [
      { icon: '🇪🇸', title: 'Key Verbs', items: ['Ser: soy, eres, es, somos, sois, son', 'Estar: estoy, estás, está, estamos, estáis, están', 'Tener: tengo, tienes, tiene, tenemos, tenéis, tienen', 'Ir: voy, vas, va, vamos, vais, van', 'Ser = permanent, Estar = temporary/location'] },
      { icon: '📝', title: 'Tenses', items: ['Presente: -o, -as, -a, -amos, -áis, -an (AR)', 'Pretérito: -é, -aste, -ó, -amos, -asteis, -aron', 'Imperfecto: -aba, -abas, -aba, -ábamos...', 'Futuro: infinitive + -é, -ás, -á, -emos, -éis, -án', 'Subjuntivo: -e, -es, -e, -emos, -éis, -en (AR)'] },
      { icon: '⚡', title: 'Must-Remember', items: ['Por vs Para: por=reason/through, para=purpose/destination', 'Gustar: me gusta (singular), me gustan (plural)', 'Double negation: No tengo nada (correct!)', 'Adjectives agree in gender AND number', 'Stem-changers: e→ie, o→ue, e→i'] }
    ],
    japanese: [
      { icon: '🇯🇵', title: 'Key Particles', items: ['は (wa) — topic marker', 'が (ga) — subject marker', 'を (wo) — object marker', 'に (ni) — direction/time/location', 'で (de) — place of action/means'] },
      { icon: '📝', title: 'Verb Forms', items: ['ます form (polite present)', 'ません (polite negative)', 'ました (polite past)', 'て form — connecting, requesting', 'ない form — plain negative'] },
      { icon: '⚡', title: 'Must-Remember', items: ['Sentence order: Subject + Object + Verb', 'です = is/am/are (polite)', 'Counting: different counters for different objects', 'Adjectives: い-adj drop い + くない, な-adj + じゃない', 'Hiragana for grammar, Katakana for foreign words'] }
    ],
    korean: [
      { icon: '🇰🇷', title: 'Key Particles', items: ['은/는 — topic marker', '이/가 — subject marker', '을/를 — object marker', '에 — location/time', '에서 — place of action'] },
      { icon: '📝', title: 'Key Endings', items: ['입니다/입니까 — formal polite', '-아요/어요 — informal polite', '-았/었 — past tense', '-겠/ㄹ 것이다 — future', '-고 싶다 — want to'] },
      { icon: '⚡', title: 'Must-Remember', items: ['Sentence order: Subject + Object + Verb', 'Consonant/vowel determines particle form', 'Honorific -시- for elders/respect', 'Formal (합쇼체) vs Informal (해요체)', 'Hangul: 14 consonants + 10 vowels'] }
    ],
    mandarin: [
      { icon: '🇨🇳', title: 'Pinyin Tones', items: ['1st tone (ā) — high flat', '2nd tone (á) — rising', '3rd tone (ǎ) — dip then rise', '4th tone (à) — falling', 'Neutral tone — light and short'] },
      { icon: '📝', title: 'Key Grammar', items: ['是 (shì) — to be', '有 (yǒu) — to have/there is', '了 (le) — completed action', '在 (zài) — at/doing now', '把 (bǎ) — object before verb'] },
      { icon: '⚡', title: 'Must-Remember', items: ['SVO word order (like English)', 'Time goes BEFORE verb', 'Measure words required before nouns (个, 本, 只...)', 'Adjective + 的 + Noun', 'Questions: add 吗 or use question word in place'] }
    ],
    russian: [
      { icon: '🇷🇺', title: 'Cases', items: ['Именительный (Nom): кто? что?', 'Родительный (Gen): кого? чего?', 'Дательный (Dat): кому? чему?', 'Винительный (Acc): кого? что?', 'Творительный (Inst): кем? чем?', 'Предложный (Prep): о ком? о чём?'] },
      { icon: '📝', title: 'Key Verbs', items: ['быть (to be) — usually omitted in present', 'Conjugation groups: -ать, -ить, -еть', 'Past tense: stem + л/ла/ло/ли', 'Aspects: imperfective (process) vs perfective (result)', 'Verbs of motion: идти/ходить, ехать/ездить'] },
      { icon: '⚡', title: 'Must-Remember', items: ['Noun gender: -а/-я (fem), consonant (masc), -о/-е (neut)', 'Adjective agrees in gender, number, case', 'Не + Genitive for "no/none"', 'Word order is flexible but affects emphasis', 'Numbers: 2-4 + Genitive singular, 5+ Genitive plural'] }
    ]
  };

  let selectedExamType = null;

  // Render last-minute revision sheet
  renderRevisionSheet();

  // Exam picker click handlers
  document.querySelectorAll('.ep-exam-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.ep-exam-option').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      selectedExamType = el.dataset.type;
      fillExamDetails(selectedExamType);
    });
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('examDetails').style.display = 'none';
    document.querySelectorAll('.ep-exam-option').forEach(e => e.classList.remove('selected'));
    selectedExamType = null;
  });

  document.getElementById('examDate').addEventListener('change', updateDaysLeft);

  function fillExamDetails(type) {
    const cal = examCalendar[type];
    const details = document.getElementById('examDetails');
    details.style.display = '';

    document.getElementById('examBadge').textContent = cal.label;
    document.getElementById('examLang').textContent =
      `${lang.charAt(0).toUpperCase() + lang.slice(1)} · Class ${cls}`;

    // Auto-fill date
    const now = new Date();
    let year = now.getFullYear();
    let examDate = new Date(year, cal.month, cal.day);
    if (examDate < now) {
      examDate = new Date(year + 1, cal.month, cal.day);
    }
    document.getElementById('examDate').value = examDate.toISOString().split('T')[0];
    updateDaysLeft();

    // Auto-fill syllabus chips
    const syllabus = cbseSyllabus[lang]?.[cls]?.[type] || ['General syllabus — ask your teacher for details'];
    const chipsContainer = document.getElementById('syllabusChips');
    chipsContainer.innerHTML = syllabus.map(ch =>
      `<span class="ep-chip">${ch}<button class="ep-chip-x" onclick="this.parentElement.remove()">×</button></span>`
    ).join('');

    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function updateDaysLeft() {
    const dateVal = document.getElementById('examDate').value;
    if (!dateVal) return;
    const diff = Math.ceil((new Date(dateVal) - new Date()) / 86400000);
    const el = document.getElementById('daysLeft');
    if (diff > 0) {
      el.textContent = diff + ' days left';
      el.style.color = diff <= 7 ? '#dc2626' : diff <= 14 ? '#f59e0b' : '#16a34a';
    } else if (diff === 0) {
      el.textContent = 'Today!';
      el.style.color = '#dc2626';
    } else {
      el.textContent = 'Date passed';
      el.style.color = '#94a3b8';
    }
  }

  // Extra chapters — Enter to add chip
  document.getElementById('extraChapters').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.target.value.trim();
      if (!val) return;
      const chip = document.createElement('span');
      chip.className = 'ep-chip ep-chip-custom';
      chip.innerHTML = `${val}<button class="ep-chip-x" onclick="this.parentElement.remove()">×</button>`;
      document.getElementById('syllabusChips').appendChild(chip);
      e.target.value = '';
    }
  });

  // Generate Revision Plan
  document.getElementById('scheduleBtn').addEventListener('click', async () => {
    const dateVal = document.getElementById('examDate').value;
    if (!dateVal || !selectedExamType) {
      alert('Please select an exam type first.');
      return;
    }

    const chips = document.querySelectorAll('#syllabusChips .ep-chip');
    const syllabus = Array.from(chips).map(c => c.textContent.replace('×', '').trim());

    const btn = document.getElementById('scheduleBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Generating...';

    try {
      const data = await apiPost('/api/exam/schedule', {
        examType: selectedExamType,
        examDate: dateVal,
        chaptersIncluded: syllabus
      });
      if (data?.plan) {
        showRevisionPlan(data.plan, dateVal);
        btn.disabled = false;
        btn.textContent = '🚀 Generate My Revision Plan';
        return;
      }
    } catch (e) {}

    // Fallback demo plan
    showRevisionPlan(generateDemoPlan(selectedExamType, syllabus, dateVal), dateVal);
    btn.disabled = false;
    btn.textContent = '🚀 Generate My Revision Plan';
  });

  function showRevisionPlan(plan, dateStr) {
    const section = document.getElementById('revisionSection');
    section.style.display = '';
    section.scrollIntoView({ behavior: 'smooth' });

    const examDate = new Date(dateStr);
    const daysLeft = Math.ceil((examDate - new Date()) / 86400000);
    document.getElementById('countdown').textContent = daysLeft > 0 ? daysLeft + ' days left' : 'Exam day!';

    const grid = document.getElementById('planGrid');
    grid.innerHTML = '';

    const days = plan.days || plan;
    (Array.isArray(days) ? days : []).forEach((day, i) => {
      const el = document.createElement('div');
      el.className = 'plan-day';
      const title = day.title || day.focus || `Day ${i + 1}`;
      const desc = day.description || (day.tasks || []).join(', ') || '';
      const tag = day.tag || day.duration || 'Study';
      el.innerHTML = `
        <div class="plan-day-num">D${i + 1}</div>
        <div class="plan-day-info">
          <div class="plan-day-title">${title}</div>
          <div class="plan-day-desc">${desc}</div>
          <span class="plan-day-tag">${tag}</span>
        </div>
      `;
      grid.appendChild(el);
    });

    if (plan.motivation) {
      const motiv = document.createElement('div');
      motiv.className = 'plan-motivation';
      motiv.textContent = plan.motivation;
      grid.appendChild(motiv);
    }
  }

  function generateDemoPlan(type, syllabus, dateStr) {
    const examDate = new Date(dateStr);
    const totalDays = Math.max(3, Math.ceil((examDate - new Date()) / 86400000));
    const planDays = Math.min(totalDays, 10);
    const langName = lang.charAt(0).toUpperCase() + lang.slice(1);

    const templates = [
      { title: `Read & Highlight — ${syllabus[0] || langName}`, description: 'Go through first set of chapters. Highlight key definitions, rules, and examples.', tag: 'Reading' },
      { title: 'Grammar Rules Deep Dive', description: 'Revise all grammar topics covered in syllabus. Make flashcards for tricky rules.', tag: 'Grammar' },
      { title: 'Vocabulary & Word Meanings', description: 'Review difficult words, translations. Practice writing them from memory.', tag: 'Vocabulary' },
      { title: 'Previous Year Questions', description: 'Solve last 2–3 years question papers. Time yourself.', tag: 'Practice' },
      { title: 'Writing Skills Practice', description: 'Practice letter writing, essay format, dialogue completion. Check grammar.', tag: 'Writing' },
      { title: 'Weak Areas Focus Session', description: 'Revisit topics you find difficult. Use AI Tutor for explanations.', tag: 'Revision' },
      { title: 'Full Mock Test', description: 'Take a complete mock exam under timed conditions. Self-grade honestly.', tag: 'Mock Test' },
      { title: 'Error Analysis', description: 'Go through mock test mistakes. Understand why each error happened.', tag: 'Analysis' },
      { title: 'Quick Revision — All Rules', description: 'Use the Last-Minute Sheet below. Review all key rules in 1 hour.', tag: 'Quick Rev' },
      { title: 'Light Revision + Rest', description: 'Light reading only. Stay calm, sleep well. You are prepared!', tag: 'Rest Day' },
    ];

    return { days: templates.slice(0, planDays), motivation: `You've got this! ${planDays} days of focused prep is all you need. 💪` };
  }

  // Mock Test (same logic, improved)
  const startMockBtn  = document.getElementById('startMock');
  const mockArea      = document.getElementById('mockArea');
  const mockSetup     = document.getElementById('mockSetup');
  const mockResult    = document.getElementById('mockResult');
  const mockQ         = document.getElementById('mockQ');
  const mockOpts      = document.getElementById('mockOpts');
  const mockFill      = document.getElementById('mockFill');
  const mockCount     = document.getElementById('mockCount');
  const mockFeedback  = document.getElementById('mockFeedback');
  const mockScoreEl   = document.getElementById('mockScore');
  const mockMsg       = document.getElementById('mockMsg');
  const retryMock     = document.getElementById('retryMock');

  const mockQuestionBanks = {
    french: [
      { q: 'Choose the correct article: ___ chat est noir.', opts: ['Le', 'La', 'Les', 'Un'], ans: 0 },
      { q: '"Je ne mange pas" means:', opts: ['I am eating', 'I do not eat', 'I will eat', 'I ate'], ans: 1 },
      { q: 'Conjugate "aller" for "nous":', opts: ['allons', 'allez', 'vont', 'allent'], ans: 0 },
      { q: 'Which is passé composé of "aller" for "elle"?', opts: ['elle a allé', 'elle est allée', 'elle allait', 'elle va'], ans: 1 },
      { q: '"Les enfants ___ dans le parc."', opts: ['joue', 'joues', 'jouent', 'jouons'], ans: 2 },
      { q: 'BANGS adjectives go ___ the noun.', opts: ['after', 'before', 'either side', 'nowhere'], ans: 1 },
      { q: '"Nous avons" means:', opts: ['We are', 'We have', 'They have', 'You have'], ans: 1 },
      { q: 'Futur proche uses which verb + infinitive?', opts: ['avoir', 'être', 'aller', 'faire'], ans: 2 },
      { q: '"Bonjour" is used for:', opts: ['Good night', 'Good morning/day', 'Goodbye', 'Thank you'], ans: 1 },
      { q: 'Which verb uses être in passé composé?', opts: ['manger', 'aller', 'faire', 'avoir'], ans: 1 },
    ],
    german: [
      { q: 'Akkusativ of "der Hund" is:', opts: ['der Hund', 'den Hund', 'dem Hund', 'des Hundes'], ans: 1 },
      { q: '"Ich bin" means:', opts: ['I have', 'I am', 'I go', 'I eat'], ans: 1 },
      { q: 'Where does the verb go in a "weil" clause?', opts: ['1st position', '2nd position', 'End', 'Anywhere'], ans: 2 },
      { q: '"Können" is a ___ verb.', opts: ['regular', 'modal', 'reflexive', 'separable'], ans: 1 },
      { q: 'Dativ of "die Frau" is:', opts: ['die Frau', 'der Frau', 'den Frau', 'des Frau'], ans: 1 },
      { q: 'German word order rule is:', opts: ['SVO always', 'Verb 2nd position', 'SOV always', 'Free order'], ans: 1 },
      { q: '"Guten Morgen" means:', opts: ['Good night', 'Good morning', 'Goodbye', 'Good day'], ans: 1 },
      { q: 'Perfekt uses haben/sein + ___:', opts: ['Infinitiv', 'Partizip I', 'Partizip II', 'Konjunktiv'], ans: 2 },
      { q: '"Aufstehen" is a ___ verb.', opts: ['modal', 'reflexive', 'trennbar', 'irregular'], ans: 2 },
      { q: 'Time-Manner-Place is the ___ word order.', opts: ['English', 'German', 'French', 'Latin'], ans: 1 },
    ],
    sanskrit: [
      { q: '"गच्छति" is which लकार?', opts: ['लट्', 'लृट्', 'लङ्', 'लोट्'], ans: 0 },
      { q: 'Which vibhakti is used for "से"?', opts: ['प्रथमा', 'तृतीया', 'पंचमी', 'चतुर्थी'], ans: 1 },
      { q: 'दीर्घ संधि: अ + आ = ?', opts: ['आ', 'ए', 'ऐ', 'ओ'], ans: 0 },
      { q: '"रामस्य" is which विभक्ति?', opts: ['प्रथमा', 'चतुर्थी', 'षष्ठी', 'सप्तमी'], ans: 2 },
      { q: 'लृट् लकार is for:', opts: ['Present', 'Past', 'Future', 'Command'], ans: 2 },
      { q: '"पठतु" is which लकार?', opts: ['लट्', 'लृट्', 'लोट्', 'विधिलिङ्'], ans: 2 },
      { q: 'गुण संधि: अ + इ = ?', opts: ['ऐ', 'ए', 'ओ', 'आ'], ans: 1 },
      { q: '"फलानि" is which वचन?', opts: ['एकवचन', 'द्विवचन', 'बहुवचन', 'None'], ans: 2 },
      { q: 'यण् संधि: इ + अ = ?', opts: ['या', 'य', 'ये', 'यो'], ans: 0 },
      { q: '"पठेत्" is which लकार?', opts: ['लट्', 'लोट्', 'विधिलिङ्', 'लृट्'], ans: 2 },
    ],
    spanish: [
      { q: 'Ser vs Estar: "Ella ___ doctora."', opts: ['está', 'es', 'ser', 'estar'], ans: 1 },
      { q: '"Tengo" means:', opts: ['I am', 'I have', 'I go', 'I want'], ans: 1 },
      { q: 'Pretérito of "hablar" for "yo":', opts: ['hablo', 'hablé', 'hablaba', 'hablaré'], ans: 1 },
      { q: '"Me gusta" literally means:', opts: ['I like', 'It pleases me', 'I want', 'I enjoy'], ans: 1 },
      { q: 'Por vs Para: "Esto es ___ ti."', opts: ['por', 'para', 'either', 'neither'], ans: 1 },
      { q: '"Buenos días" means:', opts: ['Good night', 'Good morning', 'Goodbye', 'Good luck'], ans: 1 },
      { q: 'Stem-change: "poder" → yo ___', opts: ['podo', 'puedo', 'podo', 'piedo'], ans: 1 },
      { q: '"No tengo nada" is:', opts: ['Incorrect double negative', 'Correct Spanish grammar', 'Slang only', 'Future tense'], ans: 1 },
      { q: 'Futuro: hablar → yo ___', opts: ['hablaré', 'hablé', 'hablaba', 'hable'], ans: 0 },
      { q: '"¿Cómo te llamas?" asks for your:', opts: ['Age', 'Name', 'Address', 'Phone'], ans: 1 },
    ],
    japanese: [
      { q: 'は is pronounced as ___ when used as particle.', opts: ['ha', 'wa', 'ba', 'pa'], ans: 1 },
      { q: '"これは本です" means:', opts: ['That is a book', 'This is a book', 'I have a book', 'Books are here'], ans: 1 },
      { q: 'を marks the ___ of a sentence.', opts: ['subject', 'object', 'topic', 'time'], ans: 1 },
      { q: '"たべます" is which form?', opts: ['Plain', 'ます form', 'て form', 'ない form'], ans: 1 },
      { q: 'Katakana is used for:', opts: ['Grammar', 'Native words', 'Foreign words', 'Verbs only'], ans: 2 },
      { q: 'Japanese sentence order is:', opts: ['SVO', 'SOV', 'VSO', 'OVS'], ans: 1 },
      { q: '"すみません" means:', opts: ['Hello', 'Excuse me/Sorry', 'Thank you', 'Goodbye'], ans: 1 },
      { q: 'い-adjective negative: おいしい →', opts: ['おいしいない', 'おいしくない', 'おいしじゃない', 'おいしません'], ans: 1 },
      { q: '"に" particle is used for:', opts: ['Object', 'Direction/Time', 'Topic', 'Means'], ans: 1 },
      { q: '"ありがとう" means:', opts: ['Sorry', 'Hello', 'Thank you', 'Please'], ans: 2 },
    ],
    korean: [
      { q: '은/는 marks the ___ of a sentence.', opts: ['subject', 'topic', 'object', 'place'], ans: 1 },
      { q: '"감사합니다" means:', opts: ['Sorry', 'Hello', 'Thank you', 'Goodbye'], ans: 2 },
      { q: 'Korean sentence order is:', opts: ['SVO', 'SOV', 'VSO', 'OVS'], ans: 1 },
      { q: '을/를 marks the:', opts: ['subject', 'topic', 'object', 'place'], ans: 2 },
      { q: '"안녕하세요" is a:', opts: ['Goodbye', 'Greeting', 'Thank you', 'Sorry'], ans: 1 },
      { q: 'Past tense marker is:', opts: ['-겠-', '-았/었-', '-ㄹ 것-', '-시-'], ans: 1 },
      { q: 'Hangul has ___ basic consonants.', opts: ['10', '14', '21', '24'], ans: 1 },
      { q: '"-고 싶다" means:', opts: ['must do', 'want to', 'can do', 'should do'], ans: 1 },
      { q: 'Honorific marker is:', opts: ['-겠-', '-시-', '-았-', '-ㄹ-'], ans: 1 },
      { q: '"네" in Korean means:', opts: ['No', 'Yes', 'Maybe', 'Hello'], ans: 1 },
    ],
    mandarin: [
      { q: '"你好" (nǐ hǎo) means:', opts: ['Goodbye', 'Thank you', 'Hello', 'Sorry'], ans: 2 },
      { q: '3rd tone is:', opts: ['High flat', 'Rising', 'Dip then rise', 'Falling'], ans: 2 },
      { q: '"了" indicates:', opts: ['Future', 'Completed action', 'Question', 'Negation'], ans: 1 },
      { q: 'Measure word for books is:', opts: ['个', '本', '只', '把'], ans: 1 },
      { q: '"我是学生" means:', opts: ['I have a student', 'I am a student', 'Student is here', 'My student'], ans: 1 },
      { q: 'To make a yes/no question, add:', opts: ['了', '吗', '的', '在'], ans: 1 },
      { q: 'Time in Chinese goes ___ the verb.', opts: ['after', 'before', 'either side', 'nowhere'], ans: 1 },
      { q: '"不" (bù) means:', opts: ['Yes', 'No/Not', 'Also', 'Very'], ans: 1 },
      { q: '"在" can mean:', opts: ['at/in + doing now', 'past tense', 'future', 'question'], ans: 0 },
      { q: 'Chinese word order is:', opts: ['SOV', 'SVO', 'VSO', 'Free'], ans: 1 },
    ],
    russian: [
      { q: '"Привет" means:', opts: ['Goodbye', 'Hello (informal)', 'Thank you', 'Please'], ans: 1 },
      { q: 'Genitive case answers:', opts: ['кто? что?', 'кого? чего?', 'кому? чему?', 'кем? чем?'], ans: 1 },
      { q: 'Russian past tense adds:', opts: ['-ет', '-л/ла/ло', '-ть', '-ют'], ans: 1 },
      { q: 'Noun ending "-а/-я" is usually:', opts: ['masculine', 'feminine', 'neuter', 'plural'], ans: 1 },
      { q: '"Меня зовут" means:', opts: ['I live in', 'My name is', 'I want', 'I have'], ans: 1 },
      { q: '"Не" + Genitive means:', opts: ['Some', 'No/None of', 'Many', 'All'], ans: 1 },
      { q: 'Imperfective aspect describes:', opts: ['Completed action', 'Process/repeated', 'Future only', 'Commands'], ans: 1 },
      { q: '"Идти" means to go:', opts: ['by vehicle', 'on foot (one way)', 'on foot (round trip)', 'flying'], ans: 1 },
      { q: 'Prepositional case is used with:', opts: ['в, на (location)', 'к, по', 'из, от', 'за, под'], ans: 0 },
      { q: '"Спасибо" means:', opts: ['Sorry', 'Hello', 'Thank you', 'Please'], ans: 2 },
    ]
  };

  const mockQuestions = mockQuestionBanks[lang] || mockQuestionBanks.french;

  let mockIdx = 0, mockScore = 0, mockLocked = false;

  startMockBtn.addEventListener('click', () => {
    mockIdx = 0; mockScore = 0; mockLocked = false;
    mockSetup.style.display = 'none';
    mockResult.style.display = 'none';
    mockArea.style.display = '';
    showMockQuestion();
  });

  retryMock.addEventListener('click', () => {
    mockResult.style.display = 'none';
    mockSetup.style.display = '';
  });

  function showMockQuestion() {
    if (mockIdx >= mockQuestions.length) { finishMock(); return; }
    const q = mockQuestions[mockIdx];
    mockFill.style.width = ((mockIdx + 1) / mockQuestions.length * 100) + '%';
    mockCount.textContent = (mockIdx + 1) + '/' + mockQuestions.length;
    mockQ.textContent = q.q;
    mockFeedback.textContent = '';
    mockLocked = false;
    mockOpts.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'mock-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectMockAnswer(i, q.ans));
      mockOpts.appendChild(btn);
    });
  }

  function selectMockAnswer(selected, correct) {
    if (mockLocked) return;
    mockLocked = true;
    const btns = mockOpts.querySelectorAll('.mock-opt');
    btns[correct].classList.add('correct');
    if (selected === correct) {
      mockScore++;
      mockFeedback.textContent = '✅ Correct!';
      mockFeedback.style.color = '#16a34a';
    } else {
      btns[selected].classList.add('wrong');
      mockFeedback.textContent = '❌ Wrong — correct answer highlighted';
      mockFeedback.style.color = '#f87171';
    }
    setTimeout(() => { mockIdx++; showMockQuestion(); }, 1200);
  }

  function finishMock() {
    mockArea.style.display = 'none';
    mockResult.style.display = '';
    mockScoreEl.textContent = mockScore + '/' + mockQuestions.length;
    const pct = Math.round(mockScore / mockQuestions.length * 100);
    if (pct >= 80) mockMsg.textContent = 'Excellent! You are well prepared! 🎉';
    else if (pct >= 50) mockMsg.textContent = 'Good effort! Review what you missed and retry.';
    else mockMsg.textContent = 'Keep studying! Use AI Tutor + revision sheet to improve.';
  }

  function renderRevisionSheet() {
    const sheets = revisionSheets[lang] || revisionSheets.french;
    const grid = document.getElementById('sheetGrid');
    grid.innerHTML = sheets.map(s => `
      <div class="sheet-card">
        <div class="sheet-icon">${s.icon}</div>
        <h4>${s.title}</h4>
        <ul class="sheet-list">
          ${s.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

})();

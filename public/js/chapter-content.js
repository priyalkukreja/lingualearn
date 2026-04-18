// ===== DETAILED CHAPTER CONTENT FOR PDF NOTES =====
// Real CBSE textbook content: vocabulary, grammar, important questions, exercise solutions

const chapterContent = {
  french: {
    6: {
      0: {
        vocab: [
          { word: 'Bonjour', meaning: 'Hello / Good morning', example: 'Bonjour, comment ça va?' },
          { word: 'Au revoir', meaning: 'Goodbye', example: 'Au revoir, à demain!' },
          { word: 'Merci', meaning: 'Thank you', example: 'Merci beaucoup!' },
          { word: "S'il vous plaît", meaning: 'Please (formal)', example: "Un café, s'il vous plaît." },
          { word: 'Comment', meaning: 'How', example: 'Comment allez-vous?' },
          { word: 'Oui / Non', meaning: 'Yes / No', example: 'Oui, je suis indien.' },
          { word: 'Madame', meaning: 'Mrs / Madam', example: 'Bonjour, Madame Dupont.' },
          { word: 'Monsieur', meaning: 'Mr / Sir', example: 'Monsieur Martin est professeur.' }
        ],
        grammar: [
          { rule: 'The French Alphabet', explanation: 'French has 26 letters like English but pronunciation differs. Key sounds: é (ay), è (eh), ç (ss), oi (wa), ou (oo).' },
          { rule: 'Greetings', explanation: 'Bonjour = Hello (day), Bonsoir = Good evening, Bonne nuit = Good night, Salut = Hi (informal).' },
          { rule: 'Numbers 1-20', explanation: '1=un, 2=deux, 3=trois, 4=quatre, 5=cinq, 6=six, 7=sept, 8=huit, 9=neuf, 10=dix, 11=onze, 12=douze, 13=treize, 14=quatorze, 15=quinze, 16=seize, 17=dix-sept, 18=dix-huit, 19=dix-neuf, 20=vingt.' }
        ],
        importantQA: [
          { q: 'How do you greet someone in French during the day?', a: 'We say "Bonjour" to greet someone during the day. For evening, we say "Bonsoir".' },
          { q: 'Write the French numbers from 1 to 10.', a: 'Un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix.' },
          { q: 'What is the difference between "tu" and "vous"?', a: '"Tu" is informal (used with friends, family, children). "Vous" is formal (used with elders, strangers, teachers) or plural.' }
        ],
        exercises: [
          { q: 'Write greetings for: morning, evening, goodbye.', a: 'Bonjour (morning), Bonsoir (evening), Au revoir (goodbye).' },
          { q: 'Count from 11 to 20 in French.', a: 'Onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt.' }
        ]
      },
      1: {
        vocab: [
          { word: 'La France', meaning: 'France', example: 'La France est un beau pays.' },
          { word: 'La carte', meaning: 'The map', example: 'Voilà la carte de France.' },
          { word: 'La capitale', meaning: 'The capital', example: 'Paris est la capitale de la France.' },
          { word: 'Le pays', meaning: 'The country', example: 'La France est un grand pays.' },
          { word: 'La tour Eiffel', meaning: 'The Eiffel Tower', example: 'La tour Eiffel est à Paris.' },
          { word: 'Le fromage', meaning: 'Cheese', example: 'Le fromage français est délicieux.' },
          { word: 'Le vin', meaning: 'Wine', example: 'La France produit du vin.' },
          { word: 'Le fleuve', meaning: 'River', example: 'La Seine est un fleuve.' }
        ],
        grammar: [
          { rule: 'Definite Articles', explanation: 'Le (masc. singular), La (fem. singular), Les (plural). Before vowel: L\'. Example: le garçon, la fille, l\'école, les enfants.' },
          { rule: "C'est / Ce sont", explanation: "C'est = It is / This is (singular). Ce sont = These are (plural). C'est la France. Ce sont les monuments." },
          { rule: 'Gender of Nouns', explanation: 'Every French noun is masculine or feminine. Generally: -tion/-sion = feminine, -ment/-age = masculine. You must memorize each noun with its article.' }
        ],
        importantQA: [
          { q: 'Name the capital of France and two famous monuments.', a: 'Paris is the capital. Famous monuments: la tour Eiffel (Eiffel Tower), le Louvre (museum), Notre-Dame (cathedral).' },
          { q: 'What are the definite articles in French?', a: 'Le (masculine), la (feminine), les (plural), l\' (before vowel). Example: le livre, la table, les élèves, l\'ami.' },
          { q: 'Name three rivers of France.', a: 'La Seine, la Loire, le Rhône.' }
        ],
        exercises: [
          { q: 'Fill: ___ France est ___ beau pays.', a: 'La France est un beau pays.' },
          { q: 'Put the correct article: ___ école, ___ garçon, ___ filles.', a: "L'école, le garçon, les filles." }
        ]
      },
      2: {
        vocab: [
          { word: 'Le frère', meaning: 'Brother', example: 'Voilà le frère de Manuel.' },
          { word: 'La sœur', meaning: 'Sister', example: 'La sœur de Manuel est petite.' },
          { word: 'Le père', meaning: 'Father', example: 'Le père est grand.' },
          { word: 'La mère', meaning: 'Mother', example: 'La mère est gentille.' },
          { word: 'La famille', meaning: 'Family', example: 'C\'est la famille de Manuel.' },
          { word: 'Grand / Grande', meaning: 'Tall / Big', example: 'Le frère est grand.' },
          { word: 'Petit / Petite', meaning: 'Short / Small', example: 'La sœur est petite.' },
          { word: 'Voilà', meaning: 'Here is / There is', example: 'Voilà mon frère.' }
        ],
        grammar: [
          { rule: 'Possessive Adjectives', explanation: 'Mon/Ma/Mes (my), Ton/Ta/Tes (your), Son/Sa/Ses (his/her). Mon frère, ma sœur, mes parents. Before feminine vowel-word: use mon/ton/son — mon amie (not ma amie).' },
          { rule: 'Verb Être (to be)', explanation: 'Je suis, Tu es, Il/Elle est, Nous sommes, Vous êtes, Ils/Elles sont. Most important French verb!' },
          { rule: 'Adjective Agreement', explanation: 'Adjectives agree in gender and number. Add -e for feminine, -s for plural, -es for feminine plural. Grand → grande → grands → grandes.' }
        ],
        importantQA: [
          { q: 'Conjugate the verb "être" in present tense.', a: 'Je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.' },
          { q: 'What are possessive adjectives for "my"?', a: 'Mon (masc.), ma (fem.), mes (plural). Example: mon père, ma mère, mes frères.' },
          { q: 'How do adjectives change in French?', a: 'They agree with the noun in gender and number. Add -e for feminine, -s for plural. Petit → petite → petits → petites.' }
        ],
        exercises: [
          { q: 'Complete: ___ (my) sœur est ___ (small).', a: 'Ma sœur est petite.' },
          { q: 'Conjugate être: Nous ___ français.', a: 'Nous sommes français.' }
        ]
      },
      3: {
        vocab: [
          { word: 'La cafétéria', meaning: 'Cafeteria', example: 'Allons à la cafétéria.' },
          { word: 'Le sandwich', meaning: 'Sandwich', example: 'Je voudrais un sandwich.' },
          { word: 'Le jus', meaning: 'Juice', example: 'Un jus d\'orange, s\'il vous plaît.' },
          { word: 'Le café', meaning: 'Coffee', example: 'Le café est chaud.' },
          { word: 'Le lait', meaning: 'Milk', example: 'Je bois du lait.' },
          { word: 'L\'eau', meaning: 'Water', example: 'Je voudrais de l\'eau.' },
          { word: 'Le gâteau', meaning: 'Cake', example: 'Le gâteau est délicieux.' },
          { word: 'La glace', meaning: 'Ice cream', example: 'J\'aime la glace au chocolat.' }
        ],
        grammar: [
          { rule: 'Indefinite Articles', explanation: 'Un (masc.), Une (fem.), Des (plural). Un livre = a book, une table = a table, des cahiers = some notebooks.' },
          { rule: 'Verb Avoir (to have)', explanation: "J'ai, Tu as, Il/Elle a, Nous avons, Vous avez, Ils/Elles ont. Used for age: J'ai 12 ans (I am 12)." },
          { rule: 'Negation', explanation: "Ne...pas around the verb. Je suis → Je ne suis pas. J'ai → Je n'ai pas. Je mange → Je ne mange pas." }
        ],
        importantQA: [
          { q: 'Conjugate avoir in present tense.', a: "J'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont." },
          { q: 'How do you make a sentence negative in French?', a: "Put ne before the verb and pas after. Example: Je parle → Je ne parle pas." },
          { q: 'What are the indefinite articles?', a: 'Un (masculine singular), une (feminine singular), des (plural). Un garçon, une fille, des enfants.' }
        ],
        exercises: [
          { q: 'Make negative: Je suis français.', a: 'Je ne suis pas français.' },
          { q: 'Fill articles: ___ sandwich, ___ glace, ___ gâteaux.', a: 'Un sandwich, une glace, des gâteaux.' }
        ]
      }
    },
    7: {
      1: {
        vocab: [
          { word: 'Le drapeau', meaning: 'Flag', example: 'Le drapeau français est bleu, blanc, rouge.' },
          { word: 'La devise', meaning: 'Motto', example: 'Liberté, Égalité, Fraternité est la devise.' },
          { word: 'Le symbole', meaning: 'Symbol', example: 'Le coq est un symbole de la France.' },
          { word: 'L\'hymne national', meaning: 'National anthem', example: 'La Marseillaise est l\'hymne national.' },
          { word: 'La République', meaning: 'Republic', example: 'La France est une République.' },
          { word: 'Célèbre', meaning: 'Famous', example: 'Paris est une ville célèbre.' }
        ],
        grammar: [
          { rule: 'Adjective Position', explanation: 'Most adjectives come AFTER the noun in French: une ville célèbre. BAGS adjectives come BEFORE: Beauty (beau), Age (vieux), Goodness (bon), Size (grand).' },
          { rule: 'Plural of Nouns', explanation: 'Usually add -s: livre → livres. Words ending in -eau add -x: gâteau → gâteaux. Words ending in -al change to -aux: animal → animaux.' }
        ],
        importantQA: [
          { q: 'What is the motto of France?', a: 'Liberté, Égalité, Fraternité (Liberty, Equality, Fraternity).' },
          { q: 'Where do adjectives go in French?', a: 'Most go after the noun. BAGS adjectives (Beauty, Age, Goodness, Size) go before: un grand garçon, une belle fille.' }
        ],
        exercises: [
          { q: 'Put adjective correctly: une fille (intelligent).', a: 'Une fille intelligente.' },
          { q: 'Write plural: le gâteau, l\'animal, le livre.', a: 'Les gâteaux, les animaux, les livres.' }
        ]
      }
    },
    8: {
      1: {
        vocab: [
          { word: 'Connaître', meaning: 'To know (people/places)', example: 'Je connais la France.' },
          { word: 'Savoir', meaning: 'To know (facts)', example: 'Je sais parler français.' },
          { word: 'La géographie', meaning: 'Geography', example: 'La géographie de la France est variée.' },
          { word: 'Le monument', meaning: 'Monument', example: 'Il y a beaucoup de monuments à Paris.' },
          { word: 'La culture', meaning: 'Culture', example: 'La culture française est riche.' },
          { word: 'Le musée', meaning: 'Museum', example: 'Le Louvre est un grand musée.' }
        ],
        grammar: [
          { rule: 'Savoir vs Connaître', explanation: 'Savoir = to know facts/how to do. Connaître = to know/be familiar with people/places. Je sais nager. Je connais Paris.' },
          { rule: 'Interrogative Sentences', explanation: '3 ways to ask questions: 1) Intonation: Tu parles français? 2) Est-ce que: Est-ce que tu parles français? 3) Inversion: Parles-tu français?' }
        ],
        importantQA: [
          { q: 'Difference between savoir and connaître?', a: 'Savoir is for facts and skills (je sais nager). Connaître is for familiarity with people/places (je connais Marie).' },
          { q: 'Name 3 ways to form questions in French.', a: '1) Rising intonation: Tu aimes le café? 2) Est-ce que: Est-ce que tu aimes le café? 3) Inversion: Aimes-tu le café?' }
        ],
        exercises: [
          { q: 'Choose savoir or connaître: Je ___ Paris. Je ___ nager.', a: 'Je connais Paris. Je sais nager.' }
        ]
      }
    },
    9: {
      1: {
        vocab: [
          { word: 'Le grand-père', meaning: 'Grandfather', example: 'Mon grand-père a 70 ans.' },
          { word: 'La grand-mère', meaning: 'Grandmother', example: 'Ma grand-mère cuisine bien.' },
          { word: 'L\'oncle', meaning: 'Uncle', example: "L'oncle de Marie est médecin." },
          { word: 'La tante', meaning: 'Aunt', example: 'Ma tante habite à Lyon.' },
          { word: 'Le cousin / La cousine', meaning: 'Cousin (m/f)', example: 'Mon cousin a 15 ans.' },
          { word: 'Le neveu / La nièce', meaning: 'Nephew / Niece', example: 'Le neveu de mon père est mon cousin.' },
          { word: 'Le mari / La femme', meaning: 'Husband / Wife', example: 'Le mari de ma tante est mon oncle.' },
          { word: 'Les petits-enfants', meaning: 'Grandchildren', example: 'Mes grands-parents ont 5 petits-enfants.' }
        ],
        grammar: [
          { rule: 'Possessive Pronouns', explanation: 'Le mien/la mienne (mine), le tien/la tienne (yours), le sien/la sienne (his/hers). Ce livre est le mien. Cette maison est la sienne.' },
          { rule: 'Adjectives — Irregular Forms', explanation: 'Beau/belle/beaux/belles, vieux/vieille/vieux/vieilles, nouveau/nouvelle/nouveaux/nouvelles. Before masc. vowel-noun: bel, vieil, nouvel — un bel homme.' },
          { rule: 'Present Tense — ER Verbs', explanation: 'Remove -er, add: -e, -es, -e, -ons, -ez, -ent. Parler: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.' }
        ],
        importantQA: [
          { q: 'Describe your family in French (5 sentences).', a: 'Ma famille est grande. Mon père est ingénieur. Ma mère est professeur. J\'ai un frère et une sœur. Mon grand-père habite avec nous.' },
          { q: 'Conjugate "parler" in present tense.', a: 'Je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.' },
          { q: 'Give the feminine forms: beau, vieux, nouveau.', a: 'Belle, vieille, nouvelle.' }
        ],
        exercises: [
          { q: 'Write 5 family members with articles.', a: 'Le père, la mère, le frère, la sœur, les grands-parents.' },
          { q: 'Conjugate "aimer": Je ___, Tu ___, Nous ___.', a: "J'aime, Tu aimes, Nous aimons." }
        ]
      }
    },
    10: {
      1: {
        vocab: [
          { word: 'La vie quotidienne', meaning: 'Daily life', example: 'La vie quotidienne est bien organisée.' },
          { word: 'Se réveiller', meaning: 'To wake up', example: 'Je me réveille à 6 heures.' },
          { word: 'Se lever', meaning: 'To get up', example: 'Elle se lève tôt.' },
          { word: 'Se coucher', meaning: 'To go to bed', example: 'Il se couche à 22 heures.' },
          { word: 'Le petit déjeuner', meaning: 'Breakfast', example: 'Le petit déjeuner est prêt.' },
          { word: 'Le déjeuner', meaning: 'Lunch', example: 'Le déjeuner est à midi.' }
        ],
        grammar: [
          { rule: 'Reflexive Verbs', explanation: 'Se + verb. The pronoun changes: je me lave, tu te laves, il se lave, nous nous lavons, vous vous lavez, ils se lavent.' },
          { rule: 'Passé Composé', explanation: 'Past tense = avoir/être + past participle. Manger → mangé, finir → fini, prendre → pris. With être: 17 verbs (aller, venir, partir...) + all reflexive verbs.' }
        ],
        importantQA: [
          { q: 'Conjugate "se lever" in present tense.', a: 'Je me lève, tu te lèves, il/elle se lève, nous nous levons, vous vous levez, ils/elles se lèvent.' },
          { q: 'Form passé composé: manger, aller, se laver.', a: "J'ai mangé, je suis allé(e), je me suis lavé(e)." }
        ],
        exercises: [
          { q: 'Describe your daily routine (5 sentences in French).', a: 'Je me réveille à 6h. Je me lave. Je prends le petit déjeuner. Je vais à l\'école. Je me couche à 22h.' }
        ]
      }
    }
  },

  german: {
    6: {
      0: {
        vocab: [
          { word: 'Hallo', meaning: 'Hello', example: 'Hallo, wie geht es dir?' },
          { word: 'Guten Morgen', meaning: 'Good morning', example: 'Guten Morgen, Frau Schmidt!' },
          { word: 'Tschüss', meaning: 'Bye', example: 'Tschüss, bis morgen!' },
          { word: 'Danke', meaning: 'Thank you', example: 'Danke schön!' },
          { word: 'Bitte', meaning: 'Please / You\'re welcome', example: 'Ein Wasser, bitte.' },
          { word: 'Ja / Nein', meaning: 'Yes / No', example: 'Ja, ich bin Inder.' },
          { word: 'Wie heißt du?', meaning: 'What is your name?', example: 'Wie heißt du? — Ich heiße Priya.' },
          { word: 'Woher kommst du?', meaning: 'Where are you from?', example: 'Ich komme aus Indien.' }
        ],
        grammar: [
          { rule: 'German Alphabet', explanation: 'German has 26 letters + 4 special: ä (ae), ö (oe), ü (ue), ß (ss). Pronunciation: W sounds like V, V sounds like F, J sounds like Y.' },
          { rule: 'Personal Pronouns', explanation: 'ich (I), du (you informal), er/sie/es (he/she/it), wir (we), ihr (you plural), sie/Sie (they/you formal).' },
          { rule: 'Numbers 1-20', explanation: '1=eins, 2=zwei, 3=drei, 4=vier, 5=fünf, 6=sechs, 7=sieben, 8=acht, 9=neun, 10=zehn, 11=elf, 12=zwölf, 13=dreizehn, 14=vierzehn, 15=fünfzehn, 16=sechzehn, 17=siebzehn, 18=achtzehn, 19=neunzehn, 20=zwanzig.' }
        ],
        importantQA: [
          { q: 'How do you introduce yourself in German?', a: 'Ich heiße [name]. Ich komme aus [country]. Ich bin [age] Jahre alt.' },
          { q: 'What are the special German letters?', a: 'ä (Umlaut a), ö (Umlaut o), ü (Umlaut u), ß (Eszett/sharp s).' },
          { q: 'Count from 1 to 10 in German.', a: 'Eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn.' }
        ],
        exercises: [
          { q: 'Introduce yourself in 3 German sentences.', a: 'Hallo! Ich heiße Priya. Ich komme aus Indien. Ich bin 12 Jahre alt.' },
          { q: 'Write greetings for morning, afternoon, evening.', a: 'Guten Morgen, Guten Tag, Guten Abend.' }
        ]
      },
      1: {
        vocab: [
          { word: 'Die Familie', meaning: 'Family', example: 'Meine Familie ist groß.' },
          { word: 'Der Vater', meaning: 'Father', example: 'Mein Vater heißt Raj.' },
          { word: 'Die Mutter', meaning: 'Mother', example: 'Meine Mutter ist Lehrerin.' },
          { word: 'Der Bruder', meaning: 'Brother', example: 'Mein Bruder ist 10 Jahre alt.' },
          { word: 'Die Schwester', meaning: 'Sister', example: 'Meine Schwester geht in die Schule.' },
          { word: 'Die Eltern', meaning: 'Parents', example: 'Meine Eltern arbeiten.' }
        ],
        grammar: [
          { rule: 'Verb "sein" (to be)', explanation: 'ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.' },
          { rule: 'Verb "haben" (to have)', explanation: 'ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.' },
          { rule: 'Possessive Articles', explanation: 'mein/meine (my), dein/deine (your), sein/seine (his), ihr/ihre (her). Mein Bruder, meine Schwester.' }
        ],
        importantQA: [
          { q: 'Conjugate "sein" in present tense.', a: 'Ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.' },
          { q: 'How do possessive articles work in German?', a: 'They change based on gender: mein Vater (masc.), meine Mutter (fem.), mein Kind (neuter), meine Eltern (plural).' }
        ],
        exercises: [
          { q: 'Fill: ___ (my) Vater ist Arzt. ___ (my) Mutter ist Lehrerin.', a: 'Mein Vater ist Arzt. Meine Mutter ist Lehrerin.' },
          { q: 'Conjugate haben: Ich ___, du ___, er ___.', a: 'Ich habe, du hast, er hat.' }
        ]
      }
    },
    9: {
      1: {
        vocab: [
          { word: 'Die Ferien', meaning: 'Holidays', example: 'Die Ferien sind toll!' },
          { word: 'Reisen', meaning: 'To travel', example: 'Wir reisen nach Deutschland.' },
          { word: 'Der Flughafen', meaning: 'Airport', example: 'Wir sind am Flughafen.' },
          { word: 'Das Hotel', meaning: 'Hotel', example: 'Das Hotel ist schön.' },
          { word: 'Die Sehenswürdigkeit', meaning: 'Sight/attraction', example: 'Berlin hat viele Sehenswürdigkeiten.' },
          { word: 'Besichtigen', meaning: 'To visit/tour', example: 'Wir besichtigen das Schloss.' }
        ],
        grammar: [
          { rule: 'Perfekt (Past Tense)', explanation: 'haben/sein + past participle. Gemacht (done), gegessen (eaten), gefahren (driven). Ich habe gegessen. Ich bin gefahren.' },
          { rule: 'Modal Verbs', explanation: 'können (can), müssen (must), wollen (want), dürfen (may), sollen (should). Ich kann Deutsch sprechen.' },
          { rule: 'Accusative Case', explanation: 'Direct object case. Der → den (masc only changes). Ich sehe den Mann. Die/Das/Die stay same.' }
        ],
        importantQA: [
          { q: 'Form Perfekt: spielen, fahren, essen.', a: 'Ich habe gespielt. Ich bin gefahren. Ich habe gegessen.' },
          { q: 'Conjugate "können" in present tense.', a: 'Ich kann, du kannst, er kann, wir können, ihr könnt, sie können.' }
        ],
        exercises: [
          { q: 'Write 3 sentences about your last holiday using Perfekt.', a: 'Ich bin nach Goa gefahren. Ich habe im Meer geschwommen. Wir haben viel Spaß gehabt.' }
        ]
      }
    }
  },

  sanskrit: {
    6: {
      0: {
        vocab: [
          { word: 'नमस्ते', meaning: 'Hello / Greetings', example: 'नमस्ते गुरुजी।' },
          { word: 'अहम्', meaning: 'I', example: 'अहम् छात्रः अस्मि।' },
          { word: 'त्वम्', meaning: 'You', example: 'त्वम् कुत्र गच्छसि?' },
          { word: 'सः / सा', meaning: 'He / She', example: 'सः बालकः अस्ति।' },
          { word: 'अस्ति', meaning: 'Is', example: 'एषः विद्यालयः अस्ति।' },
          { word: 'गच्छति', meaning: 'Goes', example: 'बालकः विद्यालयं गच्छति।' },
          { word: 'पठति', meaning: 'Reads/Studies', example: 'छात्रः पुस्तकं पठति।' },
          { word: 'लिखति', meaning: 'Writes', example: 'सा पत्रं लिखति।' }
        ],
        grammar: [
          { rule: 'Sanskrit Varnamala', explanation: 'Sanskrit has 13 vowels (स्वर): अ आ इ ई उ ऊ ऋ ॠ ए ऐ ओ औ, and 33 consonants (व्यञ्जन) arranged in groups (वर्ग).' },
          { rule: 'Basic Sentence Structure', explanation: 'Sanskrit follows Subject-Object-Verb (SOV) order. बालकः फलं खादति = The boy fruit eats.' },
          { rule: 'Vibhakti (Case) Basics', explanation: 'Nouns change form based on case. प्रथमा (nominative): रामः. द्वितीया (accusative): रामम्. तृतीया (instrumental): रामेण.' }
        ],
        importantQA: [
          { q: 'Write the vowels (स्वर) of Sanskrit.', a: 'अ, आ, इ, ई, उ, ऊ, ऋ, ॠ, ए, ऐ, ओ, औ, अं, अः' },
          { q: 'What is the basic word order in Sanskrit?', a: 'Subject + Object + Verb (SOV). Example: बालकः पुस्तकं पठति (The boy reads a book).' },
          { q: 'Write 3 simple Sanskrit sentences.', a: 'बालकः गच्छति। छात्रा पठति। अहं लिखामि।' }
        ],
        exercises: [
          { q: 'Translate: The girl reads a book.', a: 'बालिका पुस्तकं पठति।' },
          { q: 'Write the first 5 consonant groups.', a: 'क-वर्ग: क ख ग घ ङ, च-वर्ग: च छ ज झ ञ, ट-वर्ग: ट ठ ड ढ ण, त-वर्ग: त थ द ध न, प-वर्ग: प फ ब भ म' }
        ]
      },
      1: {
        vocab: [
          { word: 'शकुन्तला', meaning: 'Shakuntala (character)', example: 'शकुन्तला सुन्दरी अस्ति।' },
          { word: 'वनम्', meaning: 'Forest', example: 'शकुन्तला वने वसति।' },
          { word: 'मृगाः', meaning: 'Deer (plural)', example: 'वने मृगाः सन्ति।' },
          { word: 'पुष्पम्', meaning: 'Flower', example: 'पुष्पं सुन्दरम् अस्ति।' },
          { word: 'जलम्', meaning: 'Water', example: 'नद्यां जलम् अस्ति।' },
          { word: 'वृक्षः', meaning: 'Tree', example: 'वृक्षः उच्चः अस्ति।' }
        ],
        grammar: [
          { rule: 'अकारान्त पुल्लिंग (Masculine a-ending)', explanation: 'रामः (nom.), रामम् (acc.), रामेण (inst.), रामाय (dat.), रामात् (abl.), रामस्य (gen.), रामे (loc.). Learn this pattern as the base for many nouns.' },
          { rule: 'अकारान्त नपुंसकलिंग (Neuter a-ending)', explanation: 'फलम् (nom.), फलम् (acc.), फलेन (inst.). Similar to masculine but nom/acc end in -म्. Plural nom/acc: फलानि.' },
          { rule: 'Present Tense (लट् लकार)', explanation: 'गच्छ + ति = गच्छति (he goes), गच्छतः (they two go), गच्छन्ति (they go). With अहम्: गच्छामि.' }
        ],
        importantQA: [
          { q: 'Decline "रामः" in all 7 cases (singular).', a: 'रामः, रामम्, रामेण, रामाय, रामात्, रामस्य, रामे' },
          { q: 'Conjugate "गम्" (to go) in लट् लकार for all three persons.', a: 'गच्छति, गच्छतः, गच्छन्ति (third person), गच्छसि, गच्छथः, गच्छथ (second person), गच्छामि, गच्छावः, गच्छामः (first person)' }
        ],
        exercises: [
          { q: 'Translate: Rama goes to the forest.', a: 'रामः वनं गच्छति।' },
          { q: 'Write फलम् in प्रथमा, द्वितीया, तृतीया (singular).', a: 'फलम्, फलम्, फलेन' }
        ]
      }
    },
    9: {
      1: {
        vocab: [
          { word: 'भारतीवसन्तगीतिः', meaning: 'Song of Indian Spring', example: 'This is a poem celebrating the beauty of spring in India.' },
          { word: 'वसन्तः', meaning: 'Spring season', example: 'वसन्ते पुष्पाणि विकसन्ति।' },
          { word: 'कोकिलः', meaning: 'Cuckoo', example: 'कोकिलः मधुरं गायति।' },
          { word: 'मलयानिलः', meaning: 'Breeze from Malaya mountains', example: 'मलयानिलः सुखदः अस्ति।' },
          { word: 'सरोवरम्', meaning: 'Lake', example: 'सरोवरे कमलानि सन्ति।' },
          { word: 'कमलम्', meaning: 'Lotus', example: 'कमलं सुन्दरम् पुष्पम् अस्ति।' }
        ],
        grammar: [
          { rule: 'Sandhi (Vowel Combination)', explanation: 'When words join, sounds combine: अ + अ = आ (दीर्घ सन्धि), अ + इ = ए (गुण सन्धि), अ + उ = ओ (गुण सन्धि). Example: सूर्य + उदय = सूर्योदय.' },
          { rule: 'Samas (Compound Words)', explanation: 'Types: तत्पुरुष (राजपुत्रः = king\'s son), द्वन्द्व (रामलक्ष्मणौ), बहुव्रीहि (पीताम्बरः = one wearing yellow clothes), अव्ययीभाव (यथाशक्ति).' },
          { rule: 'Past Tense (लङ् लकार)', explanation: 'अगच्छत् (he went), अपठत् (he read), अलिखत् (he wrote). Add अ before root and change endings.' }
        ],
        importantQA: [
          { q: 'What is Sandhi? Give 2 examples of दीर्घ सन्धि.', a: 'Sandhi is the combination of sounds when words join. विद्या + आलय = विद्यालय, देव + आलय = देवालय.' },
          { q: 'Explain तत्पुरुष समास with example.', a: 'In तत्पुरुष, the second word is primary. राजपुत्रः = राजा का पुत्र (son of king). The vibhakti between words is dropped.' }
        ],
        exercises: [
          { q: 'Do Sandhi: देव + आलय, विद्या + अर्थी.', a: 'देवालय (दीर्घ सन्धि), विद्यार्थी (दीर्घ सन्धि).' },
          { q: 'Write लङ् लकार for "पठ्" (all three persons, singular).', a: 'अपठत्, अपठः, अपठम्' }
        ]
      }
    }
  },

  japanese: {
    6: {
      0: {
        vocab: [
          { word: 'こんにちは', meaning: 'Hello', example: 'こんにちは、お元気ですか？' },
          { word: 'ありがとう', meaning: 'Thank you', example: 'ありがとうございます！' },
          { word: 'すみません', meaning: 'Excuse me / Sorry', example: 'すみません、トイレはどこですか？' },
          { word: 'はい / いいえ', meaning: 'Yes / No', example: 'はい、そうです。' },
          { word: 'わたし', meaning: 'I / Me', example: 'わたしは学生です。' },
          { word: '名前 (なまえ)', meaning: 'Name', example: 'わたしの名前はプリヤです。' }
        ],
        grammar: [
          { rule: 'Hiragana Basics', explanation: 'Japanese uses 3 scripts. Hiragana (ひらがな) has 46 basic characters. あ(a) い(i) う(u) え(e) お(o) — first row. か(ka) き(ki) く(ku) け(ke) こ(ko) — second row.' },
          { rule: 'Self Introduction Pattern', explanation: 'わたしは [Name] です。= I am [Name]. はじめまして = Nice to meet you. よろしくおねがいします = Please treat me well.' },
          { rule: 'Basic Particles', explanation: 'は (wa) = topic marker, の (no) = possession, を (wo) = object, に (ni) = direction/time, で (de) = location of action.' }
        ],
        importantQA: [
          { q: 'Introduce yourself in Japanese.', a: 'はじめまして。わたしはプリヤです。インドからきました。よろしくおねがいします。' },
          { q: 'Write the first two rows of Hiragana.', a: 'あ い う え お (a i u e o), か き く け こ (ka ki ku ke ko).' }
        ],
        exercises: [
          { q: 'Write in Hiragana: a, i, u, e, o, ka, ki, ku.', a: 'あ、い、う、え、お、か、き、く' },
          { q: 'Fill: わたし___ 学生です。', a: 'わたしは学生です。(particle は)' }
        ]
      }
    }
  },

  spanish: {
    9: {
      0: {
        vocab: [
          { word: 'Hola', meaning: 'Hello', example: '¡Hola! ¿Cómo estás?' },
          { word: 'Buenos días', meaning: 'Good morning', example: 'Buenos días, señor.' },
          { word: 'Gracias', meaning: 'Thank you', example: '¡Muchas gracias!' },
          { word: 'Por favor', meaning: 'Please', example: 'Un café, por favor.' },
          { word: '¿Cómo te llamas?', meaning: 'What is your name?', example: '¿Cómo te llamas? — Me llamo Priya.' },
          { word: '¿De dónde eres?', meaning: 'Where are you from?', example: 'Soy de India.' }
        ],
        grammar: [
          { rule: 'Subject Pronouns', explanation: 'Yo (I), Tú (you informal), Él/Ella/Usted (he/she/you formal), Nosotros (we), Vosotros (you plural), Ellos/Ellas/Ustedes (they/you formal plural).' },
          { rule: 'Ser vs Estar (To be)', explanation: 'Ser = permanent qualities (Soy estudiante). Estar = temporary states/location (Estoy bien, Estoy en casa).' },
          { rule: 'Present Tense -AR Verbs', explanation: 'Remove -ar, add: -o, -as, -a, -amos, -áis, -an. Hablar: hablo, hablas, habla, hablamos, habláis, hablan.' }
        ],
        importantQA: [
          { q: 'Conjugate "ser" in present tense.', a: 'Yo soy, tú eres, él/ella es, nosotros somos, vosotros sois, ellos son.' },
          { q: 'When do you use ser vs estar?', a: 'Ser for identity, origin, profession (Soy profesor). Estar for location, feelings, temporary states (Estoy en Madrid, Estoy cansado).' }
        ],
        exercises: [
          { q: 'Introduce yourself in Spanish (3 sentences).', a: '¡Hola! Me llamo Priya. Soy de India. Soy estudiante.' },
          { q: 'Conjugate "hablar": Yo ___, Tú ___, Nosotros ___.', a: 'Yo hablo, Tú hablas, Nosotros hablamos.' }
        ]
      }
    }
  }
};

function getChapterContent(lang, cls, idx) {
  const langContent = chapterContent[lang];
  if (!langContent) return null;
  const classContent = langContent[cls];
  if (!classContent) return null;
  return classContent[idx] || null;
}

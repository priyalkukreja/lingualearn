// ===== CHAPTER CONTENT — SIMPLE, KID-FRIENDLY, WITH TRICKS =====

const chapterContent = {
  french: {
    6: {
      0: {
        summary: "This chapter is a quick recap of everything you learned in Class 5. We revise the French alphabet, how to say hello and goodbye, and numbers from 1 to 20. Think of it like a warm-up before the real game begins!",
        explain: [
          { heading: "The French Alphabet — Just Like English!", text: "Good news — French uses the same 26 letters as English (A to Z)! But they SOUND different. Here are the tricky ones:\n\n• C = say \"say\"\n• E = say \"uh\"\n• G = say \"zhay\"\n• H = SILENT! French people don't say H at all!\n• J = say \"zhee\"\n• R = comes from the back of your throat (like gargling!)\n• W = say \"doo-bluh-vay\" (means double V)\n\nFrench also has special marks on letters:\n• é (accent aigu) = sounds like \"ay\" (café)\n• è (accent grave) = sounds like \"eh\" (mère)\n• ç (cedilla) = sounds like \"ss\" (français)\n• ê (accent circumflex) = sounds like \"eh\" (fête)" },
          { heading: "Saying Hello & Goodbye", text: "Here's when to use each greeting:\n\n• Bonjour = Good morning / Hello (use from morning till evening)\n• Bonsoir = Good evening (use after 5-6 PM)\n• Bonne nuit = Good night (only when going to sleep)\n• Salut = Hi / Bye (only with friends, NEVER with teachers!)\n• Au revoir = Goodbye (works everywhere)\n• À bientôt = See you soon\n• À demain = See you tomorrow\n\nWhen someone says \"Comment allez-vous?\" (How are you? - formal), reply:\n• Très bien, merci = Very well, thank you\n• Bien, merci = Fine, thank you\n• Comme ci, comme ça = So-so" },
          { heading: "Numbers 1 to 20", text: "Numbers 1-10 are easy to memorize:\n1 = un, 2 = deux, 3 = trois, 4 = quatre, 5 = cinq\n6 = six, 7 = sept, 8 = huit, 9 = neuf, 10 = dix\n\n11-16 have their own special names:\n11 = onze, 12 = douze, 13 = treize, 14 = quatorze, 15 = quinze, 16 = seize\n\n17-19 are just \"dix\" + the small number:\n17 = dix-sept (10+7), 18 = dix-huit (10+8), 19 = dix-neuf (10+9)\n\n20 = vingt" },
          { heading: "Tu vs Vous — Super Important!", text: "French has TWO words for \"you\":\n\n• TU = use with friends, family, kids, pets\n• VOUS = use with teachers, strangers, elders, or when talking to more than one person\n\nUsing \"tu\" with your teacher is considered RUDE in French culture! Always use \"vous\" to be safe with adults you don't know well." }
        ],
        tricks: [
          { title: "Remember French Numbers 1-5", trick: "Think: \"UN DEux TRois QuATRe CINq\" = U-D-T-Q-C. Imagine: \"Uncle Drinks Tea, Queen Cries!\"" },
          { title: "Bonjour vs Bonsoir", trick: "Both start with \"Bon\" (= good). JOUR = day (think \"journal\" = daily newspaper). SOIR = evening (sounds like \"soiree\" = evening party)." },
          { title: "Silent H Trick", trick: "In French, H is like a ghost — it's there but makes NO sound! \"Hôtel\" is pronounced \"oh-tel\", \"heure\" is pronounced \"ur\"." },
          { title: "É vs È", trick: "É (accent going UP /) = mouth goes UP like a smile = \"ay\" sound. È (accent going DOWN \\) = mouth drops DOWN = \"eh\" sound." }
        ],
        vocab: [
          { word: 'Bonjour', meaning: 'Hello / Good morning', example: 'Bonjour, comment ça va?' },
          { word: 'Au revoir', meaning: 'Goodbye', example: 'Au revoir, à demain!' },
          { word: 'Merci', meaning: 'Thank you', example: 'Merci beaucoup!' },
          { word: "S'il vous plaît", meaning: 'Please (formal)', example: "Un café, s'il vous plaît." },
          { word: 'Oui / Non', meaning: 'Yes / No', example: 'Oui, je suis indien.' },
          { word: 'Salut', meaning: 'Hi / Bye (casual)', example: 'Salut! Ça va?' },
          { word: 'Très bien', meaning: 'Very good', example: 'Je vais très bien.' },
          { word: 'Madame / Monsieur', meaning: 'Mrs / Mr', example: 'Bonjour, Madame!' }
        ],
        importantQA: [
          { q: 'How do you greet someone in French during the day?', a: 'We say "Bonjour". In the evening, we say "Bonsoir". With friends, we can say "Salut".' },
          { q: 'Write French numbers from 1 to 10.', a: 'Un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix.' },
          { q: 'What is the difference between tu and vous?', a: 'Tu = informal (friends, family). Vous = formal (teachers, elders) or plural (more than one person).' },
          { q: 'What are the special accents in French?', a: 'É (accent aigu) = ay sound, È (accent grave) = eh sound, Ç (cedilla) = ss sound, Ê (circumflex) = eh sound.' },
          { q: 'Reply to "Comment allez-vous?"', a: 'Très bien merci (very well thank you), Bien merci (fine thank you), or Comme ci comme ça (so-so).' }
        ],
        exercises: [
          { q: 'Write greetings for: morning, evening, goodbye.', a: 'Bonjour (morning), Bonsoir (evening), Au revoir (goodbye).' },
          { q: 'Count from 11 to 20 in French.', a: 'Onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt.' },
          { q: 'Fill in: Bonjour, comment ___-vous?', a: 'Bonjour, comment allez-vous?' },
          { q: 'Should you use tu or vous with your teacher?', a: 'Vous — because the teacher is an elder/authority figure.' }
        ]
      },
      1: {
        summary: "In this chapter, we take a fun trip to France! We learn about the country — its capital Paris, famous monuments like the Eiffel Tower, French food, and rivers. We also learn the most basic grammar rule in French: every noun has a gender (masculine or feminine), and we need to use the right article (le, la, les) with it.",
        explain: [
          { heading: "Welcome to France!", text: "Some cool facts about France:\n\n• Capital: Paris (called the \"City of Light\")\n• Language: French (spoken in 29 countries!)\n• Currency: Euro (€)\n• Famous food: Croissants, baguettes, cheese, crêpes\n• National day: 14th July (like our 15th August)\n• Shape: France is shaped like a hexagon (6 sides), so French people call it \"l'Hexagone\"!\n\nFamous monuments in Paris:\n• La Tour Eiffel — the Eiffel Tower (built in 1889!)\n• Le Louvre — the biggest museum in the world\n• Notre-Dame — a famous old cathedral\n• L'Arc de Triomphe — a huge victory arch" },
          { heading: "Le, La, Les — The Most Important Rule!", text: "In English, we just say \"the\" for everything. The book, the girl, the dogs.\n\nBut in French, \"the\" changes depending on the noun:\n\n• LE = the (for masculine nouns) → le garçon (the boy), le livre (the book)\n• LA = the (for feminine nouns) → la fille (the girl), la table (the table)\n• LES = the (for ALL plural nouns) → les garçons, les filles\n• L' = the (before ANY noun starting with a vowel) → l'école (the school), l'ami (the friend)\n\nHow to know if a noun is masculine or feminine? Mostly you have to MEMORIZE it! But here are some patterns:\n• Usually MASCULINE: words ending in -age, -ment, -eau\n• Usually FEMININE: words ending in -tion, -sion, -ure, -ette" },
          { heading: "C'est and Ce sont", text: "These are super useful phrases:\n\n• C'est = It is / This is / That is (for ONE thing)\n  → C'est Paris. (This is Paris.)\n  → C'est un livre. (It's a book.)\n\n• Ce sont = These are / Those are (for MANY things)\n  → Ce sont les monuments. (These are the monuments.)\n  → Ce sont mes amis. (These are my friends.)\n\nJust remember: C'est for ONE, Ce sont for MANY!" },
          { heading: "Rivers of France", text: "France has 5 main rivers. Remember them with this trick:\n• La Seine — flows through Paris\n• La Loire — the longest river in France\n• Le Rhône — flows to the Mediterranean Sea\n• La Garonne — in the southwest\n• Le Rhin (Rhine) — on the Germany border" }
        ],
        tricks: [
          { title: "LE vs LA — The Gender Trick", trick: "Think of LE as a \"boy article\" and LA as a \"girl article\". When you see a new French word, always learn it WITH its article. Don't just learn \"livre\" — learn \"LE livre\". Make them best friends!" },
          { title: "When to use L'", trick: "If the next word starts with A, E, I, O, U — use L' instead of Le/La. Think: \"Vowels are VIPs — they get the short form!\" L'école, l'orange, l'ami." },
          { title: "Remember French Rivers", trick: "\"Silly Lovers Run, Glancing at Rivers\" = Seine, Loire, Rhône, Garonne, Rhin!" },
          { title: "C'est vs Ce sont", trick: "C'est has no 'S' = Singular (one thing). Ce SONT has 'S' = Several (many things)!" }
        ],
        vocab: [
          { word: 'La France', meaning: 'France', example: 'La France est un beau pays.' },
          { word: 'La capitale', meaning: 'The capital', example: 'Paris est la capitale.' },
          { word: 'Le pays', meaning: 'The country', example: 'C\'est un grand pays.' },
          { word: 'La tour Eiffel', meaning: 'Eiffel Tower', example: 'La tour Eiffel est à Paris.' },
          { word: 'Le fromage', meaning: 'Cheese', example: 'Le fromage est délicieux.' },
          { word: 'Le fleuve', meaning: 'River', example: 'La Seine est un fleuve.' },
          { word: 'Beau / Belle', meaning: 'Beautiful (m/f)', example: 'Paris est une belle ville.' },
          { word: 'Grand / Grande', meaning: 'Big (m/f)', example: 'C\'est un grand pays.' }
        ],
        importantQA: [
          { q: 'What is the capital of France? Name 2 monuments.', a: 'Paris is the capital. Monuments: La Tour Eiffel (Eiffel Tower) and Le Louvre (museum).' },
          { q: 'What are the definite articles in French?', a: 'Le (masculine), La (feminine), Les (plural), L\' (before vowels). Example: le livre, la table, l\'école, les enfants.' },
          { q: 'When do we use C\'est and Ce sont?', a: 'C\'est = for one thing (C\'est Paris). Ce sont = for many things (Ce sont les monuments).' },
          { q: 'Name 3 rivers of France.', a: 'La Seine (through Paris), La Loire (longest), Le Rhône (goes to Mediterranean).' },
          { q: 'How do you know if a noun is masculine or feminine?', a: 'Memorize with its article! Tips: -tion/-sion endings are usually feminine, -age/-ment endings are usually masculine.' }
        ],
        exercises: [
          { q: 'Put the correct article (le/la/l\'): ___ école, ___ garçon, ___ fille.', a: 'L\'école, le garçon, la fille.' },
          { q: 'Fill in C\'est or Ce sont: ___ Paris. ___ les monuments.', a: 'C\'est Paris. Ce sont les monuments.' },
          { q: 'Write 3 facts about France.', a: 'La France est un grand pays. Paris est la capitale. La Tour Eiffel est à Paris.' }
        ]
      },
      2: {
        summary: "This chapter is all about family! We meet Manuel's brother and sister, and learn French words for all family members. The big grammar lesson here is about possessive adjectives (my, your, his/her) and the super important verb ÊTRE (to be). We also learn how adjectives change based on gender.",
        explain: [
          { heading: "Family Members in French", text: "Let's learn the whole family tree:\n\n👨 Le père = Father\n👩 La mère = Mother\n👦 Le frère = Brother\n👧 La sœur = Sister\n👴 Le grand-père = Grandfather\n👵 La grand-mère = Grandmother\n👶 Le bébé = Baby\n👨‍👩‍👧‍👦 La famille = Family\n👫 Les parents = Parents\n👨‍👩‍👧‍👦 Les enfants = Children\n\nNotice how MALE family members use LE and FEMALE use LA? That's because French nouns have genders — male words are masculine, female words are feminine!" },
          { heading: "MY, YOUR, HIS/HER — Possessive Adjectives", text: "In English, \"my\" stays the same always: my book, my sister, my friends.\n\nBut in French, \"my\" changes based on the noun:\n\n• MON = my + masculine noun → mon père (my father), mon livre (my book)\n• MA = my + feminine noun → ma mère (my mother), ma sœur (my sister)\n• MES = my + plural noun → mes parents (my parents), mes amis (my friends)\n\nSame pattern for your and his/her:\n• YOUR: ton / ta / tes\n• HIS/HER: son / sa / ses\n\n⚠️ TRICKY RULE: If a feminine word starts with a vowel, use MON instead of MA!\n→ mon amie (my friend, girl) — NOT \"ma amie\" (sounds ugly in French!)" },
          { heading: "The Verb ÊTRE (To Be)", text: "ÊTRE is the MOST important French verb. You'll use it in every conversation!\n\nHere's how it changes:\n\n• Je suis = I am → Je suis indien. (I am Indian.)\n• Tu es = You are (informal) → Tu es grand. (You are tall.)\n• Il est = He is → Il est petit. (He is short.)\n• Elle est = She is → Elle est gentille. (She is kind.)\n• Nous sommes = We are → Nous sommes élèves. (We are students.)\n• Vous êtes = You are (formal/plural) → Vous êtes français. (You are French.)\n• Ils sont = They are (boys/mixed) → Ils sont grands. (They are tall.)\n• Elles sont = They are (all girls) → Elles sont petites. (They are short.)" },
          { heading: "Adjectives Change with Gender!", text: "In French, adjectives agree with the noun. That means they change!\n\nBasic rule:\n• Masculine: grand (tall/big)\n• Feminine: add -E → grande\n• Masculine plural: add -S → grands\n• Feminine plural: add -ES → grandes\n\nMore examples:\n• petit → petite → petits → petites (small)\n• intelligent → intelligente → intelligents → intelligentes\n• français → française → français → françaises\n\nSome are the same in both:\n• jeune (young) stays jeune for both genders!" }
        ],
        tricks: [
          { title: "MON/MA/MES Memory Trick", trick: "Think: MON = Male Owner's Noun, MA = My A-feminine, MES = My Everything (plural). Or just remember: MON for boys, MA for girls, MES for many!" },
          { title: "ÊTRE Conjugation Song", trick: "Sing it like a chant: \"SUIS-ES-EST, SOMMES-ÊTES-SONT!\" (Je suis, tu es, il est, nous sommes, vous êtes, ils sont). Say it 5 times fast and you'll never forget!" },
          { title: "Adjective Gender Trick", trick: "Add -E for girls! Think: \"E for Elle (she)\". Grand → GrandE. Petit → PetitE. If it already ends in -e (like jeune), nothing changes!" },
          { title: "Mon Amie Exception", trick: "Two vowels next to each other sound bad in French (like \"ma amie\" — mah-ah-mee). So French uses MON even for feminine vowel-words. Think: \"Vowels break the rule!\"" }
        ],
        vocab: [
          { word: 'Le frère', meaning: 'Brother', example: 'Mon frère est grand.' },
          { word: 'La sœur', meaning: 'Sister', example: 'Ma sœur est petite.' },
          { word: 'Le père / La mère', meaning: 'Father / Mother', example: 'Mon père est professeur.' },
          { word: 'La famille', meaning: 'Family', example: 'Ma famille est grande.' },
          { word: 'Grand(e)', meaning: 'Tall / Big', example: 'Il est grand.' },
          { word: 'Petit(e)', meaning: 'Short / Small', example: 'Elle est petite.' },
          { word: 'Gentil(le)', meaning: 'Kind / Nice', example: 'Ma mère est gentille.' },
          { word: 'Voilà', meaning: 'Here is / There is', example: 'Voilà mon frère!' }
        ],
        importantQA: [
          { q: 'Conjugate être in present tense.', a: 'Je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.' },
          { q: 'What are the possessive adjectives for "my"?', a: 'Mon (masculine), ma (feminine), mes (plural). Before feminine vowel-word, use mon: mon amie.' },
          { q: 'How do French adjectives change?', a: 'Add -e for feminine, -s for masculine plural, -es for feminine plural. Grand → grande → grands → grandes.' },
          { q: 'Write 5 family members in French.', a: 'Le père (father), la mère (mother), le frère (brother), la sœur (sister), les parents (parents).' }
        ],
        exercises: [
          { q: 'Fill in with mon/ma/mes: ___ père, ___ mère, ___ parents.', a: 'Mon père, ma mère, mes parents.' },
          { q: 'Conjugate être: Nous ___ élèves. Elles ___ françaises.', a: 'Nous sommes élèves. Elles sont françaises.' },
          { q: 'Make feminine: grand, petit, intelligent.', a: 'Grande, petite, intelligente.' },
          { q: 'Translate: My sister is small.', a: 'Ma sœur est petite.' }
        ]
      },
      3: {
        summary: "In this chapter, we go to the cafeteria! We learn words for food and drinks, how to order at a café, and two big grammar topics: indefinite articles (un, une, des — meaning a/some) and the verb AVOIR (to have). We also learn how to make sentences negative (saying you DON'T do something).",
        explain: [
          { heading: "At the Cafeteria — Food Words!", text: "Here's what you can order at a French café:\n\n🥤 Drinks:\n• Le café = Coffee\n• Le thé = Tea\n• Le jus = Juice (le jus d'orange = orange juice)\n• Le lait = Milk\n• L'eau = Water (feminine! — une eau)\n\n🍞 Food:\n• Le sandwich = Sandwich\n• Le croissant = Croissant (buttery pastry)\n• Le gâteau = Cake\n• La glace = Ice cream\n• La pizza = Pizza\n• Les frites = French fries\n\nTo order, say: \"Je voudrais...\" (I would like...)\n→ Je voudrais un sandwich, s'il vous plaît.\n→ Je voudrais une glace au chocolat." },
          { heading: "UN, UNE, DES — A / Some", text: "We already learned LE/LA/LES (the). Now let's learn UN/UNE/DES (a/an/some):\n\n• UN = a/an + masculine noun → un garçon (a boy), un livre (a book)\n• UNE = a/an + feminine noun → une fille (a girl), une table (a table)\n• DES = some + plural noun → des livres (some books), des filles (some girls)\n\nSimple rule:\n• LE/LA = THE (specific) → Le livre = THE book (that specific one)\n• UN/UNE = A (any) → Un livre = A book (any book)\n• DES = SOME → Des livres = Some books" },
          { heading: "The Verb AVOIR (To Have)", text: "AVOIR is the second most important French verb!\n\n• J'ai = I have (notice: Je + ai becomes J'ai!)\n• Tu as = You have\n• Il/Elle a = He/She has\n• Nous avons = We have\n• Vous avez = You have (formal/plural)\n• Ils/Elles ont = They have\n\nFun uses of AVOIR:\n• J'ai 12 ans = I am 12 years old (French says \"I HAVE 12 years\"!)\n• J'ai faim = I am hungry (I HAVE hunger)\n• J'ai soif = I am thirsty (I HAVE thirst)\n• J'ai peur = I am scared (I HAVE fear)" },
          { heading: "Making Sentences Negative — NE...PAS", text: "To say you DON'T do something, wrap the verb in NE...PAS:\n\nPositive → Negative:\n• Je suis français. → Je NE suis PAS français. (I am NOT French.)\n• J'ai un frère. → Je N'ai PAS de frère. (I don't have a brother.)\n• Il mange. → Il NE mange PAS. (He doesn't eat.)\n\nThe NE goes BEFORE the verb, PAS goes AFTER the verb. Like a sandwich — the verb is the filling!\n\n⚠️ Before a vowel, NE becomes N':\n• Je NE ai pas → Je N'ai pas" }
        ],
        tricks: [
          { title: "AVOIR Chant", trick: "\"AI-AS-A, AVONS-AVEZ-ONT!\" Sing it like a rap beat and you'll memorize it in 2 minutes!" },
          { title: "UN vs UNE", trick: "UN sounds like \"uh\" (short, like a boy in a hurry). UNE sounds like \"oon\" (longer, like a girl taking her time). UN = boy words, UNE = girl words!" },
          { title: "NE...PAS Sandwich", trick: "Think of NE and PAS as two slices of bread, and the verb is the cheese in the middle. NE 🧀verb PAS = a negative sandwich! 🥪" },
          { title: "Age in French", trick: "French people \"HAVE\" their age, they don't \"ARE\" their age. Say: J'ai 12 ans (I have 12 years), NOT je suis 12 ans. Think: in France, years are something you collect!" }
        ],
        vocab: [
          { word: 'Le sandwich', meaning: 'Sandwich', example: 'Je voudrais un sandwich.' },
          { word: 'Le jus', meaning: 'Juice', example: 'Un jus d\'orange, s\'il vous plaît.' },
          { word: 'Le café', meaning: 'Coffee', example: 'Le café est chaud.' },
          { word: 'Le lait', meaning: 'Milk', example: 'Je bois du lait.' },
          { word: 'L\'eau', meaning: 'Water', example: 'Je voudrais de l\'eau.' },
          { word: 'Le gâteau', meaning: 'Cake', example: 'Le gâteau est bon!' },
          { word: 'La glace', meaning: 'Ice cream', example: 'J\'aime la glace.' },
          { word: 'Les frites', meaning: 'French fries', example: 'J\'adore les frites!' }
        ],
        importantQA: [
          { q: 'Conjugate avoir in present tense.', a: "J'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont." },
          { q: 'How do you make a sentence negative?', a: "Put NE before the verb and PAS after. Je mange → Je NE mange PAS. Before vowels, NE becomes N': Je N'ai PAS." },
          { q: 'What are the indefinite articles?', a: 'Un (masculine), une (feminine), des (plural). Un garçon, une fille, des enfants.' },
          { q: 'How do you say your age in French?', a: "Use avoir, not être! J'ai 12 ans = I am 12 years old (literally: I have 12 years)." },
          { q: 'How do you order food politely?', a: "Je voudrais + item + s'il vous plaît. Example: Je voudrais un croissant, s'il vous plaît." }
        ],
        exercises: [
          { q: 'Make negative: Je suis français. J\'ai un chat.', a: 'Je ne suis pas français. Je n\'ai pas de chat.' },
          { q: 'Fill articles (un/une/des): ___ sandwich, ___ glace, ___ frites.', a: 'Un sandwich, une glace, des frites.' },
          { q: 'Write your age in French.', a: "J'ai ___ ans. (Example: J'ai 11 ans.)" },
          { q: 'Order an orange juice politely.', a: "Je voudrais un jus d'orange, s'il vous plaît." }
        ]
      }
    },
    9: {
      1: {
        summary: "This is the first chapter of your Class 9 French textbook 'Entre Jeunes'. We learn about the extended family — grandparents, aunts, uncles, cousins. The grammar focus is on possessive pronouns (mine, yours, his/hers), irregular adjectives, and a deep revision of -ER verb conjugation.",
        explain: [
          { heading: "The Extended Family", text: "You already know père, mère, frère, sœur from earlier classes. Now let's add the whole family tree:\n\n• Le grand-père / La grand-mère = Grandfather / Grandmother\n• L'oncle / La tante = Uncle / Aunt\n• Le cousin / La cousine = Cousin (male / female)\n• Le neveu / La nièce = Nephew / Niece\n• Le mari / La femme = Husband / Wife\n• Le beau-père / La belle-mère = Father-in-law / Mother-in-law (or step-parent)\n• Les petits-enfants = Grandchildren\n\nDescribing your family:\n→ Ma famille est grande. (My family is big.)\n→ J'ai deux cousins et une cousine. (I have 2 male cousins and 1 female cousin.)\n→ Mon grand-père habite avec nous. (My grandfather lives with us.)" },
          { heading: "Possessive Pronouns — Mine, Yours, His", text: "Possessive pronouns REPLACE the noun:\n\n• Le mien / La mienne / Les miens / Les miennes = MINE\n• Le tien / La tienne / Les tiens / Les tiennes = YOURS\n• Le sien / La sienne / Les siens / Les siennes = HIS / HERS\n\nExample:\n→ C'est ton livre? — Oui, c'est le mien. (Is this your book? — Yes, it's mine.)\n→ C'est sa voiture? — Non, ce n'est pas la sienne. (Is this his car? — No, it's not his.)\n\nThey agree with the THING being owned, not the owner!" },
          { heading: "Irregular Adjectives — Beau, Vieux, Nouveau", text: "These 3 adjectives are special because they have EXTRA forms:\n\n• Beau (handsome/beautiful):\n  Masculine: beau → Feminine: belle → Plural: beaux/belles\n  Before masculine vowel-word: BEL → un bel homme (a handsome man)\n\n• Vieux (old):\n  Masculine: vieux → Feminine: vieille → Plural: vieux/vieilles\n  Before masculine vowel-word: VIEIL → un vieil ami (an old friend)\n\n• Nouveau (new):\n  Masculine: nouveau → Feminine: nouvelle → Plural: nouveaux/nouvelles\n  Before masculine vowel-word: NOUVEL → un nouvel appartement" },
          { heading: "-ER Verb Conjugation (Revision)", text: "Most French verbs end in -ER. To conjugate:\n1. Remove the -ER ending\n2. Add the correct ending:\n\nParler (to speak):\n• Je parle (I speak)\n• Tu parles (you speak)\n• Il/Elle parle (he/she speaks)\n• Nous parlons (we speak)\n• Vous parlez (you speak)\n• Ils/Elles parlent (they speak)\n\nThe endings: -e, -es, -e, -ons, -ez, -ent\n\nWorks for: aimer (to love), manger (to eat), habiter (to live), jouer (to play), regarder (to watch), écouter (to listen)." }
        ],
        tricks: [
          { title: "-ER Verb Endings", trick: "Remember \"E-ES-E, ONS-EZ-ENT\". The first 3 sound almost the SAME (silent endings). Only nous (-ons), vous (-ez) and ils (-ent, also silent!) sound different." },
          { title: "BEL, VIEIL, NOUVEL", trick: "These 3 special forms only appear before masculine nouns starting with a VOWEL. Think: \"BVN goes soft before vowels\" — Bel, Vieil, Nouvel." },
          { title: "Possessive Pronoun Gender", trick: "The pronoun matches the THING, not the person! A girl can say \"le mien\" for her book (because livre is masculine). Don't look at who owns it — look at WHAT is owned!" }
        ],
        vocab: [
          { word: 'Le grand-père', meaning: 'Grandfather', example: 'Mon grand-père a 70 ans.' },
          { word: 'La grand-mère', meaning: 'Grandmother', example: 'Ma grand-mère cuisine bien.' },
          { word: "L'oncle / La tante", meaning: 'Uncle / Aunt', example: "L'oncle de Marie est médecin." },
          { word: 'Le cousin / La cousine', meaning: 'Cousin (m/f)', example: 'Mon cousin a 15 ans.' },
          { word: 'Le mari / La femme', meaning: 'Husband / Wife', example: 'Le mari de ma tante.' },
          { word: 'Habiter', meaning: 'To live', example: 'J\'habite à Delhi.' },
          { word: 'Beau / Belle', meaning: 'Beautiful (m/f)', example: 'Un bel homme. Une belle femme.' },
          { word: 'Vieux / Vieille', meaning: 'Old (m/f)', example: 'Un vieil arbre. Une vieille maison.' }
        ],
        importantQA: [
          { q: 'Describe your family in 5 French sentences.', a: 'Ma famille est grande. Mon père est ingénieur. Ma mère est professeur. J\'ai un frère et une sœur. Mon grand-père habite avec nous.' },
          { q: 'Conjugate parler in present tense.', a: 'Je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.' },
          { q: 'Give feminine of: beau, vieux, nouveau.', a: 'Belle, vieille, nouvelle.' },
          { q: 'When do we use bel, vieil, nouvel?', a: 'Before masculine singular nouns starting with a vowel: un bel arbre, un vieil ami, un nouvel élève.' }
        ],
        exercises: [
          { q: 'Write 5 extended family members with articles.', a: 'Le grand-père, la grand-mère, l\'oncle, la tante, le cousin.' },
          { q: 'Conjugate aimer: Je ___, Tu ___, Nous ___.', a: "J'aime, Tu aimes, Nous aimons." },
          { q: 'Fill in beau/bel/belle: un ___ garçon, un ___ homme, une ___ fille.', a: 'Un beau garçon, un bel homme, une belle fille.' },
          { q: 'Replace with pronoun: C\'est mon livre → C\'est ___.', a: 'C\'est le mien.' }
        ]
      }
    }
  },

  german: {
    6: {
      0: {
        summary: "Welcome to German! In this first chapter, we learn the German alphabet (with those cool extra letters ä, ö, ü, ß), how to say hello and introduce ourselves, and count from 1 to 20. German is actually easier than you think — lots of words are similar to English!",
        explain: [
          { heading: "The German Alphabet — Almost Like English!", text: "German uses the same 26 letters as English, PLUS 4 special ones:\n\n• Ä ä = sounds like \"eh\" (like in \"bed\")\n• Ö ö = round your lips and say \"er\" (no English equivalent!)\n• Ü ü = round your lips and say \"ee\" (no English equivalent!)\n• ß = just means \"ss\" (sharp S) → Straße = Strasse = Street\n\nSome letters sound DIFFERENT in German:\n• W = sounds like English V → \"Wasser\" sounds like \"Vasser\" (water)\n• V = sounds like English F → \"Vater\" sounds like \"Fater\" (father)\n• J = sounds like English Y → \"ja\" sounds like \"ya\" (yes)\n• Z = sounds like \"ts\" → \"zehn\" sounds like \"tsehn\" (ten)\n• S before a vowel = sounds like Z → \"Sonne\" sounds like \"Zonne\" (sun)" },
          { heading: "Introducing Yourself", text: "Here's how to introduce yourself in German:\n\n• Hallo! = Hello!\n• Ich heiße ___ = My name is ___ (literally: I am called ___)\n• Ich komme aus Indien = I come from India\n• Ich bin ___ Jahre alt = I am ___ years old\n• Ich wohne in Delhi = I live in Delhi\n\nGreetings for different times:\n• Guten Morgen = Good morning\n• Guten Tag = Good day / Hello (afternoon)\n• Guten Abend = Good evening\n• Gute Nacht = Good night\n• Tschüss! = Bye! (casual)\n• Auf Wiedersehen = Goodbye (formal)" },
          { heading: "Numbers 1-20", text: "1 = eins, 2 = zwei, 3 = drei, 4 = vier, 5 = fünf\n6 = sechs, 7 = sieben, 8 = acht, 9 = neun, 10 = zehn\n\n11 = elf, 12 = zwölf (these are unique!)\n\n13-19 follow a pattern: number + zehn (ten)\n13 = dreizehn (3+10), 14 = vierzehn (4+10), 15 = fünfzehn, 16 = sechzehn, 17 = siebzehn, 18 = achtzehn, 19 = neunzehn\n\n20 = zwanzig" },
          { heading: "Du vs Sie — The Polite Rule", text: "Just like French has tu/vous, German has:\n\n• DU = you (informal) — use with friends, family, kids\n• SIE = you (formal) — use with teachers, adults, strangers\n\nSie is ALWAYS written with a capital S when it means \"you\" (formal). If written as \"sie\" (small s), it means \"she\" or \"they\"!" }
        ],
        tricks: [
          { title: "W and V Swap!", trick: "In German, W and V swap their sounds compared to English! W sounds like V, and V sounds like F. Think: \"German Ws and Vs play musical chairs!\"" },
          { title: "Numbers 13-19 Pattern", trick: "It's just the small number + ZEHN (ten). drei+zehn = dreizehn (13). Like English \"thirteen\" = three+teen!" },
          { title: "Ü Sound Trick", trick: "To make the Ü sound: say \"ee\" but push your lips forward like you're going to whistle. Try it with \"über\" (over)!" },
          { title: "Remember German Greetings", trick: "All formal greetings start with \"Gut\" (good): Guten Morgen, Guten Tag, Guten Abend. Only night is slightly different: Gute Nacht (the E changes because Nacht is feminine!)." }
        ],
        vocab: [
          { word: 'Hallo', meaning: 'Hello', example: 'Hallo, wie geht es dir?' },
          { word: 'Guten Morgen', meaning: 'Good morning', example: 'Guten Morgen, Frau Müller!' },
          { word: 'Tschüss', meaning: 'Bye', example: 'Tschüss, bis morgen!' },
          { word: 'Danke', meaning: 'Thank you', example: 'Danke schön!' },
          { word: 'Bitte', meaning: 'Please / You\'re welcome', example: 'Ein Wasser, bitte.' },
          { word: 'Ja / Nein', meaning: 'Yes / No', example: 'Ja, ich bin Inder.' },
          { word: 'Wie heißt du?', meaning: 'What\'s your name?', example: 'Ich heiße Priya.' },
          { word: 'Ich komme aus...', meaning: 'I come from...', example: 'Ich komme aus Indien.' }
        ],
        importantQA: [
          { q: 'Introduce yourself in German (4 sentences).', a: 'Hallo! Ich heiße Priya. Ich komme aus Indien. Ich bin 11 Jahre alt. Ich wohne in Delhi.' },
          { q: 'What are the 4 special German letters?', a: 'Ä (sounds like eh), Ö (rounded er), Ü (rounded ee), ß (sharp ss).' },
          { q: 'Count from 1 to 10 in German.', a: 'Eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn.' },
          { q: 'When do you use du vs Sie?', a: 'Du = informal (friends, family). Sie (capital S) = formal (teachers, elders, strangers).' }
        ],
        exercises: [
          { q: 'Write German greetings for: morning, day, evening, night.', a: 'Guten Morgen, Guten Tag, Guten Abend, Gute Nacht.' },
          { q: 'Count from 11 to 20 in German.', a: 'Elf, zwölf, dreizehn, vierzehn, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn, zwanzig.' },
          { q: 'Introduce yourself in 3 German sentences.', a: 'Ich heiße [name]. Ich komme aus Indien. Ich bin [age] Jahre alt.' }
        ]
      }
    }
  },

  sanskrit: {
    6: {
      0: {
        summary: "This is your introduction to Sanskrit — one of the oldest languages in the world! We learn the Sanskrit alphabet (Varnamala), basic words, simple sentences, and how Sanskrit sentences are structured differently from Hindi and English (the verb comes at the END).",
        explain: [
          { heading: "Why Sanskrit is Special", text: "Did you know?\n• Sanskrit is called the \"mother of languages\" — Hindi, Marathi, Bengali all come from Sanskrit!\n• Sanskrit is over 3,500 years old\n• Many English words come from Sanskrit: \"mother\" from \"mātṛ\", \"three\" from \"tri\"\n• Sanskrit is the language of the Vedas, Ramayana, and Mahabharata\n• It's the most scientific language according to many linguists" },
          { heading: "Sanskrit Varnamala (Alphabet)", text: "Sanskrit has 2 types of letters:\n\nस्वर (Vowels) — 13 letters:\nअ आ इ ई उ ऊ ऋ ॠ ए ऐ ओ औ (+ अं अः)\n\nव्यञ्जन (Consonants) — arranged in 5 groups (वर्ग):\n\nक-वर्ग: क ख ग घ ङ (throat sounds)\nच-वर्ग: च छ ज झ ञ (palate sounds)\nट-वर्ग: ट ठ ड ढ ण (tongue-roof sounds)\nत-वर्ग: त थ द ध न (teeth sounds)\nप-वर्ग: प फ ब भ म (lip sounds)\n\nPlus: य र ल व श ष स ह (semi-vowels and sibilants)\n\nThe arrangement is actually SCIENTIFIC — it goes from throat to lips!" },
          { heading: "Basic Sanskrit Words", text: "Let's learn everyday words:\n\n• नमस्ते = Hello / Greetings\n• अहम् = I\n• त्वम् = You\n• सः = He\n• सा = She\n• एषः = This (masculine)\n• एषा = This (feminine)\n• अस्ति = Is\n• गच्छति = Goes\n• पठति = Reads / Studies\n• लिखति = Writes\n• खादति = Eats\n• पिबति = Drinks" },
          { heading: "Sanskrit Sentence Structure — SOV", text: "In English: \"The boy reads a book\" (Subject-Verb-Object)\nIn Sanskrit: \"बालकः पुस्तकं पठति\" (Subject-Object-Verb)\n\nThe VERB always comes at the END in Sanskrit!\n\nMore examples:\n• रामः विद्यालयं गच्छति। = Ram goes to school.\n• सीता पुस्तकं पठति। = Sita reads a book.\n• बालकः जलं पिबति। = The boy drinks water.\n\nNotice: Subject ends in ः (visarga), Object ends in ं (anusvara)." }
        ],
        tricks: [
          { title: "Consonant Groups Memory", trick: "Remember the 5 groups by their first letter: K-CH-T-T-P. Think: \"Kaccha Tattu Par\" (raw pony on)! And they go from THROAT → PALATE → ROOF → TEETH → LIPS (top to bottom in your mouth!)." },
          { title: "SOV Order", trick: "Sanskrit is like Hindi! बालकः (who?) पुस्तकं (what?) पठति (does what?). The verb is always the LAST word. Think: \"Sanskrit saves the action for last!\"" },
          { title: "ः and ं Trick", trick: "Subject gets ः (visarga = two dots), Object gets ं (dot on top). Think: \"Subject has TWO eyes (ः) to SEE, Object has ONE dot (ं) to BE seen!\"" }
        ],
        vocab: [
          { word: 'नमस्ते', meaning: 'Hello', example: 'नमस्ते गुरुजी।' },
          { word: 'अहम्', meaning: 'I', example: 'अहम् छात्रः अस्मि।' },
          { word: 'त्वम्', meaning: 'You', example: 'त्वम् कुत्र गच्छसि?' },
          { word: 'गच्छति', meaning: 'Goes', example: 'बालकः गच्छति।' },
          { word: 'पठति', meaning: 'Reads', example: 'सा पठति।' },
          { word: 'लिखति', meaning: 'Writes', example: 'छात्रः लिखति।' },
          { word: 'खादति', meaning: 'Eats', example: 'बालकः फलं खादति।' },
          { word: 'पिबति', meaning: 'Drinks', example: 'सा जलं पिबति।' }
        ],
        importantQA: [
          { q: 'Write the 13 vowels of Sanskrit.', a: 'अ, आ, इ, ई, उ, ऊ, ऋ, ॠ, ए, ऐ, ओ, औ, (अं, अः)' },
          { q: 'What is the sentence order in Sanskrit?', a: 'Subject + Object + Verb (SOV). Example: बालकः पुस्तकं पठति (The boy reads a book).' },
          { q: 'Write the क-वर्ग and च-वर्ग consonants.', a: 'क-वर्ग: क ख ग घ ङ। च-वर्ग: च छ ज झ ञ।' },
          { q: 'Translate to Sanskrit: The boy goes.', a: 'बालकः गच्छति।' }
        ],
        exercises: [
          { q: 'Translate: The girl reads a book.', a: 'बालिका पुस्तकं पठति।' },
          { q: 'Write 3 Sanskrit sentences using गच्छति, पठति, खादति.', a: 'रामः गच्छति। सीता पठति। बालकः फलं खादति।' },
          { q: 'Fill in: बालकः जलं ___ (drinks).', a: 'बालकः जलं पिबति।' }
        ]
      }
    }
  },

  japanese: {
    6: {
      0: {
        summary: "Welcome to Japanese! This chapter teaches you the basics — how to greet people, introduce yourself, and start learning Hiragana (the first Japanese alphabet). Japanese has 3 writing systems, but don't worry — we'll take it step by step!",
        explain: [
          { heading: "3 Writing Systems? Don't Panic!", text: "Japanese uses 3 scripts:\n\n1. HIRAGANA (ひらがな) — curved, soft letters. Used for Japanese words. This is what you learn first!\n2. KATAKANA (カタカナ) — angular, sharp letters. Used for foreign words (like your name!)\n3. KANJI (漢字) — Chinese characters. Each one represents a word/idea.\n\nFor now, we focus only on HIRAGANA. There are 46 basic characters to learn." },
          { heading: "Hiragana — First 2 Rows", text: "Row 1 (Vowels):\nあ = a, い = i, う = u, え = e, お = o\n\nRow 2 (K-row):\nか = ka, き = ki, く = ku, け = ke, こ = ko\n\nRow 3 (S-row):\nさ = sa, し = shi (NOT si!), す = su, せ = se, そ = so\n\nRow 4 (T-row):\nた = ta, ち = chi (NOT ti!), つ = tsu (NOT tu!), て = te, と = to\n\nNotice: し (shi), ち (chi), つ (tsu) are exceptions — they don't follow the pattern exactly!" },
          { heading: "Greetings in Japanese", text: "• こんにちは (konnichiwa) = Hello / Good afternoon\n• おはようございます (ohayou gozaimasu) = Good morning (polite)\n• こんばんは (konbanwa) = Good evening\n• さようなら (sayounara) = Goodbye\n• ありがとうございます (arigatou gozaimasu) = Thank you very much\n• すみません (sumimasen) = Excuse me / Sorry\n• はい (hai) = Yes\n• いいえ (iie) = No" },
          { heading: "Introducing Yourself", text: "Japanese self-introduction follows a set pattern:\n\n1. はじめまして。(Hajimemashite.) = Nice to meet you.\n2. わたしは [Name] です。(Watashi wa [Name] desu.) = I am [Name].\n3. インドからきました。(Indo kara kimashita.) = I came from India.\n4. よろしくおねがいします。(Yoroshiku onegaishimasu.) = Please treat me well.\n\nImportant: は is normally \"ha\" but when used as a topic marker, it's pronounced \"wa\"!" }
        ],
        tricks: [
          { title: "Hiragana Mnemonics", trick: "あ = looks like an Antenna (a), い = two eels standing (i), う = looks like a tube/Umbrella top (u), え = an Elevator door (e), お = a person Opening a door (o)." },
          { title: "は = wa (not ha!)", trick: "When は is a particle (grammar word), it says \"wa\". When it's part of a word, it says \"ha\". Think: \"は is a party animal — at the grammar PARTY it dances as WA!\"" },
          { title: "SHI, CHI, TSU Exceptions", trick: "Remember: \"She Chewed Two\" — し (SHI), ち (CHI), つ (TSU). These 3 break the pattern and you just have to memorize them!" }
        ],
        vocab: [
          { word: 'こんにちは', meaning: 'Hello', example: 'こんにちは、お元気ですか？' },
          { word: 'ありがとう', meaning: 'Thank you', example: 'ありがとうございます！' },
          { word: 'すみません', meaning: 'Sorry / Excuse me', example: 'すみません、トイレはどこですか？' },
          { word: 'はい / いいえ', meaning: 'Yes / No', example: 'はい、そうです。' },
          { word: 'わたし', meaning: 'I / Me', example: 'わたしは学生です。' },
          { word: 'です', meaning: 'Am / Is / Are', example: 'わたしはプリヤです。' }
        ],
        importantQA: [
          { q: 'Write the first row of Hiragana.', a: 'あ (a), い (i), う (u), え (e), お (o).' },
          { q: 'How do you introduce yourself in Japanese?', a: 'はじめまして。わたしは[name]です。よろしくおねがいします。' },
          { q: 'What are the 3 Japanese writing systems?', a: 'Hiragana (ひらがな) for Japanese words, Katakana (カタカナ) for foreign words, Kanji (漢字) for Chinese characters.' }
        ],
        exercises: [
          { q: 'Write in Hiragana: a, i, u, e, o.', a: 'あ、い、う、え、お' },
          { q: 'Write a self-introduction in Japanese.', a: 'はじめまして。わたしは[name]です。インドからきました。よろしくおねがいします。' }
        ]
      }
    }
  },

  spanish: {
    9: {
      0: {
        summary: "Welcome to Spanish! In this first chapter, we learn how to greet people, introduce ourselves, and the most important grammar: the difference between SER and ESTAR (both mean 'to be' but are used differently). We also learn how to conjugate -AR verbs.",
        explain: [
          { heading: "Spanish is Easy for Hindi Speakers!", text: "Great news — Spanish pronunciation is very similar to Hindi!\n\n• A = \"ah\" (like Hindi अ)\n• E = \"eh\" (like Hindi ए)\n• I = \"ee\" (like Hindi ई)\n• O = \"oh\" (like Hindi ओ)\n• U = \"oo\" (like Hindi ऊ)\n\nSpanish is pronounced EXACTLY as it's written — no silent letters, no surprises! If you can read it, you can say it.\n\nSpecial marks:\n• ñ = sounds like \"ny\" (like Hindi ञ) → España = Es-pan-ya\n• ¿ ? = questions have an upside-down ? at the START too!\n• ¡ ! = exclamations have an upside-down ! at the start!" },
          { heading: "Greetings & Self-Introduction", text: "• ¡Hola! = Hello!\n• Buenos días = Good morning\n• Buenas tardes = Good afternoon\n• Buenas noches = Good evening/night\n• ¿Cómo estás? = How are you? (informal)\n• ¿Cómo está usted? = How are you? (formal)\n• Muy bien, gracias = Very well, thanks\n• Adiós = Goodbye\n• Hasta luego = See you later\n\nIntroducing yourself:\n• Me llamo ___ = My name is ___\n• Soy de India = I am from India\n• Tengo ___ años = I am ___ years old\n• Vivo en Delhi = I live in Delhi" },
          { heading: "SER vs ESTAR — Both Mean 'To Be'!", text: "This is the trickiest thing in Spanish. Both mean \"to be\" but:\n\nSER = for PERMANENT things (identity, origin, profession, personality)\n• Soy estudiante. (I am a student — that's my identity)\n• Soy de India. (I am from India — that's permanent)\n• Ella es inteligente. (She is intelligent — that's her personality)\n\nSER conjugation: soy, eres, es, somos, sois, son\n\nESTAR = for TEMPORARY things (feelings, location, states)\n• Estoy bien. (I am fine — that's how I feel now)\n• Estoy en casa. (I am at home — I could leave)\n• Ella está cansada. (She is tired — she won't be tired forever)\n\nESTAR conjugation: estoy, estás, está, estamos, estáis, están" },
          { heading: "-AR Verb Conjugation", text: "Most Spanish verbs end in -AR. To conjugate:\n1. Remove -AR\n2. Add endings:\n\nHablar (to speak):\n• Yo hablo = I speak\n• Tú hablas = You speak\n• Él/Ella habla = He/She speaks\n• Nosotros hablamos = We speak\n• Vosotros habláis = You all speak\n• Ellos/Ellas hablan = They speak\n\nEndings: -o, -as, -a, -amos, -áis, -an\n\nWorks for: estudiar (study), trabajar (work), cantar (sing), bailar (dance), cocinar (cook), viajar (travel)." }
        ],
        tricks: [
          { title: "SER vs ESTAR — DOCTOR vs PLACE", trick: "Use SER for DOCTOR:\nD = Description (tall, smart)\nO = Occupation (student, doctor)\nC = Characteristic (kind, funny)\nT = Time (Es la una = It's 1 o'clock)\nO = Origin (Soy de India)\nR = Relationship (Es mi hermano)\n\nUse ESTAR for PLACE:\nP = Position/Place (Estoy en casa)\nL = Location (Madrid está en España)\nA = Action in progress (Estoy estudiando)\nC = Condition (Estoy cansado)\nE = Emotion (Estoy feliz)" },
          { title: "-AR Endings Song", trick: "\"O-AS-A, AMOS-ÁIS-AN\" — sing it to the tune of any song you like! The 'yo' form always ends in -O, which is easy to remember because \"yO\" already ends in O!" },
          { title: "Buenos vs Buenas", trick: "Buenos días (masculine — día is masculine). Buenas tardes, Buenas noches (feminine — tarde and noche are feminine). Think: morning is a BOY, afternoon and night are GIRLS!" }
        ],
        vocab: [
          { word: '¡Hola!', meaning: 'Hello!', example: '¡Hola! ¿Cómo estás?' },
          { word: 'Buenos días', meaning: 'Good morning', example: 'Buenos días, señor.' },
          { word: 'Gracias', meaning: 'Thank you', example: '¡Muchas gracias!' },
          { word: 'Por favor', meaning: 'Please', example: 'Un café, por favor.' },
          { word: 'Me llamo...', meaning: 'My name is...', example: 'Me llamo Priya.' },
          { word: 'Soy de...', meaning: 'I am from...', example: 'Soy de India.' },
          { word: 'Tengo...años', meaning: 'I am...years old', example: 'Tengo 14 años.' },
          { word: 'Adiós', meaning: 'Goodbye', example: '¡Adiós! Hasta luego.' }
        ],
        importantQA: [
          { q: 'Conjugate ser in present tense.', a: 'Yo soy, tú eres, él/ella es, nosotros somos, vosotros sois, ellos/ellas son.' },
          { q: 'When do you use ser vs estar?', a: 'Ser = permanent (identity, origin, profession). Estar = temporary (feelings, location, states). Soy estudiante (permanent). Estoy cansado (temporary).' },
          { q: 'Conjugate hablar in present tense.', a: 'Hablo, hablas, habla, hablamos, habláis, hablan.' },
          { q: 'Introduce yourself in Spanish.', a: '¡Hola! Me llamo Priya. Soy de India. Tengo 14 años. Soy estudiante.' }
        ],
        exercises: [
          { q: 'Fill ser or estar: Yo ___ estudiante. Yo ___ en casa.', a: 'Yo soy estudiante. Yo estoy en casa.' },
          { q: 'Conjugate estudiar: Yo ___, Tú ___, Nosotros ___.', a: 'Yo estudio, Tú estudias, Nosotros estudiamos.' },
          { q: 'Write greetings for morning, afternoon, night.', a: 'Buenos días, Buenas tardes, Buenas noches.' }
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

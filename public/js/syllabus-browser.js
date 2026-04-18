// ===== CBSE SYLLABUS DATA — ALL LANGUAGES, ALL CLASSES =====

const syllabusData = {
  french: {
    name: 'French',
    flag: '🇫🇷',
    classes: {
      6: {
        textbook: 'Apprenons le Français — Méthode de Français 2',
        publisher: 'New Saraswati House',
        chapters: [
          { num: 0, title: 'Révision (Revision)', topics: ['Alphabet recap', 'Basic greetings', 'Numbers 1-20'] },
          { num: 1, title: "Un coup d'œil sur la France", topics: ['Introduction to France', 'Geography', 'French culture'] },
          { num: 2, title: 'Voilà le frère et la sœur de Manuel', topics: ['Family vocabulary', 'Possessive adjectives', 'Introducing people'] },
          { num: 3, title: 'À la cafétéria', topics: ['Food vocabulary', 'Ordering at a café', 'Definite articles'] },
          { num: 4, title: 'Mon Pays : la France', topics: ['Describing a country', 'Adjectives of nationality', 'Geography terms'] },
          { num: 5, title: 'Les Parents de Manuel', topics: ['Family members', 'Professions', 'Adjective agreement'] },
          { num: 6, title: "C'est Noël", topics: ['Festivals in France', 'Seasons', 'Writing a greeting card'] },
          { num: 7, title: "Allons à l'école", topics: ['School subjects', 'Daily routine at school', 'Telling time'] },
          { num: 8, title: 'Dans un grand magasin', topics: ['Shopping vocabulary', 'Clothes', 'Colors', 'Prices'] },
          { num: 9, title: 'Les repas', topics: ['Meals of the day', 'Food items', 'Partitive articles'] },
          { num: 10, title: 'Ma maison', topics: ['Rooms of a house', 'Furniture', 'Prepositions of place'] },
          { num: 11, title: 'Une lettre de Rouen', topics: ['Letter writing', 'Describing a city', 'Informal letter format'] },
        ]
      },
      7: {
        textbook: 'Apprenons le Français — Méthode de Français 3',
        publisher: 'New Saraswati House',
        chapters: [
          { num: 1, title: "La France, qu'est-ce que c'est?", topics: ['French identity', 'Symbols of France', 'Descriptions'] },
          { num: 2, title: 'La rentrée', topics: ['Back to school', 'School supplies', 'First day conversations'] },
          { num: 3, title: 'Il est français', topics: ['Nationalities', 'Gender of adjectives', 'Describing people'] },
          { num: 4, title: 'La journée de Mme Lavigne', topics: ['Daily routine', 'Reflexive verbs', 'Telling time'] },
          { num: 5, title: 'Kalu est malade', topics: ['Health vocabulary', 'Body parts', 'At the doctor'] },
          { num: 6, title: 'Faire les courses', topics: ['Grocery shopping', 'Quantities', 'Partitive articles'] },
          { num: 7, title: 'M. Lavigne cherche un manteau', topics: ['Clothing vocabulary', 'Shopping dialogues', 'Demonstrative adjectives'] },
          { num: 8, title: 'Allons à Paris', topics: ['Paris landmarks', 'Directions', 'Transportation'] },
          { num: 9, title: 'Les photos de Manuel', topics: ['Describing photos', 'Past tense introduction', 'Memories'] },
          { num: 10, title: 'Au café des Laurent', topics: ['At a café', 'Ordering food/drinks', 'Polite expressions'] },
          { num: 11, title: 'Encore une lettre de Rouen', topics: ['Letter writing', 'Past events', 'Describing experiences'] },
          { num: 12, title: 'Une journée bien chargée', topics: ['Busy day', 'Activities', 'Passé composé practice'] },
          { num: 13, title: "Une visite au parc d'attractions", topics: ['Amusement park', 'Giving opinions', 'Exclamations'] },
        ]
      },
      8: {
        textbook: 'Apprenons le Français — Méthode de Français 4',
        publisher: 'New Saraswati House',
        chapters: [
          { num: 1, title: 'Que savez-vous de la France?', topics: ['French culture quiz', 'Geography revision', 'Famous French people'] },
          { num: 2, title: 'Une boum', topics: ['Party vocabulary', 'Invitations', 'Future tense introduction'] },
          { num: 3, title: "Jeanne d'Arc", topics: ['Joan of Arc biography', 'Historical vocabulary', 'Past tense narration'] },
          { num: 4, title: "La vie d'un mannequin est-elle facile?", topics: ['Fashion industry', 'Describing professions', 'Pros and cons'] },
          { num: 5, title: 'On voyage', topics: ['Travel vocabulary', 'Booking tickets', 'At the airport/station'] },
          { num: 6, title: 'Bon voyage!', topics: ['Travel experiences', 'Passé composé with être', 'Postcards'] },
          { num: 7, title: 'Des nouvelles de Lyon', topics: ['News from Lyon', 'Imparfait introduction', 'Comparing past tenses'] },
          { num: 8, title: 'Bon Appétit', topics: ['French cuisine', 'Restaurant dialogues', 'Recipes'] },
          { num: 9, title: 'Des invitations', topics: ['Writing invitations', 'Accepting/declining', 'Conditional mood'] },
          { num: 10, title: 'Aneesh partira bientôt', topics: ['Future tense', 'Farewell', 'Plans and intentions'] },
          { num: 11, title: 'La Météo', topics: ['Weather vocabulary', 'Weather forecast', 'Seasons and climate'] },
        ]
      },
      9: {
        textbook: 'Entre Jeunes',
        publisher: 'CBSE / NCERT',
        chapters: [
          { num: 1, title: 'La Famille', topics: ['Extended family', 'Family relationships', 'Possessive pronouns'] },
          { num: 2, title: 'Au Lycée', topics: ['High school life', 'Subjects and timetable', 'School in France vs India'] },
          { num: 3, title: 'Une journée de Pauline', topics: ['Daily routine', 'Reflexive verbs', 'Describing a typical day'] },
          { num: 4, title: 'Les saisons', topics: ['Seasons in detail', 'Weather expressions', 'Activities by season'] },
          { num: 5, title: 'Les Voyages', topics: ['Travel planning', 'Booking accommodation', 'Passé composé revision'] },
          { num: 6, title: 'Les loisirs et les sports', topics: ['Hobbies', 'Sports vocabulary', 'Giving opinions'] },
          { num: 7, title: "L'argent de poche", topics: ['Pocket money', 'Saving and spending', 'Conditional tense'] },
          { num: 8, title: 'Faire des achats', topics: ['Shopping in France', 'Comparing products', 'Comparative/Superlative'] },
          { num: 9, title: 'Un dîner en famille', topics: ['Family dinner', 'French meal customs', 'Table manners vocabulary'] },
          { num: 10, title: 'La mode', topics: ['Fashion in France', 'Describing clothes', 'Expressing preferences'] },
          { num: 11, title: 'Les fêtes', topics: ['French festivals', 'Bastille Day', 'Cultural celebrations'] },
          { num: 12, title: 'La Francophonie', topics: ['French-speaking world', 'Francophone countries', 'Cultural diversity'] },
        ]
      },
      10: {
        textbook: 'Entre Jeunes',
        publisher: 'CBSE / NCERT',
        chapters: [
          { num: 1, title: 'Retrouvons nos amis', topics: ['Meeting friends', 'Catching up', 'Dialogue writing'] },
          { num: 2, title: 'Après le bac', topics: ['After high school', 'Career choices', 'Future tense mastery'] },
          { num: 3, title: 'Chercher du travail', topics: ['Job hunting', 'Writing a CV', 'Job interview vocabulary'] },
          { num: 4, title: 'Le plaisir de lire', topics: ['Reading for pleasure', 'Book reviews', 'Literary vocabulary'] },
          { num: 5, title: 'Les médias', topics: ['Media and press', 'News vocabulary', 'Expressing opinions'] },
          { num: 6, title: 'Chacun ses goûts', topics: ['Personal tastes', 'Food preferences', 'Subjunctive mood intro'] },
          { num: 7, title: 'En pleine forme', topics: ['Health and fitness', 'Medical vocabulary', 'Giving advice'] },
          { num: 8, title: "L'environnement", topics: ['Environment', 'Pollution', 'Green initiatives', 'Essay writing'] },
          { num: 9, title: 'Métro, Boulot, Dodo', topics: ['Work life in France', 'Daily grind', 'Professional vocabulary'] },
          { num: 10, title: 'Vive la République', topics: ['French Republic', 'Government', 'Civic values'] },
          { num: 11, title: "C'est bon le progrès", topics: ['Technology', 'Progress and innovation', 'Debate vocabulary'] },
          { num: 12, title: 'Vers un monde interculturel', topics: ['Intercultural world', 'Diversity', 'Formal essay writing'] },
        ]
      }
    }
  },

  german: {
    name: 'German',
    flag: '🇩🇪',
    classes: {
      6: {
        textbook: 'Hallo Deutsch 1',
        publisher: 'Goyal Publishers',
        chapters: [
          { num: 1, title: 'Hallo!', topics: ['Greetings', 'Self-introduction', 'Alphabet', 'Numbers 1-20'] },
          { num: 2, title: 'Das ist meine Familie', topics: ['Family members', 'Possessive articles', 'Describing family'] },
          { num: 3, title: 'Hast du Geschwister?', topics: ['Siblings', 'Yes/No questions', 'haben (to have)'] },
          { num: 4, title: 'Wo wohnt ihr?', topics: ['Where do you live?', 'Cities in Germany', 'wohnen conjugation'] },
          { num: 5, title: 'Das Haus von Familie Weigel', topics: ['House vocabulary', 'Rooms', 'Furniture'] },
          { num: 6, title: 'Ein Besuch', topics: ['A visit', 'Hospitality phrases', 'Food and drinks'] },
          { num: 7, title: 'Mautzi: unsere Katze', topics: ['Pets', 'Animal vocabulary', 'Describing animals'] },
          { num: 8, title: 'Die Nachbarn von Familie Weigel', topics: ['Neighbours', 'Professions', 'Community'] },
        ]
      },
      7: {
        textbook: 'Hallo Deutsch 2',
        publisher: 'Goyal Publishers',
        chapters: [
          { num: 1, title: 'Was isst du in der Pause?', topics: ['Food at break', 'Meals', 'essen conjugation'] },
          { num: 2, title: 'Meine Schulsachen', topics: ['School supplies', 'Definite/Indefinite articles', 'Colors'] },
          { num: 3, title: 'Was gibt es im Fernsehen?', topics: ['TV programs', 'Hobbies', 'Free time activities'] },
          { num: 4, title: 'Um wie viel Uhr stehst du auf?', topics: ['Time', 'Daily routine', 'Separable verbs'] },
          { num: 5, title: 'Kannst du inlineskaten?', topics: ['Abilities', 'Modal verb können', 'Sports'] },
          { num: 6, title: 'Wem gehört das Fahrrad?', topics: ['Possessions', 'Dative case intro', 'Belongings'] },
          { num: 7, title: 'Wohin fährst du in Urlaub?', topics: ['Vacations', 'Travel destinations', 'fahren conjugation'] },
          { num: 8, title: 'Alles Gute zum Geburtstag!', topics: ['Birthday celebrations', 'Months', 'Ordinal numbers'] },
        ]
      },
      8: {
        textbook: 'Hallo Deutsch 3',
        publisher: 'Goyal Publishers',
        chapters: [
          { num: 1, title: 'Was tut dir weh?', topics: ['Body parts', 'Health complaints', 'At the doctor'] },
          { num: 2, title: 'Gesund leben', topics: ['Healthy living', 'Food pyramid', 'Giving advice'] },
          { num: 3, title: 'Was hast du für deine Gesundheit getan?', topics: ['Perfekt tense', 'Health actions', 'Past events'] },
          { num: 4, title: 'Mein Tagesablauf', topics: ['Daily routine detail', 'Reflexive verbs', 'Time expressions'] },
          { num: 5, title: 'Wo ist Tina?', topics: ['Locations', 'Prepositions with Dative', 'Giving directions'] },
          { num: 6, title: 'Einkaufen gehen', topics: ['Shopping', 'Clothes', 'Prices', 'Comparisons'] },
          { num: 7, title: 'Meine Stadt', topics: ['City vocabulary', 'Directions', 'Public transport'] },
          { num: 8, title: 'Ferien und Reisen', topics: ['Holidays', 'Travel plans', 'Past tense narration'] },
        ]
      },
      9: {
        textbook: 'Beste Freunde B1.1',
        publisher: 'Hueber / Goyal Publishers',
        chapters: [
          { num: 1, title: 'Allein zu Hause', topics: ['Home alone', 'Household chores', 'Nebensätze (subordinate clauses)'] },
          { num: 2, title: 'Wir kaufen nichts!', topics: ['Consumerism', 'Shopping habits', 'Negative expressions'] },
          { num: 3, title: 'Das würde ich nie tun!', topics: ['Konjunktiv II', 'Hypothetical situations', 'Expressing opinions'] },
          { num: 4, title: 'Hamburg, wir kommen!', topics: ['City trip', 'Planning a journey', 'Hamburg landmarks'] },
          { num: 5, title: 'Alles wird gut', topics: ['Future tense', 'Optimism/Pessimism', 'Making predictions'] },
        ]
      },
      10: {
        textbook: 'Beste Freunde B1.1',
        publisher: 'Hueber / Goyal Publishers',
        chapters: [
          { num: 6, title: 'Magst du grüne Bohnen?', topics: ['Food preferences', 'Cooking vocabulary', 'Relative clauses'] },
          { num: 7, title: 'Die App, die den Dieb findet', topics: ['Technology', 'Relative pronouns', 'Crime vocabulary'] },
          { num: 8, title: 'Einfach Sprachen lernen', topics: ['Language learning', 'Study methods', 'Passive voice'] },
          { num: 9, title: 'Deine Hilfe zählt!', topics: ['Volunteering', 'Social work', 'Indirect speech'] },
        ]
      }
    }
  },

  sanskrit: {
    name: 'Sanskrit',
    flag: '🕉️',
    classes: {
      6: {
        textbook: 'रुचिरा (Ruchira) — भाग 1',
        publisher: 'NCERT',
        chapters: [
          { num: 1, title: 'शब्दपरिचयः I', topics: ['Noun introduction', 'Masculine nouns', 'अकारान्त पुल्लिङ्ग'] },
          { num: 2, title: 'शब्दपरिचयः II', topics: ['Feminine nouns', 'आकारान्त स्त्रीलिङ्ग', 'Basic sentences'] },
          { num: 3, title: 'शब्दपरिचयः III', topics: ['Neuter nouns', 'अकारान्त नपुंसकलिङ्ग', 'Pronoun introduction'] },
          { num: 4, title: 'विद्यालयः', topics: ['School vocabulary', 'Verbs — present tense', 'Simple sentences'] },
          { num: 5, title: 'वृक्षाः', topics: ['Trees', 'Nature vocabulary', 'Plural forms'] },
          { num: 6, title: 'समुद्रतटः', topics: ['Beach/seaside', 'Prepositions', 'Description writing'] },
          { num: 7, title: 'बकस्य प्रतीकारः', topics: ['Story of the crane', 'Moral stories', 'Past tense intro'] },
          { num: 8, title: 'सूक्तिस्तबकः', topics: ['Wise sayings', 'Subhashitas', 'Translation practice'] },
          { num: 9, title: 'क्रीडास्पर्धा', topics: ['Sports competition', 'Action verbs', 'Dialogue writing'] },
          { num: 10, title: 'कृषिकाः कर्मवीराः', topics: ['Farmers as heroes', 'Agriculture vocabulary', 'Essay comprehension'] },
          { num: 11, title: 'पुष्पोत्सवः', topics: ['Flower festival', 'Festival vocabulary', 'Cultural celebrations'] },
          { num: 12, title: 'दशमः त्वम् असि', topics: ['Story — You are the tenth', 'Counting', 'Moral lesson'] },
          { num: 13, title: 'विमानयानं रचयाम', topics: ['Let us make an airplane', 'Craft activity', 'Imperative mood'] },
        ]
      },
      7: {
        textbook: 'रुचिरा (Ruchira) — भाग 2',
        publisher: 'NCERT',
        chapters: [
          { num: 1, title: 'सुभाषितानि', topics: ['Wise sayings (Shlokas)', 'Translation', 'Moral teachings'] },
          { num: 2, title: 'दुर्बुद्धिः विनश्यति', topics: ['The foolish one perishes', 'Panchatantra story', 'Comprehension'] },
          { num: 3, title: 'स्वावलम्बनम्', topics: ['Self-reliance', 'Values education', 'Essay writing'] },
          { num: 4, title: 'पण्डिता रमाबाई', topics: ['Pandita Ramabai biography', 'Women empowerment', 'Past tense'] },
          { num: 5, title: 'सदाचारः', topics: ['Good conduct', 'Ethics and values', 'Shloka memorization'] },
          { num: 6, title: 'सङ्कल्पः सिद्धिदायकः', topics: ['Determination leads to success', 'Motivational story', 'Future tense'] },
          { num: 7, title: 'त्रिवर्णः ध्वजः', topics: ['The tricolor flag', 'Indian flag significance', 'Patriotic vocabulary'] },
          { num: 8, title: 'अहमपि विद्यालयं गमिष्यामि', topics: ['I will also go to school', 'Education rights', 'Future tense practice'] },
          { num: 9, title: 'विश्वबन्धुत्वम्', topics: ['Universal brotherhood', 'Peace and harmony', 'Global values'] },
          { num: 10, title: 'सम्वयो हि दुर्जयः', topics: ['Unity is invincible', 'Teamwork story', 'Moral stories'] },
          { num: 11, title: 'विद्याधनम्', topics: ['Knowledge is wealth', 'Importance of education', 'Shloka analysis'] },
          { num: 12, title: 'अमृतं संस्कृतम्', topics: ['Sanskrit is immortal', 'Importance of Sanskrit', 'Language appreciation'] },
          { num: 13, title: 'लालनगीतम्', topics: ['Lullaby', 'Poetry', 'Rhyme and meter in Sanskrit'] },
        ]
      },
      8: {
        textbook: 'रुचिरा (Ruchira) — भाग 3',
        publisher: 'NCERT',
        chapters: [
          { num: 1, title: 'सुभाषितानि', topics: ['Advanced Subhashitas', 'Translation and analysis', 'Grammar in shlokas'] },
          { num: 2, title: 'बिलस्य वाणी न कदापि मे श्रुता', topics: ['I never heard the voice from the cave', 'Panchatantra', 'Comprehension'] },
          { num: 3, title: 'डिजीभारतम्', topics: ['Digital India', 'Modern technology in Sanskrit', 'New vocabulary'] },
          { num: 4, title: 'सदैव पुरतो निधेहि चरणम्', topics: ['Always step forward', 'Motivational poetry', 'Meter analysis'] },
          { num: 5, title: 'कण्टकेनैव कण्टकम्', topics: ['A thorn removes a thorn', 'Problem solving', 'Sandhi rules'] },
          { num: 6, title: 'गृहं शून्यं सुतां विना', topics: ['Home is empty without a daughter', 'Gender equality', 'Values'] },
          { num: 7, title: "भारतजनताऽहम्", topics: ['I am the people of India', 'Patriotic poetry', 'National integration'] },
          { num: 8, title: 'संसारसागरस्य नायकाः', topics: ['Heroes of the world ocean', 'Great personalities', 'Biography writing'] },
          { num: 9, title: 'सप्तभगिन्यः', topics: ['Seven Sisters (NE India)', 'Geography in Sanskrit', 'State descriptions'] },
          { num: 10, title: 'नीतिनवनीतम्', topics: ['Essence of ethics', 'Advanced shlokas', 'Grammar analysis'] },
          { num: 11, title: 'सावित्री बाई फुले', topics: ['Savitribai Phule biography', 'Women education pioneer', 'Essay'] },
          { num: 12, title: 'कः रक्षति कः रक्षितः', topics: ['Who protects whom?', 'Environment story', 'Passive voice'] },
          { num: 13, title: 'क्षितौ राजते भारतस्वर्णभूमिः', topics: ['India shines as golden land', 'Patriotic shloka', 'Appreciation'] },
          { num: 14, title: 'आर्यभटः', topics: ['Aryabhata biography', 'Ancient Indian science', 'Contributions'] },
        ]
      },
      9: {
        textbook: 'शेमुषी (Shemushi) — भाग 1',
        publisher: 'NCERT',
        chapters: [
          { num: 1, title: 'भारतीवसन्तगीतिः', topics: ['Song of Indian Spring', 'Poetry appreciation', 'Meter and rhyme'] },
          { num: 2, title: 'स्वर्णकाकः', topics: ['The Golden Crow', 'Folk tale', 'Moral story comprehension'] },
          { num: 3, title: 'गोदोहनम्', topics: ['Milking the cow', 'One-act play', 'Dialogue comprehension'] },
          { num: 5, title: 'सूक्तिमौक्तिकम्', topics: ['Pearl-like wise sayings', 'Shloka analysis', 'Grammar exercises'] },
          { num: 6, title: 'भ्रान्तो बालः', topics: ['The confused boy', 'Story comprehension', 'Daily life vocabulary'] },
          { num: 8, title: 'लौहतुला', topics: ['The iron balance', 'Panchatantra story', 'Justice and morality'] },
          { num: 9, title: 'सिकतासेतुः', topics: ['Bridge of sand', 'Devotion story', 'Comprehension and translation'] },
          { num: 10, title: 'जटायोः शौर्यम्', topics: ['Jatayu\'s bravery', 'Ramayana episode', 'Heroism vocabulary'] },
          { num: 11, title: 'पर्यावरणम्', topics: ['Environment', 'Nature conservation', 'Modern issues in Sanskrit'] },
          { num: 12, title: 'वाड्मनःप्राणस्वरूपम्', topics: ['Nature of speech, mind and life', 'Upanishadic text', 'Philosophy'] },
        ]
      },
      10: {
        textbook: 'शेमुषी (Shemushi) — भाग 2',
        publisher: 'NCERT',
        chapters: [
          { num: 1, title: 'शुचिपर्यावरणम्', topics: ['Clean environment', 'Pollution types', 'Environmental poetry'] },
          { num: 2, title: 'बुद्धिर्बलवती सदा', topics: ['Intelligence is always powerful', 'Story comprehension', 'Moral'] },
          { num: 3, title: 'शिशुलालनम्', topics: ['Nurturing children', 'Poetry about childhood', 'Translation'] },
          { num: 4, title: 'जननी तुल्यवत्सला', topics: ['Mother\'s equal love', 'Mahabharata episode', 'Values'] },
          { num: 5, title: 'सुभाषितानि', topics: ['Wise sayings', 'Board-level shloka analysis', 'Grammar in context'] },
          { num: 6, title: 'सौहार्दं प्रकृतेः शोभा', topics: ['Harmony is nature\'s beauty', 'Friendship', 'Nature'] },
          { num: 7, title: 'विचित्रः साक्षी', topics: ['The strange witness', 'Court story', 'Justice'] },
          { num: 8, title: 'सूक्तयः', topics: ['Proverbs and maxims', 'Translation practice', 'Board exam prep'] },
          { num: 9, title: 'भूकम्पविभीषिका', topics: ['Earthquake disaster', 'Natural disasters', 'Prose comprehension'] },
          { num: 10, title: 'अन्योक्तयः', topics: ['Indirect sayings', 'Metaphorical shlokas', 'Literary analysis'] },
        ]
      }
    }
  },

  spanish: {
    name: 'Spanish',
    flag: '🇪🇸',
    classes: {
      9: {
        textbook: 'Aula Internacional 1',
        publisher: 'Difusión / Goyal Publishers',
        chapters: [
          { num: 0, title: 'En el aula', topics: ['Classroom vocabulary', 'Basic greetings', 'Alphabet', 'Numbers'] },
          { num: 1, title: 'Nosotros', topics: ['Self-introduction', 'Nationalities', 'ser/estar', 'Personal info'] },
          { num: 2, title: 'Quiero aprender español', topics: ['Why learn Spanish?', 'Present tense', 'Regular verbs'] },
          { num: 3, title: '¿Dónde está Santiago?', topics: ['Geography', 'Locations', 'Prepositions of place'] },
          { num: 4, title: '¿Cuál prefieres?', topics: ['Preferences', 'Shopping', 'Demonstratives', 'Colors'] },
          { num: 5, title: 'Tus amigos son mis amigos', topics: ['Friends', 'Describing people', 'Possessive adjectives'] },
        ]
      },
      10: {
        textbook: 'Aula Internacional 1 (continued)',
        publisher: 'Difusión / Goyal Publishers',
        chapters: [
          { num: 6, title: 'Día a día', topics: ['Daily routine', 'Reflexive verbs', 'Telling time'] },
          { num: 7, title: '¡A comer!', topics: ['Food and drinks', 'Restaurant vocabulary', 'Ordering food'] },
          { num: 8, title: 'El barrio ideal', topics: ['Ideal neighbourhood', 'City vocabulary', 'Describing places'] },
          { num: 9, title: '¿Sabes conducir?', topics: ['Abilities', 'saber vs poder', 'Transport vocabulary'] },
        ]
      }
    }
  },

  japanese: {
    name: 'Japanese',
    flag: '🇯🇵',
    classes: {
      6: {
        textbook: 'Ume (うめ)',
        publisher: 'The Japan Foundation / Goyal Publishers',
        chapters: [
          { num: 1, title: 'はじめまして (Hajimemashite)', topics: ['Self-introduction', 'Greetings', 'Romaji basics'] },
          { num: 2, title: 'にほんのしょうかい (Nihon no Shoukai)', topics: ['Introduction to Japan', 'Japanese culture', 'Geography'] },
          { num: 3, title: 'すうじ (Suuji)', topics: ['Numbers 1-100', 'Counting systems', 'Phone numbers'] },
          { num: 4, title: 'にちじょうのあいさつ (Nichijou no Aisatsu)', topics: ['Daily greetings', 'Morning/afternoon/night', 'Polite expressions'] },
          { num: 5, title: 'がっこう (Gakkou)', topics: ['School vocabulary', 'Classroom objects', 'School subjects'] },
          { num: 6, title: 'かぞく (Kazoku)', topics: ['Family members', 'My family vs your family', 'Counting people'] },
        ]
      },
      7: {
        textbook: 'Momo (もも)',
        publisher: 'The Japan Foundation / Goyal Publishers',
        chapters: [
          { num: 1, title: 'ひらがな (Hiragana)', topics: ['Hiragana chart', 'Vowels あいうえお', 'Reading practice'] },
          { num: 2, title: 'ひらがな れんしゅう', topics: ['Hiragana practice', 'Combined sounds', 'Writing drills'] },
          { num: 3, title: 'じこしょうかい (Jiko Shoukai)', topics: ['Self-introduction in Hiragana', 'Age', 'Hobbies'] },
          { num: 4, title: 'まいにちのせいかつ (Mainichi)', topics: ['Daily life', 'Time expressions', 'Routine verbs'] },
          { num: 5, title: 'たべもの (Tabemono)', topics: ['Food vocabulary', 'Japanese food', 'Likes and dislikes'] },
          { num: 6, title: 'まちのなか (Machi no Naka)', topics: ['In the town', 'Places', 'Directions'] },
        ]
      },
      8: {
        textbook: 'Sakura (さくら)',
        publisher: 'The Japan Foundation / Goyal Publishers',
        chapters: [
          { num: 1, title: 'カタカナ (Katakana)', topics: ['Katakana chart', 'Foreign words', 'Reading practice'] },
          { num: 2, title: 'かんじ にゅうもん (Kanji Introduction)', topics: ['Basic Kanji', 'Numbers in Kanji', 'Days of week'] },
          { num: 3, title: 'わたしのいちにち', topics: ['My day', 'Verb conjugation', 'Present/Past tense'] },
          { num: 4, title: 'かいもの (Kaimono)', topics: ['Shopping', 'Prices', 'Counters for objects'] },
          { num: 5, title: 'きせつとてんき (Kisetsu)', topics: ['Seasons and weather', 'Adjectives', 'Describing weather'] },
          { num: 6, title: 'にほんのぶんか (Nihon no Bunka)', topics: ['Japanese culture', 'Festivals', 'Traditions'] },
          { num: 7, title: 'りょこう (Ryokou)', topics: ['Travel', 'Transportation', 'Asking directions'] },
          { num: 8, title: 'しょうらいのゆめ (Shourai)', topics: ['Future dreams', 'Professions', 'Aspirations'] },
        ]
      },
      9: {
        textbook: 'Minna no Nihongo — Indian Edition 1-1',
        publisher: 'Goyal Publishers',
        chapters: [
          { num: 1, title: 'わたしは マイク ミラーです', topics: ['Self-intro with です', 'は/も/の particles', 'Nationalities'] },
          { num: 2, title: 'これは なんですか', topics: ['Demonstratives これ/それ/あれ', 'Question words', 'Objects'] },
          { num: 3, title: 'ここは きょうしつです', topics: ['Location words ここ/そこ/あそこ', 'Places', 'Directions'] },
          { num: 4, title: 'やすみは なんようびですか', topics: ['Time and dates', 'Days of week', 'Daily schedule'] },
          { num: 5, title: 'えきへ いきます', topics: ['Transportation', 'へ/で/と particles', 'Going/Coming'] },
          { num: 6, title: 'いっしょに いきませんか', topics: ['Transitive verbs', 'Invitations', 'を particle'] },
          { num: 7, title: 'もう メール(を) おくりましたか', topics: ['Giving/Receiving', 'で particle (instrument)', 'Communication'] },
          { num: 8, title: 'きょうとは きれいな まちです', topics: ['i-adjectives', 'na-adjectives', 'Describing places'] },
          { num: 9, title: 'ざんねんですが', topics: ['Likes/dislikes', 'Abilities', 'が particle'] },
          { num: 10, title: 'あそこに コンビニが あります', topics: ['Existence あります/います', 'Location', 'Counting'] },
          { num: 11, title: 'これ、おねがいします', topics: ['Counters', 'Quantities', 'Duration'] },
          { num: 12, title: 'きのう おはなみに いきました', topics: ['Past tense', 'Comparisons', 'Experiences'] },
        ]
      },
      10: {
        textbook: 'Minna no Nihongo — Indian Edition 1-2',
        publisher: 'Goyal Publishers',
        chapters: [
          { num: 13, title: 'べつべつに おねがいします', topics: ['て-form of verbs', 'ている (ongoing actions)', 'Habits'] },
          { num: 14, title: 'みち を おしえて ください', topics: ['て-form requests', 'Giving directions', 'てください'] },
          { num: 15, title: 'しゃしんを とっても いいですか', topics: ['Permission てもいい', 'Prohibition てはいけない', 'Rules'] },
          { num: 16, title: 'つかいかたを おしえて ください', topics: ['Sequential actions', 'Describing people', 'てから'] },
          { num: 17, title: 'どう しましたか', topics: ['ない-form', 'Must/Must not', 'Health problems'] },
          { num: 18, title: 'しゅみは なんですか', topics: ['Potential form', 'ことができる', 'Hobbies in detail'] },
          { num: 19, title: 'ダイエットは あした から します', topics: ['た-form', 'Experiences ことがある', 'Past events'] },
          { num: 20, title: 'いっしょに おまつりに いかない?', topics: ['Plain/informal speech', 'Casual conversation', 'Friends'] },
        ]
      }
    }
  }
};

// ===== CHAPTER BROWSER UI =====
let browserLang = 'french';
let browserClass = 6;

function initChapterBrowser() {
  const container = document.getElementById('chapterBrowser');
  if (!container) return;
  renderChapterBrowser();
}

function setBrowserLang(lang, btn) {
  browserLang = lang;
  const langData = syllabusData[lang];
  const classes = Object.keys(langData.classes).map(Number);
  if (!classes.includes(browserClass)) browserClass = classes[0];
  document.querySelectorAll('.browser-lang-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderChapterBrowser();
}

function setBrowserClass(cls, btn) {
  browserClass = cls;
  document.querySelectorAll('.browser-class-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderChapterList();
}

function renderChapterBrowser() {
  const langData = syllabusData[browserLang];
  const classes = Object.keys(langData.classes).map(Number);

  const classPickerEl = document.getElementById('browserClassPicker');
  classPickerEl.innerHTML = classes.map(c =>
    `<button class="browser-class-btn${c === browserClass ? ' active' : ''}" onclick="setBrowserClass(${c}, this)">Class ${c}</button>`
  ).join('');

  renderChapterList();
}

function renderChapterList() {
  const langData = syllabusData[browserLang];
  const classData = langData.classes[browserClass];
  if (!classData) return;

  const listEl = document.getElementById('browserChapterList');
  const textbookEl = document.getElementById('browserTextbook');

  textbookEl.innerHTML = `
    <div class="browser-textbook-info">
      <div class="browser-textbook-icon">📖</div>
      <div>
        <div class="browser-textbook-name">${classData.textbook}</div>
        <div class="browser-textbook-pub">${classData.publisher} &middot; ${classData.chapters.length} chapters</div>
      </div>
    </div>
  `;

  listEl.innerHTML = classData.chapters.map((ch, i) => `
    <div class="browser-chapter-card" style="animation-delay: ${i * 0.05}s">
      <div class="browser-ch-num">${ch.num}</div>
      <div class="browser-ch-info">
        <div class="browser-ch-title">${ch.title}</div>
        <div class="browser-ch-topics">${ch.topics.join(' &middot; ')}</div>
      </div>
      <div class="browser-ch-actions">
        <button class="browser-ch-btn browser-ch-notes" onclick="openChapterNotes('${browserLang}', ${browserClass}, ${i})">📘 Notes</button>
        <button class="browser-ch-btn browser-ch-ws" onclick="openChapterWorksheet('${browserLang}', ${browserClass}, ${i})">📝 Worksheet</button>
      </div>
    </div>
  `).join('');
}

function openChapterNotes(lang, cls, idx) {
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];
  const textbook = langData.classes[cls].textbook;

  const topicsHtml = ch.topics.map(t => `<div class="notes-rule"><b>${t}</b></div>`).join('');

  const html = `
    <div class="notes-section">
      <h4>Chapter ${ch.num}: ${ch.title}</h4>
      <div class="notes-tip">📖 Textbook: ${textbook} — Class ${cls}</div>
    </div>
    <div class="notes-section">
      <h4>Key Topics Covered</h4>
      ${topicsHtml}
    </div>
    <div class="notes-section">
      <h4>Study Guide</h4>
      <div class="notes-rule">1. Read the chapter from your textbook carefully</div>
      <div class="notes-rule">2. Underline new vocabulary and grammar rules</div>
      <div class="notes-rule">3. Write down all new words with meanings</div>
      <div class="notes-rule">4. Practice the exercises given at the end of the chapter</div>
      <div class="notes-rule">5. Use LinguaLearn's AI Tutor to ask doubts about this chapter</div>
      <div class="notes-tip">💡 Tip: Use the Flashcard section to revise vocabulary from this chapter!</div>
    </div>
    <div class="notes-section">
      <h4>Important for Exams</h4>
      <div class="notes-rule">This chapter may appear in: Unit Test, Half-Yearly, Annual Exam</div>
      <div class="notes-rule">Expected question types: MCQ, Fill in the blanks, Translation, Short answer</div>
      <div class="notes-tip">🎯 Practice this chapter in Mock Test mode for exam simulation!</div>
    </div>
  `;

  addXP(15, 'notes');
  awardBadge('notes');
  updateDashNotesViewed();
  showContentModal({
    tag: `📘 Notes — ${langData.name} Class ${cls}`,
    title: `Ch. ${ch.num}: ${ch.title}`,
    print: true,
    html: html
  });
}

function openChapterWorksheet(lang, cls, idx) {
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];
  const textbook = langData.classes[cls].textbook;

  const html = `
    <div class="notes-section">
      <h4>Worksheet: Chapter ${ch.num} — ${ch.title}</h4>
      <div class="notes-tip">📖 ${textbook} — Class ${cls} ${langData.name}</div>
    </div>
    <div class="notes-section">
      <h4>Section A: Vocabulary (5 marks)</h4>
      <div class="notes-rule">Q1. Write the meanings of the following words from this chapter. (5 × 1 = 5)</div>
      <div class="ws-answer-box" style="min-height:80px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:1rem;margin:0.5rem 0;color:rgba(255,255,255,0.3);font-style:italic">Write your answers here...</div>
    </div>
    <div class="notes-section">
      <h4>Section B: Grammar (10 marks)</h4>
      <div class="notes-rule">Q2. Fill in the blanks using the correct form. (5 × 1 = 5)</div>
      <div class="ws-answer-box" style="min-height:80px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:1rem;margin:0.5rem 0;color:rgba(255,255,255,0.3);font-style:italic">Write your answers here...</div>
      <div class="notes-rule">Q3. Translate the following sentences. (5 × 1 = 5)</div>
      <div class="ws-answer-box" style="min-height:80px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:1rem;margin:0.5rem 0;color:rgba(255,255,255,0.3);font-style:italic">Write your answers here...</div>
    </div>
    <div class="notes-section">
      <h4>Section C: Comprehension (10 marks)</h4>
      <div class="notes-rule">Q4. Read the passage from Chapter ${ch.num} and answer the questions. (5 × 2 = 10)</div>
      <div class="ws-answer-box" style="min-height:100px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:1rem;margin:0.5rem 0;color:rgba(255,255,255,0.3);font-style:italic">Write your answers here...</div>
    </div>
    <div class="notes-section">
      <h4>Section D: Writing (5 marks)</h4>
      <div class="notes-rule">Q5. Write a short paragraph using vocabulary from this chapter. (5 marks)</div>
      <div class="ws-answer-box" style="min-height:100px;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:1rem;margin:0.5rem 0;color:rgba(255,255,255,0.3);font-style:italic">Write your paragraph here...</div>
    </div>
    <div class="notes-tip" style="margin-top:1rem">📊 Total Marks: 30 &middot; Time: 40 minutes &middot; Print this worksheet and practice!</div>
  `;

  addXP(20, 'worksheet');
  awardBadge('worksheet');
  showContentModal({
    tag: `📝 Worksheet — ${langData.name} Class ${cls}`,
    title: `Ch. ${ch.num}: ${ch.title}`,
    print: true,
    html: html
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', initChapterBrowser);

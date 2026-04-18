// ===== CONTENT MODAL DATA =====

const notesContent = {
  'french-grammar': {
    tag: '📘 Notes — French',
    title: 'French Grammar Basics — Articles, Gender & Plural',
    print: true,
    html: `
      <div class="notes-section">
        <h4>1. Articles — Definite (The)</h4>
        <div class="notes-rule"><b>Masculine singular:</b> le &nbsp;→&nbsp; le garçon (the boy)</div>
        <div class="notes-rule"><b>Feminine singular:</b> la &nbsp;→&nbsp; la fille (the girl)</div>
        <div class="notes-rule"><b>Before a vowel/h:</b> l' &nbsp;→&nbsp; l'ami, l'école</div>
        <div class="notes-rule"><b>All plurals:</b> les &nbsp;→&nbsp; les livres (the books)</div>
      </div>
      <div class="notes-section">
        <h4>2. Articles — Indefinite (A / An / Some)</h4>
        <table class="notes-table">
          <tr><th>Gender</th><th>Article</th><th>Example</th><th>Meaning</th></tr>
          <tr><td>Masculine</td><td><b>un</b></td><td>un stylo</td><td>a pen</td></tr>
          <tr><td>Feminine</td><td><b>une</b></td><td>une maison</td><td>a house</td></tr>
          <tr><td>Plural</td><td><b>des</b></td><td>des fleurs</td><td>some flowers</td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>3. Noun Gender — Key Rules</h4>
        <div class="notes-rule">Nouns ending in <b>-tion, -sion, -eur (abstract), -ie, -ette</b> are usually <b>feminine</b>.</div>
        <div class="notes-rule">Nouns ending in <b>-age, -ment, -eau, -isme</b> are usually <b>masculine</b>.</div>
        <div class="notes-rule">Most nouns ending in <b>-e</b> are feminine, but not all — learn exceptions.</div>
        <div class="notes-tip">💡 Tip: Always learn a noun with its article — never just the word alone!</div>
      </div>
      <div class="notes-section">
        <h4>4. Making Nouns Plural</h4>
        <table class="notes-table">
          <tr><th>Rule</th><th>Singular</th><th>Plural</th></tr>
          <tr><td>Most nouns → add <b>-s</b></td><td>le livre</td><td>les livre<b>s</b></td></tr>
          <tr><td>Ends in -s, -x, -z → no change</td><td>le bras</td><td>les bras</td></tr>
          <tr><td>Ends in -al → <b>-aux</b></td><td>le journal</td><td>les journ<b>aux</b></td></tr>
          <tr><td>Ends in -eau → add <b>-x</b></td><td>le gâteau</td><td>les gâteau<b>x</b></td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>5. Adjective Agreement</h4>
        <div class="notes-rule">Adjectives <b>agree</b> with the noun in gender and number.</div>
        <table class="notes-table">
          <tr><th></th><th>Masculine</th><th>Feminine</th></tr>
          <tr><td>Singular</td><td>petit</td><td>petit<b>e</b></td></tr>
          <tr><td>Plural</td><td>petit<b>s</b></td><td>petit<b>es</b></td></tr>
        </table>
        <div class="notes-tip">💡 Remember: adjectives usually come <b>after</b> the noun in French — un livre intéressant.</div>
      </div>
    `
  },

  'german-verbs': {
    tag: '📗 Notes — German',
    title: 'German Verb Conjugation — Present, Past & Future',
    print: true,
    html: `
      <div class="notes-section">
        <h4>1. Present Tense (Präsens) — Regular Verbs</h4>
        <div class="notes-rule">Take the verb stem (infinitive minus <b>-en</b>) and add endings below.</div>
        <table class="notes-table">
          <tr><th>Pronoun</th><th>Ending</th><th>spielen (to play)</th></tr>
          <tr><td>ich (I)</td><td>-e</td><td>ich spiel<b>e</b></td></tr>
          <tr><td>du (you)</td><td>-st</td><td>du spiel<b>st</b></td></tr>
          <tr><td>er/sie/es</td><td>-t</td><td>er spiel<b>t</b></td></tr>
          <tr><td>wir (we)</td><td>-en</td><td>wir spiel<b>en</b></td></tr>
          <tr><td>ihr (you pl.)</td><td>-t</td><td>ihr spiel<b>t</b></td></tr>
          <tr><td>sie/Sie</td><td>-en</td><td>sie spiel<b>en</b></td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>2. Irregular Verbs — sein (to be) & haben (to have)</h4>
        <table class="notes-table">
          <tr><th>Pronoun</th><th>sein</th><th>haben</th></tr>
          <tr><td>ich</td><td>bin</td><td>habe</td></tr>
          <tr><td>du</td><td>bist</td><td>hast</td></tr>
          <tr><td>er/sie/es</td><td>ist</td><td>hat</td></tr>
          <tr><td>wir</td><td>sind</td><td>haben</td></tr>
          <tr><td>ihr</td><td>seid</td><td>habt</td></tr>
          <tr><td>sie/Sie</td><td>sind</td><td>haben</td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>3. Simple Past (Perfekt) — Most Common in Speech</h4>
        <div class="notes-rule">Formula: <b>haben/sein</b> (conjugated) + past participle at the end.</div>
        <div class="notes-rule">Regular participle: <b>ge- + stem + -t</b> &nbsp;→&nbsp; gespielt, gemacht, gelernt</div>
        <div class="notes-rule">Irregular participle: <b>ge- + stem + -en</b> &nbsp;→&nbsp; geschrieben, gelesen, gegessen</div>
        <div class="notes-rule">Verbs of movement use <b>sein</b>: Ich bin gegangen. (I went.)</div>
        <div class="notes-tip">💡 Tip: Most verbs use <b>haben</b>. Only motion/change-of-state verbs use <b>sein</b>.</div>
      </div>
      <div class="notes-section">
        <h4>4. Future Tense (Futur I)</h4>
        <div class="notes-rule">Formula: <b>werden</b> (conjugated) + infinitive at the end.</div>
        <table class="notes-table">
          <tr><th>Pronoun</th><th>werden</th><th>Example</th></tr>
          <tr><td>ich</td><td>werde</td><td>Ich werde lernen. (I will study.)</td></tr>
          <tr><td>du</td><td>wirst</td><td>Du wirst kommen.</td></tr>
          <tr><td>er/sie/es</td><td>wird</td><td>Er wird spielen.</td></tr>
          <tr><td>wir</td><td>werden</td><td>Wir werden fahren.</td></tr>
        </table>
      </div>
    `
  },

  'sanskrit-dhatu': {
    tag: '📙 Notes — Sanskrit',
    title: 'Sanskrit Dhatu Roop — Key Verb Forms',
    print: true,
    html: `
      <div class="notes-section">
        <h4>1. What is Dhatu? (धातु)</h4>
        <div class="notes-rule">A <b>Dhatu</b> is the root form of a Sanskrit verb. All verb forms are derived from it.</div>
        <div class="notes-rule">Sanskrit has <b>3 Purusha</b> (persons) and <b>3 Vachana</b> (numbers).</div>
        <table class="notes-table">
          <tr><th>Purusha</th><th>Vachana →</th><th>Ekavachana (1)</th><th>Dvivachana (2)</th><th>Bahuvachana (many)</th></tr>
          <tr><td>Prathama (3rd)</td><td></td><td>he/she/it</td><td>those two</td><td>they</td></tr>
          <tr><td>Madhyama (2nd)</td><td></td><td>you (1)</td><td>you (2)</td><td>you (all)</td></tr>
          <tr><td>Uttama (1st)</td><td></td><td>I</td><td>we (2)</td><td>we (all)</td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>2. पठ् (path) — to read/study — Lat Lakar (Present Tense)</h4>
        <table class="notes-table">
          <tr><th>Purusha</th><th>Ekavachana</th><th>Dvivachana</th><th>Bahuvachana</th></tr>
          <tr><td>Prathama</td><td>पठति</td><td>पठतः</td><td>पठन्ति</td></tr>
          <tr><td>Madhyama</td><td>पठसि</td><td>पठथः</td><td>पठथ</td></tr>
          <tr><td>Uttama</td><td>पठामि</td><td>पठावः</td><td>पठामः</td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>3. गम् (gam) — to go — Lat Lakar (Present)</h4>
        <table class="notes-table">
          <tr><th>Purusha</th><th>Ekavachana</th><th>Dvivachana</th><th>Bahuvachana</th></tr>
          <tr><td>Prathama</td><td>गच्छति</td><td>गच्छतः</td><td>गच्छन्ति</td></tr>
          <tr><td>Madhyama</td><td>गच्छसि</td><td>गच्छथः</td><td>गच्छथ</td></tr>
          <tr><td>Uttama</td><td>गच्छामि</td><td>गच्छावः</td><td>गच्छामः</td></tr>
        </table>
      </div>
      <div class="notes-section">
        <h4>4. The 6 Most Important Lakars (Tenses/Moods)</h4>
        <table class="notes-table">
          <tr><th>Lakar</th><th>Sanskrit Name</th><th>Usage</th></tr>
          <tr><td><b>लट्</b></td><td>Lat</td><td>Present tense — "he reads"</td></tr>
          <tr><td><b>लिट्</b></td><td>Lit</td><td>Remote past — "he read (long ago)"</td></tr>
          <tr><td><b>लुट्</b></td><td>Lut</td><td>Future tense (1st) — "he will read"</td></tr>
          <tr><td><b>लृट्</b></td><td>Lrit</td><td>Future tense (2nd)</td></tr>
          <tr><td><b>लोट्</b></td><td>Lot</td><td>Imperative — command</td></tr>
          <tr><td><b>विधिलिङ्</b></td><td>Vidhiling</td><td>Should/ought to</td></tr>
        </table>
        <div class="notes-tip">💡 For CBSE Board: focus on <b>लट् (present)</b> and <b>लोट् (imperative)</b> — these are most frequently tested.</div>
      </div>
    `
  },

  'japanese-hiragana': {
    tag: '📕 Notes — Japanese',
    title: 'Japanese Hiragana — Complete Chart with Pronunciation',
    print: true,
    html: `
      <div class="notes-section">
        <h4>What is Hiragana?</h4>
        <div class="notes-rule">Hiragana is one of Japan's three scripts. It has <b>46 basic characters</b> and is used for native Japanese words, grammar particles, and verb endings.</div>
        <div class="notes-rule">The order follows a vowel pattern: <b>a・i・u・e・o</b> (あ・い・う・え・お)</div>
      </div>
      <div class="notes-section">
        <h4>Vowels (母音)</h4>
        <div class="hiragana-grid" style="grid-template-columns:repeat(5,1fr)">
          <div class="hira-cell"><div class="hira-char">あ</div><div class="hira-rom">a</div></div>
          <div class="hira-cell"><div class="hira-char">い</div><div class="hira-rom">i</div></div>
          <div class="hira-cell"><div class="hira-char">う</div><div class="hira-rom">u</div></div>
          <div class="hira-cell"><div class="hira-char">え</div><div class="hira-rom">e</div></div>
          <div class="hira-cell"><div class="hira-char">お</div><div class="hira-rom">o</div></div>
        </div>
      </div>
      <div class="notes-section">
        <h4>K-row · S-row · T-row</h4>
        <div class="hiragana-grid">
          <div class="hira-cell"><div class="hira-char">か</div><div class="hira-rom">ka</div></div>
          <div class="hira-cell"><div class="hira-char">き</div><div class="hira-rom">ki</div></div>
          <div class="hira-cell"><div class="hira-char">く</div><div class="hira-rom">ku</div></div>
          <div class="hira-cell"><div class="hira-char">け</div><div class="hira-rom">ke</div></div>
          <div class="hira-cell"><div class="hira-char">こ</div><div class="hira-rom">ko</div></div>
          <div class="hira-cell"><div class="hira-char">さ</div><div class="hira-rom">sa</div></div>
          <div class="hira-cell"><div class="hira-char">し</div><div class="hira-rom">shi</div></div>
          <div class="hira-cell"><div class="hira-char">す</div><div class="hira-rom">su</div></div>
          <div class="hira-cell"><div class="hira-char">せ</div><div class="hira-rom">se</div></div>
          <div class="hira-cell"><div class="hira-char">そ</div><div class="hira-rom">so</div></div>
          <div class="hira-cell"><div class="hira-char">た</div><div class="hira-rom">ta</div></div>
          <div class="hira-cell"><div class="hira-char">ち</div><div class="hira-rom">chi</div></div>
          <div class="hira-cell"><div class="hira-char">つ</div><div class="hira-rom">tsu</div></div>
          <div class="hira-cell"><div class="hira-char">て</div><div class="hira-rom">te</div></div>
          <div class="hira-cell"><div class="hira-char">と</div><div class="hira-rom">to</div></div>
        </div>
      </div>
      <div class="notes-section">
        <h4>N-row · H-row · M-row · Y-row · R-row · W-row</h4>
        <div class="hiragana-grid">
          <div class="hira-cell"><div class="hira-char">な</div><div class="hira-rom">na</div></div>
          <div class="hira-cell"><div class="hira-char">に</div><div class="hira-rom">ni</div></div>
          <div class="hira-cell"><div class="hira-char">ぬ</div><div class="hira-rom">nu</div></div>
          <div class="hira-cell"><div class="hira-char">ね</div><div class="hira-rom">ne</div></div>
          <div class="hira-cell"><div class="hira-char">の</div><div class="hira-rom">no</div></div>
          <div class="hira-cell"><div class="hira-char">は</div><div class="hira-rom">ha</div></div>
          <div class="hira-cell"><div class="hira-char">ひ</div><div class="hira-rom">hi</div></div>
          <div class="hira-cell"><div class="hira-char">ふ</div><div class="hira-rom">fu</div></div>
          <div class="hira-cell"><div class="hira-char">へ</div><div class="hira-rom">he</div></div>
          <div class="hira-cell"><div class="hira-char">ほ</div><div class="hira-rom">ho</div></div>
          <div class="hira-cell"><div class="hira-char">ま</div><div class="hira-rom">ma</div></div>
          <div class="hira-cell"><div class="hira-char">み</div><div class="hira-rom">mi</div></div>
          <div class="hira-cell"><div class="hira-char">む</div><div class="hira-rom">mu</div></div>
          <div class="hira-cell"><div class="hira-char">め</div><div class="hira-rom">me</div></div>
          <div class="hira-cell"><div class="hira-char">も</div><div class="hira-rom">mo</div></div>
          <div class="hira-cell"><div class="hira-char">や</div><div class="hira-rom">ya</div></div>
          <div class="hira-cell" style="background:#f8f8f8"></div>
          <div class="hira-cell"><div class="hira-char">ゆ</div><div class="hira-rom">yu</div></div>
          <div class="hira-cell" style="background:#f8f8f8"></div>
          <div class="hira-cell"><div class="hira-char">よ</div><div class="hira-rom">yo</div></div>
          <div class="hira-cell"><div class="hira-char">ら</div><div class="hira-rom">ra</div></div>
          <div class="hira-cell"><div class="hira-char">り</div><div class="hira-rom">ri</div></div>
          <div class="hira-cell"><div class="hira-char">る</div><div class="hira-rom">ru</div></div>
          <div class="hira-cell"><div class="hira-char">れ</div><div class="hira-rom">re</div></div>
          <div class="hira-cell"><div class="hira-char">ろ</div><div class="hira-rom">ro</div></div>
          <div class="hira-cell"><div class="hira-char">わ</div><div class="hira-rom">wa</div></div>
          <div class="hira-cell" style="background:#f8f8f8"></div>
          <div class="hira-cell" style="background:#f8f8f8"></div>
          <div class="hira-cell" style="background:#f8f8f8"></div>
          <div class="hira-cell"><div class="hira-char">を</div><div class="hira-rom">wo</div></div>
          <div class="hira-cell"><div class="hira-char">ん</div><div class="hira-rom">n</div></div>
        </div>
        <div class="notes-tip">💡 Practice writing each character 10 times. Use the stroke order shown in your textbook — it matters for neat handwriting!</div>
      </div>
    `
  }
};

const videoContent = {
  'french-pronunciation': {
    tag: '🎥 Videos — French',
    title: 'French Learning Videos — Free Platforms',
    html: `
      <div class="video-note">✅ All links below are 100% free. They open in a new tab.</div>
      <div class="video-list">
        <a class="video-card" href="https://diksha.gov.in" target="_blank">
          <div class="vc-thumb">🏛️</div>
          <div class="vc-info">
            <div class="vc-title">DIKSHA — CBSE Official Platform</div>
            <div class="vc-meta">Search "French Class 9" or "French Class 10" for CBSE-mapped videos</div>
          </div>
          <span class="vc-platform">NCERT / Govt</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/@MagnetBrainsOfficial" target="_blank">
          <div class="vc-thumb">🧲</div>
          <div class="vc-info">
            <div class="vc-title">Magnet Brains — French CBSE Playlist</div>
            <div class="vc-meta">Full Entre Jeunes IX & X chapter-wise video lectures</div>
          </div>
          <span class="vc-platform">YouTube</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/@cbsefrench" target="_blank">
          <div class="vc-thumb">🇫🇷</div>
          <div class="vc-info">
            <div class="vc-title">CBSE French — Dedicated Channel</div>
            <div class="vc-meta">Pronunciation, grammar rules, vocabulary for CBSE students</div>
          </div>
          <span class="vc-platform">YouTube</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/results?search_query=french+grammar+CBSE+class+9+10" target="_blank">
          <div class="vc-thumb">🔍</div>
          <div class="vc-info">
            <div class="vc-title">Search: "French CBSE Class 9 10" on YouTube</div>
            <div class="vc-meta">Hundreds of free videos — filter by upload date for latest</div>
          </div>
          <span class="vc-platform">YouTube Search</span>
        </a>
      </div>
    `
  },
  'german-cbse': {
    tag: '🎥 Videos — German',
    title: 'German CBSE Learning Videos — Free Platforms',
    html: `
      <div class="video-note">✅ All links below are free. They open in a new tab.</div>
      <div class="video-list">
        <a class="video-card" href="https://diksha.gov.in" target="_blank">
          <div class="vc-thumb">🏛️</div>
          <div class="vc-info">
            <div class="vc-title">DIKSHA — CBSE Official</div>
            <div class="vc-meta">Search "German Class 9" or "German Class 10"</div>
          </div>
          <span class="vc-platform">NCERT / Govt</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/results?search_query=CBSE+German+class+9+10+Beste+Freunde" target="_blank">
          <div class="vc-thumb">🇩🇪</div>
          <div class="vc-info">
            <div class="vc-title">Beste Freunde CBSE — YouTube Search</div>
            <div class="vc-meta">Chapter-wise lessons for Class 9 & 10 German (Beste Freunde textbook)</div>
          </div>
          <span class="vc-platform">YouTube</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/results?search_query=learn+german+A1+A2+beginners+free" target="_blank">
          <div class="vc-thumb">🎓</div>
          <div class="vc-info">
            <div class="vc-title">German A1–A2 Complete Course</div>
            <div class="vc-meta">Matches CBSE German level. Covers greetings, verbs, cases, tenses</div>
          </div>
          <span class="vc-platform">YouTube</span>
        </a>
        <a class="video-card" href="https://www.goethe.de/en/spr/ueb.html" target="_blank">
          <div class="vc-thumb">🏅</div>
          <div class="vc-info">
            <div class="vc-title">Goethe Institut — Free Practice</div>
            <div class="vc-meta">Official German language institute — free exercises and listening</div>
          </div>
          <span class="vc-platform">Goethe Institut</span>
        </a>
      </div>
    `
  },
  'sanskrit-full': {
    tag: '🎥 Videos — Sanskrit',
    title: 'Sanskrit CBSE Video Lectures — Free Platforms',
    html: `
      <div class="video-note">✅ All links are free. Opens in a new tab.</div>
      <div class="video-list">
        <a class="video-card" href="https://www.magnetbrains.com/course/class-6th-sanskrit-ruchira-book-ncert-full-video-course/" target="_blank">
          <div class="vc-thumb">🧲</div>
          <div class="vc-info">
            <div class="vc-title">Magnet Brains — Sanskrit Class 6 (Ruchira)</div>
            <div class="vc-meta">Full NCERT Ruchira Bhag 1 course — all 15 chapters, free</div>
          </div>
          <span class="vc-platform">Magnet Brains</span>
        </a>
        <a class="video-card" href="https://www.magnetbrains.com/course/class-7th-sanskrit-ruchira-book-ncert-full-video-course/" target="_blank">
          <div class="vc-thumb">🧲</div>
          <div class="vc-info">
            <div class="vc-title">Magnet Brains — Sanskrit Class 7 (Ruchira)</div>
            <div class="vc-meta">All 13 chapters of Ruchira Bhag 2 with Hindi explanations</div>
          </div>
          <span class="vc-platform">Magnet Brains</span>
        </a>
        <a class="video-card" href="https://www.magnetbrains.com/course/class-8th-sanskrit-ruchira-book-ncert-full-video-course-class-8th-sanskrit-ruchira-book-ncert-full-video-course/" target="_blank">
          <div class="vc-thumb">🧲</div>
          <div class="vc-info">
            <div class="vc-title">Magnet Brains — Sanskrit Class 8 (Ruchira)</div>
            <div class="vc-meta">Ruchira Bhag 3 — all chapters, explained in simple Hindi/English</div>
          </div>
          <span class="vc-platform">Magnet Brains</span>
        </a>
        <a class="video-card" href="https://www.tiwariacademy.com/ncert-solutions/class-9/sanskrit/" target="_blank">
          <div class="vc-thumb">📖</div>
          <div class="vc-info">
            <div class="vc-title">Tiwari Academy — Class 9 & 10 Sanskrit Solutions</div>
            <div class="vc-meta">Shemushi Bhag 1 & 2 — free written solutions + video links</div>
          </div>
          <span class="vc-platform">Tiwari Academy</span>
        </a>
        <a class="video-card" href="https://diksha.gov.in" target="_blank">
          <div class="vc-thumb">🏛️</div>
          <div class="vc-info">
            <div class="vc-title">DIKSHA — CBSE Official Platform</div>
            <div class="vc-meta">Search "Sanskrit Ruchira" or "Sanskrit Shemushi" for NCERT-mapped videos</div>
          </div>
          <span class="vc-platform">NCERT / Govt</span>
        </a>
      </div>
    `
  },
  'japanese-script': {
    tag: '🎥 Videos — Japanese',
    title: 'Japanese Script & CBSE Content — Free Platforms',
    html: `
      <div class="video-note">✅ All links are free. Opens in a new tab.</div>
      <div class="video-list">
        <a class="video-card" href="https://diksha.gov.in" target="_blank">
          <div class="vc-thumb">🏛️</div>
          <div class="vc-info">
            <div class="vc-title">DIKSHA — CBSE Official</div>
            <div class="vc-meta">Search "Japanese CBSE" for official CBSE-mapped content</div>
          </div>
          <span class="vc-platform">NCERT / Govt</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/results?search_query=hiragana+complete+chart+beginner" target="_blank">
          <div class="vc-thumb">🇯🇵</div>
          <div class="vc-info">
            <div class="vc-title">Hiragana Complete Chart — YouTube</div>
            <div class="vc-meta">Learn all 46 Hiragana with stroke order and pronunciation</div>
          </div>
          <span class="vc-platform">YouTube</span>
        </a>
        <a class="video-card" href="https://www.youtube.com/results?search_query=katakana+complete+beginner+learn" target="_blank">
          <div class="vc-thumb">📝</div>
          <div class="vc-info">
            <div class="vc-title">Katakana Full Course — YouTube</div>
            <div class="vc-meta">46 Katakana characters with mnemonics — easy to remember</div>
          </div>
          <span class="vc-platform">YouTube</span>
        </a>
        <a class="video-card" href="https://www.nhk.or.jp/lesson/english/" target="_blank">
          <div class="vc-thumb">📺</div>
          <div class="vc-info">
            <div class="vc-title">NHK World — Easy Japanese</div>
            <div class="vc-meta">Free Japanese lessons by Japan's national broadcaster — beginner friendly</div>
          </div>
          <span class="vc-platform">NHK Official</span>
        </a>
      </div>
    `
  }
};

const worksheetContent = {
  'french-6': {
    tag: '📄 Worksheet — French Class 6',
    title: 'Class 6 French — Worksheet (Printable)',
    print: true,
    html: `
      <div class="ws-header">
        <h3>LinguaLearn — French Worksheet | Class 6</h3>
        <p>Bonjour La France | Topics: Greetings, Articles, Numbers, Family</p>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">A. Fill in the Blanks</div>
        <div class="ws-q"><span class="q-num">1.</span> The French word for "Hello" is <span class="ws-blank"></span>.</div>
        <div class="ws-q"><span class="q-num">2.</span> "Le" is used before <span class="ws-blank"></span> (masculine / feminine) nouns.</div>
        <div class="ws-q"><span class="q-num">3.</span> The number 12 in French is <span class="ws-blank"></span>.</div>
        <div class="ws-q"><span class="q-num">4.</span> "Ma mère" means <span class="ws-blank"></span> in English.</div>
        <div class="ws-q"><span class="q-num">5.</span> The capital of France is <span class="ws-blank"></span>.</div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">B. Match the Column</div>
        <table class="notes-table">
          <tr><th>French</th><th>English</th></tr>
          <tr><td>Merci</td><td>Good morning</td></tr>
          <tr><td>Bonjour</td><td>Thank you</td></tr>
          <tr><td>Au revoir</td><td>Please</td></tr>
          <tr><td>S'il vous plaît</td><td>Goodbye</td></tr>
          <tr><td>Bonsoir</td><td>Good evening</td></tr>
        </table>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">C. Choose the Correct Article</div>
        <div class="ws-q"><span class="q-num">1.</span> _____ livre (book — masculine)
          <div class="ws-opts">
            <span class="ws-opt">(a) la</span><span class="ws-opt">(b) le</span><span class="ws-opt">(c) les</span>
          </div>
        </div>
        <div class="ws-q"><span class="q-num">2.</span> _____ école (school — feminine, starts with vowel)
          <div class="ws-opts">
            <span class="ws-opt">(a) le</span><span class="ws-opt">(b) la</span><span class="ws-opt">(c) l'</span>
          </div>
        </div>
        <div class="ws-q"><span class="q-num">3.</span> _____ maisons (houses — plural)
          <div class="ws-opts">
            <span class="ws-opt">(a) les</span><span class="ws-opt">(b) la</span><span class="ws-opt">(c) le</span>
          </div>
        </div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">D. Write in French (2 marks each)</div>
        <div class="ws-q"><span class="q-num">1.</span> My name is Priya. → <textarea class="ws-answer-box"></textarea></div>
        <div class="ws-q"><span class="q-num">2.</span> I am 14 years old. → <textarea class="ws-answer-box"></textarea></div>
        <div class="ws-q"><span class="q-num">3.</span> I have one brother and one sister. → <textarea class="ws-answer-box"></textarea></div>
      </div>
    `
  },
  'sanskrit-9': {
    tag: '📄 Worksheet — Sanskrit Class 9',
    title: 'Class 9 Sanskrit — Shemushi Bhag 1 (Ch. 1–6)',
    print: true,
    html: `
      <div class="ws-header">
        <h3>LinguaLearn — Sanskrit Worksheet | Class 9</h3>
        <p>Shemushi Bhag 1 | Chapters 1–6 | Grammar + Translation</p>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">A. एकपदेन उत्तरत (Answer in one word)</div>
        <div class="ws-q"><span class="q-num">1.</span> भारतीवसन्तगीतिः पाठे कः ऋतुः वर्णितः? (Which season is described in Ch. 1?)</div>
        <div class="ws-q"><span class="q-num">2.</span> स्वर्णकाकः कथायां काकः कीदृशः आसीत्? (What colour was the crow in Ch. 2?)</div>
        <div class="ws-q"><span class="q-num">3.</span> "गच्छति" इति क्रियापदस्य धातुः कः? (What is the root of गच्छति?)</div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">B. शुद्धं वाक्यं चिनुत (Choose the correct sentence)</div>
        <div class="ws-q"><span class="q-num">1.</span> Present tense of पठ् (3rd person singular) is:
          <div class="ws-opts">
            <span class="ws-opt">(a) पठति</span>
            <span class="ws-opt">(b) पठसि</span>
            <span class="ws-opt">(c) पठामि</span>
          </div>
        </div>
        <div class="ws-q"><span class="q-num">2.</span> "We two go" in Sanskrit (गम् — Lat Lakar, Uttama, Dvivachana):
          <div class="ws-opts">
            <span class="ws-opt">(a) गच्छाम:</span>
            <span class="ws-opt">(b) गच्छावः</span>
            <span class="ws-opt">(c) गच्छामि</span>
          </div>
        </div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">C. अनुवादं कुरुत (Translate into Sanskrit)</div>
        <div class="ws-q"><span class="q-num">1.</span> The children play. → <textarea class="ws-answer-box"></textarea></div>
        <div class="ws-q"><span class="q-num">2.</span> The teacher reads the book. → <textarea class="ws-answer-box"></textarea></div>
        <div class="ws-q"><span class="q-num">3.</span> We go to school. → <textarea class="ws-answer-box"></textarea></div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">D. समासविग्रहं कुरुत (Identify the compound)</div>
        <div class="ws-q"><span class="q-num">1.</span> पर्यावरणम् = परि + <span class="ws-blank"></span></div>
        <div class="ws-q"><span class="q-num">2.</span> Write a sentence using the word <b>भारतम्</b>: <textarea class="ws-answer-box"></textarea></div>
      </div>
    `
  },
  'french-10': {
    tag: '📄 Worksheet — French Class 10',
    title: 'Class 10 French — Entre Jeunes X (Chapter-wise Practice)',
    print: true,
    html: `
      <div class="ws-header">
        <h3>LinguaLearn — French Worksheet | Class 10</h3>
        <p>Entre Jeunes X | Chapters 1–6 | MCQs + Writing</p>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">A. Reading Comprehension — MCQ (1 mark each)</div>
        <div class="ws-q"><span class="q-num">1.</span> "Après le bac" (Ch. 2) — "Le bac" refers to:
          <div class="ws-opts">
            <span class="ws-opt">(a) A French exam</span>
            <span class="ws-opt">(b) A type of food</span>
            <span class="ws-opt">(c) A city in France</span>
          </div>
        </div>
        <div class="ws-q"><span class="q-num">2.</span> "Les médias" (Ch. 5) — Which of these is NOT a media type in French?
          <div class="ws-opts">
            <span class="ws-opt">(a) la télévision</span>
            <span class="ws-opt">(b) la radio</span>
            <span class="ws-opt">(c) la montagne</span>
          </div>
        </div>
        <div class="ws-q"><span class="q-num">3.</span> "En pleine forme" (Ch. 7) means:
          <div class="ws-opts">
            <span class="ws-opt">(a) In a small room</span>
            <span class="ws-opt">(b) In great shape / fit</span>
            <span class="ws-opt">(c) In the countryside</span>
          </div>
        </div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">B. Grammar — Fill in Correct Verb Form</div>
        <div class="ws-q"><span class="q-num">1.</span> Elle _____ (lire) un livre chaque soir. (She reads a book every evening.)</div>
        <div class="ws-q"><span class="q-num">2.</span> Nous _____ (chercher) du travail. (We are looking for work.)</div>
        <div class="ws-q"><span class="q-num">3.</span> Ils _____ (aller) à Paris l'année prochaine. (They will go to Paris next year.)</div>
      </div>
      <div class="ws-section">
        <div class="ws-section-title">C. Writing Practice (5 marks)</div>
        <div class="ws-q"><span class="q-num">1.</span> Write 5–6 sentences about your favourite media (Ch. 5 — Les médias):<textarea class="ws-answer-box" style="height:100px"></textarea></div>
        <div class="ws-q"><span class="q-num">2.</span> Describe your future career plans in French (Ch. 3 — Chercher du travail):<textarea class="ws-answer-box" style="height:100px"></textarea></div>
      </div>
    `
  },
  'vocab-multi': {
    tag: '📄 Worksheet — Vocabulary',
    title: 'Multi-Language Vocabulary Sheet (FR / DE / ES / JA)',
    print: true,
    html: `
      <div class="ws-header">
        <h3>LinguaLearn — Multi-Language Vocabulary Reference</h3>
        <p>French · German · Spanish · Japanese | Common CBSE Topics</p>
      </div>
      <table class="notes-table">
        <tr><th>English</th><th>🇫🇷 French</th><th>🇩🇪 German</th><th>🇪🇸 Spanish</th><th>🇯🇵 Japanese</th></tr>
        <tr><td><b>Hello</b></td><td>Bonjour</td><td>Hallo</td><td>Hola</td><td>こんにちは</td></tr>
        <tr><td><b>Goodbye</b></td><td>Au revoir</td><td>Auf Wiedersehen</td><td>Adiós</td><td>さようなら</td></tr>
        <tr><td><b>Thank you</b></td><td>Merci</td><td>Danke</td><td>Gracias</td><td>ありがとう</td></tr>
        <tr><td><b>Please</b></td><td>S'il vous plaît</td><td>Bitte</td><td>Por favor</td><td>おねがい</td></tr>
        <tr><td><b>Yes / No</b></td><td>Oui / Non</td><td>Ja / Nein</td><td>Sí / No</td><td>はい / いいえ</td></tr>
        <tr><td><b>Water</b></td><td>Eau</td><td>Wasser</td><td>Agua</td><td>みず (水)</td></tr>
        <tr><td><b>Food</b></td><td>Nourriture</td><td>Essen</td><td>Comida</td><td>たべもの (食べ物)</td></tr>
        <tr><td><b>School</b></td><td>École</td><td>Schule</td><td>Escuela</td><td>がっこう (学校)</td></tr>
        <tr><td><b>Book</b></td><td>Livre</td><td>Buch</td><td>Libro</td><td>ほん (本)</td></tr>
        <tr><td><b>Teacher</b></td><td>Professeur</td><td>Lehrer/in</td><td>Profesor/a</td><td>せんせい (先生)</td></tr>
        <tr><td><b>Mother</b></td><td>Mère</td><td>Mutter</td><td>Madre</td><td>おかあさん</td></tr>
        <tr><td><b>Father</b></td><td>Père</td><td>Vater</td><td>Padre</td><td>おとうさん</td></tr>
        <tr><td><b>Friend</b></td><td>Ami/Amie</td><td>Freund/in</td><td>Amigo/a</td><td>ともだち (友達)</td></tr>
        <tr><td><b>I love you</b></td><td>Je t'aime</td><td>Ich liebe dich</td><td>Te quiero</td><td>あいしてる</td></tr>
        <tr><td><b>Beautiful</b></td><td>Beau/Belle</td><td>Schön</td><td>Hermoso/a</td><td>うつくしい</td></tr>
        <tr><td><b>India</b></td><td>L'Inde</td><td>Indien</td><td>India</td><td>インド</td></tr>
      </table>
      <div class="notes-tip" style="margin-top:1rem">💡 Print this sheet and stick it near your study table for quick revision!</div>
    `
  }
};

// ===== OPEN / CLOSE CONTENT MODAL =====
function openNotes(key) {
  const data = notesContent[key];
  if (!data) return;
  addXP(15, 'notes');
  awardBadge('notes');
  updateDashNotesViewed();
  showContentModal(data);
}

function openVideo(key) {
  const data = videoContent[key];
  if (!data) return;
  showContentModal(data);
}

function openWorksheet(key) {
  const data = worksheetContent[key];
  if (!data) return;
  addXP(20, 'worksheet');
  showContentModal(data);
}

function showContentModal(data) {
  document.getElementById('cmTag').textContent = data.tag || '';
  document.getElementById('cmTitle').textContent = data.title || '';
  document.getElementById('cmBody').innerHTML = data.html || '';
  const printBtn = document.getElementById('cmPrintBtn');
  printBtn.style.display = data.print ? 'inline-block' : 'none';
  document.getElementById('contentModalOverlay').classList.add('open');
}

function closeContentModal() {
  document.getElementById('contentModalOverlay').classList.remove('open');
}

function printContent() {
  awardBadge('worksheet');
  window.print();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeContentModal(); closeBadgesModal(); closeSearch(); }
});

// ===== NAVBAR MOBILE TOGGLE =====
function toggleNav() {
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';
  links.style.display = isOpen ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '68px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = 'rgba(255,255,255,0.97)';
  links.style.padding = '1rem 2rem 1.5rem';
  links.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
  links.style.backdropFilter = 'blur(20px)';
  links.style.zIndex = '99';
  links.style.gap = '0.25rem';
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== RESOURCE TABS =====
function switchTab(btn, tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ===== VOCABULARY ACCORDION =====
function toggleVocab(el) {
  const body = el.querySelector('.vt-body');
  const arrow = el.querySelector('span');
  body.classList.toggle('open');
  arrow.textContent = body.classList.contains('open') ? '▴' : '▾';
}

// ===== GRADE MODAL =====
const gradeData = {
  6: {
    topics: ['Greetings & Introductions', 'Numbers 1–100', 'Colors & Shapes', 'Days of the Week', 'Basic Phrases'],
    resources: [
      { icon: '📘', label: 'Class 6 Notes PDF' },
      { icon: '📄', label: 'Class 6 Worksheet Set' },
      { icon: '🎥', label: 'Video: Beginner\'s Guide' },
      { icon: '🧩', label: 'Fun Vocabulary Quiz' },
    ]
  },
  7: {
    topics: ['Family & Relationships', 'Food & Meals', 'School Vocabulary', 'Describing People', 'Simple Sentences'],
    resources: [
      { icon: '📘', label: 'Class 7 Notes PDF' },
      { icon: '📄', label: 'Class 7 Grammar Exercises' },
      { icon: '🎥', label: 'Video: Sentence Building' },
      { icon: '🧩', label: 'Family Tree Activity' },
    ]
  },
  8: {
    topics: ['Tenses (Present, Past)', 'Travel & Places', 'Weather & Seasons', 'Reading Passages', 'Letter Writing'],
    resources: [
      { icon: '📘', label: 'Class 8 Grammar Notes' },
      { icon: '📄', label: 'Class 8 Comprehension Sheets' },
      { icon: '🎥', label: 'Video: Tense Master Class' },
      { icon: '📝', label: 'Letter Writing Templates' },
    ]
  },
  9: {
    topics: ['Future Tense', 'Literature Extracts', 'Advanced Grammar', 'Essay Writing', 'Dialogue Composition'],
    resources: [
      { icon: '📘', label: 'Class 9 Study Notes' },
      { icon: '📄', label: 'Class 9 Sample Papers' },
      { icon: '🎥', label: 'Video: Essay Techniques' },
      { icon: '📝', label: 'Previous Year Questions' },
    ]
  },
  10: {
    topics: ['Board Exam Format', 'Comprehension Passages', 'Formal Writing', 'Oral Practice', 'Revision Sets'],
    resources: [
      { icon: '📘', label: 'Class 10 Complete Notes' },
      { icon: '📄', label: 'Board Paper 2023 & 2024' },
      { icon: '🎥', label: 'Video: Board Prep Strategy' },
      { icon: '📊', label: 'Marking Scheme Breakdown' },
    ]
  }
};

function handleGradeResource(grade, resource) {
  closeModal();
  const label = resource.label.toLowerCase();
  if (label.includes('notes') || label.includes('study')) {
    document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => switchTab(document.querySelector('.tab[onclick*="notes"]'), 'notes'), 400);
  } else if (label.includes('worksheet') || label.includes('exercise') || label.includes('comprehension') || label.includes('sample paper') || label.includes('board paper') || label.includes('previous year') || label.includes('template') || label.includes('marking scheme')) {
    document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => switchTab(document.querySelector('.tab[onclick*="worksheets"]'), 'worksheets'), 400);
  } else if (label.includes('video')) {
    document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => switchTab(document.querySelector('.tab[onclick*="videos"]'), 'videos'), 400);
  } else if (label.includes('quiz') || label.includes('activity')) {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  } else {
    document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
  }
}

function showGradeModal(grade) {
  const data = gradeData[grade];
  const colors = { 6: '#4361ee', 7: '#f72585', 8: '#7209b7', 9: '#e85d04', 10: '#06d6a0' };
  const gradients = {
    6: 'linear-gradient(135deg,#4361ee,#7209b7)',
    7: 'linear-gradient(135deg,#f72585,#7209b7)',
    8: 'linear-gradient(135deg,#7209b7,#3a0ca3)',
    9: 'linear-gradient(135deg,#e85d04,#f72585)',
    10: 'linear-gradient(135deg,#06d6a0,#0ea5e9)',
  };
  const html = `
    <div class="modal-grade-banner" style="background:${gradients[grade]}">
      <div class="modal-grade">${grade}</div>
      <h3>Class ${grade} — Resources</h3>
    </div>
    <div class="modal-chips">
      ${data.topics.map(t => `<span class="chip">${t}</span>`).join('')}
    </div>
    <div class="modal-links-title">Available Resources</div>
    <div class="modal-links">
      ${data.resources.map((r, i) => `
        <div class="modal-link" onclick="handleGradeResource(${grade}, gradeData[${grade}].resources[${i}])">
          <span>${r.icon}</span>
          <span>${r.label}</span>
          <span class="ml-arrow">→</span>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
}

function selectLanguage(lang) {
  document.getElementById('grades').scrollIntoView({ behavior: 'smooth' });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// Close modal on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== QUIZ =====
const questions = [
  { q: 'What is "Hello" in French?', opts: ['Bonjour', 'Hola', 'Ciao', 'Namaste'], ans: 0 },
  { q: 'What is "Water" in German?', opts: ['Agua', 'Wasser', "L'eau", 'Mizu'], ans: 1 },
  { q: '"Madre" means Mother in which language?', opts: ['French', 'German', 'Spanish', 'Japanese'], ans: 2 },
  { q: 'What does "Livre" mean in French?', opts: ['River', 'Book', 'Love', 'Life'], ans: 1 },
  { q: 'Which script does Japanese use for foreign words?', opts: ['Hiragana', 'Kanji', 'Katakana', 'Romaji'], ans: 2 },
  { q: '"Brot" means Bread in which language?', opts: ['Spanish', 'Russian', 'French', 'German'], ans: 3 },
  { q: 'What is "Teacher" in Spanish?', opts: ['Professeur', 'Lehrer', 'Profesor', 'Sensei'], ans: 2 },
  { q: 'How many people speak Mandarin Chinese?', opts: ['500 million', '800 million', '1 billion+', '300 million'], ans: 2 },
  { q: 'Sanskrit is the classical language of which country?', opts: ['Nepal', 'India', 'Sri Lanka', 'Bangladesh'], ans: 1 },
  { q: '"Milch" means Milk in which language?', opts: ['Spanish', 'French', 'Korean', 'German'], ans: 3 },
];

const letters = ['A', 'B', 'C', 'D'];
let currentQ = 0;
let score = 0;
let answered = false;
const shuffled = [...questions].sort(() => Math.random() - 0.5);

function updateProgress() {
  const pct = ((currentQ) / shuffled.length) * 100;
  document.getElementById('progressFill').style.width = Math.max(pct, 6) + '%';
  document.getElementById('quizNumber').textContent = `Question ${currentQ + 1} of ${shuffled.length}`;
}

function renderQuestion() {
  const q = shuffled[currentQ % shuffled.length];
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('nextBtn').style.display = 'none';
  answered = false;
  updateProgress();

  const optsEl = document.getElementById('quizOptions');
  optsEl.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.setAttribute('data-letter', letters[i]);
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, q.ans);
    optsEl.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (answered) return;
  answered = true;
  const opts = document.querySelectorAll('.quiz-opt');
  opts[correct].classList.add('correct');
  const feedback = document.getElementById('quizFeedback');
  document.getElementById('total').textContent = parseInt(document.getElementById('total').textContent) + 1;

  awardBadge('quiz'); // first quiz badge

  if (selected === correct) {
    feedback.textContent = '🎉 Correct! Great job! +10 XP';
    feedback.style.color = '#059669';
    score++;
    document.getElementById('score').textContent = score;
    addXP(10, 'correct');
  } else {
    opts[selected].classList.add('wrong');
    feedback.textContent = '❌ Not quite! The correct answer is highlighted green. +5 XP';
    feedback.style.color = '#dc2626';
    addXP(5, 'participation');
  }

  // disable all options
  opts.forEach(o => { o.style.cursor = 'default'; o.onclick = null; });
  document.getElementById('nextBtn').style.display = 'flex';
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= shuffled.length) {
    // check score badges
    if (score >= 5) awardBadge('score5');
    if (score >= 10) awardBadge('score10');
    // save best score
    const prevBest = parseInt(localStorage.getItem('ll_quizBest') || '0');
    if (score > prevBest) {
      localStorage.setItem('ll_quizBest', score);
      updateDashboard();
    }
    // all done
    document.getElementById('quizQuestion').textContent = '🏆 Quiz Complete!';
    document.getElementById('quizOptions').innerHTML = `
      <div style="text-align:center;padding:1rem">
        <div style="font-size:3rem;margin-bottom:0.5rem">${score >= 8 ? '🥇' : score >= 5 ? '🥈' : '🥉'}</div>
        <div style="font-size:1.4rem;font-weight:900;color:#5b5ef4">You scored ${score}/${shuffled.length}</div>
        <div style="color:#64748b;margin-top:0.5rem">${score >= 8 ? 'Outstanding! You\'re a language genius!' : score >= 5 ? 'Good work! Keep practising!' : 'Keep going — every expert was once a beginner!'}</div>
      </div>`;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('nextBtn').textContent = '🔄 Play Again';
    document.getElementById('nextBtn').style.display = 'flex';
    document.getElementById('nextBtn').onclick = restartQuiz;
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('quizNumber').textContent = `Completed! 🎓`;
    return;
  }
  renderQuestion();
}

function restartQuiz() {
  currentQ = 0; score = 0;
  document.getElementById('score').textContent = 0;
  document.getElementById('total').textContent = 0;
  shuffled.sort(() => Math.random() - 0.5);
  document.getElementById('nextBtn').textContent = 'Next Question →';
  document.getElementById('nextBtn').onclick = nextQuestion;
  renderQuestion();
}

// Init quiz
renderQuestion();

// ================================================================
// FEATURE 1 — DARK MODE
// ================================================================
function toggleDarkMode() {
  const body = document.body;
  const btn = document.getElementById('darkToggle');
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  btn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('ll_darkMode', isDark ? '1' : '0');
}

(function initDarkMode() {
  const saved = localStorage.getItem('ll_darkMode');
  if (saved === '1') {
    document.body.classList.add('dark');
    const btn = document.getElementById('darkToggle');
    if (btn) btn.textContent = '☀️';
  }
})();

// ================================================================
// FEATURE 2 — SEARCH OVERLAY
// ================================================================
const searchIndex = [
  { icon: '🇫🇷', title: 'French', sub: 'Language — Most Popular', href: '#languages' },
  { icon: '🇩🇪', title: 'German', sub: 'Language — High Value', href: '#languages' },
  { icon: '🇯🇵', title: 'Japanese', sub: 'Language — Newly Added', href: '#languages' },
  { icon: '🇪🇸', title: 'Spanish', sub: 'Language — 500M+ Speakers', href: '#languages' },
  { icon: '🕉️', title: 'Sanskrit', sub: 'Language — High Scoring', href: '#languages' },
  { icon: '🇰🇷', title: 'Korean', sub: 'Language — Newly Added', href: '#languages' },
  { icon: '📘', title: 'French Grammar Basics', sub: 'Notes — Class 6–7 | Articles, Gender', action: () => openNotes('french-grammar') },
  { icon: '📗', title: 'German Verb Conjugation', sub: 'Notes — Class 8–9 | Present, Past, Future', action: () => openNotes('german-verbs') },
  { icon: '📙', title: 'Sanskrit Dhatu Roop', sub: 'Notes — Class 8–10 | Lakar Forms', action: () => openNotes('sanskrit-dhatu') },
  { icon: '📕', title: 'Japanese Hiragana Chart', sub: 'Notes — Class 6 | Full Script', action: () => openNotes('japanese-hiragana') },
  { icon: '📄', title: 'Class 6 French Worksheet', sub: 'Worksheet — Fill-in-blanks, MCQs', action: () => openWorksheet('french-6') },
  { icon: '📄', title: 'Class 9 Sanskrit Worksheet', sub: 'Worksheet — Shemushi Ch.1–6', action: () => openWorksheet('sanskrit-9') },
  { icon: '📄', title: 'Class 10 French Worksheet', sub: 'Worksheet — Entre Jeunes X', action: () => openWorksheet('french-10') },
  { icon: '📄', title: 'Multi-Language Vocab Sheet', sub: 'Worksheet — FR/DE/ES/JA', action: () => openWorksheet('vocab-multi') },
  { icon: '🏠', title: 'Père / Vater / Padre', sub: 'Vocabulary — Father in French, German, Spanish', href: '#resources' },
  { icon: '🏠', title: 'Mère / Mutter / Madre', sub: 'Vocabulary — Mother in French, German, Spanish', href: '#resources' },
  { icon: '🍎', title: 'Eau / Wasser / Agua', sub: 'Vocabulary — Water in French, German, Spanish', href: '#resources' },
  { icon: '🍎', title: 'Pain / Brot / Pan', sub: 'Vocabulary — Bread in French, German, Spanish', href: '#resources' },
  { icon: '🏫', title: 'Livre / Buch / Libro', sub: 'Vocabulary — Book in French, German, Spanish', href: '#resources' },
  { icon: '🏫', title: 'Professeur / Lehrer / Profesor', sub: 'Vocabulary — Teacher in French, German, Spanish', href: '#resources' },
  { icon: '🃏', title: 'Flashcards', sub: 'Practice vocabulary with flip cards', href: '#flashcards' },
  { icon: '📊', title: 'Dashboard', sub: 'Your XP, streak, badges & progress', href: '#dashboard' },
  { icon: '🧩', title: 'Quick Quiz', sub: 'Test your vocabulary knowledge', href: '#quiz' },
  { icon: '📚', title: 'Class 6 Resources', sub: 'Grades — Basics, Greetings, Numbers', action: () => showGradeModal(6) },
  { icon: '📚', title: 'Class 7 Resources', sub: 'Grades — Family, Food, Days', action: () => showGradeModal(7) },
  { icon: '📚', title: 'Class 8 Resources', sub: 'Grades — Grammar, Tenses', action: () => showGradeModal(8) },
  { icon: '📚', title: 'Class 9 Resources', sub: 'Grades — Writing, Literature', action: () => showGradeModal(9) },
  { icon: '📚', title: 'Class 10 Resources', sub: 'Grades — Board Prep, Essays', action: () => showGradeModal(10) },
];

function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 80);
  runSearch();
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('searchInput').value = '';
}

function runSearch() {
  const q = (document.getElementById('searchInput').value || '').toLowerCase().trim();
  const container = document.getElementById('searchResults');
  if (!q) {
    container.innerHTML = '<div class="search-empty">Start typing to search languages, notes, vocabulary...</div>';
    return;
  }
  const results = searchIndex.filter(item =>
    item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
  );
  if (!results.length) {
    container.innerHTML = '<div class="search-empty">No results found. Try "French", "vocab", or "quiz".</div>';
    return;
  }
  container.innerHTML = results.slice(0, 12).map(r => `
    <div class="search-result-card" onclick="handleSearchClick(${searchIndex.indexOf(r)})">
      <div class="src-icon">${r.icon}</div>
      <div>
        <div class="src-title">${r.title}</div>
        <div class="src-sub">${r.sub}</div>
      </div>
    </div>
  `).join('');
}

function handleSearchClick(idx) {
  const item = searchIndex[idx];
  closeSearch();
  if (item.action) {
    setTimeout(item.action, 150);
  } else if (item.href) {
    window.location.hash = item.href;
  }
}

// Close search on overlay click (already handled by onclick in HTML overlay)
document.getElementById('searchOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeSearch();
});

// ================================================================
// FEATURE 3 — STREAK COUNTER
// ================================================================
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const lastVisit = localStorage.getItem('ll_lastVisit') || '';
  let streak = parseInt(localStorage.getItem('ll_streak') || '0');

  if (!lastVisit) {
    // First visit ever
    streak = 1;
  } else if (lastVisit === today) {
    // Already visited today, keep streak
  } else {
    const last = new Date(lastVisit);
    const now = new Date(today);
    const diff = Math.round((now - last) / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      streak += 1;
    } else {
      streak = 1;
    }
  }

  localStorage.setItem('ll_lastVisit', today);
  localStorage.setItem('ll_streak', streak);

  // Update UI
  const fwStreak = document.getElementById('fwStreak');
  if (fwStreak) fwStreak.textContent = streak;

  // Check streak badges
  if (streak >= 5) awardBadge('streak5');

  return streak;
}

// ================================================================
// FEATURE 4 — XP SYSTEM
// ================================================================
const XP_LEVELS = [
  { min: 0,    max: 100,  label: 'Beginner' },
  { min: 100,  max: 300,  label: 'Learner' },
  { min: 300,  max: 600,  label: 'Explorer' },
  { min: 600,  max: 1000, label: 'Scholar' },
  { min: 1000, max: Infinity, label: 'Master' },
];

function getLevel(xp) {
  return XP_LEVELS.find(l => xp >= l.min && xp < l.max) || XP_LEVELS[XP_LEVELS.length - 1];
}

function addXP(amount, reason) {
  let xp = parseInt(localStorage.getItem('ll_xp') || '0');
  xp += amount;
  localStorage.setItem('ll_xp', xp);
  updateXPDisplay();
  updateDashboard();
}

function updateXPDisplay() {
  const xp = parseInt(localStorage.getItem('ll_xp') || '0');
  const fwXP = document.getElementById('fwXP');
  if (fwXP) fwXP.textContent = xp + ' XP';
}

// ================================================================
// FEATURE 5 — BADGES
// ================================================================
const BADGES_DEF = [
  { id: 'firstLogin',  emoji: '🎉', name: 'First Login',      desc: 'Welcome to LinguaLearn!' },
  { id: 'quiz',        emoji: '🧩', name: 'First Quiz',       desc: 'Answered your first question' },
  { id: 'streak5',     emoji: '🔥', name: '5-Day Streak',     desc: 'Visited 5 days in a row!' },
  { id: 'score5',      emoji: '⭐', name: 'Score 5/10',       desc: 'Scored 5 or more in quiz' },
  { id: 'score10',     emoji: '🏆', name: 'Score 10/10',      desc: 'Perfect quiz score!' },
  { id: 'notes',       emoji: '📘', name: 'Note Reader',      desc: 'Opened study notes' },
  { id: 'worksheet',   emoji: '🖨️', name: 'Worksheet Pro',   desc: 'Opened a worksheet' },
];

function awardBadge(id) {
  const earned = JSON.parse(localStorage.getItem('ll_badges') || '[]');
  if (!earned.includes(id)) {
    earned.push(id);
    localStorage.setItem('ll_badges', JSON.stringify(earned));
    updateDashboard();
  }
}

function openBadgesModal() {
  const earned = JSON.parse(localStorage.getItem('ll_badges') || '[]');
  const grid = document.getElementById('badgesGrid');
  grid.innerHTML = BADGES_DEF.map(b => `
    <div class="badge-item ${earned.includes(b.id) ? 'unlocked' : 'locked'}" title="${b.desc}">
      <span class="badge-emoji">${b.emoji}</span>
      <div class="badge-name">${b.name}</div>
    </div>
  `).join('');
  document.getElementById('badgesModalOverlay').classList.add('open');
}

function closeBadgesModal() {
  document.getElementById('badgesModalOverlay').classList.remove('open');
}

// ================================================================
// FEATURE 7 — DASHBOARD
// ================================================================
function updateDashNotesViewed() {
  let viewed = parseInt(localStorage.getItem('ll_notesViewed') || '0');
  viewed++;
  localStorage.setItem('ll_notesViewed', viewed);
  updateDashboard();
}

function updateDashboard() {
  const xp = parseInt(localStorage.getItem('ll_xp') || '0');
  const streak = parseInt(localStorage.getItem('ll_streak') || '0');
  const badges = JSON.parse(localStorage.getItem('ll_badges') || '[]');
  const quizBest = localStorage.getItem('ll_quizBest') || '-';
  const notesViewed = parseInt(localStorage.getItem('ll_notesViewed') || '0');
  const level = getLevel(xp);
  const nextLevel = XP_LEVELS.find(l => l.min > xp) || { min: xp };

  const dashXP = document.getElementById('dashXP');
  const dashLevel = document.getElementById('dashLevel');
  const dashStreak = document.getElementById('dashStreak');
  const dashBadges = document.getElementById('dashBadges');
  const dashQuizBest = document.getElementById('dashQuizBest');
  const dashNotesViewed = document.getElementById('dashNotesViewed');
  const xpBarFill = document.getElementById('xpBarFill');
  const xpBarCur = document.getElementById('xpBarCur');
  const xpBarNext = document.getElementById('xpBarNext');
  const fwXP = document.getElementById('fwXP');
  const fwStreak = document.getElementById('fwStreak');

  if (dashXP) dashXP.textContent = xp;
  if (dashLevel) dashLevel.textContent = level.label;
  if (dashStreak) dashStreak.textContent = streak;
  if (dashBadges) dashBadges.textContent = badges.length;
  if (dashQuizBest) dashQuizBest.textContent = quizBest;
  if (dashNotesViewed) dashNotesViewed.textContent = notesViewed;
  if (fwXP) fwXP.textContent = xp + ' XP';
  if (fwStreak) fwStreak.textContent = streak;

  // XP bar
  if (xpBarFill && level.max !== Infinity) {
    const range = level.max - level.min;
    const progress = xp - level.min;
    const pct = Math.min(100, Math.round((progress / range) * 100));
    xpBarFill.style.width = pct + '%';
    if (xpBarCur) xpBarCur.textContent = xp + ' XP';
    if (xpBarNext) xpBarNext.textContent = level.max + ' XP';
  } else if (xpBarFill) {
    xpBarFill.style.width = '100%';
    if (xpBarNext) xpBarNext.textContent = 'MAX';
  }
}

// ================================================================
// FEATURE 8 — DAILY TIP BANNER
// ================================================================
const DAILY_TIPS = [
  "Review 10 new words each day — consistency beats cramming!",
  "Try writing your diary entry in French tonight!",
  "Watch a 5-minute German YouTube video before bed.",
  "Stick vocab post-its around your room for passive learning.",
  "Pronounce each new word out loud at least 3 times.",
  "Learn how to say 5 things you did today in your language.",
  "Test yourself without looking at notes — retrieval practice works!",
  "Find a song in your target language and learn the chorus.",
  "Sanskrit tip: Always learn a word with its vibhakti (case ending).",
  "Try the Pomodoro technique — 25 min study, 5 min break!",
  "Make a mind-map of vocabulary topics: family, food, school.",
  "Reading NCERT chapters aloud in your target language helps pronunciation.",
  "Spaced repetition: review yesterday's words before learning new ones.",
  "Challenge: describe your morning routine in French or German!",
  "For the board exam: focus on grammar rules, not just vocabulary.",
];

function initDailyTip() {
  const today = new Date().toISOString().slice(0, 10);
  const dismissed = localStorage.getItem('ll_tipDismissed');
  if (dismissed === today) {
    document.getElementById('dailyTipBanner').classList.add('hidden');
    return;
  }
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const tip = DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  const tipText = document.getElementById('tipText');
  if (tipText) tipText.textContent = tip;
}

function dismissTip() {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem('ll_tipDismissed', today);
  document.getElementById('dailyTipBanner').classList.add('hidden');
}

// ================================================================
// FEATURE 9 — PRONUNCIATION (Web Speech API)
// ================================================================
function speakWord(word, langCode) {
  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support speech synthesis.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = langCode;
  utterance.rate = 0.85;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// ================================================================
// FEATURE 6 — FLASHCARDS
// ================================================================
const ALL_FLASHCARDS = [
  { lang: 'french',   word: 'Bonjour',       meaning: 'Hello / Good day',      pronunciation: 'bon-ZHOOR' },
  { lang: 'french',   word: 'Merci',         meaning: 'Thank you',              pronunciation: 'mair-SEE' },
  { lang: 'french',   word: 'Au revoir',     meaning: 'Goodbye',                pronunciation: 'oh ruh-VWAR' },
  { lang: 'french',   word: 'Livre',         meaning: 'Book',                   pronunciation: 'LEE-vruh' },
  { lang: 'french',   word: 'École',         meaning: 'School',                 pronunciation: 'ay-KOL' },
  { lang: 'french',   word: 'Je m\'appelle', meaning: 'My name is...',          pronunciation: 'zhuh mah-PEL' },
  { lang: 'french',   word: 'S\'il vous plaît', meaning: 'Please',              pronunciation: 'seel voo PLAY' },
  { lang: 'german',   word: 'Hallo',         meaning: 'Hello',                  pronunciation: 'HAH-lo' },
  { lang: 'german',   word: 'Danke',         meaning: 'Thank you',              pronunciation: 'DAHN-kuh' },
  { lang: 'german',   word: 'Bitte',         meaning: 'Please / You\'re welcome', pronunciation: 'BIT-tuh' },
  { lang: 'german',   word: 'Schule',        meaning: 'School',                 pronunciation: 'SHOO-luh' },
  { lang: 'german',   word: 'Ich heiße',     meaning: 'My name is...',          pronunciation: 'ich HI-ssuh' },
  { lang: 'german',   word: 'Auf Wiedersehen', meaning: 'Goodbye',              pronunciation: 'owf VEE-der-zayn' },
  { lang: 'sanskrit', word: 'नमस्ते',        meaning: 'Hello / Greetings',      pronunciation: 'na-MAS-tay' },
  { lang: 'sanskrit', word: 'धन्यवादः',      meaning: 'Thank you',              pronunciation: 'dha-nya-VAA-dah' },
  { lang: 'sanskrit', word: 'पुस्तकम्',      meaning: 'Book',                   pronunciation: 'pus-TA-kam' },
  { lang: 'sanskrit', word: 'विद्यालयः',     meaning: 'School',                 pronunciation: 'vid-yaa-LA-yah' },
  { lang: 'spanish',  word: '¡Hola!',        meaning: 'Hello',                  pronunciation: 'OH-lah' },
  { lang: 'spanish',  word: 'Gracias',       meaning: 'Thank you',              pronunciation: 'GRAH-syahs' },
  { lang: 'spanish',  word: 'Por favor',     meaning: 'Please',                 pronunciation: 'por fah-VOR' },
];

const LANG_LABELS = { french: '🇫🇷 French', german: '🇩🇪 German', sanskrit: '🕉️ Sanskrit', spanish: '🇪🇸 Spanish' };

let fcFiltered = [...ALL_FLASHCARDS];
let fcIndex = 0;
let fcKnownCount = 0;
let fcLearningCount = 0;

function filterFlashcards(btn, lang) {
  document.querySelectorAll('.fc-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  fcFiltered = lang === 'all' ? [...ALL_FLASHCARDS] : ALL_FLASHCARDS.filter(c => c.lang === lang);
  fcIndex = 0;
  // unflip
  const card = document.getElementById('flashcard');
  if (card) card.classList.remove('flipped');
  renderFlashcard();
}

function renderFlashcard() {
  if (!fcFiltered.length) return;
  const card = fcFiltered[fcIndex % fcFiltered.length];
  document.getElementById('fcLangTag').textContent = LANG_LABELS[card.lang] || card.lang;
  document.getElementById('fcWord').textContent = card.word;
  document.getElementById('fcMeaning').textContent = card.meaning;
  document.getElementById('fcPronunciation').textContent = card.pronunciation;
  document.getElementById('fcCounter').textContent = `Card ${(fcIndex % fcFiltered.length) + 1} of ${fcFiltered.length}`;
  // unflip when navigating
  const fc = document.getElementById('flashcard');
  if (fc) fc.classList.remove('flipped');
}

function flipCard() {
  const fc = document.getElementById('flashcard');
  if (fc) fc.classList.toggle('flipped');
}

function fcNext() {
  fcIndex = (fcIndex + 1) % fcFiltered.length;
  renderFlashcard();
}

function fcPrev() {
  fcIndex = (fcIndex - 1 + fcFiltered.length) % fcFiltered.length;
  renderFlashcard();
}

function markKnown() {
  fcKnownCount++;
  document.getElementById('fcKnown').textContent = fcKnownCount;
  addXP(5, 'flashcard');
  fcNext();
}

function markLearning() {
  fcLearningCount++;
  document.getElementById('fcLearning').textContent = fcLearningCount;
  fcNext();
}

// Init flashcards
renderFlashcard();

// ================================================================
// FEATURE 10 — POMODORO TIMER
// ================================================================
let pomoRunning = false;
let pomoIsBreak = false;
let pomoSecondsLeft = 25 * 60;
let pomoInterval = null;

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

function updatePomoDisplay() {
  const el = document.getElementById('pomoTime');
  const label = document.getElementById('pomoLabel');
  if (el) el.textContent = formatTime(pomoSecondsLeft);
  if (el) el.classList.toggle('break-mode', pomoIsBreak);
  if (label) label.textContent = pomoIsBreak ? 'Break' : 'Focus';
}

function pomodoroToggle() {
  const btn = document.getElementById('pomoStartBtn');
  if (pomoRunning) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    if (btn) btn.textContent = '▶';
  } else {
    pomoRunning = true;
    if (btn) btn.textContent = '⏸';
    pomoInterval = setInterval(() => {
      pomoSecondsLeft--;
      updatePomoDisplay();
      if (pomoSecondsLeft <= 0) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        if (btn) btn.textContent = '▶';
        if (!pomoIsBreak) {
          // Work session ended
          addXP(25, 'pomodoro');
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('LinguaLearn', { body: '25-min focus session done! Take a 5-min break. +25 XP earned! 🎉' });
          } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(p => {
              if (p === 'granted') {
                new Notification('LinguaLearn', { body: '25-min session done! Take a break. +25 XP! 🎉' });
              }
            });
          }
          pomoIsBreak = true;
          pomoSecondsLeft = 5 * 60;
        } else {
          // Break ended
          pomoIsBreak = false;
          pomoSecondsLeft = 25 * 60;
        }
        updatePomoDisplay();
      }
    }, 1000);
  }
}

function pomodoroReset() {
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoIsBreak = false;
  pomoSecondsLeft = 25 * 60;
  const btn = document.getElementById('pomoStartBtn');
  if (btn) btn.textContent = '▶';
  updatePomoDisplay();
}

updatePomoDisplay();

// ================================================================
// INIT ALL FEATURES ON PAGE LOAD
// ================================================================
(function initAll() {
  // Streak
  updateStreak();

  // First login badge
  awardBadge('firstLogin');

  // Daily tip
  initDailyTip();

  // Dashboard
  updateDashboard();
})();

// ================================================================
// ENHANCED UI — INTERACTIVE EFFECTS
// ================================================================

// Scroll progress bar
(function scrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.style.width = '0%';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
  }, { passive: true });
})();

// Card glow follows mouse
document.querySelectorAll('.bento-card, .lang-card, .resource-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

// Scroll reveal with stagger
(function betterReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// Animate numbers on scroll
(function animateNumbers() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.textContent) || 0;
      if (target <= 0 || target > 10000) return;
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.dash-card-value, .grade-num').forEach(el => obs.observe(el));
})();

// Tilt effect on hero cards
document.querySelectorAll('.hero-lang-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width * 10;
    const y = (e.clientY - r.top - r.height / 2) / r.height * 10;
    card.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Mobile nav toggle
function toggleNav() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'var(--surface)';
    links.style.flexDirection = 'column';
    links.style.padding = '1rem';
    links.style.borderBottom = '1px solid var(--border)';
    links.style.boxShadow = 'var(--shadow-lg)';
    links.style.zIndex = '50';
  }
}

// ===== ANIMATED STATS COUNTER =====
(function animateStatsBar() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target) || 0;
      if (el.dataset.animated) return;
      el.dataset.animated = '1';
      const duration = 2000;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + '+';
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number[data-target]').forEach(el => obs.observe(el));
})();

// ===== INTERACTIVE DEMO =====
const demoQuestions = {
  french: [
    { q: 'What is "Hello" in French?', opts: ['Bonjour', 'Hola', 'Hallo', 'Ciao'], ans: 0 },
    { q: 'What does "Merci" mean?', opts: ['Sorry', 'Please', 'Thank you', 'Goodbye'], ans: 2 },
    { q: 'How do you say "Book" in French?', opts: ['Buch', 'Livre', 'Libro', 'Kitab'], ans: 1 },
    { q: '"Je m\'appelle" means...', opts: ['I want', 'I like', 'My name is', 'I have'], ans: 2 },
  ],
  german: [
    { q: 'What is "Thank you" in German?', opts: ['Merci', 'Gracias', 'Danke', 'Arigato'], ans: 2 },
    { q: 'How do you say "Water" in German?', opts: ['Agua', 'Eau', 'Wasser', 'Mizu'], ans: 2 },
    { q: '"Guten Morgen" means...', opts: ['Good night', 'Good morning', 'Good evening', 'Goodbye'], ans: 1 },
    { q: 'What is "School" in German?', opts: ['Ecole', 'Escuela', 'Schule', 'Gakko'], ans: 2 },
  ],
  spanish: [
    { q: 'What is "Hello" in Spanish?', opts: ['Bonjour', 'Hola', 'Ciao', 'Oi'], ans: 1 },
    { q: '"Gracias" means...', opts: ['Please', 'Sorry', 'Thank you', 'Hello'], ans: 2 },
    { q: 'How do you say "Friend" in Spanish?', opts: ['Ami', 'Freund', 'Amigo', 'Tomodachi'], ans: 2 },
    { q: 'What is "Water" in Spanish?', opts: ['Eau', 'Wasser', 'Mizu', 'Agua'], ans: 3 },
  ],
  sanskrit: [
    { q: '"Namaste" is a greeting in Sanskrit meaning...', opts: ['Goodbye', 'I bow to you', 'Thank you', 'Welcome'], ans: 1 },
    { q: 'What is "Book" in Sanskrit?', opts: ['Pustakam', 'Vidyalaya', 'Pathshala', 'Lekhani'], ans: 0 },
    { q: '"Aham" means...', opts: ['You', 'He', 'I', 'They'], ans: 2 },
    { q: '"Vidyalaya" means...', opts: ['Library', 'School', 'Temple', 'Home'], ans: 1 },
  ]
};
let demoLang = 'french';
let demoIdx = 0;
let demoScore = 0;
let demoTotal = 0;
let demoAnswered = false;

function setDemoLang(btn, lang) {
  document.querySelectorAll('.demo-lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  demoLang = lang;
  demoIdx = 0;
  demoScore = 0;
  demoTotal = 0;
  demoAnswered = false;
  document.getElementById('demoScoreText').textContent = 'Answer to see your score!';
  document.getElementById('demoScoreFill').style.width = '0%';
  renderDemoQ();
}

function renderDemoQ() {
  const qs = demoQuestions[demoLang];
  const q = qs[demoIdx % qs.length];
  document.getElementById('demoQuestion').textContent = q.q;
  document.getElementById('demoFeedback').textContent = '';
  document.getElementById('demoFeedback').style.color = '';
  document.getElementById('demoNextBtn').style.display = 'none';
  demoAnswered = false;
  const optsDiv = document.getElementById('demoOptions');
  optsDiv.innerHTML = q.opts.map((o, i) => `<button class="demo-opt" onclick="checkDemoAns(${i})">${o}</button>`).join('');
}

function checkDemoAns(idx) {
  if (demoAnswered) return;
  demoAnswered = true;
  demoTotal++;
  const qs = demoQuestions[demoLang];
  const q = qs[demoIdx % qs.length];
  const btns = document.querySelectorAll('.demo-opt');
  btns.forEach((b, i) => {
    if (i === q.ans) b.classList.add('correct');
    else if (i === idx) b.classList.add('wrong');
    if (i !== idx && i !== q.ans) b.classList.add('disabled');
  });
  const fb = document.getElementById('demoFeedback');
  if (idx === q.ans) {
    demoScore++;
    fb.textContent = 'Correct! Great job!';
    fb.style.color = '#34d399';
  } else {
    fb.textContent = 'Not quite — the answer is ' + q.opts[q.ans];
    fb.style.color = '#f87171';
  }
  document.getElementById('demoScoreText').textContent = `Score: ${demoScore}/${demoTotal}`;
  document.getElementById('demoScoreFill').style.width = (demoScore / demoTotal * 100) + '%';
  if (demoIdx < qs.length - 1) {
    document.getElementById('demoNextBtn').style.display = 'inline-flex';
  } else {
    setTimeout(() => {
      document.getElementById('demoFeedback').textContent += ' — You completed the demo! Sign up for full access.';
    }, 600);
  }
}

function nextDemoQ() {
  demoIdx++;
  renderDemoQ();
}

// Init demo
renderDemoQ();

// ===== FAQ ACCORDION =====
function toggleFaq(el) {
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}

// ===== TESTIMONIAL CAROUSEL DOTS =====
(function initCarouselDots() {
  const carousel = document.getElementById('testimonialCarousel');
  const dotsContainer = document.getElementById('carouselDots');
  if (!carousel || !dotsContainer) return;
  const cards = carousel.querySelectorAll('.testimonial-card');
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };
    dotsContainer.appendChild(dot);
  });
  carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 24;
    const activeIdx = Math.round(scrollLeft / cardWidth);
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === activeIdx);
    });
  }, { passive: true });
})();

// ===== ENHANCED SCROLL REVEAL FOR NEW ELEMENTS =====
(function enhancedReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale').forEach(el => obs.observe(el));
})();

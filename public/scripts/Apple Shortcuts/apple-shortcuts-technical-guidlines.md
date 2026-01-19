# JavaScript API Referentie: Shortcuts "Run JavaScript on Webpage"

**Technische specificatie** voor iOS 26 / Shortcuts 9.0 (jan 2026)

## 🔧 Runtime Context

Script runt in **isolated browser context** van Safari/SFSafariViewController/ASWebAuthenticationSession:

Global Scope:
├── window (volledig)
├── document (DOM van geladen pagina)
├── location
├── navigator
├── localStorage / sessionStorage (per site)
└── completion(result: JSONValue) → enige Shortcuts API

text

**Geen** externe parameters; puur DOM + `completion`.

## 📤 completion() Signature

```javascript
/**
 * Stuur resultaat terug naar Shortcuts shortcut
 * @param result JSONValue - JSON‑encodeerbare waarde
 * @returns void - script eindigt na aanroep
 */
function completion(result?: JSONValue): void;

JSONValue types (exact wat JSON.stringify() accepteert):

typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSONValue[]      // geneste arrays OK
  | { [key: string]: JSONValue };  // geneste objects OK

Voorbeelden:

javascript
completion("tekst");                    // → Shortcuts Tekst
completion(42);                         // → Getal
completion({key: "value"});             // → Woordenboek
completion(["a", "b"]);                 // → Lijst
completion(null);                       // → Leeg
completion();                           // → undefined

❌ Fouten:

javascript
completion(document.body);     // FAIL: DOM node niet JSON
completion(() => {});         // FAIL: Function niet JSON
completion(new Date());       // FAIL: Date → "Invalid JSON"

🏗️ Script Template

javascript
// TEMPLATE: altijd deze structuur
(function() {
  try {
    // 1. DOM query
    const nodes = document.querySelectorAll('selector');

    // 2. Transformeer naar JSON
    const data = Array.from(nodes).map(node => ({
      text: node.innerText?.trim() ?? '',
      href: node.getAttribute('href') ?? null,
      classes: Array.from(node.classList)
    }));

    // 3. completion (verplicht!)
    completion(data);

  } catch (error) {
    completion({ error: error.message });
  }
})();

🔄 Asynchroon Patroon

completion is non‑blocking; mag later aangeroepen:

javascript
// MutationObserver
const observer = new MutationObserver(() => {
  if (document.querySelector('#target')) {
    observer.disconnect();
    completion(document.querySelector('#target').innerText);
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// of fetch
fetch('/api/data', { credentials: 'same‑origin' })
  .then(r => r.json())
  .then(data => completion(data))
  .catch(e => completion({error: e.message}));

📊 DOM Data Extractie Patterns
1. Table → Array of Objects

javascript
const rows = document.querySelectorAll('table tr');
completion(Array.from(rows).map(row => {
  const cells = row.querySelectorAll('td, th');
  return {
    header: cells?.innerText ?? '',
    value:  cells?.innerText ?? '',[1]
    link:   cells?.querySelector('a')?.href ?? null[2]
  };
}));

2. Article List Scraping

javascript
const articles = [...document.querySelectorAll('article')];
completion(articles.map(a => ({
  title: a.querySelector('h3')?.innerText ?? '',
  author: a.querySelector('.author')?.innerText ?? '',
  date: a.querySelector('time')?.getAttribute('datetime') ?? '',
  excerpt: a.querySelector('.excerpt')?.innerText?.slice(0, 200) ?? ''
})));

3. Form Data Extract + Modify

javascript
const formData = {};
document.querySelectorAll('input, select, textarea').forEach(el => {
  formData[el.name || el.id] = el.value;
});

// Optioneel: form wijzigen
document.querySelector('#submit').click();

completion(formData);

4. Pagination + Wait

javascript
function waitForNextPage() {
  return new Promise(resolve => {
    const nextBtn = document.querySelector('.next');
    if (nextBtn) {
      nextBtn.click();
      setTimeout(() => resolve(document.querySelectorAll('.item')), 2000);
    } else {
      resolve([]);
    }
  });
}

waitForNextPage().then(items => completion(Array.from(items)));

🛡️ Error Handling

javascript
try {
  const data = riskyOperation();
  completion(data);
} catch (e) {
  completion({
    success: false,
    error: e.message,
    stack: e.stack?.split('\n').slice(0, 5) ?? []
  });
}

Runtime errors → Shortcuts exception; console.error(e) zichtbaar in Web Inspector.
⚡ Performance Tips

javascript
// Efficient selectors
const els = document.querySelectorAll('#container .item');  // vs document.querySelectorAll('.item')

// Bulk DOM read
const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  null,
  false
);
const elements = [];
while (walker.nextNode()) {
  elements.push(walker.currentNode);
}

🚫 Beperkingen
Niet mogelijk	Reden
fetch() cross‑origin	CORS policy
eval(), new Function()	Security sandbox
DOM nodes returnen	Niet JSON‑serializable
External libs	Geen npm/imports
Persistent storage	Per‑pagina localStorage

Debug: console.log(data) → Safari Web Inspector (USB debugging).
```

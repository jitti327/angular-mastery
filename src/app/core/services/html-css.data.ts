import { Lesson } from '../models/lesson.model';

export const HTML_CSS_LESSONS: Lesson[] = [
  {
    id: 301, slug: 'html-document-structure', title: 'HTML Document Structure',
    description: 'Learn the foundation of every web page — DOCTYPE declarations, semantic elements, and document outline.',
    level: 'beginner', duration: '20 min',
    objectives: ['Write a valid HTML5 document from scratch', 'Understand the purpose of DOCTYPE', 'Create a logical document outline', 'Identify essential structural elements'],
    quiz: [
      { id: 1, question: 'What is the purpose of the DOCTYPE declaration?', options: ['It defines the document encoding', 'It tells the browser which HTML version to use for rendering', 'It links the CSS file', 'It creates the root element'], correctIndex: 1, explanation: 'The DOCTYPE declaration tells the browser which version of HTML to use when rendering the page.' },
      { id: 2, question: 'Which element is the root of an HTML document?', options: ['<body>', '<html>', '<head>', '<main>'], correctIndex: 1, explanation: 'The <html> element is the root element that wraps all content.' },
      { id: 3, question: 'Which meta tag is essential for responsive design?', options: ['<meta charset="UTF-8">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="description">', '<meta name="author">'], correctIndex: 1, explanation: 'The viewport meta tag sets the width to the device width.' }
    ],
    topics: [
      { id: 'doctype', title: 'DOCTYPE and Document Skeleton', content: `**What is DOCTYPE?**

The DOCTYPE declaration is the very first line of an HTML document. It tells the browser which version of HTML the page is written in, triggering standards mode rendering.

**Why DOCTYPE Matters:**
- Without it, browsers enter **quirks mode** with inconsistent rendering
- It ensures consistent box model behavior across browsers
- HTML5 simplified it to a single, universal declaration

**The Minimal HTML5 Document:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <!-- Content goes here -->
</body>
</html>
\`\`\`

**Common Mistakes:**
- Forgetting the DOCTYPE — triggers quirks mode in all browsers
- Missing \`lang\` attribute on \`<html>\` — hurts accessibility and SEO
- Placing content outside \`<body>\` — browsers move it inside automatically

**Best Practices:**
- Always use \`<!DOCTYPE html>\` as the very first line
- Set \`lang="en"\` on \`<html>\`
- Include the viewport meta tag for responsive design
- Place all visible content inside \`<body>\`

**Key Takeaways:**
1. \`<!DOCTYPE html>\` must be the first line — it prevents quirks mode
2. The \`lang\` attribute on \`<html>\` is critical for accessibility
3. Always include the viewport meta tag for mobile-friendly pages` },
      { id: 'semantic', title: 'Semantic Elements', content: `**What are Semantic Elements?**

Semantic HTML elements clearly describe their meaning to both the browser and the developer. They replace generic \`<div>\` and \`<span>\` elements with meaningful alternatives.

**Why Semantic Elements Matter:**
- **Accessibility**: Screen readers use semantics to convey page structure
- **SEO**: Search engines understand content hierarchy better
- **Maintainability**: Code is self-documenting and easier to navigate

**Key Structural Elements:**
\`\`\`html
<header>   — Introductory content or navigation
<nav>      — Navigation links
<main>     — Primary unique content of the page
<article>  — Self-contained, independent content
<section>  — Thematic grouping of content
<aside>    — Sidebar or tangentially related content
<footer>   — Footer information
\`\`\`

**Semantic vs Non-Semantic:**
\`\`\`html
<!-- Non-Semantic (Avoid) -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Semantic (Preferred) -->
<header>
  <nav>...</nav>
</header>
<main>...</main>
\`\`\`

**Common Mistakes:**
- Using \`<div>\` for everything instead of semantic alternatives
- Nesting a \`<header>\` inside another \`<header>\` (invalid)
- Using \`<section>\` without a heading

**Best Practices:**
- Use \`<main>\` exactly once per page
- Wrap navigation links in \`<nav>\`
- Use \`<section>\` with a heading to define document outline
- Use \`<article>\` for content that makes sense on its own

**Key Takeaways:**
1. Semantic elements improve accessibility, SEO, and code readability
2. Use \`<main>\` once per page for the primary content
3. Every \`<section>\` should have a heading` },
      { id: 'outline', title: 'Document Outline and Headings', content: `**What is the Document Outline?**

The document outline is the hierarchical structure created by heading elements (\`<h1>\` through \`<h6>\`).

**Heading Hierarchy:**
\`\`\`html
<h1>Page Title</h1>          <!-- Only one per page -->
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
    <h3>Another Subsection</h3>
  <h2>Another Section</h2>
\`\`\`

**Page Landmarks:**
\`\`\`html
<body>
  <header>
    <nav aria-label="Main">...</nav>
  </header>
  <main>...</main>
  <aside>...</aside>
  <footer>...</footer>
</body>
\`\`\`

**Common Mistakes:**
- Skipping heading levels (h1 to h3)
- Using headings purely for visual styling
- Having multiple \`<h1>\` elements on a single page

**Best Practices:**
- Use exactly one \`<h1>\` per page for the main title
- Never skip heading levels — always go in sequential order
- Use CSS to control heading appearance, not heading level

**Key Takeaways:**
1. A single \`<h1>\` per page defines the main topic
2. Never skip heading levels — always progress sequentially
3. Landmark elements enable screen reader navigation` }
    ]
  },
  {
    id: 302, slug: 'semantic-html', title: 'Semantic HTML',
    description: 'Go beyond divs — learn article, section, nav, aside, header, footer, and main for accessible, well-structured pages.',
    level: 'beginner', duration: '25 min',
    objectives: ['Differentiate between semantic and non-semantic elements', 'Structure a page using semantic landmarks', 'Improve accessibility through proper element usage', 'Understand the impact on SEO'],
    quiz: [
      { id: 1, question: 'Which element should wrap the main content of a page?', options: ['<div class="content">', '<main>', '<section>', '<article>'], correctIndex: 1, explanation: 'The <main> element represents the dominant content. There should be only one per page.' },
      { id: 2, question: 'When should you use the <article> element?', options: ['For any block of text', 'For content that is self-contained and independently distributable', 'For sidebar content only', 'For navigation menus'], correctIndex: 1, explanation: 'The <article> represents self-contained content that could be independently distributed.' },
      { id: 3, question: 'What is the correct relationship between <article> and <section>?', options: ['<section> is always inside <article>', '<article> is always inside <section>', 'They can be nested in either direction depending on context', 'They should never be used together'], correctIndex: 2, explanation: 'An <article> can contain <section> elements, and a <section> can contain <article> elements.' }
    ],
    topics: [
      { id: 'landmarks', title: 'Semantic Landmarks', content: `**What are Landmark Elements?**

Landmark elements define the major regions of a page. Screen readers provide shortcuts to jump between landmarks.

**The Five Main Landmarks:**
\`\`\`html
<header>   — Banner: site-wide header content
<nav>      — Navigation: major navigation blocks
<main>     — Main: the primary content (one per page)
<aside>    — Complementary: sidebar or related content
<footer>   — Contentinfo: footer with site-wide info
\`\`\`

**Full Page Example:**
\`\`\`html
<body>
  <header>
    <h1>My Site</h1>
    <nav aria-label="Main">
      <a href="/home">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article>
      <h2>First Post</h2>
      <p>Content here...</p>
    </article>
  </main>
  <aside aria-label="Related">...</aside>
  <footer><p>&copy; 2026 My Site</p></footer>
</body>
\`\`\`

**Best Practices:**
- Use exactly one \`<main>\` per page
- Add \`aria-label\` to distinguish multiple \`<nav>\` elements
- Test with a screen reader to verify landmark navigation works

**Key Takeaways:**
1. Landmark elements enable screen readers to provide rapid page navigation
2. Use \`<main>\` exactly once and never nest landmarks inside each other
3. Add \`aria-label\` when multiple landmarks of the same type appear` },
      { id: 'article-section', title: 'Article vs Section', content: `**When to Use Article vs Section**

Both \`<article>\` and \`<section>\` group content, but their purposes differ significantly.

**Article — Self-Contained Content:**
\`\`\`html
<article>
  <h2>Understanding CSS Grid</h2>
  <p>CSS Grid is a two-dimensional layout system...</p>
</article>
\`\`\`

**Section — Thematic Grouping:**
\`\`\`html
<section aria-labelledby="chapters">
  <h2 id="chapters">Chapters</h2>
  <article><h3>Chapter 1</h3><p>Content...</p></article>
  <article><h3>Chapter 2</h3><p>Content...</p></article>
</section>
\`\`\`

**Decision Guide:**
- Blog post → \`<article>\` (self-contained)
- Product card → \`<article>\` (makes sense on its own)
- Chapter → \`<section>\` (thematic grouping with heading)
- Tab panel → \`<section>\` (part of a larger whole)
- Sidebar widgets → \`<aside>\`

**Key Takeaways:**
1. \`<article>\` = self-contained, independently distributable content
2. \`<section>\` = thematic grouping that requires a heading
3. When in doubt, \`<article>\` is often the safer choice` },
      { id: 'nesting', title: 'Nesting Rules and Best Practices', content: `**Semantic Element Nesting Rules**

HTML5 defines strict rules about which elements can be nested inside others.

**Key Nesting Rules:**
\`\`\`html
<!-- Valid nesting -->
<main>
  <article>
    <section>
      <h2>Subheading</h2>
      <p>Content</p>
    </section>
  </article>
</main>

<!-- Invalid: header inside header -->
<header>
  <header>  <!-- INVALID -->
    <h1>Title</h1>
  </header>
</header>

<!-- Invalid: interactive inside interactive -->
<a href="#">
  <button>Click</button>  <!-- INVALID -->
</a>
\`\`\`

**Best Practices:**
- Validate your HTML using the W3C Validator
- Use browser DevTools to check element nesting
- Keep heading hierarchy flat and sequential

**Key Takeaways:**
1. Never nest interactive elements inside each other
2. \`<main>\` must be a direct child of \`<body>\`
3. Always validate HTML to catch nesting errors` }
    ]
  },
  {
    id: 303, slug: 'css-fundamentals', title: 'CSS Fundamentals',
    description: 'Master selectors, specificity, the box model, and CSS units — the building blocks of all CSS.',
    level: 'beginner', duration: '30 min',
    objectives: ['Understand the CSS cascade and specificity', 'Master the box model and its properties', 'Choose the right CSS units for each situation', 'Write clean, maintainable selectors'],
    quiz: [
      { id: 1, question: 'What is the specificity order from highest to lowest?', options: ['Tag, Class, ID, Inline', 'Inline, ID, Class, Tag', 'ID, Class, Tag, Universal', 'Class, ID, Inline, Tag'], correctIndex: 1, explanation: 'Specificity order is: inline styles > ID selectors > class/attribute selectors > element selectors.' },
      { id: 2, question: 'What does "box-sizing: border-box" do?', options: ['Includes padding and border in the total width/height', 'Excludes padding from the width', 'Adds border to the outside', 'Removes the box model'], correctIndex: 0, explanation: 'With border-box, width and height include padding and border.' },
      { id: 3, question: 'Which unit is relative to the root element font size?', options: ['px', 'rem', 'vh', 'vw'], correctIndex: 1, explanation: 'rem (root em) is relative to the root element font size.' }
    ],
    topics: [
      { id: 'cascade', title: 'The Cascade and Specificity', content: `**What is the CSS Cascade?**

The cascade is the algorithm browsers use to determine which CSS rule applies when multiple rules target the same element.

**Specificity Hierarchy (Low to High):**
1. **Universal** (\`*\`): specificity = 0,0,0,0
2. **Element/pseudo-element** (\`div\`, \`::before\`): 0,0,0,1
3. **Class/attribute/pseudo-class** (.\`active\`, \`[type="text"]\`, \`:hover\`): 0,0,1,0
4. **ID** (\`#header\`): 0,1,0,0
5. **Inline** (\`style="..."\`): 1,0,0,0
6. **!important**: overrides everything

\`\`\`css
/* Specificity: 0,0,0,1 */
p { color: black; }

/* Specificity: 0,0,1,0 */
.text { color: blue; }

/* Specificity: 0,1,0,0 */
#intro { color: red; }
\`\`\`

**Best Practices:**
- Avoid \`!important\` — it creates maintenance nightmares
- Keep specificity low and consistent
- Use BEM naming to avoid specificity wars

**Key Takeaways:**
1. Specificity follows: inline > ID > class > element
2. \`!important\` is a last resort, not a tool
3. Low, consistent specificity makes stylesheets easier to maintain` },
      { id: 'box-model', title: 'The Box Model', content: `**What is the Box Model?**

Every HTML element is a rectangular box. The box model defines how content, padding, border, and margin are arranged.

**Box Model Layers:**
\`\`\`css
.content-box {
  width: 200px;           /* Content width */
  padding: 20px;          /* Space between content and border */
  border: 2px solid;      /* Visible border */
  margin: 10px;           /* Space between boxes */
}
\`\`\`

**Global border-box Reset:**
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

**Best Practices:**
- Always apply the global \`border-box\` reset
- Use \`rem\` for spacing to scale with user font preferences
- Use \`margin: 0 auto\` for horizontal centering

**Key Takeaways:**
1. Always use \`box-sizing: border-box\` globally
2. Vertical margins collapse between block elements
3. Use \`rem\` for spacing values` },
      { id: 'units', title: 'CSS Units', content: `**What are CSS Units?**

Units define the size of values in CSS. Choosing the right unit is critical for responsive layouts.

**Relative Units:**
\`\`\`css
.rem { font-size: 1.5rem; }      /* Relative to root font size */
.em  { margin: 1em; }            /* Relative to parent font size */
.vw { width: 100vw; }            /* 1% of viewport width */
.vh { height: 100vh; }           /* 1% of viewport height */
\`\`\`

**Unit Selection Guide:**
- Font sizes → \`rem\` (scales with user preferences)
- Spacing/margins → \`rem\` (consistent with typography)
- Layout widths → \`%\`, \`fr\` (responsive to container)
- Borders → \`px\` (should remain sharp)

**Best Practices:**
- Use \`rem\` for font sizes, spacing, and most sizing
- Use \`px\` only for borders and very small fixed values
- Prefer \`dvh\` over \`vh\` for mobile

**Key Takeaways:**
1. \`rem\` is the safest unit for font sizes
2. Use \`px\` for borders where sharp rendering matters
3. Prefer \`dvh\` over \`vh\` for mobile` }
    ]
  },
  {
    id: 304, slug: 'css-layout', title: 'CSS Layout — Flexbox & Grid',
    description: 'Learn the two modern CSS layout systems that replaced floats, tables, and positioning hacks.',
    level: 'beginner', duration: '35 min',
    objectives: ['Build one-dimensional layouts with Flexbox', 'Build two-dimensional layouts with Grid', 'Choose between Flexbox and Grid for each use case', 'Center elements confidently using both systems'],
    quiz: [
      { id: 1, question: 'When should you use CSS Grid over Flexbox?', options: ['For centering a single element', 'For two-dimensional layouts (rows AND columns)', 'For horizontal alignment only', 'For responsive text sizing'], correctIndex: 1, explanation: 'Grid excels at two-dimensional layouts.' },
      { id: 2, question: 'What does "justify-content" control in Flexbox?', options: ['Vertical alignment', 'Horizontal alignment along the main axis', 'Spacing between grid rows', 'Text alignment'], correctIndex: 1, explanation: 'justify-content aligns items along the main axis.' },
      { id: 3, question: 'What is the difference between grid-template-columns and grid-template-areas?', options: ['There is no difference', 'columns defines track widths, areas defines named zones', 'areas is for mobile only', 'columns is deprecated'], correctIndex: 1, explanation: 'grid-template-areas provides a visual layout approach with named regions.' }
    ],
    topics: [
      { id: 'flexbox', title: 'Flexbox Fundamentals', content: `**What is Flexbox?**

Flexbox is a one-dimensional layout model that arranges items in a row or column.

\`\`\`css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
\`\`\`

**Centering Pattern:**
\`\`\`css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

**Key Takeaways:**
1. Flexbox = one-dimensional: align items in a row OR column
2. Use \`gap\` for spacing between items
3. \`justify-content\` = main axis, \`align-items\` = cross axis` },
      { id: 'grid', title: 'CSS Grid Fundamentals', content: `**What is CSS Grid?**

CSS Grid is a two-dimensional layout system that controls both rows AND columns.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 1rem;
}
\`\`\`

**Responsive Grid Without Media Queries:**
\`\`\`css
.auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

**Grid Areas — Visual Layout:**
\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}
\`\`\`

**Key Takeaways:**
1. Grid = two-dimensional: control rows AND columns
2. \`repeat(auto-fit, minmax(250px, 1fr))\` creates responsive grids
3. \`grid-template-areas\` provides a visual layout approach` },
      { id: 'choosing', title: 'Flexbox vs Grid — When to Use Which', content: `**Choosing Between Flexbox and Grid**

Both are powerful, but they solve different problems.

**Decision Guide:**
- Navigation bar → Flexbox (single-axis)
- Card grid → Grid (two-dimensional)
- Centering one element → Either
- Page layout → Grid (rows + columns)
- Button group → Flexbox

**Combined Example:**
\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
\`\`\`

**Key Takeaways:**
1. One-dimensional → Flexbox; two-dimensional → Grid
2. Grid and Flexbox are complementary — use both
3. Grid for layout, Flexbox for alignment` }
    ]
  },
  {
    id: 305, slug: 'responsive-design', title: 'Responsive Design',
    description: 'Build pages that look great on every device using media queries, mobile-first strategy, and the viewport meta tag.',
    level: 'beginner', duration: '30 min',
    objectives: ['Write effective media queries', 'Adopt a mobile-first workflow', 'Understand viewport and breakpoints', 'Create fluid layouts that adapt to any screen'],
    quiz: [
      { id: 1, question: 'What is the mobile-first approach?', options: ['Designing only for mobile', 'Writing base CSS for mobile, then adding styles for larger screens with min-width', 'Using JavaScript to detect mobile', 'Creating a separate mobile site'], correctIndex: 1, explanation: 'Mobile-first means writing base styles for small screens and progressively enhancing with min-width.' },
      { id: 2, question: 'Which viewport meta tag is correct?', options: ['<meta name="viewport" content="width=1024">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="maximum-scale=2.0">', '<meta name="viewport" content="user-scalable=yes">'], correctIndex: 1, explanation: 'The standard viewport tag sets width to device width and initial scale to 1.0.' },
      { id: 3, question: 'Why is min-width preferred over max-width?', options: ['min-width loads faster', 'min-width follows mobile-first principles', 'max-width is deprecated', 'min-width has better support'], correctIndex: 1, explanation: 'Using min-width allows mobile styles as the default and progressively adds complexity.' }
    ],
    topics: [
      { id: 'viewport', title: 'Viewport Meta Tag', content: `**What is the Viewport?**

The viewport is the user visible area of a web page.

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

**Best Practices:**
- Always include the viewport meta tag
- Never disable user scaling — it is a WCAG accessibility requirement
- Test on real devices

**Key Takeaways:**
1. The viewport meta tag is non-negotiable for any responsive page
2. Never set \`user-scalable=no\` — it violates accessibility
3. Test on real devices to catch viewport-related issues` },
      { id: 'media-queries', title: 'Media Queries', content: `**What are Media Queries?**

Media queries let you apply CSS only when specific conditions are met.

\`\`\`css
/* Mobile-first */
.container { padding: 1rem; grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .container { padding: 2rem; grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .container { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

**Modern Media Queries:**
\`\`\`css
@media (prefers-color-scheme: dark) { body { background: #1a1a2e; } }
@media (prefers-reduced-motion: reduce) { * { animation: none; } }
\`\`\`

**Key Takeaways:**
1. Use \`min-width\` media queries for mobile-first design
2. Content should drive breakpoints, not specific devices
3. Always respect \`prefers-reduced-motion\` and \`prefers-color-scheme\`` },
      { id: 'mobile-first', title: 'Mobile-First Strategy', content: `**What is Mobile-First Design?**

Mobile-first means writing base CSS for the smallest screens, then progressively enhancing.

**Mobile-First (Preferred):**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  gap: 1rem;
}

@media (min-width: 768px) {
  .container { grid-template-columns: repeat(2, 1fr); padding: 2rem; }
}

@media (min-width: 1024px) {
  .container { grid-template-columns: 250px 1fr 250px; max-width: 1400px; }
}
\`\`\`

**Key Takeaways:**
1. Mobile-first CSS is simpler, faster, and more maintainable
2. Start with single-column layouts and enhance for larger screens
3. Never hide content on mobile — reflow it using CSS layout tools` }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // INTERMEDIATE (306-312)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 306, slug: 'css-advanced-selectors', title: 'Advanced CSS Selectors',
    description: 'Master pseudo-classes, pseudo-elements, and attribute selectors for precise, elegant styling.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Use pseudo-classes for dynamic state styling', 'Apply pseudo-elements for content decoration', 'Leverage attribute selectors for pattern matching', 'Combine selectors for precise targeting'],
    quiz: [
      { id: 1, question: 'What is the difference between ::before and :before?', options: ['There is no difference', '::before is CSS3 syntax, :before is CSS2 (deprecated)', ':before works in HTML, ::before does not', '::before creates an element'], correctIndex: 1, explanation: 'CSS3 uses double-colon syntax to distinguish pseudo-elements from pseudo-classes.' },
      { id: 2, question: 'Which selector targets every odd list item?', options: ['li:nth-child(odd)', 'li:nth-child(2n+1)', 'li:nth-of-type(odd)', 'Both A and B'], correctIndex: 3, explanation: 'Both :nth-child(odd) and :nth-child(2n+1) select every odd element.' },
      { id: 3, question: 'What does the :has() pseudo-class do?', options: ['Selects an element with a specific class', 'Selects a parent element based on its children', 'Selects visited elements', 'Selects elements with attributes'], correctIndex: 1, explanation: ':has() selects a parent element based on its children.' }
    ],
    topics: [
      { id: 'pseudo-classes', title: 'Pseudo-Classes', content: `**State Pseudo-Classes:**
\`\`\`css
a:hover          { color: blue; }
a:active         { color: red; }
input:focus-visible { outline: 2px solid blue; }
input:valid      { border-color: green; }
input:invalid    { border-color: red; }
\`\`\`

**Structural Pseudo-Classes:**
\`\`\`css
li:first-child   { font-weight: bold; }
li:last-child    { border-bottom: none; }
li:nth-child(2n) { background: #f5f5f5; }
\`\`\`

**Best Practices:**
- Always style \`:focus-visible\` for keyboard navigation
- Use \`:nth-of-type()\` when mixing element types
- Use \`:has()\` as a parent selector

**Key Takeaways:**
1. \`:nth-child\` counts all siblings; \`:nth-of-type\` counts same-type
2. Always style \`:focus-visible\` for keyboard support
3. \`:has()\` is the long-awaited parent selector` },
      { id: 'pseudo-elements', title: 'Pseudo-Elements', content: `**The Four Core Pseudo-Elements:**
\`\`\`css
.quote::before { content: '"'; font-size: 2em; color: #ccc; }
.quote::after  { content: '"'; font-size: 2em; color: #ccc; }
.intro::first-line { font-weight: bold; }
.intro::first-letter { font-size: 3em; float: left; }
\`\`\`

**Modern Pseudo-Elements:**
\`\`\`css
input::placeholder { color: #999; font-style: italic; }
li::marker { color: blue; font-size: 1.5em; }
\`\`\`

**Key Takeaways:**
1. Pseudo-elements require the \`content\` property to render
2. Content in pseudo-elements is decorative only
3. Use \`:before\`/\`:after\` for decoration, \`:first-letter\`/\`:first-line\` for typography` },
      { id: 'attribute-selectors', title: 'Attribute Selectors', content: `**Presence and Value Selectors:**
\`\`\`css
a[target]           { color: blue; }
a[target="_blank"] { color: red; }
a[href^="https://"] { color: green; }
a[href$=".pdf"]    { color: red; }
a[href*="example"] { font-weight: bold; }
\`\`\`

**Practical Examples:**
\`\`\`css
[data-status="active"]  { border-left: 4px solid green; }
[data-status="pending"] { border-left: 4px solid orange; }
[data-status="error"]   { border-left: 4px solid red; }
\`\`\`

**Key Takeaways:**
1. Attribute selectors target elements without adding classes
2. Use \`^=\` for starts-with, \`\$=\` for ends-with, \`*=\` for contains
3. Data attributes are ideal for styling state` }
    ]
  },
  {
    id: 307, slug: 'css-grid-mastery', title: 'CSS Grid Mastery',
    description: 'Take Grid to the next level — grid areas, auto-fill, minmax, named lines, and advanced placement.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Define complex layouts with grid-template-areas', 'Create responsive grids with auto-fill and minmax', 'Use named grid lines for precise item placement', 'Implement subgrid for nested alignment'],
    quiz: [
      { id: 1, question: 'What does "repeat(auto-fill, minmax(200px, 1fr))" do?', options: ['Creates exactly 200px columns', 'Creates as many 200px+ columns as fit, growing to fill space', 'Creates a single 200px column', 'Creates 200 rows'], correctIndex: 1, explanation: 'auto-fill creates as many tracks as fit. minmax ensures each is at least 200px.' },
      { id: 2, question: 'What is the purpose of grid-template-areas?', options: ['Define track sizes', 'Create a visual layout by naming regions', 'Add animations', 'Define breakpoints'], correctIndex: 1, explanation: 'grid-template-areas lets you name layout regions with visual syntax.' },
      { id: 3, question: 'What is subgrid?', options: ['A grid inside another grid', 'A child grid that inherits parent track definitions', 'A deprecated feature', 'A JavaScript library'], correctIndex: 1, explanation: 'Subgrid lets a nested grid use the parent grid track definitions.' }
    ],
    topics: [
      { id: 'grid-areas', title: 'Grid Template Areas', content: `**Defining and Using Areas:**
\`\`\`css
.page {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header  header"
    "nav     main    aside"
    "footer  footer  footer";
}
.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
\`\`\`

**Key Takeaways:**
1. Grid areas must form rectangles
2. Use \`.\` for empty cells
3. Responsive layouts are easy — just redefine the template at breakpoints` },
      { id: 'auto-fill-minmax', title: 'Auto-Fill, Auto-Fit, and Minmax', content: `**auto-fill vs auto-fit:**
\`\`\`css
/* auto-fill: preserves empty tracks */
.grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }

/* auto-fit: collapses empty tracks */
.grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
\`\`\`

**Key Takeaways:**
1. \`auto-fit\` stretches items to fill space; \`auto-fill\` keeps empty tracks
2. \`repeat(auto-fit, minmax(250px, 1fr))\` is the most powerful responsive pattern
3. Use \`min(250px, 100%)\` to prevent overflow on small screens` },
      { id: 'named-lines', title: 'Named Grid Lines', content: `**Defining Named Lines:**
\`\`\`css
.container {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [content-start] minmax(0, 800px)
    [content-end] 1fr
    [full-end];
}
.hero { grid-column: full-start / full-end; }
\`\`\`

**Key Takeaways:**
1. Named lines make grid placement self-documenting
2. Lines can have multiple names
3. Named lines and grid areas serve different purposes` }
    ]
  },
  {
    id: 308, slug: 'flexbox-patterns', title: 'Flexbox Patterns',
    description: 'Solve real-world layout problems with common Flexbox patterns for navigation, cards, footers, and more.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Build sticky footers that stick to the bottom', 'Create responsive navigation with Flexbox', 'Implement equal-height cards and columns', 'Control item order and alignment'],
    quiz: [
      { id: 1, question: 'How do you create a sticky footer?', options: ['position: fixed', 'display: flex with flex-direction: column and min-height: 100vh', 'margin-top: auto', 'Both B and C work'], correctIndex: 3, explanation: 'flex-direction: column with min-height: 100vh and margin-top: auto on footer works.' },
      { id: 2, question: 'How do you make Flexbox items wrap?', options: ['flex-wrap: wrap', 'flex-direction: row-wrap', 'flex-grow: wrap', 'display: flex-wrap'], correctIndex: 0, explanation: 'flex-wrap: wrap allows items to wrap to the next line.' },
      { id: 3, question: 'What does the order property do?', options: ['Sorts alphabetically', 'Changes visual order without changing DOM order', 'Controls stacking order', 'Determines tab order'], correctIndex: 1, explanation: 'order changes visual order; screen readers follow DOM order.' }
    ],
    topics: [
      { id: 'sticky-footer', title: 'Sticky Footer Pattern', content: `**The Classic Flexbox Solution:**
\`\`\`css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
main { flex: 1; }
\`\`\`

**Key Takeaways:**
1. \`min-height: 100vh\` + \`flex: 1\` on content = sticky footer
2. Never use \`height: 100vh\` — it clips content
3. Always reset \`margin: 0\` on \`<body>\`` },
      { id: 'nav-patterns', title: 'Navigation Patterns', content: `**Basic Nav Bar:**
\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.nav-links { display: flex; gap: 1.5rem; }
\`\`\`

**Key Takeaways:**
1. Flexbox is ideal for nav bars
2. Use \`gap\` instead of margins for consistent spacing
3. Combine \`flex-wrap\` with media queries for responsive navigation` },
      { id: 'equal-height', title: 'Equal-Height Columns and Cards', content: `**Equal-Height Cards:**
\`\`\`css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card { flex: 1 1 300px; display: flex; flex-direction: column; }
.card-content { flex: 1; }
\`\`\`

**Key Takeaways:**
1. Flexbox makes items stretch to the tallest sibling
2. CSS Grid handles equal-height cards more naturally
3. Use \`flex: 1\` on inner content to push footers down` }
    ]
  },
  {
    id: 309, slug: 'css-variables', title: 'CSS Variables & Custom Properties',
    description: 'Use CSS custom properties for design tokens, theming, dynamic values, and maintainable stylesheets.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Define and use CSS custom properties', 'Create themeable designs with variables', 'Use variables for dynamic calculations', 'Implement dark mode with CSS variables'],
    quiz: [
      { id: 1, question: 'How do you define a CSS custom property?', options: ['--color: blue;', '$color: blue;', 'var(--color, blue);', '@custom --color: blue;'], correctIndex: 0, explanation: 'CSS custom properties use the -- prefix.' },
      { id: 2, question: 'What is the fallback in var(--color, blue)?', options: ['--color', 'blue', 'The default color', 'No fallback'], correctIndex: 1, explanation: 'The second argument is the fallback value.' },
      { id: 3, question: 'Where should global custom properties be defined?', options: ['On each element', ':root pseudo-class', 'In a @media query', 'In @keyframes'], correctIndex: 1, explanation: ':root targets the document root for global variables.' }
    ],
    topics: [
      { id: 'basics', title: 'Defining and Using Variables', content: `**Defining Variables:**
\`\`\`css
:root {
  --color-primary: #007bff;
  --spacing-md: 1rem;
  --font-family: system-ui, sans-serif;
  --border-radius: 8px;
}
\`\`\`

**Using Variables:**
\`\`\`css
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}
\`\`\`

**Key Takeaways:**
1. CSS variables cascade and inherit
2. Define on \`:root\` for global access
3. Always provide fallback values in \`var()\`` },
      { id: 'theming', title: 'Theming with CSS Variables', content: `**Dark Mode Implementation:**
\`\`\`css
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --text-primary: #f1f5f9;
  }
}
body {
  background: var(--bg-primary);
  color: var(--text-primary);
}
\`\`\`

**Key Takeaways:**
1. CSS variables on a parent cascade to all descendants
2. \`prefers-color-scheme: dark\` respects OS settings
3. Component-level variables enable independent theming` },
      { id: 'dynamic', title: 'Dynamic Values with JavaScript', content: `**Reading Variables:**
\`\`\`javascript
const styles = getComputedStyle(document.documentElement);
const color = styles.getPropertyValue('--color-primary').trim();
\`\`\`

**Setting Variables:**
\`\`\`javascript
document.documentElement.style.setProperty('--color-primary', '#10b981');
\`\`\`

**Key Takeaways:**
1. \`setProperty()\` and \`getPropertyValue()\` are the standard API
2. CSS variables enable dynamic styling without inline styles
3. Store user preferences in \`localStorage\`` }
    ]
  },
  {
    id: 310, slug: 'css-animations', title: 'CSS Animations & Transitions',
    description: 'Bring your UI to life with smooth transitions, keyframe animations, and transforms.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Create smooth hover transitions', 'Build complex keyframe animations', 'Use transforms for GPU-accelerated effects', 'Respect user motion preferences'],
    quiz: [
      { id: 1, question: 'What is the difference between transition and animation?', options: ['No difference', 'Transitions require a trigger, animations run automatically', 'Transitions use @keyframes', 'Animations are always smoother'], correctIndex: 1, explanation: 'Transitions animate between two states on trigger; animations run automatically.' },
      { id: 2, question: 'Which property is GPU-accelerated?', options: ['width', 'top', 'transform', 'margin'], correctIndex: 2, explanation: 'transform and opacity are GPU-accelerated.' },
      { id: 3, question: 'What does will-change do?', options: ['Changes element immediately', 'Hints to browser for optimization', 'Forces re-render', 'Prevents changes'], correctIndex: 1, explanation: 'will-change hints to the browser for rendering optimization.' }
    ],
    topics: [
      { id: 'transitions', title: 'CSS Transitions', content: `**Transition Shorthand:**
\`\`\`css
.button {
  background: #007bff;
  transition: background 0.3s ease, transform 0.2s ease;
}
.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}
\`\`\`

**Best Practices:**
- Only transition \`transform\` and \`opacity\` for best performance
- Always define the transition on the default state
- Keep transitions under 300ms

**Key Takeaways:**
1. Always define transitions on the default state
2. Stick to \`transform\` and \`opacity\` for 60fps
3. Keep transitions under 300ms` },
      { id: 'keyframes', title: 'Keyframe Animations', content: `**Defining Keyframes:**
\`\`\`css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card {
  animation: fadeInUp 0.5s ease-out forwards;
}
\`\`\`

**Key Takeaways:**
1. Animations run automatically; transitions require a trigger
2. Always use \`animation-fill-mode: forwards\` to keep the final state
3. Respect \`prefers-reduced-motion\`` },
      { id: 'transforms', title: 'Transforms', content: `**2D Transforms:**
\`\`\`css
.scale   { transform: scale(1.5); }
.rotate  { transform: rotate(45deg); }
.translate { transform: translate(20px, 10px); }
\`\`\`

**3D Transforms:**
\`\`\`css
.card-3d { perspective: 1000px; }
.card-3d-inner {
  transform: rotateY(15deg);
  transform-style: preserve-3d;
}
\`\`\`

**Key Takeaways:**
1. \`transform\` is GPU-accelerated — always prefer it
2. \`transform-origin\` controls the pivot point
3. 3D transforms require \`perspective\` on a parent` }
    ]
  },
  {
    id: 311, slug: 'web-accessibility', title: 'Web Accessibility (WCAG)',
    description: 'Make your web pages usable by everyone — screen readers, keyboard users, and people with disabilities.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Understand WCAG guidelines and principles', 'Implement ARIA roles and attributes correctly', 'Ensure keyboard navigation works throughout', 'Create screen reader-friendly content'],
    quiz: [
      { id: 1, question: 'What are the four principles of WCAG?', options: ['Perceivable, Operable, Understandable, Robust', 'Visible, Clickable, Readable, Accessible', 'Functional, Usable, Accessible, Inclusive', 'Simple, Clear, Fast, Accessible'], correctIndex: 0, explanation: 'WCAG is built on POUR: Perceivable, Operable, Understandable, Robust.' },
      { id: 2, question: 'When should you use aria-hidden="true"?', options: ['On all decorative elements', 'On elements that should be ignored by screen readers', 'On hidden CSS elements', 'On all interactive elements'], correctIndex: 1, explanation: 'aria-hidden="true" tells screen readers to ignore the element.' },
      { id: 3, question: 'What is the purpose of aria-label?', options: ['Add a visible label', 'Provide an accessible name when no visible label exists', 'Hide from screen readers', 'Add a tooltip'], correctIndex: 1, explanation: 'aria-label provides an accessible name when there is no visible text.' }
    ],
    topics: [
      { id: 'wcag', title: 'WCAG Principles', content: `**The Four Principles (POUR):**
1. **Perceivable** — Content must be presentable to all users
2. **Operable** — UI must be operable by all users
3. **Understandable** — Information must be understandable
4. **Robust** — Content must work with assistive technologies

**Key Takeaways:**
1. WCAG AA is the standard target
2. Always provide visible focus indicators
3. Automated tools catch ~30% of issues — manual testing is essential` },
      { id: 'aria', title: 'ARIA Roles and Attributes', content: `**The First Rule of ARIA:**
> Do not use ARIA if you can use a native HTML element instead.

**ARIA States:**
\`\`\`html
<button aria-pressed="false" onclick="toggle(this)">Toggle</button>
<button aria-expanded="false" aria-controls="menu-1">Menu</button>
<div aria-live="polite">3 items in cart</div>
\`\`\`

**Key Takeaways:**
1. Native HTML elements are always preferred over ARIA
2. Always update ARIA states when JavaScript changes the UI
3. Use \`aria-live\` regions for dynamic content` },
      { id: 'keyboard', title: 'Keyboard Navigation', content: `**Essential Keyboard Interactions:**
- Tab → Move focus forward
- Shift+Tab → Move focus backward
- Enter/Space → Activate buttons and links
- Escape → Close modals, menus

**Skip Link:**
\`\`\`css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  z-index: 100;
}
.skip-link:focus { top: 0; }
\`\`\`

**Key Takeaways:**
1. Never remove focus outlines
2. Use \`:focus-visible\` for keyboard-only focus rings
3. Every interactive element must be keyboard accessible` }
    ]
  },
  {
    id: 312, slug: 'semantic-forms', title: 'Semantic Forms',
    description: 'Build accessible, user-friendly forms with proper labeling, validation, fieldsets, and error handling.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Associate labels with inputs correctly', 'Implement accessible form validation', 'Use fieldsets and legends for grouping', 'Handle error messages accessibly'],
    quiz: [
      { id: 1, question: 'How do you associate a label with an input?', options: ['<label>Name:</label> <input>', '<label for="name">Name:</label> <input id="name">', '<div>Name:</div> <input>', '<span>Name:</span> <input>'], correctIndex: 1, explanation: 'The for attribute must match the input id.' },
      { id: 2, question: 'What groups related form controls?', options: ['<div class="group">', '<fieldset> with <legend>', '<section>', '<table>'], correctIndex: 1, explanation: '<fieldset> groups controls and <legend> provides the group label.' },
      { id: 3, question: 'How should errors be announced to screen readers?', options: ['Red border only', 'aria-describedby + role="alert"', 'aria-hidden the error', 'Tooltip'], correctIndex: 1, explanation: 'Link errors via aria-describedby and use role="alert" for immediate announcement.' }
    ],
    topics: [
      { id: 'labels', title: 'Form Labels and Inputs', content: `**Explicit Label Association:**
\`\`\`html
<label for="email">Email Address</label>
<input type="email" id="email" name="email"
  autocomplete="email"
  aria-describedby="email-hint"
  required>
<span id="email-hint">We will never share your email</span>
\`\`\`

**Key Takeaways:**
1. Placeholder text is not a substitute for a label
2. Always use the for/id pattern
3. Add \`autocomplete\` attributes for browser autofill` },
      { id: 'validation', title: 'Accessible Form Validation', content: `**Error Summary:**
\`\`\`html
<div role="alert" aria-labelledby="error-summary" tabindex="-1">
  <h2 id="error-summary">2 errors found</h2>
  <ul>
    <li><a href="#name">Name is required</a></li>
    <li><a href="#email">Email is invalid</a></li>
  </ul>
</div>
\`\`\`

**Key Takeaways:**
1. Link every error via \`aria-describedby\`
2. Use \`role="alert"\` for immediate announcement
3. Show errors inline AND in a summary` },
      { id: 'fieldsets', title: 'Fieldsets and Legends', content: `**Radio Button Groups:**
\`\`\`html
<fieldset>
  <legend>Preferred Contact Method</legend>
  <input type="radio" id="email" name="contact" value="email">
  <label for="email">Email</label>
  <input type="radio" id="phone" name="contact" value="phone">
  <label for="phone">Phone</label>
</fieldset>
\`\`\`

**Key Takeaways:**
1. Every \`<fieldset>\` must have a \`<legend>\`
2. Use fieldsets for radio/checkbox groups
3. Screen readers announce the legend as context` }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  // ADVANCED (313-320)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 313, slug: 'css-architecture', title: 'CSS Architecture',
    description: 'Organize large CSS codebases with BEM, ITCSS, and utility-first methodologies.',
    level: 'advanced', duration: '35 min',
    objectives: ['Apply BEM naming convention correctly', 'Structure CSS with ITCSS layers', 'Evaluate utility-first vs component-based approaches', 'Create scalable, maintainable CSS architecture'],
    quiz: [
      { id: 1, question: 'What does BEM stand for?', options: ['Block, Element, Modifier', 'Base, Extend, Mixin', 'Basic, Element, Module', 'Block, Event, Method'], correctIndex: 0, explanation: 'BEM = Block, Element, Modifier.' },
      { id: 2, question: 'In BEM, what does __ represent?', options: ['Modifier', 'Block', 'Element', 'State'], correctIndex: 2, explanation: 'Double underscore separates block from element.' },
      { id: 3, question: 'What is the ITCSS layer order?', options: ['Settings, Tools, Generic, Elements, Objects, Components, Utilities', 'Generic, Settings, Tools, Elements, Objects, Components, Utilities', 'Settings, Generic, Tools, Elements, Components, Objects, Utilities', 'Tools, Settings, Generic, Elements, Objects, Utilities, Components'], correctIndex: 0, explanation: 'ITCSS layers from generic to specific.' }
    ],
    topics: [
      { id: 'bem', title: 'BEM Naming Convention', content: `**BEM Syntax:**
\`\`\`css
.card { }
.card__title { }
.card__content { }
.card--highlighted { }
\`\`\`

**HTML:**
\`\`\`html
<div class="card card--highlighted">
  <h2 class="card__title card__title--large">Title</h2>
  <p class="card__content">Content</p>
</div>
\`\`\`

**Key Takeaways:**
1. BEM eliminates specificity wars with flat selectors
2. Never nest BEM selectors
3. One block per component` },
      { id: 'itcss', title: 'ITCSS Layer Organization', content: `**The Seven Layers:**
1. **SETTINGS** — Variables, config
2. **TOOLS** — Mixins, functions
3. **GENERIC** — Resets, normalize
4. **ELEMENTS** — Bare HTML elements
5. **OBJECTS** — Layout patterns
6. **COMPONENTS** — UI components
7. **UTILITIES** — Overrides

**Key Takeaways:**
1. ITCSS flows from generic to specific
2. Components should be the bulk of your CSS
3. Utilities are for one-off overrides` },
      { id: 'utility-first', title: 'Utility-First CSS', content: `**Utility vs Component Classes:**
\`\`\`css
/* Traditional */
.card { padding: 1.5rem; border-radius: 8px; }

/* Utility-first */
/* class="p-6 rounded-lg bg-white shadow-md" */
\`\`\`

**When to Use Each:**
- Unique layouts → Utilities
- Repeated patterns → Component class
- One-off overrides → Utilities

**Key Takeaways:**
1. Utility-first eliminates naming debates
2. Extract components when patterns repeat
3. Utilities for one-offs, components for reuse` }
    ]
  },
  {
    id: 314, slug: 'css-advanced-animations', title: 'Advanced CSS Animations',
    description: 'Create immersive experiences with scroll-driven animations, view transitions, and performance-optimized effects.',
    level: 'advanced', duration: '35 min',
    objectives: ['Build scroll-driven animations', 'Implement view transitions for page changes', 'Optimize animations for 60fps', 'Create complex multi-step sequences'],
    quiz: [
      { id: 1, question: 'What is a scroll-driven animation?', options: ['Plays when you scroll past', 'Progress tied to scroll position', 'Creates scrolling effect', 'Triggered by scroll event'], correctIndex: 1, explanation: 'Scroll-driven animations tie progress to scroll position.' },
      { id: 2, question: 'Which property connects animation to scroll?', options: ['animation-timeline', 'animation-scroll', 'scroll-timeline', 'animation-attachment'], correctIndex: 0, explanation: 'animation-timeline: scroll() or view() connects to scroll progress.' },
      { id: 3, question: 'What does view() timeline track?', options: ['Scroll position', 'Element entering/exiting viewport', 'Animation duration', 'User history'], correctIndex: 1, explanation: 'view() tracks when an element enters and exits the viewport.' }
    ],
    topics: [
      { id: 'scroll-driven', title: 'Scroll-Driven Animations', content: `**Basic Scroll Timeline:**
\`\`\`css
.reveal {
  animation: fadeInUp linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
\`\`\`

**Progress Bar:**
\`\`\`css
.progress-bar {
  animation: grow-progress linear;
  animation-timeline: scroll();
}
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
\`\`\`

**Key Takeaways:**
1. \`animation-timeline: scroll()\` ties to scroll position
2. \`animation-timeline: view()\` ties to element visibility
3. Always provide \`prefers-reduced-motion\` fallback` },
      { id: 'view-transitions', title: 'View Transitions API', content: `**SPA View Transitions:**
\`\`\`javascript
async function navigate(newContent) {
  if (!document.startViewTransition) {
    container.innerHTML = newContent;
    return;
  }
  const t = document.startViewTransition(() => {
    container.innerHTML = newContent;
  });
  await t.finished;
}
\`\`\`

**Key Takeaways:**
1. \`document.startViewTransition()\` wraps DOM changes with animations
2. Always provide a fallback
3. Use \`view-transition-name\` for element-level transitions` },
      { id: 'performance', title: 'Animation Performance', content: `**GPU-Accelerated Properties:**
\`\`\`css
/* Good: GPU composited */
.good { animation: fadeSlideIn 0.3s ease; }
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Bad: Layout-triggering */
.bad { animation: moveBad 0.3s ease; }
@keyframes moveBad {
  from { top: 0; }
  to   { top: 20px; }
}
\`\`\`

**Key Takeaways:**
1. Only animate \`transform\` and \`opacity\` for 60fps
2. Use \`will-change\` sparingly
3. Profile with Chrome DevTools Performance panel` }
    ]
  },
  {
    id: 315, slug: 'css-containment', title: 'CSS Containment',
    description: 'Optimize rendering performance with contain and content-visibility for large pages.',
    level: 'advanced', duration: '25 min',
    objectives: ['Apply CSS containment to isolate rendering', 'Use content-visibility for virtualization', 'Understand the contain property values', 'Measure performance improvements'],
    quiz: [
      { id: 1, question: 'What does "contain: layout" do?', options: ['Prevents layout', 'Establishes independent formatting context', 'Makes invisible', 'Freezes layout'], correctIndex: 1, explanation: 'contain: layout creates an independent formatting context.' },
      { id: 2, question: 'What is content-visibility: auto?', options: ['Hides permanently', 'Skips rendering off-screen content', 'Makes read-only', 'Disables JavaScript'], correctIndex: 1, explanation: 'It skips rendering of off-screen elements.' },
      { id: 3, question: 'What does "contain: size" do?', options: ['Constrains to parent size', 'Size is independent of children', 'Resizes children', 'Sets max size'], correctIndex: 1, explanation: 'contain: size means element size does not depend on children.' }
    ],
    topics: [
      { id: 'contain-property', title: 'The Contain Property', content: `**Containment Values:**
\`\`\`css
.container { contain: layout; }
.card { contain: paint; }
.fixed { contain: size; }
.item { contain: layout paint; }
.article { contain: content; }
\`\`\`

**Key Takeaways:**
1. \`contain: layout paint\` is most useful for component isolation
2. Containment does not change visual appearance
3. Use \`contain-intrinsic-size\` with \`content-visibility: auto\`` },
      { id: 'content-visibility', title: 'Content Visibility', content: `**Basic Usage:**
\`\`\`css
.article {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
\`\`\`

**Combined with Containment:**
\`\`\`css
.article {
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;
  contain: layout paint;
}
\`\`\`

**Key Takeaways:**
1. \`content-visibility: auto\` skips off-screen rendering
2. Always provide \`contain-intrinsic-size\`
3. Not suitable for content that must render immediately` }
    ]
  },
  {
    id: 316, slug: 'accessibility-auditing', title: 'Accessibility Auditing',
    description: 'Systematically test and fix accessibility issues using Lighthouse, axe, and manual testing.',
    level: 'advanced', duration: '30 min',
    objectives: ['Run Lighthouse accessibility audits', 'Use axe-core for automated testing', 'Perform manual keyboard and screen reader testing', 'Create an accessibility testing checklist'],
    quiz: [
      { id: 1, question: 'What percentage of issues can automated tools detect?', options: ['About 10%', 'About 30-40%', 'About 70%', 'About 95%'], correctIndex: 1, explanation: 'Automated tools catch ~30-40% of accessibility issues.' },
      { id: 2, question: 'What does axe-core do?', options: ['Redesigns pages', 'Tests pages for WCAG violations', 'Fixes issues automatically', 'Generates reports'], correctIndex: 1, explanation: 'axe-core programmatically tests for WCAG violations.' },
      { id: 3, question: 'Best way to test keyboard accessibility?', options: ['Automated scanner', 'Unplug mouse and navigate with keyboard only', 'Check tabindex in code', 'Use screen reader'], correctIndex: 1, explanation: 'The most reliable test is using keyboard only.' }
    ],
    topics: [
      { id: 'automated', title: 'Automated Testing Tools', content: `**Lighthouse Accessibility Audit:**
Run in Chrome DevTools -> Lighthouse -> Accessibility tab.

**axe-core Integration:**
\`\`\`javascript
axe.run(document, (err, results) => {
  console.log(results.violations);
});
\`\`\`

**Common Issues Detected:**
- Missing alt text
- Low color contrast
- Missing form labels
- Empty links and buttons

**Key Takeaways:**
1. Automated tools catch 30-40% of issues
2. Integrate axe-core into CI/CD
3. Treat every accessibility issue as a bug` },
      { id: 'manual', title: 'Manual Testing Techniques', content: `**Keyboard Test:**
1. Unplug your mouse
2. Tab through every interactive element
3. Verify focus indicators are visible
4. Activate all controls with Enter/Space
5. Close modals with Escape

**Screen Reader Testing:**
- VoiceOver (Mac): Cmd + F5
- NVDA (Windows): Free from nvaccess.org
- JAWS (Windows): Industry standard

**Test Checklist:**
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Focus order is logical
- [ ] No focus traps
- [ ] Heading hierarchy is sequential
- [ ] Touch targets are 44x44px minimum

**Key Takeaways:**
1. Keyboard testing is the single most important test
2. Test with at least two screen readers
3. Test at 200% zoom` }
    ]
  },
  {
    id: 317, slug: 'responsive-typography', title: 'Responsive Typography',
    description: 'Implement fluid type scales, clamp() functions, and modular typography systems.',
    level: 'advanced', duration: '30 min',
    objectives: ['Implement fluid typography with clamp()', 'Create modular type scales', 'Use fluid typography best practices', 'Understand accessibility implications'],
    quiz: [
      { id: 1, question: 'What does clamp(1rem, 2.5vw, 2rem) do?', options: ['Sets to 2.5vw', 'Scales between 1rem and 2rem with viewport', '1rem mobile, 2rem desktop', 'Max 2rem'], correctIndex: 1, explanation: 'clamp(min, preferred, max) scales but never goes below min or above max.' },
      { id: 2, question: 'What is a modular type scale?', options: ['Fixed sizes with mathematical ratio', 'Changes at every breakpoint', 'Uses only rem', 'Adjusts by resolution'], correctIndex: 0, explanation: 'A modular scale uses a fixed ratio to generate harmonious sizes.' },
      { id: 3, question: 'Why is vw-only for font size a problem?', options: ['No browser support', 'Prevents zooming and ignores user preferences', 'Desktop only', 'Causes layout shifts'], correctIndex: 1, explanation: 'Viewport-only units violate accessibility by preventing zoom.' }
    ],
    topics: [
      { id: 'fluid-type', title: 'Fluid Typography with clamp()', content: `**The clamp() Function:**
\`\`\`css
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }
p  { font-size: clamp(1rem, 2.5vw, 1.25rem); }
\`\`\`

**Full Fluid System:**
\`\`\`css
:root {
  --step--1: clamp(0.83rem, 0.80rem + 0.18vw, 1.00rem);
  --step-0:  clamp(1.00rem, 0.93rem + 0.35vw, 1.25rem);
  --step-1:  clamp(1.20rem, 1.07rem + 0.63vw, 1.56rem);
  --step-2:  clamp(1.44rem, 1.24rem + 1.02vw, 1.95rem);
  --step-3:  clamp(1.73rem, 1.43rem + 1.55vw, 2.44rem);
  --step-4:  clamp(2.07rem, 1.64rem + 2.26vw, 3.05rem);
}
h1 { font-size: var(--step-4); }
p  { font-size: var(--step-0); }
\`\`\`

**Key Takeaways:**
1. \`clamp(min, preferred, max)\` creates fluid typography
2. Always use \`rem\` as minimum for accessibility
3. Never use viewport-only units for fonts` },
      { id: 'modular-scale', title: 'Modular Type Scales', content: `**Common Ratios:**
- Major Third: 1.250
- Perfect Fourth: 1.333
- Augmented Fourth: 1.414
- Perfect Fifth: 1.500

**Key Takeaways:**
1. A modular scale creates visual harmony
2. Perfect Fourth (1.333) is the most versatile ratio
3. Combine modular scales with fluid typography` }
    ]
  },
  {
    id: 318, slug: 'css-houdini', title: 'CSS Houdini',
    description: 'Extend CSS with the Paint API, Layout API, and other Houdini specs for custom rendering.',
    level: 'advanced', duration: '30 min',
    objectives: ['Understand CSS Houdini APIs', 'Create custom paint worklets', 'Build custom layout algorithms', 'Know when to use Houdini vs traditional CSS'],
    quiz: [
      { id: 1, question: 'What is the CSS Paint API?', options: ['Paints canvas elements', 'Defines custom CSS paint() functions in JavaScript', 'Creates gradients', 'Print rendering'], correctIndex: 1, explanation: 'The Paint API lets you create custom painting functions for CSS.' },
      { id: 2, question: 'What is the main limitation of CSS Houdini?', options: ['Firefox only', 'Limited browser support — not in Safari', 'Requires server', 'Cannot use CSS variables'], correctIndex: 1, explanation: 'Houdini has limited browser support, especially in Safari.' },
      { id: 3, question: 'What does @property do?', options: ['Defines HTML element', 'Registers custom CSS property with type and initial value', 'Creates animation', 'Imports JS module'], correctIndex: 1, explanation: '@property registers a custom property with type, value, and inheritance.' }
    ],
    topics: [
      { id: 'paint-api', title: 'The Paint API', content: `**Creating a Paint Worklet:**
\`\`\`javascript
class CheckerboardPainter {
  static get inputProperties() {
    return ['--checker-size'];
  }
  paint(ctx, size, props) {
    const s = parseInt(props.get('--checker-size')) || 20;
    for (let y = 0; y < size.height; y += s) {
      for (let x = 0; x < size.width; x += s) {
        ctx.fillStyle = (x/s + y/s) % 2 === 0 ? '#eee' : '#ddd';
        ctx.fillRect(x, y, s, s);
      }
    }
  }
}
registerPaint('checkerboard', CheckerboardPainter);
\`\`\`

**Key Takeaways:**
1. The Paint API creates custom CSS paint functions
2. Always provide fallback backgrounds
3. Use \`@property\` to register custom properties` },
      { id: 'property-api', title: '@property and Typed Custom Properties', content: `**Without @property:**
\`\`\`css
:root { --progress: 0; }
.progress {
  background: conic-gradient(#007bff calc(var(--progress) * 1%), #eee 0);
  transition: --progress 0.3s; /* Does NOT work */
}
\`\`\`

**With @property:**
\`\`\`css
@property --progress {
  syntax: '<number>';
  initial-value: 0;
  inherits: false;
}
.progress {
  --progress: 0;
  background: conic-gradient(#007bff calc(var(--progress) * 1%), #eee 0);
  transition: --progress 0.3s; /* Now works! */
}
\`\`\`

**Key Takeaways:**
1. \`@property\` enables transitions on custom properties
2. Always specify the correct \`syntax\` type
3. Use for animated gradients and counters` }
    ]
  },
  {
    id: 319, slug: 'view-transitions-api', title: 'View Transitions API',
    description: 'Build seamless page transitions and shared element animations for SPAs and MPAs.',
    level: 'advanced', duration: '30 min',
    objectives: ['Implement view transitions in SPAs', 'Use view transitions in MPAs', 'Create shared element transitions', 'Provide graceful degradation'],
    quiz: [
      { id: 1, question: 'What is the View Transitions API?', options: ['Page transition library', 'Browser API for animated transitions between DOM states', 'CSS-only technique', 'JavaScript router'], correctIndex: 1, explanation: 'A browser-native feature that animates between old and new states.' },
      { id: 2, question: 'How do you enable MPA transitions?', options: ['<meta name="view-transition" content="same-origin">', 'document.startViewTransition()', 'view-transition: enable', 'Enabled by default'], correctIndex: 0, explanation: 'Add the meta tag to opt in to cross-document transitions.' },
      { id: 3, question: 'How do you create shared element transitions?', options: ['view-transition-name on both elements', 'animation-timeline: view()', 'CSS contain', 'shared-element attribute'], correctIndex: 0, explanation: 'Assign the same view-transition-name to old and new elements.' }
    ],
    topics: [
      { id: 'spa-transitions', title: 'SPA View Transitions', content: `**Basic Usage:**
\`\`\`javascript
async function navigate(renderFn) {
  if (!document.startViewTransition) {
    renderFn();
    return;
  }
  const t = document.startViewTransition(() => renderFn());
  await t.finished;
}
\`\`\`

**Named Transitions:**
\`\`\`html
<img src="photo.jpg" style="view-transition-name: hero">
\`\`\`

**Key Takeaways:**
1. \`document.startViewTransition()\` wraps DOM changes with animations
2. Use \`view-transition-name\` for shared elements
3. Always check for API support` },
      { id: 'mpa-transitions', title: 'MPA View Transitions', content: `**Enabling:**
\`\`\`html
<meta name="view-transition" content="same-origin">
\`\`\`

**Navigation Types:**
\`\`\`css
:active-view-transition-type(navigate-back) {
  ::view-transition-old(root) {
    animation-name: slide-out-right;
  }
}
\`\`\`

**Key Takeaways:**
1. MPA transitions require a meta tag opt-in
2. \`view-transition-name\` must be consistent across pages
3. Use \`active-view-transition-type()\` for different styles` }
    ]
  },
  {
    id: 320, slug: 'modern-css-features', title: 'Modern CSS Features',
    description: 'Stay current with container queries, :has(), nesting, and other cutting-edge CSS capabilities.',
    level: 'advanced', duration: '35 min',
    objectives: ['Use container queries for component-level responsiveness', 'Leverage :has() for parent selection', 'Write native CSS nesting', 'Understand the latest CSS features'],
    quiz: [
      { id: 1, question: 'What are container queries?', options: ['Check viewport size', 'Check parent container size instead of viewport', 'Run server JavaScript', 'Check device type'], correctIndex: 1, explanation: 'Container queries check the nearest container size, not the viewport.' },
      { id: 2, question: 'What does :has() do that was impossible before?', options: ['Select parent of element', 'Select by DOM position', 'Animate properties', 'Create layouts'], correctIndex: 0, explanation: ':has() is the parent selector — selects parents based on children.' },
      { id: 3, question: 'What is native CSS nesting?', options: ['Sass feature', 'Nesting selectors with & in native CSS', 'Nesting HTML', 'JS API'], correctIndex: 1, explanation: 'Native CSS nesting uses & to nest selectors, like Sass.' }
    ],
    topics: [
      { id: 'container-queries', title: 'Container Queries', content: `**Defining a Container:**
\`\`\`css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
\`\`\`

**Querying the Container:**
\`\`\`css
.card {
  display: flex;
  flex-direction: column;
}
@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
\`\`\`

**Container Query Units:**
\`\`\`css
.card {
  padding: 2cqi;
  font-size: clamp(1rem, 3cqi, 1.5rem);
}
\`\`\`

**Key Takeaways:**
1. Container queries check parent container size, not viewport
2. Use \`container-type: inline-size\` on the parent
3. Container queries and media queries serve different purposes` },
      { id: 'has-selector', title: 'The :has() Selector', content: `**Basic Usage:**
\`\`\`css
.card:has(img) { grid-template-rows: 200px 1fr; }
.form-group:has(input:invalid) { border-color: red; }
label:has(+ input:checked) { color: green; }
\`\`\`

**Replacing JavaScript:**
\`\`\`css
/* Before: JS class toggling */
.form:has(:focus) { box-shadow: 0 0 0 2px blue; }
\`\`\`

**Key Takeaways:**
1. \`:has()\` selects parents based on children
2. Use it to replace JavaScript class toggling
3. Keep :has() selectors simple` },
      { id: 'nesting', title: 'Native CSS Nesting', content: `**Basic Nesting:**
\`\`\`css
.card {
  padding: 1.5rem;
  &__title { font-size: 1.5rem; }
  &__content { margin-top: 1rem; }
  &--highlighted { border: 2px solid blue; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
}
\`\`\`

**Nesting with Media Queries:**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
\`\`\`

**Key Takeaways:**
1. Native CSS nesting eliminates preprocessor dependency
2. Use \`&\` for parent reference
3. Limit nesting to 2-3 levels` }
    ]
  },
  {
    id: 321, slug: 'css-container-queries', title: 'CSS Container Queries',
    description: 'Build truly responsive components that adapt to their container size rather than the viewport.',
    level: 'advanced', duration: '35 min',
    objectives: ['Use container queries for responsive components', 'Define named containers', 'Apply style queries for theming', 'Choose container vs media queries'],
    quiz: [
      { id: 1, question: 'What does container-type: inline-size do?', options: ['Makes the element a container for inline-size queries only', 'Creates a square container', 'Enables media queries', 'Disables the element'], correctIndex: 0, explanation: 'container-type: inline-size creates a containment context that responds to inline-size (width) changes.' },
      { id: 2, question: 'What is the difference between @container and @media?', options: ['No difference', '@container checks parent size, @media checks viewport size', '@container is faster', '@media is deprecated'], correctIndex: 1, explanation: '@container queries the nearest containment context, while @media queries the viewport.' },
      { id: 3, question: 'Which container query unit is 1% of the container height?', options: ['cqw', 'cqh', 'cqi', 'cqb'], correctIndex: 1, explanation: 'cqh stands for container query height — 1% of the container height.' }
    ],
    topics: [
      { id: 'container-basics', title: 'Defining and Querying Containers', content: `**Defining a Container:**
\`\`\`css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
\`\`\`

**Querying the Container:**
\`\`\`css
@container card (min-width: 500px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
\`\`\`

**Container Query Units:**
\`\`\`css
.card {
  padding: 2cqi;
  font-size: clamp(1rem, 3cqi, 1.5rem);
  gap: 1cqb;
}
\`\`\`

**Container Types:**
- inline-size: responds to width changes (most common)
- size: responds to both width and height
- normal: not a container

**Best Practices:**
- Always set container-type on the parent, not the element itself
- Use container-name to target specific containers
- Prefer inline-size over size for most use cases

**Key Takeaways:**
1. container-type creates a containment context for querying
2. container-name lets you target specific containers
3. Container units (cqw, cqh) scale relative to the container` },
      { id: 'container-breakpoints', title: 'Container Query Breakpoints', content: `**Responsive Component Layout:**
\`\`\`css
.card { display: flex; flex-direction: column; }

@container (min-width: 400px) {
  .card { flex-direction: row; gap: 1rem; }
}

@container (min-width: 700px) {
  .card { flex-direction: row; padding: 1.5rem; }
}
\`\`\`

**Named Container Breakpoints:**
\`\`\`css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (max-width: 300px) {
  .nav-list { flex-direction: column; }
}
\`\`\`

**Key Takeaways:**
1. Use multiple breakpoints for progressive enhancement
2. Name containers when you have nested containment contexts
3. Keep breakpoints simple and content-driven` },
      { id: 'style-queries', title: 'Style Queries and Theming', content: `**Basic Style Query:**
\`\`\`css
.card-wrapper {
  --variant: default;
}

@container style(--variant: highlighted) {
  .card {
    background: #e8f5e9;
    border: 2px solid #4caf50;
  }
}
\`\`\`

**Theming with Style Queries:**
\`\`\`css
.component {
  --theme: light;
}

@container style(--theme: dark) {
  .component {
    background: #1a1a2e;
    color: #e0e0e0;
  }
}
\`\`\`

**Key Takeaways:**
1. Style queries check custom property values on containers
2. Still has limited browser support — check before using
3. Style queries enable component-level theming without JS` },
      { id: 'container-vs-media', title: 'Container vs Media Queries', content: `**When to Use Container Queries:**
\`\`\`css
/* Component adapts to its parent, not the viewport */
@container (min-width: 500px) {
  .sidebar-card { display: flex; }
}
\`\`\`

**When to Use Media Queries:**
\`\`\`css
/* Page-level layout changes */
@media (min-width: 1024px) {
  .page-layout { grid-template-columns: 250px 1fr; }
}
\`\`\`

**Decision Guide:**
- Component reusable in different contexts → container query
- Page layout or viewport-dependent → media query
- Sidebar/widget behavior → container query
- Overall page structure → media query

**Key Takeaways:**
1. Container queries for component-level responsiveness
2. Media queries for page-level layout changes
3. Use both together for complete responsive design` }
    ]
  },
  {
    id: 322, slug: 'css-has-selector', title: 'CSS :has() Selector',
    description: 'Select parent elements based on their children with the powerful :has() pseudo-class.',
    level: 'advanced', duration: '30 min',
    objectives: ['Style parent elements based on children', 'Replace JS with CSS :has()', 'Handle form states with :has()', 'Understand :has() performance implications'],
    quiz: [
      { id: 1, question: 'What does .card:has(img) select?', options: ['The img inside .card', 'The .card that contains an img', 'All imgs', 'The parent of .card'], correctIndex: 1, explanation: ':has() selects the parent element that matches the condition — in this case, .card elements containing an img.' },
      { id: 2, question: 'What does label:has(+ input:checked) select?', options: ['The checked input', 'The label adjacent to a checked input', 'All labels', 'The form'], correctIndex: 1, explanation: ':has() with the + combinator selects labels immediately followed by a checked input.' },
      { id: 3, question: 'Which is a valid use of :has()?', options: ['.parent:has(.child)', '.parent > :has(.child)', ':has(.parent)', 'None of the above'], correctIndex: 0, explanation: '.parent:has(.child) selects .parent elements that have a .child descendant.' }
    ],
    topics: [
      { id: 'has-syntax', title: ':has() Syntax and Combinators', content: `**Basic :has() Usage:**
\`\`\`css
/* Parent with specific child */
.card:has(img) { grid-template-rows: 200px 1fr; }

/* Sibling selection */
label:has(+ input:checked) { color: green; }

/* Multiple conditions */
.form:has(input:invalid):has(button) { border-color: red; }
\`\`\`

**Combinators Inside :has():**
\`\`\`css
/* Descendant */
section:has(.highlight) { background: yellow; }

/* Child */
ul:has(> li.active) { border-left: 3px solid blue; }

/* Adjacent sibling */
h2:has(+ p.lead) { margin-bottom: 0.5rem; }
\`\`\`

**Key Takeaways:**
1. :has() selects parents based on descendants
2. All CSS combinators work inside :has()
3. :has() can take comma-separated conditions` },
      { id: 'has-parent', title: 'Parent Selection Patterns', content: `**Card Layouts:**
\`\`\`css
/* Card with image gets different layout */
.card:has(img) {
  display: grid;
  grid-template-rows: auto 1fr;
}

/* Card without image uses different padding */
.card:not(:has(img)) {
  padding: 2rem;
  display: flex;
  align-items: center;
}
\`\`\`

**Navigation Styling:**
\`\`\`css
/* Highlight nav item when dropdown is open */
.nav-item:has(.dropdown.active) {
  background: rgba(255,255,255,0.1);
  border-bottom: 2px solid white;
}
\`\`\`

**Key Takeaways:**
1. Use :has() to style parent containers based on content
2. Combine with :not(:has()) for alternate layouts
3. Useful for empty-state detection without JS` },
      { id: 'has-forms', title: 'Form State Styling', content: `**Form Validation Styling:**
\`\`\`css
/* Highlight entire form group when input is invalid */
.form-group:has(input:invalid) {
  border-color: #e53e3e;
  background: #fff5f5;
}

/* Show error state on the wrapper */
.field-wrapper:has(.error) {
  margin-bottom: 1.5rem;
}
\`\`\`

**Interactive Form Patterns:**
\`\`\`css
/* Style submit button when form is complete */
.form:has(input:valid):has(textarea:not(:placeholder-shown)) {
  .submit-btn {
    background: #4caf50;
    cursor: pointer;
  }
}
\`\`\`

**Key Takeaways:**
1. :has() eliminates the need for JS validation styling
2. Combine with :invalid, :valid, :placeholder-shown for form states
3. Style the entire form group, not just individual inputs` },
      { id: 'has-performance', title: ':has() Performance and Browser Support', content: `**Browser Support:**
- Chrome 105+
- Firefox 121+
- Safari 15.4+
- Edge 105+

**Performance Considerations:**
\`\`\`css
/* Prefer: simple :has() with direct child */
.form:has(> input:invalid) { ... }

/* Avoid: complex nested :has() */
.page:has(.content .sidebar .widget .highlight) { ... }
\`\`\`

**Best Practices:**
- Keep :has() selectors simple and shallow
- Avoid deeply nested :has() conditions
- Use feature queries for progressive enhancement
- Test performance on lower-end devices

**Key Takeaways:**
1. :has() is well-supported in modern browsers
2. Keep :has() selectors simple for best performance
3. Use @supports for progressive enhancement` }
    ]
  },
  {
    id: 323, slug: 'html-dialog-popover', title: 'Dialog & Popover APIs',
    description: 'Build accessible dialogs and popovers using native HTML APIs without JavaScript frameworks.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Build accessible dialogs with <dialog>', 'Implement popovers without JS', 'Handle focus management', 'Add animations to dialogs'],
    quiz: [
      { id: 1, question: 'What is the difference between show() and showModal()?', options: ['No difference', 'show() is non-modal, showModal() is modal with backdrop', 'showModal() is for popovers', 'show() blocks the page'], correctIndex: 1, explanation: 'show() opens a non-modal dialog, while showModal() creates a modal dialog with a backdrop and focus trap.' },
      { id: 2, question: 'What pseudo-element styles the dialog backdrop?', options: ['::before', '::after', '::backdrop', ':backdrop'], correctIndex: 2, explanation: '::backdrop is the pseudo-element that styles the modal overlay behind the dialog.' },
      { id: 3, question: 'How do you close a <dialog>?', options: ['dialog.close()', 'dialog.style.display = none', 'dialog.remove()', 'All of the above'], correctIndex: 0, explanation: 'dialog.close() is the proper API method to close a dialog element.' }
    ],
    topics: [
      { id: 'dialog-basics', title: '<dialog> Element and Methods', content: `**Creating a Dialog:**
\`\`\`html
<dialog id="my-dialog">
  <h2>Confirm Action</h2>
  <p>Are you sure you want to proceed?</p>
  <button id="cancel">Cancel</button>
  <button id="confirm">Confirm</button>
</dialog>
\`\`\`

**Opening and Closing:**
\`\`\`javascript
const dialog = document.getElementById('my-dialog');

// Non-modal: allows interaction with page
dialog.show();

// Modal: blocks page, adds backdrop
dialog.showModal();

// Close
dialog.close();
\`\`\`

**Close on Backdrop Click:**
\`\`\`javascript
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});
\`\`\`

**Key Takeaways:**
1. show() is non-modal, showModal() is modal with backdrop
2. Always provide a way to close the dialog
3. Clicking the backdrop should close modal dialogs` },
      { id: 'dialog-backdrop', title: '::backdrop and Dialog Styling', content: `**Styling the Backdrop:**
\`\`\`css
dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

dialog {
  border: none;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 500px;
}
\`\`\`

**Dialog Animations:**
\`\`\`css
dialog {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.3s, transform 0.3s;
}

dialog[open] {
  opacity: 1;
  transform: scale(1);
}

dialog::backdrop {
  opacity: 0;
  transition: opacity 0.3s;
}

dialog[open]::backdrop {
  opacity: 1;
}
\`\`\`

**Key Takeaways:**
1. ::backdrop targets the modal overlay behind the dialog
2. Use [open] attribute to animate dialog entrance
3. Always reset default dialog border and padding` },
      { id: 'popover-api', title: 'Popover API', content: `**Creating a Popover:**
\`\`\`html
<button popovertarget="my-popover">Toggle</button>
<div popover id="my-popover">
  <p>Popover content</p>
</div>
\`\`\`

**Popover States:**
\`\`\`css
[popover] {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

[popover]:popover-open {
  opacity: 1;
  transform: translateY(0);
}
\`\`\`

**Key Takeaways:**
1. popover attribute makes any element a popover
2. Popovers are non-modal and dismissible
3. No JavaScript needed for basic show/hide behavior` },
      { id: 'dialog-accessibility', title: 'Accessibility and Focus Trapping', content: `**Focus Management:**
\`\`\`html
<dialog aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <h2 id="dialog-title">Delete Item?</h2>
  <p id="dialog-desc">This action cannot be undone.</p>
  <button autofocus>Cancel</button>
  <button>Delete</button>
</dialog>
\`\`\`

**Focus Trap Pattern:**
\`\`\`javascript
dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusable = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
\`\`\`

**Best Practices:**
- Use autofocus attribute on the first focusable element
- Trap Tab key inside modal dialogs
- Close on Escape key (built-in with <dialog>)
- Use aria-labelledby and aria-describedby for screen readers

**Key Takeaways:**
1. Always trap focus inside modal dialogs
2. The first interactive element should receive focus on open
3. Use aria-labelledby and aria-describedby for screen reader context` }
    ]
  },
  {
    id: 324, slug: 'modern-css-layout', title: 'Modern CSS Layout',
    description: 'Master subgrid, cascade layers, color-mix, and other modern CSS layout and theming features.',
    level: 'advanced', duration: '40 min',
    objectives: ['Use subgrid for nested layouts', 'Organize CSS with cascade layers', 'Apply color-mix() for themes', 'Use @scope for component isolation'],
    quiz: [
      { id: 1, question: 'What does subgrid do?', options: ['Creates a new grid', 'Allows child grid to inherit parent track definitions', 'Breaks grid into sub-grids', 'Disables grid'], correctIndex: 1, explanation: 'Subgrid lets a child grid use the parent grid track definitions for alignment.' },
      { id: 2, question: 'What is the purpose of @layer?', options: ['Define media queries', 'Control CSS specificity and cascade order', 'Create animations', 'Define fonts'], correctIndex: 1, explanation: '@layer controls the cascade order, allowing you to organize CSS into layers with predictable specificity.' },
      { id: 3, question: 'What does color-mix() do?', options: ['Mixes two colors', 'Creates color palettes automatically', 'Converts color formats', 'Applies gradients'], correctIndex: 0, explanation: 'color-mix() blends two colors in a specified color space.' }
    ],
    topics: [
      { id: 'subgrid', title: 'Subgrid for Nested Alignment', content: `**Basic Subgrid:**
\`\`\`css
.parent {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.child {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}
\`\`\`

**Column Subgrid Only:**
\`\`\`css
.card-row {
  display: grid;
  grid-template-columns: 200px 1fr 100px;
}

.card-row > .card {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}
\`\`\`

**Key Takeaways:**
1. Subgrid inherits parent track sizes instead of defining new ones
2. Use subgrid for consistent alignment across sibling elements
3. You can subgrid in one dimension only (columns or rows)` },
      { id: 'cascade-layers', title: 'Cascade Layers (@layer)', content: `**Defining Layers:**
\`\`\`css
@layer base, components, utilities;

@layer base {
  body { font-family: system-ui; margin: 0; }
  h1 { font-size: 2rem; }
}

@layer components {
  .card { padding: 1.5rem; border: 1px solid #ddd; }
}

@layer utilities {
  .hidden { display: none; }
  .sr-only { position: absolute; clip: rect(0,0,0,0); }
}
\`\`\`

**Unlayered Styles:**
\`\`\`css
/* Unlayered styles always win over layered ones */
.special { color: red !important; }
\`\`\`

**Key Takeaways:**
1. @layer defines the order — first declared = lowest priority
2. Unlayered styles always win over layered styles
3. Layers make specificity predictable and organized` },
      { id: 'color-mix', title: 'Color-mix() and Relative Colors', content: `**Basic color-mix():**
\`\`\`css
.btn-primary {
  background: color-mix(in srgb, #007bff 70%, black);
}
.btn-secondary {
  background: color-mix(in srgb, #007bff 30%, white);
}
\`\`\`

**Relative Color Syntax:**
\`\`\`css
:root {
  --primary: oklch(60% 0.2 250);
  --primary-light: oklch(from var(--primary) calc(l + 0.15) c h);
  --primary-dark: oklch(from var(--primary) calc(l - 0.15) c h);
}
\`\`\`

**Light-dark() Function:**
\`\`\`css
body {
  background: light-dark(#ffffff, #1a1a2e);
  color: light-dark(#212529, #e0e0e0);
}
\`\`\`

**Key Takeaways:**
1. color-mix() blends two colors in a specified color space
2. Relative color syntax derives new colors from existing ones
3. light-dark() simplifies dark mode theming` },
      { id: 'scope', title: 'CSS @scope for Isolation', content: `**Basic @scope:**
\`\`\`css
@scope (.card) {
  p { line-height: 1.6; }
  a { color: blue; }
}
\`\`\`

**Scoped with To:**
\`\`\`css
@scope (.card) to (.card-footer) {
  p { font-size: 1rem; }
  /* Does NOT affect .card-footer descendants */
}
\`\`\`

**Why @scope Matters:**
\`\`\`css
/* Without @scope: styles leak everywhere */
.card p { ... }

/* With @scope: styles are isolated */
@scope (.card) {
  p { ... } /* Only targets .card descendants */
}
\`\`\`

**Key Takeaways:**
1. @scope limits styles to a specific DOM subtree
2. Use scope-to for excluding nested regions
3. @scope prevents style leakage between components` }
    ]
  },
  {
    id: 325, slug: 'css-anchor-positioning', title: 'CSS Anchor Positioning',
    description: 'Position elements relative to other elements using the modern Anchor Positioning API.',
    level: 'advanced', duration: '35 min',
    objectives: ['Position elements relative to anchors', 'Build tooltips without JS', 'Handle positioning fallbacks', 'Understand anchor positioning browser support'],
    quiz: [
      { id: 1, question: 'How do you define an anchor element?', options: ['anchor-name on the positioned element', 'anchor-name on the anchor element', 'position-anchor on both', 'data-anchor attribute'], correctIndex: 1, explanation: 'anchor-name is set on the anchor element to make it referenceable.' },
      { id: 2, question: 'What does anchor() function do?', options: ['Creates an anchor element', 'Returns a position relative to the anchor', 'Defines anchor behavior', 'Styles the anchor'], correctIndex: 1, explanation: 'anchor() returns a position value (like top, bottom, left, right) relative to the anchor element.' },
      { id: 3, question: 'What are position try rules for?', options: ['Defining anchor positions', 'Providing fallback positions when preferred position overflows', 'Trying different anchors', 'Testing positions'], correctIndex: 1, explanation: 'position-try defines fallback positions that the browser tries if the preferred position causes overflow.' }
    ],
    topics: [
      { id: 'anchor-basics', title: 'Defining Anchors and Positioning', content: `**Defining an Anchor:**
\`\`\`css
.trigger {
  anchor-name: --my-button;
}
\`\`\`

**Positioning Relative to Anchor:**
\`\`\`css
.tooltip {
  position: fixed;
  position-anchor: --my-button;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}
\`\`\`

**Anchor Functions:**
\`\`\`css
.tooltip {
  top: anchor(bottom);
  bottom: anchor(top);
  left: anchor(right);
  right: anchor(left);
  center: anchor(center);
}
\`\`\`

**Key Takeaways:**
1. Set anchor-name on the anchor element
2. Use position-anchor on the positioned element
3. anchor() functions reference the anchor's edges` },
      { id: 'tooltips', title: 'Building Tooltips with Anchor Positioning', content: `**Basic Tooltip:**
\`\`\`html
<button style="anchor-name: --btn">Hover me</button>
<div class="tooltip" style="position-anchor: --btn">
  Tooltip content
</div>
\`\`\`

**Styled Tooltip:**
\`\`\`css
.tooltip {
  position: fixed;
  position-anchor: --btn;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
  background: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip:popover-open {
  opacity: 1;
}
\`\`\`

**Key Takeaways:**
1. Combine anchor positioning with Popover API
2. Use translate for centering adjustments
3. Tooltips become pure CSS with no JavaScript needed` },
      { id: 'fallbacks', title: 'Position Fallbacks and Try Rules', content: `**Position Try Rules:**
\`\`\`css
.tooltip {
  position: fixed;
  position-anchor: --btn;
  top: anchor(bottom);
  left: anchor(center);

  position-try-fallbacks: flip-block, flip-inline;
}
\`\`\`

**Defining Custom Try Positions:**
\`\`\`css
@position-try --above {
  bottom: anchor(top);
  top: auto;
}

.tooltip {
  position-try-fallbacks: --above;
}
\`\`\`

**Key Takeaways:**
1. position-try-fallbacks defines alternative positions
2. flip-block and flip-inline are common built-in fallbacks
3. Custom @position-try rules give full control over fallbacks` },
      { id: 'anchor-support', title: 'Browser Support and Polyfills', content: `**Browser Support:**
- Chrome 125+
- Firefox: behind a flag (as of 2026)
- Safari: partial support
- Edge 125+

**Feature Query:**
\`\`\`css
@supports (position-anchor: --anchor) {
  .tooltip {
    position: fixed;
    position-anchor: --btn;
    top: anchor(bottom);
  }
}
\`\`\`

**Graceful Degradation:**
\`\`\`css
/* Fallback for browsers without support */
.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

@supports (position-anchor: --anchor) {
  .tooltip {
    position: fixed;
    position-anchor: --btn;
    top: anchor(bottom);
    left: anchor(center);
    transform: translateX(-50%);
  }
}
\`\`\`

**Key Takeaways:**
1. Check browser support with @supports before using
2. Always provide a fallback positioning strategy
3. Anchor positioning eliminates JS tooltip libraries` }
    ]
  }
];

import { Lesson } from '../models/lesson.model';

export const VUE_LESSONS: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // VUE BEGINNER (501-505)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 501, slug: 'vue-introduction', title: 'Introduction to Vue',
    description: 'Get started with Vue — the progressive JavaScript framework for building user interfaces.',
    level: 'beginner', duration: '30 min',
    objectives: ['Understand what Vue is and its core philosophy', 'Learn the Composition API basics', 'Create Single File Components (SFCs)', 'Set up a Vue project with Vite'],
    topics: [
      { id: 'what-is-vue', title: 'What is Vue?', content: `**What is Vue?**

Vue (pronounced /vjuː/, like "view") is a progressive JavaScript framework for building user interfaces. Unlike monolithic frameworks, Vue is designed to be incrementally adoptable.

**Core Philosophy:**
- **Approachable** — familiar HTML-based template syntax
- **Versatile** — works as a library or a full-featured framework
- **Performant** — lightweight runtime (~16KB gzipped) with an efficient reactivity system

**How Vue Compares:**
- **vs React**: Vue uses an HTML-based template system; React uses JSX
- **vs Angular**: Vue is lighter weight with a simpler learning curve
- **Vue 3** uses the Composition API as the primary API style

**The Vue Ecosystem:**
- \`vue\` — Core library
- \`@vue/compiler-sfc\` — Compiles Single File Components
- \`vite\` — Recommended build tool (lightning-fast HMR)
- \`vue-router\` — Official routing solution
- \`pinia\` — Official state management

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
</script>

<template>
  <h1>{{ message }}</h1>
</template>
\`\`\`

**Key Takeaways:**
1. Vue is a progressive framework — adopt incrementally as needed
2. Vue 3 defaults to the Composition API with \`<script setup>\`
3. Vite is the recommended build tool for modern Vue projects` },
      { id: 'composition-api', title: 'Composition API', content: `**What is the Composition API?**

The Composition API is Vue 3's primary way to organize component logic. It groups code by function rather than by option type (data, methods, computed, etc.), making it easier to extract and reuse logic.

**Core Functions:**
- \`ref()\` — Creates a reactive primitive or object reference
- \`reactive()\` — Creates a deep reactive object
- \`computed()\` — Derives reactive values from other reactive state
- \`watch()\` — Side effects when reactive dependencies change
- \`onMounted()\` — Lifecycle hook after the component is mounted

**Step-by-Step Guide:**
1. Import \`ref\` from \`vue\`
2. Create reactive state with \`ref(initialValue)\`
3. Access values via \`.value\` in script, but auto-unwrapped in templates
4. Use \`computed()\` for derived state
5. Return or use \`<script setup>\` to auto-expose to the template

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

function updateName(newFirst: string) {
  firstName.value = newFirst
}
</script>

<template>
  <input v-model="firstName" placeholder="First name" />
  <input v-model="lastName" placeholder="Last name" />
  <p>Full name: {{ fullName }}</p>
</template>
\`\`\`

**Best Practices:**
- Prefer \`<script setup>\` for cleaner, more concise syntax
- Keep related reactive state and logic together
- Extract reusable logic into composables
- Use \`ref\` for primitives, \`reactive\` for complex objects

**Key Takeaways:**
1. Composition API organizes code by logical concern, not option type
2. \`<script setup>\` is the recommended syntax for Vue 3 SFCs
3. Composables enable powerful logic reuse across components` },
      { id: 'sfc', title: 'Single File Components (SFCs)', content: `**What are Single File Components?**

A Single File Component (SFC) is a Vue file with a \`.vue\` extension that encapsulates template, logic, and styles in one file. Vue's compiler processes these into optimized JavaScript.

**SFC Sections:**
- \`<script setup>\` — Component logic (Composition API)
- \`<template>\` — HTML markup with Vue directives
- \`<style>\` — Scoped or global CSS

**How Vite Processes SFCs:**
1. Vite detects the \`.vue\` import
2. \`@vue/compiler-sfc\` parses the file
3. \`<script>\` is compiled to a render function
4. \`<template>\` is compiled to optimized virtual DOM nodes
5. \`<style>\` is injected (scoped by default with \`<style scoped>\`)

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string }>()

const count = ref(0)
</script>

<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<style scoped>
.counter {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin-top: 0.5rem;
}
</style>
\`\`\`

**Best Practices:**
- Use \`<style scoped>\` to avoid CSS leakage between components
- Use \`lang="ts"\` in \`<script>\` for TypeScript support
- Keep templates declarative — avoid complex logic in templates
- Use \`defineProps\` and \`defineEmits\` for type-safe component APIs

**Key Takeaways:**
1. SFCs encapsulate template, logic, and styles in a single \`.vue\` file
2. \`<script setup>\` is syntactic sugar that simplifies the Composition API
3. Scoped styles prevent CSS leakage between components` },
      { id: 'project-setup', title: 'Project Setup with Vite', content: `**Setting Up a Vue Project**

Vite is the official and recommended build tool for Vue 3. It provides instant server start, lightning-fast HMR, and optimized builds.

**Creating a Project:**
\`\`\`bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev
\`\`\`

**Project Structure:**
\`\`\`
my-vue-app/
├── src/
│   ├── App.vue          # Root component
│   ├── main.ts          # Entry point
│   ├── components/      # Reusable components
│   ├── views/           # Page-level components
│   ├── router/          # Route definitions
│   ├── stores/          # Pinia stores
│   └── assets/          # Static files
├── public/              # Static public assets
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript config
\`\`\`

**Entry Point:**
\`\`\`typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
\`\`\`

**Common Vite Plugins:**
- \`@vitejs/plugin-vue\` — Vue 3 SFC support
- \`@vitejs/plugin-vue-jsx\` — JSX/TSX support
- \`vite-plugin-pwa\` — Progressive Web App support
- \`vite-plugin-compression\` — Gzip/Brotli compression

**Best Practices:**
- Use Vite for all new Vue 3 projects (not webpack)
- Enable TypeScript from the start
- Use path aliases (\`@/\`) for cleaner imports
- Configure proxy in \`vite.config.ts\` for API calls

**Key Takeaways:**
1. Vite is the official build tool — use \`npm create vue@latest\` to scaffold
2. \`<script setup>\` in SFCs combined with TypeScript gives excellent DX
3. The entry point uses \`createApp()\` with plugins before mounting` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the recommended build tool for new Vue 3 projects?',
        options: ['webpack', 'Parcel', 'Vite', 'Rollup'],
        correctIndex: 2,
        explanation: 'Vite is the officially recommended build tool for Vue 3. It offers instant server start, fast HMR, and optimized builds out of the box.'
      },
      {
        id: 2,
        question: 'What does `<script setup>` do in a Vue SFC?',
        options: ['Defines global variables', 'Enables scoped CSS', 'Shorthand for Composition API with auto-exposed bindings', 'Enables TypeScript support'],
        correctIndex: 2,
        explanation: '`<script setup>` is compile-time syntactic sugar for using the Composition API inside SFCs. Variables and functions declared inside are automatically available in the template.'
      },
      {
        id: 3,
        question: 'Which function creates a reactive primitive in Vue 3?',
        options: ['reactive()', 'ref()', 'computed()', 'watch()'],
        correctIndex: 1,
        explanation: '`ref()` creates a reactive reference. Use it for primitives (strings, numbers, booleans) and objects. Access the value via `.value` in script.'
      }
    ]
  },
  {
    id: 502, slug: 'vue-template-syntax', title: 'Template Syntax',
    description: 'Master Vue\'s template system — interpolation, directives, bindings, and event handling.',
    level: 'beginner', duration: '35 min',
    objectives: ['Use text interpolation and expressions in templates', 'Bind dynamic attributes with v-bind', 'Handle events with v-on', 'Understand template directives and modifiers'],
    topics: [
      { id: 'interpolation', title: 'Text Interpolation & Expressions', content: `**Text Interpolation**

Vue uses a double-curly-brace syntax \`{{ }}\` (Mustache syntax) to render dynamic text inside the template. The expression inside the braces is evaluated in the component's reactive scope.

**Supported Expressions:**
- JavaScript expressions (not statements)
- Property access on reactive state
- Ternary operators
- Template literals (within computed properties)

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const message = ref('Hello Vue!')
const count = ref(5)
const items = ref(['apple', 'banana', 'cherry'])
const isLoggedIn = ref(true)

const greeting = computed(() => isLoggedIn.value ? 'Welcome back!' : 'Please log in')
</script>

<template>
  <!-- Simple interpolation -->
  <p>{{ message }}</p>

  <!-- JavaScript expressions -->
  <p>{{ count * 2 }}</p>
  <p>{{ items.join(', ') }}</p>

  <!-- Ternary in template -->
  <p>{{ isLoggedIn ? 'Logged In' : 'Guest' }}</p>

  <!-- Computed property -->
  <p>{{ greeting }}</p>
</template>
\`\`\`

**Raw HTML (v-html):**
\`\`\`vue
<script setup>
const rawHtml = ref('<strong>Bold text</strong>')
</script>

<template>
  <!-- Unsafe — only use with trusted content -->
  <div v-html="rawHtml"></div>
</template>
\`\`\`

**Best Practices:**
- Use computed properties for complex expressions — keep templates simple
- Never use \`v-html\` with user-provided content (XSS risk)
- Avoid statements in templates — only expressions are supported
- Use \`{{ }}\` for text content, \`v-bind\` for attributes

**Key Takeaways:**
1. \`{{ }}\` interpolation evaluates JavaScript expressions in the reactive scope
2. Only expressions work in templates — not statements (\`if\`, \`for\`, etc.)
3. \`v-html\` renders raw HTML — use only with trusted content` },
      { id: 'v-bind', title: 'Dynamic Attributes with v-bind', content: `**v-bind Directive**

The \`v-bind\` directive dynamically binds HTML attributes to Vue expressions. It has a shorthand \`:\` which is the most commonly used form.

**Binding Types:**
- **String binding**: \`v-bind:href="url"\`
- **Boolean binding**: \`v-bind:disabled="isDisabled"\`
- **Object binding**: \`v-bind:style="styleObject"\`
- **Class binding**: \`v-bind:class="classList"\`

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const imageUrl = ref('/logo.png')
const isDisabled = ref(false)
const inputId = ref('email')

const dynamicClasses = ref({
  active: true,
  'text-danger': false,
  'font-bold': true
})

const customStyle = ref({
  color: 'blue',
  fontSize: '16px'
})
</script>

<template>
  <!-- Attribute binding -->
  <img v-bind:src="imageUrl" />

  <!-- Shorthand (most common) -->
  <img :src="imageUrl" />
  <button :disabled="isDisabled">Submit</button>

  <!-- Dynamic attribute name -->
  <label :for="inputId">Email</label>
  <input :id="inputId" />

  <!-- Class binding (object syntax) -->
  <div :class="dynamicClasses">Styled div</div>

  <!-- Class binding (array syntax) -->
  <div :class="[isActive ? 'active' : '', 'base-class']">Array class</div>

  <!-- Style binding -->
  <p :style="customStyle">Styled text</p>
</template>
\`\`\`

**Best Practices:**
- Use the \`:\` shorthand consistently — it's more readable
- Prefer class binding over style binding for layout changes
- Keep dynamic class objects in reactive state
- Avoid complex expressions in binding — use computed properties

**Key Takeaways:**
1. \`v-bind:attr\` or \`:attr\` dynamically sets HTML attributes
2. Class and style bindings accept objects or arrays for flexibility
3. The \`:\` shorthand is the standard in Vue development` },
      { id: 'v-on', title: 'Event Handling with v-on', content: `**v-on Directive**

The \`v-on\` directive listens to DOM events and runs JavaScript when they occur. The shorthand \`@\` is universally preferred.

**Event Handling:**
- Inline expressions: \`@click="count++"\`
- Method handlers: \`@click="handleClick"\`
- Event parameters: \`@click="handleClick($event)"\`
- Multiple handlers: \`@click="handler1; handler2"\`

**Modifiers:**
- \`.prevent\` — calls \`event.preventDefault()\`
- \`.stop\` — calls \`event.stopPropagation()\`
- \`.once\` — triggers handler at most once
- \`.self\` — only triggers if event.target is the element itself

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const inputText = ref('')

function handleSubmit(event: Event) {
  event.preventDefault()
  console.log('Submitted:', inputText.value)
}

function handleKeyup(event: KeyboardEvent) {
  console.log('Key pressed:', event.key)
}

function handleClickWithEvent(event: MouseEvent) {
  console.log('Mouse position:', event.clientX, event.clientY)
}
</script>

<template>
  <!-- Inline expression -->
  <button @click="count++">Count: {{ count }}</button>

  <!-- Method handler -->
  <form @submit="handleSubmit">
    <input v-model="inputText" />
    <button type="submit">Submit</button>
  </form>

  <!-- Event modifiers -->
  <form @submit.prevent="handleSubmit">
    <input v-model="inputText" />
    <button type="submit">Submit</button>
  </form>

  <!-- Key modifiers -->
  <input @keyup.enter="handleKeyup" />

  <!-- Once modifier -->
  <button @click.once="count++">Click once</button>

  <!-- Accessing $event -->
  <button @click="handleClickWithEvent">Click me</button>
</template>
\`\`\`

**Best Practices:**
- Always use the \`@\` shorthand for event binding
- Use \`.prevent\` and \`.stop\` modifiers instead of calling them manually
- Keep event handlers as simple method references — avoid complex inline logic
- Use key modifiers for keyboard shortcuts

**Key Takeaways:**
1. \`v-on:event\` or \`@event\` binds DOM event handlers
2. Event modifiers (\`.prevent\`, \`.stop\`, \`.once\`) simplify common patterns
3. Access the native event object with \`$event\` or method parameters` },
      { id: 'directives', title: 'Template Directives', content: `**Built-in Directives**

Vue provides several built-in directives that add special behavior to DOM elements. Each directive starts with the \`v-\` prefix.

**Core Directives:**
- \`v-model\` — Two-way data binding on form inputs
- \`v-show\` — Toggles CSS \`display\` property
- \`v-if\` / \`v-else-if\` / \`v-else\` — Conditional rendering
- \`v-for\` — List rendering
- \`v-slot\` — Named slot content

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)
const selected = ref('option1')
const items = ref(['a', 'b', 'c'])
</script>

<template>
  <!-- v-show: toggles display CSS -->
  <p v-show="isVisible">Shown via v-show</p>

  <!-- v-if: adds/removes from DOM -->
  <p v-if="isVisible">Shown via v-if</p>
  <p v-else>Hidden content</p>

  <!-- v-model: two-way binding -->
  <select v-model="selected">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>

  <!-- v-for: list rendering -->
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>

  <!-- v-memo: cached rendering (Vue 3.2+) -->
  <div v-memo="[count]">
    <p>Only re-renders when count changes: {{ count }}</p>
  </div>
</template>
\`\`\`

**Custom Directives:**
\`\`\`typescript
// Directives registered globally
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
\`\`\`
\`\`\`vue
<template>
  <input v-focus />
</template>
\`\`\`

**Best Practices:**
- Use \`v-show\` for frequently toggled elements (keeps DOM alive)
- Use \`v-if\` for conditionals that rarely change (lighter on DOM)
- Always provide \`:key\` with \`v-for\` for efficient re-rendering
- Create custom directives for DOM manipulation that doesn't fit component model

**Key Takeaways:**
1. Directives add reactive behavior to DOM elements with the \`v-\` prefix
2. \`v-show\` toggles CSS display; \`v-if\` adds/removes from the DOM entirely
3. Custom directives encapsulate reusable DOM-level behaviors` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the shorthand for `v-bind:src="url"`?',
        options: ['.src="url"', '#src="url"', ':src="url"', '@src="url"'],
        correctIndex: 2,
        explanation: 'The colon `:` is the shorthand for `v-bind`. So `:src="url"` is equivalent to `v-bind:src="url"`.'
      },
      {
        id: 2,
        question: 'What does the `.prevent` modifier do on `@submit.prevent`?',
        options: ['Prevents form submission', 'Calls event.preventDefault()', 'Prevents event bubbling', 'Stops event propagation'],
        correctIndex: 1,
        explanation: 'The `.prevent` modifier calls `event.preventDefault()` on the DOM event, which prevents the default browser behavior (like page reload on form submit).'
      },
      {
        id: 3,
        question: 'Which directive is used for two-way data binding on form elements?',
        options: ['v-bind', 'v-on', 'v-model', 'v-show'],
        correctIndex: 2,
        explanation: 'v-model creates two-way data binding on form input, textarea, and select elements. It syncs the input value with a reactive variable.'
      }
    ]
  },
  {
    id: 503, slug: 'vue-reactivity-system', title: 'Reactivity System',
    description: 'Understand Vue\'s reactivity — ref, reactive, computed, and watch for state management.',
    level: 'beginner', duration: '40 min',
    objectives: ['Use ref() for reactive primitive and object values', 'Create deep reactive objects with reactive()', 'Build derived state with computed()', 'Respond to changes with watch() and watchEffect()'],
    topics: [
      { id: 'ref-reactive', title: 'ref and reactive', content: `**reactive and ref**

Vue 3's reactivity system is based on JavaScript Proxies. There are two main ways to create reactive state: \`ref()\` and \`reactive()\`.

**ref():**
- Wraps any value in a reactive reference
- Access value via \`.value\` in script
- Auto-unwraps in templates (no \`.value\` needed)
- Works for primitives and objects

**reactive():**
- Creates a deep reactive object directly
- No \`.value\` needed — access properties directly
- Cannot hold primitives (only objects/arrays)
- Loses reactivity when destructured

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

// ref — works for primitives
const count = ref(0)
const message = ref('Hello')

// ref — works for objects too
const user = ref({ name: 'John', age: 30 })

// reactive — deep reactive object
const state = reactive({
  count: 0,
  items: ['a', 'b', 'c'],
  nested: { deep: true }
})

function increment() {
  count.value++          // ref: must use .value
  state.count++          // reactive: direct access
  user.value.age++       // ref with object: .value then property
  state.nested.deep = false  // reactive: deep reactivity
}
</script>

<template>
  <!-- Both auto-unwrap in templates -->
  <p>Count: {{ count }}</p>
  <p>Message: {{ message }}</p>
  <p>User: {{ user.name }} (age {{ user.age }})</p>
  <p>State: {{ state.count }}</p>
  <button @click="increment">Increment</button>
</template>
\`\`\`

**When to Use Which:**
- **\`ref()\`**: Primitives, single values, when you need to reassign the entire value
- **\`reactive()\`**: Complex objects with multiple properties, when you won't destructure

**Common Pitfalls:**
\`\`\`typescript
// Don't destructure reactive objects — loses reactivity
const { count } = reactive({ count: 0 })
count++ // NOT reactive!

// Fix: use toRefs
import { toRefs } from 'vue'
const state = reactive({ count: 0 })
const { count } = toRefs(state)
count.value++ // Reactive!
\`\`\`

**Best Practices:**
- Use \`ref()\` by default — it's more versatile and explicit
- Avoid \`reactive()\` for objects that need to be reassigned
- Never destructure reactive objects — use \`toRefs()\` instead
- Access \`.value\` consistently in script for ref

**Key Takeaways:**
1. \`ref()\` wraps values with \`.value\` access; \`reactive()\` creates deep reactive objects
2. Both auto-unwrap in templates — \`.value\` is only needed in script
3. Never destructure reactive objects — use \`toRefs()\` to preserve reactivity` },
      { id: 'computed', title: 'Computed Properties', content: `**computed()**

Computed properties derive reactive values from other reactive state. They are cached — only recalculating when their dependencies change.

**Why Computed Properties?**
- **Performance**: Cached — avoids recalculating on every render
- **Reactivity**: Automatically tracks dependencies
- **Readability**: Encapsulates complex derived logic
- **Debugging**: Clear dependency tracking

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')
const items = ref([
  { name: 'Apple', price: 1.5, quantity: 3 },
  { name: 'Banana', price: 0.75, quantity: 6 },
  { name: 'Cherry', price: 3.0, quantity: 2 }
])

// Simple computed
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

// Computed with logic
const totalItems = computed(() =>
  items.value.reduce((sum, item) => sum + item.quantity, 0)
)

// Computed with filtering
const expensiveItems = computed(() =>
  items.value.filter(item => item.price > 2.0)
)

// Writable computed (get/set)
const fullNameWritable = computed({
  get: () => \`\${firstName.value} \${lastName.value}\`,
  set: (val: string) => {
    const [first, ...rest] = val.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  }
})
</script>

<template>
  <p>Full name: {{ fullName }}</p>
  <p>Total items: {{ totalItems }}</p>
  <ul>
    <li v-for="item in expensiveItems" :key="item.name">
      {{ item.name }} — \${{ item.price }}
    </li>
  </ul>
  <input v-model="fullNameWritable" />
</template>
\`\`\`

**Computed vs Methods:**
\`\`\`typescript
// Computed — cached, only recalculates when dependencies change
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

// Method — runs on every render
function getFullName() {
  return \`\${firstName.value} \${lastName.value}\`
}
\`\`\`

**Best Practices:**
- Use computed properties for any derived state
- Keep computed functions pure — no side effects
- Don't use async operations inside computed — use watch instead
- Use writable computed sparingly — prefer separate methods for mutations

**Key Takeaways:**
1. Computed properties are cached — only recalculate when dependencies change
2. Use computed for derived state; avoid it for side effects
3. Writable computed with get/set enables bidirectional derived values` },
      { id: 'watch', title: 'Watchers & Side Effects', content: `**watch() and watchEffect()**

Watchers run side effects in response to reactive state changes. They are Vue's equivalent of useEffect in React or useEffect in Angular.

**watch():**
- Explicitly tracks specific reactive sources
- Provides old and new values
- Lazy by default — only runs when source changes

**watchEffect():**
- Automatically tracks all reactive dependencies used inside
- Runs immediately on mount
- Does not provide old values

**Code Example:**
\`\`\`vue
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const searchResults = ref<string[]>([])
const userId = ref(1)

// watch — specific source with old/new values
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(\`Search changed: "\${oldQuery}" → "\${newQuery}"\`)
  // Debounced API call...
})

// watch — multiple sources
watch([searchQuery, userId], ([newQuery, newUserId], [oldQuery, oldUserId]) => {
  console.log('Query or user changed')
})

// watch with options
watch(searchQuery, async (newQuery) => {
  if (!newQuery) {
    searchResults.value = []
    return
  }
  const response = await fetch(\`/api/search?q=\${newQuery}\`)
  searchResults.value = await response.json()
}, {
  immediate: false,  // Don't run on mount (default: false)
  deep: false,       // Don't watch nested object changes
  flush: 'post'     // Run after DOM updates
})

// watchEffect — auto-tracks dependencies
watchEffect(() => {
  console.log(\`User ID is: \${userId.value}\`)
  // Automatically re-runs when userId changes
})

// watchPostEffect — runs after DOM updates
watchPostEffect(() => {
  // Access DOM elements that depend on reactive state
  document.title = \`User: \${userId.value}\`
})
</script>

<template>
  <input v-model="searchQuery" placeholder="Search..." />
  <ul>
    <li v-for="result in searchResults" :key="result">{{ result }}</li>
  </ul>
  <button @click="userId++">Next User</button>
</template>
\`\`\`

**Cleanup Function:**
\`\`\`typescript
watch(searchQuery, async (newQuery, oldQuery, onCleanup) => {
  const controller = new AbortController()

  onCleanup(() => controller.abort())

  const response = await fetch(\`/api/search?q=\${newQuery}\`, {
    signal: controller.signal
  })
})
\`\`\`

**Best Practices:**
- Use \`watch()\` when you need old/new values or specific sources
- Use \`watchEffect()\` when you want automatic dependency tracking
- Always use \`onCleanup\` in watchers with async operations
- Use \`{ flush: 'post' }\` when you need to access updated DOM

**Key Takeaways:**
1. \`watch()\` tracks specific sources with old/new values; \`watchEffect()\` auto-tracks
2. Watchers are lazy by default — they don't run until the source changes
3. Use cleanup functions to cancel async operations in watchers` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the main difference between ref() and reactive()?',
        options: ['ref is for arrays, reactive for objects', 'ref wraps values with .value, reactive creates deep reactive objects directly', 'ref is Vue 2 only, reactive is Vue 3', 'They are identical in behavior'],
        correctIndex: 1,
        explanation: 'ref() wraps any value and requires .value access in script. reactive() creates a deep reactive object directly without .value, but cannot hold primitives.'
      },
      {
        id: 2,
        question: 'Why are computed properties preferred over methods for derived state?',
        options: ['Methods are deprecated', 'Computed properties are cached and only recalculate when dependencies change', 'Methods cannot access reactive state', 'Computed properties run synchronously'],
        correctIndex: 1,
        explanation: 'Computed properties are cached based on their reactive dependencies. They only recalculate when a dependency changes, while methods re-run on every render.'
      },
      {
        id: 3,
        question: 'What happens when you destructure a reactive object?',
        options: ['Nothing — it works normally', 'The destructured values lose reactivity', 'TypeScript throws an error', 'Vue automatically converts them to refs'],
        correctIndex: 1,
        explanation: 'Destructuring a reactive object breaks reactivity because you extract plain values. Use toRefs() to destructure while preserving reactivity.'
      }
    ]
  },
  {
    id: 504, slug: 'vue-components', title: 'Components',
    description: 'Build reusable UI pieces with Vue components — props, events, slots, and registration.',
    level: 'beginner', duration: '40 min',
    objectives: ['Create and use Vue components effectively', 'Pass data with props and emit events', 'Use slots for content distribution', 'Register components locally and globally'],
    topics: [
      { id: 'props', title: 'Props — Passing Data Down', content: `**What are Props?**

Props (properties) are the primary way to pass data from parent to child components. They are declared using \`defineProps\` and are one-way (parent → child).

**Declaring Props:**
\`\`\`vue
<script setup lang="ts">
// TypeScript-based props declaration
const props = defineProps<{
  title: string
  count: number
  items?: string[]
  user?: { name: string; age: number }
}>()

// With default values
const propsWithDefaults = withDefaults(defineProps<{
  title: string
  count?: number
  items?: string[]
}>(), {
  count: 0,
  items: () => []
})
</script>
\`\`\`

**Parent Component:**
\`\`\`vue
<script setup>
import UserCard from './UserCard.vue'
</script>

<template>
  <UserCard
    :title="'Hello'"
    :count="5"
    :items="['a', 'b', 'c']"
  />
</template>
\`\`\`

**Child Component Template:**
\`\`\`vue
<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <ul v-if="items?.length">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
\`\`\`

**Prop Validation:**
\`\`\`typescript
// Runtime props declaration (Options API style, still supported)
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0,
    validator: (v: number) => v >= 0
  }
})
\`\`\`

**Best Practices:**
- Always use TypeScript-based props declaration (\`defineProps<T>()\`)
- Keep props simple — avoid complex nested objects
- Use \`withDefaults()\` for optional props with sensible defaults
- Props are one-way — never mutate them directly in the child

**Key Takeaways:**
1. Props pass data from parent to child (one-way data flow)
2. Use \`defineProps<T>()\` for type-safe prop declarations
3. Props are immutable in the child — emit events to communicate back` },
      { id: 'emits', title: 'Emitting Events — Child to Parent', content: `**Custom Events with emit()**

Components communicate upward using \`defineEmits\`. The child emits named events that the parent can listen to.

**Defining and Emitting Events:**
\`\`\`vue
<script setup lang="ts">
// Define emitted events with payload types
const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'delete', id: string): void
  (e: 'search', query: string): void
}>()

function handleIncrement() {
  emit('update', 1)
}

function handleDelete(id: string) {
  emit('delete', id)
}
</script>

<template>
  <button @click="handleIncrement">Increment</button>
  <button @click="handleDelete('item-1')">Delete</button>
</template>
\`\`\`

**Parent Listening:**
\`\`\`vue
<script setup>
import Counter from './Counter.vue'

function onIncrement(value) {
  console.log('Incremented by:', value)
}

function onDelete(id) {
  console.log('Deleted:', id)
}
</script>

<template>
  <Counter
    @update="onIncrement"
    @delete="onDelete"
  />

  <!-- Inline handler -->
  <Counter
    @update="(val) => count += val"
  />
</template>
\`\`\`

**v-model on Components:**
\`\`\`vue
<!-- Parent -->
<Counter v-model="count" />

<!-- Child (equivalent to) -->
<script setup>
const model = defineModel<number>()
</script>

<template>
  <button @click="model--">-</button>
  <span>{{ model }}</span>
  <button @click="model++">+</button>
</template>
\`\`\`

**Best Practices:**
- Always declare emitted events with \`defineEmits<T>()\`
- Use kebab-case event names in templates (\`@my-event\`)
- Keep event payloads small — pass specific data, not entire objects
- Use \`v-model\` for form-like two-way binding scenarios

**Key Takeaways:**
1. \`defineEmits<T>()\` declares events a component can emit
2. Parent components listen with \`@event-name\` syntax
3. \`defineModel()\` simplifies v-model implementation on components` },
      { id: 'slots', title: 'Slots — Content Distribution', content: `**Slots**

Slots allow parent components to inject content into specific locations of a child component's template. They're essential for creating flexible, reusable components.

**Default Slot:**
\`\`\`vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot /> <!-- Parent content renders here -->
  </div>
</template>

<!-- Usage -->
<template>
  <Card>
    <p>This content goes into the default slot</p>
  </Card>
</template>
\`\`\`

**Named Slots:**
\`\`\`vue
<!-- Layout.vue -->
<template>
  <header>
    <slot name="header" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>

<!-- Usage -->
<template>
  <Layout>
    <template #header>
      <h1>Page Title</h1>
    </template>

    <p>Default slot content</p>

    <template #footer>
      <p>Footer content</p>
    </template>
  </Layout>
</template>
\`\`\`

**Scoped Slots:**
\`\`\`vue
<!-- List.vue -->
<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<!-- Usage — pass data from child to parent slot -->
<template>
  <List :items="['a', 'b', 'c']">
    <template #default="{ item, index }">
      <span>{{ index }}: {{ item.toUpperCase() }}</span>
    </template>
  </List>
</template>
\`\`\`

**Slot Fallback (Default Content):**
\`\`\`vue
<template>
  <button>
    <slot>Default button text</slot>
  </button>
</template>

<!-- Usage -->
<Button>Click me</Button>
<Button /> <!-- Renders with "Default button text" -->
\`\`\`

**Best Practices:**
- Use scoped slots to let parents customize child-rendered content
- Provide meaningful fallback content for slots
- Use named slots for multi-region layout components
- Avoid too many slots — it can make the component hard to understand

**Key Takeaways:**
1. Slots let parent components inject content into child templates
2. Named slots (\`#header\`, \`#footer\`) enable multi-region content distribution
3. Scoped slots pass data from child to parent for custom rendering` },
      { id: 'registration', title: 'Component Registration', content: `**Local vs Global Registration**

Vue components can be registered either locally (in the component that uses them) or globally (available everywhere).

**Local Registration (Recommended):**
\`\`\`vue
<script setup>
import ChildComponent from './ChildComponent.vue'
// Component is automatically available in the template
</script>

<template>
  <ChildComponent />
</template>
\`\`\`

**Global Registration:**
\`\`\`typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import MyButton from './components/MyButton.vue'

const app = createApp(App)
app.component('MyButton', MyButton) // Available everywhere
app.mount('#app')
\`\`\`

**Dynamic Components:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'
import TabHome from './TabHome.vue'
import TabProfile from './TabProfile.vue'
import TabSettings from './TabSettings.vue'

const currentTab = ref('home')
const tabs = { home: TabHome, profile: TabProfile, settings: TabSettings }
</script>

<template>
  <button
    v-for="(_, name) in tabs"
    :key="name"
    @click="currentTab = name"
  >
    {{ name }}
  </button>

  <component :is="tabs[currentTab]" />
</template>
\`\`\`

**Async Components:**
\`\`\`vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
)
</script>

<template>
  <HeavyChart />
</template>
\`\`\`

**Best Practices:**
- Prefer local registration — explicit imports are better for tree-shaking
- Only use global registration for widely-used base components
- Use async components for heavy or rarely-used components
- Keep component names PascalCase (\`MyComponent\`)

**Key Takeaways:**
1. Local registration with \`import\` is preferred — explicit and tree-shakeable
2. Global registration with \`app.component()\` makes components available everywhere
3. Async components enable code splitting for heavy components` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary purpose of props in Vue?',
        options: ['Emit events to parents', 'Pass data from parent to child', 'Define local component state', 'Handle form submissions'],
        correctIndex: 1,
        explanation: 'Props (properties) are used to pass data from a parent component down to a child component. They are one-way data flow.'
      },
      {
        id: 2,
        question: 'How do you emit a custom event from a child component?',
        options: ['this.$emit()', 'defineEmits() then emit()', 'defineProps()', '$broadcast()'],
        correctIndex: 1,
        explanation: 'In Vue 3 with <script setup>, you call defineEmits<T>() to get an emit function, then call emit("eventName", payload) to emit events.'
      },
      {
        id: 3,
        question: 'What is a scoped slot?',
        options: ['A slot that only works with scoped CSS', 'A slot that passes data from child to parent for custom rendering', 'A slot that is only rendered once', 'A slot with fallback content'],
        correctIndex: 1,
        explanation: 'Scoped slots allow child components to pass data (via slot props) to the parent component, which then uses that data to customize the rendered content.'
      }
    ]
  },
  {
    id: 505, slug: 'vue-lists-conditions', title: 'List Rendering & Conditions',
    description: 'Render lists with v-for and control visibility with v-if, v-show, and conditional directives.',
    level: 'beginner', duration: '30 min',
    objectives: ['Render lists efficiently with v-for and :key', 'Use v-if, v-else-if, and v-else for conditional rendering', 'Understand v-if vs v-show trade-offs', 'Apply array mutation methods with reactivity'],
    topics: [
      { id: 'v-for', title: 'List Rendering with v-for', content: `**v-for Directive**

The \`v-for\` directive renders a block of elements multiple times based on a source data array. Always use \`:key\` to help Vue track each node's identity.

**Basic Syntax:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const fruits = ref(['Apple', 'Banana', 'Cherry'])

const users = ref([
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 32 },
  { id: 3, name: 'Charlie', age: 25 }
])

const numbers = ref([1, 2, 3, 4, 5])
</script>

<template>
  <!-- Array of strings -->
  <ul>
    <li v-for="(fruit, index) in fruits" :key="fruit">
      {{ index + 1 }}. {{ fruit }}
    </li>
  </ul>

  <!-- Array of objects -->
  <div v-for="user in users" :key="user.id" class="user-card">
    <h3>{{ user.name }}</h3>
    <p>Age: {{ user.age }}</p>
  </div>

  <!-- Range -->
  <span v-for="n in 10" :key="n">{{ n }}</span>

  <!-- Object iteration -->
  <div v-for="(value, key, index) in { name: 'John', age: 30 }" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </div>
</template>
\`\`\`

**v-for with Component:**
\`\`\`vue
<template>
  <UserCard
    v-for="user in users"
    :key="user.id"
    :user="user"
  />
</template>
\`\`\`

**Array Change Detection:**
\`\`\`typescript
// These mutate the array AND trigger re-render:
fruits.value.push('Date')          // Add to end
fruits.value.pop()                 // Remove from end
fruits.value.shift()               // Remove from start
fruits.value.unshift('Date')       // Add to start
fruits.value.splice(1, 1)          // Remove at index
fruits.value.sort()                // Sort
fruits.value.reverse()             // Reverse

// These replace the array (also trigger re-render):
fruits.value = [...fruits.value, 'Date']  // Add
fruits.value = fruits.value.filter(f => f !== 'Apple')  // Remove
\`\`\`

**Best Practices:**
- Always use \`:key\` with a unique identifier (id, slug) — not the index
- Prefer array methods that return new arrays over mutation methods
- Extract list items into their own components for better performance
- Use \`v-for\` with \`v-if\` carefully — put \`v-if\` on a \`<template>\` wrapper

**Key Takeaways:**
1. \`v-for="(item, index) in items" :key="item.id"\` renders lists efficiently
2. Always use unique keys — never use array index as key
3. Vue detects array mutations and updates the DOM automatically` },
      { id: 'v-if-show', title: 'Conditional Rendering: v-if vs v-show', content: `**Conditional Rendering**

Vue provides two ways to conditionally render elements: \`v-if\` (actual DOM removal) and \`v-show\` (CSS display toggling).

**v-if / v-else-if / v-else:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const score = ref(85)
const isloggedIn = ref(false)
const role = ref('user')
</script>

<template>
  <!-- Basic v-if -->
  <p v-if="isLoggedIn">Welcome back, user!</p>
  <p v-else>Please log in</p>

  <!-- v-if with v-else-if -->
  <div v-if="score >= 90">
    <p>Grade: A</p>
  </div>
  <div v-else-if="score >= 80">
    <p>Grade: B</p>
  </div>
  <div v-else-if="score >= 70">
    <p>Grade: C</p>
  </div>
  <div v-else>
    <p>Grade: F</p>
  </div>

  <!-- v-if on <template> (won't render wrapper) -->
  <template v-if="isLoggedIn">
    <h2>Dashboard</h2>
    <p>Welcome to your dashboard</p>
  </template>

  <!-- v-if with v-for (use template wrapper) -->
  <template v-for="item in items" :key="item.id">
    <p v-if="item.visible">{{ item.name }}</p>
  </template>
</template>
\`\`\`

**v-show:**
\`\`\`vue
<template>
  <!-- Toggles CSS display property -->
  <p v-show="isVisible">I am shown/hidden via CSS</p>
</template>
\`\`\`

**v-if vs v-show:**
\`\`\`
v-if:                           v-show:
├─ Adds/removes from DOM       ├─ Always in the DOM
├─ Lazy (not rendered until    ├─ Always rendered
│  condition is true)          ├─ Toggles display CSS
├─ Better for:                 ├─ Better for:
│  • Rarely toggled            │  • Frequently toggled
│  • Initial conditional       │  • Switch tabs
│    rendering                 │  • Show/hide panels
└─ Higher toggle cost          └─ Higher initial cost
\`\`\`

**Best Practices:**
- Use \`v-if\` for conditionals that rarely change
- Use \`v-show\` for elements toggled frequently
- Never use \`v-if\` and \`v-for\` on the same element — use \`<template>\` wrapper
- Use \`v-if\` for lazy rendering — components aren't created until condition is true

**Key Takeaways:**
1. \`v-if\` adds/removes DOM elements — lazy rendering, higher toggle cost
2. \`v-show\` toggles CSS display — always rendered, lower toggle cost
3. Never put \`v-if\` and \`v-for\` on the same element` }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why should you always use a unique `:key` with `v-for`?',
        options: ['It is required by HTML', 'It helps Vue track each node efficiently for reordering and updates', 'It makes the code more readable', 'It prevents XSS attacks'],
        correctIndex: 1,
        explanation: 'Keys help Vue identify which items have changed, been added, or removed. Without proper keys, Vue uses an "in-place patch" strategy that can cause bugs with stateful components.'
      },
      {
        id: 2,
        question: 'When should you use v-show over v-if?',
        options: ['When the element is rarely toggled', 'When you need to lazy-load content', 'When the element is frequently toggled', 'When the element contains a component'],
        correctIndex: 2,
        explanation: 'v-show always renders the element but toggles CSS display. It has a higher upfront cost but lower toggle cost, making it ideal for frequently shown/hidden elements.'
      },
      {
        id: 3,
        question: 'What happens if you put v-if and v-for on the same element?',
        options: ['Vue throws an error', 'v-if has higher priority and cannot access v-for variables', 'v-for has higher priority and v-if runs per iteration', 'Nothing — they work together fine'],
        correctIndex: 1,
        explanation: 'In Vue 3, v-if has higher priority than v-for. This means v-if runs first and cannot access the v-for scope variable, which causes an error. Wrap with <template> to fix.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // VUE INTERMEDIATE (506-510)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 506, slug: 'vue-composition-api-deep', title: 'Composition API Deep Dive',
    description: 'Master composables, provide/inject, and lifecycle hooks for advanced Composition API patterns.',
    level: 'intermediate', duration: '45 min',
    objectives: ['Create reusable composables for shared logic', 'Use provide/inject for dependency injection', 'Apply lifecycle hooks in the Composition API', 'Understand setup() execution context'],
    topics: [
      { id: 'composables', title: 'Composables — Logic Reuse', content: `**What are Composables?**

Composables are functions that encapsulate and reuse stateful logic in Vue. They are the Composition API's answer to mixins, offering explicit inputs/outputs, better TypeScript support, and no name collisions.

**Creating a Composable:**
\`\`\`typescript
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}
\`\`\`

**Using a Composable:**
\`\`\`vue
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter'

const { count, doubled, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <p>Count: {{ count }} (Double: {{ doubled }})</p>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="reset">Reset</button>
</template>
\`\`\`

**Composable with API Calls:**
\`\`\`typescript
// composables/useFetch.ts
import { ref, watchEffect, toValue, type Ref } from 'vue'

export function useFetch<T>(url: string | Ref<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  watchEffect(async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(toValue(url))
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
\`\`\`

**Composable Best Practices:**
- Name composables with \`use\` prefix (\`useAuth\`, \`useFetch\`)
- Always return refs/readonly values — never return raw reactive objects
- Accept refs as arguments using \`toValue()\`
- Document the composable's return values
- Avoid side effects outside of \`watchEffect\`

**Key Takeaways:**
1. Composables encapsulate reusable stateful logic with explicit inputs/outputs
2. Name them with the \`use\` prefix and return refs for composability
3. Use \`toValue()\` to handle both refs and raw values in composable arguments` },
      { id: 'provide-inject', title: 'Provide / Inject', content: `**Dependency Injection with provide/inject**

provide/inject allows a parent component to provide values to all descendants without prop drilling. It works across multiple levels of the component tree.

**Basic Usage:**
\`\`\`vue
<!-- Parent: ThemeProvider.vue -->
<script setup lang="ts">
import { ref, provide } from 'vue'

const theme = ref('dark')

// Provide a reactive value
provide('theme', theme)

// Provide a function to update
provide('setTheme', (newTheme: string) => {
  theme.value = newTheme
})
</script>
\`\`\`

\`\`\`vue
<!-- Child (any depth): ThemedButton.vue -->
<script setup lang="ts">
import { inject } from 'vue'

// Inject the value (with type safety)
const theme = inject<string>('theme', 'light')  // fallback: 'light'
const setTheme = inject<(t: string) => void>('setTheme')
</script>

<template>
  <button :class="theme" @click="setTheme?.('light')">
    Current theme: {{ theme }}
  </button>
</template>
\`\`\`

**Type-Safe provide/inject:**
\`\`\`typescript
// types/injection-keys.ts
import type { InjectionKey, Ref } from 'vue'

export interface ThemeContext {
  theme: Ref<string>
  setTheme: (theme: string) => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')
\`\`\`

\`\`\`vue
<!-- Parent -->
<script setup lang="ts">
import { ref, provide } from 'vue'
import { ThemeKey } from '@/types/injection-keys'

const theme = ref('dark')
provide(ThemeKey, {
  theme,
  setTheme: (t) => { theme.value = t }
})
</script>

<!-- Child -->
<script setup lang="ts">
import { inject } from 'vue'
import { ThemeKey } from '@/types/injection-keys'

const ctx = inject(ThemeKey)  // Type-safe, no fallback needed if required
</script>
\`\`\`

**Provide vs Props:**
- Props: explicit, one-way, component API contract
- Provide/inject: implicit, works across any depth, better for "global" concerns

**Best Practices:**
- Use Symbol keys for type safety and to avoid naming collisions
- Always provide a fallback value or make inject required
- Use provide/inject for theme, auth, locale — not for every prop
- Keep provided values reactive for real-time updates

**Key Takeaways:**
1. provide/inject enables dependency injection without prop drilling
2. Use InjectionKey<T> for type-safe provides and injects
3. Provided values are reactive — updates propagate to all consumers` },
      { id: 'lifecycle', title: 'Lifecycle Hooks', content: `**Component Lifecycle Hooks**

Vue components go through a series of initialization steps — creating, mounting, updating, and unmounting. Lifecycle hooks let you run code at specific stages.

**Composition API Lifecycle Hooks:**
\`\`\`vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue'

// Setup phase (runs during creation)
console.log('Component setup runs here')

onBeforeMount(() => {
  console.log('About to mount — DOM not yet available')
})

onMounted(() => {
  console.log('Component is mounted — DOM is available')
  // Ideal for: API calls, DOM manipulation, third-party libs
})

onBeforeUpdate(() => {
  console.log('State changed, about to update DOM')
})

onUpdated(() => {
  console.log('DOM has been updated')
})

onBeforeUnmount(() => {
  console.log('About to unmount — clean up timers, listeners')
})

onUnmounted(() => {
  console.log('Component is unmounted — final cleanup')
})

onErrorCaptured((err, instance, info) => {
  console.log('Error caught:', err)
  return false // Don't propagate to parent
})
</script>
\`\`\`

**Execution Order:**
\`\`\`
setup()                    → Component creation
onBeforeMount()            → After render, before DOM insert
onMounted()                → After DOM insert
onBeforeUpdate()           → State changed, before DOM re-render
onUpdated()                → DOM re-rendered
onBeforeUnmount()          → Before teardown
onUnmounted()              → Component destroyed
\`\`\`

**Async Lifecycle Pattern:**
\`\`\`vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/data')
    data.value = await response.json()
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})
</script>
\`\`\`

**Best Practices:**
- Use \`<script setup>\` — setup() runs implicitly as the Composition API entry point
- Place API calls in \`onMounted()\` — DOM is ready and component is active
- Clean up in \`onUnmounted()\` — remove event listeners, cancel timers
- Use \`onErrorCaptured()\` for error boundaries

**Key Takeaways:**
1. Lifecycle hooks in Composition API use the \`on\` prefix (\`onMounted\`, \`onUnmounted\`)
2. \`onMounted\` is the primary hook for data fetching and DOM interaction
3. Always clean up in \`onUnmounted\` — timers, subscriptions, event listeners` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary advantage of composables over mixins?',
        options: ['Composables run faster', 'Composables have explicit inputs/outputs and no naming conflicts', 'Composables work with Vue 2 only', 'Composables are required for TypeScript'],
        correctIndex: 1,
        explanation: 'Composables provide explicit inputs (arguments) and outputs (return values), have no name collisions, and work great with TypeScript. Mixins have implicit data sharing and potential naming conflicts.'
      },
      {
        id: 2,
        question: 'When should you clean up resources in a component?',
        options: ['In onMounted()', 'In onBeforeUnmount() or onUnmounted()', 'In onUpdated()', 'In setup()'],
        correctIndex: 1,
        explanation: 'onBeforeUnmount() and onUnmounted() are the hooks for cleaning up resources like timers, event listeners, subscriptions, and WebSocket connections.'
      },
      {
        id: 3,
        question: 'What does `inject("theme", "light")` do if no provider exists?',
        options: ['Throws an error', 'Returns undefined', 'Returns the fallback value "light"', 'Creates a new provide'],
        correctIndex: 2,
        explanation: 'The second argument to inject() is the fallback value. If no provider ancestor exists for the given key, the fallback value is returned.'
      }
    ]
  },
  {
    id: 507, slug: 'vue-router', title: 'Vue Router',
    description: 'Build multi-page experiences with Vue Router — navigation guards, dynamic routes, and nested routes.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Configure routes and nested routes', 'Navigate programmatically with useRouter', 'Protect routes with navigation guards', 'Handle dynamic route parameters'],
    topics: [
      { id: 'route-config', title: 'Route Configuration', content: `**Setting Up Vue Router**

Vue Router is the official routing solution for Vue. It enables single-page application (SPA) navigation without full page reloads.

**Basic Setup:**
\`\`\`typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // Lazy loading
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      props: true  // Route params as props
    },
    {
      path: '/dashboard',
      component: () => import('@/views/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardHome.vue')
        },
        {
          path: 'settings',
          name: 'dashboard-settings',
          component: () => import('@/views/DashboardSettings.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
\`\`\`

**App Setup:**
\`\`\`typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
\`\`\`

**Template Navigation:**
\`\`\`vue
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink :to="{ name: 'user', params: { id: 1 }}">
      User 1
    </RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>

  <RouterView />
</template>
\`\`\`

**Best Practices:**
- Use named routes for maintainability
- Lazy load route components with dynamic \`import()\`
- Use \`props: true\` to decouple route params from component
- Always add a catch-all route for 404 pages

**Key Takeaways:**
1. Vue Router uses \`createRouter()\` with \`createWebHistory()\` for clean URLs
2. Lazy-load route components for better initial load performance
3. Nested routes enable complex layouts with \`children\` arrays` },
      { id: 'navigation', title: 'Navigation & Guards', content: `**Programmatic Navigation & Guards**

Vue Router provides navigation guards (similar to Angular guards) that run before, during, and after route changes.

**Programmatic Navigation:**
\`\`\`vue
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function goToUser(id: number) {
  router.push({ name: 'user', params: { id } })
}

function goToWithQuery() {
  router.push({ path: '/search', query: { q: 'vue' } })
}

function replaceRoute() {
  router.replace({ name: 'home' })  // No history entry
}

async function navigateWithGuards() {
  // Navigation guards run automatically
  await router.push('/dashboard')
}
</script>
\`\`\`

**Route Guards:**
\`\`\`typescript
// router/index.ts
const router = createRouter({ /* ... */ })

// Global before each
router.beforeEach((to, from) => {
  const isAuthenticated = checkAuth()
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }  // Redirect
  }
})

// Global after each
router.afterEach((to, from) => {
  document.title = to.meta.title || 'My App'
})

// Per-route guard
const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      // Custom guard for this route
    }
  }
]
\`\`\`

**Route Meta Fields:**
\`\`\`typescript
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
    roles?: string[]
  }
}

const routes = [
  {
    path: '/admin',
    meta: { requiresAuth: true, roles: ['admin'] }
  }
]
\`\`\`

**Best Practices:**
- Use \`router.push()\` for navigation with history entries
- Use \`router.replace()\` for redirects (no history entry)
- Keep guard logic simple — avoid heavy computations
- Use route meta for auth and page title configuration

**Key Takeaways:**
1. \`router.push()\` navigates with history; \`router.replace()\` replaces the current entry
2. \`beforeEach\` guard is the primary place for auth checks
3. Route meta fields enable per-route configuration like \`requiresAuth\` and \`title\`` },
      { id: 'dynamic-routes', title: 'Dynamic Routes & Params', content: `**Dynamic Route Parameters**

Dynamic routes capture variable parts of the URL and pass them as route params.

**Route Params:**
\`\`\`typescript
const routes = [
  {
    path: '/users/:id',          // Single param
    name: 'user',
    component: UserView,
    props: true                   // Pass as props
  },
  {
    path: '/posts/:category/:slug',  // Multiple params
    name: 'post',
    component: PostView
  }
]
\`\`\`

**Accessing Params:**
\`\`\`vue
<script setup lang="ts">
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Access current params
console.log(route.params.id)

// React to param changes (within same component)
onBeforeRouteUpdate((to, from) => {
  const newId = to.params.id
  const oldId = from.params.id
  // Fetch new data for the new ID
})
</script>
\`\`\`

**Data Loading with Route Params:**
\`\`\`vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)

// Watch for param changes
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      const response = await fetch(\`/api/users/\${newId}\`)
      user.value = await response.json()
    }
  },
  { immediate: true }
)
</script>
\`\`\`

**Best Practices:**
- Use \`props: true\` to pass route params as component props
- Always handle loading states when fetching based on params
- Use \`onBeforeRouteUpdate\` to react to param changes within the same component
- Provide fallbacks for optional params

**Key Takeaways:**
1. Route params (\`:id\`) capture dynamic URL segments
2. Use \`props: true\` to decouple components from route-specific APIs
3. Watch \`route.params\` or use \`onBeforeRouteUpdate\` to react to param changes` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does `props: true` do on a route definition?',
        options: ['Enables TypeScript props', 'Passes route params as component props', 'Makes the route required', 'Enables prop validation'],
        correctIndex: 1,
        explanation: 'When `props: true` is set on a route, route params are automatically passed as props to the component, decoupling it from $route.'
      },
      {
        id: 2,
        question: 'How do you lazy-load a route component?',
        options: ['import component at the top', 'component: () => import("./View.vue")', 'component: require("./View.vue")', 'Lazy loading is automatic'],
        correctIndex: 1,
        explanation: 'Dynamic import() returns a Promise that resolves to the module. Vue Router automatically loads the component when the route is first visited.'
      },
      {
        id: 3,
        question: 'When does the `beforeEach` navigation guard run?',
        options: ['After the route changes', 'Before every route change', 'Only on the first navigation', 'Only for authenticated routes'],
        correctIndex: 1,
        explanation: 'beforeEach runs before every route navigation. It receives the target route (to) and the current route (from), and can redirect by returning a route.'
      }
    ]
  },
  {
    id: 508, slug: 'vue-pinia', title: 'Pinia State Management',
    description: 'Manage global state with Pinia — stores, getters, actions, and plugins.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Create and use Pinia stores', 'Define getters and actions', 'Use state, getters, and actions with TypeScript', 'Apply plugins for persistence and logging'],
    topics: [
      { id: 'store-basics', title: 'Creating Stores', content: `**What is Pinia?**

Pinia is the official state management library for Vue 3 (replacing Vuex). It provides a simple, type-safe API for managing global state with composables-style syntax.

**Defining a Store:**
\`\`\`typescript
// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State (ref)
  const user = ref<{ name: string; email: string } | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  // Getters (computed)
  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name ?? 'Guest')

  // Actions (functions)
  async function login(email: string, password: string) {
    loading.value = true
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      user.value = data.user
      token.value = data.token
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { user, token, loading, isAuthenticated, userName, login, logout }
})
\`\`\`

**Using the Store:**
\`\`\`vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Access state
console.log(auth.user)

// Access getter
console.log(auth.isAuthenticated)

// Call action
async function handleLogin() {
  await auth.login('user@example.com', 'password')
}
</script>

<template>
  <div v-if="auth.isAuthenticated">
    <p>Welcome, {{ auth.userName }}</p>
    <button @click="auth.logout">Logout</button>
  </div>
  <div v-else>
    <button @click="handleLogin" :disabled="auth.loading">
      {{ auth.loading ? 'Logging in...' : 'Login' }}
    </button>
  </div>
</template>
\`\`\`

**Best Practices:**
- Use the Composition API style (setup function) for better TypeScript support
- Keep stores small and focused — one concern per store
- Use actions for async operations — never modify state directly in components
- Name stores with \`use\` prefix (\`useAuthStore\`, \`useCartStore\`)

**Key Takeaways:**
1. Pinia stores are defined with \`defineStore()\` using a setup function
2. State uses \`ref()\`, getters use \`computed()\`, actions are functions
3. Stores are auto-imported in \`<script setup>\` — no manual imports needed with auto-imports` },
      { id: 'store-patterns', title: 'Store Patterns & Plugins', content: `**Advanced Store Patterns**

**Resetting Store State:**
\`\`\`typescript
// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
\`\`\`

**Store Composition (Using Other Stores):**
\`\`\`typescript
// stores/cart.ts
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
  const items = ref<{ id: number; name: string; price: number }[]>([])
  const auth = useAuthStore()

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price, 0)
  )

  async function checkout() {
    if (!auth.isAuthenticated) throw new Error('Must be logged in')
    await fetch('/api/checkout', {
      method: 'POST',
      headers: { Authorization: \`Bearer \${auth.token}\` },
      body: JSON.stringify({ items: items.value })
    })
    items.value = []
  }

  return { items, total, checkout }
})
\`\`\`

**Pinia Plugins:**
\`\`\`typescript
// plugins/persist.ts
import type { PiniaPluginContext } from 'pinia'

export function persistPlugin({ store }: PiniaPluginContext) {
  const key = \`store-\${store.$id}\`

  // Load from localStorage
  const saved = localStorage.getItem(key)
  if (saved) {
    store.$patch(JSON.parse(saved))
  }

  // Save on changes
  store.$subscribe((_mutation, state) => {
    localStorage.setItem(key, JSON.stringify(state))
  })
}

// main.ts
import { createPinia } from 'pinia'
import { persistPlugin } from './plugins/persist'

const pinia = createPinia()
pinia.use(persistPlugin)
\`\`\`

**DevTools Integration:**
- Pinia integrates with Vue DevTools automatically
- View state, track mutations, and time-travel debug
- Use \`store.$patch()\` for batched state updates

**Best Practices:**
- Use \`$reset()\` for stores that need to return to initial state
- Compose stores by importing them inside other stores
- Use plugins for cross-cutting concerns: persistence, logging, analytics
- Use \`$patch()\` for multiple state changes in one update

**Key Takeaways:**
1. Stores can use other stores by calling their \`use\` functions inside actions/getters
2. Plugins extend Pinia for persistence, logging, and other concerns
3. \`$reset()\` and \`$patch()\` provide convenient store manipulation` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What replaces Vuex in Vue 3 as the official state management?',
        options: ['MobX', 'Redux', 'Pinia', 'Zustand'],
        correctIndex: 2,
        explanation: 'Pinia is the official state management library for Vue 3. It was designed as a lighter, more type-safe successor to Vuex.'
      },
      {
        id: 2,
        question: 'In a Pinia store setup function, what do `ref()` values represent?',
        options: ['Getters', 'Actions', 'State', 'Modules'],
        correctIndex: 2,
        explanation: 'In Pinia\'s Composition API style, ref() values represent the store state. computed() represents getters, and plain functions represent actions.'
      },
      {
        id: 3,
        question: 'How do you persist Pinia store state across page reloads?',
        options: ['Use Vuex', 'Manually save in localStorage', 'Use a Pinia plugin like pinia-plugin-persistedstate', 'Pinia persists automatically'],
        correctIndex: 2,
        explanation: 'Pinia does not persist state by default. Use a plugin like pinia-plugin-persistedstate or write a custom plugin to save state to localStorage.'
      }
    ]
  },
  {
    id: 509, slug: 'vue-forms-validation', title: 'Forms & Validation',
    description: 'Handle forms in Vue with v-model, validation, and form state management.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use v-model for two-way binding on form inputs', 'Implement form validation rules', 'Handle form submission and state', 'Use libraries like VeeValidate for complex forms'],
    topics: [
      { id: 'v-model', title: 'v-model on Form Elements', content: `**v-model Usage**

v-model creates two-way data binding on form elements. It's syntactic sugar for :value + @input.

**Basic Usage:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const checked = ref(false)
const selected = ref('')
const multiSelect = ref([])
const currentDate = ref('')
const rating = ref(3)
</script>

<template>
  <!-- Text input -->
  <input v-model="text" placeholder="Type something" />
  <p>You typed: {{ text }}</p>

  <!-- Textarea -->
  <textarea v-model="text" placeholder="Multi-line"></textarea>

  <!-- Checkbox (boolean) -->
  <input type="checkbox" v-model="checked" />
  <p>Checked: {{ checked }}</p>

  <!-- Checkbox (multiple) -->
  <input type="checkbox" v-model="multiSelect" value="one" /> One
  <input type="checkbox" v-model="multiSelect" value="two" /> Two
  <input type="checkbox" v-model="multiSelect" value="three" /> Three
  <p>Selected: {{ multiSelect }}</p>

  <!-- Radio -->
  <input type="radio" v-model="selected" value="option1" /> Option 1
  <input type="radio" v-model="selected" value="option2" /> Option 2

  <!-- Select -->
  <select v-model="selected">
    <option disabled value="">Please select</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <!-- Number modifier -->
  <input v-model.number="rating" type="range" min="1" max="5" />

  <!-- Trim modifier -->
  <input v-model.trim="text" />

  <!-- Lazy modifier (updates on change, not input) -->
  <input v-model.lazy="text" />
</template>
\`\`\`

**v-model Modifiers:**
- \`.number\` — Automatically converts input to a number
- \`.trim\` — Removes leading/trailing whitespace
- \`.lazy\` — Syncs on \`change\` event instead of \`input\`

**Best Practices:**
- Use \`.number\` for numeric inputs to avoid string comparison bugs
- Use \`.trim\` for text inputs to clean whitespace
- Use \`.lazy\` for expensive operations triggered on each keystroke
- Always initialize v-model variables with the correct type

**Key Takeaways:**
1. v-model provides two-way binding on text, checkbox, radio, and select inputs
2. Modifiers (\`.number\`, \`.trim\`, \`.lazy\`) modify input behavior
3. v-model is syntactic sugar for \`:value\` + \`@input\`/\`@change\` binding` },
      { id: 'validation', title: 'Form Validation', content: `**Validation Approaches**

Vue offers several ways to validate forms, from manual validation to dedicated libraries.

**Manual Validation:**
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref<Record<string, string>>({})

const isEmailValid = computed(() =>
  /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.value.email)
)

function validate() {
  errors.value = {}

  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!isEmailValid.value) {
    errors.value.email = 'Invalid email format'
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }

  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (validate()) {
    console.log('Form submitted:', form.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="form.email" type="email" placeholder="Email" />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>
    </div>
    <div>
      <input v-model="form.password" type="password" placeholder="Password" />
      <p v-if="errors.password" class="error">{{ errors.password }}</p>
    </div>
    <div>
      <input v-model="form.confirmPassword" type="password" placeholder="Confirm" />
      <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
\`\`\`

**Using VeeValidate:**
\`\`\`vue
<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
})

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit((values) => {
  console.log('Valid:', values)
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="email" type="email" />
    <span>{{ errors.email }}</span>
    <input v-model="password" type="password" />
    <span>{{ errors.password }}</span>
    <button type="submit">Submit</button>
  </form>
</template>
\`\`\`

**Best Practices:**
- Validate on submit, not on every keystroke (better UX)
- Show inline errors next to the relevant field
- Use schema-based validation (Yup/Zod) for complex forms
- Always validate on the server too — client validation is not security

**Key Takeaways:**
1. Manual validation gives full control but is verbose
2. VeeValidate + Yup provides schema-based, type-safe validation
3. Always validate on the server — client-side validation improves UX, not security` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the `.number` modifier do on v-model?',
        options: ['Limits input to numbers only', 'Converts the input value to a number type', 'Adds a number validation', 'Formats the number with locale'],
        correctIndex: 1,
        explanation: 'The .number modifier automatically parses the input value as a number using parseFloat(). If the result is NaN, the original value is returned.'
      },
      {
        id: 2,
        question: 'Why should you always validate on the server even with client-side validation?',
        options: ['Client validation is slower', 'Client-side validation can be bypassed — it improves UX, not security', 'Server validation is automatic', 'Vue does not support server validation'],
        correctIndex: 1,
        explanation: 'Client-side validation is for user experience (instant feedback). Server-side validation is for security since client validation can be bypassed with API calls.'
      },
      {
        id: 3,
        question: 'What does v-model.lazy do?',
        options: ['Validates input lazily', 'Syncs the value on the "change" event instead of "input"', 'Defers rendering until the form is submitted', 'Applies a debounce to the input'],
        correctIndex: 1,
        explanation: 'v-model.lazy changes the sync trigger from the "input" event (fires on every keystroke) to the "change" event (fires when the input loses focus or Enter is pressed).'
      }
    ]
  },
  {
    id: 510, slug: 'vue-async-http', title: 'HTTP & Async Data',
    description: 'Fetch data in Vue with async patterns, error handling, and Suspense for async components.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Fetch data with fetch API and composables', 'Handle loading, error, and success states', 'Use async components with defineAsyncComponent', 'Implement Suspense for async component loading'],
    topics: [
      { id: 'fetch-composable', title: 'Data Fetching Composable', content: `**useFetch Composable**

A reusable composable handles the full lifecycle of data fetching — loading, error, data, and cleanup.

**Full useFetch Implementation:**
\`\`\`typescript
// composables/useFetch.ts
import { ref, watchEffect, toValue, type Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  refetch: () => Promise<void>
}

export function useFetch<T>(
  url: string | Ref<string>
): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const loading = ref(false)
  const controller = ref<AbortController | null>(null)

  async function fetchData() {
    controller.value?.abort()
    controller.value = new AbortController()

    loading.value = true
    error.value = null

    try {
      const response = await fetch(toValue(url), {
        signal: controller.value.signal
      })

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
      }

      data.value = await response.json()
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, loading, refetch: fetchData }
}
\`\`\`

**Usage:**
\`\`\`vue
<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'

const { data: users, error, loading } = useFetch('/api/users')
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>
\`\`\`

**Best Practices:**
- Always use AbortController for cleanup — prevent state updates on unmounted components
- Handle the AbortError case explicitly — it's expected behavior
- Provide refetch capability for manual re-fetching
- Use \`toValue()\` to handle both reactive and raw URLs

**Key Takeaways:**
1. A useFetch composable encapsulates loading, error, and data states
2. Always use AbortController to cancel pending requests on cleanup
3. Use watchEffect() to automatically re-fetch when reactive URLs change` },
      { id: 'async-components', title: 'Async Components & Suspense', content: `**Async Components**

Async components are loaded on-demand, enabling code splitting and improving initial load time.

**defineAsyncComponent:**
\`\`\`vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Basic async component
const HeavyChart = defineAsyncComponent(() =>
  import('./components/HeavyChart.vue')
)

// With loading/error components
const AdminPanel = defineAsyncComponent({
  loader: () => import('./components/AdminPanel.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,        // Delay before showing loading (ms)
  timeout: 10000     // Timeout before showing error (ms)
})
</script>

<template>
  <HeavyChart />
</template>
\`\`\`

**Suspense (Experimental in Vue 3):**
\`\`\`vue
<!-- App.vue or parent -->
<template>
  <Suspense>
    <template #default>
      <AsyncUserProfile />
    </template>
    <template #fallback>
      <div>Loading profile...</div>
    </template>
  </Suspense>
</template>
\`\`\`

\`\`\`vue
<!-- AsyncUserProfile.vue -->
<script setup lang="ts">
// Top-level await is allowed in <script setup> with Suspense
const response = await fetch('/api/user/profile')
const profile = await response.json()
</script>

<template>
  <div>
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.bio }}</p>
  </div>
</template>
\`\`\`

**Error Handling Patterns:**
\`\`\`vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref(null)
const error = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/data')
    if (!res.ok) throw new Error('Failed')
    data.value = await res.json()
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">
    <p>Error: {{ error.message }}</p>
    <button @click="$router.go(0)">Retry</button>
  </div>
  <div v-else>{{ data }}</div>
</template>
\`\`\`

**Best Practices:**
- Use async components for heavy or rarely-used components
- Always provide loading and error states
- Use Suspense for top-level async rendering (still experimental)
- Implement retry logic for failed requests

**Key Takeaways:**
1. defineAsyncComponent enables on-demand component loading with code splitting
2. Suspense provides a declarative way to handle async component loading states
3. Always provide loading and error states for better user experience` }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why is AbortController important in data fetching composables?',
        options: ['It speeds up requests', 'It cancels pending requests on component unmount to prevent memory leaks', 'It encrypts the request', 'It caches the response'],
        correctIndex: 1,
        explanation: 'AbortController cancels pending fetch requests when a component unmounts, preventing state updates on an unmounted component and avoiding memory leaks.'
      },
      {
        id: 2,
        question: 'What does defineAsyncComponent do?',
        options: ['Creates a component that runs asynchronously', 'Lazily loads a component only when it is needed', 'Makes a component work with async/await', 'Wraps a component in a Promise'],
        correctIndex: 1,
        explanation: 'defineAsyncComponent lazy-loads a component on demand, enabling code splitting. The component is only fetched from the server when it is first rendered.'
      },
      {
        id: 3,
        question: 'What slot does `<Suspense>` use for the loading state?',
        options: ['#loading', '#pending', '#fallback', '#default'],
        correctIndex: 2,
        explanation: 'Suspense uses the #fallback slot to display content while async components in the #default slot are loading.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // VUE ADVANCED (511-515)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 511, slug: 'vue-performance', title: 'Performance Optimization',
    description: 'Optimize Vue applications with lazy loading, shallowRef, v-once, and compile-time optimizations.',
    level: 'advanced', duration: '45 min',
    objectives: ['Apply lazy loading for components and routes', 'Use shallowRef and shallowReactive for large objects', 'Leverage v-once and v-memo for static content', 'Understand Vue\'s compile-time optimizations'],
    topics: [
      { id: 'lazy-loading', title: 'Lazy Loading & Code Splitting', content: `**Lazy Loading in Vue**

Lazy loading defers the loading of components, routes, and modules until they're actually needed, reducing the initial bundle size.

**Route-Level Code Splitting:**
\`\`\`typescript
const routes = [
  {
    path: '/',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/admin',
    component: () => import('./views/AdminView.vue')
  }
]
\`\`\`

**Component-Level Lazy Loading:**
\`\`\`vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./components/HeavyChart.vue'),
  loadingComponent: () => import('./components/LoadingSpinner.vue'),
  delay: 200,
  timeout: 10000
})
</script>

<template>
  <HeavyChart />
</template>
\`\`\`

**Dynamic Import with Interactions:**
\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const showChart = ref(false)

async function loadChart() {
  showChart.value = true
  // Component is loaded on demand
}
</script>

<template>
  <button @click="loadChart">Show Chart</button>
  <HeavyChart v-if="showChart" />
</template>
\`\`\`

**Bundle Analysis:**
\`\`\`bash
# Vite bundle analysis
npm run build -- --analyze

# Or use rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer
\`\`\`

**Best Practices:**
- Lazy load all route components by default
- Use dynamic imports for heavy components (charts, editors, modals)
- Analyze bundle size regularly with visualizer
- Preload critical routes with \`<link rel="preload">\`

**Key Takeaways:**
1. Use \`import()\` for route and component code splitting
2. defineAsyncComponent provides loading states and timeouts for lazy components
3. Regularly analyze bundle size to identify optimization opportunities` },
      { id: 'shallow-ref', title: 'shallowRef & Performance Primitives', content: `**shallowRef and shallowReactive**

For large objects where you only need to track reactivity at the top level, \`shallowRef\` and \`shallowReactive\` avoid the overhead of deep reactivity.

**shallowRef:**
\`\`\`vue
<script setup lang="ts">
import { shallowRef, triggerRef } from 'vue'

// Only the .value assignment is reactive
// Changes to nested properties won't trigger updates
const largeData = shallowRef({
  items: Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`Item \${i}\`,
    nested: { value: i }
  }))
})

function updateFirstItem() {
  // This WON'T trigger re-render
  largeData.value.items[0].name = 'Updated'

  // This WILL trigger re-render
  largeData.value = {
    ...largeData.value,
    items: largeData.value.items.map((item, i) =>
      i === 0 ? { ...item, name: 'Updated' } : item
    )
  }
}

// Or use triggerRef to force update
function forceUpdate() {
  largeData.value.items[0].name = 'Updated'
  triggerRef(largeData)  // Manually trigger reactivity
}
</script>

<template>
  <div>
    <p>First item: {{ largeData.items[0].name }}</p>
    <button @click="updateFirstItem">Update</button>
  </div>
</template>
\`\`\`

**shallowReactive:**
\`\`\`typescript
const state = shallowReactive({
  config: { theme: 'dark', lang: 'en' },
  cache: new Map()
})

// Config changes won't trigger deep reactivity
// But reassigning state.config WILL trigger
\`\`\`

**v-once and v-memo:**
\`\`\`vue
<template>
  <!-- v-once: renders once, never updates -->
  <h1 v-once>{{ expensiveTitle }}</h1>

  <!-- v-memo: only re-renders when dependencies change -->
  <div v-memo="[item.id, item.selected]">
    <p>{{ item.name }} — {{ item.selected ? 'Selected' : '' }}</p>
  </div>

  <!-- v-memo with v-for -->
  <div v-for="item in items" :key="item.id" v-memo="[item.id === selectedId]">
    <p>{{ item.name }}</p>
  </div>
</template>
\`\`\`

**markRaw:**
\`\`\`typescript
import { markRaw } from 'vue'

// Prevent Vue from making an object reactive
const rawComponent = markRaw(MyComponent)
const complexObject = markRaw(largeThirdPartyData)
\`\`\`

**Best Practices:**
- Use \`shallowRef\` for large objects that are replaced entirely
- Use \`triggerRef\` when you mutate shallowRef internals
- Use \`v-once\` for static content that never changes
- Use \`v-memo\` for expensive list items that rarely update
- Use \`markRaw\` for third-party objects that shouldn't be reactive

**Key Takeaways:**
1. shallowRef tracks reactivity only at the top level — no deep watching
2. v-once renders content once and never updates it
3. v-memo caches rendered content and only re-renders when specified dependencies change` },
      { id: 'compile-optimizations', title: 'Compile-Time Optimizations', content: `**Vue Compiler Optimizations**

Vue 3's template compiler performs static analysis at build time to generate optimized render functions.

**Static Hoisting:**
\`\`\`vue
<template>
  <!-- Static nodes are hoisted out of the render function -->
  <div class="static-header">
    <h1>My App</h1>
    <p>This content never changes</p>
  </div>

  <!-- Dynamic node — not hoisted -->
  <p>{{ message }}</p>
</template>
\`\`\`
The compiler hoists static nodes, creating them once and reusing them across renders.

**Patch Flags:**
The compiler adds patch flags to dynamic nodes, telling Vue exactly what can change:
- \`TEXT\` — text content only
- \`CLASS\` — class binding only
- \`STYLE\` — style binding only
- \`PROPS\` — dynamic attributes

**Tree Flattening (Block Tree):**
\`\`\`vue
<template>
  <div>
    <!-- v-if creates a new block — patch only this subtree -->
    <p v-if="show">Conditional content</p>

    <!-- v-for creates a new block — patch only changed items -->
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </div>
</template>
\`\`\`

**Compiler Hints:**
\`\`\`vue
<template>
  <!-- Static content — marked at compile time -->
  <div class="sidebar">
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </div>

  <!-- The compiler generates optimized code:
    1. Static nodes are hoisted
    2. Dynamic nodes have patch flags
    3. Block tree enables targeted updates
  -->
</template>
\`\`\`

**Key Optimizations:**
1. **Static hoisting** — static content created once, shared across renders
2. **Patch flags** — Vue knows exactly what changed, avoids diffing everything
3. **Block tree** — only patches dynamic descendants, not entire DOM
4. **Tree flattening** — flattens the virtual DOM tree for faster traversal

**Best Practices:**
- Keep templates declarative — the compiler optimizes them better than manual render functions
- Use \`v-once\` and \`v-memo\` for expensive static content
- Avoid complex JavaScript in templates — it reduces compiler optimization
- Use \`<script setup>\` for better tree-shaking and smaller bundles

**Key Takeaways:**
1. Vue 3's compiler performs static analysis to generate optimized render functions
2. Static hoisting, patch flags, and block trees significantly improve update performance
3. Declarative templates enable more compiler optimizations than manual render functions` }
    ],
    quiz: [
      {
        id: 1,
        question: 'When does a `shallowRef` trigger reactivity?',
        options: ['When any nested property changes', 'Only when the .value is reassigned', 'Never — it is not reactive', 'Only on the first change'],
        correctIndex: 1,
        explanation: 'shallowRef only tracks reactivity at the top level. It triggers when .value is reassigned, but not when nested properties change. Use triggerRef() to manually trigger updates after nested mutations.'
      },
      {
        id: 2,
        question: 'What does `v-once` do in a template?',
        options: ['Renders the element once and caches it forever', 'Updates only once per user interaction', 'Prevents the element from being re-rendered', 'Makes the element lazy-loaded'],
        correctIndex: 0,
        explanation: 'v-once renders the element and its children once and caches the result. It never re-renders, even if the underlying reactive data changes.'
      },
      {
        id: 3,
        question: 'What is the purpose of Vue\'s patch flags?',
        options: ['They track component errors', 'They tell Vue exactly what changed so it can skip unnecessary diffing', 'They enable server-side rendering', 'They mark components for lazy loading'],
        correctIndex: 1,
        explanation: 'Patch flags are compiler annotations that tell Vue what type of dynamic content a node has (text, class, style, etc.). This lets Vue skip diffing parts of the DOM that haven\'t changed.'
      }
    ]
  },
  {
    id: 512, slug: 'vue-nuxt-fundamentals', title: 'Nuxt.js Fundamentals',
    description: 'Build full-stack Vue applications with Nuxt — SSR, auto-imports, file-based routing, and server routes.',
    level: 'advanced', duration: '50 min',
    objectives: ['Understand Nuxt and server-side rendering (SSR)', 'Use auto-imports and file-based routing', 'Configure Nuxt with nuxt.config.ts', 'Build API routes with server/ directory'],
    topics: [
      { id: 'nuxt-intro', title: 'What is Nuxt?', content: `**Nuxt.js — The Full-Stack Vue Framework**

Nuxt is a higher-level framework built on top of Vue 3 that provides server-side rendering (SSR), static site generation (SSG), and a full-stack development experience out of the box.

**Key Features:**
- **SSR/SSG** — Render Vue on the server for better SEO and performance
- **Auto-imports** — Vue and Nuxt composables are auto-imported
- **File-based routing** — Pages are created from file structure
- **Server routes** — Build API endpoints in the \`server/\` directory
- **Nitro server engine** — Deploy to any platform (Node, Cloudflare, etc.)

**Creating a Nuxt Project:**
\`\`\`bash
npx nuxi init my-nuxt-app
cd my-nuxt-app
npm install
npm run dev
\`\`\`

**Project Structure:**
\`\`\`
my-nuxt-app/
├── pages/              # File-based routes
├── components/         # Auto-imported components
├── composables/        # Auto-imported composables
├── layouts/            # Page layouts
├── server/             # Server API routes
├── public/             # Static assets
├── assets/             # Processed assets
├── plugins/            # Nuxt plugins
├── middleware/          # Route middleware
├── nuxt.config.ts      # Configuration
└── app.vue             # Root component
\`\`\`

**Rendering Modes:**
\`\`\`typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,     // Server-side rendering (default)
  // ssr: false, // Client-side only (SPA)
  // nitro: { prerender: { routes: ['/about'] } }  // SSG
})
\`\`\`

**Best Practices:**
- Use Nuxt for projects requiring SEO, SSR, or SSG
- Keep the \`pages/\` directory organized by feature
- Use auto-imports — don't manually import Vue composables
- Configure \`nuxt.config.ts\` for global settings

**Key Takeaways:**
1. Nuxt provides SSR, SSG, and SPA modes for Vue applications
2. File-based routing and auto-imports simplify project structure
3. The \`server/\` directory enables full-stack API development` },
      { id: 'file-routing', title: 'File-Based Routing', content: `**Nuxt File-Based Routing**

Nuxt automatically generates routes from the file structure inside the \`pages/\` directory.

**Route Mapping:**
\`\`\`
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/
│   ├── index.vue     → /blog
│   └── [slug].vue    → /blog/:slug
├── users/
│   ├── [id].vue      → /users/:id
│   └── [id]/
│       └── posts.vue → /users/:id/posts
└── [...slug].vue     → /:slug (catch-all)
\`\`\`

**Dynamic Routes:**
\`\`\`vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)
</script>

<template>
  <h1>Blog Post: {{ slug }}</h1>
</template>
\`\`\`

**Route Middleware:**
\`\`\`typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return navigateTo('/login')
  }
})
\`\`\`

\`\`\`vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})
</script>
\`\`\`

**Nested Routes with NuxtPage:**
\`\`\`vue
<!-- pages/dashboard.vue -->
<template>
  <div class="dashboard">
    <NuxtPage />
  </div>
</template>

<!-- pages/dashboard/index.vue → /dashboard -->
<!-- pages/dashboard/settings.vue → /dashboard/settings -->
\`\`\`

**Best Practices:**
- Organize pages by feature, not by type
- Use \`definePageMeta\` for per-page middleware and layout
- Use \`navigateTo()\` for programmatic navigation in middleware
- Keep page components thin — delegate logic to composables

**Key Takeaways:**
1. File-based routing maps \`pages/\` files to URL paths automatically
2. Dynamic routes use \`[param]\` syntax in filenames
3. \`definePageMeta\` configures middleware, layout, and other route metadata` },
      { id: 'server-routes', title: 'Server Routes & API', content: `**Nuxt Server Routes**

Nuxt's \`server/\` directory enables building API routes, middleware, and utilities that run on the server only.

**Server API Routes:**
\`\`\`typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const users = await db.users.findMany({
    where: { role: query.role as string }
  })
  return users
})
\`\`\`

\`\`\`typescript
// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await db.users.create({
    data: { name: body.name, email: body.email }
  })
  return user
})
\`\`\`

**Route Parameters:**
\`\`\`typescript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await db.users.findUnique({ where: { id } })
  if (!user) throw createError({ statusCode: 404, message: 'Not found' })
  return user
})
\`\`\`

**Server Middleware:**
\`\`\`typescript
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  if (event.path?.startsWith('/api/')) {
    const token = getHeader(event, 'Authorization')
    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    // Verify token...
  }
})
\`\`\`

**Server Utilities:**
\`\`\`typescript
// server/utils/db.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export function useDb() {
  if (!prisma) prisma = new PrismaClient()
  return prisma
}
\`\`\`

**Best Practices:**
- Use \`[method].ts\` naming for RESTful routes (\`users.get.ts\`, \`users.post.ts\`)
- Keep server code in the \`server/\` directory — it never reaches the client
- Use \`createError()\` for proper HTTP error responses
- Share server utilities with \`server/utils/\`

**Key Takeaways:**
1. Server routes in \`server/\` run only on the server — safe for secrets and database access
2. File naming convention maps HTTP methods (\`[name].get.ts\`, \`[name].post.ts\`)
3. Use \`createError()\` and \`readBody()\` from h3 for request handling` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does SSR provide that a standard SPA does not?',
        options: ['Better component reusability', 'Server-rendered HTML for SEO and faster initial load', 'Automatic code splitting', 'Built-in state management'],
        correctIndex: 1,
        explanation: 'SSR renders Vue components on the server, producing complete HTML that search engines can crawl and that appears faster to users on initial load.'
      },
      {
        id: 2,
        question: 'How does Nuxt determine page routes?',
        options: ['From a routes configuration file', 'From the file structure in the pages/ directory', 'From the components/ directory', 'From nuxt.config.ts only'],
        correctIndex: 1,
        explanation: 'Nuxt uses file-based routing — files in the pages/ directory are automatically mapped to URL routes based on their path and filename.'
      },
      {
        id: 3,
        question: 'Where should you put API routes in a Nuxt project?',
        options: ['In the pages/ directory', 'In the components/ directory', 'In the server/ directory', 'In a separate Express server'],
        correctIndex: 2,
        explanation: 'Nuxt\'s server/ directory contains server-only code. Files like server/api/users.get.ts automatically become API endpoints.'
      }
    ]
  },
  {
    id: 513, slug: 'vue-testing', title: 'Testing Vue',
    description: 'Write reliable tests for Vue applications with Vitest and Vue Test Utils.',
    level: 'advanced', duration: '50 min',
    objectives: ['Set up Vitest and Vue Test Utils', 'Write unit tests for composables', 'Write component tests with mounting and assertions', 'Mock API calls and test async behavior'],
    topics: [
      { id: 'test-setup', title: 'Test Setup & Configuration', content: `**Testing Stack**

Vue recommends **Vitest** as the test runner and **Vue Test Utils** as the component testing library.

**Setup:**
\`\`\`bash
npm install -D vitest @vue/test-utils happy-dom
\`\`\`

**Vitest Config:**
\`\`\`typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',  // Simulates browser DOM
    globals: true,             // Use global test APIs
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
})
\`\`\`

**package.json Scripts:**
\`\`\`json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
\`\`\`

**Basic Test Example:**
\`\`\`typescript
// tests/counter.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter', () => {
  it('renders with initial count', () => {
    const wrapper = mount(Counter, { props: { initial: 5 } })
    expect(wrapper.text()).toContain('5')
  })

  it('increments on button click', async () => {
    const wrapper = mount(Counter, { props: { initial: 0 } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('1')
  })

  it('emits increment event', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('increment')).toHaveLength(1)
  })
})
\`\`\`

**Best Practices:**
- Test behavior, not implementation details
- Use \`happy-dom\` for fast DOM simulation in unit tests
- Keep tests focused — one assertion per concept when possible
- Run tests in watch mode during development

**Key Takeaways:**
1. Vitest is the recommended test runner for Vue/Vite projects
2. Vue Test Utils provides the \`mount()\` and \`shallowMount()\` APIs for component testing
3. Use happy-dom or jsdom as the test environment for DOM simulation` },
      { id: 'component-testing', title: 'Component Testing Patterns', content: `**Testing Vue Components**

Component tests verify that a component renders correctly and responds to user interactions.

**Mounting Components:**
\`\`\`typescript
import { mount, shallowMount } from '@vue/test-utils'
import UserCard from '@/components/UserCard.vue'

// Full mount (renders child components)
const wrapper = mount(UserCard, {
  props: {
    user: { name: 'Alice', email: 'alice@test.com' }
  },
  global: {
    plugins: [pinia, router],
    stubs: { RouterLink: true }
  }
})

// Shallow mount (stubs child components)
const wrapper = shallowMount(UserCard, {
  props: { user: { name: 'Alice', email: 'alice@test.com' } }
})
\`\`\`

**Querying & Assertions:**
\`\`\`typescript
describe('UserCard', () => {
  it('displays user name and email', () => {
    const wrapper = mount(UserCard, {
      props: { user: { name: 'Alice', email: 'alice@test.com' } }
    })

    expect(wrapper.find('h2').text()).toBe('Alice')
    expect(wrapper.find('.email').text()).toBe('alice@test.com')
  })

  it('hides email when showEmail is false', () => {
    const wrapper = mount(UserCard, {
      props: { user: { name: 'Alice' }, showEmail: false }
    })

    expect(wrapper.find('.email').exists()).toBe(false)
  })

  it('calls delete when button clicked', async () => {
    const wrapper = mount(UserCard, {
      props: { user: { id: 1, name: 'Alice' } }
    })

    await wrapper.find('.delete-btn').trigger('click')
    expect(wrapper.emitted('delete')).toEqual([[1]])
  })
})
\`\`\`

**Testing Composables:**
\`\`\`typescript
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('increments count', () => {
    const { count, increment } = useCounter(0)
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })

  it('computes doubled value', () => {
    const { count, doubled, increment } = useCounter(5)
    expect(doubled.value).toBe(10)
    increment()
    expect(doubled.value).toBe(12)
  })
})
\`\`\`

**Best Practices:**
- Use \`shallowMount\` for isolated component tests
- Use \`find()\`, \`findAll()\`, \`text()\`, \`exists()\` for assertions
- Test emitted events with \`wrapper.emitted()\`
- Mock child components with \`stubs\` for focused testing

**Key Takeaways:**
1. \`mount()\` renders full component tree; \`shallowMount()\` stubs children
2. Test user interactions with \`.trigger()\` and assert with DOM queries
3. Test composables directly by calling them outside components` },
      { id: 'mocking', title: 'Mocking & Async Testing', content: `**Mocking Dependencies**

Test components in isolation by mocking API calls, external modules, and browser APIs.

**Mocking API Calls:**
\`\`\`typescript
import { vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserProfile from '@/components/UserProfile.vue'

// Mock fetch globally
const mockFetch = vi.fn()
globalThis.fetch = mockFetch

describe('UserProfile', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('loads and displays user data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Alice', bio: 'Developer' })
    })

    const wrapper = mount(UserProfile, {
      props: { userId: 1 }
    })

    expect(wrapper.text()).toContain('Loading...')

    await flushPromises()  // Wait for async operations

    expect(wrapper.text()).toContain('Alice')
    expect(mockFetch).toHaveBeenCalledWith('/api/users/1')
  })

  it('handles fetch error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    const wrapper = mount(UserProfile, {
      props: { userId: 1 }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Error')
  })
})
\`\`\`

**Mocking Modules:**
\`\`\`typescript
import { vi } from 'vitest'

// Mock entire module
vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({
    user: ref({ name: 'Mocked User' }),
    isAuthenticated: ref(true),
    login: vi.fn(),
    logout: vi.fn()
  })
}))

// Mock specific function
vi.mock('@/api/users', () => ({
  fetchUsers: vi.fn().mockResolvedValue([
    { id: 1, name: 'Alice' }
  ])
}))
\`\`\`

**Timer Mocking:**
\`\`\`typescript
vi.useFakeTimers()

it('debounces search input', async () => {
  const wrapper = mount(SearchInput)
  await wrapper.find('input').setValue('vue')

  vi.advanceTimersByTime(300)

  expect(mockSearch).toHaveBeenCalledWith('vue')
})

vi.useRealTimers()
\`\`\`

**Best Practices:**
- Mock at the boundary — mock external services, not internal logic
- Reset mocks in \`beforeEach\` to prevent test pollution
- Use \`vi.fn()\` for function mocks, \`vi.mock()\` for module mocks
- Use \`flushPromises()\` to wait for async component updates

**Key Takeaways:**
1. Use \`vi.fn()\` and \`vi.mock()\` to mock functions and modules
2. Mock \`fetch\` or \`axios\` at the global level for API testing
3. Use \`vi.useFakeTimers()\` and \`vi.advanceTimersByTime()\` for timer-dependent code` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between mount() and shallowMount()?',
        options: ['mount() is faster, shallowMount() is slower', 'mount() renders full component tree, shallowMount() stubs child components', 'mount() is for unit tests, shallowMount() for integration', 'They are identical'],
        correctIndex: 1,
        explanation: 'mount() renders the full component tree including child components. shallowMount() stubs out child components, making tests faster and more isolated.'
      },
      {
        id: 2,
        question: 'Why use Vitest instead of Jest for Vue 3 projects?',
        options: ['Jest does not support Vue 3', 'Vitest is faster with Vite, uses ESM natively, and has Vue plugin support', 'Vitest has more features than Jest', 'Vue recommends Vitest for no specific reason'],
        correctIndex: 1,
        explanation: 'Vitest runs on Vite\'s dev server, providing faster test execution with native ESM support. It integrates seamlessly with Vue\'s Vite-based tooling.'
      },
      {
        id: 3,
        question: 'How do you wait for async operations to complete in a test?',
        options: ['setTimeout()', 'await flushPromises()', 'waitFor() from @vue/test-utils', 'vi.runAllTimers()'],
        correctIndex: 1,
        explanation: 'flushPromises() resolves all pending Promise microtasks, allowing the component to finish async operations like API calls before making assertions.'
      }
    ]
  },
  {
    id: 514, slug: 'vue-3-internals', title: 'Vue 3 Internals',
    description: 'Understand Vue\'s internal architecture — virtual DOM, reactivity proxy system, and template compiler.',
    level: 'advanced', duration: '50 min',
    objectives: ['Understand the virtual DOM diffing algorithm', 'Learn how Vue 3 reactivity works with Proxies', 'Understand template compilation to render functions', 'Grasp the component update lifecycle internals'],
    topics: [
      { id: 'vdom', title: 'Virtual DOM & Diffing', content: `**Virtual DOM in Vue 3**

Vue uses a virtual DOM (VDOM) — a lightweight JavaScript representation of the actual DOM. When state changes, Vue creates a new VDOM tree and efficiently patches the real DOM.

**How It Works:**
\`\`\`
State Change
    ↓
New Virtual DOM Tree Created
    ↓
Diffing (Compare old vs new VDOM)
    ↓
Patch Only Changed Nodes to Real DOM
\`\`\`

**Vue 3's Improved VDOM:**
- **Block Tree** — Static nodes are hoisted and skipped during diffing
- **Patch Flags** — Each dynamic node is marked with what can change
- **Tree Flattening** — Flat array of dynamic nodes for faster traversal
- **Static Hoisting** — Static content created once, reused

**Render Function:**
\`\`\`typescript
import { h, ref } from 'vue'

// The template compiler generates code like this:
// <div>{{ message }}</div>
// Compiles to:
function render() {
  return h('div', message.value)
}
\`\`\`

**Patch Algorithm:**
\`\`\`
1. Same type node?
   → Yes: Update changed properties
   → No: Replace the node entirely
2. Has key?
   → Yes: Reorder/insert/remove by key
   → No: Replace in order
3. Children?
   → Compare children with optimized diffing
\`\`\`

**Performance Characteristics:**
- O(n) diffing with block tree optimization
- Static content is skipped entirely during diff
- Patch flags tell Vue exactly what to update
- Tree flattening enables linear traversal of dynamic nodes

**Best Practices:**
- Keep templates declarative — the compiler optimizes better than manual render functions
- Use \`v-once\` and \`v-memo\` for static/expensive content
- Avoid re-rendering large component trees unnecessarily
- Use \`shallowRef\` for large objects to avoid deep reactivity overhead

**Key Takeaways:**
1. Vue 3 uses an optimized VDOM with block trees, patch flags, and static hoisting
2. The diffing algorithm runs in O(n) time with block tree optimization
3. Template compilation produces optimized render functions — prefer templates over manual render functions` },
      { id: 'reactivity-proxy', title: 'Reactivity with Proxies', content: `**Vue 3 Reactivity Internals**

Vue 3's reactivity system uses JavaScript Proxy objects to intercept property access and modifications, enabling automatic dependency tracking and updates.

**How Proxies Work:**
\`\`\`typescript
// Simplified version of Vue's reactivity
const target = { count: 0 }

const proxy = new Proxy(target, {
  get(target, key, receiver) {
    track(target, key)  // Record dependency
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key)  // Notify dependents
    return result
  }
})
\`\`\`

**Dependency Tracking:**
\`\`\`
Component Render
    ↓
Accesses reactive data (get trap triggered)
    ↓
Current effect (render function) is tracked
    ↓
Effect is added as dependency of the data
    ↓
Data changes (set trap triggered)
    ↓
All dependent effects are re-run
\`\`\`

**Reactive vs ref Internals:**
\`\`\`typescript
// reactive() wraps the object directly in a Proxy
const state = reactive({ count: 0 })
// state is a Proxy object

// ref() wraps the value in a { value: ... } object with a Proxy getter
const count = ref(0)
// count.value triggers the get/set trap
\`\`\`

**Effect System:**
\`\`\`typescript
import { effect } from 'vue'

const data = reactive({ count: 0 })

effect(() => {
  // This runs when data.count changes
  console.log('Count:', data.count)
})

data.count++  // Triggers the effect
\`\`\`

**WeakMap for Dependency Storage:**
- Dependencies are stored in a WeakMap keyed by the target object
- This allows garbage collection when the target is no longer referenced
- Each property has its own Set of dependent effects

**Key Takeaways:**
1. Vue 3 reactivity uses Proxy to intercept property access and modification
2. Dependencies are tracked automatically when effects access reactive data
3. The WeakMap-based storage enables efficient garbage collection` },
      { id: 'compiler', title: 'Template Compiler', content: `**Vue Template Compiler**

The Vue template compiler transforms SFC templates into optimized JavaScript render functions at build time.

**Compilation Process:**
\`\`\`
Template String
    ↓ (1. Parse)
AST (Abstract Syntax Tree)
    ↓ (2. Transform)
Optimized AST
    ↓ (3. Generate)
Render Function Code
\`\`\`

**Example Compilation:**
\`\`\`vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="count++">Click</button>
  </div>
</template>
\`\`\`

Compiles to something like:
\`\`\`typescript
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx) {
  return (_openBlock(), _createElementBlock("div", null, [
    _createElementVNode("p", null, _toDisplayString(_ctx.message), 1 /* TEXT */),
    _createElementVNode("button", {
      onClick: _ctx.count++
    }, "Click", 8 /* PROPS */, ["onClick"])
  ]))
}
\`\`\`

**Patch Flags in Compiled Output:**
- \`1 /* TEXT */\` — Dynamic text content
- \`2 /* CLASS */\` — Dynamic class binding
- \`4 /* STYLE */\` — Dynamic style binding
- \`8 /* PROPS */\` — Dynamic attributes

**Block Tree Optimization:**
- The compiler identifies "blocks" (elements with dynamic content)
- Static nodes within blocks are hoisted out of the render function
- Only dynamic nodes are included in the block's children array

**SFC Compilation:**
\`\`\`typescript
// @vue/compiler-sfc processes each section:
1. <script> → Compiled to module code
2. <template> → Compiled to render function
3. <style> → Injected with scoped attributes
\`\`\`

**Best Practices:**
- Use templates for most cases — they enable more compiler optimizations
- Use render functions only for highly dynamic component logic
- Understand patch flags to write more efficient templates
- Keep template expressions simple for better compilation

**Key Takeaways:**
1. The template compiler parses, transforms, and generates optimized render functions
2. Patch flags and block trees enable precise DOM updates
3. Templates enable more compiler optimizations than manual render functions` }
    ],
    quiz: [
      {
        id: 1,
        question: 'How does Vue 3\'s block tree optimization improve diffing performance?',
        options: ['It caches the entire virtual DOM', 'It skips static nodes entirely during the diffing process', 'It uses Web Workers for parallel diffing', 'It pre-compiles all possible state changes'],
        correctIndex: 1,
        explanation: 'Block trees identify static nodes and hoist them out of the render function. During diffing, Vue only traverses the block\'s dynamic children, skipping all static content.'
      },
      {
        id: 2,
        question: 'What JavaScript feature does Vue 3 use for its reactivity system?',
        options: ['Object.defineProperty (like Vue 2)', 'Proxy objects', 'Symbol-based observers', 'WeakRef tracking'],
        correctIndex: 1,
        explanation: 'Vue 3 uses JavaScript Proxy objects to intercept property access (get) and modification (set), enabling automatic dependency tracking and reactive updates.'
      },
      {
        id: 3,
        question: 'What does a patch flag of `1 /* TEXT */` mean?',
        options: ['The node has a dynamic class', 'The node has dynamic text content only', 'The node has dynamic style', 'The node has dynamic attributes'],
        correctIndex: 1,
        explanation: 'Patch flag 1 (TEXT) tells Vue that only the text content of this node can change. Vue skips checking classes, styles, and attributes, updating only the text.'
      }
    ]
  },
  {
    id: 515, slug: 'vue-architecture', title: 'Vue Architecture & Patterns',
    description: 'Design scalable Vue applications with architectural patterns, plugins, and micro-frontend strategies.',
    level: 'advanced', duration: '50 min',
    objectives: ['Design scalable Vue application architecture', 'Create and use Vue plugins', 'Implement micro-frontend patterns with Vue', 'Apply advanced design patterns'],
    topics: [
      { id: 'architecture-patterns', title: 'Application Architecture', content: `**Scalable Vue Architecture**

As Vue applications grow, organizing code with clear patterns prevents technical debt and improves developer experience.

**Feature-Based Folder Structure:**
\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   ├── composables/
│   │   │   └── useAuth.ts
│   │   ├── stores/
│   │   │   └── auth.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── components/
│   │   ├── composables/
│   │   └── index.ts
│   └── shared/
│       ├── components/
│       │   ├── Button.vue
│       │   └── Modal.vue
│       ├── composables/
│       │   └── useLocalStorage.ts
│       └── utils/
│           └── formatters.ts
├── app.vue
└── main.ts
\`\`\`

**Feature Module Pattern:**
\`\`\`typescript
// features/auth/index.ts
export { useAuthStore } from './stores/auth'
export { useAuth } from './composables/useAuth'
export type { User, LoginCredentials } from './types/auth.types'
\`\`\`

**Shared State Pattern:**
\`\`\`typescript
// shared/composables/useNotification.ts
import { ref } from 'vue'

const notifications = ref<{ id: number; message: string; type: string }[]>([])
let nextId = 0

export function useNotification() {
  function notify(message: string, type = 'info') {
    const id = nextId++
    notifications.value.push({ id, message, type })
    setTimeout(() => dismiss(id), 5000)
  }

  function dismiss(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return { notifications, notify, dismiss }
}
\`\`\`

**Layered Architecture:**
\`\`\`
Presentation Layer  → Vue Components
Business Logic Layer → Composables, Stores
Data Layer          → API clients, services
Infrastructure Layer → Router, plugins, config
\`\`\`

**Best Practices:**
- Organize by feature, not by file type
- Keep shared code in a \`shared/\` or \`common/\` directory
- Use barrel exports (\`index.ts\`) for clean imports
- Separate concerns: components for UI, composables for logic, stores for global state

**Key Takeaways:**
1. Feature-based organization scales better than file-type grouping
2. Shared composables and components belong in a shared directory
3. Layered architecture separates UI, business logic, and data access` },
      { id: 'plugins', title: 'Vue Plugins & Extensibility', content: `**Creating Vue Plugins**

Plugins extend Vue's global functionality. They can add global properties, directives, methods, or inject dependencies.

**Plugin Structure:**
\`\`\`typescript
// plugins/analytics.ts
import type { App, Plugin } from 'vue'

interface AnalyticsOptions {
  trackingId: string
  debug?: boolean
}

export const AnalyticsPlugin: Plugin = {
  install(app: App, options: AnalyticsOptions) {
    // Add global property
    app.config.globalProperties.$analytics = {
      track(event: string, data?: Record<string, unknown>) {
        if (options.debug) console.log('[Analytics]', event, data)
        // Send to analytics service
        fetch('/api/analytics', {
          method: 'POST',
          body: JSON.stringify({ event, data, trackingId: options.trackingId })
        })
      },
      page(pageName: string) {
        this.track('page_view', { page: pageName })
      }
    }

    // Provide/inject
    app.provide('analytics', app.config.globalProperties.$analytics)

    // Global directive
    app.directive('track-click', {
      mounted(el, binding) {
        el.addEventListener('click', () => {
          app.config.globalProperties.$analytics.track('click', {
            element: binding.value
          })
        })
      }
    })
  }
}
\`\`\`

**Using the Plugin:**
\`\`\`typescript
// main.ts
import { AnalyticsPlugin } from './plugins/analytics'

app.use(AnalyticsPlugin, {
  trackingId: 'UA-XXXXX',
  debug: import.meta.env.DEV
})
\`\`\`

\`\`\`vue
<script setup lang="ts">
import { inject } from 'vue'

const analytics = inject('analytics')
analytics?.page('home')
</script>

<template>
  <button v-track-click="'hero-cta'">Get Started</button>
</template>
\`\`\`

**Best Practices:**
- Use plugins for cross-cutting concerns: analytics, i18n, error tracking
- Accept typed options via generics for type safety
- Provide both globalProperties and provide/inject for flexibility
- Keep plugins focused — one concern per plugin

**Key Takeaways:**
1. Plugins extend Vue globally with properties, directives, and providers
2. Use \`app.use(plugin, options)\` to install plugins
3. Plugins are ideal for cross-cutting concerns like analytics and error tracking` },
      { id: 'micro-frontends', title: 'Micro-Frontends with Vue', content: `**Micro-Frontend Architecture**

Micro-frontends decompose a frontend into independent, deployable pieces that can be developed and deployed by separate teams.

**Approaches:**
1. **Module Federation** — Share modules at runtime (Webpack/Vite)
2. **iframe** — Embed separate apps in iframes
3. **Web Components** — Framework-agnostic component boundary
4. **Vue-based** — Use Vue's dynamic components

**Module Federation with Vite:**
\`\`\`typescript
// host/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
        remoteApp: 'http://localhost:5001/assets/remoteEntry.js'
      }
    })
  ]
})
\`\`\`

\`\`\`vue
<!-- host/src/App.vue -->
<script setup>
import { ref, defineAsyncComponent } from 'vue'

const RemoteComponent = defineAsyncComponent(() =>
  import('remoteApp/Widget')
)
</script>

<template>
  <h1>Host App</h1>
  <RemoteComponent />
</template>
\`\`\`

**Shared State Pattern:**
\`\`\`typescript
// shared/state-bus.ts
import { reactive } from 'vue'

// Cross-micro-frontend communication
export const sharedState = reactive({
  user: null as User | null,
  theme: 'light',
  locale: 'en'
})

export function updateSharedState(key: string, value: unknown) {
  ;(sharedState as any)[key] = value
}
\`\`\`

**Best Practices:**
- Define clear API boundaries between micro-frontends
- Use shared libraries for common UI components (design system)
- Implement a shared state bus for cross-app communication
- Deploy micro-frontends independently with separate CI/CD
- Monitor shared dependencies to avoid version conflicts

**Key Takeaways:**
1. Micro-frontends enable independent deployment and team autonomy
2. Module Federation allows runtime module sharing between apps
3. Shared state and clear API boundaries are critical for coordination` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary benefit of feature-based folder structure?',
        options: ['It reduces the number of files', 'It co-locates related code by domain, making features easier to navigate and maintain', 'It makes components render faster', 'It automatically code-splits features'],
        correctIndex: 1,
        explanation: 'Feature-based organization groups related components, composables, stores, and types by domain feature, making it easier to understand, modify, and test each feature independently.'
      },
      {
        id: 2,
        question: 'What does a Vue plugin\'s `install()` function receive?',
        options: ['The Vue instance and route config', 'The app instance and plugin options', 'The component context and props', 'The store and router'],
        correctIndex: 1,
        explanation: 'The install() function receives the Vue app instance and any options passed to app.use(). It can add global properties, directives, providers, and more.'
      },
      {
        id: 3,
        question: 'Which approach allows micro-frontends to share modules at runtime?',
        options: ['iframe embedding', 'Module Federation', 'CSS isolation', 'Shared npm packages'],
        correctIndex: 1,
        explanation: 'Module Federation (from Webpack/Vite) allows micro-frontends to dynamically import and share modules at runtime, enabling independent deployments without rebuilding.'
      }
    ]
  }
];

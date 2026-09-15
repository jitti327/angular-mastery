import { Lesson } from '../models/lesson.model';

export const JS_ADVANCED_LESSONS: Lesson[] = [
  {
    id: 115, slug: 'js-performance', title: 'Performance Optimization',
    description: 'Master JavaScript performance techniques.',
    level: 'advanced', duration: '35 min',
    objectives: ['Optimize loops', 'Use memoization', 'Implement lazy loading'],
    topics: [
      { id: 'loops', title: 'Loop Optimization', content: `**Practice:**\n\`\`\`javascript\n// Slow - forEach\narr.forEach(item => process(item));\n\n// Fast - for loop\nfor (let i = 0; i < arr.length; i++) {\n  process(arr[i]);\n}\n\n// Fast - for...of\nfor (const item of arr) {\n  process(item);\n}\n\n// Avoid creating functions in loops\n// BAD\nfor (let i = 0; i < 1000; i++) {\n  arr.push(() => i);\n}\n\n// GOOD\nconst createFn = (i) => () => i;\nfor (let i = 0; i < 1000; i++) {\n  arr.push(createFn(i));\n}\n\`\`\`` },
      { id: 'memoization', title: 'Memoization', content: `**Practice:**\n\`\`\`javascript\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\n// Usage\nconst expensiveCalc = memoize((n) => {\n  console.log("Computing...");\n  return n * n;\n});\n\nexpensiveCalc(4); // Computing... 16\nexpensiveCalc(4); // 16 (cached)\n\`\`\`` },
      { id: 'lazy-loading', title: 'Lazy Loading', content: `**Practice:**\n\`\`\`javascript\n// Lazy load images\nconst lazyImages = document.querySelectorAll("img[data-src]");\nconst imageObserver = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src;\n      imageObserver.unobserve(img);\n    }\n  });\n});\n\nlazyImages.forEach(img => imageObserver.observe(img));\n\n// Lazy load components\ndefer(() => import("./heavy-component.js"));\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why is memoization useful for performance?',
        options: ['It reduces memory usage', 'It caches results to avoid redundant computations', 'It makes code shorter', 'It eliminates loops'],
        correctIndex: 1,
        explanation: 'Memoization stores the results of expensive function calls and returns the cached result when the same inputs occur again.'
      },
      {
        id: 2,
        question: 'Why should you avoid creating functions inside loops?',
        options: ['It causes syntax errors', 'Each iteration creates a new function object, consuming memory', 'Functions cannot access loop variables', 'It makes code unreadable'],
        correctIndex: 1,
        explanation: 'Creating functions in loops allocates new function objects on each iteration, increasing memory pressure and GC activity.'
      },
      {
        id: 3,
        question: 'What is the benefit of lazy loading components?',
        options: ['Components run faster', 'Only loads code when needed, reducing initial bundle size', 'Improves security', 'Reduces network requests'],
        correctIndex: 1,
        explanation: 'Lazy loading defers loading of non-critical code until it is needed, reducing the initial page load time.'
      }
    ]
  },
  {
    id: 116, slug: 'js-concurrency', title: 'Concurrency & Web Workers',
    description: 'Master concurrent JavaScript with Web Workers.',
    level: 'advanced', duration: '35 min',
    objectives: ['Use Web Workers', 'Implement message passing', 'Handle concurrency'],
    topics: [
      { id: 'web-workers', title: 'Web Workers', content: `**Practice:**\n\`\`\`javascript\n// worker.js\nself.onmessage = (event) => {\n  const { data } = event;\n  const result = heavyComputation(data);\n  self.postMessage(result);\n};\n\n// main.js\nconst worker = new Worker("worker.js");\nworker.postMessage(data);\nworker.onmessage = (event) => {\n  console.log("Result:", event.data);\n};\n\`\`\`` },
      { id: 'shared-array-buffer', title: 'SharedArrayBuffer', content: `**Practice:**\n\`\`\`javascript\n// Shared memory between workers\nconst buffer = new SharedArrayBuffer(1024);\nconst arr = new Int32Array(buffer);\n\nworker1.postMessage(buffer);\nworker2.postMessage(buffer);\n\n// Atomics for synchronization\nAtomics.add(arr, 0, 1);\nAtomics.load(arr, 0);\n\`\`\`` },
      { id: 'async-iteration', title: 'Async Iteration', content: `**Practice:**\n\`\`\`javascript\n// Async generator\nasync function* fetchPages(url) {\n  let page = 1;\n  while (true) {\n    const response = await fetch(\`\${url}?page=\${page}\`);\n    const data = await response.json();\n    if (data.length === 0) break;\n    yield data;\n    page++;\n  }\n}\n\n// Usage\nfor await (const page of fetchPages("https://api.example.com/items")) {\n  console.log(page);\n}\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the main purpose of Web Workers?',
        options: ['To speed up rendering', 'To run heavy computations in a separate thread without blocking the main thread', 'To manage DOM events', 'To handle HTTP requests'],
        correctIndex: 1,
        explanation: 'Web Workers run JavaScript in a background thread, preventing heavy computations from blocking the main UI thread.'
      },
      {
        id: 2,
        question: 'How do Web Workers communicate with the main thread?',
        options: ['Direct variable access', 'Message passing via postMessage/onmessage', 'Shared global scope', 'Through the DOM'],
        correctIndex: 1,
        explanation: 'Web Workers use message passing (postMessage/onmessage) since they cannot directly access the DOM or shared memory (unless using SharedArrayBuffer).'
      },
      {
        id: 3,
        question: 'What is the `for await...of` loop used for?',
        options: ['Iterating over synchronous arrays', 'Iterating over async iterables', 'Running promises in parallel', 'Creating async generators'],
        correctIndex: 1,
        explanation: 'for await...of is used to iterate over async iterables (objects implementing Symbol.asyncIterator), awaiting each value.'
      }
    ]
  },
  {
    id: 117, slug: 'js-security', title: 'Security Best Practices',
    description: 'Master JavaScript security patterns.',
    level: 'advanced', duration: '30 min',
    objectives: ['Prevent XSS', 'Handle CSRF', 'Sanitize inputs'],
    topics: [
      { id: 'xss', title: 'XSS Prevention', content: `**Practice:**\n\`\`\`javascript\n// Sanitize HTML\nfunction sanitizeHTML(str) {\n  const div = document.createElement("div");\n  div.textContent = str;\n  return div.innerHTML;\n}\n\n// Prevent XSS in innerHTML\nconst userInput = "<script>alert('XSS')</script>";\nelement.textContent = userInput; // Safe\nelement.innerHTML = userInput; // Dangerous!\n\`\`\`` },
      { id: 'content-security', title: 'Content Security', content: `**Practice:**\n\`\`\`javascript\n// CSP Headers\nContent-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'\n\n// Avoid eval\neval(userInput); // Never!\nnew Function(userInput); // Never!\n\n// Use JSON for data\nconst data = JSON.parse(safeInput);\n\`\`\`` },
      { id: 'input-validation', title: 'Input Validation', content: `**Practice:**\n\`\`\`javascript\n// Validate email\nfunction isValidEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n\n// Validate URL\nfunction isValidURL(url) {\n  try {\n    new URL(url);\n    return true;\n  } catch {\n    return false;\n  }\n}\n\n// Sanitize input\nfunction sanitize(input) {\n  return input\n    .replace(/[<>]/g, "")\n    .replace(/\\/\\//g, "")\n    .trim();\n}\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'Why is `element.innerHTML = userInput` dangerous?',
        options: ['It is too slow', 'It can execute malicious scripts (XSS)', 'It causes memory leaks', 'It only works in Chrome'],
        correctIndex: 1,
        explanation: 'innerHTML parses the string as HTML, so malicious scripts in user input can be executed, leading to Cross-Site Scripting (XSS) attacks.'
      },
      {
        id: 2,
        question: 'Why should you never use `eval()` with user input?',
        options: ['It is deprecated', 'It executes arbitrary code, creating a severe security risk', 'It only works in strict mode', 'It returns undefined'],
        correctIndex: 1,
        explanation: 'eval() executes any string as JavaScript code. If user input is passed to eval(), an attacker can run arbitrary malicious code.'
      },
      {
        id: 3,
        question: 'What does setting `textContent` instead of `innerHTML` prevent?',
        options: ['SQL injection', 'XSS attacks', 'CSRF attacks', 'Clickjacking'],
        correctIndex: 1,
        explanation: 'textContent treats input as plain text, not HTML, preventing script injection (XSS) that innerHTML would allow.'
      }
    ]
  },
  {
    id: 118, slug: 'js-testing-patterns', title: 'Testing Patterns',
    description: 'Master JavaScript testing patterns.',
    level: 'advanced', duration: '35 min',
    objectives: ['Write unit tests', 'Mock dependencies', 'Test async code'],
    topics: [
      { id: 'unit-testing', title: 'Unit Testing', content: `**Practice:**\n\`\`\`javascript\n// test.js\nfunction add(a, b) {\n  return a + b;\n}\n\ndescribe("add", () => {\n  it("should add two numbers", () => {\n    expect(add(1, 2)).toBe(3);\n  });\n\n  it("should handle negative numbers", () => {\n    expect(add(-1, -2)).toBe(-3);\n  });\n});\n\`\`\`` },
      { id: 'mocking', title: 'Mocking', content: `**Practice:**\n\`\`\`javascript\n// Mock function\nconst mockFn = jest.fn();\nmockFn.mockReturnValue(42);\nmockFn(); // 42\n\n// Mock module\njest.mock("./api.js");\nimport { fetchData } from "./api.js";\nfetchData.mockResolvedValue({ data: "test" });\n\n// Spy on method\nconst spy = jest.spyOn(object, "method");\nobject.method();\nexpect(spy).toHaveBeenCalled();\n\`\`\`` },
      { id: 'async-testing', title: 'Async Testing', content: `**Practice:**\n\`\`\`javascript\n// Async test\nit("should fetch data", async () => {\n  const data = await fetchData();\n  expect(data).toBeDefined();\n});\n\n// Promise test\nit("should resolve", () => {\n  return expect(asyncFunction()).resolves.toBe(42);\n});\n\n// Mock async\njest.spyOn(api, "fetch").mockResolvedValue({ id: 1 });\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the purpose of mocking in unit tests?',
        options: ['To make tests run faster', 'To isolate the code under test by replacing dependencies with controlled substitutes', 'To test the entire application', 'To replace the test framework'],
        correctIndex: 1,
        explanation: 'Mocking replaces real dependencies with controlled substitutes, allowing you to test a function in isolation without external side effects.'
      },
      {
        id: 2,
        question: 'What does `jest.spyOn(object, "method")` do?',
        options: ['Replaces the method permanently', 'Wraps the method to track calls while preserving original behavior', 'Deletes the method', 'Creates a new method on the object'],
        correctIndex: 1,
        explanation: 'jest.spyOn wraps an existing method to track calls (and optionally mock behavior) while still calling the original implementation by default.'
      },
      {
        id: 3,
        question: 'How do you test an async function that returns a Promise?',
        options: ['Use synchronous assertions', 'Use async/await or return the Promise from the test', 'Wrap in setTimeout', 'Use console.log'],
        correctIndex: 1,
        explanation: 'Async tests should either use async/await or return the Promise directly so the test framework can properly handle the asynchronous resolution.'
      }
    ]
  },
  {
    id: 119, slug: 'js-design-patterns', title: 'Design Patterns',
    description: 'Master JavaScript design patterns.',
    level: 'advanced', duration: '40 min',
    objectives: ['Implement Singleton', 'Use Factory pattern', 'Apply Observer pattern'],
    topics: [
      { id: 'singleton', title: 'Singleton', content: `**Practice:**\n\`\`\`javascript\nclass Database {\n  static #instance;\n\n  constructor() {\n    if (Database.#instance) {\n      return Database.#instance;\n    }\n    this.connection = this.connect();\n    Database.#instance = this;\n  }\n\n  connect() {\n    return "Connected";\n  }\n\n  static getInstance() {\n    if (!Database.#instance) {\n      Database.#instance = new Database();\n    }\n    return Database.#instance;\n  }\n}\n\nconst db1 = Database.getInstance();\nconst db2 = Database.getInstance();\nconsole.log(db1 === db2); // true\n\`\`\`` },
      { id: 'factory', title: 'Factory Pattern', content: `**Practice:**\n\`\`\`javascript\nclass UserFactory {\n  static create(type, data) {\n    switch (type) {\n      case "admin":\n        return new Admin(data);\n      case "user":\n        return new User(data);\n      case "guest":\n        return new Guest(data);\n      default:\n        throw new Error(\`Unknown type: \${type}\`);\n    }\n  }\n}\n\nconst admin = UserFactory.create("admin", { name: "John" });\n\`\`\`` },
      { id: 'observer', title: 'Observer Pattern', content: `**Practice:**\n\`\`\`javascript\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(event, callback) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(callback);\n  }\n\n  emit(event, ...args) {\n    const callbacks = this.events[event] || [];\n    callbacks.forEach(cb => cb(...args));\n  }\n\n  off(event, callback) {\n    this.events[event] = this.events[event]?.filter(cb => cb !== callback);\n  }\n}\n\nconst emitter = new EventEmitter();\nemitter.on("data", (data) => console.log(data));\nemitter.emit("data", "Hello"); // "Hello"\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What problem does the Singleton pattern solve?',
        options: ['Creating multiple instances', 'Ensuring only one instance of a class exists', 'Improving performance', 'Simplifying code'],
        correctIndex: 1,
        explanation: 'The Singleton pattern ensures that only one instance of a class is created and provides a global point of access to it.'
      },
      {
        id: 2,
        question: 'What is the key difference between the Factory and Builder patterns?',
        options: ['Factory creates different types based on input, Builder constructs complex objects step by step', 'Factory is faster', 'Builder uses inheritance', 'They are identical'],
        correctIndex: 0,
        explanation: 'Factory Pattern creates objects of different types based on parameters, while Builder Pattern constructs a complex object step by step with a fluent API.'
      },
      {
        id: 3,
        question: 'In the Observer pattern, what does the `emit()` method do?',
        options: ['Removes all listeners', 'Calls all registered callbacks for the specified event', 'Creates a new event', 'Returns the event data'],
        correctIndex: 1,
        explanation: 'emit() triggers all callbacks registered for a specific event, passing any arguments to each callback function.'
      }
    ]
  },
  {
    id: 120, slug: 'js-interview-prep', title: 'Interview Preparation',
    description: 'JavaScript interview questions and answers.',
    level: 'advanced', duration: '45 min',
    objectives: ['Answer common questions', 'Demonstrate deep knowledge', 'Solve coding challenges'],
    topics: [
      { id: 'hoisting', title: 'Hoisting', content: `**Practice:**\n\`\`\`javascript\n// Variables\nconsole.log(x); // undefined (var is hoisted)\nvar x = 5;\n\nconsole.log(y); // ReferenceError (let/const not hoisted)\nlet y = 5;\n\n// Functions\nfoo(); // Works (function declaration hoisted)\nfunction foo() {\n  console.log("foo");\n}\n\nbar(); // ReferenceError (function expression not hoisted)\nconst bar = () => console.log("bar");\n\`\`\`` },
      { id: 'this', title: 'This Keyword', content: `**Practice:**\n\`\`\`javascript\n// Global context\nconsole.log(this); // window (browser) or global (Node)\n\n// Function context\nfunction foo() {\n  console.log(this); // window (non-strict) or undefined (strict)\n}\n\n// Object method\nconst obj = {\n  name: "John",\n  greet() {\n    console.log(this.name); // "John"\n  }\n};\n\n// Arrow function (inherits this)\nconst obj = {\n  name: "John",\n  greet: () => {\n    console.log(this.name); // undefined (inherits outer this)\n  }\n};\n\n// call/apply/bind\nfunction greet(greeting) {\n  console.log(\`\${greeting}, \${this.name}\`);\n}\n\ngreet.call({ name: "John" }, "Hello");\ngreet.apply({ name: "John" }, ["Hello"]);\nconst boundGreet = greet.bind({ name: "John" });\nboundGreet("Hello");\n\`\`\`` },
      { id: 'closures-interview', title: 'Closures', content: `**Practice:**\n\`\`\`javascript\n// What is the output?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 3, 3, 3\n\n// Fix with let\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 0, 1, 2\n\n// Fix with IIFE\nfor (var i = 0; i < 3; i++) {\n  ((j) => setTimeout(() => console.log(j), 100))(i);\n}\n// Output: 0, 1, 2\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the output of `console.log(x); var x = 5;`?',
        options: ['5', 'undefined', 'ReferenceError', 'null'],
        correctIndex: 1,
        explanation: 'var declarations are hoisted to the top but their assignment is not. So x is declared but has the value undefined before the assignment.'
      },
      {
        id: 2,
        question: 'What is `this` in an arrow function?',
        options: ['The function itself', 'The global object', 'Inherited from the enclosing scope', 'undefined'],
        correctIndex: 2,
        explanation: 'Arrow functions do not have their own `this`. They inherit `this` from the enclosing lexical scope (the scope where they are defined).'
      },
      {
        id: 3,
        question: 'What does `bind()` do?',
        options: ['Calls the function immediately', 'Returns a new function with `this` permanently bound to a value', 'Creates a copy of the function', 'Adds the function to the event loop'],
        correctIndex: 1,
        explanation: 'bind() returns a new function where `this` is permanently set to the provided value, regardless of how the function is called.'
      }
    ]
  }
];

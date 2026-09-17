import { Lesson } from '../models/lesson.model';

export const JS_ADVANCED_LESSONS: Lesson[] = [
  {
    id: 115, slug: 'js-performance', title: 'Performance Optimization',
    description: 'Master JavaScript performance techniques.',
    level: 'advanced', duration: '35 min',
    objectives: ['Optimize loops', 'Use memoization', 'Implement lazy loading'],
    topics: [
      { id: 'loops', title: 'Loop Optimization', content: `**What is Loop Optimization?**

Loop optimization involves choosing the right loop construct and avoiding patterns that waste memory or slow execution.

**Why Loop Optimization Matters:**
- Loops are often the hottest code paths
- Creating functions/objects in loops wastes memory
- Choosing the right loop can be 2-10x faster
- Critical for processing large datasets

**Code Example:**
\`\`\`javascript
const arr = new Array(10000).fill(0);

// Slowest — forEach with callback overhead
arr.forEach((item, i) => process(item));

// Fast — traditional for loop
for (let i = 0; i < arr.length; i++) {
  process(arr[i]);
}

// Fast — for...of
for (const item of arr) {
  process(item);
}

// BAD — creating functions in loops
for (let i = 0; i < 1000; i++) {
  arr.push(() => i);
}

// GOOD — factory function
const createFn = (i) => () => i;
for (let i = 0; i < 1000; i++) {
  arr.push(createFn(i));
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// filter().length instead of loop
const count = arr.filter(x => x > 5).length; // Creates array!
// Fix: Simple counter
let count = 0;
for (const x of arr) { if (x > 5) count++; }

// for...in on arrays
for (const key in arr) {} // Slow — iterates prototypes
// Fix: Use for...of
\`\`\`

**Best Practices:**
- Use \`for\` for max performance, \`for...of\` for readability
- Avoid creating functions inside hot loops
- Use Map/Set for O(1) lookups
- Profile first — measure before optimizing

**Key Takeaways:**
1. Traditional for loops are fastest
2. Never create functions inside hot loops
3. Profile before optimizing` },
      { id: 'memoization', title: 'Memoization', content: `**What is Memoization?**

Memoization caches results of expensive function calls. When the same inputs occur again, the cached result is returned.

**Why Memoization Matters:**
- Eliminates redundant computations
- Dramatically speeds up recursive algorithms
- Used in React's useMemo, lodash's memoize

**Code Example:**
\`\`\`javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Computing...");
  return n * n;
});

expensiveCalc(4); // Computing... 16
expensiveCalc(4); // 16 (cached)
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Memoizing side-effect functions
const memoized = memoize((url) => fetch(url)); // Bad!
// Fix: Only memoize pure functions

// Unbounded cache
const cache = new Map(); // Grows forever!
// Fix: Add size limit (LRU cache)
\`\`\`

**Best Practices:**
- Only memoize pure functions
- Use Map for cache
- Set cache size limits
- Measure first — memoize expensive computations

**Key Takeaways:**
1. Memoization caches results to avoid redundant computation
2. Only use with pure functions
3. Set cache size limits to prevent memory leaks` },
      { id: 'lazy-loading', title: 'Lazy Loading', content: `**What is Lazy Loading?**

Lazy loading defers loading of non-critical resources until needed. This reduces initial load time.

**Why Lazy Loading Matters:**
- Reduces initial bundle size
- Improves Time to Interactive
- Saves bandwidth
- Essential for large single-page applications

**Code Example:**
\`\`\`javascript
// Lazy load images with IntersectionObserver
const lazyImages = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
}, { rootMargin: "200px" });

lazyImages.forEach(img => imageObserver.observe(img));

// Lazy load components
async function loadRoute(route) {
  const { default: Component } = await import(\`./pages/\${route}.js\`);
  return new Component();
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Not showing loading state
button.addEventListener('click', async () => {
  const { Chart } = await import('./chart.js');
  // User sees nothing while loading!
});
// Fix: Show loading indicator

// Not handling errors
try {
  const module = await import('./module.js');
} catch (error) {
  showError("Failed to load component");
}
\`\`\`

**Best Practices:**
- Lazy load routes, heavy components, below-the-fold images
- Always show loading states
- Handle errors gracefully
- Preload critical lazy resources

**Key Takeaways:**
1. Lazy loading defers non-critical resources
2. Always show loading states and handle errors
3. Use IntersectionObserver for viewport-based loading` }
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
      { id: 'web-workers', title: 'Web Workers', content: `**What are Web Workers?**

Web Workers run JavaScript in a separate background thread, preventing heavy computation from blocking the main UI thread.

**Why Web Workers Matter:**
- Keep UI responsive during heavy computation
- Enable true parallelism
- Prevent main thread freezing
- Essential for data processing and image manipulation

**Code Example:**
\`\`\`javascript
// worker.js
self.onmessage = (event) => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};

// main.js
const worker = new Worker("worker.js");
worker.postMessage([1, 2, 3, 4, 5]);
worker.onmessage = (event) => {
  console.log("Result:", event.data);
};
worker.onerror = (error) => {
  console.error("Worker error:", error.message);
};

// Transfer data efficiently
const buffer = new ArrayBuffer(1024 * 1024);
worker.postMessage(buffer, [buffer]); // Transfers ownership
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Trying to access DOM from worker
document.getElementById("app"); // Error!

// Not handling errors
const worker = new Worker("worker.js");
// No error handler!

// Not terminating workers
worker.terminate(); // Always clean up
\`\`\`

**Best Practices:**
- Use for CPU-intensive tasks
- Always handle errors
- Use Transferable objects for large data
- Terminate workers when done

**Key Takeaways:**
1. Web Workers run in separate threads — no DOM access
2. Communication via message passing
3. Always terminate workers and handle errors` },
      { id: 'shared-array-buffer', title: 'SharedArrayBuffer', content: `**What is SharedArrayBuffer?**

SharedArrayBuffer enables shared memory between threads. Atomics provides synchronization for safe concurrent access.

**Why SharedArrayBuffer Matters:**
- Zero-copy sharing between threads
- Synchronization with Atomics
- Used in WebAssembly and real-time applications

**Code Example:**
\`\`\`javascript
const buffer = new SharedArrayBuffer(1024);
const arr = new Int32Array(buffer);

worker1.postMessage(buffer);
worker2.postMessage(buffer);

Atomics.add(arr, 0, 1);
Atomics.load(arr, 0);
Atomics.store(arr, 0, 42);
Atomics.wait(arr, 0, 0);
Atomics.notify(arr, 0, 1);
\`\`\`

**Common Mistakes:**
\`\`\`javascript
arr[0] = arr[0] + 1; // Race condition!
// Fix: Use Atomics
Atomics.add(arr, 0, 1);
\`\`\`

**Best Practices:**
- Use only when message passing is too slow
- Always use Atomics for synchronization
- Check availability first

**Key Takeaways:**
1. SharedArrayBuffer enables zero-copy shared memory
2. Always use Atomics for synchronization
3. Requires Cross-Origin-Isolation headers` },
      { id: 'async-iteration', title: 'Async Iteration', content: `**What is Async Iteration?**

Async iteration enables looping over async data sources using \`for await...of\`.

**Why Async Iteration Matters:**
- Process paginated API responses
- Read streams of data
- Handle async data sources with clean syntax

**Code Example:**
\`\`\`javascript
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(\`\${url}?page=\${page}\`);
    const data = await response.json();
    if (data.length === 0) break;
    yield data;
    page++;
  }
}

for await (const page of fetchPages("https://api.example.com/items")) {
  console.log("Page:", page);
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
for (const page of fetchPages(url)) {} // Wrong!
// Fix: Use for await...of
for await (const page of fetchPages(url)) {}
\`\`\`

**Best Practices:**
- Use \`for await...of\` for async iterables
- Always handle errors
- Don't block inside the loop

**Key Takeaways:**
1. \`for await...of\` loops over async iterables
2. Async generators produce async values with \`yield\`
3. Always handle errors` }
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
      { id: 'xss', title: 'XSS Prevention', content: `**What is XSS?**

Cross-Site Scripting (XSS) injects malicious scripts into web pages. Prevention requires sanitizing all user input.

**Why XSS Prevention Matters:**
- XSS is one of the most common vulnerabilities
- Can steal cookies, tokens, and user data
- Required by security standards (OWASP Top 10)

**Code Example:**
\`\`\`javascript
function sanitizeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Safe — textContent
element.textContent = userInput; // Displays as text

// DANGEROUS — innerHTML
element.innerHTML = userInput; // Executes scripts!
\`\`\`

**Common Mistakes:**
\`\`\`javascript
element.innerHTML = userComment; // XSS vulnerability!
// Fix: Use textContent
element.textContent = userComment;

eval(getUserInput()); // Never!

// Fix: Never use eval with user input
\`\`\`

**Best Practices:**
- Use \`textContent\` for user text
- Sanitize HTML with DOMPurify
- Implement CSP headers
- Never use \`eval()\` with user input

**Key Takeaways:**
1. Never use \`innerHTML\` with user input
2. Sanitize HTML with DOMPurify
3. Use \`textContent\` for plain text` },
      { id: 'content-security', title: 'Content Security', content: `**What is Content Security?**

Content security protects against malicious code execution via CSP headers, avoiding dangerous functions, and safe data parsing.

**Code Example:**
\`\`\`javascript
// NEVER use eval with user input
eval(userInput); // Dangerous!
new Function(userInput); // Also dangerous!

// Safe alternatives
const data = JSON.parse(safeInput);

// Safe DOM
element.textContent = userInput;
element.innerHTML = DOMPurify.sanitize(userInput);
\`\`\`

**Best Practices:**
- Set strict CSP headers
- Never use \`eval()\` or \`new Function()\` with user input
- Use \`JSON.parse()\` for JSON data
- Use SRI for external scripts

**Key Takeaways:**
1. Never use \`eval()\` with user input
2. Implement CSP headers
3. Use \`JSON.parse()\` for JSON data` },
      { id: 'input-validation', title: 'Input Validation', content: `**What is Input Validation?**

Input validation checks all data from users, APIs, or external sources before processing.

**Why Input Validation Matters:**
- Prevents injection attacks
- Ensures data integrity
- Provides clear error messages
- Required for compliance

**Code Example:**
\`\`\`javascript
function isValidEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+\$/.test(email);
}

function isValidURL(url) {
  try { new URL(url); return true; }
  catch { return false; }
}

function sanitize(input) {
  return input.replace(/[<>]/g, "").trim();
}

function validateUser(data) {
  const errors = [];
  if (!data.name || data.name.length < 2) {
    errors.push("Name must be at least 2 characters");
  }
  if (!isValidEmail(data.email)) {
    errors.push("Invalid email format");
  }
  if (errors.length) throw new ValidationError(errors.join(", "));
  return data;
}
\`\`\`

**Best Practices:**
- Always validate on the server
- Use allowlists over blocklists
- Validate type, length, format, range
- Provide clear error messages

**Key Takeaways:**
1. Never trust client-side validation alone
2. Use allowlists over blocklists
3. Validate type, length, format, range` }
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
      { id: 'unit-testing', title: 'Unit Testing', content: `**What is Unit Testing?**

Unit testing verifies individual functions in isolation. Each test checks one specific behavior.

**Why Unit Testing Matters:**
- Catch bugs early
- Enable safe refactoring
- Document expected behavior
- Reduce debugging time

**Code Example:**
\`\`\`javascript
describe("add", () => {
  it("should add two positive numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
  it("should handle negative numbers", () => {
    expect(add(-1, -2)).toBe(-3);
  });
  it("should throw on division by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Testing implementation details
it("should use map", () => {
  const spy = jest.spyOn(Array.prototype, "map");
  processItems(items);
  expect(spy).toHaveBeenCalled(); // Fragile!
});
// Fix: Test behavior, not implementation

// Tests depending on each other
it("should add item", () => { cart.add({name:"A",price:10}); });
it("should calculate total", () => { expect(cart.getTotal()).toBe(10); });
// Fix: Each test should be independent
\`\`\`

**Best Practices:**
- Test behavior, not implementation
- Keep tests independent
- Test edge cases
- Aim for confidence, not 100% coverage

**Key Takeaways:**
1. Test behavior, not implementation
2. Each test should be independent
3. Test edge cases — null, empty, boundary values` },
      { id: 'mocking', title: 'Mocking', content: `**What is Mocking?**

Mocking replaces real dependencies with controlled substitutes during testing.

**Why Mocking Matters:**
- Isolate code under test
- Simulate error conditions
- Verify function interactions
- Speed up tests

**Code Example:**
\`\`\`javascript
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn(); // 42
expect(mockFn).toHaveBeenCalled();

jest.mock("./api.js");
import { fetchData } from "./api.js";
fetchData.mockResolvedValue({ data: "test" });

const spy = jest.spyOn(object, "method");
object.method();
expect(spy).toHaveBeenCalledWith(expectedArgs);
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Not clearing mocks
afterEach(() => { jest.clearAllMocks(); });

// Over-mocking
const mockFn = jest.fn().mockReturnValue(42);
// If you mock everything, you test mocks, not code
\`\`\`

**Best Practices:**
- Only mock external dependencies
- Always clear mocks between tests
- Verify interactions AND results
- Mock at the boundary

**Key Takeaways:**
1. Mock only external dependencies
2. Always clear mocks between tests
3. Verify interactions and results` },
      { id: 'async-testing', title: 'Async Testing', content: `**What is Async Testing?**

Async testing verifies functions returning Promises or using async/await.

**Code Example:**
\`\`\`javascript
it("should fetch data", async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

it("should resolve", () => {
  return expect(asyncFunction()).resolves.toBe(42);
});

it("should reject on error", async () => {
  await expect(failingFunction()).rejects.toThrow("Error");
});

jest.spyOn(api, "fetch").mockResolvedValue({ id: 1 });
\`\`\`

**Common Mistakes:**
\`\`\`javascript
it("should work", () => {
  fetchData().then(data => {
    expect(data).toBeDefined();
  });
  // Test completes before Promise resolves!
});
// Fix: Return the Promise or use async/await

it("should work", async () => {
  const promise = fetchData();
  expect(promise).toBeDefined(); // Tests Promise, not result!
});
// Fix: Always await
\`\`\`

**Best Practices:**
- Use async/await for async tests
- Return Promises or use async/await
- Test both success and error paths
- Set appropriate timeouts

**Key Takeaways:**
1. Always use async/await or return Promises
2. Never forget to await
3. Test both success and error paths` }
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
      { id: 'singleton', title: 'Singleton', content: `**What is the Singleton Pattern?**

Singleton ensures only one instance of a class exists with a global access point.

**Code Example:**
\`\`\`javascript
class Database {
  static #instance;
  constructor() {
    if (Database.#instance) return Database.#instance;
    this.connection = this.connect();
    Database.#instance = this;
  }
  connect() { return { host: "localhost", port: 5432 }; }
  static getInstance() {
    if (!Database.#instance) Database.#instance = new Database();
    return Database.#instance;
  }
}
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
\`\`\`

**Best Practices:**
- Use for genuinely shared resources
- Consider dependency injection for testability
- Use private fields
- Lazy initialization

**Key Takeaways:**
1. Singleton ensures one instance
2. Use for genuinely shared resources
3. Consider dependency injection as alternative` },
      { id: 'factory', title: 'Factory Pattern', content: `**What is the Factory Pattern?**

Factory creates objects of different types based on input parameters.

**Code Example:**
\`\`\`javascript
class UserFactory {
  static create(type, data) {
    switch (type) {
      case "admin": return new Admin(data);
      case "user": return new User(data);
      case "guest": return new Guest(data);
      default: throw new Error(\`Unknown type: \${type}\`);
    }
  }
}
const admin = UserFactory.create("admin", { name: "John" });
\`\`\`

**Best Practices:**
- Ensure consistent interface
- Validate input
- Document supported types

**Key Takeaways:**
1. Factory creates objects based on parameters
2. Ensure consistent interface across types
3. Validate input and provide clear errors` },
      { id: 'observer', title: 'Observer Pattern', content: `**What is the Observer Pattern?**

Observer defines a one-to-many dependency. When one object changes, all dependents are notified.

**Why Observer Matters:**
- Decouples subject from observers
- Enables event-driven architecture
- Foundation of RxJS, DOM events, pub/sub

**Code Example:**
\`\`\`javascript
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return () => this.off(event, callback);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(cb => cb(...args));
  }
  off(event, callback) {
    this.events[event] = this.events[event]?.filter(cb => cb !== callback);
  }
}

const emitter = new EventEmitter();
const unsub = emitter.on("data", (d) => console.log(d));
emitter.emit("data", "Hello"); // "Hello"
unsub(); // Clean up
\`\`\`

**Best Practices:**
- Always provide unsubscribe
- Copy observers before iterating
- Handle errors in individual observers

**Key Takeaways:**
1. Observer decouples subjects from observers
2. Always provide unsubscribe mechanisms
3. Copy observer list before iterating` }
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
      { id: 'hoisting', title: 'Hoisting', content: `**What is Hoisting?**

Hoisting moves declarations to the top of their scope during compilation. Variable/function declarations are hoisted; assignments are not.

**Code Example:**
\`\`\`javascript
foo(); // Works — declaration hoisted
function foo() { console.log("foo"); }

console.log(x); // undefined (var hoisted)
var x = 5;

console.log(y); // ReferenceError (let/const not hoisted)
let y = 5;

bar(); // ReferenceError (expression not hoisted)
const bar = () => console.log("bar");
\`\`\`

**Common Mistakes:**
\`\`\`javascript
for (var i = 0; i < 3; i++) {}
console.log(i); // 3 — var leaked
// Fix: Use let
for (let i = 0; i < 3; i++) {}
console.log(i); // ReferenceError
\`\`\`

**Best Practices:**
- Declare variables at the top of their scope
- Use \`const\` and \`let\` — never \`var\`
- Understand the temporal dead zone

**Key Takeaways:**
1. Function declarations are fully hoisted
2. var is hoisted with undefined; let/const are in TDZ
3. Expressions and classes are NOT hoisted` },
      { id: 'this', title: 'This Keyword', content: `**What is \`this\`?**

The \`this\` keyword refers to the execution context. Its value depends on how the function is called.

**Code Example:**
\`\`\`javascript
// Global
console.log(this); // window

// Object method
const obj = {
  name: "John",
  greet() { console.log(this.name); } // "John"
};

// Arrow function — inherits 'this'
const obj2 = {
  name: "John",
  greet: () => { console.log(this.name); } // undefined
};

// Explicit binding
function greet(greeting) {
  console.log(\`\${greeting}, \${this.name}\`);
}
greet.call({ name: "John" }, "Hello");
greet.apply({ name: "John" }, ["Hello"]);
const bound = greet.bind({ name: "John" });
bound("Hello");
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Arrow functions as methods
const obj = {
  name: "John",
  greet: () => { console.log(this.name); } // undefined!
};
// Fix: Use regular method syntax

// Losing 'this' in callbacks
setTimeout(function() { console.log(this.name); }, 100);
// Fix: Use arrow function
\`\`\`

**Best Practices:**
- Use arrow functions for callbacks needing enclosing \`this\`
- Use regular methods for object methods
- Use \`bind()\` for method callbacks

**Key Takeaways:**
1. \`this\` depends on how a function is called
2. Arrow functions inherit \`this\` from enclosing scope
3. Use \`call\`, \`apply\`, \`bind\` for explicit binding` },
      { id: 'closures-interview', title: 'Closures', content: `**Closures (Interview Perspective)**

Closures are a frequent interview topic combining scope, functions, and memory.

**Classic Question:**
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// Solution 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// Solution 2: Use IIFE
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 100))(i);
}
// Output: 0, 1, 2

// Solution 3: Factory function
const createLogger = (i) => () => console.log(i);
for (var i = 0; i < 3; i++) {
  setTimeout(createLogger(i), 100);
}
// Output: 0, 1, 2
\`\`\`

**Real-World:**
\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit(amount) { balance += amount; },
    withdraw(amount) { balance -= amount; },
    getBalance() { return balance; }
  };
}
\`\`\`

**Key Takeaways:**
1. The loop closure problem is caused by \`var\` sharing one binding
2. Solutions: \`let\`, IIFE, factory function
3. Closures enable private state` }
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

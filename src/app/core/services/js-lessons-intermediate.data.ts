import { Lesson } from '../models/lesson.model';

export const JS_INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 106, slug: 'js-error-handling', title: 'Error Handling',
    description: 'Master error handling, custom errors, and debugging.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Handle errors', 'Create custom errors', 'Debug effectively'],
    topics: [
      { id: 'try-catch', title: 'Try-Catch-Finally', content: `**What is Try-Catch-Finally?**

Try-catch-finally handles runtime errors gracefully. The \`try\` block wraps risky code, \`catch\` handles errors, and \`finally\` runs cleanup code.

**Why Try-Catch-Finally Matters:**
- Prevents crashes from unhandled exceptions
- Enables graceful error recovery and user feedback
- \`finally\` guarantees cleanup (closing files, releasing resources)
- Essential for robust, production-ready applications

**Code Example:**
\`\`\`javascript
try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  console.error("Parse error:", error.message);
  console.error("Stack:", error.stack);
} finally {
  console.log("Always runs — cleanup goes here");
}

// Multiple catch blocks (use instanceof)
try {
  riskyOperation();
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Invalid JSON:", error.message);
  } else if (error instanceof TypeError) {
    console.error("Type error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Catching everything
try { riskyOperation(); } catch (e) {
  console.log(e); // Unhelpful
}
// Fix: Handle specific error types

// Empty catch block
try { riskyOperation(); } catch (e) {
  // Silently ignores — bugs go unnoticed!
}

// Using try-catch for flow control
try { const value = obj.prop; } catch (e) {}
// Fix: Use optional chaining instead
const value = obj?.prop;
\`\`\`

**Best Practices:**
- Catch specific error types with \`instanceof\`
- Always include error logging
- Use \`finally\` for cleanup
- Don't use try-catch for flow control

**Key Takeaways:**
1. \`finally\` always runs — use for cleanup
2. Catch specific error types for targeted recovery
3. Use optional chaining instead of try-catch for null checks` },
      { id: 'custom-errors', title: 'Custom Errors', content: `**What are Custom Errors?**

Custom errors extend the built-in \`Error\` class to create domain-specific error types with additional properties.

**Why Custom Errors Matter:**
- Distinguish between different failure types
- Add context-specific properties (field, code, status)
- Enable precise catch blocks
- Improve debugging with meaningful messages

**Code Example:**
\`\`\`javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (age < 0 || age > 150) {
    throw new ValidationError("Invalid age", "age");
  }
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(\`\${error.field}: \${error.message}\`);
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Not calling super()
class MyError extends Error {
  constructor(message) {
    this.message = message; // Wrong!
  }
}
// Fix: Always call super() first
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError";
  }
}
\`\`\`

**Best Practices:**
- Always extend Error and call \`super()\`
- Set the \`name\` property
- Include helpful context (field, code, status)
- Re-throw unexpected errors

**Key Takeaways:**
1. Custom errors extend Error with domain-specific properties
2. Always call \`super()\` and set \`this.name\`
3. Use \`instanceof\` for targeted error handling` },
      { id: 'debugging', title: 'Debugging Techniques', content: `**What are Debugging Techniques?**

Debugging uses built-in tools — console methods and the debugger statement — to inspect state, trace execution, and identify issues.

**Why Debugging Matters:**
- Efficient debugging saves development time
- Console methods provide quick inspection
- The debugger statement enables interactive step-by-step debugging

**Code Example:**
\`\`\`javascript
console.log("Basic log");
console.warn("Warning");
console.error("Error");

console.table([{ name: "John", age: 30 }, { name: "Jane", age: 25 }]);

console.time("fetch");
const data = await fetchData();
console.timeEnd("fetch"); // "fetch: 234.56ms"

console.group("User Processing");
console.log("Step 1: Validate");
console.log("Step 2: Transform");
console.groupEnd();

function processItem(item) {
  debugger; // Pauses here — inspect in DevTools
  return transform(item);
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
console.log("User data:", sensitiveData); // Security risk in production!
// Fix: Use a logging framework with levels

console.log("Error:", error);  // No visual distinction
console.error("Error:", error); // Better — red indicator
\`\`\`

**Best Practices:**
- Use \`console.table()\` for arrays/objects
- Use \`console.time()\`/\`console.timeEnd()\` for performance
- Use \`console.group()\` to organize logs
- Use \`debugger\` for interactive debugging
- Remove console.log before committing

**Key Takeaways:**
1. Use \`console.table()\` for clear data visualization
2. Use \`debugger\` for interactive step-by-step debugging
3. Remove \`console.log\` before production` }
    ],
    quiz: [
      {
        id: 1,
        question: 'When does the `finally` block execute in a try-catch-finally?',
        options: ['Only when an error occurs', 'Only when no error occurs', 'Always, regardless of whether an error was thrown', 'Only with async functions'],
        correctIndex: 2,
        explanation: 'The finally block always executes after the try/catch blocks, whether or not an exception was thrown.'
      },
      {
        id: 2,
        question: 'Which error type is thrown when you try to call a method on undefined?',
        options: ['ReferenceError', 'TypeError', 'SyntaxError', 'RangeError'],
        correctIndex: 1,
        explanation: 'TypeError is thrown when an operation is performed on an inappropriate data type, such as calling a method on undefined.'
      },
      {
        id: 3,
        question: 'How do you create a custom error class in JavaScript?',
        options: ['Extend Error class', 'Create a new Error instance', 'Use Object.create()', 'Throw a string'],
        correctIndex: 0,
        explanation: 'Custom errors are created by extending the built-in Error class, allowing you to add custom properties and behavior.'
      }
    ]
  },
  {
    id: 107, slug: 'js-iterators-generators', title: 'Iterators & Generators',
    description: 'Master iterators, generators, and custom iteration.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Understand iterators', 'Create generators', 'Use yield'],
    topics: [
      { id: 'iterators', title: 'Iterators', content: `**What is an Iterator?**

An iterator defines a sequence-producing protocol with a \`next()\` method returning \`{ value, done }\`. Iterators power \`for...of\`, spread, and destructuring.

**Why Iterators Matter:**
- Enable custom iteration over any data structure
- Power \`for...of\`, spread, and destructuring
- Allow lazy evaluation — compute values on demand

**Code Example:**
\`\`\`javascript
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

const arr = [...range];       // [1, 2, 3, 4, 5]
const [first, second] = range; // first=1, second=2
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Not returning { value, done } format
next() {
  return i < 5 ? i++ : undefined; // Wrong!
  // Should return: { value: i++, done: false }
}
\`\`\`

**Best Practices:**
- Always return \`{ value, done }\` from \`next()\`
- Use generators for simpler iterator creation
- Make iterators reusable

**Key Takeaways:**
1. An iterator has \`next()\` returning \`{ value, done }\`
2. Implementing \`[Symbol.iterator]\` enables \`for...of\`
3. Generators simplify iterator creation` },
      { id: 'generators', title: 'Generators', content: `**What is a Generator?**

A generator is a special function that pauses execution and resumes later, yielding values one at a time. Defined with \`function*\`, it uses \`yield\` to produce values lazily.

**Why Generators Matter:**
- Simplify iterator creation
- Enable lazy evaluation
- Support infinite sequences (Fibonacci, random numbers)
- Used in Redux-Saga and async flow control

**Code Example:**
\`\`\`javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite Fibonacci
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
\`\`\`

**Common Mistakes:**
\`\`\`javascript
function* gen() {
  return 1; // Returns immediately — done
  yield 2; // Unreachable!
}
// Fix: Use yield for each value
\`\`\`

**Best Practices:**
- Use generators for lazy evaluation and infinite sequences
- Use \`yield*\` to delegate to another generator
- Generators are lazy — code runs only when \`.next()\` is called

**Key Takeaways:**
1. Generators (\`function*\`) pause with \`yield\` and resume with \`.next()\`
2. They implement the iterator protocol automatically
3. Generators are lazy — code runs only when \`.next()\` is called` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does an iterator\'s `next()` method return?',
        options: ['The next value only', '{ value, done }', '{ key, value }', 'undefined'],
        correctIndex: 1,
        explanation: 'An iterator\'s next() method returns an object with two properties: value (the current value) and done (a boolean indicating iteration is complete).'
      },
      {
        id: 2,
        question: 'How do you create a generator function?',
        options: ['function normal() {}', 'function* gen() {}', 'async function gen() {}', 'generator gen() {}'],
        correctIndex: 1,
        explanation: 'Generator functions are declared with the function* syntax and use the yield keyword to pause execution.'
      },
      {
        id: 3,
        question: 'What does the `yield` keyword do in a generator?',
        options: ['Returns a value and stops the function permanently', 'Pauses execution and returns a value', 'Throws an error', 'Resumes execution from the beginning'],
        correctIndex: 1,
        explanation: 'yield pauses the generator function and returns a value. Execution resumes when next() is called again.'
      }
    ]
  },
  {
    id: 108, slug: 'js-modules', title: 'Modules',
    description: 'Master ES modules and module patterns.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Use import/export', 'Understand module patterns', 'Master dynamic imports'],
    topics: [
      { id: 'import-export', title: 'Import/Export', content: `**What are ES Modules?**

ES Modules organize code into reusable, encapsulated files. Each module has its own scope — variables are private by default.

**Why ES Modules Matter:**
- Organize code into logical, maintainable files
- Encapsulate private logic
- Enable tree-shaking in bundlers
- Used by Angular, React, Vue

**Code Example:**
\`\`\`javascript
// Named Exports
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
import { add as plus } from './math.js'; // Rename

// Default Export
// user.js
export default class User {
  constructor(name) { this.name = name; }
}

// main.js
import User from './user.js';
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Importing default as named
// module.js: export default function() {}
import { function } from './module.js'; // SyntaxError!
import function from './module.js';     // Correct
\`\`\`

**Best Practices:**
- Use named exports for utility functions
- Use default exports for classes and components
- Import only what you need (tree-shaking)
- Avoid circular dependencies

**Key Takeaways:**
1. Named exports require exact names; default exports can use any name
2. Each module has its own scope
3. Avoid circular imports` },
      { id: 'dynamic-import', title: 'Dynamic Imports', content: `**What are Dynamic Imports?**

Dynamic imports use \`import()\` as a function to load modules on demand at runtime. They enable code splitting — loading only needed code.

**Why Dynamic Imports Matter:**
- Reduce initial bundle size
- Enable lazy loading of routes and components
- Improve page load performance
- Essential for code splitting

**Code Example:**
\`\`\`javascript
// Conditional import
if (user.isAdmin) {
  const { AdminPanel } = await import('./admin.js');
}

// Lazy loading on click
button.addEventListener('click', async () => {
  const { Chart } = await import('./chart.js');
  new Chart(data);
});

// Route-based splitting
async function loadRoute(route) {
  switch (route) {
    case '/dashboard':
      return await import('./pages/Dashboard.js');
    case '/settings':
      return await import('./pages/Settings.js');
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const module = import('./module.js'); // Returns Promise!
const module = await import('./module.js'); // Correct
\`\`\`

**Best Practices:**
- Use dynamic imports for large, rarely-used modules
- Handle errors when dynamic importing
- Prefetch modules users will need soon

**Key Takeaways:**
1. \`import()\` returns a Promise — always \`await\` it
2. Dynamic imports enable code splitting and lazy loading
3. Use for large modules and route-based loading` },
      { id: 'module-patterns', title: 'Module Patterns', content: `**What are Module Patterns?**

Module patterns use closures to encapsulate private state and expose only a public API. They're the foundation of code organization in JavaScript.

**Why Module Patterns Matter:**
- Create private variables and functions
- Implement the Singleton pattern
- Encapsulate complex logic behind a simple API

**Code Example:**
\`\`\`javascript
const calculator = (() => {
  let result = 0; // Private

  function add(n) { result += n; }
  function subtract(n) { result -= n; }
  function getResult() { return result; }

  return { add, subtract, getResult };
})();

calculator.add(10);
calculator.subtract(3);
calculator.getResult(); // 7
// calculator.result is undefined — private
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Exposing private state
const module = (() => {
  let count = 0;
  return { count, increment: () => ++count }; // Exposes count!
})();
module.count = 999; // Bypasses increment!
// Fix: Only expose methods
\`\`\`

**Best Practices:**
- Use modern ES modules over IIFE patterns
- Only return methods in the public API
- Keep the public API small

**Key Takeaways:**
1. Module patterns use closures for private state
2. Only return methods — keep data private
3. Modern ES modules are preferred` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the key difference between named and default exports?',
        options: ['Named exports are faster', 'Default exports can be imported with any name, named exports must match', 'Named exports are private', 'There is no difference'],
        correctIndex: 1,
        explanation: 'Default exports can be imported with any name (import Foo from \'./bar\'), while named exports must be destructured with the exact name (import { add } from \'./math\').'
      },
      {
        id: 2,
        question: 'What is the benefit of dynamic imports?',
        options: ['Code runs faster', 'Code is bundled into smaller chunks loaded on demand', 'Code is encrypted', 'Code has better error handling'],
        correctIndex: 1,
        explanation: 'Dynamic imports enable code splitting, allowing you to load code only when needed, reducing the initial bundle size.'
      },
      {
        id: 3,
        question: 'How does the Singleton pattern ensure only one instance exists?',
        options: ['Uses a static variable to track instances', 'Uses Object.freeze()', 'Uses WeakMap', 'Uses Proxy'],
        correctIndex: 0,
        explanation: 'The Singleton pattern stores the instance in a closure variable and checks if it exists before creating a new one.'
      }
    ]
  },
  {
    id: 109, slug: 'js-prototype-inheritance', title: 'Prototypes & Inheritance',
    description: 'Master prototypal inheritance and class syntax.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Understand prototypes', 'Use classes', 'Master inheritance'],
    topics: [
      { id: 'prototypes', title: 'Prototypes', content: `**What are Prototypes?**

Every JavaScript object has a prototype. When you access a property that doesn't exist, JavaScript walks up the prototype chain until it finds it.

**Why Prototypes Matter:**
- Enable inheritance without classes
- Methods are shared via prototype (memory efficient)
- Understanding prototypes is essential for debugging
- Classes are syntactic sugar over prototypes

**Code Example:**
\`\`\`javascript
const animal = {
  eat() { console.log("Eating"); },
  sleep() { console.log("Sleeping"); }
};

const dog = Object.create(animal);
dog.bark = function() { console.log("Woof"); };

dog.bark(); // Woof — own property
dog.eat();  // Eating — inherited

Object.getPrototypeOf(dog) === animal; // true
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Using __proto__ (deprecated)
const obj = {};
obj.__proto__ = { x: 1 }; // Deprecated!
// Fix: Use Object.create()

// Modifying Object.prototype (dangerous!)
Object.prototype.polluted = "oops";
// Affects ALL objects!
\`\`\`

**Best Practices:**
- Use \`Object.create()\` for prototype-based inheritance
- Never modify \`Object.prototype\`
- Use classes for cleaner syntax

**Key Takeaways:**
1. Every object has a prototype — property lookup walks the chain
2. Use \`Object.create()\` for explicit inheritance
3. Classes are syntactic sugar over prototypes` },
      { id: 'classes', title: 'Classes', content: `**What are Classes?**

Classes provide clean syntax for creating objects and implementing inheritance. Under the hood, they use prototypes.

**Why Classes Matter:**
- Clean, readable syntax
- Built-in inheritance with \`extends\` and \`super\`
- Private fields (\`#\`) for encapsulation
- Used extensively in Angular

**Code Example:**
\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  eat() { console.log(\`\${this.name} is eating\`); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Must call super first
    this.breed = breed;
  }
  bark() { console.log(\`\${this.name} says Woof\`); }
}

const dog = new Dog("Rex", "German Shepherd");
dog.eat();  // Rex is eating
dog.bark(); // Rex says Woof

// Private fields
class Counter {
  #count = 0;
  increment() { this.#count++; }
  getCount() { return this.#count; }
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed; // ReferenceError!
    super(name);        // Must be first
  }
}
\`\`\`

**Best Practices:**
- Always call \`super()\` before \`this\` in derived classes
- Use private fields (\`#\`) for internal state
- Keep classes focused — one responsibility

**Key Takeaways:**
1. Always call \`super()\` before \`this\` in derived constructors
2. Private fields (\`#\`) provide true encapsulation
3. Classes are syntactic sugar over prototypes` },
      { id: 'static-methods', title: 'Static Methods', content: `**What are Static Methods?**

Static methods belong to the class itself, not instances. Called via \`ClassName.method()\`.

**Why Static Methods Matter:**
- Utility functions that don't need instance data
- Factory methods for complex object creation
- Class-level state management

**Code Example:**
\`\`\`javascript
class MathUtils {
  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
}

MathUtils.add(2, 3); // 5

// Static properties
class User {
  static count = 0;
  constructor(name) {
    this.name = name;
    User.count++;
  }
  static getCount() { return User.count; }
}

new User("John");
new User("Jane");
console.log(User.count); // 2
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const user = new User("John");
user.getCount(); // TypeError!
User.getCount(); // Correct
\`\`\`

**Best Practices:**
- Use static methods for utility functions
- Use static properties for class-level state
- Don't use static when you need instance data

**Key Takeaways:**
1. Static methods are called on the class, not instances
2. Use for utility functions and factory methods
3. Static properties maintain class-level state` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does `Object.create(animal)` do?',
        options: ['Creates a copy of animal', 'Creates a new object with animal as its prototype', 'Creates an array from animal', 'Creates a class based on animal'],
        correctIndex: 1,
        explanation: 'Object.create() creates a new object and sets its prototype to the provided object, enabling prototypal inheritance.'
      },
      {
        id: 2,
        question: 'What must be called before accessing `this` in a derived class constructor?',
        options: ['this.init()', 'super()', 'Object.create()', 'return this'],
        correctIndex: 1,
        explanation: 'super() must be called before accessing this in a derived class constructor to properly initialize the parent class.'
      },
      {
        id: 3,
        question: 'How do you call a static method on a class?',
        options: ['instance.staticMethod()', 'ClassName.staticMethod()', 'this.staticMethod()', 'static ClassName.staticMethod()'],
        correctIndex: 1,
        explanation: 'Static methods are called on the class itself, not on instances, so you use ClassName.staticMethod().'
      }
    ]
  },
  {
    id: 110, slug: 'js-regular-expressions', title: 'Regular Expressions',
    description: 'Master regex patterns and methods.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Create patterns', 'Use regex methods', 'Master groups'],
    topics: [
      { id: 'basics', title: 'Regex Basics', content: `**What are Regular Expressions?**

Regular expressions (regex) are patterns for matching character combinations in strings. They validate, search, replace, and extract text data.

**Why Regex Matters:**
- Validate user input (emails, phones, URLs)
- Search and replace text patterns
- Extract structured data from unstructured text

**Code Example:**
\`\`\`javascript
const email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+\$/;
const phone = /^\\d{3}-\\d{3}-\\d{4}\$/;

email.test("user@example.com"); // true
email.test("invalid");          // false

"Hello World".match(/world/i); // ["World", index: 6]
\`\`\`

**Common Mistakes:**
\`\`\`javascript
/https://example.com/ // SyntaxError — // is a comment!
/https:\\/\\/example\\.com/ // Correct — escaped

/abc/      // Matches anywhere: "xabcy"
/^abc\$/    // Only exact "abc"
\`\`\`

**Best Practices:**
- Use literal syntax over \`new RegExp()\`
- Test patterns with regex101.com
- Don't over-engineer — use string methods for simple checks

**Key Takeaways:**
1. Regex validates, searches, and replaces text
2. Use \`test()\` for boolean checks, \`match()\` for details
3. Use string methods for simple operations` },
      { id: 'methods', title: 'Regex Methods', content: `**What are Regex Methods?**

JavaScript provides methods for testing, matching, replacing, and splitting strings based on patterns.

**Code Example:**
\`\`\`javascript
const str = "Hello World, hello Universe";

/ello/.test(str); // true

str.match(/hello/gi); // ["Hello", "hello"]

str.replace(/hello/gi, "Hi"); // "Hi World, Hi Universe"

"a,b,,c".split(/,+/); // ["a", "b", "c"]
\`\`\`

**Common Mistakes:**
\`\`\`javascript
"hello world".replace("o", "0"); // "hell0 world" — only first!
// Fix: Use regex with 'g' flag
"hello world".replace(/o/g, "0"); // "hell0 w0rld"
\`\`\`

**Best Practices:**
- Use \`test()\` for boolean checks
- Use \`matchAll()\` for capture groups
- Always use \`g\` flag with \`replace()\`

**Key Takeaways:**
1. \`test()\` returns boolean — use for validation
2. \`matchAll()\` provides detailed match info
3. Always use \`g\` flag with \`replace()\`` },
      { id: 'groups', title: 'Groups & Capturing', content: `**What are Groups and Capturing?**

Groups treat multiple characters as a unit and capture parts of a match. Named groups improve readability.

**Code Example:**
\`\`\`javascript
const regex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = "2024-01-15".match(regex);
console.log(match.groups.year);  // "2024"
console.log(match.groups.month); // "01"

// Non-capturing groups
"hello123".match(/hello(?:123)/); // ["hello123"]

// Lookahead
"100px".match(/\\d+(?=px)/); // ["100"]
\`\`\`

**Best Practices:**
- Use named groups for readability
- Use non-capturing groups when you only need grouping
- Keep patterns simple

**Key Takeaways:**
1. Named groups make patterns readable
2. Non-capturing groups group without capturing
3. Lookaheads add context without affecting the match` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the `g` flag do in a regular expression?',
        options: ['Makes the match case-sensitive', 'Searches globally (all matches, not just the first)', 'Enables multiline mode', 'Makes the match greedy'],
        correctIndex: 1,
        explanation: 'The `g` flag enables global matching, meaning it finds all occurrences of the pattern rather than stopping at the first match.'
      },
      {
        id: 2,
        question: 'What does `/\\d{3}/` match?',
        options: ['Exactly 3 digits', 'At least 3 digits', 'Any digit', '3 or more digits'],
        correctIndex: 0,
        explanation: 'The {3} quantifier matches exactly 3 occurrences of the preceding element (\\d, which is any digit).'
      },
      {
        id: 3,
        question: 'What does `str.replace(/hello/gi, "Hi")` do?',
        options: ['Replaces only the first "hello"', 'Replaces all "hello" case-insensitively', 'Removes all "hello"', 'Adds "Hi" before every word'],
        correctIndex: 1,
        explanation: 'With the `g` (global) and `i` (case-insensitive) flags, replace() replaces all occurrences of "hello" regardless of case.'
      }
    ]
  },
  {
    id: 111, slug: 'js-functional-programming', title: 'Functional Programming',
    description: 'Master functional programming concepts.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Understand pure functions', 'Master immutability', 'Use composition'],
    topics: [
      { id: 'pure-functions', title: 'Pure Functions', content: `**What are Pure Functions?**

A pure function always returns the same output for the same input and produces no side effects.

**Why Pure Functions Matter:**
- Predictable output
- No side effects — safe to call multiple times
- Easy to test — no mocking needed
- Cacheable — results can be memoized

**Code Example:**
\`\`\`javascript
// Impure (has side effects)
let total = 0;
function addToTotal(num) {
  total += num;
  return total;
}

// Pure
function add(a, b) { return a + b; }

// Pure with no mutation
function addToArray(arr, item) {
  return [...arr, item];
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
function addItem(cart, item) {
  cart.push(item); // Mutates!
  return cart;
}
// Fix: Return new array
function addItem(cart, item) {
  return [...cart, item];
}
\`\`\`

**Best Practices:**
- Return a value — avoid undefined returns
- Never modify parameters
- Pass all dependencies as parameters

**Key Takeaways:**
1. Same input, same output — no side effects
2. Return new values instead of mutating
3. Easy to test and memoize` },
      { id: 'immutability', title: 'Immutability', content: `**What is Immutability?**

Immutability means data cannot be changed after creation. Create new copies instead of modifying existing data.

**Why Immutability Matters:**
- Prevents accidental mutations
- Makes state changes predictable
- Enables efficient change detection in UI frameworks

**Code Example:**
\`\`\`javascript
// Mutable (avoid)
const arr = [1, 2, 3];
arr.push(4); // Mutates

// Immutable (prefer)
const arr2 = [1, 2, 3];
const arr3 = [...arr2, 4]; // New array

const user = { name: "John", age: 30 };
const updated = { ...user, age: 31 }; // New object

Object.freeze({ host: "localhost" }); // Runtime immutability
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const original = { a: 1, b: { c: 2 } };
const clone = { ...original };
clone.b.c = 3; // Also affects original!
// Fix: Use structuredClone()
const deep = structuredClone(original);
\`\`\`

**Best Practices:**
- Always create new arrays/objects
- Use spread for shallow copies
- Use \`structuredClone()\` for deep copies

**Key Takeaways:**
1. Never mutate data directly
2. Spread creates shallow copies
3. Use \`structuredClone()\` for deep cloning` },
      { id: 'composition', title: 'Function Composition', content: `**What is Function Composition?**

Function composition combines multiple functions into one, where output of one becomes input of the next.

**Why Composition Matters:**
- Build complex logic from simple functions
- Enable point-free style
- Used in RxJS operators and Angular pipes

**Code Example:**
\`\`\`javascript
const pipe = (...fns) => (x) =>
  fns.reduce((acc, fn) => fn(acc), x);

const add10 = x => x + 10;
const double = x => x * 2;
const subtract3 = x => x - 3;

const transform = pipe(add10, double, subtract3);
console.log(transform(5)); // (5+10)*2-3 = 27
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const transform = pipe(f1, f2, f3, f4, f5, f6, f7, f8);
// Too many — hard to read!
// Break into named compositions
\`\`\`

**Best Practices:**
- Use pipe (left to right) for readability
- Keep composed functions pure
- Limit to 3-5 functions per pipeline

**Key Takeaways:**
1. Composition combines simple functions into complex transformations
2. Pipe is more readable than compose
3. Keep composed functions pure` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What makes a function "pure"?',
        options: ['It has no arguments', 'Same input always produces same output with no side effects', 'It returns a number', 'It uses only const variables'],
        correctIndex: 1,
        explanation: 'A pure function always returns the same output for the same input and produces no side effects (does not modify external state).'
      },
      {
        id: 2,
        question: 'Why is `arr.push(4)` considered impure?',
        options: ['It is too slow', 'It mutates the original array', 'It returns a new array', 'It uses a built-in method'],
        correctIndex: 1,
        explanation: 'push() mutates the original array, which is a side effect. Pure functions should not modify external state.'
      },
      {
        id: 3,
        question: 'What does `pipe(add10, double, subtract3)(5)` return?',
        options: ['12', '27', '32', '17'],
        correctIndex: 1,
        explanation: 'pipe applies functions left to right: (5 + 10) = 15, 15 * 2 = 30, 30 - 3 = 27.'
      }
    ]
  },
  {
    id: 112, slug: 'js-proxy-reflection', title: 'Proxy & Reflection',
    description: 'Master Proxy and Reflect APIs.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Create proxies', 'Use Reflect', 'Build reactive systems'],
    topics: [
      { id: 'proxy', title: 'Proxy', content: `**What is a Proxy?**

A Proxy wraps an object and intercepts fundamental operations like property access and assignment. It defines "traps" for these operations.

**Why Proxy Matters:**
- Intercept and customize object operations
- Build reactive systems
- Implement validation, logging, access control
- Foundation of Vue.js 3's reactivity

**Code Example:**
\`\`\`javascript
const handler = {
  get(target, prop) {
    console.log(\`Accessing \${prop}\`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(\`Setting \${prop} to \${value}\`);
    return Reflect.set(target, prop, value);
  }
};

const user = new Proxy({ name: "John" }, handler);
console.log(user.name); // Logs "Accessing name", then "John"
\`\`\`

**Common Mistakes:**
\`\`\`javascript
set(target, prop, value) {
  target[prop] = value;
  // Missing return true!
}
// Fix: Always return true
\`\`\`

**Best Practices:**
- Always use Reflect methods inside traps
- Return true from set traps
- Keep traps lightweight

**Key Takeaways:**
1. Proxy intercepts object operations via traps
2. Always use Reflect and return true from set
3. Foundation of reactive state management` },
      { id: 'reactive', title: 'Reactive Systems', content: `**What are Reactive Systems?**

A reactive system automatically updates when data changes. Using Proxy, you intercept property assignments and trigger callbacks.

**Why Reactive Systems Matter:**
- Automatic UI updates when data changes
- Eliminate manual state synchronization
- Foundation of Vue, MobX, Angular signals

**Code Example:**
\`\`\`javascript
function reactive(obj, callback) {
  return new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value;
      callback(prop, value);
      return true;
    }
  });
}

const state = reactive({ count: 0 }, (prop, value) => {
  console.log(\`\${prop} changed to \${value}\`);
});

state.count = 1; // Logs "count changed to 1"
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Infinite loops
watch("count", (value) => {
  state.count = value + 1; // Triggers again!
});
// Fix: Check if value changed
\`\`\`

**Best Practices:**
- Use Proxy for fine-grained reactivity
- Check if values changed to prevent loops
- Keep callbacks lightweight

**Key Takeaways:**
1. Proxy intercepts property changes and triggers updates
2. Always prevent infinite loops
3. Consider Angular signals for simpler patterns` },
      { id: 'validation', title: 'Validation with Proxy', content: `**What is Proxy-Based Validation?**

Proxy enables runtime validation by intercepting property assignments and checking values against rules.

**Why Proxy Validation Matters:**
- Validation enforced at the data layer
- Declarative rules — easy to read
- Centralized validation logic

**Code Example:**
\`\`\`javascript
function createValidator(obj, rules) {
  return new Proxy(obj, {
    set(target, prop, value) {
      const rule = rules[prop];
      if (rule && !rule.validate(value)) {
        throw new Error(rule.message);
      }
      target[prop] = value;
      return true;
    }
  });
}

const user = createValidator({}, {
  age: {
    validate: (v) => v >= 0 && v <= 150,
    message: "Age must be between 0 and 150"
  }
});

user.age = 25;   // Works
user.age = -5;   // Throws Error
\`\`\`

**Best Practices:**
- Validate at the data layer
- Provide clear error messages
- Validate initial values too

**Key Takeaways:**
1. Proxy validation enforces rules at the data layer
2. Always validate initial values
3. Combine with custom error classes` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does a Proxy allow you to intercept?',
        options: ['Only function calls', 'Fundamental operations on objects (get, set, delete, etc.)', 'Only array access', 'Only JSON parsing'],
        correctIndex: 1,
        explanation: 'A Proxy wraps an object and can intercept fundamental operations like get, set, has, deleteProperty, and more.'
      },
      {
        id: 2,
        question: 'What must the `set` trap return to indicate success?',
        options: ['the value', 'true', 'undefined', 'the target object'],
        correctIndex: 1,
        explanation: 'The set trap must return true to indicate the assignment was successful, otherwise a TypeError is thrown in strict mode.'
      },
      {
        id: 3,
        question: 'Why is Proxy useful for building reactive systems?',
        options: ['It makes objects immutable', 'It can detect and react to property changes automatically', 'It speeds up property access', 'It converts objects to arrays'],
        correctIndex: 1,
        explanation: 'Proxy can intercept set operations and trigger callbacks when properties change, making it ideal for reactive state management.'
      }
    ]
  },
  {
    id: 113, slug: 'js-weakmap-weakset', title: 'WeakMap & WeakSet',
    description: 'Master WeakMap, WeakSet, and memory management.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Use WeakMap', 'Use WeakSet', 'Manage memory'],
    topics: [
      { id: 'weakmap', title: 'WeakMap', content: `**What is a WeakMap?**

A WeakMap is a key-value collection where keys must be objects and are weakly referenced — they can be garbage collected when no other references exist.

**Why WeakMap Matters:**
- Prevents memory leaks
- Store private data associated with objects
- Cache expensive computations tied to objects

**Code Example:**
\`\`\`javascript
const cache = new WeakMap();

function processObject(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveOperation(obj);
  cache.set(obj, result);
  return result;
}
// When obj is GC'd, cache entry is removed

// Private data
const privateData = new WeakMap();
class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }
}
\`\`\`

**Best Practices:**
- Use WeakMap for object-associated caches
- Use for private data storage
- Don't use when you need iteration

**Key Takeaways:**
1. WeakMap keys must be objects
2. Entries are removed when keys are GC'd
3. Use for caching and private data` },
      { id: 'weakset', title: 'WeakSet', content: `**What is a WeakSet?**

A WeakSet stores objects with weak references. Values are automatically removed when garbage collected.

**Why WeakSet Matters:**
- Track objects without preventing GC
- Mark objects (visited, processed, active)
- Lightweight boolean flags for objects

**Code Example:**
\`\`\`javascript
const visited = new WeakSet();

function traverse(node) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const child of node.children) {
    traverse(child);
  }
}
\`\`\`

**Best Practices:**
- Use for marking/tracking objects
- Use Set when you need iteration
- Great for DOM element tracking

**Key Takeaways:**
1. WeakSet stores objects only
2. Use for marking/tracking without preventing GC
3. Not iterable — use Set when needed` },
      { id: 'memory', title: 'Memory Management', content: `**What is Memory Management?**

JavaScript uses automatic garbage collection, but poor patterns cause memory leaks. Understanding memory management is essential for performant apps.

**Why Memory Matters:**
- Memory leaks cause slowdowns and crashes
- Leaked DOM elements grow browser memory
- Closures can unintentionally keep references alive

**Code Example:**
\`\`\`javascript
// Leak: Map cache grows forever
const cache = new Map();
function process(obj) {
  cache.set(obj.id, expensiveOperation(obj));
}
// Fix: Use WeakMap
const cache = new WeakMap();

// Leak: Event listener not removed
button.addEventListener("click", handler);
// Fix: Remove when done
button.removeEventListener("click", handler);

// Leak: Timer not cleared
let id = setInterval(() => {}, 1000);
// Fix: Clear when done
clearInterval(id);
\`\`\`

**Best Practices:**
- Use WeakMap/WeakSet for object-associated data
- Always clean up listeners, timers, subscriptions
- Be mindful of closures keeping references alive

**Key Takeaways:**
1. Use WeakMap/WeakSet to prevent memory leaks
2. Always clean up event listeners and timers
3. Closures keep referenced variables alive` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a key difference between WeakMap and Map?',
        options: ['WeakMap is faster', 'WeakMap keys must be objects and are weakly referenced', 'WeakMap supports iteration', 'WeakMap can have primitive keys'],
        correctIndex: 1,
        explanation: 'WeakMap keys must be objects and are weakly referenced, meaning they can be garbage collected when no other references exist.'
      },
      {
        id: 2,
        question: 'Why can\'t you iterate over a WeakMap?',
        options: ['It is too large', 'Its keys may be garbage collected at any time', 'Iteration is not implemented', 'It is a Set, not a Map'],
        correctIndex: 1,
        explanation: 'Since keys can be garbage collected at any time, iterating over a WeakMap would produce inconsistent results.'
      },
      {
        id: 3,
        question: 'How does using WeakMap help prevent memory leaks?',
        options: ['It compresses data', 'Entries are automatically removed when keys are garbage collected', 'It has a size limit', 'It uses less memory'],
        correctIndex: 1,
        explanation: 'WeakMap entries are automatically cleaned up when their keys are garbage collected, preventing cached data from accumulating indefinitely.'
      }
    ]
  },
  {
    id: 114, slug: 'js-advanced-patterns', title: 'Advanced Patterns',
    description: 'Master advanced JavaScript patterns.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use module patterns', 'Implement mixins', 'Master decorators'],
    topics: [
      { id: 'module-pattern', title: 'Module Pattern', content: `**What is the Module Pattern?**

The Module Pattern uses closures to encapsulate private state and expose a public API.

**Code Example:**
\`\`\`javascript
const ShoppingCart = (() => {
  let items = []; // Private

  function addItem(item) { items.push(item); }
  function getTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  return { addItem, getTotal, getItemCount: () => items.length };
})();

shoppingCart.addItem({ name: "Item", price: 10 });
console.log(shoppingCart.getTotal()); // 10
// shoppingCart.items is undefined — private
\`\`\`

**Best Practices:**
- Use modern ES modules over IIFE patterns
- Only expose methods, not data
- Keep the public API small

**Key Takeaways:**
1. Module patterns use closures for private state
2. Only return methods in the public API
3. Modern ES modules are preferred` },
      { id: 'mixins', title: 'Mixins', content: `**What are Mixins?**

Mixins are functions that take a base class and return a new class extending it, enabling composition of multiple behaviors.

**Code Example:**
\`\`\`javascript
const Serializable = (Base) => class extends Base {
  serialize() { return JSON.stringify(this); }
  static deserialize(json) { return JSON.parse(json); }
};

const Loggable = (Base) => class extends Base {
  log(message) {
    console.log(\`[\${this.constructor.name}] \${message}\`);
  }
};

class User { constructor(name) { this.name = name; } }
const EnhancedUser = Serializable(Loggable(User));
const user = new EnhancedUser("John");
user.log("Created"); // [User] Created
\`\`\`

**Best Practices:**
- Keep mixins focused — one behavior each
- Name methods uniquely to avoid conflicts
- Always call \`super()\` in constructors

**Key Takeaways:**
1. Mixins compose behaviors by extending classes
2. Keep mixins focused
3. Always call \`super()\` in constructors` },
      { id: 'builder', title: 'Builder Pattern', content: `**What is the Builder Pattern?**

The Builder Pattern constructs complex objects step by step using method chaining (fluent API).

**Code Example:**
\`\`\`javascript
class QueryBuilder {
  constructor() {
    this.table = "";
    this.conditions = [];
    this.fields = [];
  }
  from(table) { this.table = table; return this; }
  select(...fields) { this.fields = fields; return this; }
  where(condition) { this.conditions.push(condition); return this; }
  build() {
    let query = \`SELECT \${this.fields.join(", ")} FROM \${this.table}\`;
    if (this.conditions.length) {
      query += \` WHERE \${this.conditions.join(" AND ")}\`;
    }
    return query;
  }
}

const query = new QueryBuilder()
  .from("users")
  .select("name", "email")
  .where("age > 18")
  .build();
// SELECT name, email FROM users WHERE age > 18
\`\`\`

**Best Practices:**
- Always return \`this\` from chainable methods
- Validate required fields in \`build()\`
- Provide sensible defaults

**Key Takeaways:**
1. Builder uses method chaining for step-by-step construction
2. Always return \`this\`
3. Validate in \`build()\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the main advantage of the Module Pattern?',
        options: ['Faster execution', 'Encapsulation of private state with a public API', 'Smaller bundle size', 'Better browser support'],
        correctIndex: 1,
        explanation: 'The Module Pattern uses closures to encapsulate private state and expose only a public API, providing data privacy.'
      },
      {
        id: 2,
        question: 'What pattern does the Builder Pattern use to chain method calls?',
        options: ['Recursion', 'Returning `this` from methods', 'Using Proxy', 'Using generators'],
        correctIndex: 1,
        explanation: 'The Builder Pattern returns `this` from each method to enable method chaining, creating a fluent API.'
      },
      {
        id: 3,
        question: 'How do mixins enable multiple inheritance-like behavior?',
        options: ['They use extends keyword multiple times', 'They are functions that return classes extending the base', 'They use Object.assign()', 'They modify the prototype chain directly'],
        correctIndex: 1,
        explanation: 'Mixins are functions that take a base class and return a new class extending it, allowing multiple behaviors to be composed.'
      }
    ]
  },
  {
    id: 121, slug: 'js-abort-controller', title: 'AbortController & Cancellation',
    description: 'Master request cancellation with AbortController.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Cancel fetch requests', 'Use AbortController with async operations', 'Implement cleanup patterns'],
    topics: [
      { id: 'abort-basics', title: 'AbortController Basics', content: '**What is AbortController?\n\nAbortController is a Web API that allows you to cancel fetch requests and other async operations. It\'s essential for preventing memory leaks and unnecessary work.\n\n**Why AbortController Matters:**\n- Cancel unnecessary fetch requests (e.g., when user navigates away)\n- Prevent race conditions in autocomplete/search\n- Clean up resources when component unmounts\n- Improve performance by aborting stale requests\n\n**How to Use AbortController (Step-by-Step):**\n1. Create an AbortController instance\n2. Pass its signal to fetch or other async APIs\n3. Call controller.abort() to cancel\n4. Listen for abort events to clean up\n\n**Code Example:**\n```javascript\n// Basic fetch cancellation\nconst controller = new AbortController();\nconst signal = controller.signal;\n\nfetch(\'https://api.example.com/data\', { signal })\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(err => {\n    if (err.name === \'AbortError\') {\n      console.log(\'Request was cancelled\');\n    } else {\n      console.error(\'Fetch error:\', err);\n    }\n  });\n\n// Cancel the request\ncontroller.abort();\n\n// Real-world: Search autocomplete\nlet currentController = null;\n\nasync function search(query) {\n  // Cancel previous request\n  if (currentController) {\n    currentController.abort();\n  }\n  \n  currentController = new AbortController();\n  \n  try {\n    const response = await fetch(\n      `/api/search?q=${encodeURIComponent(query)}`,\n      { signal: currentController.signal }\n    );\n    return await response.json();\n  } catch (err) {\n    if (err.name !== \'AbortError\') {\n      throw err;\n    }\n  }\n}\n\n// AbortController with setTimeout\nfunction withTimeout(ms) {\n  const controller = new AbortController();\n  const timeoutId = setTimeout(() => controller.abort(), ms);\n  \n  return {\n    signal: controller.signal,\n    clear: () => clearTimeout(timeoutId)\n  };\n}\n\n// Usage\nconst { signal, clear } = withTimeout(5000);\nfetch(\'/api/slow-data\', { signal })\n  .then(res => res.json())\n  .finally(clear);\n```\n\n**Key Takeaways:**\n1. Always check for AbortError in catch blocks\n2. Cancel previous requests before starting new ones\n3. Use AbortController for any cancellable async operation' }
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you cancel a fetch request using AbortController?',
        options: ['Pass the controller directly to fetch', 'Pass the signal property to fetch options', 'Call fetch.cancel()', 'Use the AbortController constructor as a second argument'],
        correctIndex: 1,
        explanation: 'You pass the signal property of an AbortController to the fetch options. When controller.abort() is called, the fetch Promise rejects with an AbortError.'
      },
      {
        id: 2,
        question: 'What error is thrown when a fetch is aborted?',
        options: ['Error', 'TypeError', 'AbortError', 'NetworkError'],
        correctIndex: 2,
        explanation: 'When a fetch is aborted via AbortController, the Promise rejects with a DOMException of type AbortError.'
      },
      {
        id: 3,
        question: 'Why is AbortController important for search autocomplete?',
        options: ['It encrypts the search query', 'It cancels previous in-flight requests to prevent race conditions', 'It caches search results', 'It limits the number of API calls'],
        correctIndex: 1,
        explanation: 'AbortController cancels previous requests when a new keystroke arrives, preventing stale results from overwriting newer ones (race condition).'
      }
    ]
  },
  {
    id: 122, slug: 'js-promise-combinators', title: 'Promise Combinators Deep Dive',
    description: 'Master Promise.all, Promise.allSettled, Promise.any, and Promise.race.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Use Promise.all for parallel execution', 'Handle partial failures with allSettled', 'Race promises with Promise.race', 'Use Promise.any for first success'],
    topics: [
      { id: 'promise-all', title: 'Promise.all', content: '**Promise.all - Parallel Execution:**\n\nPromise.all takes an array of promises and resolves when ALL of them resolve. If ANY promise rejects, the entire Promise.all rejects immediately.\n\n**Why Promise.all Matters:**\n- Execute multiple async operations in parallel\n- Wait for all results before proceeding\n- Fail fast if any operation fails\n\n**Code Example:**\n\`\`\`javascript\n// Fetch multiple resources in parallel\nconst [users, posts, comments] = await Promise.all([\n  fetch(\'/api/users\').then(r => r.json()),\n  fetch(\'/api/posts\').then(r => r.json()),\n  fetch(\'/api/comments\').then(r => r.json())\n]);\n\n// Promise.all rejects if ANY promise rejects\ntry {\n  const results = await Promise.all([\n    fetch(\'/api/users\'),\n    fetch(\'/api/invalid\'),  // This rejects!\n    fetch(\'/api/posts\')\n  ]);\n} catch (error) {\n  console.error(\'At least one request failed:\', error);\n}\n\n// Map with async operations\nconst userIds = [1, 2, 3, 4, 5];\nconst users = await Promise.all(\n  userIds.map(id => fetch(\`/api/users/\${id}\`).then(r => r.json()))\n);\n\`\`\`\n\n**Key Takeaways:**\n1. Promise.all fails fast on first rejection\n2. Use for independent parallel operations\n3. Results maintain order matching input array' },
      { id: 'promise-allsettled', title: 'Promise.allSettled', content: '**Promise.allSettled - Resilient Parallel:**\n\nPromise.allSettled waits for ALL promises to settle (either resolve or reject) and returns an array of result objects with status.\n\n**Why allSettled Matters:**\n- Handle partial successes gracefully\n- Get detailed status of each operation\n- Never rejects — always resolves\n\n**Code Example:**\n\`\`\`javascript\n// allSettled never rejects\nconst results = await Promise.allSettled([\n  fetch(\'/api/users\'),      // resolves\n  fetch(\'/api/invalid\'),    // rejects\n  fetch(\'/api/posts\')       // resolves\n]);\n\n// Check each result\nresults.forEach((result, i) => {\n  if (result.status === \'fulfilled\') {\n    console.log(\`Request \${i} succeeded:\`, result.value);\n  } else {\n    console.log(\`Request \${i} failed:\`, result.reason);\n  }\n});\n\n// Filter successful results\nconst successful = results\n  .filter(r => r.status === \'fulfilled\')\n  .map(r => r.value);\n\n// Real-world: Batch operations\nasync function batchDelete(ids) {\n  const results = await Promise.allSettled(\n    ids.map(id => fetch(\`/api/items/\${id}\`, { method: \'DELETE\' }))\n  );\n  \n  const deleted = results.filter(r => r.status === \'fulfilled\').length;\n  const failed = results.filter(r => r.status === \'rejected\').length;\n  \n  console.log(\`Deleted: \${deleted}, Failed: \${failed}\`);\n}\n\`\`\`\n\n**Key Takeaways:**\n1. allSettled never rejects — always resolves\n2. Each result has status: \'fulfilled\' or \'rejected\'\n3. Use when you need all results regardless of individual failures' },
      { id: 'promise-race', title: 'Promise.race', content: '**Promise.race - First to Settle:**\n\nPromise.race resolves or rejects with the FIRST promise to settle (resolve or reject).\n\n**Why Promise.race Matters:**\n- Implement timeouts for async operations\n- Use the fastest source (e.g., multiple CDNs)\n- Compete multiple strategies\n\n**Code Example:**\n\`\`\`javascript\n// Timeout pattern\nfunction fetchWithTimeout(url, ms) {\n  const controller = new AbortController();\n  const timeout = new Promise((_, reject) => {\n    setTimeout(() => {\n      controller.abort();\n      reject(new Error(\'Request timed out\'));\n    }, ms);\n  });\n  \n  const fetchPromise = fetch(url, { signal: controller.signal });\n  \n  return Promise.race([fetchPromise, timeout]);\n}\n\n// Race multiple sources\nasync function getFastestSource() {\n  return Promise.race([\n    fetch(\'https://cdn1.example.com/data.json\').then(r => r.json()),\n    fetch(\'https://cdn2.example.com/data.json\').then(r => r.json()),\n    fetch(\'https://cdn3.example.com/data.json\').then(r => r.json())\n  ]);\n}\n\n// Warning: Promise.race resolves/rejects with first settlement\n// If first promise rejects, race rejects even if others resolve\nconst result = await Promise.race([\n  Promise.reject(\'error\'),   // Rejects first\n  Promise.resolve(\'success\') // Never reached\n]);\n// result: rejects with \'error\'\n\`\`\`\n\n**Key Takeaways:**\n1. Promise.race uses first settlement (resolve OR reject)\n2. Use for timeouts and competing sources\n3. Be careful: first rejection means overall rejection' },
      { id: 'promise-any', title: 'Promise.any', content: '**Promise.any - First Success:**\n\nPromise.any resolves with the FIRST successfully resolved promise. It only rejects if ALL promises reject.\n\n**Why Promise.any Matters:**\n- Try multiple fallback sources\n- Use first successful result\n- More resilient than Promise.race\n\n**Code Example:**\n\`\`\`javascript\n// Try multiple CDNs — use first success\nconst data = await Promise.any([\n  fetch(\'https://cdn1.example.com/data.json\').then(r => r.json()),\n  fetch(\'cdn2.example.com/data.json\').then(r => r.json()),\n  fetch(\'cdn3.example.com/data.json\').then(r => r.json())\n]);\n\n// Promise.any only rejects if ALL reject\ntry {\n  await Promise.any([\n    Promise.reject(\'error1\'),\n    Promise.reject(\'error2\'),\n    Promise.reject(\'error3\')\n  ]);\n} catch (error) {\n  // error is AggregateError containing all rejection reasons\n  console.log(error.errors); // [\'error1\', \'error2\', \'error3\']\n}\n\n// Fallback chain\nasync function fetchWithFallback(url) {\n  const sources = [\n    () => fetch(url).then(r => r.json()),\n    () => fetch(url.replace(\'api1\', \'api2\')).then(r => r.json()),\n    () => fetch(url.replace(\'api1\', \'api3\')).then(r => r.json())\n  ];\n  \n  return Promise.any(sources.map(fn => fn()));\n}\n\n// Race vs Any comparison\n// Promise.race: First to SETTLE (resolve or reject)\n// Promise.any: First to RESOLVE (ignores rejections)\n\`\`\`\n\n**Key Takeaways:**\n1. Promise.any resolves with first success\n2. Only rejects if ALL promises reject\n3. Throws AggregateError with all rejection reasons\n4. Better than race for fallback patterns (ignores individual failures)' },
    ],
    quiz: [
      {
        id: 1,
        question: 'How does Promise.all differ from Promise.allSettled?',
        options: ['Promise.all is faster', 'Promise.all rejects on first failure, allSettled never rejects', 'Promise.allSettled rejects on first failure', 'They are identical'],
        correctIndex: 1,
        explanation: 'Promise.all rejects immediately when any promise rejects, while Promise.allSettled waits for all promises to settle and never rejects.'
      },
      {
        id: 2,
        question: 'What does Promise.race resolve or reject with?',
        options: ['The last promise to settle', 'The first promise to settle (resolve or reject)', 'Only resolved promises', 'All promises combined'],
        correctIndex: 1,
        explanation: 'Promise.race settles with the first promise that either resolves or rejects, ignoring all other promises.'
      },
      {
        id: 3,
        question: 'When should you use Promise.any over Promise.race?',
        options: ['When you want the fastest result', 'When you want the first success and can ignore individual failures', 'When you need all results', 'When you want to fail fast'],
        correctIndex: 1,
        explanation: 'Promise.any resolves with the first successful promise and ignores rejections, making it ideal for fallback patterns where you try multiple sources.'
      }
    ]
  },
  {
    id: 123, slug: 'js-currying', title: 'Currying & Partial Application',
    description: 'Master function currying and partial application patterns.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Understand currying', 'Implement partial application', 'Use currying in real scenarios'],
    topics: [
      { id: 'currying-basics', title: 'Currying Fundamentals', content: '**What is Currying?**\n\nCurrying transforms a function that takes multiple arguments into a sequence of functions that each take a single argument. It\'s a fundamental functional programming technique.\n\n**Why Currying Matters:**\n- Create specialized functions from general ones\n- Enable function composition\n- Improve code reuse and readability\n- Enable partial application\n\n**How Currying Works (Step-by-Step):**\n1. Original: \`fn(a, b, c)\` → Curried: \`fn(a)(b)(c)\`\n2. Each call returns a new function expecting next argument\n3. Can stop at any point to create specialized function\n\n**Code Example:**\n\`\`\`javascript\n// Manual currying\nfunction multiply(a) {\n  return function(b) {\n    return a * b;\n  };\n}\n\nconst double = multiply(2);  // Specialized function\nconst triple = multiply(3);\n\ndouble(5);  // 10\ntriple(5);  // 15\n\n// Generic curry function\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...args2) {\n      return curried.apply(this, args.concat(args2));\n    };\n  };\n}\n\n// Curry a function\nconst add = curry((a, b, c) => a + b + c);\n\nadd(1)(2)(3);      // 6\nadd(1, 2)(3);      // 6\nadd(1)(2, 3);      // 6\nadd(1, 2, 3);      // 6\n\n// Real-world: Logger\nconst log = curry((level, timestamp, message) => {\n  console.log(\`[\${level}] \${timestamp}: \${message}\`);\n});\n\nconst errorLog = log(\'ERROR\');\nconst timestampLog = errorLog(new Date().toISOString());\ntimestampLog(\'Database connection failed\');\n\`\`\`\n\n**Key Takeaways:**\n1. Currying transforms multi-arg function to single-arg sequence\n2. Each call returns a new function expecting next argument\n3. Can stop at any point to create specialized function' },
      { id: 'partial-application', title: 'Partial Application', content: '**What is Partial Application?\n\nPartial application fixes some arguments of a function, returning a new function with fewer arguments. Unlike currying, it can fix multiple arguments at once.\n\n**Why Partial Application Matters:**\n- Create specialized functions from general ones\n- Reduce code duplication\n- Enable function composition\n- Make code more declarative\n\n**How Partial Application Works (Step-by-Step):**\n1. Fix some arguments of a function\n2. Return new function with remaining args\n3. New function can be called later\n\n**Code Example:**\n```javascript\n// Partial application with bind\nfunction multiply(a, b, c) {\n  return a * b * c;\n}\n\nconst double = multiply.bind(null, 2);  // Fix first arg\nconst doubleOf = multiply.bind(null, 2, 3);  // Fix first two args\n\ndouble(3, 4);   // 24\ndoubleOf(4);    // 24\n\n// Generic partial application\nfunction partial(fn, ...presetArgs) {\n  return function(...laterArgs) {\n    return fn(...presetArgs, ...laterArgs);\n  };\n}\n\nconst add = (a, b, c) => a + b + c;\nconst add10 = partial(add, 10);\nconst add10and20 = partial(add, 10, 20);\n\nadd10(5, 3);      // 18\nadd10and20(5);     // 35\n\n// Real-world: API client\nfunction apiClient(baseURL, endpoint, method, data) {\n  return fetch(`${baseURL}/${endpoint}`, {\n    method,\n    body: JSON.stringify(data)\n  });\n}\n\nconst productionAPI = partial(apiClient, \'https://api.prod.com\');\nconst devAPI = partial(apiClient, \'https://localhost:3000\');\n\nconst getUsers = (api) => partial(api, \'/users\', \'GET\');\nconst createUser = (api) => (data) => api(\'/users\', \'POST\', data);\n\ngetUsers(productionAPI)();\ncreateUser(devAPI)({ name: \'John\' });\n```\n\n**Key Takeaways:**\n1. Partial application fixes some arguments immediately\n2. Can fix multiple arguments at once (unlike currying)\n3. Use .bind() or custom partial function\n4. Great for creating specialized API functions' }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the main difference between currying and partial application?',
        options: ['They are identical', 'Currying takes one argument at a time, partial application can fix multiple arguments at once', 'Partial application is slower', 'Currying is only for async functions'],
        correctIndex: 1,
        explanation: 'Currying transforms a function into a sequence of functions each taking one argument. Partial application fixes some arguments upfront and returns a function with fewer parameters.'
      },
      {
        id: 2,
        question: 'What does `multiply.bind(null, 2)` return when multiply is (a, b) => a * b?',
        options: ['The number 2', 'A function that doubles its argument', 'A function that always returns 2', 'The original function unchanged'],
        correctIndex: 1,
        explanation: 'bind(null, 2) creates a new function with the first argument fixed to 2, effectively creating a "double" function that multiplies its argument by 2.'
      },
      {
        id: 3,
        question: 'What is a real-world benefit of currying?',
        options: ['Faster execution speed', 'Creating specialized functions from general ones for code reuse', 'Reducing memory usage', 'Improving browser compatibility'],
        correctIndex: 1,
        explanation: 'Currying lets you create specialized functions (like errorLog, double) from general ones, enabling function composition and reducing code duplication.'
      }
    ]
  },
  {
    id: 124, slug: 'js-event-loop', title: 'Event Loop Deep Dive',
    description: 'Master the JavaScript event loop, task queues, and async scheduling.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Understand call stack execution', 'Master microtask vs macrotask priority', 'Visualize event loop flow', 'Optimize async scheduling'],
    quiz: [
      {
        id: 1,
        question: 'Which queue has higher priority: microtask or macrotask?',
        options: ['Macrotask queue', 'Microtask queue', 'Both run simultaneously', 'It depends on the browser'],
        correctIndex: 1,
        explanation: 'Microtasks (Promise.then, queueMicrotask) always run before the next macrotask (setTimeout, setInterval). The event loop drains the entire microtask queue before picking the next macrotask.'
      },
      {
        id: 2,
        question: 'What is a macrotask in JavaScript?',
        options: ['Promise.then callback', 'queueMicrotask callback', 'setTimeout callback', 'Synchronous code execution'],
        correctIndex: 2,
        explanation: 'setTimeout, setInterval, setImmediate, and I/O callbacks are macrotasks. They are queued and processed one at a time after the microtask queue is empty.'
      },
      {
        id: 3,
        question: 'Where does requestAnimationFrame scheduling fit in the event loop?',
        options: ['In the microtask queue', 'In the macrotask queue', 'In a separate animation frame queue before rendering', 'In the call stack'],
        correctIndex: 2,
        explanation: 'requestAnimationFrame callbacks run in a dedicated phase between macrotask processing and rendering. They are processed before the browser repaints the screen, making them ideal for smooth animations.'
      }
    ],
    topics: [
      { id: 'call-stack', title: 'Call Stack & Execution', content: '**What is the Call Stack?\n\nThe call stack is a LIFO (Last In, First Out) data structure that tracks function execution. When you call a function, it is pushed onto the stack; when it returns, it is popped off. JavaScript is single-threaded, meaning only one execution context exists on the call stack at any given time.\n\n**Why the Call Stack Matters:**\n- Every function call is tracked here\n- Understanding it helps debug recursion and stack overflow errors\n- Synchronous code blocks the stack entirely\n- Long-running synchronous operations freeze the UI\n\n**How It Works (Step-by-Step):**\n1. Global code starts executing — pushed to stack\n2. Function call encountered — pushed to stack\n3. Inner function call — pushed on top\n4. Function returns — popped from stack\n5. Stack empty — event loop checks queues\n\n**Code Example:**\n```javascript\nfunction multiply(a, b) {\n  return a * b;\n}\n\nfunction square(n) {\n  return multiply(n, n);\n}\n\nfunction printSquare(n) {\n  const result = square(n);\n  console.log(result);\n}\n\nprintSquare(4);\n// Stack: printSquare → square → multiply\n// multiply returns 16 → square returns 16 → printSquare logs 16\n// Stack is now empty — event loop processes queues\n\n// Stack overflow example\nfunction infinite() {\n  return infinite(); // Never returns!\n}\n\n// infinite(); // RangeError: Maximum call stack size exceeded\n```\n\n**Common Pitfalls:**\n```javascript\n// Blocking the event loop\nfunction heavyComputation() {\n  let sum = 0;\n  for (let i = 0; i < 1e10; i++) {\n    sum += i; // Blocks stack for seconds!\n  }\n  return sum;\n}\n// UI freezes during execution — no user interactions processed\n```\n\n**Best Practices:**\n- Keep synchronous operations short\n- Use setTimeout or web workers for heavy computation\n- Monitor stack depth in recursive functions\n- Use DevTools Performance tab to visualize call stack\n\n**Key Takeaways:**\n1. Call stack is LIFO — tracks synchronous execution\n2. Single-threaded — only one thing runs at a time\n3. Long synchronous operations block the UI and event loop' },
      { id: 'task-queues', title: 'Microtask & Macrotask Queues', content: '**What are Task Queues?\n\nJavaScript has two types of task queues: the microtask queue and the macrotask queue. After each macrotask completes, the event loop drains ALL microtasks before processing the next macrotask. This creates a strict priority system.\n\n**Why Task Queues Matter:**\n- Microtasks run before macrotasks — affects execution order\n- Understanding priority prevents subtle timing bugs\n- Essential for optimizing async performance\n- Critical for UI rendering (requestAnimationFrame)\n\n**Microtask Queue (Higher Priority):**\n- Promise.then / .catch / .finally\n- queueMicrotask()\n- MutationObserver callbacks\n- process.nextTick (Node.js)\n\n**Macrotask Queue (Lower Priority):**\n- setTimeout / setInterval callbacks\n- setImmediate (Node.js)\n- I/O callbacks\n- UI rendering events\n\n**Code Example:**\n```javascript\nconsole.log("1: Synchronous");\n\nsetTimeout(() => {\n  console.log("2: Macrotask (setTimeout)");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("3: Microtask (Promise.then)");\n}).then(() => {\n  console.log("4: Microtask (chained)");\n});\n\nqueueMicrotask(() => {\n  console.log("5: Microtask (queueMicrotask)");\n});\n\nconsole.log("6: Synchronous");\n\n// Output:\n// 1: Synchronous\n// 6: Synchronous\n// 3: Microtask (Promise.then)\n// 5: Microtask (queueMicrotask)\n// 4: Microtask (chained)\n// 2: Macrotask (setTimeout)\n```\n\n**Important Rule:** The event loop drains ALL microtasks before the next macrotask:\n```javascript\nsetTimeout(() => console.log("timeout 1"), 0);\nsetTimeout(() => console.log("timeout 2"), 0);\nPromise.resolve().then(() => console.log("promise 1"));\nPromise.resolve().then(() => console.log("promise 2"));\n\n// Output: promise 1, promise 2, timeout 1, timeout 2\n// ALL microtasks run before ANY macrotask\n```\n\n**Common Pitfalls:**\n```javascript\n// Infinite microtask loop — blocks macrotasks and rendering!\nfunction recurse() {\n  queueMicrotask(recurse);\n  // setTimeout callbacks never execute!\n}\n```\n\n**Best Practices:**\n- Use microtasks for urgent updates (state sync)\n- Use macrotasks for deferrable work (analytics, logging)\n- Never create infinite microtask loops\n- Use requestAnimationFrame for visual updates\n\n**Key Takeaways:**\n1. Microtasks ALWAYS run before macrotasks\n2. ALL microtasks complete before next macrotask\n3. queueMicrotask and Promise.then both use microtask queue' },
      { id: 'event-loop-flow', title: 'Event Loop Visualization', content: '**What is the Event Loop?\n\nThe event loop is a continuously running process that checks if the call stack is empty, and if so, pulls the next task from the appropriate queue. It orchestrates synchronous and asynchronous code execution in JavaScript.\n\n**Why Visualizing the Event Loop Matters:**\n- Predict execution order of mixed sync/async code\n- Debug timing-related bugs\n- Optimize application performance\n- Understand framework rendering cycles\n\n**Event Loop Phases (Step-by-Step):**\n1. Execute all synchronous code on the call stack\n2. When stack is empty, check microtask queue\n3. Drain ALL microtasks (one by one, including newly added ones)\n4. If microtasks added more microtasks, drain those too\n5. Check if rendering is needed (requestAnimationFrame)\n6. Render if necessary\n7. Pick next macrotask from queue\n8. Go to step 1\n\n**Code Example:**\n```javascript\n// Visualizing event loop flow\nconsole.log("A: Start");                          // Sync\n\nsetTimeout(() => {\n  console.log("B: Macrotask 1");                 // Macrotask\n  Promise.resolve().then(() => {\n    console.log("C: Microtask inside macrotask"); // Microtask\n  });\n}, 0);\n\nsetTimeout(() => {\n  console.log("D: Macrotask 2");                 // Macrotask\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("E: Microtask 1");                 // Microtask\n}).then(() => {\n  console.log("F: Microtask 2");                 // Microtask\n});\n\nconsole.log("G: End");                           // Sync\n\n// Execution trace:\n// 1. Sync: A, G\n// 2. Microtasks: E, F\n// 3. Macrotask 1: B\n// 4. Microtask from B: C\n// 5. Macrotask 2: D\n```\n\n**requestAnimationFrame in the Loop:**\n```javascript\n// rAF runs between macrotasks and rendering\nrequestAnimationFrame(() => {\n  console.log("Animation frame"); // Before next repaint\n});\n\nsetTimeout(() => {\n  console.log("Timeout"); // After rAF\n}, 0);\n\n// Animation frame typically runs before timeout\n```\n\n**Best Practices:**\n- Use DevTools Performance panel to record and visualize\n- Look for long tasks blocking the main thread\n- Profile async operations to find bottlenecks\n- Use async/await to break up long synchronous chains\n\n**Key Takeaways:**\n1. Event loop is a continuous cycle: stack → microtasks → render → macrotask\n2. Microtask queue is fully drained each cycle\n3. requestAnimationFrame runs before browser rendering' },
      { id: 'async-scheduling', title: 'Async Scheduling Patterns', content: '**What is Async Scheduling?\n\nAsync scheduling is the practice of choosing the right timing mechanism to defer or prioritize work. Different APIs (setTimeout, queueMicrotask, requestAnimationFrame) have different timing characteristics and use cases.\n\n**Why Async Scheduling Matters:**\n- Prevent UI freezing during heavy computation\n- Prioritize critical updates over background work\n- Batch DOM reads and writes for performance\n- Implement smooth animations without jank\n\n**Scheduling Mechanisms Comparison:**\n- setTimeout(fn, 0): Defers to next macrotask (~4ms minimum)\n- queueMicrotask(fn): Runs before next macrotask, no minimum delay\n- requestAnimationFrame(fn): Runs before next browser repaint (~16ms)\n- requestIdleCallback(fn): Runs when browser is idle\n\n**Code Example:**\n```javascript\n// Debouncing with setTimeout\nfunction debounce(fn, delay) {\n  let timerId;\n  return function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n// Throttling with requestAnimationFrame\nfunction throttleRAF(fn) {\n  let ticking = false;\n  return function(...args) {\n    if (!ticking) {\n      requestAnimationFrame(() => {\n        fn.apply(this, args);\n        ticking = false;\n      });\n      ticking = true;\n    }\n  };\n}\n\n// Yield to main thread for long computations\nasync function processLargeArray(items) {\n  const results = [];\n  for (let i = 0; i < items.length; i++) {\n    results.push(transform(items[i]));\n    // Yield every 100 items to prevent blocking\n    if (i % 100 === 0) {\n      await new Promise(resolve => setTimeout(resolve, 0));\n    }\n  }\n  return results;\n}\n\n// Prioritize critical updates with microtasks\nfunction updateUI(data) {\n  queueMicrotask(() => {\n    // This runs before any setTimeout callbacks\n    applyCriticalUpdate(data);\n  });\n  // Non-critical work deferred to macrotask\n  setTimeout(() => sendAnalytics(data), 0);\n}\n```\n\n**Common Pitfalls:**\n```javascript\n// setTimeout(fn, 0) is NOT 0ms — minimum ~4ms in nested calls\n// Use queueMicrotask for immediate deferral\n\n// Blocking in animation loop\nfunction animate() {\n  heavyComputation(); // Blocks rendering!\n  requestAnimationFrame(animate);\n}\n// Fix: Use Web Workers or break up computation\n```\n\n**Best Practices:**\n- Use requestAnimationFrame for visual updates\n- Use queueMicrotask for urgent non-blocking updates\n- Use setTimeout for general deferral and debouncing\n- Use requestIdleCallback for low-priority background work\n- Break up long computations with periodic yields\n\n**Key Takeaways:**\n1. Different scheduling APIs have different timing guarantees\n2. requestAnimationFrame is for visual updates (~16ms)\n3. Break up long work to keep the main thread responsive' }
    ]
  },
  {
    id: 125, slug: 'js-broadcast-channel', title: 'BroadcastChannel & Cross-Tab Communication',
    description: 'Master cross-tab communication, state sync, and tab visibility.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Enable cross-tab communication', 'Sync state across browser tabs', 'Handle tab visibility changes', 'Implement cross-tab authentication'],
    quiz: [
      {
        id: 1,
        question: 'What is the BroadcastChannel API used for?',
        options: ['Sending data to a server', 'Communicating between browser tabs/windows on the same origin', 'Broadcasting data to Web Workers', 'Sending data to iframes on different origins'],
        correctIndex: 1,
        explanation: 'BroadcastChannel allows same-origin tabs and windows to communicate by posting messages to a named channel. All listeners on that channel receive the message.'
      },
      {
        id: 2,
        question: 'What event fires when a tab becomes visible again?',
        options: ['visibilitychange', 'focus', 'online', 'storage'],
        correctIndex: 0,
        explanation: 'The visibilitychange event on document fires when the tab\'s visibility state changes. You can check document.visibilityState to determine if the tab is "visible" or "hidden".'
      },
      {
        id: 3,
        question: 'How does the storage event help with cross-tab state sync?',
        options: ['It fires on all tabs when localStorage changes on one tab', 'It only fires on the tab that made the change', 'It synchronizes sessionStorage between tabs', 'It works across different origins'],
        correctIndex: 0,
        explanation: 'The storage event fires on all other same-origin tabs (not the originating tab) when localStorage is modified, making it useful for cross-tab state synchronization.'
      }
    ],
    topics: [
      { id: 'broadcast-channel', title: 'BroadcastChannel API', content: '**What is BroadcastChannel?\n\nBroadcastChannel is a Web API that allows same-origin browser tabs and windows to communicate with each other. You create a named channel and post messages; all other tabs listening on the same channel receive the message.\n\n**Why BroadcastChannel Matters:**\n- Real-time sync across tabs (shopping cart, notifications)\n- No server round-trip needed for cross-tab communication\n- Simple API for complex coordination\n- Works with any same-origin context (tabs, windows, iframes)\n\n**How It Works (Step-by-Step):**\n1. Create a BroadcastChannel with a name\n2. Set up a message handler on each tab\n3. Post messages from any tab\n4. All other tabs on the same channel receive the message\n5. Close the channel when done to free resources\n\n**Code Example:**\n```javascript\n// Tab 1: Create channel and listen\nconst channel = new BroadcastChannel("cart-updates");\n\nchannel.onmessage = (event) => {\n  console.log("Received:", event.data);\n  updateCartUI(event.data);\n};\n\n// Tab 2: Post message\nconst channel2 = new BroadcastChannel("cart-updates");\nchannel2.postMessage({\n  type: "item-added",\n  item: { id: 1, name: "Widget", price: 9.99 }\n});\n\n// Tab 1 receives: { type: "item-added", item: {...} }\n\n// Clean up when tab closes\nwindow.addEventListener("beforeunload", () => {\n  channel.close();\n});\n```\n\n**Common Pitfalls:**\n```javascript\n// Not closing the channel — memory leak\nconst channel = new BroadcastChannel("updates");\n// Fix: Close on page unload\nwindow.addEventListener("beforeunload", () => channel.close());\n\n// Sending non-cloneable data\nchannel.postMessage(document.querySelector("#el")); // DOM node — cannot clone!\n// Fix: Send serializable data\nchannel.postMessage({ id: element.id, text: element.textContent });\n```\n\n**Best Practices:**\n- Always close channels on page unload\n- Send only serializable data (no DOM nodes, functions)\n- Use meaningful channel names\n- Handle both message and error events\n\n**Key Takeaways:**\n1. BroadcastChannel enables same-origin cross-tab communication\n2. Always close channels to prevent memory leaks\n3. Send only serializable data via postMessage' },
      { id: 'storage-events', title: 'Storage Events', content: '**What is the Storage Event?\n\nThe storage event fires on all other same-origin tabs when localStorage is modified on one tab. The originating tab does NOT receive the event. This makes it a natural mechanism for cross-tab state synchronization.\n\n**Why Storage Events Matter:**\n- Automatic cross-tab sync when localStorage changes\n- No explicit channel setup needed\n- Works in all browsers (including older ones)\n- Perfect for simple key-value sync patterns\n\n**How It Works (Step-by-Step):**\n1. Tab A modifies localStorage\n2. Storage event fires on Tab B, C, D (same origin)\n3. Event contains key, oldValue, newValue, and url\n4. Listeners can react to the change and update their state\n\n**Code Example:**\n```javascript\n// Cross-tab state sync using storage events\nwindow.addEventListener("storage", (event) => {\n  if (event.key === "user-preferences") {\n    const newValue = JSON.parse(event.newValue);\n    const oldValue = event.oldValue ? JSON.parse(event.oldValue) : null;\n    console.log("Preference changed:", event.key);\n    console.log("From:", oldValue, "To:", newValue);\n    applyPreferences(newValue);\n  }\n  if (event.key === "auth-token") {\n    if (event.newValue === null) {\n      // Token removed in another tab — logout here too\n      handleLogout();\n    } else {\n      // Token set in another tab — sync\n      syncAuthToken(event.newValue);\n    }\n  }\n});\n\n// Tab A: Set token\nlocalStorage.setItem("auth-token", "abc123");\n// Tab B: storage event fires with key="auth-token", newValue="abc123"\n\n// Tab A: Remove token\nlocalStorage.removeItem("auth-token");\n// Tab B: storage event fires with newValue=null\n```\n\n**Common Pitfalls:**\n```javascript\n// Storage event does NOT fire on the originating tab\n// Fix: Use BroadcastChannel for same-tab notifications\n\n// Storage event only fires for localStorage, not sessionStorage\n// sessionStorage is tab-specific and not shared\n\n// Large data in storage events can be slow\n// Fix: Store only references, not full data\n```\n\n**Best Practices:**\n- Use storage events for simple key-value sync\n- Use BroadcastChannel for complex message passing\n- Listen for specific keys to avoid unnecessary processing\n- Handle null newValue (deleted keys)\n\n**Key Takeaways:**\n1. Storage events fire on OTHER tabs, not the originating tab\n2. Only works with localStorage, not sessionStorage\n3. Great for auth sync and preference updates across tabs' },
      { id: 'tab-visibility', title: 'Tab Visibility API', content: '**What is the Tab Visibility API?\n\nThe Page Visibility API lets you detect when a tab is visible, hidden, or in the background. This enables performance optimizations by pausing unnecessary work when users are not looking at a tab.\n\n**Why Tab Visibility Matters:**\n- Pause animations, polling, and video when tab is hidden\n- Save battery and CPU on mobile devices\n- Resume work immediately when tab becomes visible\n- Trigger data refresh when user returns to tab\n\n**How It Works (Step-by-Step):**\n1. Check document.visibilityState for current state\n2. Listen for visibilitychange events\n3. Pause work when state becomes "hidden"\n4. Resume work when state becomes "visible"\n\n**Code Example:**\n```javascript\n// Pause/resume based on visibility\nlet pollInterval = null;\n\nfunction startPolling() {\n  pollInterval = setInterval(fetchUpdates, 5000);\n}\n\nfunction stopPolling() {\n  clearInterval(pollInterval);\n  pollInterval = null;\n}\n\n// Start polling if tab is visible\nif (document.visibilityState === "visible") {\n  startPolling();\n}\n\n// Respond to visibility changes\ndocument.addEventListener("visibilitychange", () => {\n  if (document.visibilityState === "visible") {\n    console.log("Tab visible — resuming work");\n    startPolling();\n    refreshData(); // Fetch latest data when user returns\n  } else {\n    console.log("Tab hidden — pausing work");\n    stopPolling();\n    pauseAnimations();\n  }\n});\n\n// Pause video when tab hidden\ndocument.addEventListener("visibilitychange", () => {\n  const video = document.querySelector("video");\n  if (document.visibilityState === "hidden") {\n    video.pause();\n  } else {\n    video.play();\n  }\n});\n```\n\n**Common Pitfalls:**\n```javascript\n// Relying only on blur/focus events\nwindow.addEventListener("blur", pauseWork); // Not reliable for tab switching\n// Fix: Use visibilitychange event\n\ndocument.addEventListener("visibilitychange", pauseWork); // Correct\n\n// Not handling initial state\n// Fix: Check visibilityState on load\nif (document.visibilityState === "visible") {\n  startExpensiveWork();\n}\n```\n\n**Best Practices:**\n- Always check initial visibilityState before starting work\n- Pause expensive operations (polling, animations, video)\n- Refresh data when user returns to tab\n- Combine with requestAnimationFrame for smooth transitions\n\n**Key Takeaways:**\n1. document.visibilityState shows "visible" or "hidden"\n2. visibilitychange event fires on state transitions\n3. Pause expensive work when tab is hidden to save resources' },
      { id: 'cross-tab-auth', title: 'Cross-Tab Authentication', content: '**What is Cross-Tab Authentication?\n\nCross-tab authentication syncs login/logout state across multiple browser tabs. When a user logs in or out in one tab, all other tabs should reflect the same state immediately.\n\n**Why Cross-Tab Auth Matters:\n- Prevents inconsistent auth state across tabs\n- Improves security (logout everywhere)\n- Better user experience\n- Essential for single sign-on implementations\n\n**How It Works (Step-by-Step):**\n1. Store auth token in localStorage\n2. On login: BroadcastChannel notifies other tabs\n3. On logout: Remove token and notify all tabs\n4. Other tabs listen and update their state\n5. Use visibilitychange to refresh auth when tab returns\n\n**Code Example:**\n```javascript\n// Auth sync service using BroadcastChannel + localStorage\nconst authChannel = new BroadcastChannel("auth-sync");\n\n// Handle auth state changes from other tabs\nauthChannel.onmessage = (event) => {\n  const { type, token } = event.data;\n  switch (type) {\n    case "login":\n      localStorage.setItem("auth-token", token);\n      refreshUserData();\n      break;\n    case "logout":\n      localStorage.removeItem("auth-token");\n      redirectToLogin();\n      break;\n    case "token-refreshed":\n      localStorage.setItem("auth-token", token);\n      break;\n  }\n};\n\n// Login function\nasync function login(username, password) {\n  const response = await fetch("/api/login", {\n    method: "POST",\n    body: JSON.stringify({ username, password })\n  });\n  const { token } = await response.json();\n  localStorage.setItem("auth-token", token);\n  authChannel.postMessage({ type: "login", token });\n}\n\n// Logout function\nfunction logout() {\n  localStorage.removeItem("auth-token");\n  authChannel.postMessage({ type: "logout" });\n}\n\n// Also sync via storage event for BroadcastChannel fallback\nwindow.addEventListener("storage", (event) => {\n  if (event.key === "auth-token") {\n    if (event.newValue === null) {\n      redirectToLogin(); // Logged out in another tab\n    } else {\n      refreshUserData(); // Logged in in another tab\n    }\n  }\n});\n\n// Refresh auth when tab becomes visible\ndocument.addEventListener("visibilitychange", () => {\n  if (document.visibilityState === "visible") {\n    verifyToken(); // Ensure token is still valid\n  }\n});\n```\n\n**Best Practices:**\n- Use both BroadcastChannel and storage events for redundancy\n- Always verify token validity when tab becomes visible\n- Set short token expiry for security\n- Handle network failures gracefully\n\n**Key Takeaways:**\n1. Use BroadcastChannel for real-time cross-tab auth sync\n2. Use storage events as a fallback\n3. Always verify auth state when tab becomes visible' }
    ]
  },
  {
    id: 126, slug: 'js-structured-clone', title: 'structuredClone & Deep Cloning',
    description: 'Master deep cloning with structuredClone, circular references, and performance.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Use structuredClone for deep copying', 'Handle circular references safely', 'Compare cloning performance', 'Understand transferable objects'],
    quiz: [
      {
        id: 1,
        question: 'What advantage does structuredClone have over JSON.parse(JSON.stringify())?',
        options: ['structuredClone is always faster', 'structuredClone handles circular references, Dates, and more types natively', 'structuredClone works with functions', 'structuredClone creates shallow copies'],
        correctIndex: 1,
        explanation: 'structuredClone handles circular references, Date objects, RegExp, Map, Set, ArrayBuffer, and more. JSON.parse(JSON.stringify()) throws on circular references and loses type information.'
      },
      {
        id: 2,
        question: 'What is a transferable object?',
        options: ['An object that can be cloned infinitely', 'An object whose ownership is moved to another context without copying data', 'An object that can be shared across origins', 'An object that persists across page reloads'],
        correctIndex: 1,
        explanation: 'Transferable objects (like ArrayBuffer) can be moved between execution contexts (e.g., main thread to worker) by transferring ownership instead of copying, making it near-instantaneous.'
      },
      {
        id: 3,
        question: 'What happens when structuredClone encounters a circular reference?',
        options: ['It throws an error', 'It returns undefined', 'It clones the reference correctly without infinite recursion', 'It replaces the reference with null'],
        correctIndex: 2,
        explanation: 'structuredClone handles circular references natively. It tracks objects it has already cloned and reuses the same reference in the clone, preventing infinite recursion.'
      }
    ],
    topics: [
      { id: 'structured-clone-api', title: 'structuredClone API', content: '**What is structuredClone?\n\nstructuredClone is a built-in API for creating deep copies of JavaScript values. It supports a wide range of types that JSON cannot handle, including Date, RegExp, Map, Set, ArrayBuffer, and circular references.\n\n**Why structuredClone Matters:**\n- True deep copy without third-party libraries\n- Handles circular references safely\n- Preserves type information (Date, Map, Set, etc.)\n- Standard API — no lodash needed for deep clone\n\n**How It Works (Step-by-Step):**\n1. Pass any JavaScript value to structuredClone()\n2. It recursively clones all nested properties\n3. Returns a completely independent copy\n4. Circular references are tracked and preserved\n\n**Code Example:**\n```javascript\n// Basic deep clone\nconst original = {\n  name: "John",\n  address: { city: "NYC", zip: "10001" },\n  hobbies: ["reading", "gaming"]\n};\n\nconst clone = structuredClone(original);\nclone.address.city = "LA";\nconsole.log(original.address.city); // "NYC" — unchanged!\n\n// Preserves Date objects\nconst data = {\n  created: new Date("2024-01-01"),\n  tags: ["important"]\n};\nconst cloned = structuredClone(data);\nconsole.log(cloned.created instanceof Date); // true!\n\n// Preserves Map and Set\nconst mapData = {\n  userMap: new Map([["key1", "value1"]]),\n  tagSet: new Set(["tag1", "tag2"])\n};\nconst clonedMap = structuredClone(mapData);\nconsole.log(clonedMap.userMap instanceof Map); // true\n\n// Handles circular references\nconst obj = { name: "parent" };\nobj.self = obj; // Circular!\nconst clonedObj = structuredClone(obj);\nconsole.log(clonedObj.self === clonedObj); // true\n```\n\n**Common Pitfalls:**\n```javascript\n// Cannot clone functions\nstructuredClone({ fn: () => {} }); // DataCloneError!\n\n// Cannot clone DOM nodes\nstructuredClone({ el: document.body }); // DataCloneError!\n\n// Cannot clone WeakMap/WeakSet\nstructuredClone({ cache: new WeakMap() }); // DataCloneError!\n\n// Fix: Use custom replacer or manual cloning for unsupported types\n```\n\n**Best Practices:**\n- Use structuredClone as the default deep clone method\n- Handle DataCloneError for unsupported types\n- Use JSON.parse(JSON.stringify()) only for simple JSON-safe data\n- Consider performance for very large objects\n\n**Key Takeaways:**\n1. structuredClone is the standard deep copy API\n2. Handles circular references, Date, Map, Set natively\n3. Cannot clone functions, DOM nodes, or WeakMap/WeakSet' },
      { id: 'json-comparison', title: 'JSON vs structuredClone', content: '**What are the Differences Between JSON and structuredClone?\n\nJSON.parse(JSON.stringify()) is the traditional deep clone method, but it loses type information and fails on circular references. structuredClone is the modern replacement that handles both.\n\n**Why the Comparison Matters:**\n- Many codebases still use JSON for cloning\n- Understanding differences prevents subtle bugs\n- Know when to migrate to structuredClone\n- Performance implications for large data\n\n**Comparison Table:**\n- JSON: No circular references, loses Date/Map/Set/RegExp, fast for simple data\n- structuredClone: Handles circular references, preserves all types, slightly slower for simple data\n\n**Code Example:**\n```javascript\n// JSON.parse/stringify problems\nconst data = {\n  date: new Date("2024-01-01"),\n  regex: /test/gi,\n  map: new Map([["key", "value"]]),\n  set: new Set([1, 2, 3]),\n  undefined: undefined,\n  fn: () => {}\n};\n\n// JSON loses everything\nconst jsonClone = JSON.parse(JSON.stringify(data));\nconsole.log(jsonClone.date instanceof Date); // false — string!\nconsole.log(jsonClone.regex);                // undefined — lost!\nconsole.log(jsonClone.map);                  // undefined — lost!\nconsole.log(jsonClone.set);                  // undefined — lost!\nconsole.log(jsonClone.undefined);            // undefined property — lost!\nconsole.log(jsonClone.fn);                   // undefined — lost!\n\n// structuredClone preserves types\nconst scClone = structuredClone(data);\nconsole.log(scClone.date instanceof Date); // true\nconsole.log(scClone.regex instanceof RegExp); // true\nconsole.log(scClone.map instanceof Map); // true\nconsole.log(scClone.set instanceof Set); // true\n\n// JSON throws on circular references\nconst circular = { a: 1 };\ncircular.self = circular;\n// JSON.parse(JSON.stringify(circular)); // TypeError: Converting circular structure to JSON\n\n// structuredClone handles circular references\nconst clonedCircular = structuredClone(circular);\nconsole.log(clonedCircular.self === clonedCircular); // true\n```\n\n**Performance Notes:**\n```javascript\n// For simple JSON-safe data, JSON is faster\nconst simple = { name: "John", age: 30, items: [1, 2, 3] };\n// JSON.parse(JSON.stringify(simple)) — faster\n// structuredClone(simple) — slightly slower but safer\n\n// For complex data with special types, structuredClone is essential\n```\n\n**Best Practices:**\n- Use structuredClone for general-purpose deep cloning\n- Use JSON for serialization (sending to server, localStorage)\n- Migrate existing JSON.clone patterns to structuredClone\n- Consider lodash.cloneDeep for edge cases (functions, class instances)\n\n**Key Takeaways:**\n1. JSON loses Date, Map, Set, RegExp, undefined, functions\n2. structuredClone preserves all these types\n3. Use structuredClone as the default deep clone method' },
      { id: 'transferable-objects', title: 'Transferable Objects', content: '**What are Transferable Objects?\n\nTransferable objects allow you to transfer ownership of data between execution contexts (main thread, Web Workers) without copying. This is near-instantaneous regardless of data size.\n\n**Why Transferable Objects Matter:**\n- Near-zero-cost data transfer to/from Web Workers\n- Prevents memory duplication across threads\n- Essential for performance-critical worker communication\n- Works with ArrayBuffer, ImageData, MessagePort, and more\n\n**How It Works (Step-by-Step):**\n1. Create an ArrayBuffer or other transferable object\n2. Pass it to postMessage with a transfer list\n3. Ownership transfers to the receiving context\n4. Original reference becomes detached (unusable)\n5. Receiving context gains exclusive ownership\n\n**Code Example:**\n```javascript\n// Transfer ArrayBuffer to Web Worker\nconst buffer = new ArrayBuffer(1024 * 1024); // 1MB\nconst view = new Uint8Array(buffer);\nview[0] = 42;\n\n// Transfer (near-instant, no copying)\nworker.postMessage({ data: buffer }, [buffer]);\nconsole.log(buffer.byteLength); // 0 — detached!\n\n// Worker receives the buffer\nworker.onmessage = (event) => {\n  const { data } = event.data;\n  console.log(data.byteLength); // 1048576 — full 1MB\n};\n\n// Transfer multiple objects\nconst buffer1 = new ArrayBuffer(1024);\nconst buffer2 = new ArrayBuffer(2048);\nworker.postMessage(\n  { audio: buffer1, video: buffer2 },\n  [buffer1, buffer2] // Transfer list\n);\n\n// structuredClone with transfer\nconst original = new ArrayBuffer(1024);\nconst clone = structuredClone(original, { transfer: [original] });\nconsole.log(original.byteLength); // 0 — detached\nconsole.log(clone.byteLength);    // 1024 — transferred\n```\n\n**Common Pitfalls:**\n```javascript\n// Forgetting transfer list — makes a copy instead\nworker.postMessage({ data: buffer }); // Copied, not transferred!\n// Fix: Always include transfer list\nworker.postMessage({ data: buffer }, [buffer]);\n\n// Using detached buffer after transfer\nconst buffer = new ArrayBuffer(1024);\nworker.postMessage({ data: buffer }, [buffer]);\nbuffer[0] = 1; // TypeError: Cannot use detached ArrayBuffer\n// Fix: Don\'t use buffer after transfer\n\n// Transferring non-transferable objects\nworker.postMessage({ data: {} }, [{}]); // Not transferred!\n```\n\n**Best Practices:**\n- Use transfer list for large ArrayBuffers\n- Never use a buffer after transferring it\n- Use structuredClone with transfer for modern code\n- Combine with Web Workers for CPU-intensive tasks\n\n**Key Takeaways:**\n1. Transferring moves ownership without copying — near-instant\n2. Original reference becomes detached after transfer\n3. Always include the transfer list in postMessage' }
    ]
  },
  {
    id: 127, slug: 'js-temporal-api', title: 'Temporal API',
    description: 'Master the Temporal API as a modern replacement for Date.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Replace Date with Temporal', 'Handle timezones correctly', 'Work with calendar systems', 'Perform date arithmetic safely'],
    quiz: [
      {
        id: 1,
        question: 'What is the main problem with the Date object that Temporal fixes?',
        options: ['Date is too slow', 'Date is mutable and has ambiguous parsing and timezone handling', 'Date does not support UTC', 'Date cannot represent times before 1970'],
        correctIndex: 1,
        explanation: 'Date is mutable, has inconsistent parsing behavior across browsers, lacks proper timezone support, and performs unsafe date arithmetic. Temporal addresses all these issues.'
      },
      {
        id: 2,
        question: 'What does Temporal.PlainDate represent?',
        options: ['A date with timezone information', 'A calendar date without time or timezone (e.g., 2024-01-15)', 'A Unix timestamp', 'A duration between two dates'],
        correctIndex: 1,
        explanation: 'PlainDate represents a calendar date (year, month, day) without any time or timezone information. It is immutable and unambiguous.'
      },
      {
        id: 3,
        question: 'How do you add 3 months to a Temporal.PlainDate?',
        options: ['date.add({ months: 3 })', 'date + 3 months', 'date.plus({ months: 3 })', 'date.addMonths(3)'],
        correctIndex: 2,
        explanation: 'Temporal.PlainDate uses .plus() with a Duration-like object: date.plus({ months: 3 }). This returns a new PlainDate — the original is not mutated.'
      }
    ],
    topics: [
      { id: 'temporal-overview', title: 'Temporal Overview', content: '**What is the Temporal API?\n\nTemporal is the modern replacement for the Date object in JavaScript. It provides immutable, timezone-aware, calendar-safe date and time handling without the pitfalls of the legacy Date API.\n\n**Why Temporal Matters:**\n- Immutable — no accidental mutations\n- Timezone-aware by design\n- Calendar system support (Gregorian, Japanese, etc.)\n- Safe date arithmetic (no month overflow bugs)\n- Unambiguous parsing (no more new Date("2024-13-45"))\n\n**Temporal Types Overview:**\n- Temporal.Now: Current date/time\n- Temporal.PlainDate: Calendar date (year, month, day)\n- Temporal.PlainTime: Time (hour, minute, second)\n- Temporal.PlainDateTime: Date + time, no timezone\n- Temporal.ZonedDateTime: Date + time + timezone\n- Temporal.Duration: Amount of time\n\n**Code Example:**\n```javascript\n// Getting current time\nconst now = Temporal.Now.zonedDateTimeISO();\nconsole.log(now.toString()); // "2024-01-15T10:30:00+05:30[Asia/Kolkata]"\n\n// Creating specific dates\nconst date = Temporal.PlainDate.from("2024-01-15");\nconst time = Temporal.PlainTime.from("10:30:00");\nconst dateTime = Temporal.PlainDateTime.from("2024-01-15T10:30:00");\nconst zoned = Temporal.ZonedDateTime.from("2024-01-15T10:30:00+05:30[Asia/Kolkata]");\n\n// All objects are immutable\nconsole.log(date.year);  // 2024\nconsole.log(date.month); // 1\nconsole.log(date.day);   // 15\n\n// Date arithmetic — safe!\nconst nextWeek = date.plus({ days: 7 });\nconst threeMonthsLater = date.add({ months: 3 });\n```\n\n**Common Pitfalls:**\n```javascript\n// new Date("2024-13-45") — silently invalid!\nconst bad = new Date("2024-13-45");\nconsole.log(bad.toString()); // "Invalid Date"\n\n// Temporal throws on invalid input\n// Temporal.PlainDate.from("2024-13-45"); // RangeError!\n```\n\n**Best Practices:**\n- Use PlainDate when you only need a calendar date\n- Use ZonedDateTime when timezone matters\n- Always use .plus() and .minus() for arithmetic\n- Prefer Temporal over Date for all new code\n\n**Key Takeaways:**\n1. Temporal is immutable — operations return new objects\n2. Use PlainDate, PlainTime, PlainDateTime, ZonedDateTime\n3. Temporal throws on invalid input — no silent failures' },
      { id: 'timezone-handling', title: 'Timezone Handling', content: '**What is Temporal Timezone Handling?\n\nTemporal provides first-class timezone support through ZonedDateTime. You can create, convert, and compare dates across timezones without the bugs of the Date object.\n\n**Why Timezone Handling Matters:**\n- Display correct local times for users worldwide\n- Convert between timezones without bugs\n- Handle DST transitions safely\n- Essential for global applications\n\n**How It Works (Step-by-Step):**\n1. Create ZonedDateTime with timezone string\n2. Use .withTimeZone() to convert\n3. Access local time components\n4. Handle DST transitions automatically\n\n**Code Example:**\n```javascript\n// Create with specific timezone\nconst meeting = Temporal.ZonedDateTime.from(\n  "2024-06-15T14:00:00[America/New_York]"\n);\n\nconsole.log(meeting.hour); // 14 (local hour in NY)\nconsole.log(meeting.timeZoneId); // "America/New_York"\n\n// Convert to another timezone\nconst tokyo = meeting.withTimeZone("Asia/Tokyo");\nconsole.log(tokyo.hour); // 3 (next day)\n\nconst istanbul = meeting.withTimeZone("Europe/Istanbul");\nconsole.log(istanbul.hour); // 21 (same day, 21:00)\n\n// Get UTC equivalent\nconst utc = meeting.toInstant();\nconsole.log(utc.epochMilliseconds); // Unix timestamp\n\n// Compare times across timezones\nconst nyMeeting = Temporal.ZonedDateTime.from(\n  "2024-06-15T14:00:00[America/New_York]"\n);\nconst londonMeeting = Temporal.ZonedDateTime.from(\n  "2024-06-15T19:00:00[Europe/London]"\n);\n\nconsole.log(nyMeeting.equals(londonMeeting)); // true — same instant!\n\n// DST transitions are handled automatically\nconst beforeDST = Temporal.ZonedDateTime.from(\n  "2024-03-09T01:30:00[America/New_York]"\n);\nconst afterDST = beforeDST.plus({ hours: 1 });\nconsole.log(afterDST.hour); // 3 — spring forward (2:30 skipped)\n```\n\n**Common Pitfalls:**\n```javascript\n// Assuming fixed offset = timezone\nconst offset = "+05:30"; // This is an offset, not a timezone!\n// Fix: Use named timezones (Asia/Kolkata)\n\n// Not handling DST\nconst date1 = Temporal.PlainDate.from("2024-03-10");\nconst date2 = date1.plus({ days: 1 });\n// Both are correct — PlainDate has no timezone info\n// Use ZonedDateTime for timezone-aware arithmetic\n```\n\n**Best Practices:**\n- Use named timezones (America/New_York) not offsets\n- Store timestamps in UTC, display in local timezone\n- Test with DST transition dates\n- Use .toInstant() for server communication\n\n**Key Takeaways:**\n1. ZonedDateTime provides first-class timezone support\n2. Use named timezones, not fixed offsets\n3. DST transitions are handled automatically' },
      { id: 'date-arithmetic', title: 'Date Arithmetic', content: '**What is Temporal Date Arithmetic?\n\nTemporal provides safe, predictable date arithmetic through .plus(), .minus(), and Duration. Unlike Date arithmetic, Temporal never overflows or produces invalid dates.\n\n**Why Date Arithmetic Matters:**\n- Add/subtract months, days, hours safely\n- No more "January 32" bugs\n- Calculate durations between dates\n- Safe timezone arithmetic\n\n**How It Works (Step-by-Step):**\n1. Use .plus() to add a duration\n2. Use .minus() to subtract a duration\n3. Use .until() or .since() to get duration between dates\n4. Duration is always normalized (12 months = 1 year)\n\n**Code Example:**\n```javascript\n// Safe month arithmetic\nconst jan31 = Temporal.PlainDate.from("2024-01-31");\nconst feb29 = jan31.add({ months: 1 }); // 2024-02-29 (leap year)\nconst mar29 = feb29.add({ months: 1 }); // 2024-03-29 (clamps)\nconsole.log(mar29.toString()); // "2024-03-29"\n\n// Calculate duration between dates\nconst start = Temporal.PlainDate.from("2024-01-01");\nconst end = Temporal.PlainDate.from("2024-12-31");\nconst duration = start.until(end);\nconsole.log(duration.days); // 365\nconsole.log(duration.months); // 11\nconsole.log(duration.years); // 0\n\n// Duration arithmetic\nconst twoHours = Temporal.Duration.from({ hours: 2 });\nconst thirtyMinutes = Temporal.Duration.from({ minutes: 30 });\nconst combined = twoHours.add(thirtyMinutes);\nconsole.log(combined.toString()); // "PT2H30M"\n\n// ZonedDateTime arithmetic with DST\nconst spring = Temporal.ZonedDateTime.from(\n  "2024-03-09T12:00:00[America/New_York]"\n);\nconst nextDay = spring.add({ days: 1 });\nconsole.log(nextDay.hour); // 12 — same local time, different instant\n```\n\n**Common Pitfalls:**\n```javascript\n// Date object arithmetic is unreliable\nconst d = new Date(2024, 0, 31);\nd.setMonth(d.getMonth() + 1); // March 2 — not Feb 29!\n// Fix: Use Temporal\nconst temp = Temporal.PlainDate.from("2024-01-31");\ntemp.add({ months: 1 }); // Feb 29 — correct!\n\n// Duration normalization\nconst long = Temporal.Duration.from({ hours: 25 });\nconsole.log(long.hours); // 25\nconst normalized = long.round({ relativeTo: Temporal.PlainDate.from("2024-01-01") });\nconsole.log(normalized.hours); // 1\nconsole.log(normalized.days); // 1\n```\n\n**Best Practices:**\n- Always use .plus() and .minus() for date math\n- Use .until() and .since() for durations\n- Normalize durations before display\n- Test arithmetic across DST transitions\n\n**Key Takeaways:**\n1. Temporal arithmetic never produces invalid dates\n2. .plus() and .minus() return new objects\n3. Duration is normalized for display' }
    ]
  },
  {
    id: 128, slug: 'js-iterator-helpers', title: 'Iterator Helpers & Async Iteration',
    description: 'Master iterator helpers, async iterators, and for await...of patterns.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use Iterator helpers for lazy processing', 'Implement async iterators', 'Master for await...of patterns', 'Build custom iterable objects'],
    quiz: [
      {
        id: 1,
        question: 'What is the benefit of Iterator.prototype.map() over Array.map()?',
        options: ['It is always faster', 'It is lazy — values are computed on demand, not eagerly', 'It returns a plain array', 'It works with async functions'],
        correctIndex: 1,
        explanation: 'Iterator.prototype.map() returns a new iterator that lazily applies the function. Values are computed only when consumed (e.g., with .next()), avoiding unnecessary work.'
      },
      {
        id: 2,
        question: 'What does "for await...of" iterate over?',
        options: ['Only arrays', 'Synchronous iterables only', 'Async iterables (objects implementing Symbol.asyncIterator)', 'Plain objects'],
        correctIndex: 2,
        explanation: 'for await...of iterates over async iterables — objects that implement Symbol.asyncIterator and return promises from their next() method.'
      },
      {
        id: 3,
        question: 'How do you create an async generator function?',
        options: ['function* gen() {}', 'async function gen() {}', 'async function* gen() {}', 'generator async gen() {}'],
        correctIndex: 2,
        explanation: 'Async generators combine async functions and generators: async function* gen(). They yield promises and are consumed with for await...of.'
      }
    ],
    topics: [
      { id: 'iterator-helpers', title: 'Iterator Helpers', content: '**What are Iterator Helpers?\n\nIterator.prototype provides built-in methods (map, filter, take, drop, forEach, some, every, reduce, toArray, flatMap, constructor) for working with iterators lazily. They apply operations on demand without creating intermediate arrays.\n\n**Why Iterator Helpers Matter:**\n- Lazy evaluation — compute only what you consume\n- Chainable — build complex pipelines\n- Memory efficient — no intermediate arrays\n- Composable — combine with generators and async\n\n**How They Work (Step-by-Step):**\n1. Get an iterator from any iterable\n2. Chain .map(), .filter(), .take() etc.\n3. Consume with .next(), .toArray(), or for...of\n4. Each operation is applied lazily per item\n\n**Code Example:**\n```javascript\n// Iterator helpers are lazy\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Lazy pipeline — nothing runs until consumed\nconst result = numbers.values()\n  .filter(n => n % 2 === 0)    // Only even numbers\n  .map(n => n * n)              // Square them\n  .take(3);                     // Take first 3\n\nconsole.log([...result]); // [4, 16, 36]\n\n// With generators — infinite sequences\nfunction* naturals() {\n  let n = 1;\n  while (true) yield n++;\n}\n\nconst pipeline = naturals()\n  .filter(n => n % 3 === 0)  // Multiples of 3\n  .map(n => n * 2)            // Double them\n  .take(5);                   // Take 5\n\nconsole.log([...pipeline]); // [6, 12, 18, 24, 30]\n\n// .drop() — skip first N items\nconst skipped = [1, 2, 3, 4, 5].values().drop(2).toArray();\nconsole.log(skipped); // [3, 4, 5]\n\n// .flatMap() — flatten and map\nconst nested = [[1, 2], [3, 4], [5]].values();\nconst flat = nested.flatMap(arr => arr.values()).toArray();\nconsole.log(flat); // [1, 2, 3, 4, 5]\n```\n\n**Common Pitfalls:**\n```javascript\n// Consuming twice — iterators are exhausted\nconst iter = [1, 2, 3].values();\nconsole.log([...iter]); // [1, 2, 3]\nconsole.log([...iter]); // [] — already consumed!\n\n// Not knowing helpers are lazy\nconst lazy = [1, 2, 3].values().map(x => {\n  console.log("mapping", x);\n  return x * 2;\n});\n// Nothing logged yet!\n[...lazy]; // Now it logs: mapping 1, mapping 2, mapping 3\n```\n\n**Best Practices:**\n- Use .toArray() to materialize results when needed\n- Use .take() to limit infinite iterators\n- Chain helpers for clean, readable pipelines\n- Use generators for custom iterator creation\n\n**Key Takeaways:**\n1. Iterator helpers are lazy — compute on demand\n2. Chain .map(), .filter(), .take() for pipelines\n3. Use .toArray() to materialize results' },
      { id: 'async-iteration', title: 'Async Iteration', content: '**What is Async Iteration?\n\nAsync iteration allows you to iterate over data that arrives asynchronously (streams, APIs, WebSockets). The for await...of loop and AsyncIterator protocol make this seamless.\n\n**Why Async Iteration Matters:**\n- Process streaming data naturally\n- Read files, network responses, and real-time data\n- Combine with async/await for clean code\n- Handle backpressure automatically\n\n**How It Works (Step-by-Step):**\n1. Object implements Symbol.asyncIterator returning { next() returning Promise<{value, done}> }\n2. for await...of consumes the async iterable\n3. Each iteration awaits the next value\n4. Errors are caught with try/catch\n\n**Code Example:**\n```javascript\n// Async generator function\nasync function* fetchPages(url) {\n  let page = 1;\n  while (true) {\n    const response = await fetch(`${url}?page=${page}`);\n    const data = await response.json();\n    if (data.length === 0) break;\n    yield data;\n    page++;\n  }\n}\n\n// Consume with for await...of\nfor await (const page of fetchPages("https://api.example.com/items")) {\n  processItems(page);\n}\n\n// Async iterable from async iterator\nconst asyncIterable = {\n  [Symbol.asyncIterator]() {\n    let n = 0;\n    return {\n      async next() {\n        await delay(100);\n        return { value: ++n, done: n > 5 };\n      }\n    };\n  }\n};\n\nfor await (const num of asyncIterable) {\n  console.log(num); // 1, 2, 3, 4, 5 (with 100ms delay each)\n}\n```\n\n**Common Pitfalls:**\n```javascript\n// Mixing sync and async iterables\nfor await (const item of [1, 2, 3]) { // Works but unnecessary\n  console.log(item);\n}\n// Fix: Use for...of for sync iterables\n\n// Not handling errors\nfor await (const item of asyncIterable) {\n  // What if item fetching fails?\n}\n// Fix: Wrap in try/catch\nfor await (const item of asyncIterable) {\n  try {\n    process(item);\n  } catch (error) {\n    console.error("Processing failed:", error);\n  }\n}\n```\n\n**Best Practices:**\n- Use async generators for streaming data\n- Always handle errors in for await...of\n- Use .return() for cleanup in async generators\n- Combine with AbortController for cancellation\n\n**Key Takeaways:**\n1. for await...of iterates over async iterables\n2. Async generators yield promises\n3. Use try/catch for error handling in async iteration' },
      { id: 'custom-iterables', title: 'Custom Iterable Objects', content: '**What are Custom Iterable Objects?\n\nCustom iterables let you define how your objects are iterated by for...of, spread, destructuring, and Iterator helpers. Implement Symbol.iterator for synchronous and Symbol.asyncIterator for asynchronous iteration.\n\n**Why Custom Iterables Matter:**\n- Create domain-specific iteration patterns\n- Enable natural for...of syntax on custom classes\n- Build lazy data pipelines\n- Integrate with Iterator helpers\n\n**How They Work (Step-by-Step):**\n1. Implement [Symbol.iterator] returning an iterator\n2. Iterator has next() returning { value, done }\n3. Use generators for simpler implementation\n4. Chain with Iterator helpers for powerful pipelines\n\n**Code Example:**\n```javascript\n// Custom iterable class\nclass Range {\n  constructor(start, end) {\n    this.start = start;\n    this.end = end;\n  }\n\n  [Symbol.iterator]() {\n    let current = this.start;\n    const end = this.end;\n    return {\n      next() {\n        return current <= end\n          ? { value: current++, done: false }\n          : { done: true };\n      }\n    };\n  }\n}\n\n// Use with for...of\nfor (const num of new Range(1, 5)) {\n  console.log(num); // 1, 2, 3, 4, 5\n}\n\n// Use with spread\nconst arr = [...new Range(1, 5)]; // [1, 2, 3, 4, 5]\n\n// Use with Iterator helpers\nconst result = new Range(1, 10)\n  .filter(n => n % 2 === 0)  // [2, 4, 6, 8, 10]\n  .map(n => n * n)           // [4, 16, 36, 64, 100]\n  .take(3)                   // [4, 16, 36]\n  .toArray();\n\n// Generator-based iterable\nclass Fibonacci {\n  *[Symbol.iterator]() {\n    let a = 0, b = 1;\n    while (true) {\n      yield a;\n      [a, b] = [b, a + b];\n    }\n  }\n}\n\nconst fib = [...new Fibonacci()]; // Infinity! Use .take()\nconst first10 = new Fibonacci().take(10).toArray();\n```\n\n**Common Pitfalls:**\n```javascript\n// Forgetting to return iterator\n[Symbol.iterator]() {\n  // Missing return!\n}\n// Fix: Always return { next() {...} }\n\n// Not handling done correctly\nnext() {\n  return { value: this.current }; // Missing done!\n}\n// Fix: Always include done property\n\n// Mutating state in iterator\n[Symbol.iterator]() {\n  let current = 0;\n  return {\n    next() {\n      return { value: current++, done: current > 10 };\n    }\n  };\n}\n// Works but generator syntax is cleaner\n```\n\n**Best Practices:**\n- Use generators ([Symbol.iterator]*) for simpler syntax\n- Implement both sync and async iterators when needed\n- Combine with Iterator helpers for powerful pipelines\n- Make iterables reusable (return new iterator each time)\n\n**Key Takeaways:**\n1. Implement [Symbol.iterator] to make objects iterable\n2. Use generators for cleaner iterator syntax\n3. Combine with Iterator helpers for lazy pipelines' }
    ]
  }
];

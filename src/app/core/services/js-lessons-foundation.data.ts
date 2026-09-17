import { Lesson } from '../models/lesson.model';

export const JAVASCRIPT_LESSONS: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // JAVASCRIPT FOUNDATION (101-105)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 101, slug: 'js-introduction', title: 'JavaScript Fundamentals',
    description: 'Master the core building blocks of JavaScript.',
    level: 'beginner', duration: '30 min',
    objectives: ['Understand variables', 'Master data types', 'Learn operators', 'Use type coercion'],
    topics: [
      { id: 'variables', title: 'Variables (var, let, const)', content: `**What are Variables?**

Variables are named containers that store data values. In JavaScript, you declare variables using three keywords: \`var\`, \`let\`, and \`const\`. Each has different scoping, hoisting, and reassignment rules.

**Why Variables Matter:**
- Store and retrieve data during program execution
- Control the lifecycle and visibility of values
- Enable code reuse and dynamic behavior
- Understanding scoping prevents common bugs

**Step-by-Step Guide:**
1. **\`var\`** — Function-scoped, hoisted, can be redeclared
2. **\`let\`** — Block-scoped, not hoisted, can be reassigned
3. **\`const\`** — Block-scoped, not hoisted, cannot be reassigned

**Code Example:**
\`\`\`javascript
var x = 10; // Function scoped
let y = 20; // Block scoped
const z = 30; // Cannot reassign

if (true) {
  var a = 1; // Visible outside the block
  let b = 2; // Not visible outside
  const c = 3; // Not visible outside
}
console.log(a); // 1
console.log(b); // ReferenceError
\`\`\`

**Common Mistakes:**
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 — var leaks out of the block
// Fix: Use let for block scoping
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
\`\`\`

**Best Practices:**
- Use \`const\` by default for all declarations
- Switch to \`let\` only when reassignment is necessary
- Avoid \`var\` entirely — it leads to unpredictable scoping
- Declare variables at the top of their scope for clarity

**Key Takeaways:**
1. \`const\` prevents reassignment, \`let\` allows it, \`var\` is function-scoped and should be avoided
2. Block scoping prevents variable leakage outside loops and conditionals
3. Always prefer \`const\` by default — it signals intent and prevents accidental mutation` },
      { id: 'datatypes', title: 'Data Types', content: `**What are Data Types?**

Data types define the kind of value a variable holds. JavaScript is dynamically typed, meaning variables can hold any type without explicit type declarations.

**Why Data Types Matter:**
- Different types behave differently with operators
- Type errors are a common source of bugs
- Proper type handling improves code reliability
- Understanding types is critical for debugging and TypeScript adoption

**Primitive Types (7 Total):**
- \`string\`: Textual data — \`"hello"\`, \`'world'\`
- \`number\`: Integers and floats — \`42\`, \`3.14\`, \`NaN\`
- \`boolean\`: Logical values — \`true\`, \`false\`
- \`undefined\`: Declared but not assigned
- \`null\`: Intentional absence of a value
- \`symbol\`: Unique, immutable identifier
- \`bigint\`: Arbitrary-precision integers

**Reference Types:**
- \`object\`: Key-value pairs — \`{ name: "John", age: 30 }\`
- \`array\`: Ordered collection — \`[1, 2, 3]\`
- \`function\`: Callable code block

**Code Example:**
\`\`\`javascript
const name = "John";       // string
const age = 30;            // number
const isStudent = false;   // boolean
let score;                 // undefined
const empty = null;        // null

typeof name;    // "string"
typeof null;    // "object" (known JS bug)
Array.isArray([1, 2, 3]); // true
\`\`\`

**Common Mistakes:**
\`\`\`javascript
let a = null;
let b;
console.log(a == b);  // true (loose equality)
console.log(a === b); // false (strict equality)
typeof null; // "object" (historical bug)
\`\`\`

**Best Practices:**
- Use \`typeof\` to check primitive types
- Prefer \`===\` to avoid type coercion surprises
- Use \`Array.isArray()\` to check for arrays
- Use \`null\` intentionally to represent "no value"

**Key Takeaways:**
1. JavaScript has 7 primitive types and 3 reference types
2. \`typeof null\` returns \`"object"\` — a well-known bug
3. Always use strict equality (\`===\`) to avoid unexpected type coercion` },
      { id: 'operators', title: 'Operators', content: `**What are Operators?**

Operators perform operations on values. Understanding how each works — especially equality and nullish coalescing — is critical for writing correct code.

**Why Operators Matter:**
- Control program flow through comparisons
- Transform and combine data values
- Modern operators reduce boilerplate and improve readability
- Choosing the wrong operator is a frequent source of bugs

**Code Example:**
\`\`\`javascript
// Loose vs Strict Equality
5 == "5"   // true  (type coercion)
5 === "5"  // false (no coercion)

// Nullish Coalescing (??)
const value = null ?? "default";    // "default"
const count = 0 ?? 10;              // 0 (preserves falsy values)

// Optional Chaining (?.)
const user = { address: { city: "NYC" } };
const city = user?.address?.city;   // "NYC"
const zip = user?.address?.zip;     // undefined
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const timeout = 0 || 5000; // 5000 — 0 is falsy!
const timeout2 = 0 ?? 5000; // 0 — correct

if (x = 5) { }  // Assignment, always truthy!
if (x == 5) { } // Type coercion
if (x === 5) { } // Strict — safe
\`\`\`

**Best Practices:**
- Always use \`===\` and \`!==\` instead of \`==\`/\`!=\`
- Use \`??\` when 0, empty string, or false are valid values
- Use \`?.\` to safely access nested properties

**Key Takeaways:**
1. Always prefer strict equality (\`===\`)
2. Use \`??\` over \`||\` when 0 or empty string are valid defaults
3. Optional chaining (\`?.\`) eliminates verbose null checks` },
      { id: 'type-coercion', title: 'Type Coercion', content: `**What is Type Coercion?**

Type coercion is JavaScript's automatic conversion of values from one data type to another. Understanding coercion is essential for avoiding subtle, hard-to-debug errors.

**Why Type Coercion Matters:**
- Implicit coercion causes unexpected behavior in comparisons
- The \`+\` operator concatenates strings OR adds numbers
- Mastering coercion helps you write safer code

**Code Example:**
\`\`\`javascript
// Implicit Coercion
"5" + 3      // "53"  (number -> string)
"5" - 3      // 2     (string -> number)
true + 1     // 2     (true -> 1)

// Explicit Coercion
Number("5")      // 5
String(5)        // "5"
Boolean(0)       // false
Boolean("hello") // true
\`\`\`

**Common Mistakes:**
\`\`\`javascript
if (value == "0") { }
// true for: 0, "", null, undefined — not just "0"

"5" + 3   // "53" (string)
"5" - 3   // 2 (number)
\`\`\`

**Best Practices:**
- Always use \`===\` and \`!==\` to avoid implicit coercion
- Use explicit conversion: \`Number(value)\` not \`+value\`
- Check for \`NaN\` with \`Number.isNaN()\` not \`isNaN()\`

**Key Takeaways:**
1. The \`+\` operator concatenates when either operand is a string
2. Always use strict equality (\`===\`) to prevent coercion bugs
3. Use explicit conversion to make your intent clear` }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which keyword creates a block-scoped variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'define'],
        correctIndex: 2,
        explanation: 'const creates a block-scoped variable that cannot be reassigned after initialization.'
      },
      {
        id: 2,
        question: 'What is the result of `5 == "5"` in JavaScript?',
        options: ['false', 'true', 'TypeError', 'undefined'],
        correctIndex: 1,
        explanation: 'The loose equality operator (==) performs type coercion, converting the string "5" to a number before comparing, resulting in true.'
      },
      {
        id: 3,
        question: 'What is the result of `"5" + 3`?',
        options: ['8', '"53"', 'NaN', 'TypeError'],
        correctIndex: 1,
        explanation: 'When using the + operator with a string and a number, JavaScript performs implicit coercion and concatenates them, resulting in the string "53".'
      }
    ]
  },
  {
    id: 102, slug: 'js-functions', title: 'Functions & Scope',
    description: 'Master functions, scope, closures, and higher-order functions.',
    level: 'beginner', duration: '35 min',
    objectives: ['Create functions', 'Understand scope', 'Master closures', 'Use higher-order functions'],
    topics: [
      { id: 'function-types', title: 'Function Types', content: `**What are Functions?**

Functions are reusable blocks of code that perform a specific task. They are first-class citizens in JavaScript — assignable to variables, passable as arguments, and returnable from other functions.

**Why Functions Matter:**
- Enable code reuse and the DRY principle
- Create abstractions that simplify complex logic
- Form the foundation of functional programming
- Angular components and services rely heavily on functions

**Step-by-Step Guide:**
1. **Function Declaration:** Hoisted, named, traditional syntax
2. **Function Expression:** Assigned to a variable, not hoisted
3. **Arrow Function:** Concise syntax, lexically binds \`this\`

**Code Example:**
\`\`\`javascript
// Function Declaration — hoisted
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function Expression — not hoisted
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow Function — concise, lexically binds 'this'
const greet = (name) => \`Hello, \${name}!\`;
const square = x => x * x;
const add = (a, b) => a + b;
const getUser = () => ({ name: "John" }); // Return object literal
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Arrow function 'this' is lexical
const person = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined — 'this' is NOT the object
  }
};
// Fix: Use regular method syntax
const person = {
  name: "John",
  greet() { console.log(this.name); } // "John"
};

// Forgetting to return from arrow functions
const double = x => x * 2;       // Correct
const double = x => { x * 2 };   // Returns undefined!
\`\`\`

**Best Practices:**
- Use arrow functions for callbacks and short expressions
- Use function declarations for named, reusable functions
- Avoid arrow functions for object methods that need \`this\`
- Keep functions small and focused — one responsibility per function

**Key Takeaways:**
1. Arrow functions inherit \`this\` from enclosing scope — don't use as object methods
2. Function declarations are hoisted; expressions and arrow functions are not
3. Arrow functions cannot be used as constructors` },
      { id: 'scope', title: 'Scope', content: `**What is Scope?**

Scope determines where variables are accessible. JavaScript has three types: global, function, and block scope. Understanding scope is essential for debugging and writing clean code.

**Why Scope Matters:**
- Prevents naming conflicts between different parts of your code
- Controls variable lifecycle and memory usage
- Block scoping (\`let\`/\`const\`) prevents common loop bugs
- Understanding scope is critical for closures and \`this\` behavior

**Code Example:**
\`\`\`javascript
// Global Scope
const global = "I'm global";

// Function Scope
function test() {
  const local = "I'm local";
}
// console.log(local); // ReferenceError

// Block Scope
if (true) {
  let block = "I'm block scoped";
  var notBlock = "I'm function scoped";
}
console.log(notBlock); // Works — var ignores block boundaries
// console.log(block); // ReferenceError

// Common scope issue in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 — var leaks out of the loop block

// Fix with let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Using var in for loops
for (var i = 0; i < 3; i++) {
  arr.push(() => i);
}
arr[0](); // 3, not 0 — all closures share the same 'i'

// Shadowing confusion
const x = 10;
function test() {
  const x = 20; // Shadows outer x
}
\`\`\`

**Best Practices:**
- Use \`const\` by default, \`let\` when reassignment is needed
- Never use \`var\` — it ignores block boundaries
- Declare variables as close to their usage as possible

**Key Takeaways:**
1. \`var\` is function-scoped; \`let\`/\`const\` are block-scoped
2. Block scoping prevents variable leakage in loops
3. The classic loop bug (var + setTimeout) is solved by using \`let\`` },
      { id: 'closures', title: 'Closures', content: `**What is a Closure?**

A closure is a function that retains access to variables from its outer function's scope, even after the outer function has returned. This is one of the most powerful features in JavaScript.

**Why Closures Matter:**
- Enable data privacy and encapsulation without classes
- Create function factories and decorators
- Implement memoization and caching
- Power event handlers, callbacks, and partial application

**How Closures Work:**
1. A function is defined inside another function
2. The inner function references variables from the outer function
3. The outer function returns the inner function
4. The inner function "closes over" the outer variables

**Code Example:**
\`\`\`javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count is private — cannot be accessed directly

// Function factory
function multiplier(factor) {
  return (number) => number * factor;
}
const double = multiplier(2);
console.log(double(5));  // 10
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Closures in loops with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (not 0, 1, 2)
// Fix: Use let for block scoping
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
\`\`\`

**Best Practices:**
- Use closures for data privacy, not global variables
- Be mindful of memory — closures keep references alive
- Prefer \`const\` for function closures that don't reassign

**Key Takeaways:**
1. Closures give functions memory of their creation scope
2. They enable private state and encapsulation without classes
3. Watch out for closure pitfalls in loops — always use \`let\`` },
      { id: 'higher-order', title: 'Higher-Order Functions', content: `**What are Higher-Order Functions?**

A higher-order function takes a function as an argument or returns a function as its result. They are a cornerstone of functional programming.

**Why Higher-Order Functions Matter:**
- Enable code abstraction — separate "what" from "how"
- Make code more declarative and readable
- Power array methods like map, filter, reduce
- Angular's RxJS operators are built on this concept

**Code Example:**
\`\`\`javascript
// Function that takes a function
function repeat(n, action) {
  for (let i = 0; i < n; i++) { action(i); }
}
repeat(3, i => console.log(\`Iteration \${i}\`));

// Function that returns a function (factory)
function multiplier(factor) {
  return (number) => number * factor;
}
const double = multiplier(2);
console.log(double(5)); // 10

// Array Methods
const numbers = [1, 2, 3, 4, 5];
numbers.map(n => n * 2);          // [2, 4, 6, 8, 10]
numbers.filter(n => n > 3);       // [4, 5]
numbers.reduce((a, b) => a + b, 0); // 15
numbers.find(n => n > 3);         // 4
numbers.every(n => n > 0);        // true
numbers.some(n => n > 3);         // true
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const doubled = numbers.forEach(n => n * 2); // undefined!
// Fix: Use map instead
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

const result = numbers.map(n => { n * 2 }); // [undefined, ...]
// Fix: Use expression body
const result = numbers.map(n => n * 2);
\`\`\`

**Best Practices:**
- Prefer \`map\`/\`filter\`/\`reduce\` over imperative loops
- Keep callbacks pure — no side effects
- Use \`find\` for single lookups, \`filter\` for multiple

**Key Takeaways:**
1. Higher-order functions take or return other functions
2. \`map\`, \`filter\`, and \`reduce\` are the most commonly used
3. Prefer declarative array methods over imperative loops` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a closure in JavaScript?',
        options: ['A function that has no arguments', 'A function that remembers its outer scope', 'A function that returns undefined', 'A function that is immediately invoked'],
        correctIndex: 1,
        explanation: 'A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has returned.'
      },
      {
        id: 2,
        question: 'What does the following code output?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```',
        options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', 'ReferenceError'],
        correctIndex: 1,
        explanation: 'var is function-scoped, so all closures share the same i variable. By the time setTimeout callbacks run, the loop has finished and i is 3.'
      },
      {
        id: 3,
        question: 'Which array method transforms each element and returns a new array?',
        options: ['forEach', 'filter', 'map', 'reduce'],
        correctIndex: 2,
        explanation: 'map() creates a new array by applying a function to each element of the original array.'
      }
    ]
  },
  {
    id: 103, slug: 'js-objects-arrays', title: 'Objects & Arrays',
    description: 'Master objects, arrays, destructuring, and spread/rest.',
    level: 'beginner', duration: '35 min',
    objectives: ['Work with objects', 'Master arrays', 'Use destructuring', 'Apply spread/rest'],
    topics: [
      { id: 'objects', title: 'Objects', content: `**What are Objects?**

Objects are collections of key-value pairs. They are the fundamental building blocks for structuring data in JavaScript.

**Why Objects Matter:**
- Represent real-world entities and complex data structures
- Foundation of JavaScript's object-oriented patterns
- Used everywhere — API responses, configuration, component state
- Angular components, services, and models rely on objects

**Code Example:**
\`\`\`javascript
// Creating Objects
const person = {
  name: "John",
  age: 30,
  greet() { return \`Hello, \${this.name}!\`; }
};

// Shorthand properties
const name = "John";
const person = { name, age: 30 };

// Computed properties
const key = "name";
const person = { [key]: "John" };

// Object Methods
Object.keys(person);     // ["name", "age"]
Object.values(person);   // ["John", 30]
Object.entries(person);  // [["name", "John"], ["age", 30]]
Object.freeze(person);   // Make immutable
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const user = { name: "John" };
console.log(user.age);      // undefined — no error
console.log(user.address.city); // TypeError
// Fix: Use optional chaining
console.log(user?.address?.city); // undefined

// Comparing objects by reference
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false — different references
\`\`\`

**Best Practices:**
- Use object destructuring to extract properties
- Prefer \`Object.freeze()\` for immutable configuration
- Use computed property names when keys are dynamic

**Key Takeaways:**
1. Objects store data as key-value pairs and are passed by reference
2. Use \`Object.keys()\`, \`Object.values()\`, \`Object.entries()\` to iterate
3. Optional chaining (\`?.\`) prevents TypeError on nested properties` },
      { id: 'arrays', title: 'Arrays', content: `**What are Arrays?**

Arrays are ordered collections of values, indexed starting from 0. They provide powerful methods for transformation, filtering, and aggregation.

**Why Arrays Matter:**
- Store and manage collections of data
- Enable functional programming patterns (map, filter, reduce)
- Used extensively in Angular for lists, forms, and data processing

**Code Example:**
\`\`\`javascript
const arr = [1, 2, 3, 4, 5];

// Mutating methods (avoid when possible)
arr.push(6);      // Add to end
arr.pop();        // Remove from end
arr.splice(1, 2); // Remove at index

// Non-mutating methods (prefer these)
arr.concat([6]);           // Merge arrays
arr.slice(1, 3);           // Extract section
arr.includes(3);           // Check existence
arr.flat();                // Flatten nested

// Chaining methods
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const result = numbers
  .filter(n => n > 3)
  .sort((a, b) => a - b)
  .map(n => n * 2);
// [8, 10, 12, 18]
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const original = [1, 2, 3];
const sorted = original.sort((a, b) => b - a);
console.log(original); // [3, 2, 1] — mutated!
// Fix: Copy first
const sorted = [...original].sort((a, b) => b - a);

typeof [1, 2, 3]; // "object" — not "array"
// Fix: Use Array.isArray()
Array.isArray([1, 2, 3]); // true
\`\`\`

**Best Practices:**
- Prefer non-mutating methods over mutating ones
- Use \`Array.isArray()\` to check for arrays
- Be aware that \`sort()\` mutates — use spread first

**Key Takeaways:**
1. Prefer non-mutating array methods to avoid side effects
2. \`sort()\` mutates the original array — always copy first
3. Use \`Array.isArray()\` to check for arrays, not \`typeof\`` },
      { id: 'destructuring', title: 'Destructuring', content: `**What is Destructuring?**

Destructuring extracts values from arrays or objects into distinct variables. It makes code more concise and readable.

**Why Destructuring Matters:**
- Eliminates verbose property access
- Enables clean function parameter defaults
- Essential for working with API responses and Angular components

**Code Example:**
\`\`\`javascript
// Object Destructuring
const person = { name: "John", age: 30, city: "NYC" };
const { name, age } = person;
const { name: userName } = person;      // Rename
const { country = "US" } = person;      // Default

// Array Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3, 4, 5]

// Function parameter destructuring
function createUser({ name, age, role = "user" }) {
  return { name, age, role };
}
const user = createUser({ name: "John", age: 30 });
// { name: "John", age: 30, role: "user" }
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const { email } = user; // undefined — may cause issues
// Fix: Always provide defaults
const { email = "N/A" } = user;

// Over-nesting destructuring
const { a: { b: { c: { d } } } } = obj; // Hard to read
\`\`\`

**Best Practices:**
- Always provide default values for optional properties
- Use renaming to avoid naming conflicts
- Don't over-nest destructuring — keep it readable

**Key Takeaways:**
1. Destructuring extracts values into variables cleanly
2. Use default values for optional properties
3. Don't over-nest — readability matters more than brevity` },
      { id: 'spread-rest', title: 'Spread & Rest', content: `**What are Spread and Rest Operators?**

The spread operator (\`...\`) expands an iterable into individual elements, while the rest operator collects multiple elements into a single array or object.

**Why Spread/Rest Matter:**
- Enable immutable data patterns (copying, merging, updating)
- Provide clean syntax for variadic functions
- Essential for immutable state management in Angular/React

**Code Example:**
\`\`\`javascript
// Spread in Arrays
const arr2 = [...arr1, 4, 5];     // [1, 2, 3, 4, 5]

// Spread in Objects
const obj2 = { ...obj1, c: 3 };   // { a: 1, b: 2, c: 3 }

// Rest in Function Parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

// Rest in Destructuring
const { name, ...rest } = { name: "John", age: 30, city: "NYC" };
// rest = { age: 30, city: "NYC" }
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Shallow copy — nested objects are still references
const original = { a: 1, b: { c: 2 } };
const clone = { ...original };
clone.b.c = 3;
console.log(original.b.c); // 3 — original affected!
// Fix: Use structuredClone()
const deep = structuredClone(original);
\`\`\`

**Best Practices:**
- Use spread for shallow copies and merging
- Use \`structuredClone()\` for deep cloning
- Use rest parameters for variadic functions

**Key Takeaways:**
1. Spread expands iterables; rest collects into arrays
2. Spread creates shallow copies — nested objects still referenced
3. Use \`structuredClone()\` for deep cloning` }
    ],
    quiz: [
      {
        id: 1,
        question: 'Which method returns an array of an object\'s values?',
        options: ['Object.keys()', 'Object.values()', 'Object.entries()', 'Object.assign()'],
        correctIndex: 1,
        explanation: 'Object.values() returns an array of a given object\'s own enumerable property values.'
      },
      {
        id: 2,
        question: 'What does array destructuring `const [a, , c] = [1, 2, 3]` assign to `c`?',
        options: ['2', '3', '[3]', 'undefined'],
        correctIndex: 1,
        explanation: 'Skipping an element with a comma in array destructuring means `a` gets 1, the second element is skipped, and `c` gets 3.'
      },
      {
        id: 3,
        question: 'What is the result of `[...[1,2], ...[3,4]]`?',
        options: ['[[1,2],[3,4]]', '[1,2,3,4]', '[1,2,[3,4]]', 'Error'],
        correctIndex: 1,
        explanation: 'The spread operator flattens each array into individual elements, combining them into a single array [1,2,3,4].'
      }
    ]
  },
  {
    id: 104, slug: 'js-async', title: 'Asynchronous JavaScript',
    description: 'Master async/await, promises, and event loop.',
    level: 'beginner', duration: '40 min',
    objectives: ['Understand callbacks', 'Master promises', 'Use async/await', 'Learn event loop'],
    topics: [
      { id: 'callbacks', title: 'Callbacks', content: `**What are Callbacks?**

A callback is a function passed as an argument to another function, to be executed later. Callbacks were the original pattern for async code in JavaScript.

**Why Callbacks Matter:**
- Foundation for understanding Promises and async/await
- Still used in event handlers, timers, and Node.js APIs
- Understanding callbacks helps you avoid callback hell

**Code Example:**
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback({ data: "Hello" });
  }, 1000);
}
fetchData((result) => {
  console.log(result.data); // "Hello"
});

// Callback Hell
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c); // Deeply nested
    });
  });
});
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Fix callback hell with Promises/async
const a = await getData();
const b = await getMoreData(a);
const c = await getEvenMoreData(b);

// Forgetting error handling
fetchData((result) => {
  // No error parameter!
});
// Fix: Always handle errors
fetchData((error, result) => {
  if (error) { handleError(error); return; }
});
\`\`\`

**Best Practices:**
- Prefer Promises and async/await over raw callbacks
- Always handle errors in callbacks
- Limit callback nesting to 1-2 levels

**Key Takeaways:**
1. Callbacks are functions passed for deferred execution
2. Callback hell is hard to maintain — use Promises/async instead
3. Always handle errors in callbacks` },
      { id: 'promises', title: 'Promises', content: `**What is a Promise?**

A Promise is an object representing the eventual completion or failure of an async operation. It provides cleaner alternatives to callbacks.

**Why Promises Matter:**
- Eliminate callback hell with flat chaining
- Centralized error handling with \`.catch()\`
- Enable parallel execution with \`Promise.all()\`
- Foundation for async/await syntax

**Code Example:**
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Done!");
  else reject("Failed!");
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Always runs"));

// Promise.all — wait for all
const [users, posts] = await Promise.all([
  fetchUsers(), fetchPosts()
]);

// Promise.allSettled — wait for all, handle both
const results = await Promise.allSettled([p1, p2, p3]);
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Not returning from .then()
fetchData()
  .then(data => { processData(data); }) // Missing return!
  .then(result => { /* result is undefined! */ });

// Fix: Always return
fetchData()
  .then(data => processData(data))
  .then(result => saveData(result));

// Swallowing errors
fetchData()
  .then(data => processData(data))
  // No .catch()!
\`\`\`

**Best Practices:**
- Always return from \`.then()\`
- Always add \`.catch()\`
- Use \`Promise.allSettled()\` for resilient parallel
- Prefer async/await over raw .then() chains

**Key Takeaways:**
1. Promises represent future values — chain with \`.then()\` and \`.catch()\`
2. Always return from \`.then()\` and add \`.catch()\`
3. Use \`Promise.all()\` for parallel, \`Promise.allSettled()\` for resilient` },
      { id: 'async-await', title: 'Async/Await', content: `**What is Async/Await?**

Async/await is syntactic sugar on Promises that makes async code look synchronous. An \`async\` function always returns a Promise.

**Why Async/Await Matters:**
- Most readable way to write async code
- Eliminates .then() chain nesting
- Try/catch works naturally for error handling
- Angular uses async/await in services and lifecycle hooks

**Code Example:**
\`\`\`javascript
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}

// Error handling
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// BAD — Sequential
const users = await fetchUsers();
const posts = await fetchPosts();

// GOOD — Parallel
const [users, posts] = await Promise.all([
  fetchUsers(), fetchPosts()
]);
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Sequential that could be parallel
async function loadData() {
  const users = await fetchUsers(); // 2s
  const posts = await fetchPosts(); // 2s — total 4s!
}
// Fix: Run in parallel
async function loadData() {
  const [users, posts] = await Promise.all([
    fetchUsers(), fetchPosts()
  ]); // total 2s
}
\`\`\`

**Best Practices:**
- Use async/await as the default for async code
- Use \`Promise.all()\` for independent parallel operations
- Always wrap awaits in try/catch

**Key Takeaways:**
1. Async functions always return Promises; await pauses until resolved
2. Use \`Promise.all()\` for independent operations
3. Wrap awaits in try/catch for error handling` },
      { id: 'event-loop', title: 'Event Loop', content: `**What is the Event Loop?**

The event loop is JavaScript's concurrency model. It continuously checks the call stack and task queues, executing code in a specific order.

**Why the Event Loop Matters:**
- Predict execution order of sync and async code
- Understand why setTimeout(fn, 0) doesn't execute immediately
- Master the difference between microtasks and macrotasks

**Code Example:**
\`\`\`javascript
console.log("1"); // Synchronous

setTimeout(() => {
  console.log("2"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // Microtask
});

console.log("4"); // Synchronous

// Output: 1, 4, 3, 2
// 1. Synchronous: 1, 4
// 2. Microtasks: 3
// 3. Macrotasks: 2
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Assuming setTimeout(fn, 0) runs immediately
setTimeout(() => console.log("later"), 0);
console.log("now");
// Output: "now", "later"

// Blocking the event loop
function heavyComputation() {
  for (let i = 0; i < 1e9; i++) {} // Blocks!
}
\`\`\`

**Best Practices:**
- Synchronous code always runs first
- Microtasks (Promises) run before macrotasks (setTimeout)
- Never block the event loop — use Web Workers
- Use \`queueMicrotask()\` for high-priority async work

**Key Takeaways:**
1. Sync first, then microtasks (Promises), then macrotasks (setTimeout)
2. Microtasks always have higher priority than macrotasks
3. Never block the event loop — use Web Workers` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the output order of this code?\n```javascript\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");\n```',
        options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '1, 3, 4, 2'],
        correctIndex: 1,
        explanation: 'Synchronous code runs first (1, 4), then microtasks (Promise - 3), then macrotasks (setTimeout - 2).'
      },
      {
        id: 2,
        question: 'What does `Promise.all()` do when one promise rejects?',
        options: ['Returns partial results', 'Immediately rejects', 'Waits for all promises', 'Ignores the rejection'],
        correctIndex: 1,
        explanation: 'Promise.all() immediately rejects with the reason of the first promise that rejects.'
      },
      {
        id: 3,
        question: 'What does the `async` keyword do when added to a function?',
        options: ['Makes it run faster', 'Makes it return a Promise', 'Makes it synchronous', 'Adds error handling'],
        correctIndex: 1,
        explanation: 'An async function always returns a Promise. If the function returns a value, it is automatically wrapped in a resolved Promise.'
      }
    ]
  },
  {
    id: 105, slug: 'js-es6-features', title: 'ES6+ Features',
    description: 'Master modern JavaScript features (ES6 and beyond).',
    level: 'beginner', duration: '35 min',
    objectives: ['Use template literals', 'Master arrow functions', 'Learn optional chaining', 'Use nullish coalescing'],
    topics: [
      { id: 'template-literals', title: 'Template Literals', content: `**What are Template Literals?**

Template literals use backticks instead of single or double quotes. They support embedded expressions, multi-line strings, and tagged templates.

**Why Template Literals Matter:**
- Clean string interpolation without concatenation
- Multi-line strings without escape characters
- Tagged templates enable custom string processing
- Angular uses template literals in component logic

**Code Example:**
\`\`\`javascript
const name = "John";
const age = 30;
const greeting = \`Hello, \${name}! You are \${age} years old.\`;

const html = \`
  <div class="card">
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
  </div>
\`;

function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : "";
    return result + str + value;
  }, "");
}
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const msg = \`Hello \${name}\`; // Correct
const msg = 'Hello \${name}';  // Wrong — no interpolation
\`\`\`

**Best Practices:**
- Use template literals for strings with embedded values
- Extract complex expressions into named variables
- Use tagged templates for sanitization and localization
- Don't use template literals for static strings

**Key Takeaways:**
1. Template literals use backticks and \`\${...}\` for interpolation
2. They support multi-line strings natively
3. Tagged templates enable custom string processing` },
      { id: 'optional-chaining', title: 'Optional Chaining (?.)', content: `**What is Optional Chaining?**

Optional chaining (\`?.\`) safely accesses deeply nested properties. If any part of the chain is null/undefined, it short-circuits and returns undefined.

**Why Optional Chaining Matters:**
- Eliminates verbose null checks
- Prevents TypeError on potentially null values
- Works with method calls, array access, and nested objects

**Code Example:**
\`\`\`javascript
const user = { name: "John", address: { city: "NYC" } };

const city = user?.address?.city;    // "NYC"
const zip = user?.address?.zip;      // undefined
const phone = user?.phone?.mobile;   // undefined

// Method calls
user?.getName?.();

// Array access
const first = arr?.[0];
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const city = user?.address?.city;       // undefined if missing
const city = user?.address?.city ?? "N/A"; // "N/A" if missing
// Confusing optional chaining with defaults
\`\`\`

**Best Practices:**
- Use \`?.\` when accessing properties that may not exist
- Combine with \`??\` for default values
- Don't overuse — skip when you know the value exists

**Key Takeaways:**
1. \`?.\` short-circuits on null/undefined, returning undefined
2. Combine with \`??\` for safe defaults
3. Use for property access, method calls, and array access` },
      { id: 'nullish-coalescing', title: 'Nullish Coalescing (??)', content: `**What is Nullish Coalescing?**

The nullish coalescing operator (\`??\`) provides a default value only when the left side is null/undefined. Unlike \`||\`, it preserves 0, empty string, and false.

**Why Nullish Coalescing Matters:**
- Preserves valid falsy values like 0 and empty string
- More precise than \`||\` for providing defaults
- Essential for configuration with numeric or boolean defaults

**Code Example:**
\`\`\`javascript
// With || (falsy values trigger default)
const a = 0 || "default";      // "default" — 0 is falsy!
const b = "" || "default";     // "default" — empty string is falsy!

// With ?? (null/undefined only)
const a = 0 ?? "default";      // 0 — preserved!
const b = "" ?? "default";     // "" — preserved!
const d = null ?? "default";   // "default"

// Real-World
const settings = {
  timeout: response.timeout ?? 5000,
  retries: response.retries ?? 3,
  debug: response.debug ?? false
};
\`\`\`

**Common Mistakes:**
\`\`\`javascript
const count = data.count || 10; // If count is 0, you get 10!
const count = data.count ?? 10; // If count is 0, you get 0

// Need parentheses when mixing with && or ||
const x = a ?? b || c; // SyntaxError
const x = (a ?? b) || c; // OK
\`\`\`

**Best Practices:**
- Use \`??\` when 0, false, or "" are valid values
- Combine with optional chaining: \`user?.name ?? "Anonymous"\`
- Use parentheses when mixing with \`&&\` or \`||\`

**Key Takeaways:**
1. \`??\` only triggers default for null/undefined
2. Use \`??\` over \`||\` when falsy values are valid
3. Combine with \`?.\` for clean, safe defaults` },
      { id: 'other-es6', title: 'Other ES6+ Features', content: `**What are Other ES6+ Features?**

Beyond core features, JavaScript has powerful additions like \`for...of\`, object rest/spread, and dynamic imports.

**Why These Features Matter:**
- \`for...of\` provides clean iteration over iterables
- Object rest/spread simplifies immutable updates
- Dynamic imports enable lazy loading and code splitting

**Code Example:**
\`\`\`javascript
// for...of Loop
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item); // 1, 2, 3
}

// Object Rest/Spread
const { name, ...rest } = { name: "John", age: 30, city: "NYC" };
// rest = { age: 30, city: "NYC" }

// Dynamic Imports
button.addEventListener('click', async () => {
  const { Chart } = await import('./chart.js');
  new Chart(data);
});

// queueMicrotask
queueMicrotask(() => {
  console.log("High priority");
});
\`\`\`

**Common Mistakes:**
\`\`\`javascript
// Using for...of on objects
const obj = { a: 1, b: 2 };
for (const item of obj) {} // TypeError
// Fix: Use Object.entries()
for (const [key, value] of Object.entries(obj)) {}

// Forgetting dynamic imports are async
const module = import('./module.js'); // Returns Promise!
const module = await import('./module.js'); // Correct
\`\`\`

**Best Practices:**
- Use \`for...of\` for arrays/iterables, \`for...in\` for object keys
- Use object spread for immutable state updates
- Use dynamic imports for code splitting

**Key Takeaways:**
1. \`for...of\` is for iterables — not objects
2. Object rest/spread simplifies immutable patterns
3. Dynamic imports enable lazy loading` },
      { id: 'tagged-templates', title: 'Tagged Templates Deep Dive', content: `**What are Tagged Templates?**

Tagged templates let you parse template literals with a custom function, enabling DSLs, SQL builders, and safe HTML templating.

**Why Tagged Templates Matter:**
- Create domain-specific languages (DSLs)
- Build SQL queries safely (prevent injection)
- Transform template literals (highlighting, formatting)
- Enable tagged template libraries (lit-html, styled-components)

**How Tagged Templates Work (Step-by-Step):**
1. Call a function before a template literal
2. Function receives split strings and interpolated values
3. Function can process and return custom result

**Code Example:**
\`\`\`javascript
// Basic tagged template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
    return result + str + value;
  }, '');
}

const name = 'John';
const age = 30;
const html = highlight\`Name: \${name}, Age: \${age}\`;
// "Name: <mark>John</mark>, Age: <mark>30</mark>"

// SQL builder (safe from injection)
function sql(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined 
      ? \`'\${String(values[i]).replace(/'/g, "''")}'\` 
      : '';
    return result + str + value;
  }, '');
}

const userId = "1' OR '1'='1"; // SQL injection attempt
const query = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// "SELECT * FROM users WHERE id = '1'' OR ''1''='1'" (escaped!)

// CSS-in-JS pattern
function css(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    return result + str + value;
  }, '');
}

const primaryColor = '#3498db';
const styles = css\`
  .button {
    background: \${primaryColor};
    border: 1px solid \${primaryColor};
  }
\`;
\`\`'

**Key Takeaways:**
1. Tagged templates receive split strings and interpolated values
2. Use for DSLs, SQL builders, and safe templating
3. Prevents injection attacks by proper escaping` },
      { id: 'temporal-api', title: 'Temporal API Basics', content: `**What is the Temporal API?**

Temporal is a modern JavaScript date/time API that replaces the problematic Date object. It provides immutable, timezone-aware, and precise date/time handling.

**Why Temporal Matters:**
- Immutable objects (no mutate意外)
- Timezone-aware by default
- Nanosecond precision
- Better calendar support
- Replaces moment.js and date-fns

**How to Use Temporal (Step-by-Step):**
1. Create Temporal objects: PlainDate, PlainTime, PlainDateTime, ZonedDateTime
2. Use duration for time differences
3. Compare and manipulate dates immutably
4. Format with Intl.DateTimeFormat

**Code Example:**
\`\`\`javascript
// Temporal is Stage 3 (not yet in all browsers)
// Use polyfill: npm install @js-temporal/polyfill

import { Temporal } from '@js-temporal/polyfill';

// Creating dates
const today = Temporal.Now.plainDateISO();  // 2024-01-15
const birthday = Temporal.PlainDate.from('1990-05-20');
const time = Temporal.PlainTime.from('14:30:00');
const dateTime = Temporal.PlainDateTime.from('2024-01-15T14:30:00');
const zoned = Temporal.Now.zonedDateTimeISO();  // With timezone

// Date arithmetic (immutable)
const nextWeek = today.add({ days: 7 });
const lastMonth = today.subtract({ months: 1 });
const age = birthday.until(today);

// Comparison
const isBefore = birthday < today;  // true
const isAfter = birthday > today;   // false

// Timezone conversion
const nyTime = zoned.withTimeZone('America/New_York');
const tokyoTime = zoned.withTimeZone('Asia/Tokyo');

// Duration
const duration = Temporal.Duration.from({ hours: 1, minutes: 30 });
const later = time.add(duration);  // 16:00:00

// Formatting
const formatted = today.toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "Monday, January 15, 2024"

// ISO string
const iso = today.toString();  // "2024-01-15"
\`\`'

**Key Takeaways:**
1. Temporal replaces the problematic Date object
2. All objects are immutable — use .add()/.subtract()
3. Timezone-aware by default with ZonedDateTime
4. Use polyfill until fully supported in browsers` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between `??` and `||` for providing defaults?',
        options: ['They are identical', '|| treats 0 and "" as falsy, ?? does not', '?? treats 0 and "" as falsy, || does not', '|| only works with null'],
        correctIndex: 1,
        explanation: '|| treats any falsy value (0, "", false, null, undefined) as needing the default, while ?? only uses the default for null and undefined.'
      },
      {
        id: 2,
        question: 'What does `user?.address?.city` return if `user.address` is null?',
        options: ['null', 'undefined', '""', 'Error'],
        correctIndex: 1,
        explanation: 'Optional chaining short-circuits and returns undefined when it encounters null or undefined in the chain.'
      },
      {
        id: 3,
        question: 'Which feature allows you to embed expressions directly inside a string?',
        options: ['String concatenation', 'Template literals', 'String interpolation via format()', 'String.raw()'],
        correctIndex: 1,
        explanation: 'Template literals use backticks and ${expression} syntax to embed expressions directly inside strings.'
      }
    ]
  }
];

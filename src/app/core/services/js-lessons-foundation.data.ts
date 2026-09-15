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
      { id: 'variables', title: 'Variables (var, let, const)', content: `**var:**\n- Function scoped\n- Hoisted to top\n- Can be redeclared\n\n**let:**\n- Block scoped\n- Not hoisted\n- Can be reassigned\n\n**const:**\n- Block scoped\n- Not hoisted\n- Cannot be reassigned\n\n**Practice:**\n\`\`\`javascript\nvar x = 10; // Function scoped\nlet y = 20; // Block scoped\nconst z = 30; // Cannot reassign\n\nif (true) {\n  var a = 1; // Visible outside\n  let b = 2; // Not visible outside\n  const c = 3; // Not visible outside\n}\nconsole.log(a); // 1\nconsole.log(b); // ReferenceError\n\`\`\`\n\n**Best Practice:** Always use const by default, let when you need to reassign, avoid var.` },
      { id: 'datatypes', title: 'Data Types', content: `**Primitive Types:**\n- string: "hello", 'world', \`template\`\n- number: 42, 3.14, NaN, Infinity\n- boolean: true, false\n- undefined: declared but not assigned\n- null: intentional absence\n- symbol: unique identifier\n- bigint: arbitrary precision integers\n\n**Reference Types:**\n- object: { key: value }\n- array: [1, 2, 3]\n- function: () => {}\n\n**Practice:**\n\`\`\`javascript\nconst name = "John"; // string\nconst age = 30; // number\nconst isStudent = false; // boolean\nlet score; // undefined\nconst empty = null; // null\n\nconst arr = [1, 2, 3]; // array\nconst obj = { name: "John", age: 30 }; // object\n\`\`\`` },
      { id: 'operators', title: 'Operators', content: `**Arithmetic:**\n+, -, *, /, %, **\n\n**Comparison:**\n== (loose), === (strict), !=, !==, >, <, >=, <=\n\n**Logical:**\n&&, ||, !\n\n**Practice:**\n\`\`\`javascript\n// Loose vs Strict\n5 == "5"   // true (type coercion)\n5 === "5"  // false (no coercion)\n\n// Nullish Coalescing\nconst value = null ?? "default"; // "default"\n\n// Optional Chaining\nconst user = { address: { city: "NYC" } };\nconst city = user?.address?.city; // "NYC"\nconst zip = user?.address?.zip; // undefined\n\`\`\`` },
      { id: 'type-coercion', title: 'Type Coercion', content: `**Implicit Coercion:**\n\`\`\`javascript\n"5" + 3      // "53" (number to string)\n"5" - 3      // 2 (string to number)\ntrue + 1     // 2 (boolean to number)\nfalse + ""   // "false" (boolean to string)\n\`\`\`\n\n**Explicit Coercion:**\n\`\`\`javascript\nNumber("5")   // 5\nString(5)     // "5"\nBoolean(0)    // false\nBoolean("")   // false\nBoolean("hello") // true\n\`\`\`\n\n**Practice - Avoid Coercion Bugs:**\n\`\`\`javascript\n// BAD\nif (value == "0") { } // true for 0, "", null, undefined\n\n// GOOD\nif (value === "0") { } // only true for "0"\n\`\`\`` }
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
      { id: 'function-types', title: 'Function Types', content: `**Function Declaration:**\n\`\`\`javascript\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\`\`\`\n\n**Function Expression:**\n\`\`\`javascript\nconst greet = function(name) {\n  return \`Hello, \${name}!\`;\n};\n\`\`\`\n\n**Arrow Function:**\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`;\nconst square = x => x * x;\nconst add = (a, b) => a + b;\n\`\`\`\n\n**Practice:**\n\`\`\`javascript\n// Arrow function advantages\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]\n\`\`\`` },
      { id: 'scope', title: 'Scope', content: `**Global Scope:**\n\`\`\`javascript\nconst global = "I'm global";\nfunction test() {\n  console.log(global); // Accessible\n}\n\`\`\`\n\n**Function Scope:**\n\`\`\`javascript\nfunction test() {\n  const local = "I'm local";\n}\nconsole.log(local); // ReferenceError\n\`\`\`\n\n**Block Scope:**\n\`\`\`javascript\nif (true) {\n  let block = "I'm block scoped";\n  var notBlock = "I'm function scoped";\n}\nconsole.log(notBlock); // Works\nconsole.log(block); // ReferenceError\n\`\`\`\n\n**Practice:**\n\`\`\`javascript\n// Common scope issue\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 3, 3, 3 (not 0, 1, 2)\n\n// Fix with let\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 0, 1, 2\n\`\`\`` },
      { id: 'closures', title: 'Closures', content: `**What is a Closure?**\nA function that remembers its outer scope.\n\n**Practice:**\n\`\`\`javascript\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\nconsole.log(counter.getCount()); // 2\n\`\`\`\n\n**Real-World Example:**\n\`\`\`javascript\nfunction createTimer() {\n  let seconds = 0;\n  const interval = setInterval(() => {\n    seconds++;\n  }, 1000);\n  \n  return () => {\n    clearInterval(interval);\n    return seconds;\n  };\n}\n\`\`\`` },
      { id: 'higher-order', title: 'Higher-Order Functions', content: `**What is a Higher-Order Function?**\nA function that takes or returns a function.\n\n**Practice:**\n\`\`\`javascript\n// Function that takes a function\nfunction repeat(n, action) {\n  for (let i = 0; i < n; i++) {\n    action(i);\n  }\n}\n\nrepeat(3, i => console.log(\`Iteration \${i}\`));\n\n// Function that returns a function\nfunction multiplier(factor) {\n  return (number) => number * factor;\n}\n\nconst double = multiplier(2);\nconsole.log(double(5)); // 10\n\`\`\`\n\n**Array Methods:**\n\`\`\`javascript\nconst numbers = [1, 2, 3, 4, 5];\n\nnumbers.map(n => n * 2);      // Transform\nnumbers.filter(n => n > 3);    // Filter\nnumbers.reduce((a, b) => a + b, 0); // Accumulate\nnumbers.forEach(n => console.log(n)); // Iterate\nnumbers.find(n => n > 3);     // Find first\nnumbers.every(n => n > 0);    // All match\nnumbers.some(n => n > 3);     // Any match\n\`\`\`` }
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
      { id: 'objects', title: 'Objects', content: `**Creating Objects:**\n\`\`\`javascript\nconst person = {\n  name: "John",\n  age: 30,\n  greet() {\n    return \`Hello, \${this.name}!\`;\n  }\n};\n\n// Shorthand\nconst name = "John";\nconst person = { name, age: 30 };\n\n// Computed properties\nconst key = "name";\nconst person = { [key]: "John" };\n\`\`\`\n\n**Object Methods:**\n\`\`\`javascript\nObject.keys(person);    // ["name", "age"]\nObject.values(person);  // ["John", 30]\nObject.entries(person); // [["name", "John"], ["age", 30]]\nObject.assign({}, person, { age: 31 });\nObject.freeze(person);  // Immutable\n\`\`\`` },
      { id: 'arrays', title: 'Arrays', content: `**Array Methods:**\n\`\`\`javascript\nconst arr = [1, 2, 3, 4, 5];\n\n// Mutating (avoid)\narr.push(6);      // Add to end\narr.pop();        // Remove from end\narr.unshift(0);   // Add to start\narr.shift();      // Remove from start\narr.splice(1, 2); // Remove at index\n\n// Non-mutating (prefer)\narr.concat([6]);  // Merge arrays\narr.slice(1, 3);  // Extract section\narr.includes(3);  // Check existence\narr.indexOf(3);   // Find index\narr.flat();       // Flatten nested\narr.flatMap(x => [x, x * 2]); // Map + flatten\n\`\`\`\n\n**Practice:**\n\`\`\`javascript\nconst numbers = [3, 1, 4, 1, 5, 9, 2, 6];\n\n// Chaining methods\nconst result = numbers\n  .filter(n => n > 3)\n  .sort((a, b) => a - b)\n  .map(n => n * 2);\n// [8, 10, 12, 18]\n\`\`\`` },
      { id: 'destructuring', title: 'Destructuring', content: `**Object Destructuring:**\n\`\`\`javascript\nconst person = { name: "John", age: 30, city: "NYC" };\n\nconst { name, age } = person;\nconst { name: userName, age: userAge } = person; // Rename\nconst { name, age, country = "US" } = person; // Default\n\`\`\`\n\n**Array Destructuring:**\n\`\`\`javascript\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\n// first = 1, second = 2, rest = [3, 4, 5]\n\`\`\`\n\n**Practice:**\n\`\`\`javascript\n// Function parameter destructuring\nfunction createUser({ name, age, role = "user" }) {\n  return { name, age, role };\n}\n\nconst user = createUser({ name: "John", age: 30 });\n// { name: "John", age: 30, role: "user" }\n\`\`\`` },
      { id: 'spread-rest', title: 'Spread & Rest', content: `**Spread Operator (...):**\n\`\`\`javascript\n// Arrays\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]\n\n// Objects\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }\n\n// Function arguments\nconst numbers = [1, 2, 3];\nMath.max(...numbers); // 3\n\`\`\`\n\n**Rest Operator (...):**\n\`\`\`javascript\n// Function parameters\nfunction sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3); // 6\n\n// Object destructuring\nconst { name, ...rest } = { name: "John", age: 30, city: "NYC" };\n// rest = { age: 30, city: "NYC" }\n\`\`\`\n\n**Practice:**\n\`\`\`javascript\n// Clone objects (shallow)\nconst original = { a: 1, b: { c: 2 } };\nconst clone = { ...original };\nclone.b.c = 3; // Also affects original!\n\n// Deep clone\nconst deepClone = JSON.parse(JSON.stringify(original));\n\`\`\`` }
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
      { id: 'callbacks', title: 'Callbacks', content: `**What is a Callback?**\nA function passed as an argument to another function.\n\n**Practice:**\n\`\`\`javascript\nfunction fetchData(callback) {\n  setTimeout(() => {\n    callback({ data: "Hello" });\n  }, 1000);\n}\n\nfetchData((result) => {\n  console.log(result.data); // "Hello"\n});\n\`\`\`\n\n**Callback Hell:**\n\`\`\`javascript\n// BAD - Nested callbacks\ngetData(function(a) {\n  getMoreData(a, function(b) {\n    getEvenMoreData(b, function(c) {\n      console.log(c);\n    });\n  });\n});\n\`\`\`` },
      { id: 'promises', title: 'Promises', content: `**Creating Promises:**\n\`\`\`javascript\nconst myPromise = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve("Done!");\n  } else {\n    reject("Failed!");\n  }\n});\n\nmyPromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error))\n  .finally(() => console.log("Always runs"));\n\`\`\`\n\n**Practice:**\n\`\`\`javascript\nfunction fetchData() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve({ data: "Hello" });\n    }, 1000);\n  });\n}\n\nfetchData()\n  .then(result => console.log(result.data))\n  .catch(error => console.error(error));\n\`\`\`\n\n**Promise Methods:**\n\`\`\`javascript\nPromise.all([p1, p2, p3]);     // All resolve\nPromise.allSettled([p1, p2]);  // All settle\nPromise.race([p1, p2]);       // First to settle\nPromise.any([p1, p2]);        // First to resolve\n\`\`\`` },
      { id: 'async-await', title: 'Async/Await', content: `**Async Function:**\n\`\`\`javascript\nasync function fetchData() {\n  const response = await fetch("https://api.example.com/data");\n  const data = await response.json();\n  return data;\n}\n\`\`\`\n\n**Error Handling:**\n\`\`\`javascript\nasync function fetchData() {\n  try {\n    const response = await fetch("https://api.example.com/data");\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Error:", error);\n    throw error;\n  }\n}\n\`\`\`\n\n**Practice - Parallel Requests:**\n\`\`\`javascript\n// BAD - Sequential\nconst users = await fetchUsers();\nconst posts = await fetchPosts();\n\n// GOOD - Parallel\nconst [users, posts] = await Promise.all([\n  fetchUsers(),\n  fetchPosts()\n]);\n\`\`\`` },
      { id: 'event-loop', title: 'Event Loop', content: `**Event Loop Basics:**\n1. Call Stack: Executes synchronous code\n2. Web APIs: Handle async operations\n3. Callback Queue: Stores callbacks\n4. Microtask Queue: Promises, queueMicrotask\n\n**Practice:**\n\`\`\`javascript\nconsole.log("1"); // Synchronous\n\nsetTimeout(() => {\n  console.log("2"); // Macrotask\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("3"); // Microtask\n});\n\nconsole.log("4"); // Synchronous\n\n// Output: 1, 4, 3, 2\n\`\`\`\n\n**Key Rules:**\n- Microtasks run before macrotasks\n- Promises are microtasks\n- setTimeout is macrotask\n- await pauses execution, resumes after microtasks` }
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
      { id: 'template-literals', title: 'Template Literals', content: `**Basic Usage:**\n\`\`\`javascript\nconst name = "John";\nconst greeting = \`Hello, \${name}!\`;\n\`\`\`\n\n**Multi-line:**\n\`\`\`javascript\nconst html = \`\n  <div>\n    <h1>\${title}</h1>\n    <p>\${content}</p>\n  </div>\n\`;\n\`\`\`\n\n**Tagged Templates:**\n\`\`\`javascript\nfunction highlight(strings, ...values) {\n  return strings.reduce((result, str, i) => {\n    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : "";\n    return result + str + value;\n  }, "");\n}\n\nconst result = highlight\`Hello \${name}, you are \${age} years old\`;\n\`\`\`` },
      { id: 'optional-chaining', title: 'Optional Chaining (?.)', content: `**What is Optional Chaining?**\nSafely access nested properties without errors.\n\n**Practice:**\n\`\`\`javascript\nconst user = {\n  name: "John",\n  address: {\n    city: "NYC"\n  }\n};\n\n// Without optional chaining\nconst city = user && user.address && user.address.city;\n\n// With optional chaining\nconst city = user?.address?.city; // "NYC"\nconst zip = user?.address?.zip; // undefined\nconst phone = user?.phone?.mobile; // undefined\n\n// Method calls\nuser?.getName?.(); // Calls if exists\n\n// Array access\nconst first = arr?.[0];\n\`\`\`` },
      { id: 'nullish-coalescing', title: 'Nullish Coalescing (??)', content: `**What is Nullish Coalescing?**\nProvides default value only for null/undefined.\n\n**Practice:**\n\`\`\`javascript\n// With || (falsy values)\nconst a = 0 || "default"; // "default" (0 is falsy)\nconst b = "" || "default"; // "default" (empty string is falsy)\nconst c = false || "default"; // "default" (false is falsy)\n\n// With ?? (null/undefined only)\nconst a = 0 ?? "default"; // 0 (not null/undefined)\nconst b = "" ?? "default"; // "" (not null/undefined)\nconst c = false ?? "default"; // false (not null/undefined)\nconst d = null ?? "default"; // "default"\nconst e = undefined ?? "default"; // "default"\n\`\`\`\n\n**Real-World Use:**\n\`\`\`javascript\n// API response with defaults\nconst settings = {\n  timeout: response.timeout ?? 5000,\n  retries: response.retries ?? 3,\n  debug: response.debug ?? false\n};\n\`\`\`` },
      { id: 'other-es6', title: 'Other ES6+ Features', content: `**for...of Loop:**\n\`\`\`javascript\nconst arr = [1, 2, 3];\nfor (const item of arr) {\n  console.log(item);\n}\n\`\`\`\n\n**Object Rest/Spread:**\n\`\`\`javascript\nconst { name, ...rest } = { name: "John", age: 30, city: "NYC" };\n// rest = { age: 30, city: "NYC" }\n\nconst obj = { ...rest, country: "US" };\n// { age: 30, city: "NYC", country: "US" }\n\`\`\`\n\n**Dynamic Imports:**\n\`\`\`javascript\nconst module = await import('./module.js');\n\`\`\`\n\n**Promise.try:**\n\`\`\`javascript\nconst result = await Promise.try(() => {\n  if (condition) throw new Error("Bad");\n  return "Good";\n});\n\`\`\`` }
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

import { Lesson } from '../models/lesson.model';

export const JS_INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 106, slug: 'js-error-handling', title: 'Error Handling',
    description: 'Master error handling, custom errors, and debugging.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Handle errors', 'Create custom errors', 'Debug effectively'],
    topics: [
      { id: 'try-catch', title: 'Try-Catch-Finally', content: `**Practice:**\n\`\`\`javascript\ntry {\n  const data = JSON.parse(invalidJSON);\n} catch (error) {\n  console.error("Parse error:", error.message);\n} finally {\n  console.log("Always runs");\n}\n\`\`\`\n\n**Error Types:**\n- Error: Base error\n- TypeError: Wrong type\n- ReferenceError: Undefined variable\n- SyntaxError: Invalid syntax\n- RangeError: Out of range` },
      { id: 'custom-errors', title: 'Custom Errors', content: `**Practice:**\n\`\`\`javascript\nclass ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\n\nfunction validateAge(age) {\n  if (age < 0 || age > 150) {\n    throw new ValidationError("Invalid age", "age");\n  }\n  return true;\n}\n\ntry {\n  validateAge(-5);\n} catch (error) {\n  if (error instanceof ValidationError) {\n    console.error(\`\${error.field}: \${error.message}\`);\n  }\n}\n\`\`\`` },
      { id: 'debugging', title: 'Debugging Techniques', content: `**Practice:**\n\`\`\`javascript\n// Console methods\nconsole.log("Basic log");\nconsole.warn("Warning");\nconsole.error("Error");\nconsole.table([{ a: 1 }, { a: 2 }]);\nconsole.time("timer");\n// ... code ...\nconsole.timeEnd("timer");\nconsole.group("Group");\nconsole.log("Item 1");\nconsole.log("Item 2");\nconsole.groupEnd();\n\n// Debugger statement\ndebugger; // Pauses execution\n\`\`\`` }
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
      { id: 'iterators', title: 'Iterators', content: `**What is an Iterator?**\nObject with next() method returning { value, done }.\n\n**Practice:**\n\`\`\`javascript\nconst range = {\n  from: 1,\n  to: 5,\n  [Symbol.iterator]() {\n    let current = this.from;\n    const last = this.to;\n    return {\n      next() {\n        return current <= last\n          ? { value: current++, done: false }\n          : { done: true };\n      }\n    };\n  }\n};\n\nfor (const num of range) {\n  console.log(num); // 1, 2, 3, 4, 5\n}\n\`\`\`` },
      { id: 'generators', title: 'Generators', content: `**What is a Generator?**\nFunction that can pause and resume execution.\n\n**Practice:**\n\`\`\`javascript\nfunction* numberGenerator() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst gen = numberGenerator();\nconsole.log(gen.next()); // { value: 1, done: false }\nconsole.log(gen.next()); // { value: 2, done: false }\nconsole.log(gen.next()); // { value: 3, done: false }\nconsole.log(gen.next()); // { value: undefined, done: true }\n\`\`\`\n\n**Real-World Example:**\n\`\`\`javascript\nfunction* fibonacci() {\n  let a = 0, b = 1;\n  while (true) {\n    yield a;\n    [a, b] = [b, a + b];\n  }\n}\n\nconst fib = fibonacci();\nconsole.log(fib.next().value); // 0\nconsole.log(fib.next().value); // 1\nconsole.log(fib.next().value); // 1\nconsole.log(fib.next().value); // 2\n\`\`\`` }
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
      { id: 'import-export', title: 'Import/Export', content: `**Named Exports:**\n\`\`\`javascript\n// math.js\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b;\n\n// main.js\nimport { add, subtract } from './math.js';\nimport { add as plus } from './math.js'; // Rename\n\`\`\`\n\n**Default Export:**\n\`\`\`javascript\n// user.js\nexport default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\n// main.js\nimport User from './user.js';\n\`\`\`\n\n**Re-export:**\n\`\`\`javascript\nexport { add, subtract } from './math.js';\nexport * from './math.js';\nexport * as math from './math.js';\n\`\`\`` },
      { id: 'dynamic-import', title: 'Dynamic Imports', content: `**Practice:**\n\`\`\`javascript\n// Conditional import\nif (condition) {\n  const module = await import('./module.js');\n  module.doSomething();\n}\n\n// Lazy loading\nbutton.addEventListener('click', async () => {\n  const { Chart } = await import('./chart.js');\n  new Chart(data);\n});\n\n// With import map\nconst module = await import('./module.js');\n\`\`\`` },
      { id: 'module-patterns', title: 'Module Patterns', content: `**Practice:**\n\`\`\`javascript\n// Singleton\nconst singleton = (() => {\n  let instance;\n  function createInstance() {\n    return { name: "Singleton" };\n  }\n  return {\n    getInstance() {\n      if (!instance) {\n        instance = createInstance();\n      }\n      return instance;\n    }\n  };\n})();\n\n// Revealing Module\nconst module = (() => {\n  let privateVar = "private";\n  function privateMethod() {\n    return privateVar;\n  }\n  return {\n    publicMethod() {\n      return privateMethod();\n    }\n  };\n})();\n\`\`\`` }
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
      { id: 'prototypes', title: 'Prototypes', content: `**Practice:**\n\`\`\`javascript\nconst animal = {\n  eat() {\n    console.log("Eating");\n  },\n  sleep() {\n    console.log("Sleeping");\n  }\n};\n\nconst dog = Object.create(animal);\ndog.bark = function() {\n  console.log("Woof");\n};\n\ndog.bark(); // Woof\ndog.eat();  // Eating (inherited)\n\`\`\`\n\n**Prototype Chain:**\n\`\`\`javascript\ndog.__proto__ === animal; // true\nanimal.__proto__ === Object.prototype; // true\n\`\`\`` },
      { id: 'classes', title: 'Classes', content: `**Practice:**\n\`\`\`javascript\nclass Animal {\n  constructor(name) {\n    this.name = name;\n  }\n\n  eat() {\n    console.log(\`\${this.name} is eating\`);\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n\n  bark() {\n    console.log(\`\${this.name} says Woof\`);\n  }\n}\n\nconst dog = new Dog("Rex", "German Shepherd");\ndog.eat();  // Rex is eating\ndog.bark(); // Rex says Woof\n\`\`\`` },
      { id: 'static-methods', title: 'Static Methods', content: `**Practice:**\n\`\`\`javascript\nclass MathUtils {\n  static add(a, b) {\n    return a + b;\n  }\n\n  static multiply(a, b) {\n    return a * b;\n  }\n}\n\nMathUtils.add(2, 3); // 5\nMathUtils.multiply(2, 3); // 6\n\`\`\`\n\n**Static Properties:**\n\`\`\`javascript\nclass User {\n  static count = 0;\n\n  constructor(name) {\n    this.name = name;\n    User.count++;\n  }\n}\n\nconst user1 = new User("John");\nconst user2 = new User("Jane");\nconsole.log(User.count); // 2\n\`\`\`` }
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
      { id: 'basics', title: 'Regex Basics', content: `**Practice:**\n\`\`\`javascript\n// Creating regex\nconst regex1 = /pattern/;\nconst regex2 = new RegExp('pattern');\n\n// Common patterns\nconst email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconst phone = /^\\d{3}-\\d{3}-\\d{4}$/;\nconst url = /^https?:\\/\\/[^\\s]+$/;\n\n// Test\nemail.test("user@example.com"); // true\nemail.test("invalid"); // false\n\`\`\`` },
      { id: 'methods', title: 'Regex Methods', content: `**Practice:**\n\`\`\`javascript\nconst str = "Hello World, hello Universe";\n\n// test\n/ello/.test(str); // true\n\n// match\nstr.match(/hello/gi); // ["Hello", "hello"]\n\n// matchAll\n[...str.matchAll(/hello/gi)];\n\n// replace\nstr.replace(/hello/gi, "Hi"); // "Hi World, Hi Universe"\n\n// split\n"a,b,c".split(/,/); // ["a", "b", "c"]\n\`\`\`` },
      { id: 'groups', title: 'Groups & Capturing', content: `**Practice:**\n\`\`\`javascript\n// Named groups\nconst regex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconst match = "2024-01-15".match(regex);\nconsole.log(match.groups.year); // "2024"\n\n// Lookahead/Lookbehind\nconst price = "$100";\nconst num = price.replace(/(?=\\d)(?=(\\d{3})+$)/g, ","); // "$100"\n\n// Non-capturing groups\n"hello123".match(/hello(?:123)/); // ["hello123"]\n\`\`\`` }
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
      { id: 'pure-functions', title: 'Pure Functions', content: `**What is a Pure Function?**\n- Same input, same output\n- No side effects\n\n**Practice:**\n\`\`\`javascript\n// Impure (has side effects)\nlet total = 0;\nfunction addToTotal(num) {\n  total += num;\n  return total;\n}\n\n// Pure\nfunction add(a, b) {\n  return a + b;\n}\n\n// Pure with no mutation\nfunction addToArray(arr, item) {\n  return [...arr, item];\n}\n\`\`\`` },
      { id: 'immutability', title: 'Immutability', content: `**Practice:**\n\`\`\`javascript\n// Mutable (avoid)\nconst arr = [1, 2, 3];\narr.push(4); // Mutates original\n\n// Immutable (prefer)\nconst arr = [1, 2, 3];\nconst newArr = [...arr, 4]; // New array\n\n// Object immutability\nconst user = { name: "John", age: 30 };\nconst updatedUser = { ...user, age: 31 };\n\n// Deep immutable update\nfunction updateUser(user, updates) {\n  return {\n    ...user,\n    address: { ...user.address, ...updates.address }\n  };\n}\n\`\`\`` },
      { id: 'composition', title: 'Function Composition', content: `**Practice:**\n\`\`\`javascript\n// Compose function\nconst compose = (...fns) => (x) =>\n  fns.reduceRight((acc, fn) => fn(acc), x);\n\n// Pipe function\nconst pipe = (...fns) => (x) =>\n  fns.reduce((acc, fn) => fn(acc), x);\n\n// Usage\nconst add10 = x => x + 10;\nconst double = x => x * 2;\nconst subtract3 = x => x - 3;\n\nconst transform = pipe(add10, double, subtract3);\nconsole.log(transform(5)); // (5 + 10) * 2 - 3 = 27\n\`\`\`` }
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
      { id: 'proxy', title: 'Proxy', content: `**Practice:**\n\`\`\`javascript\nconst handler = {\n  get(target, prop) {\n    console.log(\`Accessing \${prop}\`);\n    return Reflect.get(target, prop);\n  },\n  set(target, prop, value) {\n    console.log(\`Setting \${prop} to \${value}\`);\n    return Reflect.set(target, prop, value);\n  }\n};\n\nconst user = new Proxy({ name: "John", age: 30 }, handler);\nconsole.log(user.name); // Logs "Accessing name", then "John"\nuser.age = 31; // Logs "Setting age to 31"\n\`\`\`` },
      { id: 'reactive', title: 'Reactive Systems', content: `**Practice:**\n\`\`\`javascript\nfunction reactive(obj, callback) {\n  return new Proxy(obj, {\n    get(target, prop) {\n      return target[prop];\n    },\n    set(target, prop, value) {\n      target[prop] = value;\n      callback(prop, value);\n      return true;\n    }\n  });\n}\n\nconst state = reactive({ count: 0 }, (prop, value) => {\n  console.log(\`\${prop} changed to \${value}\`);\n});\n\nstate.count = 1; // Logs "count changed to 1"\nstate.count = 2; // Logs "count changed to 2"\n\`\`\`` },
      { id: 'validation', title: 'Validation with Proxy', content: `**Practice:**\n\`\`\`javascript\nfunction createValidator(obj, rules) {\n  return new Proxy(obj, {\n    set(target, prop, value) {\n      const rule = rules[prop];\n      if (rule && !rule.validate(value)) {\n        throw new Error(rule.message);\n      }\n      target[prop] = value;\n      return true;\n    }\n  });\n}\n\nconst user = createValidator({}, {\n  age: {\n    validate: (v) => v >= 0 && v <= 150,\n    message: "Age must be between 0 and 150"\n  }\n});\n\nuser.age = 25; // Works\nuser.age = -5; // Throws Error\n\`\`\`` }
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
      { id: 'weakmap', title: 'WeakMap', content: `**What is a WeakMap?**\n- Keys must be objects\n- Keys are weakly referenced (can be garbage collected)\n- Not iterable\n\n**Practice:**\n\`\`\`javascript\nconst cache = new WeakMap();\n\nfunction processObject(obj) {\n  if (cache.has(obj)) {\n    return cache.get(obj);\n  }\n  const result = expensiveOperation(obj);\n  cache.set(obj, result);\n  return result;\n}\n\n// When obj is garbage collected, its cache entry is removed\n\`\`\`` },
      { id: 'weakset', title: 'WeakSet', content: `**What is a WeakSet?**\n- Values must be objects\n- Values are weakly referenced\n- Not iterable\n\n**Practice:**\n\`\`\`javascript\nconst visited = new WeakSet();\n\nfunction traverse(node) {\n  if (visited.has(node)) return;\n  visited.add(node);\n  // Process node\n  for (const child of node.children) {\n    traverse(child);\n  }\n}\n\`\`\`` },
      { id: 'memory', title: 'Memory Management', content: `**Practice:**\n\`\`\`javascript\n// Memory leak example\nconst cache = new Map();\nfunction process(obj) {\n  cache.set(obj.id, expensiveOperation(obj));\n  // Cache grows forever!\n}\n\n// Fix with WeakMap\nconst cache = new WeakMap();\nfunction process(obj) {\n  cache.set(obj, expensiveOperation(obj));\n  // Cache entries removed when obj is garbage collected\n}\n\n// Manual cleanup\nfunction createCache() {\n  const cache = new Map();\n  return {\n    get: (key) => cache.get(key),\n    set: (key, value) => cache.set(key, value),\n    cleanup: () => cache.clear()\n  };\n}\n\`\`\`` }
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
      { id: 'module-pattern', title: 'Module Pattern', content: `**Practice:**\n\`\`\`javascript\nconst ShoppingCart = (() => {\n  let items = [];\n\n  function addItem(item) {\n    items.push(item);\n  }\n\n  function getTotal() {\n    return items.reduce((sum, item) => sum + item.price, 0);\n  }\n\n  return {\n    addItem,\n    getTotal,\n    getItemCount: () => items.length\n  };\n})();\n\nshoppingCart.addItem({ name: "Item", price: 10 });\nconsole.log(shoppingCart.getTotal()); // 10\n\`\`\`` },
      { id: 'mixins', title: 'Mixins', content: `**Practice:**\n\`\`\`javascript\nconst Serializable = (Base) => class extends Base {\n  serialize() {\n    return JSON.stringify(this);\n  }\n\n  static deserialize(json) {\n    return JSON.parse(json);\n  }\n};\n\nconst Loggable = (Base) => class extends Base {\n  log(message) {\n    console.log(\`[\${this.constructor.name}] \${message}\`);\n  }\n};\n\nclass User {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nconst EnhancedUser = Serializable(Loggable(User));\nconst user = new EnhancedUser("John");\nuser.log("Created"); // [User] Created\nconsole.log(user.serialize()); // {"name":"John"}\n\`\`\`` },
      { id: 'builder', title: 'Builder Pattern', content: `**Practice:**\n\`\`\`javascript\nclass QueryBuilder {\n  constructor() {\n    this.table = "";\n    this.conditions = [];\n    this.fields = [];\n  }\n\n  from(table) {\n    this.table = table;\n    return this;\n  }\n\n  select(...fields) {\n    this.fields = fields;\n    return this;\n  }\n\n  where(condition) {\n    this.conditions.push(condition);\n    return this;\n  }\n\n  build() {\n    let query = \`SELECT \${this.fields.join(", ")} FROM \${this.table}\`;\n    if (this.conditions.length) {\n      query += \` WHERE \${this.conditions.join(" AND ")}\`;\n    }\n    return query;\n  }\n}\n\nconst query = new QueryBuilder()\n  .from("users")\n  .select("name", "email")\n  .where("age > 18")\n  .where("active = true")\n  .build();\n\nconsole.log(query);\n// SELECT name, email FROM users WHERE age > 18 AND active = true\n\`\`\`` }
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
  }
];

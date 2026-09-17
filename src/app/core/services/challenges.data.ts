import { CodingChallenge } from '../models/lesson.model';

export const CHALLENGES: CodingChallenge[] = [
  {
    id: 1,
    slug: 'implement-debounce',
    title: 'Implement Debounce',
    description: 'Write a debounce function that delays invoking a function until after a specified delay has elapsed since the last time it was invoked.',
    difficulty: 'easy',
    category: 'javascript',
    duration: '15 min',
    starterCode: `function debounce(fn, delay) {\n  // Your code here\n}`,
    testCases: [
      { id: 1, input: '500', expected: 'function', description: 'Returns a function' },
      { id: 2, input: 'test', expected: 'test', description: 'Calls the function with correct args' },
      { id: 3, input: 'hello', expected: 'hello', description: 'Works with string arguments' }
    ],
    hints: [
      'Use setTimeout and clearTimeout',
      'Store the timeout ID in a variable',
      'Return a function that clears the previous timeout and sets a new one'
    ],
    solution: `function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn(...args), delay);\n  };\n}`,
    concepts: ['closures', 'setTimeout', 'higher-order functions']
  },
  {
    id: 2,
    slug: 'implement-throttle',
    title: 'Implement Throttle',
    description: 'Write a throttle function that ensures a function is called at most once in a specified time period.',
    difficulty: 'easy',
    category: 'javascript',
    duration: '15 min',
    starterCode: `function throttle(fn, limit) {\n  // Your code here\n}`,
    testCases: [
      { id: 1, input: '500', expected: 'function', description: 'Returns a function' },
      { id: 2, input: 'test', expected: 'test', description: 'Calls the function' },
      { id: 3, input: 'hello', expected: 'hello', description: 'Works with arguments' }
    ],
    hints: [
      'Track whether the function was recently called',
      'Use a flag variable and setTimeout',
      'Reset the flag after the limit expires'
    ],
    solution: `function throttle(fn, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      fn(...args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}`,
    concepts: ['closures', 'setTimeout', 'time-based control']
  },
  {
    id: 3,
    slug: 'deep-clone',
    title: 'Deep Clone Object',
    description: 'Write a function that creates a deep clone of an object, handling nested objects and arrays.',
    difficulty: 'medium',
    category: 'javascript',
    duration: '20 min',
    starterCode: `function deepClone(obj) {\n  // Your code here\n}`,
    testCases: [
      { id: 1, input: '{"a":1}', expected: '{"a":1}', description: 'Clones simple object' },
      { id: 2, input: '{"a":{"b":2}}', expected: '{"a":{"b":2}}', description: 'Clones nested object' },
      { id: 3, input: '{"a":[1,2,3]}', expected: '{"a":[1,2,3]}', description: 'Clones arrays' }
    ],
    hints: [
      'Check if the input is an object or array',
      'Recursively clone nested structures',
      'Handle null values (typeof null === "object")'
    ],
    solution: `function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (Array.isArray(obj)) return obj.map(item => deepClone(item));\n  const clone = {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key]);\n    }\n  }\n  return clone;\n}`,
    concepts: ['recursion', 'object manipulation', 'type checking']
  },
  {
    id: 4,
    slug: 'promise-all',
    title: 'Implement Promise.all',
    description: 'Write a function that takes an array of promises and returns a promise that resolves when all promises resolve, or rejects if any reject.',
    difficulty: 'medium',
    category: 'javascript',
    duration: '25 min',
    starterCode: `function promiseAll(promises) {\n  // Your code here\n}`,
    testCases: [
      { id: 1, input: '[1,2,3]', expected: '[1,2,3]', description: 'Resolves all values' },
      { id: 2, input: '[1,2,3]', expected: '[1,2,3]', description: 'Handles array input' },
      { id: 3, input: '[]', expected: '[]', description: 'Handles empty array' }
    ],
    hints: [
      'Track the number of resolved promises',
      'Store results in an array maintaining order',
      'Reject immediately if any promise rejects'
    ],
    solution: `function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    if (promises.length === 0) return resolve(results);\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise).then(\n        value => {\n          results[index] = value;\n          completed++;\n          if (completed === promises.length) resolve(results);\n        },\n        reject\n      );\n    });\n  });\n}`,
    concepts: ['promises', 'asynchronous programming', 'error handling']
  },
  {
    id: 5,
    slug: 'event-emitter',
    title: 'Build Event Emitter',
    description: 'Implement an event emitter class with on, off, and emit methods.',
    difficulty: 'medium',
    category: 'javascript',
    duration: '25 min',
    starterCode: `class EventEmitter {\n  constructor() {\n    // Your code here\n  }\n  on(event, callback) {\n    // Your code here\n  }\n  off(event, callback) {\n    // Your code here\n  }\n  emit(event, ...args) {\n    // Your code here\n  }\n}`,
    testCases: [
      { id: 1, input: 'test', expected: 'emitted', description: 'Emits event correctly' },
      { id: 2, input: 'test', expected: 'removed', description: 'Removes listener' },
      { id: 3, input: 'test', expected: 'multiple', description: 'Multiple listeners work' }
    ],
    hints: [
      'Use a Map or object to store event listeners',
      'on() adds callback to the listeners array for that event',
      'off() filters out the specific callback',
      'emit() calls all listeners for that event with provided args'
    ],
    solution: `class EventEmitter {\n  constructor() { this.listeners = new Map(); }\n  on(event, callback) {\n    if (!this.listeners.has(event)) this.listeners.set(event, []);\n    this.listeners.get(event).push(callback);\n  }\n  off(event, callback) {\n    if (!this.listeners.has(event)) return;\n    this.listeners.set(event, this.listeners.get(event).filter(cb => cb !== callback));\n  }\n  emit(event, ...args) {\n    if (!this.listeners.has(event)) return;\n    this.listeners.get(event).forEach(cb => cb(...args));\n  }\n}`,
    concepts: ['classes', 'pub/sub pattern', 'Map data structure']
  },
  {
    id: 6,
    slug: 'array-flatten',
    title: 'Flatten Nested Array',
    description: 'Write a function that flattens a nested array to any depth without using Array.flat().',
    difficulty: 'easy',
    category: 'javascript',
    duration: '15 min',
    starterCode: `function flatten(arr) {\n  // Your code here\n}`,
    testCases: [
      { id: 1, input: '[1,[2,[3,4],5],6]', expected: '1,2,3,4,5,6', description: 'Flattens deeply nested array' },
      { id: 2, input: '[1,2,3]', expected: '1,2,3', description: 'Already flat array' },
      { id: 3, input: '[]', expected: '', description: 'Empty array' }
    ],
    hints: [
      'Use recursion to handle nested arrays',
      'Check if each element is an array with Array.isArray()',
      'Concatenate results using spread operator or concat'
    ],
    solution: `function flatten(arr) {\n  return arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)\n  , []);\n}`,
    concepts: ['recursion', 'array methods', 'reduce']
  },
  {
    id: 7,
    slug: 'curry-function',
    title: 'Curry a Function',
    description: 'Implement a curry function that converts a regular function into a curried version.',
    difficulty: 'medium',
    category: 'javascript',
    duration: '20 min',
    starterCode: `function curry(fn) {\n  // Your code here\n}`,
    testCases: [
      { id: 1, input: 'add', expected: 'function', description: 'Returns curried function' },
      { id: 2, input: 'add', expected: '6', description: 'Curried addition works' },
      { id: 3, input: 'add', expected: '6', description: 'Partial application works' }
    ],
    hints: [
      'Return a function that collects arguments',
      'Check if enough arguments have been provided',
      'Use function.length to get expected argument count'
    ],
    solution: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn(...args);\n    }\n    return (...moreArgs) => curried(...args, ...moreArgs);\n  };\n}`,
    concepts: ['closures', 'partial application', 'higher-order functions']
  },
  {
    id: 8,
    slug: 'pub-sub-system',
    title: 'Build Pub/Sub System',
    description: 'Create a publish-subscribe messaging system with subscribe, publish, and unsubscribe methods.',
    difficulty: 'hard',
    category: 'javascript',
    duration: '30 min',
    starterCode: `class PubSub {\n  constructor() {\n    // Your code here\n  }\n  subscribe(topic, callback) {\n    // Your code here\n  }\n  publish(topic, data) {\n    // Your code here\n  }\n  unsubscribe(topic, callback) {\n    // Your code here\n  }\n}`,
    testCases: [
      { id: 1, input: 'test', expected: 'subscribed', description: 'Subscribe works' },
      { id: 2, input: 'test', expected: 'published', description: 'Publish triggers callbacks' },
      { id: 3, input: 'test', expected: 'unsubscribed', description: 'Unsubscribe removes callback' }
    ],
    hints: [
      'Use a Map to store topics and their subscriber arrays',
      'subscribe() pushes callback to the topic array',
      'publish() calls all callbacks for the topic',
      'unsubscribe() filters out the specific callback'
    ],
    solution: `class PubSub {\n  constructor() { this.topics = new Map(); }\n  subscribe(topic, callback) {\n    if (!this.topics.has(topic)) this.topics.set(topic, []);\n    this.topics.get(topic).push(callback);\n    return () => this.unsubscribe(topic, callback);\n  }\n  publish(topic, data) {\n    if (!this.topics.has(topic)) return;\n    this.topics.get(topic).forEach(cb => cb(data));\n  }\n  unsubscribe(topic, callback) {\n    if (!this.topics.has(topic)) return;\n    this.topics.set(topic, this.topics.get(topic).filter(cb => cb !== callback));\n  }\n}`,
    concepts: ['pub/sub pattern', 'Map', 'closures']
  }
];

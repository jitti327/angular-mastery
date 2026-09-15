import { Lesson } from '../models/lesson.model';

export const TS_INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 206, slug: 'ts-interfaces-advanced', title: 'Advanced Interfaces',
    description: 'Master advanced interface patterns.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Use index signatures', 'Create nested interfaces', 'Apply mixins'],
    topics: [
      { id: 'index-signatures', title: 'Index Signatures', content: `**Practice:**\n\`\`\`typescript\n// Basic index signature\ninterface StringMap {\n  [key: string]: string;\n}\n\nconst map: StringMap = {\n  name: "John",\n  email: "john@example.com"\n};\n\n// Numeric index signature\ninterface NumberArray {\n  [index: number]: string;\n}\n\n// Combined signatures\ninterface Dictionary {\n  [key: string]: string | number;\n  length: number; // OK\n}\n\`\`\`` },
      { id: 'nested-interfaces', title: 'Nested Interfaces', content: `**Practice:**\n\`\`\`typescript\ninterface Address {\n  street: string;\n  city: string;\n  country: string;\n}\n\ninterface User {\n  name: string;\n  address: Address;\n  contacts: {\n    email: string;\n    phone: string;\n  };\n}\n\nconst user: User = {\n  name: "John",\n  address: {\n    street: "123 Main St",\n    city: "NYC",\n    country: "US"\n  },\n  contacts: {\n    email: "john@example.com",\n    phone: "555-1234"\n  }\n};\n\`\`\`` },
      { id: 'mixins', title: 'Interface Mixins', content: `**Practice:**\n\`\`\`typescript\n// Constructor type\ntype Constructor<T = {}> = new (...args: any[]) => T;\n\n// Mixin interfaces\ninterface Serializable {\n  serialize(): string;\n}\n\ninterface Loggable {\n  log(message: string): void;\n}\n\n// Mixin function\nfunction SerializableMixin<TBase extends Constructor>(Base: TBase) {\n  return class extends Base implements Serializable {\n    serialize() {\n      return JSON.stringify(this);\n    }\n  };\n}\n\nfunction LoggableMixin<TBase extends Constructor>(Base: TBase) {\n  return class extends Base implements Loggable {\n    log(message: string) {\n      console.log(\`[\${this.constructor.name}] \${message}\`);\n    }\n  };\n}\n\n// Usage\nclass User {\n  constructor(public name: string) {}\n}\n\nconst EnhancedUser = SerializableMixin(LoggableMixin(User));\nconst user = new EnhancedUser("John");\nuser.log("Created");\nconsole.log(user.serialize());\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does an index signature like `[key: string]: string` allow in an interface?',
        options: [
          'Only predefined properties',
          'Any property with string keys and string values',
          'Only numeric keys',
          'Only symbol keys'
        ],
        correctIndex: 1,
        explanation: 'An index signature with `[key: string]: string` allows any property with a string key, as long as its value is a string.'
      },
      {
        id: 2,
        question: 'What is declaration merging in TypeScript?',
        options: [
          'Combining two different types into one',
          'Automatically merging multiple interface declarations with the same name',
          'Converting a type alias to an interface',
          'Merging two objects at runtime'
        ],
        correctIndex: 1,
        explanation: 'Declaration merging occurs when multiple interface declarations with the same name are automatically combined into a single interface.'
      },
      {
        id: 3,
        question: 'What is the purpose of a mixin in TypeScript?',
        options: [
          'To replace class inheritance entirely',
          'To compose behaviors from multiple sources into a class',
          'To create abstract classes',
          'To define private constructors'
        ],
        correctIndex: 1,
        explanation: 'Mixins allow you to compose behaviors from multiple sources by creating functions that take a base class and return an extended version of it.'
      }
    ]
  },
  {
    id: 207, slug: 'ts-generics-advanced', title: 'Advanced Generics',
    description: 'Master advanced generic patterns.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use generic constraints', 'Apply defaults', 'Master inference'],
    topics: [
      { id: 'deep-constraints', title: 'Deep Constraints', content: `**Practice:**\n\`\`\`typescript\n// Nested property access\nfunction getNestedValue<T, K1 extends keyof T, K2 extends keyof T[K1]>(\n  obj: T,\n  key1: K1,\n  key2: K2\n): T[K1][K2] {\n  return obj[key1][key2];\n}\n\nconst user = {\n  address: {\n    city: "NYC"\n  }\n};\n\ngetNestedValue(user, "address", "city"); // "NYC"\n\`\`\`` },
      { id: 'generic-defaults', title: 'Generic Defaults', content: `**Practice:**\n\`\`\`typescript\n// Default type parameters\ninterface ApiResponse<T = unknown> {\n  data: T;\n  status: number;\n  message: string;\n}\n\n// Uses default\ntype BasicResponse = ApiResponse;\n// { data: unknown; status: number; message: string }\n\n// Overrides default\ntype UserResponse = ApiResponse<User>;\n// { data: User; status: number; message: string }\n\n// Multiple defaults\ninterface Map<K = string, V = number> {\n  get(key: K): V;\n  set(key: K, value: V): void;\n}\n\`\`\`` },
      { id: 'type-inference-generics', title: 'Type Inference in Generics', content: `**Practice:**\n\`\`\`typescript\n// inferred type from usage\nfunction create<T>(value: T): { value: T } {\n  return { value };\n}\n\nconst result = create("hello"); // inferred as { value: string }\nconst num = create(42); // inferred as { value: number }\n\n// inferring from constraints\nfunction pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {\n  return keys.map(key => obj[key]);\n}\n\nconst user = { name: "John", age: 30, email: "john@example.com" };\nconst values = pluck(user, ["name", "age"]); // string | number[]\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does a deep constraint like `K2 extends keyof T[K1]` allow?',
        options: [
          'Accessing any property on any object',
          'Safely accessing nested properties with type checking',
          'Creating new properties dynamically',
          'Bypassing type checking entirely'
        ],
        correctIndex: 1,
        explanation: 'Deep constraints allow you to type-check nested property access at compile time, ensuring the keys exist at each level of the object.'
      },
      {
        id: 2,
        question: 'What happens when you call `ApiResponse` without a type argument if it has a default `T = unknown`?',
        options: [
          'It causes a compile error',
          'T defaults to `unknown`',
          'T defaults to `any`',
          'T defaults to `never`'
        ],
        correctIndex: 1,
        explanation: 'When a generic type parameter has a default value and no type argument is provided, the default is used. Here, `T` becomes `unknown`.'
      },
      {
        id: 3,
        question: 'In `function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][]`, what type does the return value have?',
        options: [
          'T[]',
          'K[]',
          'An array of the value types corresponding to the specified keys',
          'any[]'
        ],
        correctIndex: 2,
        explanation: 'The return type `T[K][]` is a mapped type that produces an array of the value types for each key K in the keys array.'
      }
    ]
  },
  {
    id: 208, slug: 'ts-utility-types-advanced', title: 'Advanced Utility Types',
    description: 'Master advanced built-in utility types.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Use Extract/Exclude', 'Apply ReturnType', 'Master Parameters'],
    topics: [
      { id: 'extract-exclude', title: 'Extract & Exclude', content: `**Practice:**\n\`\`\`typescript\n// Exclude - remove types from union\ntype Numbers = number | string | boolean;\ntype OnlyNumbers = Exclude<Numbers, string | boolean>; // number\n\n// Extract - get types from union\ntype Mixed = number | string | boolean;\ntype OnlyStrings = Extract<Mixed, string>; // string\n\n// NonNullable\n\ntype Nullable = string | null | undefined;\ntype Clean = NonNullable<Nullable>; // string\n\n// Real-world usage\ninterface ApiResponse {\n  data: string | null;\n  error: string | undefined;\n}\n\ntype SuccessResponse = {\n  [K in keyof ApiResponse]: Exclude<ApiResponse[K], null | undefined>;\n};\n// { data: string; error: string }\n\`\`\`` },
      { id: 'returntype-parameters', title: 'ReturnType & Parameters', content: `**Practice:**\n\`\`\`typescript\nfunction createUser(name: string, age: number) {\n  return { name, age, createdAt: new Date() };\n}\n\n// ReturnType - extract return type\ntype User = ReturnType<typeof createUser>;\n// { name: string; age: number; createdAt: Date }\n\n// Parameters - extract parameter types\ntype UserParams = Parameters<typeof createUser>;\n// [name: string, age: number]\n\n// ConstructorParameters\nclass User {\n  constructor(public name: string, public age: number) {}\n}\n\ntype UserConstructor = ConstructorParameters<typeof User>;\n// [name: string, age: number]\n\`\`\`` },
      { id: 'instance-type', title: 'InstanceType', content: `**Practice:**\n\`\`\`typescript\nclass HttpClient {\n  constructor(public baseUrl: string) {}\n  get(url: string) { return fetch(this.baseUrl + url); }\n}\n\n// InstanceType - extract instance type\ntype Client = InstanceType<typeof HttpClient>;\n// HttpClient\n\n// Usage in dependency injection\nfunction createClient<T extends new (...args: any[]) => any>(\n  Constructor: T,\n  ...args: ConstructorParameters<T>\n): InstanceType<T> {\n  return new Constructor(...args);\n}\n\nconst client = createClient(HttpClient, "https://api.example.com");\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does `Exclude<string | number | boolean, string | boolean>` resolve to?',
        options: ['string | number', 'number', 'boolean', 'never'],
        correctIndex: 1,
        explanation: '`Exclude` removes the specified types from the union. Removing `string | boolean` from `string | number | boolean` leaves `number`.'
      },
      {
        id: 2,
        question: 'What does `ReturnType<typeof createUser>` extract?',
        options: [
          'The parameter types of createUser',
          'The return type of the createUser function',
          'The function signature of createUser',
          'The instance type of createUser'
        ],
        correctIndex: 1,
        explanation: '`ReturnType` extracts the return type of a function type. `typeof createUser` gets the function type, and `ReturnType` pulls out what it returns.'
      },
      {
        id: 3,
        question: 'How does `Parameters<typeof createUser>` differ from `ReturnType<typeof createUser>`?',
        options: [
          'They are the same',
          'Parameters extracts argument types, ReturnType extracts the return type',
          'Parameters extracts the function name, ReturnType extracts the body',
          'Parameters works only with classes'
        ],
        correctIndex: 1,
        explanation: '`Parameters` extracts the parameter types as a tuple, while `ReturnType` extracts what the function returns.'
      }
    ]
  },
  {
    id: 209, slug: 'ts-type-guards', title: 'Type Guards',
    description: 'Master type guards and narrowing.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Use typeof', 'Apply instanceof', 'Create custom guards', 'Master in operator'],
    topics: [
      { id: 'typeof', title: 'typeof Guards', content: `**Practice:**\n\`\`\`typescript\nfunction processValue(value: string | number | boolean) {\n  if (typeof value === "string") {\n    return value.toUpperCase();\n  } else if (typeof value === "number") {\n    return value.toFixed(2);\n  } else {\n    return value ? "Yes" : "No";\n  }\n}\n\n// typeof with union\ntype StringOrNumber = string | number;\n\nfunction isString(value: StringOrNumber): value is string {\n  return typeof value === "string";\n}\n\nconst value: StringOrNumber = "hello";\nif (isString(value)) {\n  console.log(value.toUpperCase()); // safe\n}\n\`\`\`` },
      { id: 'instanceof', title: 'instanceof Guards', content: `**Practice:**\n\`\`\`typescript\nclass HttpError extends Error {\n  constructor(public statusCode: number, message: string) {\n    super(message);\n  }\n}\n\nclass ValidationError extends Error {\n  constructor(public field: string, message: string) {\n    super(message);\n  }\n}\n\nfunction handleError(error: Error) {\n  if (error instanceof HttpError) {\n    console.log(\`HTTP \${error.statusCode}: \${error.message}\`);\n  } else if (error instanceof ValidationError) {\n    console.log(\`Validation error in \${error.field}: \${error.message}\`);\n  } else {\n    console.log(\`Unknown error: \${error.message}\`);\n  }\n}\n\`\`\`` },
      { id: 'custom-guards', title: 'Custom Type Guards', content: `**Practice:**\n\`\`\`typescript\ninterface Cat {\n  type: "cat";\n  meow(): void;\n}\n\ninterface Dog {\n  type: "dog";\n  bark(): void;\n}\n\nfunction isCat(animal: Cat | Dog): animal is Cat {\n  return animal.type === "cat";\n}\n\nfunction handleAnimal(animal: Cat | Dog) {\n  if (isCat(animal)) {\n    animal.meow(); // safe\n  } else {\n    animal.bark(); // safe\n  }\n}\n\n// Assertion function\nfunction assertIsString(value: unknown): asserts value is string {\n  if (typeof value !== "string") {\n    throw new Error("Expected string");\n  }\n}\n\nfunction process(data: unknown) {\n  assertIsString(data);\n  console.log(data.toUpperCase()); // safe\n}\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the `typeof` type guard check?',
        options: [
          'Whether a value is an instance of a class',
          'The primitive type of a value at runtime',
          'Whether a value implements an interface',
          'The prototype chain of a value'
        ],
        correctIndex: 1,
        explanation: '`typeof` checks the runtime type of a primitive value. It works with `string`, `number`, `boolean`, `undefined`, `function`, and `symbol`.'
      },
      {
        id: 2,
        question: 'What is the return type syntax for a custom type guard?',
        options: [
          'boolean',
          'animal is Cat',
          'Cat | Dog',
          'typeof animal'
        ],
        correctIndex: 1,
        explanation: 'A custom type guard uses the `is` keyword in the return type (e.g., `animal is Cat`) to tell TypeScript what type has been narrowed.'
      },
      {
        id: 3,
        question: 'When should you use `instanceof` over `typeof` for type narrowing?',
        options: [
          'When checking primitive types',
          'When checking class instances and their prototype chain',
          'When checking for null or undefined',
          'When checking for union types only'
        ],
        correctIndex: 1,
        explanation: '`instanceof` checks the prototype chain and works with class instances. It can distinguish between different classes in a union type.'
      }
    ]
  },
  {
    id: 210, slug: 'ts-enums-const', title: 'Enums & Const Enums',
    description: 'Master enums and const enums.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Use enums', 'Apply const enums', 'Master string enums'],
    topics: [
      { id: 'basic-enums', title: 'Basic Enums', content: `**Practice:**\n\`\`\`typescript\n// Numeric enum\nenum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right  // 3\n}\n\nconst dir: Direction = Direction.Up;\nconsole.log(dir); // 0\n\n// String enum\nenum Status {\n  Loading = "LOADING",\n  Success = "SUCCESS",\n  Error = "ERROR"\n}\n\nconst status: Status = Status.Loading;\nconsole.log(status); // "LOADING"\n\`\`\`` },
      { id: 'const-enums', title: 'Const Enums', content: `**Practice:**\n\`\`\`typescript\n// Const enum - inlined at compile time\nconst enum Color {\n  Red = "RED",\n  Green = "GREEN",\n  Blue = "BLUE"\n}\n\nconst color: Color = Color.Red;\n// Compiles to: const color = "RED";\n\n// When to use\n// 1. Performance-critical code\n// 2. When you want enum values inlined\n// 3. When you don't need reverse mapping\n\`\`\`` },
      { id: 'enum-patterns', title: 'Enum Patterns', content: `Enum as namespace:\n\nenum MathUtils {\n  PI = 3.14159,\n  E = 2.71828\n}\n\nnamespace MathUtils {\n  export function circleArea(radius: number): number {\n    return MathUtils.PI * (radius * radius);\n  }\n}\n\nEnum with methods:\n\nenum HttpMethod {\n  GET = "GET",\n  POST = "POST",\n  PUT = "PUT",\n  DELETE = "DELETE"\n}\n\nfunction isHttpMethod(value: string): value is HttpMethod {\n  return Object.values(HttpMethod).includes(value as HttpMethod);\n}\n\nfunction fetchWithMethod(method: HttpMethod, url: string) {\n  return fetch(url, { method });\n}` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What are the default values for a numeric enum like `enum Direction { Up, Down, Left, Right }`?',
        options: [
          '1, 2, 3, 4',
          '0, 1, 2, 3',
          'undefined for all',
          'Random values'
        ],
        correctIndex: 1,
        explanation: 'Numeric enums auto-increment starting from 0. `Up` is 0, `Down` is 1, `Left` is 2, `Right` is 3.'
      },
      {
        id: 2,
        question: 'What is the key advantage of a `const enum` over a regular enum?',
        options: [
          'It allows reverse mapping',
          'It is inlined at compile time for better performance',
          'It supports string values',
          'It can be used with `typeof`'
        ],
        correctIndex: 1,
        explanation: 'A `const enum` is completely removed during compilation and its values are inlined at usage sites, resulting in no runtime overhead.'
      },
      {
        id: 3,
        question: 'Can you use `Object.values()` with a `const enum`?',
        options: [
          'Yes, always',
          'No, because const enums are inlined and have no runtime object',
          'Only in Node.js',
          'Only with string enums'
        ],
        correctIndex: 1,
        explanation: 'Const enums are inlined at compile time and do not produce a runtime JavaScript object, so `Object.values()` cannot be used with them.'
      }
    ]
  },
  {
    id: 211, slug: 'ts-modules-namespaces', title: 'Modules & Namespaces',
    description: 'Master TypeScript modules and namespaces.',
    level: 'intermediate', duration: '25 min',
    objectives: ['Use ES modules', 'Apply namespaces', 'Master ambient declarations'],
    topics: [
      { id: 'es-modules', title: 'ES Modules', content: `**Practice:**\n\`\`\`typescript\n// Named exports\nexport interface User {\n  name: string;\n  age: number;\n}\n\nexport function createUser(name: string, age: number): User {\n  return { name, age };\n}\n\n// Default export\nexport default class UserService {\n  getUser(id: string): User {\n    // ...\n  }\n}\n\n// Import\nimport UserService, { User, createUser } from "./user";\n\`\`\`` },
      { id: 'namespaces', title: 'Namespaces', content: `**Practice:**\n\`\`\`typescript\n// Declaration merging\nnamespace Validation {\n  export interface StringValidator {\n    isAcceptable(s: string): boolean;\n  }\n}\n\nnamespace Validation {\n  export class LettersOnlyValidator implements StringValidator {\n    isAcceptable(s: string) {\n      return /^[A-Za-z]+$/.test(s);\n    }\n  }\n}\n\n// Usage\nconst validator = new Validation.LettersOnlyValidator();\n\`\`\`` },
      { id: 'ambient', title: 'Ambient Declarations', content: `**Practice:**\n\`\`\`typescript\n// .d.ts file\ndeclare module "my-library" {\n  export function doSomething(x: string): number;\n  export interface Config {\n    debug: boolean;\n    timeout: number;\n  }\n}\n\n// Usage\nimport { doSomething } from "my-library";\n\n// Ambient namespace\ndeclare global {\n  interface Window {\n    myCustomProperty: string;\n  }\n}\n\nconsole.log(window.myCustomProperty);\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between a named export and a default export?',
        options: [
          'There is no difference',
          'A module can have multiple named exports but only one default export',
          'Default exports cannot be imported',
          'Named exports are always anonymous'
        ],
        correctIndex: 1,
        explanation: 'A module can have multiple named exports (imported with `{ name }`) but only one default export (imported without braces).'
      },
      {
        id: 2,
        question: 'What is the purpose of a `.d.ts` (declaration) file?',
        options: [
          'To provide runtime implementations',
          'To provide type information for JavaScript libraries without source code',
          'To define CSS styles',
          'To configure build settings'
        ],
        correctIndex: 1,
        explanation: 'Declaration files (`.d.ts`) provide type information for JavaScript code that was not written in TypeScript, enabling type checking.'
      },
      {
        id: 3,
        question: 'What is declaration merging in the context of namespaces?',
        options: [
          'Combining two files into one',
          'Automatically merging multiple namespace declarations with the same name',
          'Merging interfaces with classes',
          'Converting namespaces to modules'
        ],
        correctIndex: 1,
        explanation: 'Like interfaces, multiple namespace declarations with the same name are automatically merged, allowing you to split namespace definitions across the codebase.'
      }
    ]
  },
  {
    id: 212, slug: 'ts-mapped-types', title: 'Mapped Types',
    description: 'Master mapped types and transformations.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Create mapped types', 'Apply key remapping', 'Use modifiers'],
    topics: [
      { id: 'basic-mapping', title: 'Basic Mapping', content: `**Practice:**\n\`\`\`typescript\n// Basic mapped type\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ninterface User {\n  name: string;\n  age: number;\n}\n\ntype NullableUser = Nullable<User>;\n// { name: string | null; age: number | null }\n\n// Conditional mapped type\ntype Readonly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\ntype Mutable<T> = {\n  -readonly [K in keyof T]: T[K];\n};\n\`\`\`` },
      { id: 'key-remapping', title: 'Key Remapping', content: `**Practice:**\n\`\`\`typescript\n// Getters\ntype Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];\n};\n\ninterface User {\n  name: string;\n  age: number;\n}\n\ntype UserGetters = Getters<User>;\n// { getName: () => string; getAge: () => number }\n\n// Filters\ntype StringKeys<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};\n\ninterface Mixed {\n  name: string;\n  age: number;\n  email: string;\n}\n\ntype StringProps = StringKeys<Mixed>;\n// { name: string; email: string }\n\`\`\`` },
      { id: 'modifiers', title: 'Mapping Modifiers', content: `**Practice:**\n\`\`\`typescript\n// Remove readonly\nfunction Mutable<T>(obj: T): Mutable<T> {\n  return obj as Mutable<T>;\n}\n\n// Remove optional\nfunction Required<T>(obj: T): Required<T> {\n  return obj as Required<T>;\n}\n\n// Combined\ntype StrictUser = {\n  readonly [K in keyof User]-?: User[K];\n};\n\n// -? removes optionality\n// +? adds optionality\n// -readonly removes readonly\n// +readonly adds readonly\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the mapped type `{ [K in keyof T]?: T[K] }` produce?',
        options: [
          'A type with all properties required',
          'A type with all properties optional',
          'A type with all properties readonly',
          'A type with all properties removed'
        ],
        correctIndex: 1,
        explanation: 'The `?` modifier in a mapped type makes all properties optional. This is equivalent to the built-in `Partial<T>` utility type.'
      },
      {
        id: 2,
        question: 'What does key remapping with `as` allow you to do in a mapped type?',
        options: [
          'Delete properties from a type',
          'Rename or transform property keys',
          'Change property value types',
          'Add runtime methods to a type'
        ],
        correctIndex: 1,
        explanation: 'Key remapping with `as` lets you rename or transform property keys, such as creating getter names by prefixing with `get` and capitalizing.'
      },
      {
        id: 3,
        question: 'What does the `-?` modifier do in a mapped type?',
        options: [
          'Makes all properties optional',
          'Removes optionality, making properties required',
          'Makes all properties readonly',
          'Removes readonly modifier'
        ],
        correctIndex: 1,
        explanation: 'The `-?` modifier removes the optional modifier from all properties, making them required. Conversely, `+?` adds optionality.'
      }
    ]
  }
];

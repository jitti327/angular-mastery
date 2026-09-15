import { Lesson } from '../models/lesson.model';

export const TS_FOUNDATION_LESSONS: Lesson[] = [
  {
    id: 201, slug: 'ts-introduction', title: 'TypeScript Fundamentals',
    description: 'Master the core building blocks of TypeScript.',
    level: 'beginner', duration: '30 min',
    objectives: ['Understand type annotations', 'Master basic types', 'Learn type inference', 'Use interfaces'],
    topics: [
      { id: 'type-annotations', title: 'Type Annotations', content: `**Practice:**\n\`\`\`typescript\n// Basic annotations\nlet name: string = "John";\nlet age: number = 30;\nlet isStudent: boolean = false;\nlet scores: number[] = [90, 85, 95];\n\n// Function annotations\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\n// Arrow function\nconst add = (a: number, b: number): number => a + b;\n\n// Return type inference\nconst multiply = (a: number, b: number) => a * b; // inferred as number\n\`\`\`` },
      { id: 'basic-types', title: 'Basic Types', content: `**Practice:**\n\`\`\`typescript\n// Primitive types\nlet str: string = "hello";\nlet num: number = 42;\nlet bool: boolean = true;\nlet nothing: null = null;\nlet undef: undefined = undefined;\n\n// Special types\nlet anything: any = "can be anything";\nlet unknown: unknown = "safer any";\nlet never: never; // never returns\nlet voidFunc: void = undefined; // no return\n\n// Tuple\nlet tuple: [string, number] = ["John", 30];\n\n// Enum\nenum Direction {\n  Up = "UP",\n  Down = "DOWN",\n  Left = "LEFT",\n  Right = "RIGHT"\n}\nconst dir: Direction = Direction.Up;\n\`\`\`` },
      { id: 'interfaces', title: 'Interfaces', content: `**Practice:**\n\`\`\`typescript\n// Basic interface\ninterface User {\n  name: string;\n  age: number;\n  email?: string; // optional\n}\n\nconst user: User = {\n  name: "John",\n  age: 30\n};\n\n// Extending interfaces\ninterface Employee extends User {\n  employeeId: number;\n  department: string;\n}\n\nconst employee: Employee = {\n  name: "John",\n  age: 30,\n  employeeId: 123,\n  department: "Engineering"\n};\n\n// Interface for functions\ninterface Calculator {\n  (a: number, b: number): number;\n}\n\nconst add: Calculator = (a, b) => a + b;\n\`\`\`` },
      { id: 'type-inference', title: 'Type Inference', content: `**Practice:**\n\`\`\`typescript\n// TypeScript infers type\nlet x = 5; // inferred as number\nlet arr = [1, 2, 3]; // inferred as number[]\nlet obj = { name: "John" }; // inferred as { name: string }\n\n// Better inference with as const\nconst config = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000\n} as const; // readonly, literal types\n\n// Return type inference\nfunction getFullName(first: string, last: string) {\n  return \`\${first} \${last}\`; // inferred as string\n}\n\n// Avoid any, prefer unknown\nlet data: unknown = fetchData();\nif (typeof data === "string") {\n  console.log(data.toUpperCase()); // safe\n}\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the inferred type of the variable `x` in `let x = 10;`?',
        options: ['string', 'number', 'any', 'unknown'],
        correctIndex: 1,
        explanation: 'TypeScript infers `x` as `number` because 10 is a numeric literal.'
      },
      {
        id: 2,
        question: 'Which type should be preferred over `any` for values whose type is not yet known?',
        options: ['void', 'never', 'unknown', 'object'],
        correctIndex: 2,
        explanation: '`unknown` is the type-safe counterpart to `any`. It forces you to check the type before using the value.'
      },
      {
        id: 3,
        question: 'What does the `as const` assertion do to object properties?',
        options: ['Makes them optional', 'Makes them readonly with literal types', 'Converts them to strings', 'Makes them nullable'],
        correctIndex: 1,
        explanation: '`as const` makes all properties `readonly` and infers literal types instead of broad types like `string` or `number`.'
      }
    ]
  },
  {
    id: 202, slug: 'ts-interfaces-types', title: 'Interfaces & Type Aliases',
    description: 'Master interfaces, type aliases, and their differences.',
    level: 'beginner', duration: '30 min',
    objectives: ['Create interfaces', 'Use type aliases', 'Understand differences', 'Apply intersections'],
    topics: [
      { id: 'type-aliases', title: 'Type Aliases', content: `**Practice:**\n\`\`\`typescript\n// Basic type alias\ntype ID = string | number;\ntype Point = { x: number; y: number };\n\n// Function type\ntype Callback = (data: string) => void;\n\n// Generic type\ntype Response<T> = {\n  data: T;\n  status: number;\n  message: string;\n};\n\nconst userResponse: Response<User> = {\n  data: user,\n  status: 200,\n  message: "Success"\n};\n\n// Mapped type\ntype Optional<T> = {\n  [K in keyof T]?: T[K];\n};\n\`\`\`` },
      { id: 'intersections', title: 'Intersections & Unions', content: `**Practice:**\n\`\`\`typescript\n// Intersection (AND)\ntype A = { name: string };\ntype B = { age: number };\ntype C = A & B; // { name: string; age: number }\n\n// Union (OR)\ntype Status = "loading" | "success" | "error";\ntype Result = string | number;\n\n// Discriminated union\ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "rectangle"; width: number; height: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "rectangle":\n      return shape.width * shape.height;\n  }\n}\n\`\`\`` },
      { id: 'differences', title: 'Interface vs Type', content: `**Practice:**\n\`\`\`typescript\n// Interface: extends\ninterface Animal {\n  name: string;\n}\n\ninterface Dog extends Animal {\n  breed: string;\n}\n\n// Type: intersections\ntype Animal = {\n  name: string;\n};\n\ntype Dog = Animal & {\n  breed: string;\n};\n\n// Interface: declaration merging\ninterface User {\n  name: string;\n}\n\ninterface User {\n  age: number;\n}\n\n// User has both name and age\n\n// Type: no merging\ntype User = {\n  name: string;\n};\n\n// Error: Duplicate identifier\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the key difference between an intersection (`&`) and a union (`|`) type?',
        options: [
          'Intersection combines all types (AND), union allows any one type (OR)',
          'Intersection allows any one type, union combines all types',
          'Both are the same thing',
          'Intersection is for primitives, union is for objects'
        ],
        correctIndex: 0,
        explanation: 'An intersection (`A & B`) requires a value to satisfy ALL types. A union (`A | B`) requires a value to satisfy ANY one of the types.'
      },
      {
        id: 2,
        question: 'Which feature is supported by interfaces but NOT by type aliases?',
        options: ['Optional properties', 'Union types', 'Declaration merging', 'Intersection types'],
        correctIndex: 2,
        explanation: 'Interfaces support declaration merging, where multiple declarations of the same interface are automatically combined. Type aliases cannot do this.'
      },
      {
        id: 3,
        question: 'How do you extend an interface in TypeScript?',
        options: ['Using `&` operator', 'Using `extends` keyword', 'Using `implements` keyword', 'Using `merge` keyword'],
        correctIndex: 1,
        explanation: 'Interfaces use `extends` to inherit from other interfaces. Type aliases use the `&` intersection operator for a similar effect.'
      }
    ]
  },
  {
    id: 203, slug: 'ts-functions', title: 'Functions in TypeScript',
    description: 'Master typed functions and function overloads.',
    level: 'beginner', duration: '35 min',
    objectives: ['Type function parameters', 'Use optional parameters', 'Master overloads', 'Apply generics'],
    topics: [
      { id: 'function-types', title: 'Function Types', content: `**Practice:**\n\`\`\`typescript\n// Function type\ntype MathFn = (a: number, b: number) => number;\n\nconst add: MathFn = (a, b) => a + b;\nconst subtract: MathFn = (a, b) => a - b;\n\n// Interface for function\ninterface Comparator<T> {\n  (a: T, b: T): number;\n}\n\nconst numberComparator: Comparator<number> = (a, b) => a - b;\nconst stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);\n\`\`\`` },
      { id: 'optional-default', title: 'Optional & Default Parameters', content: `**Practice:**\n\`\`\`typescript\n// Optional parameters\nfunction greet(name: string, greeting?: string): string {\n  return \`\${greeting || "Hello"}, \${name}!\`;\n}\n\ngreet("John"); // "Hello, John!"\ngreet("John", "Hi"); // "Hi, John!"\n\n// Default parameters\nfunction createUser(\n  name: string,\n  role: string = "user",\n  active: boolean = true\n) {\n  return { name, role, active };\n}\n\ncreateUser("John"); // { name: "John", role: "user", active: true }\ncreateUser("Admin", "admin"); // { name: "Admin", role: "admin", active: true }\n\`\`\`` },
      { id: 'overloads', title: 'Function Overloads', content: `**Practice:**\n\`\`\`typescript\n// Overload signatures\nfunction format(value: string): string;\nfunction format(value: number): string;\nfunction format(value: Date): string;\n\n// Implementation\nfunction format(value: string | number | Date): string {\n  if (typeof value === "string") {\n    return value.toUpperCase();\n  } else if (typeof value === "number") {\n    return value.toFixed(2);\n  } else {\n    return value.toISOString();\n  }\n}\n\nformat("hello"); // "HELLO"\nformat(3.14159); // "3.14"\nformat(new Date()); // "2024-01-15T..."\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the correct order for function parameters when mixing required, optional, and default parameters?',
        options: [
          'Optional, required, default',
          'Default, optional, required',
          'Required, optional, default',
          'Required, default, optional'
        ],
        correctIndex: 2,
        explanation: 'Required parameters must come first, followed by optional parameters, and then parameters with default values.'
      },
      {
        id: 2,
        question: 'What does a function overload in TypeScript provide?',
        options: [
          'Multiple function implementations',
          'Multiple call signatures with a single implementation',
          'Runtime polymorphism',
          'Multiple return types'
        ],
        correctIndex: 1,
        explanation: 'Function overloads provide multiple call signatures that TypeScript uses for type checking, but there is only one implementation that handles all cases.'
      },
      {
        id: 3,
        question: 'Given `function greet(name: string, greeting?: string): string`, which call is valid?',
        options: [
          'greet()',
          'greet("John")',
          'greet("John", "Hi", true)',
          'greet(undefined, "Hi")'
        ],
        correctIndex: 1,
        explanation: 'The first parameter `name` is required, so it must be provided. The second parameter `greeting` is optional and can be omitted.'
      }
    ]
  },
  {
    id: 204, slug: 'ts-generics', title: 'Generics',
    description: 'Master generics for reusable, type-safe code.',
    level: 'beginner', duration: '35 min',
    objectives: ['Create generic functions', 'Use constraints', 'Apply defaults', 'Master utility types'],
    topics: [
      { id: 'generic-functions', title: 'Generic Functions', content: `**Practice:**\n\`\`\`typescript\n// Basic generic\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nidentity<string>("hello"); // "hello"\nidentity<number>(42); // 42\nidentity("hello"); // inferred as string\n\n// Multiple type params\nfunction pair<T, U>(first: T, second: U): [T, U] {\n  return [first, second];\n}\n\npair("hello", 42); // ["hello", 42]\n\`\`\`` },
      { id: 'constraints', title: 'Generic Constraints', content: `**Practice:**\n\`\`\`typescript\n// extends keyword\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { name: "John", age: 30 };\ngetProperty(user, "name"); // "John"\ngetProperty(user, "age"); // 30\n// getProperty(user, "email"); // Error!\n\n// interface constraint\ninterface HasLength {\n  length: number;\n}\n\nfunction logLength<T extends HasLength>(value: T): void {\n  console.log(value.length);\n}\n\nlogLength("hello"); // 5\nlogLength([1, 2, 3]); // 3\n// logLength(123); // Error! number has no length\n\`\`\`` },
      { id: 'utility-types', title: 'Utility Types', content: `**Practice:**\n\`\`\`typescript\ninterface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Partial - all optional\nconst updateUser: Partial<User> = { name: "John" };\n\n// Required - all required\ntype StrictUser = Required<User>;\n\n// Pick - select properties\ntype UserName = Pick<User, "name">;\n\n// Omit - exclude properties\nconst userWithoutEmail: Omit<User, "email"> = {\n  name: "John",\n  age: 30\n};\n\n// Record\ntype Users = Record<string, User>;\nconst users: Users = {\n  "1": { name: "John", age: 30, email: "john@example.com" }\n};\n\n// Readonly\nconst readonlyUser: Readonly<User> = {\n  name: "John", age: 30, email: "john@example.com"\n};\n// readonlyUser.name = "Jane"; // Error!\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the `extends` keyword do in a generic constraint like `<T extends HasLength>`?',
        options: [
          'Makes T inherit from HasLength at runtime',
          'Restricts T to types that have a `length` property',
          'Creates a union of T and HasLength',
          'Converts T to an interface'
        ],
        correctIndex: 1,
        explanation: 'Generic constraints with `extends` restrict the type parameter to types that satisfy the constraint. `T extends HasLength` means T must have a `length` property.'
      },
      {
        id: 2,
        question: 'What is the purpose of the `Partial<T>` utility type?',
        options: [
          'Makes all properties required',
          'Makes all properties optional',
          'Makes all properties readonly',
          'Picks specific properties from T'
        ],
        correctIndex: 1,
        explanation: '`Partial<T>` creates a type with all properties of T made optional. It is useful for update operations where not all fields need to be provided.'
      },
      {
        id: 3,
        question: 'What does `keyof T` return in a generic constraint?',
        options: [
          'The values of T',
          'A union of all property keys of T',
          'The length of T',
          'The type of T'
        ],
        correctIndex: 1,
        explanation: '`keyof T` returns a union of all property key names (as string literal types) of the type T.'
      }
    ]
  },
  {
    id: 205, slug: 'ts-advanced-types', title: 'Advanced Types',
    description: 'Master advanced TypeScript type features.',
    level: 'beginner', duration: '35 min',
    objectives: ['Use conditional types', 'Apply mapped types', 'Master template literals', 'Use infer keyword'],
    topics: [
      { id: 'conditional-types', title: 'Conditional Types', content: `**Practice:**\n\`\`\`typescript\n// Basic conditional type\ntype IsString<T> = T extends string ? true : false;\n\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false\n\n// Extracting types\ntype ElementType<T> = T extends (infer U)[] ? U : T;\n\ntype Numbers = ElementType<number[]>; // number\ntype String = ElementType<string>; // string\n\n// Distributive conditional type\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\ntype A = NonNullable<string | null>; // string\ntype B = NonNullable<number | undefined>; // number\n\`\`\`` },
      { id: 'mapped-types', title: 'Mapped Types', content: `**Practice:**\n\`\`\`typescript\n// Basic mapped type\ntype Optional<T> = {\n  [K in keyof T]?: T[K];\n};\n\ntype User = { name: string; age: number };\ntype OptionalUser = Optional<User>;\n\n// Modifiers\ntype ReadOnly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\ntype Mutable<T> = {\n  -readonly [K in keyof T]: T[K];\n};\n\n// Key remapping\ntype Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];\n};\n\ntype UserGetters = Getters<User>;\n// { getName: () => string; getAge: () => number }\n\`\`\`` },
      { id: 'template-literals', title: 'Template Literal Types', content: `**Practice:**\n\`\`\`typescript\n// Basic template literal type\ntype Greeting = \`Hello, \${string}\`;\nconst g: Greeting = "Hello, World"; // OK\n// const g: Greeting = "Hi, World"; // Error\n\n// Union in template literal type\ntype Color = "red" | "blue" | "green";\ntype Size = "small" | "medium" | "large";\ntype ColorSize = \`\${Color}-\${Size}\`;\n// "red-small" | "red-medium" | "red-large" | ...\n\n// Inferred template literal type\ntype ParseName<T extends string> =\n  T extends \`\${infer First} \${infer Last}\`\n    ? { first: First; last: Last }\n    : { first: T; last: never };\n\ntype Name = ParseName<"John Doe">;\n// { first: "John"; last: "Doe" }\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does a conditional type like `T extends string ? "yes" : "no"` evaluate to when T is `number`?',
        options: ['"yes"', '"no"', 'string', 'never'],
        correctIndex: 1,
        explanation: 'When T is `number`, the condition `number extends string` is false, so the type evaluates to the false branch: `"no"`.'
      },
      {
        id: 2,
        question: 'What is the purpose of the `infer` keyword in conditional types?',
        options: [
          'It creates a new variable at runtime',
          'It infers/extracts a type within a conditional type branch',
          'It makes a type optional',
          'It asserts a type is correct'
        ],
        correctIndex: 1,
        explanation: 'The `infer` keyword declares a type variable within the extends clause of a conditional type, allowing you to extract and reuse a type.'
      },
      {
        id: 3,
        question: 'What does the mapped type `{ [K in keyof T]?: T[K] }` produce?',
        options: [
          'A type with all properties required',
          'A type with all properties optional',
          'A type with all properties readonly',
          'A type with all properties removed'
        ],
        correctIndex: 1,
        explanation: 'The `?` modifier in a mapped type makes all properties optional. This is equivalent to `Partial<T>`.'
      }
    ]
  }
];

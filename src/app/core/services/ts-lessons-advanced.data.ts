import { Lesson } from '../models/lesson.model';

export const TS_ADVANCED_LESSONS: Lesson[] = [
  {
    id: 213, slug: 'ts-conditional-types', title: 'Conditional Types',
    description: 'Master conditional types and type-level programming.',
    level: 'advanced', duration: '35 min',
    objectives: ['Create conditional types', 'Use infer keyword', 'Master distributive types'],
    topics: [
      { id: 'basic-conditional', title: 'Basic Conditional Types', content: `**Practice:**\n\`\`\`typescript\n// Basic conditional type\ntype IsString<T> = T extends string ? "yes" : "no";\n\ntype A = IsString<string>; // "yes"\ntype B = IsString<number>; // "no"\n\n// Nested conditional types\ntype TypeName<T> =\n  T extends string ? "string" :\n  T extends number ? "number" :\n  T extends boolean ? "boolean" :\n  T extends undefined ? "undefined" :\n  T extends Function ? "function" :\n  "object";\n\ntype A = TypeName<string>; // "string"\ntype B = TypeName<() => void>; // "function"\n\`\`\`` },
      { id: 'infer-keyword', title: 'Infer Keyword', content: `**Practice:**\n\`\`\`typescript\n// Extract function return type\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\ntype A = ReturnType<() => string>; // string\ntype B = ReturnType<(x: number) => boolean>; // boolean\n\n// Extract array element type\ntype ElementOf<T> = T extends (infer E)[] ? E : never;\n\ntype A = ElementOf<string[]>; // string\ntype B = ElementOf<number[]>; // number\n\n// Extract promise type\ntype Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;\n\ntype A = Awaited<Promise<string>>; // string\ntype B = Awaited<Promise<Promise<number>>>; // number\n\`\`\`` },
      { id: 'distributive', title: 'Distributive Conditional Types', content: `**Practice:**\n\`\`\`typescript\n// Distributive type\ntype ToArray<T> = T extends any ? T[] : never;\n\ntype A = ToArray<string | number>; // string[] | number[]\n\n// Non-distributive (wrap in tuple)\ntype ToArrayNonDist<T> = [T] extends [any] ? T[] : never;\n\ntype A = ToArrayNonDist<string | number>; // (string | number)[]\n\n// Real-world usage\ntype NonNullable<T> = [T] extends [null | undefined] ? never : T;\n\ntype A = NonNullable<string | null>; // string\ntype B = NonNullable<number | undefined>; // number\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does a conditional type like `T extends string ? "yes" : "no"` do when T is `string | number`?',
        options: [
          'Evaluates to "yes"',
          'Evaluates to "no"',
          'Distributes, producing `"yes" | "no"`',
          'Causes a compile error'
        ],
        correctIndex: 2,
        explanation: 'Conditional types are distributive over unions. When T is `string | number`, it distributes: `string extends string ? "yes" : "no"` produces `"yes"`, and `number extends string ? "yes" : "no"` produces `"no"`, resulting in `"yes" | "no"`.'
      },
      {
        id: 2,
        question: 'What does `infer` do in `T extends (infer U)[] ? U : T`?',
        options: [
          'Creates a new class',
          'Infers/extracts the element type from an array type',
          'Forces a type assertion',
          'Declares a runtime variable'
        ],
        correctIndex: 1,
        explanation: 'The `infer` keyword declares a type variable within a conditional type. Here, `infer U` captures the element type of the array.'
      },
      {
        id: 3,
        question: 'How do you prevent distribution in a conditional type?',
        options: [
          'Use the `never` type',
          'Wrap the type parameter in a tuple like `[T] extends [X]`',
          'Use `as const`',
          'Use the `!` operator'
        ],
        correctIndex: 1,
        explanation: 'Wrapping the type parameter in a tuple (`[T] extends [X]`) prevents the conditional type from distributing over union members.'
      }
    ]
  },
  {
    id: 214, slug: 'ts-template-literal-types', title: 'Template Literal Types',
    description: 'Master template literal types for string manipulation.',
    level: 'advanced', duration: '30 min',
    objectives: ['Create template literal types', 'Use unions', 'Apply string manipulation'],
    topics: [
      { id: 'basic-template', title: 'Basic Template Literals', content: `**Practice:**\n\`\`\`typescript\n// Basic template literal type\ntype Name = "John";\ntype Greeting = \`Hello, \${Name}\`; // "Hello, John"\n\n// Union in template literal\ntype Color = "red" | "blue" | "green";\ntype Size = "small" | "medium" | "large";\ntype ColorSize = \`\${Color}-\${Size}\`;\n// "red-small" | "red-medium" | "red-large" | ...\n\n// Function with template literal type\nfunction createEvent<T extends string>(name: T): \`\${T}Event\` {\n  return \`\${name}Event\` as \`\${T}Event\`;\n}\n\nconst event = createEvent("click"); // "clickEvent"\n\`\`\`` },
      { id: 'string-manipulation', title: 'String Manipulation', content: `**Practice:**\n\`\`\`typescript\n// Capitalize\ntype UpperFirst<S extends string> = S extends \`\${infer First}\${infer Rest}\`\n  ? \`\${Uppercase<First>}\${Rest}\`\n  : S;\n\ntype A = UpperFirst<"hello">; // "Hello"\n\n// Uncapitalize\ntype LowerFirst<S extends string> = S extends \`\${infer First}\${infer Rest}\`\n  ? \`\${Lowercase<First>}\${Rest}\`\n  : S;\n\ntype A = LowerFirst<"Hello">; // "hello"\n\n// Snake to camelCase\ntype SnakeToCamel<S extends string> =\n  S extends \`\${infer Head}_\${infer Tail}\`\n    ? \`\${Head}\${SnakeToCamel<Capitalize<Tail>>}\`\n    : S;\n\ntype A = SnakeToCamel<"hello_world">; // "helloWorld"\ntype B = SnakeToCamel<"foo_bar_baz">; // "fooBarBaz"\n\`\`\`` },
      { id: 'inference-patterns', title: 'Inference Patterns', content: `**Practice:**\n\`\`\`typescript\n// Parse query string\ntype ParseQueryString<S extends string> =\n  S extends \`\${infer Key}=\${infer Value}&\${infer Rest}\`\n    ? { [K in Key]: Value } & ParseQueryString<Rest>\n    : S extends \`\${infer Key}=\${infer Value}\`\n      ? { [K in Key]: Value }\n      : {};\n\ntype Result = ParseQueryString<"name=John&age=30&city=NYC">;\n// { name: "John"; age: "30"; city: "NYC" }\n\n// Extract routes\ntype ExtractRoutes<T extends string> =\n  T extends \`/\${infer Segment}/\${infer Rest}\`\n    ? Segment | ExtractRoutes<\`/\${Rest}\`>\n    : T extends \`/\${infer Segment}\`\n      ? Segment\n      : never;\n\ntype Routes = ExtractRoutes<"/users/123/posts">;\n// "users" | "123" | "posts"\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What type does `\`${"red" | "blue"}-${"small" | "large"}\`` produce?',
        options: [
          'string',
          '"red-small" | "red-large" | "blue-small" | "blue-large"',
          '"redsmall" | "bluelarge"',
          'never'
        ],
        correctIndex: 1,
        explanation: 'Template literal types distribute over unions. Each combination of the union members is created: red-small, red-large, blue-small, blue-large.'
      },
      {
        id: 2,
        question: 'What does `Capitalize<string>` do in TypeScript template literal types?',
        options: [
          'Converts to lowercase',
          'Capitalizes the first letter of a string type',
          'Makes the string all uppercase',
          'Removes whitespace'
        ],
        correctIndex: 1,
        explanation: 'The `Capitalize` intrinsic string manipulation type capitalizes the first letter of a string literal type.'
      },
      {
        id: 3,
        question: 'What does `infer` allow you to do in a template literal conditional type?',
        options: [
          'Create new string values',
          'Extract parts of a string type into named type variables',
          'Convert strings to numbers',
          'Join two string types together'
        ],
        correctIndex: 1,
        explanation: 'The `infer` keyword in template literal types lets you capture parts of a string into named type variables for further manipulation.'
      }
    ]
  },
  {
    id: 215, slug: 'ts-advanced-generics', title: 'Advanced Generic Patterns',
    description: 'Master advanced generic patterns and techniques.',
    level: 'advanced', duration: '40 min',
    objectives: ['Use higher-kinded types', 'Apply type-level computation', 'Master generic inference'],
    topics: [
      { id: 'higher-kinded', title: 'Higher-Kinded Types', content: `**Practice:**\n\`\`\`typescript\n// Type constructor interface\ninterface Functor<F<_>> {\n  map<A, B>(fa: F<A>, f: (a: A) => B): F<B>;\n}\n\n// Maybe functor\ninterface Maybe<A> {\n  value: A | null;\n  isNothing: boolean;\n}\n\nconst MaybeFunctor: Functor<Maybe> = {\n  map(ma, f) {\n    return ma.isNothing\n      ? { value: null, isNothing: true }\n      : { value: f(ma.value), isNothing: false };\n  }\n};\n\n// Usage\nconst just = { value: 5, isNothing: false };\nconst mapped = MaybeFunctor.map(just, x => x * 2);\n// { value: 10, isNothing: false }\n\`\`\`` },
      { id: 'type-level-computation', title: 'Type-Level Computation', content: `**Practice:**\n\`\`\`typescript\n// Type-level addition\ntype Add<A extends number, B extends number> =\n  A extends 0 ? B :\n  B extends 0 ? A :\n  A extends 1 ? Increment<B> :\n  Increment<Add<Decrement<A>, B>>;\n\ntype Increment<N extends number> = N extends 0 ? 1 :\n  N extends 1 ? 2 :\n  N extends 2 ? 3 :\n  N extends 3 ? 4 :\n  never;\n\ntype Decrement<N extends number> = N extends 1 ? 0 :\n  N extends 2 ? 1 :\n  N extends 3 ? 2 :\n  N extends 4 ? 3 :\n  never;\n\ntype Result = Add<2, 3>; // 4\n\`\`\`` },
      { id: 'generic-inference', title: 'Advanced Generic Inference', content: `**Practice:**\n\`\`\`typescript\n// Builder pattern with inference\nfunction createBuilder<T extends Record<string, any>>() {\n  return {\n    set<K extends string, V>(\n      key: K,\n      value: V\n    ): createBuilder<T & Record<K, V>> {\n      return this as any;\n    },\n    build(): T {\n      return this as T;\n    }\n  };\n}\n\n// Usage\nconst config = createBuilder()\n  .set("name", "John")\n  .set("age", 30)\n  .set("active", true)\n  .build();\n// { name: string; age: number; active: boolean }\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a higher-kinded type in TypeScript?',
        options: [
          'A type that can only be used with primitives',
          'A type constructor that takes other types as parameters, like `F<_>`',
          'A type that is always generic',
          'A type that extends multiple interfaces'
        ],
        correctIndex: 1,
        explanation: 'Higher-kinded types abstract over type constructors (like `Maybe<A>` or `Array<A>`), allowing you to write code that works across different container types.'
      },
      {
        id: 2,
        question: 'What pattern does the builder example demonstrate?',
        options: [
          'Type-level computation using generics to accumulate a type through chained method calls',
          'Runtime type checking with assertions',
          'Dynamic property assignment without type safety',
          'Class inheritance for code reuse'
        ],
        correctIndex: 0,
        explanation: 'The builder pattern uses generic inference to accumulate properties in the type as each `.set()` call is chained, providing full type safety for the final `.build()` result.'
      },
      {
        id: 3,
        question: 'In the builder pattern, why does `.set()` return `createBuilder<T & Record<K, V>>`?',
        options: [
          'To reset the builder state',
          'To add the new key-value pair to the accumulated type',
          'To remove properties from the builder',
          'To convert the builder to a different type'
        ],
        correctIndex: 1,
        explanation: 'By returning `createBuilder<T & Record<K, V>>`, each `.set()` call extends the accumulated type `T` with the new property, so the final build has all properties.'
      }
    ]
  },
  {
    id: 216, slug: 'ts-type-level', title: 'Type-Level Programming',
    description: 'Master type-level programming techniques.',
    level: 'advanced', duration: '35 min',
    objectives: ['Create type-level functions', 'Use recursion', 'Master tuple types'],
    topics: [
      { id: 'tuple-types', title: 'Tuple Types', content: `**Practice:**\n\`\`\`typescript\n// Basic tuple\ntype Pair = [string, number];\nconst pair: Pair = ["hello", 42];\n\n// Variadic tuples\ntype Concat<A extends any[], B extends any[]> = [...A, ...B];\ntype Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]\n\n// Tuple to union\ntype TupleToUnion<T extends any[]> = T[number];\ntype Numbers = TupleToUnion<[1, 2, 3]>; // 1 | 2 | 3\n\n// Head and tail\ntype Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;\ntype Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];\n\ntype H = Head<[1, 2, 3]>; // 1\ntype T = Tail<[1, 2, 3]>; // [2, 3]\n\`\`\`` },
      { id: 'recursive-types', title: 'Recursive Types', content: `**Practice:**\n\`\`\`typescript\n// Flatten array type\ntype Flatten<T extends any[]> =\n  T extends [infer First, ...infer Rest]\n    ? First extends any[]\n      ? [...Flatten<First>, ...Flatten<Rest>]\n      : [First, ...Flatten<Rest>]\n    : [];\n\ntype Result = Flatten<[1, [2, 3], [4, [5]]]>;\n// [1, 2, 3, 4, 5]\n\n// Deep readonly\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object\n    ? T[K] extends Function\n      ? T[K]\n      : DeepReadonly<T[K]>\n    : T[K];\n};\n\ninterface Config {\n  server: {\n    host: string;\n    port: number;\n  };\n  db: {\n    url: string;\n  };\n}\n\ntype StrictConfig = DeepReadonly<Config>;\n\`\`\`` },
      { id: 'type-arithmetic', title: 'Type Arithmetic', content: `**Practice:**\n\`\`\`typescript\n// Type-level Fibonacci\ntype Fibonacci<N extends number> =\n  N extends 0 ? 0 :\n  N extends 1 ? 1 :\n  Fibonacci<Subtract<N, 1>> extends infer A extends number\n    ? Fibonacci<Subtract<N, 2>> extends infer B extends number\n      ? Add<A, B>\n      : never\n    : never;\n\n// Helper types\ntype Add<A extends number, B extends number> =\n  [...NumberTuple<A>, ...NumberTuple<B>] extends infer R\n    ? R extends any[] ? R[\"length\"] : never\n    : never;\n\ntype Subtract<A extends number, B extends number> =\n  NumberTuple<A> extends [...NumberTuple<B>, ...infer R]\n    ? R extends any[] ? R[\"length\"] : never\n    : never;\n\ntype NumberTuple<N extends number, T extends any[] = []> =\n  T[\"length\"] extends N ? T : NumberTuple<N, [...T, any]>;\n\n// Usage\ntype Fib10 = Fibonacci<10>; // 55\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the result of `TupleToUnion<[1, 2, 3]>`?',
        options: ['[1, 2, 3]', '1 | 2 | 3', 'number', '(1 | 2 | 3)[]'],
        correctIndex: 1,
        explanation: '`TupleToUnion<T>` uses `T[number]` to extract the element types from a tuple and produce a union type.'
      },
      {
        id: 2,
        question: 'What does recursion in TypeScript types enable?',
        options: [
          'Runtime recursion',
          'Type-level computation that processes structures iteratively at compile time',
          'Looping through arrays at runtime',
          'Dynamic type creation'
        ],
        correctIndex: 1,
        explanation: 'Recursive types allow type-level computation that processes structures (like tuples or nested objects) at compile time, enabling complex type transformations.'
      },
      {
        id: 3,
        question: 'How does type arithmetic (like `Add<A, B>`) work at the type level?',
        options: [
          'By using `+` operator directly',
          'By building tuples and using `.length` to represent numbers',
          'By converting to strings and parsing',
          'By using `Math.add` utility type'
        ],
        correctIndex: 1,
        explanation: 'Type arithmetic represents numbers as tuple lengths. To add A and B, you concatenate their tuples and take the resulting length.'
      }
    ]
  },
  {
    id: 217, slug: 'ts-decorators', title: 'Decorators',
    description: 'Master TypeScript decorators and metadata.',
    level: 'advanced', duration: '35 min',
    objectives: ['Create class decorators', 'Use method decorators', 'Apply parameter decorators'],
    topics: [
      { id: 'class-decorators', title: 'Class Decorators', content: `**Practice:**\n\`\`\`typescript\n// Simple class decorator\nfunction Sealed(constructor: Function) {\n  Object.seal(constructor);\n  Object.seal(constructor.prototype);\n}\n\n@Sealed\nclass Greeter {\n  greeting: string;\n  constructor(message: string) {\n    this.greeting = message;\n  }\n}\n\n// Decorator factory\nfunction Logger(prefix: string) {\n  return function (constructor: Function) {\n    console.log(\`\${prefix}: \${constructor.name}\`);\n  };\n}\n\n@Logger(\"Creating\")\nclass MyClass {}\n// Output: Creating: MyClass\n\`\`\`` },
      { id: 'method-decorators', title: 'Method Decorators', content: `**Practice:**\n\`\`\`typescript\n// Method decorator\nfunction Log(target: any, key: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function (...args: any[]) {\n    console.log(\`Calling \${key} with\`, args);\n    const result = original.apply(this, args);\n    console.log(\`\${key} returned\`, result);\n    return result;\n  };\n}\n\nclass Calculator {\n  @Log\n  add(a: number, b: number) {\n    return a + b;\n  }\n}\n\nconst calc = new Calculator();\ncalc.add(1, 2);\n// Calling add with [1, 2]\n// add returned 3\n\`\`\`` },
      { id: 'parameter-decorators', title: 'Parameter Decorators', content: `**Practice:**\n\`\`\`typescript\n// Parameter decorator\nfunction Required(target: any, key: string, index: number) {\n  const metadataKey = \`__required_\${key}\`;\n  if (!Reflect.has(metadataKey, target)) {\n    Reflect.defineMetadata(metadataKey, [], target);\n  }\n  const requiredParams = Reflect.getMetadata(metadataKey, target);\n  requiredParams.push(index);\n  Reflect.defineMetadata(metadataKey, requiredParams, target);\n}\n\nclass UserService {\n  createUser(\n    @Required name: string,\n    @Required email: string,\n    age?: number\n  ) {\n    // Validation logic\n  }\n}\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the signature of a class decorator in TypeScript?',
        options: [
          '(target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void',
          '(constructor: Function) => void',
          '(target: any, key: string, index: number) => void',
          '(value: any) => any'
        ],
        correctIndex: 1,
        explanation: 'A class decorator receives the constructor function of the class and can modify or replace it.'
      },
      {
        id: 2,
        question: 'What does a decorator factory return?',
        options: [
          'A class directly',
          'A decorator function that configures the decoration',
          'A new instance of the decorated class',
          'A string representation'
        ],
        correctIndex: 1,
        explanation: 'A decorator factory is a function that returns a decorator function, allowing you to pass configuration parameters to the decorator.'
      },
      {
        id: 3,
        question: 'What does a method decorator receive as its third parameter?',
        options: [
          'The method arguments',
          'The class constructor',
          'A PropertyDescriptor object',
          'The return value of the method'
        ],
        correctIndex: 2,
        explanation: 'A method decorator receives three arguments: the prototype (or constructor for static methods), the property key, and a PropertyDescriptor that can be modified.'
      }
    ]
  },
  {
    id: 218, slug: 'ts-performance', title: 'TypeScript Performance',
    description: 'Optimize TypeScript compilation and type checking.',
    level: 'advanced', duration: '30 min',
    objectives: ['Reduce compilation time', 'Optimize type checking', 'Use project references'],
    topics: [
      { id: 'compilation', title: 'Compilation Optimization', content: `**Practice:**\n\`\`\`json\n// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"incremental\": true,\n    \"tsBuildInfoFile\": \"./.tsbuildinfo\",\n    \"skipLibCheck\": true,\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  }\n}\n\`\`\`\n\n**Tips:**\n- Use \`incremental: true\` for faster rebuilds\n- Use \`skipLibCheck: true\` to skip type checking of declaration files\n- Use project references for large codebases` },
      { id: 'type-checking', title: 'Type Checking Optimization', content: `**Practice:**\n\`\`\`typescript\n// Avoid complex type operations\ntype Bad = UnionToIntersection<UnionToTuple<A>>;\n// This can be very slow!\n\n// Better: simplify types\ntype Good = A & B & C;\n\n// Use type assertions when types are too complex\nconst result = data as KnownType;\n\n// Avoid deep generic nesting\ntype Bad<T> = Bad<Bad<Bad<T>>>;\n\`\`\`` },
      { id: 'project-references', title: 'Project References', content: `**Practice:**\n\`\`\`json\n// Root tsconfig.json\n{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"packages/core\" },\n    { \"path\": \"packages/utils\" },\n    { \"path\": \"packages/app\" }\n  ]\n}\n\`\`\`\n\n\`\`\`json\n// packages/core/tsconfig.json\n{\n  \"compilerOptions\": {\n    \"composite\": true,\n    \"declaration\": true,\n    \"outDir\": \"./dist\"\n  }\n}\n\`\`\`\n\n**Benefits:**\n- Parallel compilation\n- Incremental builds\n- Better IDE performance` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What does `incremental: true` in tsconfig.json do?',
        options: [
          'Disables type checking',
          'Enables incremental compilation by saving build info for faster rebuilds',
          'Compiles only new files',
          'Skips declaration file generation'
        ],
        correctIndex: 1,
        explanation: '`incremental: true` saves information about the project graph from the last compilation, allowing TypeScript to only rebuild what changed.'
      },
      {
        id: 2,
        question: 'What is the purpose of `skipLibCheck: true`?',
        options: [
          'Skips all type checking',
          'Skips type checking of declaration files (.d.ts) for faster compilation',
          'Skips checking JavaScript files',
          'Skips checking node_modules'
        ],
        correctIndex: 1,
        explanation: '`skipLibCheck` skips type checking of all declaration files, which speeds up compilation. It is safe when you trust the types in your dependencies.'
      },
      {
        id: 3,
        question: 'What does the `composite` option in tsconfig.json enable?',
        options: [
          'Multiple entry points',
          'Project references, allowing incremental builds across packages',
          'CSS composition',
          'JavaScript concatenation'
        ],
        correctIndex: 1,
        explanation: 'The `composite` option enables project references, which allows TypeScript to build projects incrementally and in parallel across packages.'
      }
    ]
  },
  {
    id: 219, slug: 'ts-interview-prep', title: 'Interview Preparation',
    description: 'TypeScript interview questions and answers.',
    level: 'advanced', duration: '45 min',
    objectives: ['Answer common questions', 'Demonstrate deep knowledge', 'Solve coding challenges'],
    topics: [
      { id: 'union-intersection', title: 'Union vs Intersection', content: `**Practice:**\n\`\`\`typescript\n// Union (OR)\ntype A = string | number; // A is string OR number\n\n// Intersection (AND)\ntype B = { name: string } & { age: number };\n// B has both name AND age\n\n// Common mistakes\nconst x: string | number = "hello";\nx.toUpperCase(); // Error!\nif (typeof x === "string") {\n  x.toUpperCase(); // OK\n}\n\nconst y: { name: string } & { age: number } = {\n  name: "John",\n  age: 30\n};\n\`\`\`` },
      { id: 'type-assertion', title: 'Type Assertions', content: `**Practice:**\n\`\`\`typescript\n// as keyword\nconst input = document.getElementById("input") as HTMLInputElement;\ninput.value = "hello";\n\n// ! non-null assertion\nfunction getLength(s: string | null) {\n  return s!.length; // s is not null\n}\n\n// as const\nconst config = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000\n} as const;\n// config.apiUrl is "https://api.example.com", not string\n\n// Type assertions bypass type checking - use carefully!\n\`\`\`` },
      { id: 'common-patterns', title: 'Common Patterns', content: `**Practice:**\n\`\`\`typescript\n// Builder pattern\nfunction createBuilder<T>() {\n  return {\n    set<K extends string, V>(\n      key: K,\n      value: V\n    ): createBuilder<T & Record<K, V>> {\n      return this as any;\n    },\n    build(): T {\n      return this as T;\n    }\n  };\n}\n\n// Type-safe events\nclass TypedEventEmitter<Events extends Record<string, any>> {\n  on<K extends keyof Events>(\n    event: K,\n    handler: (data: Events[K]) => void\n  ) {\n    // ...\n  }\n  emit<K extends keyof Events>(event: K, data: Events[K]) {\n    // ...\n  }\n}\n\ntype Events = {\n  click: { x: number; y: number };\n  keydown: { key: string };\n};\n\nconst emitter = new TypedEventEmitter<Events>();\nemitter.on("click", (data) => console.log(data.x));\n\`\`\`` }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between `string | number` and `string & number`?',
        options: [
          'They are the same',
          '`|` is a union (OR), `&` is an intersection (AND)',
          '`|` means AND, `&` means OR',
          '`|` is for strings, `&` is for numbers'
        ],
        correctIndex: 1,
        explanation: '`string | number` is a union: a value can be either a string OR a number. `string & number` is an intersection: a value must be both, which resolves to `never` since nothing is both.'
      },
      {
        id: 2,
        question: 'What does `as const` do to an object?',
        options: [
          'Makes it mutable',
          'Makes all properties readonly with literal types',
          'Converts it to a class',
          'Adds type annotations'
        ],
        correctIndex: 1,
        explanation: '`as const` makes all properties `readonly` and infers the narrowest possible literal types instead of general types like `string` or `number`.'
      },
      {
        id: 3,
        question: 'What is the `!` (non-null assertion) operator used for?',
        options: [
          'Creating nullable types',
          'Telling TypeScript a value is definitely not null or undefined',
          'Converting null to undefined',
          'Throwing an error'
        ],
        correctIndex: 1,
        explanation: 'The non-null assertion operator (`!`) tells TypeScript that a value is not `null` or `undefined`, bypassing the strict null checks. Use it only when you are certain the value cannot be null.'
      }
    ]
  }
];

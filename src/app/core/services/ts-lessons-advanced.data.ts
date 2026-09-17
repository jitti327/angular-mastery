import { Lesson } from '../models/lesson.model';

export const TS_ADVANCED_LESSONS: Lesson[] = [
  {
    id: 213, slug: 'ts-conditional-types', title: 'Conditional Types',
    description: 'Master conditional types and type-level programming.',
    level: 'advanced', duration: '35 min',
    objectives: ['Create conditional types', 'Use infer keyword', 'Master distributive types'],
    topics: [
      { id: 'basic-conditional', title: 'Basic Conditional Types', content: `**What are Conditional Types?**

Conditional types select types based on conditions, like an if-else at the type level. They use \`T extends U ? X : Y\` to create types that depend on other types, enabling sophisticated type-level logic.

**Why Conditional Types Matter:**
- Create types that adapt based on input types
- Build type-level utilities and helpers
- Extract and transform types from complex structures
- Enable advanced generic patterns

**How Conditional Types Work (Step-by-Step):**
1. Basic syntax: \`T extends U ? X : Y\`
2. If T extends U, result is X; otherwise Y
3. Distributes over union members automatically
4. Use \`infer\` to extract types within conditions

**Code Example:**
\`\`\`typescript
// Basic conditional type
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"

// Nested conditional types
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type A = TypeName<string>; // "string"
type B = TypeName<() => void>; // "function"

// Real-world: API response type
type ApiResponse<T> =
  T extends "user" ? User :
  T extends "post" ? Post :
  never;
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not handling all cases
type Bad<T> = T extends string ? "yes" : never;
// Missing the "no" case!

// Fix: Handle both branches
type Good<T> = T extends string ? "yes" : "no";

// Mistake: Unexpected distribution
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]

// Fix: Wrap to prevent distribution
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Result = ToArrayNonDist<string | number>; // (string | number)[]
\`\`\`

**Best Practices:**
- Handle all possible branches (no never unless intentional)
- Be aware of distribution over unions
- Use \`infer\` to extract types within conditions
- Test conditional types with different inputs

**Real-World Angular Example:**
\`\`\`typescript
// Conditional type for Angular dependency injection
type InjectionToken<T> =
  T extends new (...args: any[]) => infer R
    ? R
    : T;

function inject<T>(token: InjectionToken<T>): T {
  return this.injector.get(token);
}
\`\`\`

**Key Takeaways:**
1. Conditional types select types based on conditions
2. They distribute over union types automatically
3. Use \`infer\` to extract types within conditions` },
      { id: 'infer-keyword', title: 'Infer Keyword', content: `**What is the Infer Keyword?**

The \`infer\` keyword declares type variables within conditional types. It lets you extract and reuse types from complex structures like function returns, array elements, or promise values.

**Why Infer Matters:**
- Extract types from complex structures automatically
- Build reusable type extraction utilities
- Avoid manually duplicating type definitions
- Enable sophisticated type-level programming

**How Infer Works (Step-by-Step):**
1. Place in conditional type: \`T extends (infer U)[] ? U : never\`
2. TypeScript infers U from the matched type
3. Use U in the true branch
4. Combine with other types for complex extractions

**Code Example:**
\`\`\`typescript
// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type A = ReturnType<() => string>; // string
type B = ReturnType<(x: number) => boolean>; // boolean

// Extract array element type
type ElementOf<T> = T extends (infer E)[] ? E : never;

type A = ElementOf<string[]>; // string
type B = ElementOf<number[]>; // number

// Extract promise type
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number

// Extract constructor instance
type InstanceOf<T> = T extends new (...args: any[]) => infer R ? R : never;
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using infer outside conditional type
type Bad<T> = infer U; // Error!

// Fix: Use within conditional type
type Good<T> = T extends (infer U)[] ? U : never;

// Mistake: Not handling non-matching types
type ElementOf<T> = T extends (infer E)[] ? E : never;
// Returns never for non-arrays

// Fix: Add fallback
type ElementOf<T> = T extends (infer E)[] ? E : T;
\`\`\`

**Best Practices:**
- Use infer to extract types from structures
- Always handle the non-matching case (false branch)
- Combine multiple infer extractions for complex types
- Name inferred types meaningfully (R for return, E for element)

**Real-World Angular Example:**
\`\`\`typescript
// Extract Observable value type
type ObservableValue<T> = T extends Observable<infer V> ? V : never;

function subscribe<T>(obs: T): ObservableValue<T> {
  return this.obs.subscribe(obs);
}
\`\`\`

**Key Takeaways:**
1. \`infer\` declares type variables in conditional types
2. It extracts types from functions, arrays, promises, and more
3. Always handle the non-matching case in the false branch` },
      { id: 'distributive', title: 'Distributive Conditional Types', content: `**What are Distributive Conditional Types?**

Distributive conditional types automatically apply to each member of a union type separately. When \`T\` is a union like \`A | B\`, \`T extends U ? X : Y\` distributes to \`(A extends U ? X : Y) | (B extends U ? X : Y)\`.

**Why Distribution Matters:**
- Enables type-level mapping over unions
- Useful for filtering and transforming union members
- Can be prevented when needed for batch operations
- Foundation for many utility types

**How Distribution Works (Step-by-Step):**
1. T is a bare type parameter in the extends position
2. When T is a union, the conditional distributes
3. Each union member is evaluated separately
4. Results are combined into a union

**Code Example:**
\`\`\`typescript
// Distributive type
type ToArray<T> = T extends any ? T[] : never;

type A = ToArray<string | number>; // string[] | number[]

// Non-distributive (wrap in tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type A = ToArrayNonDist<string | number>; // (string | number)[]

// Real-world usage
type NonNullable<T> = [T] extends [null | undefined] ? never : T;

type A = NonNullable<string | null>; // string
type B = NonNullable<number | undefined>; // number

// Distributive filtering
type FilterStrings<T> = T extends string ? T : never;

type A = FilterStrings<"a" | 1 | "b" | 2>; // "a" | "b"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Unintended distribution
type Bad<T> = T extends string ? T[] : never;
type Result = Bad<string | number>; // string[] | never = string[]

// Fix: Wrap to prevent distribution
type Good<T> = [T] extends [string] ? T[] : never;
type Result = Good<string | number>; // (string | number)[] | never

// Mistake: Not using distribution intentionally
type ContainsString<T> = T extends string ? true : false;
// Distributes: true | false | true for "a" | 1 | "b"

// Fix: Wrap if you want batch evaluation
type ContainsString<T> = [T] extends [string] ? true : false;
type Result = ContainsString<"a" | 1>; // false (not true | false)
\`\`\`

**Best Practices:**
- Use distribution intentionally for type-level mapping
- Wrap in tuple \`[T]\` to prevent distribution
- Test with union types to verify behavior
- Document when distribution is expected

**Real-World Angular Example:**
\`\`\`typescript
// Filter component inputs by type
type StringInputs<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface ComponentConfig {
  title: string;
  count: number;
  visible: boolean;
  label: string;
}

type StringProps = StringInputs<ComponentConfig>;
// { title: string; label: string }
\`\`\`

**Key Takeaways:**
1. Distributive conditionals evaluate each union member separately
2. Wrap in tuple \`[T]\` to prevent distribution
3. Distribution is useful for type-level mapping and filtering` }
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
      { id: 'basic-template', title: 'Basic Template Literals', content: `**What are Template Literal Types?**

Template literal types create string types from other string types, similar to JavaScript template literals but at the type level. They enable powerful string manipulation and type-safe string patterns.

**Why Template Literal Types Matter:**
- Create type-safe string patterns and formats
- Validate string formats at compile time
- Generate types from string patterns
- Enable sophisticated string manipulation

**How Template Literal Types Work (Step-by-Step):**
1. Basic: \`\${Type}\` combines string types
2. Unions distribute: \`\${"a" | "b"}\` = \`"a" | "b"\`
3. Use \`Capitalize\`, \`Uppercase\` for transformations
4. Use \`infer\` to extract parts of strings

**Code Example:**
\`\`\`typescript
// Basic template literal type
type Name = "John";
type Greeting = \`Hello, \${Name}\`; // "Hello, John"

// Union in template literal type
type Color = "red" | "blue" | "green";
type Size = "small" | "medium" | "large";
type ColorSize = \`\${Color}-\${Size}\`;
// "red-small" | "red-medium" | "red-large" | ...

// Function with template literal type
function createEvent<T extends string>(name: T): \`\${T}Event\` {
  return \`\${name}Event\` as \`\${T}Event\`;
}

const event = createEvent("click"); // "clickEvent"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not handling edge cases
type ParseName<T extends string> =
  T extends \`\${infer First} \${infer Last}\`
    ? { first: First; last: Last }
    : { first: T; last: never }; // Missing case!

// Fix: Handle all cases
type ParseName<T extends string> =
  T extends \`\${infer First} \${infer Last}\`
    ? { first: First; last: Last }
    : T extends \`\${infer First}\`
      ? { first: First; last: never }
      : { first: never; last: never };

// Mistake: Overcomplicating simple patterns
type IsHello<T> = T extends "hello" ? true : false;
// Could just use: T extends string ? true : false
\`\`\`

**Best Practices:**
- Use template literal types for string pattern validation
- Combine with conditional types for parsing
- Test with different string inputs
- Use intrinsic types (Capitalize, Uppercase) for transformations

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe event names
type EventName<T extends string> = \`\${T}Change\`;

function onEvent<T extends string>(event: EventName<T>, handler: () => void) {
  // Implementation
}

onEvent("user", () => {}); // OK
onEvent("User", () => {}); // Error: not "userChange"
\`\`\`

**Key Takeaways:**
1. Template literal types create string types from patterns
2. They distribute over unions for all combinations
3. Use \`infer\` to extract parts of string types` },
      { id: 'string-manipulation', title: 'String Manipulation', content: `**What are String Manipulation Types?**

String manipulation types transform string types using built-in utilities like \`Capitalize\`, \`Uppercase\`, \`Lowercase\`, and \`Uncapitalize\`. Combined with template literals, they enable type-level string processing.

**Why String Manipulation Matters:**
- Convert between naming conventions (camelCase, snake_case)
- Validate and transform string formats at compile time
- Create type-safe string transformations
- Build sophisticated string parsing utilities

**How String Manipulation Works (Step-by-Step):**
1. Built-in types: Capitalize, Uppercase, Lowercase, Uncapitalize
2. Combine with template literals for custom transformations
3. Use conditional types for conditional transformations
4. Recurse for complex patterns

**Code Example:**
\`\`\`typescript
// Capitalize
type UpperFirst<S extends string> = S extends \`\${infer First}\${infer Rest}\`
  ? \`\${Uppercase<First>}\${Rest}\`
  : S;

type A = UpperFirst<"hello">; // "Hello"

// Uncapitalize
type LowerFirst<S extends string> = S extends \`\${infer First}\${infer Rest}\`
  ? \`\${Lowercase<First>}\${Rest}\`
  : S;

type A = LowerFirst<"Hello">; // "hello"

// Snake to camelCase
type SnakeToCamel<S extends string> =
  S extends \`\${infer Head}_\${infer Tail}\`
    ? \`\${Head}\${SnakeToCamel<Capitalize<Tail>>}\`
    : S;

type A = SnakeToCamel<"hello_world">; // "helloWorld"
type B = SnakeToCamel<"foo_bar_baz">; // "fooBarBaz"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not handling empty strings
type UpperFirst<S extends string> = S extends \`\${infer F}\${infer R}\`
  ? \`\${Uppercase<F>}\${R}\`
  : S; // Handles empty string

// Mistake: Infinite recursion
type Infinite<S extends string> = Infinite<S>; // Error!

// Fix: Ensure recursion terminates
type SnakeToCamel<S extends string> =
  S extends \`\${infer Head}_\${infer Tail}\`
    ? \`\${Head}\${SnakeToCamel<Capitalize<Tail>>}\`
    : S; // Terminates when no underscore found
\`\`\`

**Best Practices:**
- Use built-in string manipulation types when possible
- Ensure recursive types terminate
- Test with various string formats
- Combine with conditional types for complex transformations

**Real-World Angular Example:**
\`\`\`typescript
// Convert component selector to class name
type SelectorToClass<T extends string> = \`\${Capitalize<T>}Component\`;

type ButtonClass = SelectorToClass<"app-button">; // "AppButtonComponent"
\`\`\`

**Key Takeaways:**
1. Built-in types handle common string transformations
2. Combine with template literals for custom transformations
3. Ensure recursive types terminate properly` },
      { id: 'inference-patterns', title: 'Inference Patterns', content: `**What are Inference Patterns?**

Inference patterns use \`infer\` within template literal types to extract and parse parts of string types. They enable building parsers, validators, and transformers at the type level.

**Why Inference Patterns Matter:**
- Parse complex string formats at compile time
- Extract structured data from string patterns
- Build type-safe parsers for APIs and configs
- Validate string formats statically

**How Inference Patterns Work (Step-by-Step):**
1. Use \`infer\` to capture string parts
2. Combine multiple captures for complex parsing
3. Recurse for repeated patterns
4. Build object types from parsed results

**Code Example:**
\`\`\`typescript
// Parse query string
type ParseQueryString<S extends string> =
  S extends \`\${infer Key}=\${infer Value}&\${infer Rest}\`
    ? { [K in Key]: Value } & ParseQueryString<Rest>
    : S extends \`\${infer Key}=\${infer Value}\`
      ? { [K in Key]: Value }
      : {};

type Result = ParseQueryString<"name=John&age=30&city=NYC">;
// { name: "John"; age: "30"; city: "NYC" }

// Extract routes
type ExtractRoutes<T extends string> =
  T extends \`/\${infer Segment}/\${infer Rest}\`
    ? Segment | ExtractRoutes<\`/\${Rest}\`>
    : T extends \`/\${infer Segment}\`
      ? Segment
      : never;

type Routes = ExtractRoutes<"/users/123/posts">;
// "users" | "123" | "posts"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not handling edge cases
type ParseQueryString<S extends string> =
  S extends \`\${infer Key}=\${infer Value}&\${infer Rest}\`
    ? { [K in Key]: Value } & ParseQueryString<Rest>
    : {}; // Missing final key-value pair!

// Fix: Handle both cases
type ParseQueryString<S extends string> =
  S extends \`\${infer Key}=\${infer Value}&\${infer Rest}\`
    ? { [K in Key]: Value } & ParseQueryString<Rest>
    : S extends \`\${infer Key}=\${infer Value}\`
      ? { [K in Key]: Value }
      : {};

// Mistake: Infinite recursion without base case
type Infinite<S extends string> =
  S extends \`\${infer H}\${infer T}\`
    ? Infinite<T> // Never terminates!
    : never;
\`\`\`

**Best Practices:**
- Always handle all possible patterns
- Ensure recursion terminates
- Test with various input formats
- Combine multiple patterns for complex parsing

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe route parameters
type ExtractRouteParams<T extends string> =
  T extends \`:infer Param}/\${infer Rest}\`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : T extends \`:infer Param}\`
      ? { [K in Param]: string }
      : {};

type Params = ExtractRouteParams<"/users/:id/posts/:postId">;
// { id: string; postId: string }
\`\`\`

**Key Takeaways:**
1. Inference patterns extract parts of string types
2. Always handle all possible patterns
3. Ensure recursive types terminate properly` }
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
      { id: 'higher-kinded', title: 'Higher-Kinded Types', content: `**What are Higher-Kinded Types?**

Higher-kinded types abstract over type constructors like \`Maybe<A>\` or \`Array<A>\`. They let you write code that works across different container types, similar to how functions abstract over values.

**Why Higher-Kinded Types Matter:**
- Write code that works across different container types
- Enable functional programming patterns in TypeScript
- Create reusable abstractions for functors, monads, etc.
- Build type-safe generic libraries

**How Higher-Kinded Types Work (Step-by-Step):**
1. Define a type constructor interface: \`interface Functor<F<_>>\`
2. Implement for specific types (Maybe, Array, etc.)
3. Use in generic functions that work with any functor
4. TypeScript simulates HKTs through generic interfaces

**Code Example:**
\`\`\`typescript
// Type constructor interface
interface Functor<F<_>> {
  map<A, B>(fa: F<A>, f: (a: A) => B): F<B>;
}

// Maybe functor
interface Maybe<A> {
  value: A | null;
  isNothing: boolean;
}

const MaybeFunctor: Functor<Maybe> = {
  map(ma, f) {
    return ma.isNothing
      ? { value: null, isNothing: true }
      : { value: f(ma.value), isNothing: false };
  }
};

// Usage
const just = { value: 5, isNothing: false };
const mapped = MaybeFunctor.map(just, x => x * 2);
// { value: 10, isNothing: false }
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: TypeScript doesn't have native HKTs
// This is invalid syntax:
// interface Functor<F<_>> { ... }

// Fix: Simulate with generic interface
interface Functor<F extends (...args: any[]) => any> {
  map<A, B>(fa: F<A>, f: (a: A) => B): F<B>;
}

// Mistake: Overcomplicating simple cases
// Use generics directly for simple container types
function mapArray<A, B>(arr: A[], f: (a: A) => B): B[] {
  return arr.map(f);
}
\`\`\`

**Best Practices:**
- Use HKTs when you need to abstract over container types
- Keep it simple - don't over-engineer
- Use existing patterns (Functor, Monad) when applicable
- Document the abstraction clearly

**Real-World Angular Example:**
\`\`\`typescript
// Generic observable mapper
interface ObservableFunctor {
  map<T, R>(obs: Observable<T>, f: (t: T) => R): Observable<R>;
}

const observableFunctor: ObservableFunctor = {
  map: (obs, f) => obs.pipe(map(f))
};
\`\`\`

**Key Takeaways:**
1. Higher-kinded types abstract over type constructors
2. TypeScript simulates HKTs through generic interfaces
3. Use them for functional programming patterns` },
      { id: 'type-level-computation', title: 'Type-Level Computation', content: `**What is Type-Level Computation?**

Type-level computation performs calculations and logic at the type level using conditional types, recursion, and tuple types. It enables building complex type transformations and utilities.

**Why Type-Level Computation Matters:**
- Build sophisticated type utilities
- Perform compile-time validation and transformation
- Create type-safe algorithms and data structures
- Push TypeScript's type system to its limits

**How Type-Level Computation Works (Step-by-Step):**
1. Represent numbers as tuple lengths
2. Use conditional types for branching
3. Recurse for iteration
4. Build complex types from simple operations

**Code Example:**
\`\`\`typescript
// Type-level addition
type Add<A extends number, B extends number> =
  A extends 0 ? B :
  B extends 0 ? A :
  A extends 1 ? Increment<B> :
  Increment<Add<Decrement<A>, B>>;

type Increment<N extends number> = N extends 0 ? 1 :
  N extends 1 ? 2 :
  N extends 2 ? 3 :
  N extends 3 ? 4 :
  never;

type Decrement<N extends number> = N extends 1 ? 0 :
  N extends 2 ? 1 :
  N extends 3 ? 2 :
  N extends 4 ? 3 :
  never;

type Result = Add<2, 3>; // 4
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Infinite recursion
type Infinite<N extends number> = Infinite<Decrement<N>>; // Error!

// Fix: Ensure base case terminates recursion
type SafeAdd<A extends number, B extends number> =
  A extends 0 ? B : // Base case
  Increment<SafeAdd<Decrement<A>, B>>; // Recursive case

// Mistake: Limited number range
type Limited<N extends number> = N extends 0 ? 0 :
  N extends 1 ? 1 : never; // Only handles 0-1

// Fix: Extend the range
type Better<N extends number> = N extends 0 ? 0 :
  N extends 1 ? 1 :
  N extends 2 ? 2 :
  N extends 3 ? 3 : never;
\`\`\`

**Best Practices:**
- Keep type-level computation simple when possible
- Ensure recursion terminates
- Test with various inputs
- Document complex type algorithms

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe tuple access
type TupleAt<T extends any[], N extends number> =
  T extends [infer First, ...infer Rest]
    ? N extends 0 ? First
      : TupleAt<Rest, Decrement<N>>
    : never;

type Result = TupleAt<[string, number, boolean], 1>; // number
\`\`\`

**Key Takeaways:**
1. Type-level computation uses conditional types and recursion
2. Numbers are represented as tuple lengths
3. Always ensure recursion terminates` },
      { id: 'generic-inference', title: 'Advanced Generic Inference', content: `**What is Advanced Generic Inference?**

Advanced generic inference uses TypeScript's inference capabilities to create sophisticated patterns like builders, type-safe APIs, and fluent interfaces that accumulate types through method chains.

**Why Advanced Generic Inference Matters:**
- Create type-safe builders and factories
- Build fluent APIs with full type information
- Enable complex generic patterns
- Catch errors at compile time in chained operations

**How Advanced Generic Inference Works (Step-by-Step):**
1. Use generic parameters to accumulate types
2. Return new generic types from methods
3. Let TypeScript infer through method chains
4. Build complex types through accumulation

**Code Example:**
\`\`\`typescript
// Builder pattern with inference
function createBuilder<T extends Record<string, any>>() {
  return {
    set<K extends string, V>(
      key: K,
      value: V
    ): createBuilder<T & Record<K, V>> {
      return this as any;
    },
    build(): T {
      return this as T;
    }
  };
}

// Usage
const config = createBuilder()
  .set("name", "John")
  .set("age", 30)
  .set("active", true)
  .build();
// { name: string; age: number; active: boolean }

// Type-safe query builder
function query<T>() {
  return {
    select<K extends keyof T>(...keys: K[]): QueryBuilder<Pick<T, K>> {
      return this as any;
    },
    where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T> {
      return this as any;
    }
  };
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Losing type information
function bad<T>() {
  return {
    set(key: string, value: any) {
      return this; // Loses T!
    }
  };
}

// Fix: Preserve type through chain
function good<T>() {
  return {
    set<K extends string, V>(key: K, value: V): Good<T & Record<K, V>> {
      return this as any;
    }
  };
}

// Mistake: Not using 'any' properly in type assertions
function build<T>() {
  return {
    build(): T {
      return this; // Error: 'this' is not T
    }
  };
}
\`\`\`

**Best Practices:**
- Use \`as any\` sparingly and document why
- Let TypeScript infer when possible
- Test complex inference chains
- Provide type hints when inference fails

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe Angular form builder
function createForm<T>() {
  return {
    control<K extends string, V>(name: K, value: V): FormBuilder<T & Record<K, V>> {
      return this as any;
    },
    build(): FormGroup<T> {
      return this as any;
    }
  };
}

// Usage
const form = createForm()
  .control("name", "")
  .control("age", 0)
  .build();
// FormGroup<{ name: string; age: number }>
\`\`\`

**Key Takeaways:**
1. Advanced inference accumulates types through method chains
2. Use generic parameters to preserve type information
3. Test complex inference patterns with various inputs` }
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
      { id: 'tuple-types', title: 'Tuple Types', content: `**What are Tuple Types?**

Tuple types represent fixed-length arrays with specific types at each position. They're essential for type-level programming, representing numbers as lengths, and building complex type transformations.

**Why Tuple Types Matter:**
- Represent fixed-length arrays with mixed types
- Build type-level data structures
- Enable type arithmetic through tuple length
- Foundation for recursive type patterns

**How Tuple Types Work (Step-by-Step):**
1. Basic tuple: \`[string, number]\`
2. Variadic tuples: \`[...A, ...B]\`
3. Tuple indexing: \`T[number]\` for union of elements
4. Tuple manipulation: head, tail, concat

**Code Example:**
\`\`\`typescript
// Basic tuple
type Pair = [string, number];
const pair: Pair = ["hello", 42];

// Variadic tuples
type Concat<A extends any[], B extends any[]> = [...A, ...B];
type Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// Tuple to union
type TupleToUnion<T extends any[]> = T[number];
type Numbers = TupleToUnion<[1, 2, 3]>; // 1 | 2 | 3

// Head and tail
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];

type H = Head<[1, 2, 3]>; // 1
type T = Tail<[1, 2, 3]>; // [2, 3]
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using arrays instead of tuples
type Bad = string[]; // Any length
type Good = [string, number]; // Fixed length

// Mistake: Not handling empty tuples
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
// Works for empty arrays - returns never

// Fix: Add explicit handling
type SafeHead<T extends any[]> =
  T extends [infer H, ...any[]] ? H
  : T extends [] ? undefined
  : never;
\`\`\`

**Best Practices:**
- Use tuples for fixed-length arrays with specific types
- Use variadic tuples for concatenation and spreading
- Handle empty tuples explicitly
- Combine with recursion for complex transformations

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe function arguments
type FunctionArgs<T extends (...args: any[]) => any> =
  T extends (...args: infer A) => any ? A : never;

function callWithArgs<T extends (...args: any[]) => any>(
  fn: T,
  ...args: FunctionArgs<T>
): ReturnType<T> {
  return fn(...args);
}
\`\`\`

**Key Takeaways:**
1. Tuple types represent fixed-length arrays with specific types
2. Use variadic tuples for concatenation and spreading
3. Handle empty tuples explicitly in recursive types` },
      { id: 'recursive-types', title: 'Recursive Types', content: `**What are Recursive Types?**

Recursive types reference themselves in their definition, enabling processing of nested structures like deeply nested objects, trees, or recursive data formats at the type level.

**Why Recursive Types Matter:**
- Process deeply nested structures at compile time
- Create deep transformations (DeepReadonly, DeepPartial)
- Handle recursive data structures (trees, linked lists)
- Build sophisticated type-level algorithms

**How Recursive Types Work (Step-by-Step):**
1. Define base case (termination condition)
2. Define recursive case (self-reference)
3. Ensure recursion terminates
4. Combine base and recursive cases

**Code Example:**
\`\`\`typescript
// Flatten array type
type Flatten<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? [...Flatten<First>, ...Flatten<Rest>]
      : [First, ...Flatten<Rest>]
    : [];

type Result = Flatten<[1, [2, 3], [4, [5]]]>;
// [1, 2, 3, 4, 5]

// Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
  };
  db: {
    url: string;
  };
}

type StrictConfig = DeepReadonly<Config>;
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Infinite recursion
type Infinite<T> = { [K in keyof T]: Infinite<T[K]> }; // Never terminates!

// Fix: Add base case
type SafeDeep<T> = T extends object
  ? { [K in keyof T]: SafeDeep<T[K]> }
  : T; // Terminates for primitives

// Mistake: Not handling functions
type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>; // Applies to functions!
};

// Fix: Exclude functions
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Function
    ? T[K]
    : DeepReadonly<T[K]>;
};
\`\`\`

**Best Practices:**
- Always define a clear base case
- Test with various nesting depths
- Handle special cases (functions, null, etc.)
- Document the recursion pattern

**Real-World Angular Example:**
\`\`\`typescript
// Deep reactive Angular form
type DeepFormGroup<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Date
      ? FormControl<T[K]>
      : DeepFormGroup<T[K]>
    : FormControl<T[K]>;
};

interface UserForm {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type UserFormGroup = DeepFormGroup<UserForm>;
\`\`\`

**Key Takeaways:**
1. Recursive types reference themselves for nested processing
2. Always define a clear base case for termination
3. Handle special cases like functions and null` },
      { id: 'type-arithmetic', title: 'Type Arithmetic', content: `**What is Type Arithmetic?**

Type arithmetic performs mathematical operations at the type level using tuple types. Numbers are represented as tuple lengths, and operations manipulate these tuples to compute results.

**Why Type Arithmetic Matters:**
- Perform compile-time calculations
- Build type-safe numeric operations
- Enable type-level algorithms
- Foundation for advanced type patterns

**How Type Arithmetic Works (Step-by-Step):**
1. Represent numbers as tuple lengths: \`NumberTuple<3>\` = \`[any, any, any]\`
2. Addition: concatenate tuples, take length
3. Subtraction: pattern match and take remaining length
4. Comparison and other operations through pattern matching

**Code Example:**
\`\`\`typescript
// Number representation
type NumberTuple<N extends number, T extends any[] = []> =
  T["length"] extends N ? T : NumberTuple<N, [...T, any]>;

// Addition
type Add<A extends number, B extends number> =
  [...NumberTuple<A>, ...NumberTuple<B>] extends infer R
    ? R extends any[] ? R["length"] : never
    : never;

// Subtraction
type Subtract<A extends number, B extends number> =
  NumberTuple<A> extends [...NumberTuple<B>, ...infer R]
    ? R extends any[] ? R["length"] : never
    : never;

// Usage
type Result1 = Add<2, 3>; // 5
type Result2 = Subtract<5, 2>; // 3
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Limited number range
type NumberTuple<N extends number, T extends any[] = []> =
  T["length"] extends N ? T : NumberTuple<N, [...T, any]>;
// Fails for large numbers!

// Fix: Use built-in tuple helper or limit range
// For practical use, consider using number types directly

// Mistake: Negative number handling
type Subtract<A extends number, B extends number> =
  NumberTuple<A> extends [...NumberTuple<B>, ...infer R]
    ? R["length"] : never;
// Returns never for negative results
\`\`\`

**Best Practices:**
- Keep type arithmetic simple for practical use
- Test with various number ranges
- Document limitations
- Consider runtime alternatives for complex calculations

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe array access with bounds checking
type SafeArrayAccess<T extends any[], N extends number> =
  N extends keyof T ? T[N] : never;

type Result = SafeArrayAccess<[string, number, boolean], 1>; // number
\`\`\`

**Key Takeaways:**
1. Type arithmetic represents numbers as tuple lengths
2. Operations manipulate tuples to compute results
3. Keep it simple - complex calculations are better at runtime` }
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
      { id: 'class-decorators', title: 'Class Decorators', content: `**What are Class Decorators?**

Class decorators are functions that receive the class constructor and can modify, extend, or replace the class. They're used for cross-cutting concerns like logging, validation, sealing classes, or adding metadata.

**Why Class Decorators Matter:**
- Add cross-cutting concerns without modifying classes
- Enable declarative programming patterns
- Modify class behavior at definition time
- Framework foundation (Angular, NestJS)

**How Class Decorators Work (Step-by-Step):**
1. Decorator receives constructor: \`(constructor: Function) => void\`
2. Can modify constructor or prototype
3. Can return new constructor to replace original
4. Applied with @syntax above class declaration

**Code Example:**
\`\`\`typescript
// Simple class decorator
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}

// Decorator factory
function Logger(prefix: string) {
  return function (constructor: Function) {
    console.log(\`\${prefix}: \${constructor.name}\`);
  };
}

@Logger("Creating")
class MyClass {}
// Output: Creating: MyClass
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not returning when replacing constructor
function BadDecorator(constructor: Function) {
  // Forgot to return new constructor
}

// Fix: Return new constructor
function GoodDecorator(constructor: Function) {
  return class extends constructor {
    newProp = "added";
  };
}

// Mistake: Modifying without context
function ModifyingDecorator(constructor: Function) {
  constructor.prototype.newMethod = () => {}; // Unsafe!
}

// Fix: Properly extend prototype
function SafeDecorator(constructor: Function) {
  const original = constructor;
  const newConstructor = function(...args: any[]) {
    const instance = new original(...args);
    instance.newMethod = () => {};
    return instance;
  };
  newConstructor.prototype = original.prototype;
  return newConstructor;
}
\`\`\`

**Best Practices:**
- Keep decorators focused on single concerns
- Use decorator factories for configurable behavior
- Document what the decorator modifies
- Consider compatibility with Angular decorators

**Real-World Angular Example:**
\`\`\`typescript
// Custom decorator for Angular
function LogClass() {
  return function (constructor: Function) {
    const original = constructor;
    const newConstructor = function(...args: any[]) {
      console.log(\`Creating \${constructor.name}\`);
      return new original(...args);
    };
    newConstructor.prototype = original.prototype;
    return newConstructor;
  };
}

@LogClass()
export class UserService {
  constructor() {}
}
\`\`\`

**Key Takeaways:**
1. Class decorators receive the constructor function
2. They can modify, extend, or replace the class
3. Use decorator factories for configurable behavior` },
      { id: 'method-decorators', title: 'Method Decorators', content: `**What are Method Decorators?**

Method decorators modify class methods by receiving the prototype, property key, and property descriptor. They can intercept method calls, add logging, modify behavior, or change the descriptor.

**Why Method Decorators Matter:**
- Add logging, timing, and caching to methods
- Implement access control and validation
- Modify method behavior without changing the method
- Create reusable behavior modifiers

**How Method Decorators Work (Step-by-Step):**
1. Receive: target, key, descriptor
2. Get original method: \`descriptor.value\`
3. Replace with new function that wraps original
4. Call original with proper context

**Code Example:**
\`\`\`typescript
// Method decorator
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(1, 2);
// Calling add with [1, 2]
// add returned 3
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not preserving 'this' context
function BadLog(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = (...args: any[]) => {
    // 'this' is wrong!
    return original(...args); // Lost context
  };
}

// Fix: Use function expression and apply
function GoodLog(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return original.apply(this, args); // Preserves context
  };
}

// Mistake: Not returning value
function NoReturn(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    original.apply(this, args); // Forgot return!
  };
}
\`\`\`

**Best Practices:**
- Always preserve 'this' context with .apply()
- Return values from wrapped methods
- Keep decorators focused and composable
- Test with methods that use 'this'

**Real-World Angular Example:**
\`\`\`typescript
// Debounce decorator
function Debounce(ms: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    let timeoutId: any;
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => original.apply(this, args), ms);
    };
  };
}

// Usage
@Component({ ... })
export class SearchComponent {
  @Debounce(300)
  onSearch(query: string) { ... }
}
\`\`\`

**Key Takeaways:**
1. Method decorators receive target, key, and descriptor
2. Always preserve 'this' context with .apply()
3. Return values from wrapped methods` },
      { id: 'parameter-decorators', title: 'Parameter Decorators', content: `**What are Parameter Decorators?**

Parameter decorators receive the method's target, parameter index, and property key. They're used to mark parameters for validation, dependency injection, or other processing.

**Why Parameter Decorators Matter:**
- Mark parameters for validation
- Implement dependency injection patterns
- Track parameter metadata
- Enable decorator composition

**How Parameter Decorators Work (Step-by-Step):**
1. Receive: target, methodKey, parameterIndex
2. Store metadata about the parameter
3. Use with method/class decorators for processing
4. Common in Angular for DI (@Inject)

**Code Example:**
\`\`\`typescript
// Parameter decorator
function Required(target: any, key: string, index: number) {
  const metadataKey = \`__required_\${key}\`;
  if (!Reflect.has(metadataKey, target)) {
    Reflect.defineMetadata(metadataKey, [], target);
  }
  const requiredParams = Reflect.getMetadata(metadataKey, target);
  requiredParams.push(index);
  Reflect.defineMetadata(metadataKey, requiredParams, target);
}

class UserService {
  createUser(
    @Required name: string,
    @Required email: string,
    age?: number
  ) {
    // Validation logic
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not using Reflect metadata
function BadRequired(target: any, key: string, index: number) {
  // Metadata lost - no way to retrieve later!
}

// Fix: Store metadata properly
function GoodRequired(target: any, key: string, index: number) {
  const existing = getRequiredParams(target, key);
  existing.push(index);
  Reflect.defineMetadata(\`__required_\${key}\`, existing, target);
}

// Mistake: Not handling static methods
function Required(target: any, key: string, index: number) {
  // 'target' is different for static vs instance methods
  // Static: target is constructor
  // Instance: target is prototype
}
\`\`\`

**Best Practices:**
- Store metadata consistently using Reflect
- Handle both static and instance methods
- Combine with method decorators for validation
- Document decorator behavior

**Real-World Angular Example:**
\`\`\`typescript
// Angular uses parameter decorators for DI
@Component({ ... })
export class UserService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}
}
\`\`\`

**Key Takeaways:**
1. Parameter decorators receive target, method key, and index
2. Store metadata using Reflect for later processing
3. Angular uses parameter decorators for dependency injection` }
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
      { id: 'compilation', title: 'Compilation Optimization', content: `**What is Compilation Optimization?**

Compilation optimization configures TypeScript to build faster by enabling incremental compilation, skipping unnecessary checks, and optimizing the build pipeline. It reduces developer wait time without sacrificing type safety.

**Why Compilation Optimization Matters:**
- Faster rebuilds during development
- Reduced CI/CD pipeline times
- Better developer experience
- Maintain type safety while improving speed

**How Compilation Optimization Works (Step-by-Step):**
1. Enable incremental: \`"incremental": true\`
2. Skip library checks: \`"skipLibCheck": true\`
3. Use project references for large codebases
4. Configure tsBuildInfoFile for cache

**Code Example:**
\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`json
// Mistake: Disabling all checks for speed
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false
  }
}
// Loses type safety!

// Fix: Keep strict checks, optimize elsewhere
{
  "compilerOptions": {
    "strict": true,
    "incremental": true,
    "skipLibCheck": true
  }
}
\`\`\`

**Best Practices:**
- Enable incremental for faster rebuilds
- Use skipLibCheck when you trust dependency types
- Use project references for monorepos
- Keep strict mode enabled

**Real-World Angular Example:**
\`\`\`json
// Angular project tsconfig optimization
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./.angular/.tsbuildinfo",
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
\`\`\`

**Key Takeaways:**
1. Enable incremental compilation for faster rebuilds
2. Use skipLibCheck to skip checking declaration files
3. Keep strict mode for type safety` },
      { id: 'type-checking', title: 'Type Checking Optimization', content: `**What is Type Checking Optimization?**

Type checking optimization reduces the complexity of type operations to speed up compilation. It involves simplifying complex types, avoiding unnecessary type assertions, and using efficient patterns.

**Why Type Checking Optimization Matters:**
- Reduces compilation time for complex codebases
- Prevents type-checker slowdowns
- Maintains readability while improving performance
- Avoids hitting TypeScript's type instantiation limits

**How Type Checking Optimization Works (Step-by-Step):**
1. Simplify complex union types
2. Avoid deep generic nesting
3. Use type assertions when types are too complex
4. Break complex types into simpler pieces

**Code Example:**
\`\`\`typescript
// Avoid complex type operations
type Bad = UnionToIntersection<UnionToTuple<A>>;
// This can be very slow!

// Better: simplify types
type Good = A & B & C;

// Use type assertions when types are too complex
const result = data as KnownType;

// Avoid deep generic nesting
type Bad<T> = Bad<Bad<Bad<T>>>;

// Better: flatten generics
type Good<T> = ProcessedType<T>;
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Overly complex conditional types
type Complex<T> =
  T extends string ? ProcessString<T> :
  T extends number ? ProcessNumber<T> :
  T extends Array<infer U> ? ProcessArray<U> :
  T extends object ? ProcessObject<T> :
  never;
// Can be slow with complex input types

// Fix: Simplify or split
type Simplified<T> = T extends string ? string :
  T extends number ? number : T;

// Mistake: Using 'any' to avoid complexity
const result = data as any; // Loses type safety!

// Fix: Use 'unknown' and narrow
const result = data as unknown;
if (typeof result === "string") { ... }
\`\`\`

**Best Practices:**
- Keep conditional types shallow
- Avoid complex recursive types when possible
- Use type assertions sparingly
- Profile type-checker performance

**Real-World Angular Example:**
\`\`\`typescript
// Simplified form types
type SimpleFormControl<T> = T extends string ? FormControl<string> :
  T extends number ? FormControl<number> :
  FormControl<T>;

// Instead of deeply nested generics
\`\`\`

**Key Takeaways:**
1. Simplify complex type operations
2. Avoid deep generic nesting
3. Use type assertions when types become too complex` },
      { id: 'project-references', title: 'Project References', content: `**What are Project References?**

Project references split a TypeScript project into multiple sub-projects that can be built independently and incrementally. They enable parallel compilation and better IDE performance for large codebases.

**Why Project References Matter:**
- Build projects in parallel
- Incremental builds across packages
- Better IDE performance in large codebases
- Clear dependency boundaries

**How Project References Work (Step-by-Step):**
1. Enable composite: \`"composite": true\`
2. Set declaration: \`"declaration": true\`
3. Reference other projects: \`"references": [{ "path": "../other" }]\`
4. Build with tsc --build

**Code Example:**
\`\`\`json
// Root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "packages/core" },
    { "path": "packages/utils" },
    { "path": "packages/app" }
  ]
}
\`\`\`

\`\`\`json
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
\`\`\`

**Benefits:**
- Parallel compilation
- Incremental builds
- Better IDE performance

**Common Mistakes:**
\`\`\`json
// Mistake: Missing composite flag
{
  "references": [{ "path": "../core" }]
  // core doesn't have composite: true!
}

// Fix: Ensure referenced projects have composite
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true
  }
}

// Mistake: Circular references
// A references B, B references A
// This is not allowed!
\`\`\`

**Best Practices:**
- Use project references for monorepos
- Keep dependency graph acyclic
- Use composite and declaration together
- Build with tsc --build for incremental builds

**Real-World Angular Example:**
\`\`\`json
// Angular workspace with project references
{
  "references": [
    { "path": "projects/shared" },
    { "path": "projects/core" },
    { "path": "projects/feature-a" },
    { "path": "projects/feature-b" }
  ]
}
\`\`\`

**Key Takeaways:**
1. Project references enable incremental builds across packages
2. Use composite and declaration flags together
3. Keep the dependency graph acyclic` }
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
      { id: 'union-intersection', title: 'Union vs Intersection', content: `**Union vs Intersection Types**

Union types (\`|\`) allow a value to be one of several types. Intersection types (\`&\`) combine multiple types into one - a value must satisfy ALL types. Understanding when to use each is fundamental to TypeScript.

**Why This Distinction Matters:**
- Model real-world data relationships correctly
- Choose the right type composition strategy
- Avoid confusing union and intersection semantics
- Build accurate API types

**Union Types (\`|\`):**
- Value can be ANY of the types
- Use for: API responses, state machines, optional values
- Narrow before using type-specific methods

**Intersection Types (\`&\`):**
- Value must be ALL of the types
- Use for: composing objects, extending interfaces
- Combine multiple object shapes

**Code Example:**
\`\`\`typescript
// Union (OR)
type A = string | number; // A is string OR number

// Intersection (AND)
type B = { name: string } & { age: number };
// B has both name AND age

// Common mistakes
const x: string | number = "hello";
x.toUpperCase(); // Error!

// Fix: Narrow first
if (typeof x === "string") {
  x.toUpperCase(); // OK
}

const y: { name: string } & { age: number } = {
  name: "John",
  age: 30
};

// Discriminated union (preferred pattern)
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };
\`\`\`

**Key Takeaways:**
1. Union (\`|\`) = OR, Intersection (\`&\`) = AND
2. Narrow unions before using type-specific methods
3. Use discriminated unions for complex union patterns` },
      { id: 'type-assertion', title: 'Type Assertions', content: `**Type Assertions**

Type assertions tell TypeScript to treat a value as a specific type. They're used when you know more about a type than TypeScript can infer, but they bypass type checking - use carefully.

**Why Type Assertions Matter:**
- Work with external data (API responses, DOM)
- Bridge JavaScript and TypeScript codebases
- Handle dynamic data shapes
- Disable strict null checks when needed

**Assertion Forms:**
1. \`as\` keyword: \`value as Type\`
2. Angle brackets: \`<Type>value\` (JSX conflicts)
3. Non-null assertion: \`value!\`

**Code Example:**
\`\`\`typescript
// as keyword
const input = document.getElementById("input") as HTMLInputElement;
input.value = "hello";

// ! non-null assertion
function getLength(s: string | null) {
  return s!.length; // s is not null
}

// as const
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
// config.apiUrl is "https://api.example.com", not string

// Type assertions bypass type checking - use carefully!
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Overusing assertions
const data = response as any as User; // Double assertion!

// Fix: Use type guards
function isUser(data: unknown): data is User {
  return typeof data === "object" && data !== null && "name" in data;
}

// Mistake: Using ! without checking
function process(s: string | null) {
  return s!.length; // Might crash!
}

// Fix: Check first
function process(s: string | null) {
  if (s === null) return 0;
  return s.length;
}
\`\`\`

**Best Practices:**
- Prefer type guards over assertions
- Use assertions only when you're certain of the type
- Avoid \`as any\` - use \`unknown\` instead
- Use non-null assertion (\`!\`) sparingly

**Real-World Angular Example:**
\`\`\`typescript
// Type assertion in Angular
@Component({ ... })
export class FormComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  focus() {
    this.input.nativeElement.focus();
  }
}
\`\`\`

**Key Takeaways:**
1. Type assertions bypass type checking
2. Prefer type guards over assertions
3. Use non-null assertion (\`!\`) only when certain` },
      { id: 'common-patterns', title: 'Common Patterns', content: `**Common TypeScript Patterns**

These patterns solve everyday TypeScript challenges: building type-safe APIs, creating flexible components, and maintaining large codebases with type safety.

**Key Patterns:**
1. Builder pattern with type accumulation
2. Type-safe event emitters
3. Discriminated unions for state
4. Phantom types for compile-time validation

**Code Example:**
\`\`\`typescript
// Builder pattern
function createBuilder<T>() {
  return {
    set<K extends string, V>(
      key: K,
      value: V
    ): createBuilder<T & Record<K, V>> {
      return this as any;
    },
    build(): T {
      return this as T;
    }
  };
}

// Type-safe events
class TypedEventEmitter<Events extends Record<string, any>> {
  on<K extends keyof Events>(
    event: K,
    handler: (data: Events[K]) => void
  ) {
    // ...
  }
  emit<K extends keyof Events>(event: K, data: Events[K]) {
    // ...
  }
}

type Events = {
  click: { x: number; y: number };
  keydown: { key: string };
};

const emitter = new TypedEventEmitter<Events>();
emitter.on("click", (data) => console.log(data.x));
\`\`\`

**Key Takeaways:**
1. Builder pattern accumulates types through method chains
2. Discriminated unions enable type-safe state machines
3. Type-safe events prevent wrong event names or data` }
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

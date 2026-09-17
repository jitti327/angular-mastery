import { Lesson } from '../models/lesson.model';

export const TS_FOUNDATION_LESSONS: Lesson[] = [
  {
    id: 201, slug: 'ts-introduction', title: 'TypeScript Fundamentals',
    description: 'Master the core building blocks of TypeScript.',
    level: 'beginner', duration: '30 min',
    objectives: ['Understand type annotations', 'Master basic types', 'Learn type inference', 'Use interfaces'],
    topics: [
      { id: 'type-annotations', title: 'Type Annotations', content: `**What are Type Annotations?**

Type annotations are explicit labels you add to variables, function parameters, and return values to tell TypeScript what type they should be. Think of them as contracts that ensure data flows correctly through your code.

**Why Type Annotations Matter:**
- Catch type errors at compile time before runtime bugs appear
- Enable better IDE autocompletion and refactoring
- Serve as self-documenting code for your team
- Prevent entire classes of bugs like passing strings to numeric functions

**How to Use Type Annotations (Step-by-Step):**
1. Variable annotations: Add \`type\` after the variable name: \`let age: number = 30\`
2. Function parameters: Annotate each parameter: \`function greet(name: string)\`
3. Return types: Specify what functions return: \`() => string\`
4. Let TypeScript infer when the type is obvious from initialization

**Code Example:**
\`\`\`typescript
// Basic annotations
let name: string = "John";
let age: number = 30;
let isStudent: boolean = false;
let scores: number[] = [90, 85, 95];

// Function annotations
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function with explicit types
const add = (a: number, b: number): number => a + b;

// Return type inference - TypeScript can figure this out
const multiply = (a: number, b: number) => a * b; // inferred as number

// Object annotations
interface User {
  name: string;
  age: number;
  email?: string; // optional
}

const user: User = { name: "John", age: 30 };
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Over-annotating when inference works
const name: string = "John"; // Redundant - inference handles this

// Better: Let TypeScript infer simple cases
const name = "John"; // Inferred as string

// Mistake: Using 'any' to avoid annotation
let data: any = fetchData(); // Loses all type safety

// Better: Use 'unknown' and narrow the type
let data: unknown = fetchData();
if (typeof data === "string") {
  console.log(data.toUpperCase()); // Safe
}
\`\`\`

**Best Practices:**
- Annotate function parameters and return types for clarity
- Let TypeScript infer simple variable types from initialization
- Use \`unknown\` instead of \`any\` for values with uncertain types
- Add annotations to object literals for complex shapes

**Real-World Angular Example:**
\`\`\`typescript
// Angular component with proper annotations
@Component({
  selector: 'app-user-profile',
  template: \`
    <h1>{{ user.name }}</h1>
    <p>Age: {{ user.age }}</p>
  \`
})
export class UserProfileComponent {
  user: User = { name: "John", age: 30 };

  getUserGreeting(): string {
    return \`Hello, \${this.user.name}!\`;
  }
}
\`\`\`

**Key Takeaways:**
1. Type annotations catch errors at compile time, not runtime
2. Use \`unknown\` over \`any\` to maintain type safety
3. Annotate function signatures; infer simple variable types` },
      { id: 'basic-types', title: 'Basic Types', content: `**What are Basic Types?**

Basic types are TypeScript's building blocks for describing data. They include primitives (string, number, boolean), special types (any, unknown, never, void), and compound types (tuples, enums). Choosing the right type ensures your code is both flexible and safe.

**Why Basic Types Matter:**
- Prevent type mismatches that cause runtime errors
- Enable TypeScript's compiler to optimize your code
- Make your intentions clear to other developers
- Foundation for all advanced TypeScript features

**How Basic Types Work (Step-by-Step):**
1. Use primitives for simple values: \`string\`, \`number\`, \`boolean\`
2. Use \`any\` sparingly - it disables type checking
3. Use \`unknown\` for values you'll narrow later
4. Use \`never\` for functions that never return
5. Use \`void\` for functions with no return value

**Code Example:**
\`\`\`typescript
// Primitive types
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;

// Special types
let anything: any = "can be anything"; // Avoid!
let unknownVal: unknown = "safer any"; // Preferred
let neverVal: never; // Never returns
let voidFunc: void = undefined; // No return

// Tuple - fixed-length array with specific types
let tuple: [string, number] = ["John", 30];

// Enum - named constants
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
const dir: Direction = Direction.Up;

// Type assertions (use sparingly)
let input = document.getElementById("input") as HTMLInputElement;
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using 'any' for everything
function process(data: any): any { return data; }
// No type safety at all

// Fix: Use 'unknown' and narrow
function process(data: unknown): unknown {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return data;
}

// Mistake: Unnecessary type assertions
const num: number = 42 as number; // Redundant

// Fix: Let inference work
const num = 42; // Inferred correctly
\`\`\`

**Best Practices:**
- Prefer \`unknown\` over \`any\` - you must narrow before using
- Use enums for fixed sets of related constants
- Use tuples for fixed-length arrays with mixed types
- Avoid \`never\` unless you're writing type-level utilities

**Real-World Use Cases:**
- Angular services: Use interfaces for API responses
- React components: Type props with interfaces
- Node.js: Type request/response objects

**Key Takeaways:**
1. Primitives (string, number, boolean) cover most use cases
2. \`unknown\` is the type-safe alternative to \`any\`
3. Enums provide named constants for better readability` },
      { id: 'interfaces', title: 'Interfaces', content: `**What are Interfaces?**

Interfaces define the shape of objects - what properties they have and what types those properties are. They're contracts that objects must follow, enabling type checking and autocompletion across your codebase.

**Why Interfaces Matter:**
- Enforce consistent object shapes across your codebase
- Enable powerful IDE features like autocompletion
- Make refactoring safe - change the interface, TypeScript shows all affected code
- Create reusable type contracts shared across modules

**How Interfaces Work (Step-by-Step):**
1. Define an interface with required properties and types
2. Mark optional properties with \`?\`
3. Extend interfaces to create specialized versions
4. Use interfaces for function signatures

**Code Example:**
\`\`\`typescript
// Basic interface
interface User {
  name: string;
  age: number;
  email?: string; // optional
}

const user: User = {
  name: "John",
  age: 30
};

// Extending interfaces
interface Employee extends User {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "John",
  age: 30,
  employeeId: 123,
  department: "Engineering"
};

// Interface for functions
interface Calculator {
  (a: number, b: number): number;
}

const add: Calculator = (a, b) => a + b;

// Interface for classes
interface Serializable {
  serialize(): string;
}

class UserModel implements Serializable {
  constructor(public name: string, public age: number) {}
  serialize(): string {
    return JSON.stringify({ name: this.name, age: this.age });
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Forgetting optional properties
interface Config {
  host: string;
  port: number;
  debug?: boolean;
}

// This fails if debug is missing and you try to access it
const config: Config = { host: "localhost", port: 3000 };
// config.debug could be undefined!

// Fix: Check before accessing optional properties
if (config.debug) {
  console.log("Debug mode");
}

// Mistake: Using interface when type alias is better for unions
interface StringOrNumber {
  // Cannot express: string | number
}

// Fix: Use type alias for union types
type StringOrNumber = string | number;
\`\`\`

**Best Practices:**
- Use interfaces for object shapes and class contracts
- Use type aliases for unions, intersections, and primitives
- Extend interfaces rather than duplicating properties
- Name interfaces with nouns (User, Config) not adjectives

**Real-World Angular Example:**
\`\`\`typescript
// Shared interface across components
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Service using the interface
@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];

  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
\`\`\`

**Key Takeaways:**
1. Interfaces define object shapes - use them for objects and classes
2. Optional properties (\`?\`) need checks before access
3. Use type aliases for unions; interfaces for object shapes` },
      { id: 'type-inference', title: 'Type Inference', content: `**What is Type Inference?**

Type inference is TypeScript's ability to automatically determine types without explicit annotations. It analyzes how values are used and initialized to figure out their types, reducing boilerplate while maintaining type safety.

**Why Type Inference Matters:**
- Reduces code verbosity - no need to annotate obvious types
- Still provides full type safety and autocompletion
- Makes code cleaner and easier to read
- Enables gradual adoption of TypeScript

**How Type Inference Works (Step-by-Step):**
1. Variable types are inferred from their initial value
2. Function return types are inferred from return statements
3. TypeScript narrows types through control flow
4. \`as const\` infers literal types instead of general types

**Code Example:**
\`\`\`typescript
// Variable inference
let x = 5; // inferred as number
let arr = [1, 2, 3]; // inferred as number[]
let obj = { name: "John" }; // inferred as { name: string }

// Return type inference
function getFullName(first: string, last: string) {
  return \`\${first} \${last}\`; // inferred as string
}

// Better inference with as const
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const; // readonly, literal types
// config.apiUrl is "https://api.example.com", not string

// Narrowing through control flow
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's string
  } else {
    return value.toFixed(2); // TypeScript knows it's number
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Over-annotating when inference works
const name: string = "John"; // Redundant
const numbers: number[] = [1, 2, 3]; // Redundant

// Better: Let TypeScript infer
const name = "John"; // Inferred as string
const numbers = [1, 2, 3]; // Inferred as number[]

// Mistake: Losing literal types without as const
const method = "GET"; // inferred as string, not "GET"

// Fix: Use as const for literal types
const method = "GET"; // inferred as "GET"
\`\`\`

**Best Practices:**
- Let TypeScript infer simple variable types
- Add explicit annotations for function parameters and complex objects
- Use \`as const\` when you need literal types
- Check inferred types in your IDE to ensure they're correct

**Real-World Angular Example:**
\`\`\`typescript
// Inference keeps code clean
@Component({
  selector: 'app-dashboard',
  template: \`
    <div *ngFor="let item of items">{{ item.name }}</div>
  \`
})
export class DashboardComponent {
  items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ]; // Inferred as { id: number; name: string }[]

  getStatus() {
    return this.items.length > 0 ? "loaded" : "empty";
    // Inferred as string
  }
}
\`\`\`

**Key Takeaways:**
1. TypeScript infers types from initialization and usage
2. Use \`as const\` for literal types instead of general types
3. Prefer inference for simple variables; annotate for complex shapes` },
      { id: 'union-types', title: 'Union Types', content: `**What are Union Types?**

Union types allow a variable to hold values of multiple types. They use the \`|\` operator to combine types, giving you flexibility while maintaining type safety through narrowing.

**Why Union Types Matter:**
- Handle multiple possible types in a type-safe way
- Model real-world data that can be different shapes
- Enable exhaustive checking with discriminated unions
- Replace unsafe \`any\` with precise type alternatives

**How Union Types Work (Step-by-Step):**
1. Define a union with \`|\`: \`string | number\`
2. Narrow the type before using type-specific methods
3. Use \`typeof\`, \`instanceof\`, or custom guards for narrowing
4. Discriminated unions add a common property for pattern matching

**Code Example:**
\`\`\`typescript
// Basic union
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase(); // narrowed to string
  } else {
    return id.toFixed(2); // narrowed to number
  }
}

// Discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// API response union
type ApiResponse =
  | { status: "success"; data: User }
  | { status: "error"; message: string };

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data); // typed as User
  } else {
    console.log(response.message); // typed as string
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Accessing without narrowing
function process(value: string | number) {
  return value.toUpperCase(); // Error! number has no toUpperCase
}

// Fix: Narrow first
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // OK
  }
  return value.toString();
}

// Mistake: Non-exhaustive checking
function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  // Missing rectangle case!
}
\`\`\`

**Best Practices:**
- Always narrow before using type-specific methods
- Use discriminated unions for complex union patterns
- Ensure all cases are handled (exhaustive checking)
- Prefer unions over \`any\` for flexibility with safety

**Real-World Angular Example:**
\`\`\`typescript
// Union types in Angular services
type LoadingState =
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string };

@Component({
  template: \`
    <div *ngIf="state.status === 'loading'">Loading...</div>
    <div *ngIf="state.status === 'success'">
      <div *ngFor="let user of state.data">{{ user.name }}</div>
    </div>
    <div *ngIf="state.status === 'error'">{{ state.error }}</div>
  \`
})
export class UserListComponent {
  state: LoadingState = { status: "loading" };
}
\`\`\`

**Key Takeaways:**
1. Union types (\`|\`) allow multiple types with type-safe narrowing
2. Always narrow unions before using type-specific methods
3. Discriminated unions enable pattern matching in TypeScript` }
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
      { id: 'type-aliases', title: 'Type Aliases', content: `**What are Type Aliases?**

Type aliases create a new name for an existing type using the \`type\` keyword. They can alias primitives, unions, intersections, and complex object types, making your code more readable and reusable.

**Why Type Aliases Matter:**
- Create meaningful names for complex types
- Reduce repetition by reusing type definitions
- Enable union and intersection types
- Build generic types for reusable abstractions

**How Type Aliases Work (Step-by-Step):**
1. Basic alias: \`type ID = string | number\`
2. Object alias: \`type User = { name: string; age: number }\`
3. Generic alias: \`type Response<T> = { data: T; status: number }\`
4. Mapped alias: \`type Optional<T> = { [K in keyof T]?: T[K] }\`

**Code Example:**
\`\`\`typescript
// Basic type alias
type ID = string | number;
type Point = { x: number; y: number };

// Function type alias
type Callback = (data: string) => void;

// Generic type alias
type Response<T> = {
  data: T;
  status: number;
  message: string;
};

const userResponse: Response<User> = {
  data: user,
  status: 200,
  message: "Success"
};

// Mapped type alias
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type User = { name: string; age: number };
type OptionalUser = Optional<User>;
// { name?: string; age?: number }
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using type alias for everything
type User = { name: string; age: number };
// Later you might need declaration merging - interfaces support this

// Fix: Use interfaces for object shapes when possible
interface User {
  name: string;
  age: number;
}

// Mistake: Circular type aliases
type A = { b: B };
type B = { a: A }; // Works but can be confusing

// Fix: Keep type relationships clear
type A = { b: B };
interface B { a: A }
\`\`\`

**Best Practices:**
- Use type aliases for unions, intersections, and primitives
- Use interfaces for object shapes and class contracts
- Name type aliases with PascalCase
- Export frequently used types for reuse

**Real-World Angular Example:**
\`\`\`typescript
// Type aliases for Angular forms
type FormValue = {
  name: string;
  email: string;
  age: number;
};

type ValidationErrors = {
  [key in keyof FormValue]?: string;
};

@Component({
  selector: 'app-signup',
  template: \`<form #form="ngForm">...</form>\`
})
export class SignupComponent {
  formValue: FormValue = { name: "", email: "", age: 0 };
  errors: ValidationErrors = {};
}
\`\`\`

**Key Takeaways:**
1. Type aliases create names for existing types
2. Use them for unions, intersections, and complex shapes
3. Prefer interfaces when you need declaration merging` },
      { id: 'intersections', title: 'Intersections & Unions', content: `**What are Intersections and Unions?**

Intersections (\`&\`) combine multiple types into one - a value must satisfy ALL types. Unions (\`|\`) allow a value to be ANY of the types. Together they model complex data relationships precisely.

**Why Intersections and Unions Matter:**
- Model real-world data that combines multiple shapes
- Create flexible APIs that accept multiple types
- Build discriminated unions for pattern matching
- Compose types from smaller, reusable pieces

**How They Work (Step-by-Step):**
1. Intersections: \`type C = A & B\` - C has all properties of A AND B
2. Unions: \`type C = A | B\` - C can be A OR B
3. Discriminated unions add a common tag for narrowing
4. Use type guards to safely narrow union types

**Code Example:**
\`\`\`typescript
// Intersection (AND)
type A = { name: string };
type B = { age: number };
type C = A & B; // { name: string; age: number }

// Union (OR)
type Status = "loading" | "success" | "error";
type Result = string | number;

// Discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// Complex intersection
type WithTimestamp = { createdAt: Date; updatedAt: Date };
type WithId = { id: number };
type BaseEntity = WithId & WithTimestamp;

interface User extends BaseEntity {
  name: string;
  email: string;
}
// User has id, createdAt, updatedAt, name, email
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Overusing intersections
type TooMuch = A & B & C & D & E; // Hard to debug

// Fix: Compose incrementally
type Base = A & B;
type Extended = Base & C;

// Mistake: Non-exhaustive union checking
function getStatus(status: Status): string {
  if (status === "loading") return "Loading...";
  if (status === "success") return "Done!";
  // Missing "error" case!
}

// Fix: Use exhaustive checking
function getStatus(status: Status): string {
  switch (status) {
    case "loading": return "Loading...";
    case "success": return "Done!";
    case "error": return "Failed!";
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}
\`\`\`

**Best Practices:**
- Use intersections for composing object types
- Use unions for values that can be multiple shapes
- Add discriminants (like \`kind\` or \`type\`) to union members
- Ensure all union cases are handled

**Real-World Angular Example:**
\`\`\`typescript
// Intersections for API models
type Timestamped = { createdAt: Date; updatedAt: Date };
type Identifiable = { id: number };

type Article = Identifiable & Timestamped & {
  title: string;
  content: string;
  author: User;
};

// Union for component states
type ArticleState =
  | { status: "loading" }
  | { status: "loaded"; articles: Article[] }
  | { status: "error"; message: string };
\`\`\`

**Key Takeaways:**
1. Intersections (\`&\`) combine types - value must satisfy ALL
2. Unions (\`|\`) allow alternatives - value must satisfy ANY
3. Add discriminants to unions for safe pattern matching` },
      { id: 'differences', title: 'Interface vs Type', content: `**What's the Difference Between Interface and Type?**

Both interfaces and type aliases define object shapes, but they have key differences. Interfaces support declaration merging and are generally preferred for object types. Type aliases support unions, intersections, and more complex type operations.

**Why This Distinction Matters:**
- Choose the right tool for the job
- Interfaces enable declaration merging for extending third-party types
- Type aliases enable union types and complex compositions
- Consistency improves code maintainability

**When to Use Each (Step-by-Step):**
1. Use interfaces for: object shapes, class contracts, extending types
2. Use type aliases for: unions, intersections, primitives, mapped types
3. Use interfaces when you need declaration merging
4. Use type aliases for complex type-level computations

**Code Example:**
\`\`\`typescript
// Interface: extends
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type: intersections
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};

// Interface: declaration merging
interface User {
  name: string;
}

interface User {
  age: number;
}

// User has both name and age

// Type: no merging
type UserData = {
  name: string;
};

// Error: Duplicate identifier
// type UserData = { age: number };

// Interface for function types
interface Formatter {
  (input: string): string;
}

// Type for function types
type Formatter = (input: string) => string;

// Type for union (cannot do with interface)
type StringOrNumber = string | number;

// Interface for class implementation
interface Serializable {
  serialize(): string;
}

class UserModel implements Serializable {
  serialize() { return JSON.stringify(this); }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using type for everything
type User = { name: string };
type User = { age: number }; // Error!

// Fix: Use interface when you need merging
interface User { name: string; }
interface User { age: number; } // Works!

// Mistake: Using interface for unions
interface Status {
  // Cannot express: "loading" | "success" | "error"
}

// Fix: Use type alias for unions
type Status = "loading" | "success" | "error";
\`\`\`

**Best Practices:**
- Default to interfaces for object shapes
- Use type aliases for unions, intersections, and primitives
- Be consistent within your codebase
- Use interfaces for public APIs (easier to extend)

**Real-World Angular Example:**
\`\`\`typescript
// Interface for component contract
interface FormComponent {
  validate(): boolean;
  reset(): void;
}

// Type for configuration
type FormConfig = {
  fields: FormField[];
  validation: ValidationRules;
};

// Interface for extending library types
interface MatFormField {
  additionalProperty: string;
}
\`\`\`

**Key Takeaways:**
1. Interfaces support declaration merging; types don't
2. Use type aliases for unions and complex compositions
3. Use interfaces for object shapes and class contracts` }
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
      { id: 'function-types', title: 'Function Types', content: `**What are Function Types?**

Function types describe the signature of a function - its parameters and return type. They ensure functions are called correctly and enable higher-order functions that accept or return functions.

**Why Function Types Matter:**
- Ensure functions are called with correct argument types
- Enable callbacks and higher-order functions
- Create reusable function interfaces
- Catch errors at compile time when functions are misused

**How Function Types Work (Step-by-Step):**
1. Define parameter types: \`(a: string, b: number) => void\`
2. Define return type after the arrow: \`() => string\`
3. Use type aliases for reusable function signatures
4. Use interfaces for callable contracts

**Code Example:**
\`\`\`typescript
// Function type alias
type MathFn = (a: number, b: number) => number;

const add: MathFn = (a, b) => a + b;
const subtract: MathFn = (a, b) => a - b;

// Interface for function
interface Comparator<T> {
  (a: T, b: T): number;
}

const numberComparator: Comparator<number> = (a, b) => a - b;
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);

// Higher-order function
function createGreeter(greeting: string): (name: string) => string {
  return (name) => \`\${greeting}, \${name}!\`;
}

const hello = createGreeter("Hello");
const hi = createGreeter("Hi");

hello("John"); // "Hello, John!"
hi("Jane"); // "Hi, Jane!"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not typing callback parameters
function process(items: string[], callback) {
  items.forEach(callback); // callback is 'any'!
}

// Fix: Type the callback
function process(items: string[], callback: (item: string) => void) {
  items.forEach(callback);
}

// Mistake: Wrong return type
function getData(): string {
  return 42; // Error!
}

// Fix: Match return type
function getData(): number {
  return 42;
}
\`\`\`

**Best Practices:**
- Always type function parameters and return types
- Use type aliases for frequently used function signatures
- Prefer named functions over anonymous callbacks for clarity
- Use \`void\` for callbacks that shouldn't return values

**Real-World Angular Example:**
\`\`\`typescript
// Angular service with typed functions
@Injectable({ providedIn: 'root' })
export class DataService {
  private transform<T>(data: T[], fn: (item: T) => T): T[] {
    return data.map(fn);
  }

  getProcessedUsers(): User[] {
    return this.transform(this.users, user => ({
      ...user,
      name: user.name.toUpperCase()
    }));
  }
}
\`\`\`

**Key Takeaways:**
1. Function types ensure correct parameter and return types
2. Type aliases create reusable function signatures
3. Always type callback parameters to avoid \`any\`` },
      { id: 'optional-default', title: 'Optional & Default Parameters', content: `**What are Optional and Default Parameters?**

Optional parameters (\`?\`) allow arguments to be omitted. Default parameters provide fallback values when arguments aren't passed. Together they create flexible functions with sensible defaults.

**Why Optional and Default Parameters Matter:**
- Create flexible APIs with sensible defaults
- Reduce function overload complexity
- Make functions easier to call with fewer arguments
- Maintain backward compatibility when adding parameters

**How They Work (Step-by-Step):**
1. Optional parameters: Add \`?\` after the parameter name
2. Required parameters must come before optional ones
3. Default parameters: Add \`= defaultValue\` after the type
4. Default parameters can be placed after required ones

**Code Example:**
\`\`\`typescript
// Optional parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}!\`;
}

greet("John"); // "Hello, John!"
greet("John", "Hi"); // "Hi, John!"

// Default parameters
function createUser(
  name: string,
  role: string = "user",
  active: boolean = true
) {
  return { name, role, active };
}

createUser("John"); // { name: "John", role: "user", active: true }
createUser("Admin", "admin"); // { name: "Admin", role: "admin", active: true }

// Destructuring with defaults
function configure({
  host = "localhost",
  port = 3000,
  debug = false
}: { host?: string; port?: number; debug?: boolean } = {}) {
  return { host, port, debug };
}

configure(); // { host: "localhost", port: 3000, debug: false }
configure({ port: 8080 }); // { host: "localhost", port: 8080, debug: false }
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Required after optional
function bad(a?: string, b: number) {} // Error!

// Fix: Required before optional
function good(a: string, b?: number) {}

// Mistake: Undefined default with wrong type
function process(value: string = undefined) {} // Error!

// Fix: Match types
function process(value: string | undefined = undefined) {}

// Mistake: Using default for complex objects
function create(config = { host: "localhost" }) {
  // Config is readonly literal type
}

// Fix: Type the parameter explicitly
function create(config: Config = { host: "localhost", port: 3000 }) {}
\`\`\`

**Best Practices:**
- Put required parameters first, then optional, then defaults
- Use default parameters over optional when you need a fallback
- Document default values in JSDoc comments
- Avoid complex default values - keep them simple

**Real-World Angular Example:**
\`\`\`typescript
// Angular component with defaults
@Component({
  selector: 'app-button',
  template: \`
    <button [class]="variant">{{ label }}</button>
  \`
})
export class ButtonComponent {
  @Input() label: string;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
}
\`\`\`

**Key Takeaways:**
1. Optional parameters (\`?\`) can be omitted in function calls
2. Default parameters provide fallback values automatically
3. Required parameters must come before optional/default ones` },
      { id: 'overloads', title: 'Function Overloads', content: `**What are Function Overloads?**

Function overloads let a single function accept different argument types and return different types based on the input. TypeScript uses overload signatures for type checking while the implementation handles all cases.

**Why Function Overloads Matter:**
- Handle multiple input types with a single function
- Provide precise return types for each input type
- Create flexible APIs without losing type safety
- Replace multiple similar functions with one implementation

**How Overloads Work (Step-by-Step):**
1. Write overload signatures (the contract)
2. Write one implementation that handles all cases
3. Implementation signature is not visible from outside
4. TypeScript picks the best overload based on arguments

**Code Example:**
\`\`\`typescript
// Overload signatures
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;

// Implementation
function format(value: string | number | Date): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value.toISOString();
  }
}

format("hello"); // "HELLO"
format(3.14159); // "3.14"
format(new Date()); // "2024-01-15T..."

// Overloaded class method
class ApiClient {
  get(url: string): Promise<string>;
  get(url: string, options: RequestOptions): Promise<string>;
  get(url: string, options?: RequestOptions): Promise<string> {
    return fetch(url, options);
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Implementation signature visible
function process(input: string): string;
function process(input: number): number;
function process(input: any): any { // Visible to callers!
  return input;
}

// Fix: Implementation should not be callable directly
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  return input;
}

// Mistake: Overlapping signatures
function test(x: string): void;
function test(x: string, y?: number): void; // Overlaps!
\`\`\`

**Best Practices:**
- Only add overloads when the return type changes
- Keep overload signatures minimal and clear
- Use generics instead of overloads when possible
- Document each overload with JSDoc

**Real-World Angular Example:**
\`\`\`typescript
// Angular service with overloads
@Injectable({ providedIn: 'root' })
export class HttpService {
  get(url: string): Observable<any>;
  get<T>(url: string): Observable<T>;
  get<T>(url: string, options: HttpOptions): Observable<T>;
  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }
}
\`\`\`

**Key Takeaways:**
1. Overload signatures define the contract; implementation handles all cases
2. Use overloads when return types differ based on input
3. Prefer generics over overloads for simpler type parameters` }
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
      { id: 'generic-functions', title: 'Generic Functions', content: `**What are Generic Functions?**

Generics let you write reusable, type-safe code by parameterizing types. They're like type variables that get replaced with actual types when the code runs, preserving type information through complex operations.

**Why Generics Matter:**
- Write type-safe reusable functions and classes
- Maintain type information through complex operations
- Create flexible APIs that work with any type
- Catch type errors at compile time, not runtime

**How Generics Work (Step-by-Step):**
1. Define a type parameter: \`function identity<T>(value: T): T\`
2. Use the type parameter in place of concrete types
3. When calling, TypeScript infers or you specify the actual type
4. The type parameter ensures type consistency throughout

**Code Example:**
\`\`\`typescript
// Basic generic function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // "hello"
identity<number>(42); // 42
identity("world"); // TypeScript infers string

// Multiple type params
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

pair("hello", 42); // ["hello", 42]

// Generic arrow function
const firstElement = <T>(arr: T[]): T | undefined => arr[0];

firstElement([1, 2, 3]); // number | undefined
firstElement(["a", "b"]); // string | undefined
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Overusing 'any' instead of generics
function getFirst(arr: any[]): any { return arr[0]; }
// Loses type information

// Fix: Use generics
function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }

// Mistake: Unnecessary type annotation when inference works
identity<string>("hello"); // String is redundant

// Fix: Let TypeScript infer
identity("hello"); // Inferred as string
\`\`\`

**Best Practices:**
- Use meaningful type parameter names (T, K, V, or descriptive)
- Let TypeScript infer types when possible
- Use constraints when you need type-specific operations
- Prefer generic defaults for convenience

**Real-World Angular Example:**
\`\`\`typescript
// Generic API service
@Injectable({ providedIn: 'root' })
export class ApiService {
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T, R>(url: string, data: T): Observable<R> {
    return this.http.post<R>(url, data);
  }
}

// Usage with type inference
this.api.get<User[]>('/api/users').subscribe(users => {
  // users is User[]
});
\`\`\`

**Key Takeaways:**
1. Generics preserve type information in reusable code
2. TypeScript can often infer generic types automatically
3. Use constraints to limit what types are acceptable` },
      { id: 'constraints', title: 'Generic Constraints', content: `**What are Generic Constraints?**

Generic constraints restrict what types a generic parameter can be. Using \`extends\`, you ensure the type has specific properties or methods, enabling safe operations on generic values.

**Why Generic Constraints Matter:**
- Ensure generic types have required properties
- Enable type-safe operations on generic values
- Prevent runtime errors from missing properties
- Create more precise and useful generic types

**How Constraints Work (Step-by-Step):**
1. Define constraint: \`<T extends HasLength>\`
2. TypeScript ensures T has all properties of HasLength
3. You can safely use those properties inside the function
4. Callers must provide types that satisfy the constraint

**Code Example:**
\`\`\`typescript
// Basic constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
getProperty(user, "name"); // "John"
getProperty(user, "age"); // 30
// getProperty(user, "email"); // Error!

// Interface constraint
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): void {
  console.log(value.length);
}

logLength("hello"); // 5
logLength([1, 2, 3]); // 3
// logLength(123); // Error! number has no length

// Class constraint
function createInstance<T extends new () => any>(Constructor: T): T {
  return new Constructor();
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Missing constraint
function getLength<T>(value: T) {
  return value.length; // Error! T might not have length
}

// Fix: Add constraint
function getLength<T extends HasLength>(value: T) {
  return value.length; // Safe
}

// Mistake: Over-constraining
function process<T extends string | number>(value: T) {
  // Too restrictive - what if we need arrays?
}

// Fix: Use appropriate constraints
function process<T extends { toString(): string }>(value: T) {
  return value.toString();
}
\`\`\`

**Best Practices:**
- Use constraints to ensure type safety
- Prefer specific constraints over broad ones
- Use keyof for property access constraints
- Combine multiple constraints with intersections

**Real-World Angular Example:**
\`\`\`typescript
// Generic with constraint
interface Identifiable {
  id: number;
}

function findById<T extends Identifiable>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Usage - TypeScript ensures User has 'id'
const user = findById(this.users, 123);
\`\`\`

**Key Takeaways:**
1. Constraints (\`extends\`) ensure types have required properties
2. Use \`keyof\` for safe property access on generics
3. Don't over-constrain - keep generics flexible when possible` },
      { id: 'utility-types', title: 'Utility Types', content: `**What are Utility Types?**

Utility types are built-in TypeScript types that transform other types. They provide common type operations like making all properties optional, picking specific properties, or making everything readonly.

**Why Utility Types Matter:**
- Avoid writing repetitive type transformations
- Create consistent type patterns across your codebase
- Transform types for specific use cases (updates, views, etc.)
- Learn type-level programming patterns

**How Utility Types Work (Step-by-Step):**
1. \`Partial<T>\` - Makes all properties optional
2. \`Required<T>\` - Makes all properties required
3. \`Pick<T, K>\` - Selects specific properties
4. \`Omit<T, K>\` - Excludes specific properties
5. \`Readonly<T>\` - Makes all properties readonly
6. \`Record<K, V>\` - Creates an object type with keys K and values V

**Code Example:**
\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// Partial - all optional
const updateUser: Partial<User> = { name: "John" };

// Required - all required
type StrictUser = Required<User>;

// Pick - select properties
type UserName = Pick<User, "name">; // { name: string }

// Omit - exclude properties
const userWithoutEmail: Omit<User, "email"> = {
  name: "John",
  age: 30
};

// Record
type Users = Record<string, User>;
const users: Users = {
  "1": { name: "John", age: 30, email: "john@example.com" }
};

// Readonly
const readonlyUser: Readonly<User> = {
  name: "John", age: 30, email: "john@example.com"
};
// readonlyUser.name = "Jane"; // Error!
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using Partial for initial values
const user: Partial<User> = {}; // All properties undefined!

// Fix: Provide required properties
const user: Partial<User> = { name: "John", email: "john@test.com" };

// Mistake: Overusing Omit
type UserWithId = Omit<User, "email"> & { id: number };

// Fix: Use Pick for positive selection
type UserData = Pick<User, "name" | "age"> & { id: number };
\`\`\`

**Best Practices:**
- Use Partial for update operations (PATCH)
- Use Pick/Omit to create view-specific types
- Use Readonly for immutable data
- Use Record for dictionary-like structures

**Real-World Angular Example:**
\`\`\`typescript
// Angular forms with utility types
interface UserForm {
  name: string;
  email: string;
  age: number;
}

// For create form - all required
type CreateUserForm = UserForm;

// For update form - all optional
type UpdateUserForm = Partial<UserForm>;

// For display - omit sensitive fields
type UserDisplay = Omit<UserForm, 'email'>;
\`\`\`

**Key Takeaways:**
1. Utility types transform existing types for specific use cases
2. Use Partial for updates, Pick/Omit for views
3. Prefer built-in utilities over writing custom ones` }
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
      { id: 'conditional-types', title: 'Conditional Types', content: `**What are Conditional Types?**

Conditional types select types based on conditions, like an if-else at the type level. They use the syntax \`T extends U ? X : Y\` to create types that depend on other types.

**Why Conditional Types Matter:**
- Create types that adapt based on input types
- Extract and transform types from complex structures
- Build type-level utilities and helpers
- Enable sophisticated type inference patterns

**How Conditional Types Work (Step-by-Step):**
1. Basic syntax: \`T extends U ? X : Y\`
2. If T extends U, the type is X; otherwise Y
3. Distributes over unions automatically
4. Use \`infer\` to extract types within conditions

**Code Example:**
\`\`\`typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extracting types
type ElementType<T> = T extends (infer U)[] ? U : T;

type Numbers = ElementType<number[]>; // number
type String = ElementType<string>; // string

// Distributive conditional type
type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null>; // string
type B = NonNullable<number | undefined>; // number

// Nested conditional types
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  "object";
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Unexpected distribution
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]

// Fix: Wrap to prevent distribution
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Result = ToArrayNonDist<string | number>; // (string | number)[]

// Mistake: Not handling all cases
type Bad<T> = T extends string ? "yes" : never;
// Missing the "no" case
\`\`\`

**Best Practices:**
- Use conditional types for type-level logic
- Be aware of distribution over unions
- Use \`infer\` to extract types within conditions
- Test conditional types with different inputs

**Real-World Angular Example:**
\`\`\`typescript
// Conditional type for API responses
type ApiResponse<T> = T extends 'user' ? User :
                       T extends 'post' ? Post :
                       never;

function getData<T extends 'user' | 'post'>(type: T): Observable<ApiResponse<T>> {
  // Implementation
}
\`\`\`

**Key Takeaways:**
1. Conditional types select types based on conditions
2. They distribute over union types automatically
3. Use \`infer\` to extract types within conditions` },
      { id: 'mapped-types', title: 'Mapped Types', content: `**What are Mapped Types?**

Mapped types transform existing types by iterating over their properties. They use the syntax \`{ [K in keyof T]: NewType }\` to create new types based on existing ones.

**Why Mapped Types Matter:**
- Transform types systematically (make all optional, readonly, etc.)
- Create custom utility types
- Build types from other types automatically
- Ensure consistency across type transformations

**How Mapped Types Work (Step-by-Step):**
1. Basic mapping: \`{ [K in keyof T]: T[K] }\`
2. Add modifiers: \`readonly\`, \`?\`
3. Remove modifiers: \`-readonly\`, \`-?\`
4. Remap keys with \`as\`

**Code Example:**
\`\`\`typescript
// Basic mapped type
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type User = { name: string; age: number };
type OptionalUser = Optional<User>;

// Modifiers
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Key remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Filter by value type
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type Mixed = { name: string; age: number; email: string };
type StringProps = StringKeys<Mixed>;
// { name: string; email: string }
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not preserving optionality
type Required<T> = {
  [K in keyof T]: T[K]; // Preserves ? modifier
};

// Fix: Remove optionality explicitly
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// Mistake: Key remapping without type assertion
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<K>}\`]: () => T[K];
  // Error: K might not be a string
};

// Fix: Cast key to string
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
\`\`\`

**Best Practices:**
- Use mapped types for systematic type transformations
- Combine with conditional types for advanced filtering
- Test with different input types
- Use key remapping for renaming properties

**Real-World Angular Example:**
\`\`\`typescript
// Mapped type for Angular forms
type FormControls<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

interface UserForm {
  name: string;
  email: string;
  age: number;
}

type UserFormControls = FormControls<UserForm>;
// { name: FormControl<string>; email: FormControl<string>; age: FormControl<number> }
\`\`\`

**Key Takeaways:**
1. Mapped types transform types by iterating over properties
2. Use modifiers (\`readonly\`, \`?\`) to change property attributes
3. Key remapping (\`as\`) renames or filters properties` },
      { id: 'template-literals', title: 'Template Literal Types', content: `**What are Template Literal Types?**

Template literal types create string types from other string types, similar to JavaScript template literals but at the type level. They enable powerful string manipulation and type-safe string patterns.

**Why Template Literal Types Matter:**
- Create type-safe string patterns and formats
- Validate string formats at compile time
- Generate types from string patterns
- Enable sophisticated string manipulation

**How Template Literal Types Work (Step-by-Step):**
1. Basic: \`\\\`\${Type}\\\`\` combines string types
2. Unions distribute: \\\`\\\`\${"a" | "b"}\\\`\\\` = \\\`"a" | "b"\\\`
3. Use \`Capitalize\`, \`Uppercase\` for transformations
4. Use \`infer\` to extract parts of strings

**Code Example:**
\`\`\`typescript
// Basic template literal type
type Greeting = \`Hello, \${string}\`;
const g: Greeting = "Hello, World"; // OK
// const g: Greeting = "Hi, World"; // Error

// Union in template literal type
type Color = "red" | "blue" | "green";
type Size = "small" | "medium" | "large";
type ColorSize = \`\${Color}-\${Size}\`;
// "red-small" | "red-medium" | "red-large" | ...

// String transformations
type UpperFirst<S extends string> = S extends \`\${infer First}\${infer Rest}\`
  ? \`\${Uppercase<First>}\${Rest}\`
  : S;

type A = UpperFirst<"hello">; // "Hello"

// Snake to camelCase
type SnakeToCamel<S extends string> =
  S extends \`\${infer Head}_\${infer Tail}\`
    ? \`\${Head}\${SnakeToCamel<Capitalize<Tail>>}\`
    : S;

type A = SnakeToCamel<"hello_world">; // "helloWorld"
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
3. Use \`infer\` to extract parts of string types` }
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
  },
  {
    id: 210, slug: 'ts-satisfies-branded-result', title: 'Satisfies, Branded Types & Result Pattern',
    description: 'Master advanced TypeScript patterns for type safety and error handling.',
    level: 'beginner', duration: '35 min',
    objectives: ['Use the satisfies operator', 'Create branded types', 'Implement Result/Either pattern'],
    quiz: [
      {
        id: 1,
        question: 'What is the key difference between `as` and `satisfies` when typing an object literal?',
        options: [
          'There is no difference',
          '`satisfies` validates the type without widening it, preserving literal types',
          '`as` is safer than `satisfies`',
          '`satisfies` only works with primitives'
        ],
        correctIndex: 1,
        explanation: 'The `satisfies` operator validates that an expression matches a type without widening it, so literal types like `3000` or `"development"` are preserved. `as` can widen types and bypass checks.'
      },
      {
        id: 2,
        question: 'What problem do branded types solve?',
        options: [
          'They improve runtime performance',
          'They prevent mixing incompatible types that have the same underlying structure',
          'They replace interfaces',
          'They add runtime validation'
        ],
        correctIndex: 1,
        explanation: 'Branded types create nominal type identity, preventing you from accidentally passing a `PostId` where a `UserId` is expected, even though both are numbers at runtime.'
      },
      {
        id: 3,
        question: 'In the Result pattern, what does `flatMapResult` (or `andThen`) allow you to do?',
        options: [
          'Ignore errors',
          'Chain operations that each return a Result, stopping at the first error',
          'Convert all Results to success values',
          'Log errors to the console'
        ],
        correctIndex: 1,
        explanation: '`flatMapResult` chains operations that return Results. If an intermediate step fails, the error propagates without executing subsequent steps, enabling clean error handling pipelines.'
      }
    ],
    topics: [
      { id: 'satisfies', title: 'The satisfies Operator', content: `**What is the satisfies Operator?**

The \`satisfies\` operator (TypeScript 4.9+) validates that an expression matches a type WITHOUT widening it. It preserves the literal type while ensuring type safety.

**Why satisfies Matters:**
- Preserves literal types (e.g., 'readonly' stays as 'readonly', not string)
- Validates shape without losing type information
- Better than type assertions for object literals
- Enables precise type inference

**How to Use satisfies (Step-by-Step):**
1. Basic syntax: \`const x = value satisfies Type\`
2. Validates value matches Type
3. Preserves the original type (not widened)
4. Reports errors if value doesn't satisfy Type

**Code Example:**
\`\`\`typescript
// preserves literal types
const config = {
  port: 3000,
  mode: 'development'
} satisfies Record<string, string | number>;

// config.port is still 'number' (not widened to 'string | number')
console.log(config.port); // 3000

// satisfies validates but preserves type
type Colors = 'red' | 'green' | 'blue';
const color: Colors = 'red'; // OK, type is 'red'
const color2 = 'red' satisfies Colors; // OK, type is 'red'

// With readonly arrays
const routes = ['/', '/about', '/contact'] as const satisfies readonly string[];
// routes type is readonly ['/', '/about', '/contact']

// Error: Property 'missing' is missing
const bad = { port: 3000 } satisfies Record<string, string | number>;
// Error: 'missing' property is required
\`\`\`

**Key Takeaways:**
1. \`satisfies\` validates without widening
2. Use it for object literals to preserve literal types
3. Better than \`as\` for type assertions
4. Works with arrays, objects, and function types` },
      { id: 'branded', title: 'Branded Types', content: `**What are Branded Types?**

Branded types (also called nominal types) create unique type identifiers that prevent mixing incompatible types, even if they have the same underlying structure.

**Why Branded Types Matter:**
- Prevent mixing different ID types (UserId vs PostId)
- Add semantic meaning to primitive types
- Prevent accidental type mixing at compile time
- Create type-safe domain models

**How to Create Branded Types (Step-by-Step):**
1. Create a unique symbol for the brand
2. Use intersection to add the brand to the base type
3. Create helper function to construct branded values

**Code Example:**
\`\`\`typescript
// Define brand symbols
declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

// Create branded types
type UserId = Brand<number, 'UserId'>;
type PostId = Brand<number, 'PostId'>;

// Helper functions to create branded values
function UserId(id: number): UserId {
  return id as UserId;
}

function PostId(id: number): PostId {
  return id as PostId;
}

// Now these are incompatible
const userId = UserId(1);
const postId = PostId(1);

// Error: Type 'PostId' is not assignable to type 'UserId'
function getUser(id: UserId) { /* ... */ }
getUser(postId); // Compile error!

// They have the same runtime value but different types
console.log(userId === postId); // false (different brands)

// Real-world: Email and Password brands
type Email = Brand<string, 'Email'>;
type Password = Brand<string, 'Password'>;

function Email(value: string): Email {
  if (!value.includes('@')) throw new Error('Invalid email');
  return value as Email;
}

function login(email: Email, password: Password) { /* ... */ }

// Prevents accidental parameter swap
login(Email('user@test.com'), Password('secret'));
\`\`\`

**Key Takeaways:**
1. Branded types prevent mixing incompatible primitives
2. Use unique symbols for brand identity
3. Create helper functions to construct branded values
4. Essential for domain modeling (UserId vs PostId)` },
      { id: 'result', title: 'Result/Either Pattern', content: `**What is the Result/Either Pattern?**

The Result pattern represents operations that can succeed or fail, replacing exceptions with explicit type-safe error handling.

**Why Result Pattern Matters:**
- Explicit error handling (no hidden exceptions)
- Type-safe errors (compiler forces handling)
- Composable operations (map, flatMap)
- Functional programming style

**How to Implement Result (Step-by-Step):**
1. Define Result type with Ok and Err variants
2. Create helper functions (ok, err)
3. Use map/flatMap for composition
4. Pattern match to handle both cases

**Code Example:**
\`\`\`typescript
// Result type definition
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Helper constructors
function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Map over Result
function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}

// FlatMap for chaining
function flatMapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  return result.ok ? fn(result.value) : result;
}

// Usage
function divide(a: number, b: number): Result<number, string> {
  return b === 0 ? err('Cannot divide by zero') : ok(a / b);
}

function sqrt(n: number): Result<number, string> {
  return n < 0 ? err('Cannot sqrt negative') : ok(Math.sqrt(n));
}

// Chain operations
const result = flatMapResult(
  divide(10, 2),
  val => sqrt(val)
);

// Pattern match
if (result.ok) {
  console.log('Result:', result.value); // 2.236
} else {
  console.log('Error:', result.error);
}

// Pipe multiple operations
function pipe<T, E>(
  ...fns: Array<(val: T) => Result<T, E>>
): (val: T) => Result<T, E> {
  return (val) => fns.reduce(
    (acc, fn) => flatMapResult(acc, fn),
    ok(val)
  );
}
\`\`\`

**Key Takeaways:**
1. Result makes errors explicit in the type system
2. Use ok() and err() constructors
3. Chain with flatMap for sequential operations
4. Pattern match to handle both success and failure` }
    ]
  }
];

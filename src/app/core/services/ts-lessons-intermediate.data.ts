import { Lesson } from '../models/lesson.model';

export const TS_INTERMEDIATE_LESSONS: Lesson[] = [
  {
    id: 206, slug: 'ts-interfaces-advanced', title: 'Advanced Interfaces',
    description: 'Master advanced interface patterns.',
    level: 'intermediate', duration: '30 min',
    objectives: ['Use index signatures', 'Create nested interfaces', 'Apply mixins'],
    topics: [
      { id: 'index-signatures', title: 'Index Signatures', content: `**What are Index Signatures?**

Index signatures allow you to define objects with dynamic keys that follow a specific type pattern. They're essential when you don't know the exact property names at design time but know the key and value types.

**Why Index Signatures Matter:**
- Handle dynamic data structures like API responses
- Create type-safe dictionaries and maps
- Maintain type safety with flexible object shapes
- Enable autocomplete even with dynamic keys

**How Index Signatures Work (Step-by-Step):**
1. Basic syntax: \`{ [key: string]: ValueType }\`
2. Keys must be \`string\`, \`number\`, or \`symbol\`
3. All properties must be compatible with the index type
4. Combine with named properties for mixed shapes

**Code Example:**
\`\`\`typescript
// Basic index signature
interface StringMap {
  [key: string]: string;
}

const map: StringMap = {
  name: "John",
  email: "john@example.com"
};

// Numeric index signature
interface NumberArray {
  [index: number]: string;
}

// Combined signatures
interface Dictionary {
  [key: string]: string | number;
  length: number; // OK - number is compatible
}

// Real-world: typed API headers
interface HttpHeaders {
  [key: string]: string | string[];
}

// Record utility type (alternative)
type UserRoles = Record<string, string[]>;
const roles: UserRoles = {
  admin: ["read", "write", "delete"],
  user: ["read"]
};
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Incompatible named property
interface Bad {
  [key: string]: string;
  count: number; // Error! number is not string
}

// Fix: Ensure compatibility
interface Good {
  [key: string]: string | number;
  count: number;
}

// Mistake: Using index signatures when you know the keys
interface Config {
  [key: string]: any; // Loses type safety
}

// Fix: Use named properties
interface Config {
  host: string;
  port: number;
  debug: boolean;
}
\`\`\`

**Best Practices:**
- Use index signatures for truly dynamic keys
- Prefer named properties when keys are known
- Combine index signatures with named properties carefully
- Use Record<K, V> utility type as an alternative

**Real-World Angular Example:**
\`\`\`typescript
// Component with dynamic styles
@Component({
  selector: 'app-dynamic',
  template: \`
    <div [ngStyle]="dynamicStyles">Dynamic</div>
  \`
})
export class DynamicComponent {
  dynamicStyles: { [key: string]: string } = {
    'background-color': 'blue',
    'font-size': '16px'
  };
}
\`\`\`

**Key Takeaways:**
1. Index signatures handle dynamic keys with type safety
2. All named properties must be compatible with the index type
3. Use Record<K, V> for simple dictionary types` },
      { id: 'nested-interfaces', title: 'Nested Interfaces', content: `**What are Nested Interfaces?**

Nested interfaces define complex object shapes with properties that themselves have specific types, including other interfaces. They model real-world data hierarchies like API responses, database models, and configuration objects.

**Why Nested Interfaces Matter:**
- Model complex real-world data structures
- Enforce type safety across nested objects
- Enable autocompletion at every level
- Make code self-documenting

**How Nested Interfaces Work (Step-by-Step):**
1. Define leaf interfaces first (Address, Contact)
2. Reference them in parent interfaces (User)
3. Use inline types for simple nested shapes
4. Extend nested interfaces for specialized versions

**Code Example:**
\`\`\`typescript
// Define leaf interfaces first
interface Address {
  street: string;
  city: string;
  country: string;
  zipCode?: string;
}

interface Contact {
  email: string;
  phone: string;
}

// Reference in parent interface
interface User {
  name: string;
  address: Address;
  contact: Contact;
}

const user: User = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "NYC",
    country: "US"
  },
  contact: {
    email: "john@example.com",
    phone: "555-1234"
  }
};

// Nested with arrays
interface Team {
  name: string;
  members: User[];
  lead: User;
}

// Deep nesting for API response
interface ApiResponse {
  data: {
    users: User[];
    total: number;
    page: number;
  };
  status: "success" | "error";
  message?: string;
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Over-nesting inline types
interface Company {
  address: {
    street: string;
    city: string;
    country: {
      code: string;
      name: string;
    };
  };
}

// Fix: Extract nested interfaces
interface Country {
  code: string;
  name: string;
}

interface Address {
  street: string;
  city: string;
  country: Country;
}

interface Company {
  address: Address;
}

// Mistake: Missing required nested properties
const user: User = {
  name: "John",
  address: { street: "123 Main St" } // Missing city, country!
};
\`\`\`

**Best Practices:**
- Extract nested interfaces when reused
- Keep nesting depth under 3 levels
- Use inline types for simple, one-off nested shapes
- Validate nested data at runtime (use Zod, Yup, etc.)

**Real-World Angular Example:**
\`\`\`typescript
// Typed API response
interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
  status: "success" | "error";
}

// Usage in component
@Component({
  template: \`
    <div *ngIf="response">
      <div *ngFor="let user of response.data">
        {{ user.name }} - {{ user.address.city }}
      </div>
    </div>
  \`
})
export class UserListComponent {
  response: ApiResponse<User[]> | null = null;
}
\`\`\`

**Key Takeaways:**
1. Model nested data with separate, reusable interfaces
2. Keep nesting shallow (max 3 levels) for readability
3. Use generics for reusable nested structures like API responses` },
      { id: 'mixins', title: 'Interface Mixins', content: `**What are Interface Mixins?**

Mixins compose behaviors from multiple sources into a class. Since TypeScript classes can only extend one base class, mixins let you add functionality from multiple interfaces through class expression mixins.

**Why Mixins Matter:**
- Compose multiple behaviors without multiple inheritance
- Add cross-cutting concerns (logging, serialization, validation)
- Create reusable behavior modules
- Avoid diamond inheritance problems

**How Mixins Work (Step-by-Step):**
1. Define constructor type: \`type Constructor<T> = new (...args: any[]) => T\`
2. Create mixin functions that take a base and return extended class
3. Apply mixins sequentially: \`MixinA(MixinB(Base))\`
4. Final class has all mixed-in behaviors

**Code Example:**
\`\`\`typescript
// Constructor type
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin interfaces
interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(message: string): void;
}

// Mixin function
function SerializableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Serializable {
    serialize() {
      return JSON.stringify(this);
    }
  };
}

function LoggableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements Loggable {
    log(message: string) {
      console.log(\`[\${this.constructor.name}] \${message}\`);
    }
  };
}

// Usage
class User {
  constructor(public name: string) {}
}

const EnhancedUser = SerializableMixin(LoggableMixin(User));
const user = new EnhancedUser("John");
user.log("Created"); // [User] Created
console.log(user.serialize()); // {"name":"John"}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not preserving base constructor types
function BadMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    // 'this' might not have base class properties
  };
}

// Fix: Properly type 'this'
function GoodMixin<TBase extends Constructor<{ id: number }>>(Base: TBase) {
  return class extends Base {
    getId(): number {
      return this.id; // Safe - id is guaranteed
    }
  };
}

// Mistake: Circular mixin dependencies
function MixinA<T extends Constructor>(Base: T) {
  return class extends Base extends MixinB(Base) {} // Circular!
}
\`\`\`

**Best Practices:**
- Keep mixins focused on single responsibilities
- Define clear interfaces for each mixin
- Apply mixins in a consistent order
- Use TypeScript declaration merging for type merging

**Real-World Angular Example:**
\`\`\`typescript
// Angular mixins for common functionality
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
    updatedAt = new Date();
  };
}

function Identifiable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    id = crypto.randomUUID();
  };
}

// Apply to Angular models
class BaseModel {
  constructor(public name: string) {}
}

const TimestampedModel = Timestamped(BaseModel);
const FullModel = Identifiable(TimestampedModel);
\`\`\`

**Key Takeaways:**
1. Mixins compose behaviors from multiple sources
2. Define constructor types and focused interfaces
3. Apply mixins sequentially to build up functionality` }
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
      { id: 'deep-constraints', title: 'Deep Constraints', content: `**What are Deep Generic Constraints?**

Deep constraints extend generic type checking to nested property access. They ensure type safety when accessing properties of properties, preventing runtime errors from invalid nested access patterns.

**Why Deep Constraints Matter:**
- Type-safe access to nested object properties
- Prevent runtime errors in complex data structures
- Enable safe refactoring of deeply nested types
- Maintain type information through property chains

**How Deep Constraints Work (Step-by-Step):**
1. Define nested type parameters: \`<T, K1 extends keyof T>\`
2. Reference nested types: \`K2 extends keyof T[K1]\`
3. Return nested types: \`: T[K1][K2]\`
4. TypeScript validates the full chain at compile time

**Code Example:**
\`\`\`typescript
// Basic deep constraint
function getNestedValue<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  obj: T,
  key1: K1,
  key2: K2
): T[K1][K2] {
  return obj[key1][key2];
}

const user = {
  address: {
    city: "NYC",
    zipCode: "10001"
  }
};

getNestedValue(user, "address", "city"); // "NYC"
getNestedValue(user, "address", "zipCode"); // "10001"
// getNestedValue(user, "address", "street"); // Error!

// Triple nesting
function getDeepValue<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2]
>(
  obj: T,
  key1: K1,
  key2: K2,
  key3: K3
): T[K1][K2][K3] {
  return obj[key1][key2][key3];
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Too many type parameters
function get<T, K1, K2, K3, K4, K5>(
  obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5
) {} // Unwieldy!

// Fix: Use indexed access types
function get<T>(obj: T, ...keys: string[]) {
  return keys.reduce((obj, key) => obj[key], obj);
}

// Mistake: Not constraining intermediate types
function getBad<T, K extends keyof T>(obj: T, key: K) {
  return obj[key].something; // Error! obj[key] might not have 'something'
}
\`\`\`

**Best Practices:**
- Limit deep constraints to 2-3 levels
- Use helper types for frequently accessed paths
- Consider runtime validation for external data
- Use TypeScript's indexed access types for simpler patterns

**Real-World Angular Example:**
\`\`\`typescript
// Type-safe form value access
function getFormControl<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  formGroup: FormGroup<T>,
  key1: K1,
  key2: K2
): FormControl<T[K1][K2]> {
  return this.fb.group({}).get(\`\${key1}.\${key2}\`) as FormControl<T[K1][K2]>;
}
\`\`\`

**Key Takeaways:**
1. Deep constraints ensure type safety for nested property access
2. Limit nesting to 2-3 levels for readability
3. Use indexed access types for simpler patterns` },
      { id: 'generic-defaults', title: 'Generic Defaults', content: `**What are Generic Defaults?**

Generic defaults provide fallback type values when no type argument is specified. They make generic types more convenient by reducing boilerplate while maintaining flexibility when types need to be specified.

**Why Generic Defaults Matter:**
- Reduce type annotation verbosity
- Provide sensible defaults for common use cases
- Maintain backward compatibility when adding types
- Enable gradual type adoption

**How Generic Defaults Work (Step-by-Step):**
1. Basic syntax: \`<T = DefaultType>\`
2. When no type argument is provided, default is used
3. Type arguments override the default
4. Multiple defaults: \`<K = string, V = number>\`

**Code Example:**
\`\`\`typescript
// Default type parameter
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}

// Uses default
type BasicResponse = ApiResponse;
// { data: unknown; status: number; message: string }

// Overrides default
type UserResponse = ApiResponse<User>;
// { data: User; status: number; message: string }

// Multiple defaults
interface Map<K = string, V = number> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
}

// Uses both defaults
const map: Map = new Map();
// K is string, V is number

// Override one default
interface Config<V = unknown> {
  [key: string]: V;
}

const stringConfig: Config<string> = { host: "localhost" };
const numberConfig: Config<number> = { port: 3000 };
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using 'any' as default
interface Bad<T = any> {
  data: T;
}
// Defeats the purpose of generics!

// Fix: Use 'unknown' or specific default
interface Good<T = unknown> {
  data: T;
}

// Mistake: Overly specific defaults
interface Response<T = { id: number; name: string }> {
  data: T;
}
// Too specific - not reusable

// Fix: Use a general default
interface Response<T = Record<string, unknown>> {
  data: T;
}
\`\`\`

**Best Practices:**
- Use \`unknown\` as default when type is truly unknown
- Use specific defaults when there's a common use case
- Document what the default represents
- Consider if a default is needed at all

**Real-World Angular Example:**
\`\`\`typescript
// Angular generic service with defaults
@Injectable({ providedIn: 'root' })
export class CacheService<T = unknown> {
  private cache = new Map<string, T>();

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: T): void {
    this.cache.set(key, value);
  }
}

// Usage with default
const cache = new CacheService(); // CacheService<unknown>

// Usage with specific type
const userCache = new CacheService<User>(); // CacheService<User>
\`\`\`

**Key Takeaways:**
1. Generic defaults provide fallback types when arguments are omitted
2. Use \`unknown\` as a safe default over \`any\`
3. Defaults make generic types more convenient to use` },
      { id: 'type-inference-generics', title: 'Type Inference in Generics', content: `**How Does Type Inference Work with Generics?**

TypeScript automatically infers generic types from context - function arguments, return values, and usage patterns. This reduces boilerplate while maintaining full type safety.

**Why Type Inference in Generics Matters:**
- Reduces verbose type annotations
- Maintains type safety automatically
- Enables fluent APIs and method chaining
- Makes generic code easier to use

**How Generic Inference Works (Step-by-Step):**
1. Function call: TypeScript infers from arguments
2. Return type: Inferred from return statements
3. Contextual typing: Inferred from how value is used
4. Generic constraints: Narrow inferred types

**Code Example:**
\`\`\`typescript
// Inferred from argument
function create<T>(value: T): { value: T } {
  return { value };
}

const result = create("hello"); // inferred as { value: string }
const num = create(42); // inferred as { value: number }

// Inferred from constraints
function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key]);
}

const user = { name: "John", age: 30, email: "john@example.com" };
const values = pluck(user, ["name", "age"]); // (string | number)[]

// Inferred from context
function process<T>(items: T[]): T[] {
  return items.filter(Boolean);
}

const numbers = process([1, 2, 3]); // number[]
const strings = process(["a", "b"]); // string[]
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Over-specifying types
const result = create<string>("hello"); // Redundant!

// Fix: Let TypeScript infer
const result = create("hello"); // Inferred as { value: string }

// Mistake: Complex inference causing 'any'
function bad<T>(x: T) {
  return x.map(i => i); // Error: 'T' doesn't have 'map'
}

// Fix: Add constraints
function good<T extends any[]>(x: T) {
  return x.map(i => i); // Safe
}
\`\`\`

**Best Practices:**
- Let TypeScript infer when types are obvious
- Add constraints when you need specific operations
- Check inferred types in your IDE
- Use contextual typing for callbacks

**Real-World Angular Example:**
\`\`\`typescript
// Generic with inference in Angular
@Injectable({ providedIn: 'root' })
export class StoreService {
  select<T>(selector: (state: AppState) => T): Observable<T> {
    return this.state$.pipe(map(selector));
  }
}

// Usage - TypeScript infers T from selector
this.store.select(state => state.user.name); // Observable<string>
this.store.select(state => state.settings.theme); // Observable<Theme>
\`\`\`

**Key Takeaways:**
1. TypeScript infers generic types from function arguments and context
2. Use constraints to enable operations on inferred types
3. Check inferred types in your IDE to ensure correctness` }
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
      { id: 'extract-exclude', title: 'Extract & Exclude', content: `**What are Extract and Exclude?**

Extract and Exclude manipulate union types. Extract selects types from a union that match a condition. Exclude removes types from a union that match a condition. They're powerful tools for filtering type unions.

**Why Extract and Exclude Matter:**
- Filter union types to get precise subsets
- Remove unwanted types from unions
- Create clean API types from complex responses
- Enable type-safe filtering operations

**How They Work (Step-by-Step):**
1. \`Exclude<Union, Type>\` - Removes Type from Union
2. \`Extract<Union, Type>\` - Keeps only Type from Union
3. Combine with other utilities for advanced filtering
4. Use with literal types for precise control

**Code Example:**
\`\`\`typescript
// Exclude - remove types from union
type Numbers = number | string | boolean;
type OnlyNumbers = Exclude<Numbers, string | boolean>; // number

// Extract - get types from union
type Mixed = number | string | boolean;
type OnlyStrings = Extract<Mixed, string>; // string

// NonNullable
type Nullable = string | null | undefined;
type Clean = NonNullable<Nullable>; // string

// Real-world usage
interface ApiResponse {
  data: string | null;
  error: string | undefined;
}

type SuccessResponse = {
  [K in keyof ApiResponse]: Exclude<ApiResponse[K], null | undefined>;
};
// { data: string; error: string }

// Filter status types
type AllStatus = "idle" | "loading" | "success" | "error";
type ActiveStatus = Exclude<AllStatus, "idle">;
// "loading" | "success" | "error"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Confusing Exclude and Extract
type A = Exclude<string | number, string>; // number (removes string)
type B = Extract<string | number, string>; // string (keeps string)

// Remember: Exclude removes, Extract keeps

// Mistake: Not handling empty results
type Nothing = Extract<string | number, boolean>; // never

// Fix: Check for never type
type SafeExtract<T, U> = Extract<T, U> extends never ? T : Extract<T, U>;
\`\`\`

**Best Practices:**
- Use Exclude to remove specific types from unions
- Use Extract to filter unions by type
- Combine with conditional types for complex filtering
- Check for \`never\` results when filtering may be empty

**Real-World Angular Example:**
\`\`\`typescript
// Angular form types
type FormField = "name" | "email" | "password" | "confirmPassword";
type OptionalFields = "email" | "confirmPassword";
type RequiredFields = Exclude<FormField, OptionalFields>;
// "name" | "password"

// API response filtering
type ApiResponse = User | Post | Comment;
type UserResponse = Extract<ApiResponse, User>;
\`\`\`

**Key Takeaways:**
1. Exclude removes types from a union
2. Extract keeps only matching types from a union
3. Check for \`never\` when filtering may produce empty results` },
      { id: 'returntype-parameters', title: 'ReturnType & Parameters', content: `**What are ReturnType and Parameters?**

ReturnType extracts the return type of a function type. Parameters extracts the parameter types as a tuple. They enable type inference from function signatures without duplicating type definitions.

**Why ReturnType and Parameters Matter:**
- Derive types from existing functions automatically
- Keep types synchronized with function implementations
- Create type-safe wrappers and decorators
- Enable generic programming over function types

**How They Work (Step-by-Step):**
1. \`ReturnType<typeof fn>\` - Gets the return type
2. \`Parameters<typeof fn>\` - Gets parameter types as tuple
3. \`ConstructorParameters<typeof Class>\` - Constructor params
4. Use with typeof to reference function types

**Code Example:**
\`\`\`typescript
function createUser(name: string, age: number) {
  return { name, age, createdAt: new Date() };
}

// ReturnType - extract return type
type User = ReturnType<typeof createUser>;
// { name: string; age: number; createdAt: Date }

// Parameters - extract parameter types
type UserParams = Parameters<typeof createUser>;
// [name: string, age: number]

// ConstructorParameters
class User {
  constructor(public name: string, public age: number) {}
}

type UserConstructor = ConstructorParameters<typeof User>;
// [name: string, age: number]

// Usage in type-safe wrappers
function wrapFunction<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args) => {
    console.log("Calling:", fn.name);
    return fn(...args);
  };
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using ReturnType on overloaded functions
function format(input: string): string;
function format(input: number): string;
function format(input: any): string { return input; }

type Result = ReturnType<typeof format>; // string (first overload only)

// Fix: Use the implementation signature
type Result = ReturnType<typeof format>; // Still string!

// Mistake: Not handling void returns
function log(message: string): void {}
type Result = ReturnType<typeof log>; // void

// Fix: Check for void
type SafeReturn<T> = ReturnType<T> extends void ? undefined : ReturnType<T>;
\`\`\`

**Best Practices:**
- Use ReturnType to derive types from implementations
- Keep function signatures as the source of truth
- Combine with generics for reusable patterns
- Use Parameters for type-safe argument passing

**Real-World Angular Example:**
\`\`\`typescript
// Derive types from Angular methods
@Component({ ... })
export class UserComponent {
  getUser(id: number): User { ... }
  updateUser(user: User): Promise<User> { ... }
}

// Types derived automatically
type GetUserReturn = ReturnType<UserComponent['getUser']>; // User
type UpdateUserParams = Parameters<UserComponent['updateUser']>; // [user: User]
\`\`\`

**Key Takeaways:**
1. ReturnType extracts function return types automatically
2. Parameters extracts parameter types as a tuple
3. Use these to keep types synchronized with implementations` },
      { id: 'instance-type', title: 'InstanceType', content: `**What is InstanceType?**

InstanceType extracts the instance type of a constructor function or class. It's useful when working with classes as types, especially in dependency injection and factory patterns.

**Why InstanceType Matters:**
- Extract class instance types for dependency injection
- Create type-safe factory functions
- Work with constructor references as types
- Enable generic class instantiation patterns

**How InstanceType Works (Step-by-Step):**
1. \`InstanceType<typeof ClassName>\` - Gets instance type
2. Equivalent to using the class name directly as a type
3. Useful when working with constructor references
4. Combines with ConstructorParameters for full typing

**Code Example:**
\`\`\`typescript
class HttpClient {
  constructor(public baseUrl: string) {}
  get(url: string) { return fetch(this.baseUrl + url); }
}

// InstanceType - extract instance type
type Client = InstanceType<typeof HttpClient>;
// HttpClient

// Usage in dependency injection
function createClient<T extends new (...args: any[]) => any>(
  Constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new Constructor(...args);
}

const client = createClient(HttpClient, "https://api.example.com");
// client is typed as HttpClient

// Generic factory pattern
class Factory<T> {
  create(...args: any[]): T {
    // Implementation
  }
}

type Product = InstanceType<Factory<Product>>;
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Confusing with typeof
type A = typeof HttpClient; // Constructor type
type B = InstanceType<typeof HttpClient>; // Instance type

// typeof gives the constructor, InstanceType gives the instance

// Mistake: Using on non-constructor types
class NotAClass {
  static create() { return new NotAClass(); }
}

type Bad = InstanceType<typeof NotAClass.create>; // Error!
\`\`\`

**Best Practices:**
- Use InstanceType with constructor references
- Combine with ConstructorParameters for full typing
- Use for dependency injection patterns
- Prefer direct class references when possible

**Real-World Angular Example:**
\`\`\`typescript
// Generic service factory
function createService<T>(
  ServiceClass: new (...args: any[]) => T,
  ...args: any[]
): T {
  return new ServiceClass(...args);
}

// Usage
const userService = createService(UserService, this.http);
// userService is typed as UserService
\`\`\`

**Key Takeaways:**
1. InstanceType extracts the instance type from a constructor
2. Use it with constructor references for factory patterns
3. Combine with ConstructorParameters for complete typing` }
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
      { id: 'typeof', title: 'typeof Guards', content: `**What are typeof Type Guards?**

typeof guards check the primitive type of a value at runtime. They narrow union types by checking \`typeof value === "string"\`, allowing TypeScript to know the exact type within that code block.

**Why typeof Guards Matter:**
- Safely narrow union types at runtime
- Prevent runtime errors from type mismatches
- Enable type-specific operations on union values
- Work with primitives: string, number, boolean, symbol, function

**How typeof Guards Work (Step-by-Step):**
1. Check type: \`typeof value === "string"\`
2. TypeScript narrows the type in the if-block
3. Else block contains the remaining types
4. Works with: string, number, boolean, undefined, function, symbol

**Code Example:**
\`\`\`typescript
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    return value.toUpperCase(); // narrowed to string
  } else if (typeof value === "number") {
    return value.toFixed(2); // narrowed to number
  } else {
    return value ? "Yes" : "No"; // narrowed to boolean
  }
}

// typeof with type guard function
type StringOrNumber = string | number;

function isString(value: StringOrNumber): value is string {
  return typeof value === "string";
}

const value: StringOrNumber = "hello";
if (isString(value)) {
  console.log(value.toUpperCase()); // safe
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: typeof doesn't work with objects
function process(obj: User | string) {
  if (typeof obj === "object") {
    console.log(obj.name); // Error! Could be null
  }
}

// Fix: Use instanceof or in operator for objects
function process(obj: User | string) {
  if (obj instanceof User) {
    console.log(obj.name); // Safe
  }
}

// Mistake: Wrong typeof string
typeof undefined === "undefined"; // true
typeof null === "object"; // true! Historical bug
\`\`\`

**Best Practices:**
- Use typeof for primitive type narrowing
- Combine with custom type guards for objects
- Check for null separately (typeof null === "object")
- Create reusable guard functions for common patterns

**Real-World Angular Example:**
\`\`\`typescript
// Angular template with typeof
@Component({
  template: \`
    <div *ngIf="isString(data)">{{ data.toUpperCase() }}</div>
    <div *ngIf="isNumber(data)">{{ data.toFixed(2) }}</div>
  \`
})
export class DataComponent {
  data: string | number = "hello";

  isString(value: any): value is string {
    return typeof value === "string";
  }

  isNumber(value: any): value is number {
    return typeof value === "number";
  }
}
\`\`\`

**Key Takeaways:**
1. typeof guards narrow primitive types at runtime
2. They work with string, number, boolean, symbol, function, undefined
3. Use instanceof or in operator for object type narrowing` },
      { id: 'instanceof', title: 'instanceof Guards', content: `**What are instanceof Guards?**

instanceof checks if a value is an instance of a class by examining its prototype chain. It narrows union types containing different classes, enabling class-specific property access.

**Why instanceof Guards Matter:**
- Narrow unions containing different class types
- Access class-specific properties safely
- Work with error hierarchies and exception handling
- Enable polymorphic behavior in TypeScript

**How instanceof Guards Work (Step-by-Step):**
1. Check: \`value instanceof ClassName\`
2. TypeScript narrows to ClassName in the if-block
3. Works with any class, including built-in Error classes
4. Checks the entire prototype chain

**Code Example:**
\`\`\`typescript
class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
  }
}

function handleError(error: Error) {
  if (error instanceof HttpError) {
    console.log(\`HTTP \${error.statusCode}: \${error.message}\`);
  } else if (error instanceof ValidationError) {
    console.log(\`Validation error in \${error.field}: \${error.message}\`);
  } else {
    console.log(\`Unknown error: \${error.message}\`);
  }
}

// Usage
try {
  throw new HttpError(404, "Not found");
} catch (error) {
  handleError(error as Error);
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: instanceof doesn't work across iframes
const iframe = document.createElement("iframe");
document.body.appendChild(iframe);
const DateFromFrame = iframe.contentWindow!.Date;
const date = new DateFromFrame();
date instanceof Date; // false!

// Fix: Use duck typing or typeof checks
function isDate(value: any): value is Date {
  return value instanceof Date || 
    (typeof value === "object" && value !== null && "getTime" in value);
}

// Mistake: Not handling all class variants
function process(error: Error) {
  if (error instanceof HttpError) {
    // Handle HTTP error
  }
  // Missing ValidationError handling!
}
\`\`\`

**Best Practices:**
- Use instanceof for class-based type narrowing
- Handle all class variants in union types
- Consider cross-frame issues with instanceof
- Combine with custom guards for non-class types

**Real-World Angular Example:**
\`\`\`typescript
// Error handling in Angular service
@Injectable({ providedIn: 'root' })
export class ErrorHandler {
  handle(error: HttpError | ValidationError | Error) {
    if (error instanceof HttpError) {
      this.showNotification(\`HTTP \${error.statusCode}\`);
    } else if (error instanceof ValidationError) {
      this.showFieldError(error.field, error.message);
    } else {
      this.showGenericError(error.message);
    }
  }
}
\`\`\`

**Key Takeaways:**
1. instanceof checks the prototype chain for class instances
2. It narrows union types to specific class types
3. Be aware of cross-frame limitations` },
      { id: 'custom-guards', title: 'Custom Type Guards', content: `**What are Custom Type Guards?**

Custom type guards are functions that return a boolean and use the \`is\` keyword to tell TypeScript what type has been narrowed. They enable complex type narrowing logic beyond typeof and instanceof.

**Why Custom Type Guards Matter:**
- Handle complex type narrowing scenarios
- Create reusable type checking logic
- Narrow discriminated unions precisely
- Validate external data at runtime

**How Custom Type Guards Work (Step-by-Step):**
1. Return type uses \`is\`: \`value is Type\`
2. Function returns boolean
3. TypeScript uses the return value to narrow types
4. You must ensure the check is accurate

**Code Example:**
\`\`\`typescript
interface Cat {
  type: "cat";
  meow(): void;
}

interface Dog {
  type: "dog";
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return animal.type === "cat";
}

function handleAnimal(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // safe
  } else {
    animal.bark(); // safe
  }
}

// Assertion function
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected string");
  }
}

function process(data: unknown) {
  assertIsString(data);
  console.log(data.toUpperCase()); // safe - data is string
}

// Type guard for arrays
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Incorrect type guard logic
function isUser(value: any): value is User {
  return value && value.name; // Falsy values pass!
}

// Fix: More precise check
function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.age === "number"
  );
}

// Mistake: Using type assertions instead of guards
function process(value: unknown) {
  const user = value as User; // Unsafe!
  console.log(user.name); // Might crash
}

// Fix: Use type guard
function process(value: unknown) {
  if (isUser(value)) {
    console.log(value.name); // Safe
  }
}
\`\`\`

**Best Practices:**
- Create reusable guards for common type checks
- Use assertion functions for validation
- Combine with discriminated unions for pattern matching
- Always ensure guards are accurate - TypeScript trusts you

**Real-World Angular Example:**
\`\`\`typescript
// API response validation
function isApiResponse(value: unknown): value is ApiResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    "data" in value
  );
}

// In service
getData(): Observable<ApiResponse> {
  return this.http.get('/api/data').pipe(
    map(response => {
      if (!isApiResponse(response)) {
        throw new Error('Invalid response');
      }
      return response;
    })
  );
}
\`\`\`

**Key Takeaways:**
1. Custom type guards use \`is\` in return type for narrowing
2. Create reusable guards for complex type checks
3. Always verify guard accuracy - TypeScript trusts your logic` }
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
      { id: 'basic-enums', title: 'Basic Enums', content: `**What are Enums?**

Enums define a set of named constants. They can be numeric (auto-incremented) or string (explicitly assigned). Enums provide type safety and readability for fixed sets of related values.

**Why Enums Matter:**
- Create named constants for better readability
- Prevent magic strings and numbers in code
- Enable type-safe switch statements and comparisons
- Provide reverse mapping for numeric enums

**How Enums Work (Step-by-Step):**
1. Numeric enums auto-increment from 0
2. String enums require explicit values
3. Enums create a runtime object
4. Use const enum for zero-overhead

**Code Example:**
\`\`\`typescript
// Numeric enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

const dir: Direction = Direction.Up;
console.log(dir); // 0

// String enum
enum Status {
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR"
}

const status: Status = Status.Loading;
console.log(status); // "LOADING"

// Reverse mapping (numeric only)
const value = Direction.Up; // 0
const name = Direction[0]; // "Up"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using numeric enums for everything
enum Color {
  Red,    // 0
  Green,  // 1
  Blue    // 2
}

// Problem: Numbers leak into runtime
function paint(color: Color) {
  // Can accidentally pass any number
}

// Fix: Use string enums for type safety
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Mistake: Not handling all enum cases
function getDirection(dir: Direction) {
  if (dir === Direction.Up) return "up";
  if (dir === Direction.Down) return "down";
  // Missing Left and Right!
}
\`\`\`

**Best Practices:**
- Use string enums for most cases (better debugging)
- Use numeric enums only for bitwise flags or performance
- Handle all enum cases in switch statements
- Consider union types as an alternative to enums

**Real-World Angular Example:**
\`\`\`typescript
// Angular component with enums
enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger"
}

@Component({
  selector: 'app-button',
  template: \`
    <button [class]="variant">{{ label }}</button>
  \`
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() label: string = "Click me";
}
\`\`\`

**Key Takeaways:**
1. Enums define named constants for related values
2. String enums provide better debugging and type safety
3. Use const enums for zero-overhead in performance-critical code` },
      { id: 'const-enums', title: 'Const Enums', content: `**What are Const Enums?**

Const enums are completely removed during compilation - their values are inlined at usage sites. They provide the readability of enums with zero runtime overhead.

**Why Const Enums Matter:**
- Zero runtime overhead - no generated JavaScript object
- Better performance than regular enums
- Inline values for smaller bundle size
- Still provide type safety

**How Const Enums Work (Step-by-Step):**
1. Declare with \`const enum\`
2. Values are inlined at compile time
3. No runtime object is created
4. Cannot use Object.values() or reverse mapping

**Code Example:**
\`\`\`typescript
// Const enum - inlined at compile time
const enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

const color: Color = Color.Red;
// Compiles to: const color = "RED";

// When to use
// 1. Performance-critical code
// 2. When you want enum values inlined
// 3. When you don't need reverse mapping

// Comparison
enum Regular {
  A = "A",
  B = "B"
}

const enum Const {
  A = "A",
  B = "B"
}

// Regular: Regular.A references the object
// Const: Const.A is replaced with "A"
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using Object.values with const enum
const enum Color { Red = "RED", Green = "GREEN" }
const colors = Object.values(Color); // Error!

// Fix: Use regular enum if you need runtime iteration
enum Color { Red = "RED", Green = "GREEN" }
const colors = Object.values(Color); // ["RED", "GREEN"]

// Mistake: Using const enum in libraries
// Other code can't reference const enums from your library

// Fix: Use regular enums for public APIs
export enum Status { Active = "active", Inactive = "inactive" }
\`\`\`

**Best Practices:**
- Use const enums for internal, performance-critical code
- Use regular enums for public APIs
- Don't use const enums in libraries (consumers can't use them)
- Consider union types as a simpler alternative

**Real-World Angular Example:**
\`\`\`typescript
// Const enum for internal optimization
const enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE"
}

// Inlined at compile time
fetch(url, { method: HttpMethod.Get });
// Compiles to: fetch(url, { method: "GET" });
\`\`\`

**Key Takeaways:**
1. Const enums are inlined at compile time - no runtime object
2. They provide zero overhead but no reverse mapping
3. Use regular enums for public APIs where consumers need runtime access` },
      { id: 'enum-patterns', title: 'Enum Patterns', content: `**What are Enum Patterns?**

Enum patterns are common ways to extend enums with additional functionality. Since enums can have methods and can be used as namespaces, you can create rich, self-contained type systems.

**Why Enum Patterns Matter:**
- Add validation logic to enums
- Create utility functions alongside enum values
- Build type-safe API contracts
- Organize related functionality

**Common Enum Patterns:**
1. Enum as namespace for related functions
2. Enum with validation methods
3. Enum for API contracts
4. Enum with bitwise operations

**Code Example:**
\`\`\`typescript
// Enum as namespace
enum MathUtils {
  PI = 3.14159,
  E = 2.71828
}

namespace MathUtils {
  export function circleArea(radius: number): number {
    return MathUtils.PI * (radius * radius);
  }
}

// Enum with validation
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

function isHttpMethod(value: string): value is HttpMethod {
  return Object.values(HttpMethod).includes(value as HttpMethod);
}

function fetchWithMethod(method: HttpMethod, url: string) {
  return fetch(url, { method });
}

// Bitwise flags
enum Permission {
  Read = 1,
  Write = 2,
  Execute = 4
}

function hasPermission(user: number, permission: Permission): boolean {
  return (user & permission) === permission;
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Overcomplicating simple enums
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// When a simple union would work
type Status = "active" | "inactive";

// Fix: Use enum only when you need runtime values
// Otherwise use union types

// Mistake: Not validating enum values
function process(status: string) {
  // Might receive invalid value
}
\`\`\`

**Best Practices:**
- Use enums when you need runtime values or reverse mapping
- Use union types for compile-time only checks
- Add validation functions for external data
- Keep enum patterns simple and focused

**Real-World Angular Example:**
\`\`\`typescript
// Angular with enum patterns
enum ErrorCode {
  NotFound = "NOT_FOUND",
  Unauthorized = "UNAUTHORIZED",
  ServerError = "SERVER_ERROR"
}

namespace ErrorCode {
  export function getHttpStatus(code: ErrorCode): number {
    switch (code) {
      case ErrorCode.NotFound: return 404;
      case ErrorCode.Unauthorized: return 401;
      case ErrorCode.ServerError: return 500;
    }
  }
}
\`\`\`

**Key Takeaways:**
1. Enums can have methods and namespaces
2. Add validation functions for external data
3. Use union types when you don't need runtime values` }
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
      { id: 'es-modules', title: 'ES Modules', content: `**What are ES Modules?**

ES modules are the standard way to organize JavaScript/TypeScript code. They use import/export syntax to share code between files, enabling modular, maintainable applications.

**Why ES Modules Matter:**
- Organize code into reusable modules
- Control what's exposed (public API) vs hidden (implementation)
- Enable tree-shaking for smaller bundles
- Support dependency management

**How ES Modules Work (Step-by-Step):**
1. Export: \`export interface User { ... }\`
2. Named import: \`import { User } from './user'\`
3. Default import: \`import UserService from './user-service'\`
4. Re-export: \`export { User } from './user'\`

**Code Example:**
\`\`\`typescript
// Named exports
export interface User {
  name: string;
  age: number;
}

export function createUser(name: string, age: number): User {
  return { name, age };
}

// Default export
export default class UserService {
  getUser(id: string): User {
    // ...
  }
}

// Import
import UserService, { User, createUser } from "./user";

// Barrel file (index.ts)
export { User, createUser } from "./user";
export { default as UserService } from "./user-service";
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Circular dependencies
// a.ts imports from b.ts
// b.ts imports from a.ts

// Fix: Extract shared types to a third file
// types.ts contains shared interfaces
// a.ts and b.ts import from types.ts

// Mistake: Exporting everything
export class InternalHelper { ... } // Should be private!

// Fix: Only export public API
class InternalHelper { ... } // Not exported
export class PublicService { ... }
\`\`\`

**Best Practices:**
- Use named exports for better tree-shaking
- Create barrel files (index.ts) for clean imports
- Avoid circular dependencies
- Export interfaces and types separately from implementation

**Real-World Angular Example:**
\`\`\`typescript
// Angular module organization
// user.model.ts
export interface User {
  id: number;
  name: string;
}

// user.service.ts
import { User } from './user.model';
export class UserService {
  getUser(): User { ... }
}

// user.module.ts
import { UserService } from './user.service';
@NgModule({
  providers: [UserService]
})
export class UserModule {}
\`\`\`

**Key Takeaways:**
1. ES modules organize code with import/export syntax
2. Use named exports for tree-shaking and barrel files
3. Avoid circular dependencies by extracting shared types` },
      { id: 'namespaces', title: 'Namespaces', content: `**What are Namespaces?**

Namespaces group related code under a single name. They use declaration merging to split definitions across files. While less common in modern TypeScript, they're useful for declaration merging and organizing global types.

**Why Namespaces Matter:**
- Enable declaration merging across files
- Organize global type declarations
- Create type-only groupings without runtime overhead
- Useful for ambient declarations (.d.ts files)

**How Namespaces Work (Step-by-Step):**
1. Declare: \`namespace MyNamespace { ... }\`
2. Export members: \`export interface Foo { ... }\`
3. Reference: \`MyNamespace.Foo\`
4. Merge: Multiple declarations merge automatically

**Code Example:**
\`\`\`typescript
// Declaration merging
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

namespace Validation {
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return /^[A-Za-z]+$/.test(s);
    }
  }
}

// Usage
const validator = new Validation.LettersOnlyValidator();

// Namespace for global types
declare global {
  interface Window {
    myApp: {
      config: AppConfig;
    };
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Using namespaces for everything
namespace MyApp.Services { ... }
namespace MyApp.Models { ... }

// Modern approach: Use ES modules
// user.service.ts
export class UserService { ... }

// Mistake: Not using declare global
namespace MyApp {
  export interface Config { ... }
}

// Fix: Use declare global for ambient declarations
declare global {
  namespace MyApp {
    interface Config { ... }
  }
}
\`\`\`

**Best Practices:**
- Prefer ES modules over namespaces
- Use namespaces only for declaration merging
- Use declare global for augmenting global types
- Keep namespace usage minimal

**Real-World Angular Example:**
\`\`\`typescript
// Ambient declarations for third-party libraries
declare namespace Express {
  interface Request {
    user?: User;
  }
}
\`\`\`

**Key Takeaways:**
1. Namespaces enable declaration merging across files
2. Prefer ES modules for code organization
3. Use namespaces only for ambient declarations and global types` },
      { id: 'ambient', title: 'Ambient Declarations', content: `**What are Ambient Declarations?**

Ambient declarations provide type information for JavaScript code that wasn't written in TypeScript. They use \`declare\` keyword in .d.ts files to describe the shape of external code.

**Why Ambient Declarations Matter:**
- Add type safety to third-party JavaScript libraries
- Describe global variables and functions
- Enable TypeScript to check external code
- Bridge JavaScript and TypeScript codebases

**How Ambient Declarations Work (Step-by-Step):**
1. Create .d.ts file: \`declare module "library-name" { ... }\`
2. Describe exports: functions, classes, interfaces
3. Use \`declare global\` for global variables
4. Reference in code - TypeScript applies types

**Code Example:**
\`\`\`typescript
// .d.ts file
declare module "my-library" {
  export function doSomething(x: string): number;
  export interface Config {
    debug: boolean;
    timeout: number;
  }
}

// Usage
import { doSomething } from "my-library";

// Ambient namespace
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

console.log(window.myCustomProperty);

// Module augmentation
declare module "express" {
  interface Request {
    user?: User;
  }
}
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Putting implementation in .d.ts
// my-lib.d.ts
export function doSomething() {
  return 42; // Error! No implementation in declarations
}

// Fix: Only type signatures
// my-lib.d.ts
export function doSomething(x: string): number;

// Mistake: Forgetting to reference .d.ts files
// Types won't be available!

// Fix: Include in tsconfig.json
// { "include": ["src/**/*.d.ts"] }
\`\`\`

**Best Practices:**
- Use .d.ts files for third-party JavaScript libraries
- Keep declarations minimal - only what you use
- Use DefinitelyTyped (@types/*) when available
- Test type declarations with actual usage

**Real-World Angular Example:**
\`\`\`typescript
// Custom type declarations
// src/types/global.d.ts
declare global {
  interface Window {
    __NG_DEV_MODE__: boolean;
  }
}

// src/types/moment.d.ts
declare module "moment" {
  function moment(input?: string | number | Date): Moment;
  interface Moment {
    format(format: string): string;
    diff(other: Moment): number;
  }
  export default moment;
}
\`\`\`

**Key Takeaways:**
1. Ambient declarations provide types for JavaScript code
2. Use .d.ts files with \`declare\` keyword
3. Use @types/* packages when available instead of writing your own` }
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
      { id: 'basic-mapping', title: 'Basic Mapping', content: `**What are Mapped Types?**

Mapped types transform existing types by iterating over their properties. They use the syntax \`{ [K in keyof T]: NewType }\` to create new types based on existing ones, enabling systematic type transformations.

**Why Mapped Types Matter:**
- Transform types systematically (make all optional, readonly, etc.)
- Create custom utility types
- Build types from other types automatically
- Ensure consistency across type transformations

**How Mapped Types Work (Step-by-Step):**
1. Iterate: \`[K in keyof T]\` - K is each property key
2. Transform: \`T[K]\` - the original property type
3. Add modifiers: \`readonly\`, \`?\`
4. Remove modifiers: \`-readonly\`, \`-?\`

**Code Example:**
\`\`\`typescript
// Basic mapped type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }

// Conditional mapped type
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Remove optional
type Required<T> = {
  [K in keyof T]-?: T[K];
};
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not preserving original types
type Bad<T> = {
  [K in keyof T]: string; // All properties become string!
};

// Fix: Use T[K] to preserve original types
type Good<T> = {
  [K in keyof T]: T[K] | null; // Adds null to original types
};

// Mistake: Missing modifier handling
type Optional<T> = {
  [K in keyof T]?: T[K]; // Preserves existing ?
};

// Fix: Remove optionality explicitly
type Required<T> = {
  [K in keyof T]-?: T[K];
};
\`\`\`

**Best Practices:**
- Use mapped types for systematic type transformations
- Preserve original types with \`T[K]\`
- Combine with conditional types for advanced filtering
- Test with different input types

**Real-World Angular Example:**
\`\`\`typescript
// Angular form control types
type FormControlMap<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

interface UserForm {
  name: string;
  email: string;
  age: number;
}

type UserFormControls = FormControlMap<UserForm>;
// { name: FormControl<string>; email: FormControl<string>; age: FormControl<number> }
\`\`\`

**Key Takeaways:**
1. Mapped types iterate over properties with \`[K in keyof T]\`
2. Use \`T[K]\` to reference original property types
3. Add/remove modifiers with \`readonly\` and \`?\`` },
      { id: 'key-remapping', title: 'Key Remapping', content: `**What is Key Remapping?**

Key remapping uses the \`as\` clause in mapped types to rename or transform property keys. It enables creating new property names, filtering properties, and transforming key formats.

**Why Key Remapping Matters:**
- Rename properties without changing values
- Create getter/setter patterns automatically
- Filter properties by value type
- Transform key naming conventions

**How Key Remapping Works (Step-by-Step):**
1. Basic remapping: \`[K in keyof T as NewKey]\`
2. Filter with never: \`[K in keyof T as Condition ? K : never]\`
3. Transform keys: \`[K in keyof T as \\\`\${Prefix}\\\${K}\\\`]\`
4. Combine with value transforms

**Code Example:**
\`\`\`typescript
// Getters
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Filters
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Mixed {
  name: string;
  age: number;
  email: string;
}

type StringProps = StringKeys<Mixed>;
// { name: string; email: string }

// Key transformation
type PrefixKeys<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K];
};
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Not casting key to string
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<K>}\`]: () => T[K];
  // Error: K might not be a string
};

// Fix: Cast to string
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Mistake: Forgetting to filter with never
type Filtered<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
// Works, but be aware of empty results
\`\`\`

**Best Practices:**
- Use key remapping for renaming properties
- Filter with never to exclude properties
- Test with different input types
- Combine with conditional types for complex transformations

**Real-World Angular Example:**
\`\`\`typescript
// Create event handlers from model properties
type EventHandlers<T> = {
  [K in keyof T as \`\${string & K}Change\`]: (value: T[K]) => void;
};

interface User {
  name: string;
  age: number;
}

type UserHandlers = EventHandlers<User>;
// { nameChange: (value: string) => void; ageChange: (value: number) => void }
\`\`\`

**Key Takeaways:**
1. Key remapping uses \`as\` to rename or filter keys
2. Filter with never to exclude properties
3. Transform keys with template literals` },
      { id: 'modifiers', title: 'Mapping Modifiers', content: `**What are Mapping Modifiers?**

Mapping modifiers add or remove \`readonly\` and \`?\` (optional) attributes from properties in mapped types. They enable transforming types between mutable/required and readonly/optional states.

**Why Mapping Modifiers Matter:**
- Transform types between mutable and immutable
- Make optional properties required and vice versa
- Create strict and flexible versions of types
- Control mutability at the type level

**How Mapping Modifiers Work (Step-by-Step):**
1. Add readonly: \`readonly [K in keyof T]\`
2. Remove readonly: \`-readonly [K in keyof T]\`
3. Add optional: \`[K in keyof T]?\`
4. Remove optional: \`[K in keyof T]-?\`

**Code Example:**
\`\`\`typescript
// Remove readonly
function Mutable<T>(obj: T): Mutable<T> {
  return obj as Mutable<T>;
}

// Remove optional
function Required<T>(obj: T): Required<T> {
  return obj as Required<T>;
}

// Combined
type StrictUser = {
  readonly [K in keyof User]-?: User[K];
};

// -? removes optionality
// +? adds optionality
// -readonly removes readonly
// +readonly adds readonly

// Practical example
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

type StrictConfig = {
  [K in keyof Config]-?: Config[K];
};
// { host: string; port: number; debug: boolean }

type ReadonlyConfig = {
  readonly [K in keyof Config]: Config[K];
};
\`\`\`

**Common Mistakes:**
\`\`\`typescript
// Mistake: Confusing -? and ?
type A = { [K in keyof User]?: User[K] }; // Adds optionality
type B = { [K in keyof User]-?: User[K] }; // Removes optionality

// Fix: Use the right modifier
// -? makes required, +? makes optional

// Mistake: Not handling nested types
type DeepRequired<T> = {
  [K in keyof T]-?: T[K]; // Only removes first level
};

// Fix: Use recursive mapped types
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object
    ? DeepRequired<T[K]>
    : T[K];
};
\`\`\`

**Best Practices:**
- Use -? to make all properties required
- Use -readonly to make properties mutable
- Combine modifiers for comprehensive transformations
- Consider nested transformations for deep types

**Real-World Angular Example:**
\`\`\`typescript
// Angular form with required fields
interface FormConfig {
  name?: string;
  email?: string;
  age?: number;
}

type RequiredForm = {
  [K in keyof FormConfig]-?: FormConfig[K];
};
// { name: string; email: string; age: number }

// Immutable form state
type ImmutableForm = {
  readonly [K in keyof FormConfig]: FormConfig[K];
};
\`\`\`

**Key Takeaways:**
1. Use \`-?\` to remove optionality (make required)
2. Use \`-readonly\` to remove immutability
3. Combine modifiers for comprehensive type transformations` }
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

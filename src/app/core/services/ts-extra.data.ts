import { Lesson } from '../models/lesson.model';

export const TS_EXTRA_LESSONS: Lesson[] = [
  {
    id: 220,
    slug: 'ts-type-inference',
    title: 'Type Inference',
    description: 'Understand how TypeScript automatically infers types from your code.',
    level: 'beginner',
    duration: '20 min',
    objectives: [
      'Understand how TypeScript infers types from variable assignments',
      'Learn when explicit annotations are unnecessary',
      'Recognize the limits of type inference'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does TypeScript do when you write let x = 5?',
        options: [
          'Infer x as type number',
          'Assign x as type any',
          'Require an explicit type annotation',
          'Throw a compile-time error'
        ],
        correctIndex: 0,
        explanation: 'TypeScript infers the type of x as number from the numeric literal assignment.'
      },
      {
        id: 2,
        question: 'Which is an example of return type inference?',
        options: [
          'function add(a: number, b: number) { return a + b; }',
          'function add(a: number, b: number): number { return a + b; }',
          'function add(a, b) { return a + b; }',
          'const add = (a, b) => a + b;'
        ],
        correctIndex: 0,
        explanation: 'TypeScript infers the return type as number without an explicit annotation.'
      },
      {
        id: 3,
        question: 'When might inference give you an overly broad type?',
        options: [
          'When initializing an array with []',
          'When returning a literal value from a function',
          'When assigning a string literal to a variable',
          'When using const with object literals'
        ],
        correctIndex: 0,
        explanation: 'An empty array [] is inferred as never[] or any[] depending on context, which may be too narrow.'
      }
    ],
    topics: [
      {
        id: 'type-inference-basics',
        title: 'How Type Inference Works',
        content: 'TypeScript automatically determines the types of variables, parameters, and return values without requiring explicit annotations. When you write let x = 5, TypeScript infers x as number. When you write const name = \'Alice\', TypeScript infers the literal type \'Alice\' rather than the broader string type. This is called contextual typing. In function parameters, TypeScript can infer types from how the function is called. Array types are inferred from the elements you push or initialize. Object literal types are inferred from their properties. The compiler uses flow analysis to track how values move through your code and narrow types accordingly. Inference reduces boilerplate while maintaining type safety.'
      },
      {
        id: 'inference-limitations',
        title: 'When Inference Falls Short',
        content: 'Type inference is powerful but has limits. Empty arrays cannot be inferred to a specific element type. Functions with complex logic may need explicit return type annotations for clarity. When working with DOM APIs, TypeScript may infer types too broadly. Callback parameters in higher-order functions sometimes need annotation so TypeScript can properly type the callback. Generic functions often require explicit type arguments when inference cannot determine the type parameter. Intersections and unions can produce unexpected inferred types when combining multiple sources. In these cases, explicit type annotations improve readability and correctness while still leveraging inference where it works well.'
      },
      {
        id: 'best-practices-inference',
        title: 'Inference Best Practices',
        content: 'Let TypeScript infer types whenever the result is clear and correct. Only add annotations when inference gives a broader type than intended or when documenting public API signatures. Use const assertions to narrow literal types. Prefer type inference in local variables where the initializer makes the type obvious. Add explicit annotations to exported functions to document their contract. When working with external libraries, inference from declaration files guides correct usage. Use the noImplicitAny compiler option to catch places where inference cannot determine a type. This balances developer ergonomics with type safety across your codebase.'
      }
    ]
  },
  {
    id: 221,
    slug: 'ts-type-assertion',
    title: 'Type Assertions',
    description: 'Learn to tell TypeScript about the types you know at compile time.',
    level: 'beginner',
    duration: '20 min',
    objectives: [
      'Use as syntax to assert types',
      'Understand angle-bracket assertion syntax',
      'Know when assertions are safe and when they are not'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the syntax for type assertion using as?',
        options: [
          'value as Type',
          'Type as value',
          'value<Type>',
          '<Type>value'
        ],
        correctIndex: 0,
        explanation: 'The as keyword follows the value: value as Type is the preferred assertion syntax.'
      },
      {
        id: 2,
        question: 'Why is angle-bracket syntax not allowed in TSX files?',
        options: [
          'It conflicts with JSX element syntax',
          'It is deprecated',
          'It is slower to compile',
          'It does not work with strict mode'
        ],
        correctIndex: 0,
        explanation: 'Angle-bracket assertions conflict with JSX element syntax, so as is used instead in .tsx files.'
      },
      {
        id: 3,
        question: 'What happens if you assert to the wrong type?',
        options: [
          'Runtime error when accessing the wrong type',
          'TypeScript catches the error at compile time',
          'Nothing, TypeScript trusts all assertions',
          'The value becomes undefined'
        ],
        correctIndex: 0,
        explanation: 'Type assertions bypass type checking, so wrong assertions lead to runtime errors.'
      }
    ],
    topics: [
      {
        id: 'assertion-syntax',
        title: 'Assertion Syntax Styles',
        content: 'TypeScript provides two syntaxes for type assertions. The as keyword is preferred: let el = document.getElementById(\'app\') as HTMLDivElement. The angle-bracket syntax uses angle brackets before the value: let el = <HTMLDivElement>document.getElementById(\'app\'). Both achieve the same result. The as syntax is more common in modern TypeScript code and is required in JSX or TSX files because angle brackets conflict with JSX element syntax. Type assertions tell the compiler to treat a value as a specific type. They do not perform any runtime conversion or checking. The assertion is purely a compile-time instruction to the type system.'
      },
      {
        id: 'assertion-safety',
        title: 'When Assertions Are Safe',
        content: 'Type assertions are safe when you have additional information about the type that TypeScript cannot infer. When using querySelectorAll, you know the element type based on the selector. When parsing JSON, you know the shape of the response. When using third-party APIs that return untyped results, assertions let you type the data correctly. However, assertions are unsafe when you guess the type without evidence. They bypass type checking entirely, so a wrong assertion produces runtime errors. Use type guards like typeof, instanceof, or custom predicates instead of assertions when possible. Reserve assertions for situations where you genuinely know more than the compiler.'
      },
      {
        id: 'const-assertions',
        title: 'Const Assertions',
        content: 'The const assertion is a special form that narrows literal types. Writing as const on a value tells TypeScript to make all properties readonly and use the most specific literal types. For example, { x: 1 } as const becomes readonly { x: 1 } with x typed as 1 rather than number. This is useful for configuration objects, enum-like constants, and tuple types. Without const, TypeScript widens literal values to their base types. Const assertions preserve the exact values at compile time. They work on objects, arrays, and string literals. This pattern is essential for creating immutable configuration and preventing accidental mutations.'
      }
    ]
  },
  {
    id: 222,
    slug: 'ts-union-types',
    title: 'Union Types',
    description: 'Combine multiple types into one using the union operator.',
    level: 'beginner',
    duration: '25 min',
    objectives: [
      'Create union types with the pipe operator',
      'Narrow union types with type guards',
      'Understand discriminated unions as a pattern'
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you create a union of string and number?',
        options: [
          'string | number',
          'string & number',
          'string + number',
          'string or number'
        ],
        correctIndex: 0,
        explanation: 'The pipe operator creates a union: string | number means the value can be either type.'
      },
      {
        id: 2,
        question: 'How do you narrow a union type inside a conditional?',
        options: [
          'TypeScript automatically narrows based on the condition',
          'You must cast the type explicitly',
          'You cannot narrow union types',
          'Use the as keyword in every branch'
        ],
        correctIndex: 0,
        explanation: 'TypeScript automatically narrows the type within each branch of a conditional based on type guards.'
      },
      {
        id: 3,
        question: 'What is a common way to narrow a union of string and number?',
        options: [
          'typeof value === \'string\'',
          'value instanceof string',
          'value is string',
          'String(value)'
        ],
        correctIndex: 0,
        explanation: 'typeof is the standard way to narrow primitive union types like string | number.'
      }
    ],
    topics: [
      {
        id: 'union-type-basics',
        title: 'Creating Union Types',
        content: 'A union type allows a value to be one of several types. Use the pipe operator to combine types: let id: string | number. The value can hold either a string or a number at different times. Unions work with any types including primitives, objects, arrays, and function types. You can union literal types to create exact value sets: type Direction = \'up\' | \'down\' | \'left\' | \'right\'. Union types are one of TypeScript\'s most powerful features for modeling real-world data. A function parameter might accept multiple types. An API response field might have different shapes. Unions let you express these constraints precisely while keeping code flexible.'
      },
      {
        id: 'narrowing-unions',
        title: 'Narrowing Union Types',
        content: 'When working with union types, you can only access members common to all types in the union. To access type-specific members, you must narrow the union first. Type narrowing happens through typeof checks for primitives, instanceof for classes, and in for checking object properties. TypeScript also narrows after assignment checks like x === null or after truthiness checks. Custom type guard functions using the is keyword let you narrow to custom types. The switch statement with a discriminant property is another powerful narrowing technique. Once narrowed within a branch, TypeScript knows the exact type for the rest of that code path.'
      },
      {
        id: 'union-best-practices',
        title: 'Working with Unions Effectively',
        content: 'Design unions to be easy to discriminate. Use literal unions for fixed sets of values. Prefer discriminated unions over loose unions with optional properties. When a function accepts a union, handle each case explicitly to avoid runtime errors. Use exhaustive checking with never to ensure all union members are handled. Consider using Overloads when different parameter types produce different return types. Avoid unions that are too broad as they reduce type safety. When sharing code between union members, use type narrowing at the top of the function and then share logic for the narrowed types. Document union types with JSDoc to clarify valid values.'
      }
    ]
  },
  {
    id: 223,
    slug: 'ts-intersection-types',
    title: 'Intersection Types',
    description: 'Merge multiple types into a single type with all properties.',
    level: 'beginner',
    duration: '20 min',
    objectives: [
      'Create intersection types with the ampersand operator',
      'Understand how intersections combine object types',
      'Recognize when intersections conflict with each other'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does an intersection type combine?',
        options: [
          'All members from both types',
          'Only common members',
          'Members from the first type only',
          'Members from the second type only'
        ],
        correctIndex: 0,
        explanation: 'An intersection combines all members from all types into one type.'
      },
      {
        id: 2,
        question: 'What is the result of string & number?',
        options: [
          'never',
          'string | number',
          'string',
          'any'
        ],
        correctIndex: 0,
        explanation: 'No value can be both string and number simultaneously, so the intersection is never.'
      },
      {
        id: 3,
        question: 'When are intersection types useful?',
        options: [
          'Combining multiple object types into one',
          'Creating union types',
          'Replacing type assertions',
          'Narrowing types in conditionals'
        ],
        correctIndex: 0,
        explanation: 'Intersections are useful for combining multiple object shapes into a single comprehensive type.'
      }
    ],
    topics: [
      {
        id: 'intersection-basics',
        title: 'Intersection Type Fundamentals',
        content: 'An intersection type merges multiple types into one using the ampersand operator. For object types, this means the result has all properties from all contributing types. type A = { name: string } and type B = { age: number } combine to type AB = A & B, which has both name and age. Intersections are the opposite of unions. While a union means the value is one type or another, an intersection means the value satisfies all types simultaneously. Intersections work well for extending object types without inheritance. They are also used in mixins and for composing small focused types into larger ones.'
      },
      {
        id: 'intersection-conflicts',
        title: 'Handling Conflicts in Intersections',
        content: 'When two types in an intersection define the same property with incompatible types, the resulting property type is never. For example, if one type has count as string and another has count as number, the intersection produces a type where count is never. This is correct because no value can satisfy both constraints simultaneously. To avoid this, ensure intersected types have compatible overlapping properties. When building type composition, design your types so their intersections produce meaningful combinations. If you need a property to be one type or another, use a union for that property within the intersected types instead.'
      },
      {
        id: 'intersection-patterns',
        title: 'Common Intersection Patterns',
        content: 'Intersections are commonly used for extending interfaces without the extends keyword. They enable mixin patterns where small behaviors are composed together. A common pattern is combining a base type with additional constraints: type StrictUser = User & { email: string }. Type intersection with mapped types creates powerful composition patterns. You can intersect utility types like Partial or Required with additional fields. Intersections with Record types add properties to existing shapes. When working with API data, intersections can model responses that combine data from multiple sources. Always verify the resulting type makes sense and does not produce never for any property.'
      }
    ]
  },
  {
    id: 224,
    slug: 'ts-literal-types',
    title: 'Literal Types',
    description: 'Use specific values as types for precise type control.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Create string, number, and boolean literal types',
      'Use template literal types for string patterns',
      'Combine literals with unions for enum-like behavior'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a literal type?',
        options: [
          'A type that represents exactly one specific value',
          'A type that represents any value of that type',
          'A type that is inferred by TypeScript',
          'A type that uses the literal keyword'
        ],
        correctIndex: 0,
        explanation: 'A literal type constrains a value to exactly one specific value, like the string \'hello\'.'
      },
      {
        id: 2,
        question: 'How do you make a variable have the literal type \'ready\' instead of string?',
        options: [
          'const state = \'ready\' as const',
          'const state: \'ready\' = \'ready\'',
          'const state: literal \'ready\'',
          'Both A and B'
        ],
        correctIndex: 3,
        explanation: 'Both as const and explicit type annotation produce the literal type.'
      },
      {
        id: 3,
        question: 'What do template literal types enable?',
        options: [
          'Pattern-based string types',
          'Runtime string matching',
          'Faster string operations',
          'Automatic string interpolation'
        ],
        correctIndex: 0,
        explanation: 'Template literal types let you create string types based on patterns using backtick syntax in types.'
      }
    ],
    topics: [
      {
        id: 'literal-type-fundamentals',
        title: 'Creating Literal Types',
        content: 'Literal types represent exactly one specific value rather than a category of values. A string literal type is a specific string like type Greeting = \'hello\'. A number literal type is a specific number like type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6. Boolean literal types are true or false. To get literal types from values, use as const or explicit type annotations. Without const assertions, TypeScript widens literals to their base type for variables. Literal types are powerful for modeling states, directions, modes, and other finite sets of values. They catch invalid values at compile time instead of runtime.'
      },
      {
        id: 'template-literal-types',
        title: 'Template Literal Types',
        content: 'Template literal types create string types from patterns using backtick syntax in the type system. type EventName = `${\'click\' | \'focus\' | \'blur\'}` produces \'click\' | \'focus\' | \'blur\'. You can combine with other types: type CSSProperty = `${string}-${string}`. This creates types matching hyphenated strings. Template literal types support uppercase and lowercase transforms with Uppercase and Lowercase. They also support Capitalize and Uncapitalize. These types are invaluable for event name typing, CSS class naming, API endpoint patterns, and route parameters. They bring regex-like pattern matching into the type system.'
      },
      {
        id: 'literal-type-patterns',
        title: 'Practical Literal Type Patterns',
        content: 'Use literal unions as safer alternatives to string enums for small sets of values. Model component props with literal types for variants: type ButtonSize = \'sm\' | \'md\' | \'lg\'. Combine with discriminated unions for state machines where each state has specific data. Use numeric literals for indexed access and tuple positions. Template literal types with generic constraints create type-safe string builders. When defining configuration objects, literal types document valid values inline. Use Record with literal keys for strongly typed dictionaries. Always prefer literal unions over enum when you need a small set of string constants with tree-shaking benefits.'
      }
    ]
  },
  {
    id: 225,
    slug: 'ts-readonly-modifier',
    title: 'Readonly',
    description: 'Make properties and collections immutable at the type level.',
    level: 'beginner',
    duration: '20 min',
    objectives: [
      'Apply readonly to properties and arrays',
      'Use the Readonly utility type',
      'Understand readonly vs immutable'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the readonly modifier do?',
        options: [
          'Prevents reassignment of properties after initialization',
          'Prevents mutation of nested objects',
          'Makes the variable inaccessible',
          'Converts the type to a constant'
        ],
        correctIndex: 0,
        explanation: 'readonly prevents reassignment of top-level properties but does not prevent deep mutation.'
      },
      {
        id: 2,
        question: 'What is the difference between readonly and as const?',
        options: [
          'readonly is a type modifier, as const is a value assertion',
          'They are identical',
          'as const only works on objects',
          'readonly prevents deep mutation'
        ],
        correctIndex: 0,
        explanation: 'readonly modifies individual properties while as const makes all properties deeply readonly.'
      },
      {
        id: 3,
        question: 'Which utility type makes all properties readonly?',
        options: [
          'Readonly<T>',
          'ReadonlyArray<T>',
          'Immutable<T>',
          'Freeze<T>'
        ],
        correctIndex: 0,
        explanation: 'Readonly<T> creates a type where all properties are readonly.'
      }
    ],
    topics: [
      {
        id: 'readonly-basics',
        title: 'Readonly Modifier Fundamentals',
        content: 'The readonly modifier prevents reassignment of properties after an object is created. interface Point { readonly x: number; readonly y: number } creates a type where x and y cannot be changed. Readonly arrays use readonlyArray type or ReadonlyArray<T> generic. The readonly keyword is a compile-time constraint only. It does not prevent runtime mutation of nested objects. A readonly array prevents push, pop, and other mutating methods but the elements themselves can still be modified if they are objects. Readonly is ideal for configuration objects, function parameters that should not be modified, and data structures that represent immutable state.'
      },
      {
        id: 'readonly-utility-types',
        title: 'Readonly Utility Types',
        content: 'TypeScript provides Readonly<T> as a mapped type that makes all properties readonly. ReadonlyArray<T> creates an array type without push, pop, splice, and other mutating methods. ReadonlyMap and ReadonlySet provide read-only versions of collections. You can combine Readonly with other utility types for deeper control. DeepReadonly recursively applies readonly to all nested properties. These utility types are essential for React state management, Redux stores, and any scenario where immutability is required. When working with frozen objects from Object.freeze, TypeScript does not automatically infer readonly types, so explicit Readonly annotations bridge the gap.'
      },
      {
        id: 'readonly-limitations',
        title: 'Readonly Limitations and Workarounds',
        content: 'Readonly is a shallow constraint. It prevents direct property reassignment but not mutation of nested objects. A readonly array of objects still allows modifying the objects inside. For deep immutability, use utility libraries like Immer or write recursive mapped types. Object.freeze provides runtime immutability but TypeScript does not infer readonly types from it. Readonly is erased at compile time, so it adds no runtime overhead. When passing readonly data to functions expecting mutable types, you may need type assertions. Consider whether readonly is worth the ergonomic cost for your team. In functional programming patterns, readonly prevents accidental state mutations.'
      }
    ]
  },
  {
    id: 226,
    slug: 'ts-optional-properties',
    title: 'Optional Properties',
    description: 'Define properties that may or may not exist on an object.',
    level: 'beginner',
    duration: '20 min',
    objectives: [
      'Mark properties as optional with the question mark',
      'Understand undefined vs missing properties',
      'Use optional chaining with optional properties'
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you mark a property as optional?',
        options: [
          'Add a question mark after the property name',
          'Use the optional keyword',
          'Assign undefined as default',
          'Use the Maybe type'
        ],
        correctIndex: 0,
        explanation: 'The question mark makes a property optional: name?: string.'
      },
      {
        id: 2,
        question: 'What is the difference between optional and undefined?',
        options: [
          'Optional means the key may be missing entirely, undefined means it exists with undefined value',
          'They are exactly the same',
          'Optional means it can be null',
          'undefined is only valid with optional properties'
        ],
        correctIndex: 0,
        explanation: 'Optional properties may be omitted from the object literal entirely, while undefined is a value.'
      },
      {
        id: 3,
        question: 'What operator safely accesses optional properties?',
        options: [
          'Optional chaining (?.)',
          'Nullish coalescing (??)',
          'Double ampersand (&&)',
          'Triple equals (===)'
        ],
        correctIndex: 0,
        explanation: 'Optional chaining (?.) safely returns undefined if a property is missing or null.'
      }
    ],
    topics: [
      {
        id: 'optional-property-basics',
        title: 'Optional Property Syntax',
        content: 'Adding a question mark after a property name makes it optional. interface Config { debug?: boolean; logLevel?: string } means both properties can be omitted when creating the object. Optional properties are implicitly typed as T | undefined. You can explicitly combine with undefined: name?: string | undefined. Optional properties affect object literal compatibility. An object with extra properties is not assignable to a type with optional properties unless it uses structural typing. Optional properties are common in configuration objects, API responses with optional fields, and function options. They reduce the need for overloads by allowing partial objects.'
      },
      {
        id: 'optional-vs-undefined',
        title: 'Optional vs Explicit undefined',
        content: 'There is a subtle difference between an optional property and one explicitly typed as undefined. An optional property key can be omitted entirely from the object literal. A property typed as undefined must be present but can hold undefined as its value. This distinction matters when using Object.keys or for...in loops. Optional properties may not appear in the object at all. In TypeScript 4.4 and later, you can use exactOptionalPropertyTypes to enforce this distinction strictly. Without this flag, undefined is assignable to optional properties regardless of the declared type. Understanding this difference helps model precise API contracts.'
      },
      {
        id: 'optional-chaining',
        title: 'Optional Chaining with Optional Properties',
        content: 'Optional chaining (?.) is the natural companion to optional properties. When you access a property that might not exist, use ?. to safely return undefined instead of throwing an error. user?.address?.city chains multiple optional accesses. It works with property access, method calls, and element access. Combine with the nullish coalescing operator (??) to provide defaults: user?.name ?? \'Anonymous\'. Optional chaining short-circuits evaluation: if any part is null or undefined, the entire expression returns undefined without evaluating further. This eliminates deeply nested null checks and makes code cleaner. It is essential when working with optional properties from external data sources.'
      }
    ]
  },
  {
    id: 227,
    slug: 'ts-index-signatures',
    title: 'Index Signatures',
    description: 'Define types for dynamic property names on objects.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Create index signatures with string and number keys',
      'Combine index signatures with known properties',
      'Use keyof with index signatures'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does an index signature define?',
        options: [
          'A type for properties accessed dynamically by key',
          'An array of valid property names',
          'A list of required properties',
          'A type for class instances'
        ],
        correctIndex: 0,
        explanation: 'An index signature defines the type of values when properties are accessed with a dynamic key.'
      },
      {
        id: 2,
        question: 'Can you combine index signatures with known properties?',
        options: [
          'Yes, but known property types must be compatible with the index type',
          'No, index signatures and known properties are mutually exclusive',
          'Only if the known properties are optional',
          'Only in interfaces, not types'
        ],
        correctIndex: 0,
        explanation: 'Known properties must have types compatible with the index signature value type.'
      },
      {
        id: 3,
        question: 'What does keyof return for an object with an index signature?',
        options: [
          'The string union of known properties plus string',
          'Only the known properties',
          'An array of property names',
          'The index signature key type'
        ],
        correctIndex: 0,
        explanation: 'keyof includes string as a key type when an index signature is present.'
      }
    ],
    topics: [
      {
        id: 'index-signature-syntax',
        title: 'Index Signature Syntax',
        content: 'An index signature defines the type for dynamically accessed properties. interface Dictionary { [key: string]: string } means any string key maps to a string value. Number index signatures use number as the key: interface Matrix { [row: number]: number[] }. Index signatures are essential for dictionaries, caches, and any object with dynamic keys. You can have either a string or number index signature, not both in the same type. The string index signature is more general and accepts numeric keys as well. All declared properties must have types compatible with the index signature value type. This ensures consistency regardless of how properties are accessed.'
      },
      {
        id: 'index-signature-patterns',
        title: 'Practical Index Signature Patterns',
        content: 'Use index signatures for configuration objects with dynamic keys, API response mappings, and i18n translation objects. A common pattern combines a string index with specific known properties: interface AppState { [key: string]: unknown; currentUser: User; settings: Settings }. This lets you access known properties with type safety while allowing dynamic key access. Use Record<string, T> as a shorthand for string index signatures. When working with JSON data, index signatures model untyped structures safely. For numeric indexing like matrices, use number index signatures. Index signatures with Record types create type-safe dictionaries and hash maps for lookup operations.'
      },
      {
        id: 'index-signature-limitations',
        title: 'Index Signature Limitations and Alternatives',
        content: 'Index signatures force all properties to have the same value type. You cannot mix value types in a single index signature. The Map type is often a better choice for heterogeneous key-value storage. Index signatures with number keys require all numeric keys to return the same type. They do not prevent accessing non-existent keys at runtime, only at compile time. For objects with a small fixed set of dynamic keys, consider discriminated unions instead. When using index signatures with Object.keys, remember the return type is string[]. Always consider whether a Map, Record, or a more specific interface better models your data. Index signatures sacrifice some type specificity for flexibility.'
      }
    ]
  },
  {
    id: 228,
    slug: 'ts-enum-deep',
    title: 'Enums',
    description: 'Use enums for named constant sets of values.',
    level: 'intermediate',
    duration: '30 min',
    objectives: [
      'Create numeric and string enums',
      'Use const enums for compile-time optimization',
      'Understand reverse mappings and their quirks'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the default behavior of a numeric enum?',
        options: [
          'Values are auto-incremented starting from 0',
          'Values must be explicitly assigned',
          'All values default to 0',
          'Values are random integers'
        ],
        correctIndex: 0,
        explanation: 'Numeric enum values auto-increment from 0 if not explicitly assigned.'
      },
      {
        id: 2,
        question: 'What is the benefit of const enums?',
        options: [
          'They are inlined at compile time, producing no runtime object',
          'They are more type-safe',
          'They support reverse mapping',
          'They can have methods'
        ],
        correctIndex: 0,
        explanation: 'Const enums are completely removed during compilation, with values inlined at usage sites.'
      },
      {
        id: 3,
        question: 'What is reverse mapping in enums?',
        options: [
          'Accessing the enum name from its value',
          'Accessing the value from its name',
          'Iterating over all enum values',
          'Extending an enum at runtime'
        ],
        correctIndex: 0,
        explanation: 'Reverse mapping lets you get the enum member name from its numeric value.'
      }
    ],
    topics: [
      {
        id: 'enum-fundamentals',
        title: 'Enum Types and Syntax',
        content: 'Enums define a set of named constants. Numeric enums auto-increment: enum Direction { Up, Down, Left, Right } where Up is 0, Down is 1, and so on. You can assign specific values: enum Status { Active = 1, Inactive = 2 }. String enums require explicit values: enum Color { Red = \'red\', Blue = \'blue\' }. Enums create a real object at runtime. Const enums are inlined during compilation and produce no JavaScript code. Enums support reverse mapping for numeric values: Direction[0] returns \'Up\'. This reverse mapping does not work for string enums. Enums are useful for state machines, configuration constants, and API status codes.'
      },
      {
        id: 'const-enums',
        title: 'Const Enums and Performance',
        content: 'Const enums are declared with the const modifier and are completely erased during compilation. Instead of creating a runtime object, the compiler inlines the enum values at every usage site. This produces smaller bundle sizes and faster runtime performance. However, const enums have limitations: they cannot be referenced at runtime, you cannot iterate over them, and reverse mapping does not work. They work best for internal constants that are not exported. When const enums are in a separate file, the isolateModules compiler option is needed. For most cases, string literal unions provide similar type safety with better tree-shaking. Consider const enums for performance-critical code paths.'
      },
      {
        id: 'enum-alternatives',
        title: 'Enum Alternatives and Patterns',
        content: 'String literal unions are a popular alternative to string enums: type Direction = \'up\' | \'down\'. They provide the same type safety without the runtime overhead. Objects with as const create enum-like constants: const Status = { Active: \'active\' } as const. These are useful when you need a runtime value. Use enum when you need reverse mapping, runtime iteration, or when working with existing code that expects enum objects. For flags and bitmasks, numeric enums remain appropriate. TypeScript 5.0 added union enums with const values, providing another option. Choose based on whether you need runtime features, bundle size, or interoperability with external libraries.'
      }
    ]
  },
  {
    id: 229,
    slug: 'ts-namespace',
    title: 'Namespaces',
    description: 'Organize code with namespaces and understand their use cases.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Declare and use namespaces',
      'Apply access modifiers inside namespaces',
      'Understand when to use namespaces vs modules'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary purpose of namespaces in TypeScript?',
        options: [
          'Group related code under a common name',
          'Improve runtime performance',
          'Replace module imports',
          'Create private variables'
        ],
        correctIndex: 0,
        explanation: 'Namespaces group related declarations under a single name to avoid naming collisions.'
      },
      {
        id: 2,
        question: 'How do you access members from another namespace?',
        options: [
          'Use the namespace name as a prefix',
          'Import them with require',
          'Use the global keyword',
          'Namespace members are always global'
        ],
        correctIndex: 0,
        explanation: 'Namespace members are accessed using dot notation: Namespace.member.'
      },
      {
        id: 3,
        question: 'When should you prefer ES modules over namespaces?',
        options: [
          'When using modern bundlers and module systems',
          'When targeting old browsers only',
          'When you need runtime performance',
          'Namespaces are always preferred'
        ],
        correctIndex: 0,
        explanation: 'ES modules are preferred in modern development because they work with bundlers and tree-shaking.'
      }
    ],
    topics: [
      {
        id: 'namespace-basics',
        title: 'Namespace Declaration and Usage',
        content: 'Namespaces group related declarations under a single name. namespace Validation { export interface Rule { ... } export function validate(rule: Rule) { ... } } creates a Validation namespace with exported members. Access members with dot notation: Validation.validate(rule). Namespaces can contain interfaces, types, functions, classes, and even other namespaces. The export keyword makes members accessible outside the namespace. Without export, members are private to the namespace. Namespaces can be split across multiple declarations with the same name, and TypeScript merges them. This is useful for augmenting existing namespaces. Namespaces are helpful for organizing large type libraries and declaration files.'
      },
      {
        id: 'namespace-modules',
        title: 'Namespaces vs ES Modules',
        content: 'ES modules are the standard for modern TypeScript development. They work with import and export keywords, support tree-shaking, and work seamlessly with bundlers. Namespaces are an older pattern that still appears in declaration files and ambient declarations. Use namespaces for augmenting global types in .d.ts files and for organizing type-only code that does not need runtime separation. Use ES modules for all application code, shared libraries, and anything that benefits from file-based code splitting. Namespaces compile to IIFE patterns or object assignments, which do not support tree-shaking. The namespace keyword is rarely needed in new projects but understanding it helps when reading declaration files.'
      },
      {
        id: 'namespace-patterns',
        title: 'Namespace Patterns and Best Practices',
        content: 'Namespace merging lets you extend existing namespaces across files. This is common in declaration files for augmenting library types. The declare namespace pattern adds types to global scope for ambient declarations. Namespaces nested inside classes create helper types scoped to that class. Use the IIFE namespace pattern for creating isolated scopes: namespace MyLib { ... } as any. For libraries that need both types and runtime values, use ES modules with type-only imports. When working with .d.ts files, namespaces organize global type declarations. In Angular projects, namespaces are uncommon since the framework uses dependency injection and modules for code organization.'
      }
    ]
  },
  {
    id: 230,
    slug: 'ts-declaration-files',
    title: 'Declaration Files',
    description: 'Write and use .d.ts files to type external JavaScript code.',
    level: 'intermediate',
    duration: '30 min',
    objectives: [
      'Understand the purpose of .d.ts files',
      'Create custom declaration files',
      'Use DefinitelyTyped for third-party type definitions'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does a .d.ts file contain?',
        options: [
          'Type declarations without runtime code',
          'JavaScript code with type annotations',
          'Compiled TypeScript output',
          'Configuration settings'
        ],
        correctIndex: 0,
        explanation: 'Declaration files contain only type information and are not emitted as JavaScript.'
      },
      {
        id: 2,
        question: 'How do you add types for an untyped npm package?',
        options: [
          'Create a .d.ts file or install from @types scope',
          'Modify the package source code',
          'Use the any type everywhere',
          'Ignore the missing types'
        ],
        correctIndex: 0,
        explanation: 'You can create your own .d.ts file or install community types from the @types scope on npm.'
      },
      {
        id: 3,
        question: 'What is the global.d.ts file commonly used for?',
        options: [
          'Declaring global type augmentations',
          'Storing runtime configuration',
          'Exporting application modules',
          'Defining test utilities'
        ],
        correctIndex: 0,
        explanation: 'Global.d.ts declares types available globally without explicit imports.'
      }
    ],
    topics: [
      {
        id: 'declaration-file-basics',
        title: 'What Are Declaration Files',
        content: 'Declaration files with the .d.ts extension provide type information for JavaScript code without containing any runtime implementation. They let TypeScript understand the shape of external code. When you install a package like lodash, the types package @types/lodash provides a .d.ts file describing all functions and types. Declaration files use declare keywords to describe existing code: declare function format(input: string): string. They describe ambient declarations that already exist in the runtime environment. The compiler uses .d.ts files to check types but never emits them as JavaScript. This separation keeps type information distinct from runtime code.'
      },
      {
        id: 'creating-declarations',
        title: 'Creating Custom Declarations',
        content: 'Create a .d.ts file at the root of your project or in a types directory. Use declare module \'my-lib\' to describe an untyped module. Inside the module declaration, describe exports with types: declare module \'my-lib\' { export function doSomething(x: string): void; }. For global types, create a global.d.ts with declare global { interface Window { myApi: MyApi; }. Reference the file in tsconfig.json using the typeRoots or files option. Declaration files can import other types and extend interfaces. When a package ships its own types, TypeScript uses them automatically. When not, community-maintained types on DefinitelyTyped fill the gap.'
      },
      {
        id: 'definitely-typed',
        title: 'Using DefinitelyTyped',
        content: 'DefinitelyTyped is a repository of high-quality TypeScript type definitions for thousands of JavaScript libraries. Install types with npm install @types/package-name. The types are maintained by the community and cover popular libraries like Express, Lodash, jQuery, and more. When a package ships its own types, @types is not needed. Check the package documentation or look for a types field in package.json. The tsconfig.json types or typeRoots option controls which @types packages are included. You can override or augment community types using declaration merging. DefinitelyTyped type definitions follow strict guidelines and are reviewed before publication.'
      }
    ]
  },
  {
    id: 231,
    slug: 'ts-ambient-declarations',
    title: 'Ambient Declarations',
    description: 'Use declare to describe types for code that exists elsewhere.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Declare ambient variables, functions, and classes',
      'Understand ambient module declarations',
      'Use declare for global type augmentation'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the declare keyword do?',
        options: [
          'Describes existing code without emitting JavaScript',
          'Creates a new variable at runtime',
          'Declares a new module',
          'Marks code as deprecated'
        ],
        correctIndex: 0,
        explanation: 'declare describes existing runtime entities without producing any JavaScript output.'
      },
      {
        id: 2,
        question: 'Can you provide an implementation for a declared function?',
        options: [
          'No, declare functions have no implementation',
          'Yes, you can add an implementation body',
          'Only in .d.ts files',
          'Only with the abstract keyword'
        ],
        correctIndex: 0,
        explanation: 'Ambient declarations describe what exists, not how it works. Implementation comes from the actual runtime.'
      },
      {
        id: 3,
        question: 'What is an ambient module declaration?',
        options: [
          'A declaration that describes an entire module without its source',
          'A module that runs without TypeScript',
          'A module with no exports',
          'A test module'
        ],
        correctIndex: 0,
        explanation: 'Ambient module declarations describe the shape of entire untyped modules.'
      }
    ],
    topics: [
      {
        id: 'ambient-variable-declarations',
        title: 'Ambient Variable and Function Declarations',
        content: 'The declare keyword describes variables, functions, and classes that exist at runtime but are not typed. declare const API_URL: string tells TypeScript that API_URL exists as a string. declare function fetchData(url: string): Promise<any> describes a function without providing its body. These declarations are used in .d.ts files to type globals and built-in APIs. Ambient class declarations describe the shape: declare class Logger { log(message: string): void; }. They do not create JavaScript classes. The actual implementation comes from a script tag, a polyfill, or a global assignment. This is essential for typing globals added by webpack, polyfills, or script tags.'
      },
      {
        id: 'ambient-module-declarations',
        title: 'Ambient Module Declarations',
        content: 'Ambient module declarations describe untyped modules using declare module. declare module \'untyped-lib\' { export function doWork(x: string): number; } tells TypeScript about the module\'s shape. Use declare module \'*\' to add types to all modules. This is common for untyped third-party libraries without @types packages. Ambient modules can declare types, interfaces, and functions that describe the library\'s API. You can combine ambient module declarations with namespace declarations inside them. For augmenting existing typed modules, use module augmentation with the module keyword. This pattern is essential for integrating untyped JavaScript libraries into TypeScript projects.'
      },
      {
        id: 'global-augmentation',
        title: 'Global Type Augmentation',
        content: 'Global augmentation adds types to the global scope using declare global inside a module. declare global { interface Window { analytics: AnalyticsApi; } } extends the Window interface. This is useful for adding types to globals injected by build tools or libraries. Place augmentation declarations in .d.ts files included by tsconfig.json. Global augmentation works across the entire project without imports. You can augment existing interfaces from libraries using declaration merging. For example, augmenting Express.Request adds custom properties available in all route handlers. Be careful with global augmentation as it affects the entire type space. Prefer module augmentation when possible.'
      }
    ]
  },
  {
    id: 232,
    slug: 'ts-module-resolution',
    title: 'Module Resolution',
    description: 'Understand how TypeScript resolves module imports.',
    level: 'intermediate',
    duration: '30 min',
    objectives: [
      'Configure module resolution strategies',
      'Understand path mapping with tsconfig',
      'Handle different module formats'
    ],
    quiz: [
      {
        id: 1,
        question: 'What module resolution strategy is recommended for modern projects?',
        options: [
          'node16 or bundler',
          'classic',
          'amd',
          'umd'
        ],
        correctIndex: 0,
        explanation: 'node16 or bundler resolution works with modern Node.js and bundler setups.'
      },
      {
        id: 2,
        question: 'How do you configure path aliases in tsconfig?',
        options: [
          'Using the compilerOptions.paths field',
          'Using the imports field',
          'Using the resolve.alias field',
          'Using the moduleAliases field'
        ],
        correctIndex: 0,
        explanation: 'The paths field in tsconfig.json maps import paths to specific locations.'
      },
      {
        id: 3,
        question: 'What does the moduleResolution option control?',
        options: [
          'How TypeScript finds and loads imported modules',
          'Which module format is output',
          'Whether modules are bundled',
          'How imports are transformed'
        ],
        correctIndex: 0,
        explanation: 'moduleResolution determines the algorithm TypeScript uses to resolve import specifiers.'
      }
    ],
    topics: [
      {
        id: 'resolution-strategies',
        title: 'Module Resolution Strategies',
        content: 'TypeScript supports several module resolution strategies. node16 uses Node.js ESM resolution with file extensions and package.json exports. bundler resolution works with tools like webpack and esbuild that handle module resolution themselves. classic is the legacy resolution used before Node.js modules. The choice depends on your runtime and build tool. For Angular projects, the default is usually sufficient. For Node.js projects with ESM, use node16. For bundled applications, bundler is appropriate. The moduleResolution option in tsconfig.json controls which strategy is used. Different strategies affect how relative imports, package imports, and path aliases are resolved.'
      },
      {
        id: 'path-mapping',
        title: 'Path Mapping with TypeScript',
        content: 'Path mapping lets you create import aliases using the paths field in tsconfig.json. paths: { \'@app/*\': [\'src/app/*\'] } lets you import from @app/services instead of relative paths. You must also set baseUrl for paths to work. The paths field maps string patterns to file locations. Use * as a wildcard for variable parts of the path. Path mapping improves import readability and refactoring. When bundlers are involved, you need matching configuration in webpack, vite, or your build tool. The paths field only affects TypeScript compilation, not the bundler. Tools like tsconfig-paths can bridge this gap for runtime resolution.'
      },
      {
        id: 'module-formats',
        title: 'Module Formats and Interop',
        content: 'TypeScript supports CommonJS, AMD, UMD, and ES module formats. The module compiler option determines the output format. CommonJS uses require and module.exports. ES modules use import and export syntax. AMD and UMD are less common in modern development. The esModuleInterop option enables CommonJS/ES module interop by generating helper functions. allowSyntheticDefaultImports allows default imports from CommonJS modules. For Node.js projects, use CommonJS or node16 with ESM. For browser projects with bundlers, use ES modules. Understanding module formats is important when working with mixed codebases or migrating from CommonJS to ESM.'
      }
    ]
  },
  {
    id: 233,
    slug: 'ts-strict-mode',
    title: 'Strict Mode',
    description: 'Enable strict type checking options for safer code.',
    level: 'beginner',
    duration: '25 min',
    objectives: [
      'Understand the strict flag and its sub-options',
      'Enable strictNullChecks and noImplicitAny',
      'Incrementally adopt strict mode in existing projects'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the strict flag enable?',
        options: [
          'All strict type-checking options at once',
          'Only strictNullChecks',
          'A stricter ESLint configuration',
          'Runtime type validation'
        ],
        correctIndex: 0,
        explanation: 'The strict flag is a shorthand that enables all strict type-checking compiler options.'
      },
      {
        id: 2,
        question: 'What does strictNullChecks prevent?',
        options: [
          'Accidentally using null or undefined as values',
          'Using the null keyword',
          'Assigning zero to variables',
          'Using empty strings'
        ],
        correctIndex: 0,
        explanation: 'strictNullChecks makes null and undefined distinct types, preventing accidental null access.'
      },
      {
        id: 3,
        question: 'How can you gradually adopt strict mode?',
        options: [
          'Enable strict sub-options one at a time',
          'Rewrite the entire codebase first',
          'It cannot be adopted gradually',
          'Use a separate tsconfig for each file'
        ],
        correctIndex: 0,
        explanation: 'You can enable individual strict sub-options like strictNullChecks first, then enable strict later.'
      }
    ],
    topics: [
      {
        id: 'strict-mode-overview',
        title: 'Strict Mode Options',
        content: 'The strict flag enables a collection of strict type-checking options. strictNullChecks requires null and undefined to be explicitly handled. noImplicitAny flags variables without explicit types. noImplicitThis requires explicit this types. alwaysStrict adds \"use strict\" to emitted JavaScript. strictBindCallApply ensures correct this binding in callbacks. strictFunctionTypes enables contravariant parameter types. strictPropertyInitialization requires class properties to be initialized. Each sub-option can be enabled independently for gradual adoption. Starting new projects with strict: true is strongly recommended. Existing projects can enable sub-options incrementally to fix type issues over time.'
      },
      {
        id: 'strict-null-checks',
        title: 'Strict Null Checks in Depth',
        content: 'strictNullChecks is one of the most impactful strict options. Without it, null and undefined are assignable to any type, hiding potential bugs. With it, you must handle null explicitly using optional chaining, nullish coalescing, or null checks. This catches errors like accessing properties on potentially null values. Types become T | null when they might be absent. This flows through your code, requiring explicit handling at every access point. The optional chaining operator ?. and nullish coalescing ?? make working with nullable types ergonomic. Many real-world bugs come from null access, and strictNullChecks prevents them at compile time.'
      },
      {
        id: 'adopting-strict',
        title: 'Adopting Strict Mode Incrementally',
        content: 'Existing projects can enable strict mode incrementally. Start with noImplicitAny to catch the most common issues. Then enable strictNullChecks and fix the resulting errors. Use the strict sub-options as a checklist. Fix one sub-option at a time and commit the changes. After enabling all sub-options, switch to strict: true to ensure future sub-options are automatically included. Use the error count to track progress. TypeScript playground and the migrate command help identify issues. Consider using @ts-ignore or @ts-expect-error for specific lines during migration. Gradual adoption prevents overwhelming refactoring while improving type safety over time.'
      }
    ]
  },
  {
    id: 234,
    slug: 'ts-no-check',
    title: 'ts-check and ts-ignore',
    description: 'Control type checking at the file and line level.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Use @ts-ignore to suppress specific errors',
      'Use @ts-expect-error for intentional errors',
      'Use @ts-check in JavaScript files for checking'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between @ts-ignore and @ts-expect-error?',
        options: [
          '@ts-expect-error fails if no error exists, @ts-ignore does not',
          'They are identical',
          '@ts-ignore is for JavaScript, @ts-expect-error for TypeScript',
          '@ts-expect-error is deprecated'
        ],
        correctIndex: 0,
        explanation: '@ts-expect-error ensures the error goes away when the issue is fixed, preventing stale suppressions.'
      },
      {
        id: 2,
        question: 'What does // @ts-check do in a JavaScript file?',
        options: [
          'Enables type checking for that specific file',
          'Disables type checking',
          'Adds the file to the build',
          'Converts the file to TypeScript'
        ],
        correctIndex: 0,
        explanation: '// @ts-check enables type checking in JavaScript files with JSDoc annotations.'
      },
      {
        id: 3,
        question: 'When should you use @ts-ignore?',
        options: [
          'Only temporarily while fixing a known type issue',
          'To suppress all errors in a file',
          'To avoid writing type annotations',
          'To enable any type'
        ],
        correctIndex: 0,
        explanation: '@ts-ignore should be temporary, used only when a type issue is known and being addressed.'
      }
    ],
    topics: [
      {
        id: 'ts-ignore-usage',
        title: 'Using @ts-ignore Effectively',
        content: 'The @ts-ignore comment suppresses the type error on the next line. Place it as a comment before the line with the error: // @ts-ignore followed by the problematic code. This is a pragmatic escape hatch for situations where TypeScript cannot correctly type a value. Common uses include third-party APIs with incorrect types, dynamic property access, and edge cases in generic code. However, @ts-ignore hides real type errors and should be used sparingly. Each suppressed error is a potential bug that is not caught. Always add a comment explaining why the error is suppressed. Consider @ts-expect-error as a better alternative for most cases.'
      },
      {
        id: 'ts-expect-error',
        title: 'ts-expect-error as a Better Alternative',
        content: '@ts-expect-error works like @ts-ignore but with an important difference. It errors if the line it covers does not produce a type error. This means when the underlying issue is fixed, the suppression will cause a new error, reminding you to remove it. This prevents stale suppressions that hide errors long after the original issue is resolved. Always prefer @ts-expect-error over @ts-ignore in new code. Both comments suppress exactly one error on the next line. For multiple errors on one line, you need multiple comments. The noUnusedLocals and noUnusedParameters options help catch unused suppressions during refactoring.'
      },
      {
        id: 'ts-check-javascript',
        title: 'Type Checking JavaScript Files',
        content: 'TypeScript can check JavaScript files using JSDoc annotations and the @ts-check comment. Adding // @ts-check at the top of a .js file enables type checking for that file. The compiler infers types from JSDoc comments like /** @type {string} */. This lets you add type safety to JavaScript projects without converting to TypeScript. The checkJs compiler option enables checking for all JavaScript files. jsconfig.json configures type checking for JavaScript projects. JSDoc types support complex types including generics and unions. This approach is useful for gradual migration or projects that must remain JavaScript while still benefiting from type checking.'
      }
    ]
  },
  {
    id: 235,
    slug: 'ts-type-compatibility',
    title: 'Type Compatibility',
    description: 'Understand how TypeScript determines if types are compatible.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Learn structural compatibility rules',
      'Understand function type compatibility',
      'Handle enum and class compatibility'
    ],
    quiz: [
      {
        id: 1,
        question: 'How does TypeScript determine type compatibility?',
        options: [
          'Based on the structure of the types',
          'Based on the declared class hierarchy',
          'Based on the file names',
          'Based on import order'
        ],
        correctIndex: 0,
        explanation: 'TypeScript uses structural typing: types are compatible if their structures match.'
      },
      {
        id: 2,
        question: 'What is function type compatibility?',
        options: [
          'A function with fewer parameters is compatible with one that has more',
          'Functions must have identical signatures',
          'Function types are always incompatible',
          'Only arrow functions are compatible'
        ],
        correctIndex: 0,
        explanation: 'A function accepting fewer parameters can be used where a function with more parameters is expected.'
      },
      {
        id: 3,
        question: 'Are string enum values compatible with string?',
        options: [
          'No, string enums are not compatible with string',
          'Yes, string enums are subtypes of string',
          'Only if you use as string',
          'Only with explicit casting'
        ],
        correctIndex: 0,
        explanation: 'String enums are nominal and not assignable to string or other string enums.'
      }
    ],
    topics: [
      {
        id: 'structural-compatibility',
        title: 'Structural Compatibility Rules',
        content: 'TypeScript uses structural typing to determine compatibility. Two types are compatible if their structures are compatible. A type with more properties can be assigned to one with fewer properties. This means an object with name, age, and email is assignable to a type that only requires name. Extra properties are simply ignored. This is different from nominal typing where class identity matters. Structural compatibility applies to object types, interfaces, and type aliases. A function type is compatible if its parameters and return types align structurally. This makes TypeScript flexible but sometimes too permissive when you want stricter guarantees.'
      },
      {
        id: 'function-compatibility',
        title: 'Function Type Compatibility',
        content: 'Function types follow specific compatibility rules. A function with fewer parameters is assignable to one with more parameters. This enables callback patterns where the caller provides extra context. Function return types follow the same structural rules. Void return types are compatible with any return type. Generic functions are compatible if their type parameters are compatible. Method signatures in interfaces follow bivariant checking by default. With strictFunctionTypes enabled, parameter types are checked contravariantly, meaning a function accepting a more specific type is not compatible with one accepting a more general type. This makes function type checking more precise and safer.'
      },
      {
        id: 'enum-class-compatibility',
        title: 'Enum and Class Compatibility',
        content: 'Enums have special compatibility rules. Numeric enum values are compatible with number. String enum values are not compatible with string or other string enums. This nominal behavior prevents accidental mixing of different enum types. Classes use nominal typing for their instances based on the class declaration. Two classes with identical structures are not compatible unless one extends the other. This prevents treating arbitrary objects as class instances. Interfaces and type aliases follow structural typing and are compatible with classes that have matching structure. Abstract classes follow the same nominal rules as classes. Understanding these differences helps design APIs with appropriate flexibility.'
      }
    ]
  },
  {
    id: 236,
    slug: 'ts-structural-typing',
    title: 'Structural Typing',
    description: 'Learn how TypeScript uses shape-based type checking.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Understand structural vs nominal typing',
      'Apply structural typing in real scenarios',
      'Create branded types for nominal-like behavior'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is structural typing?',
        options: [
          'Types are compatible based on their structure, not names',
          'Types must have identical names',
          'Types are checked at runtime',
          'Types are inferred from usage only'
        ],
        correctIndex: 0,
        explanation: 'Structural typing checks whether two types have compatible shapes regardless of their declared names.'
      },
      {
        id: 2,
        question: 'Why might structural typing be too permissive?',
        options: [
          'Any object with matching properties is accepted',
          'It prevents all type errors',
          'It requires explicit annotations',
          'It does not work with interfaces'
        ],
        correctIndex: 0,
        explanation: 'Structural typing accepts any object with the right shape, even if it was not intended to be that type.'
      },
      {
        id: 3,
        question: 'How can you simulate nominal typing in TypeScript?',
        options: [
          'Using branded types or opaque types',
          'By disabling strict mode',
          'Using the any type',
          'With the nominal keyword'
        ],
        correctIndex: 0,
        explanation: 'Branded types add a phantom property that makes types nominally distinct.'
      }
    ],
    topics: [
      {
        id: 'structural-typing-fundamentals',
        title: 'Structural Typing Fundamentals',
        content: 'TypeScript uses structural typing, meaning type compatibility is determined by the shape of the data rather than explicit declarations. An interface Person { name: string; age: number } is compatible with any object that has name and age properties, regardless of whether it was declared as a Person. This is different from Java or C# where class identity matters. Structural typing makes TypeScript very flexible for working with plain objects. It enables patterns like dependency injection without interfaces. You can pass any object that matches the expected shape to a function. This reduces boilerplate but can sometimes accept unintended types.'
      },
      {
        id: 'excess-property-checks',
        title: 'Excess Property Checking',
        content: 'TypeScript has a special rule for object literals called excess property checking. When you assign an object literal directly to a typed variable, extra properties cause an error. This catches typos and wrong property names in configuration objects. However, if you first assign the object to a variable, excess properties are allowed due to structural typing. This distinction between direct assignment and variable assignment is important to understand. Excess property checking only applies to object literal expressions. Spread syntax and Object.assign do not trigger excess property checking. This rule helps catch common mistakes while maintaining structural typing flexibility for other cases.'
      },
      {
        id: 'nominal-typing-patterns',
        title: 'Simulating Nominal Typing',
        content: 'Sometimes structural typing is too permissive. For example, you might want to distinguish between UserId and OrderId even though both are strings. Branded types solve this by adding a phantom property that makes types structurally distinct. type UserId = string & { readonly __brand: unique symbol }. This prevents accidentally passing a UserId where an OrderId is expected. The __brand property does not exist at runtime and is erased by the compiler. You create branded values with type assertions: userId as UserId. Libraries like ts-brand create reusable branded type utilities. This pattern is essential for preventing ID confusion bugs in large codebases.'
      }
    ]
  },
  {
    id: 237,
    slug: 'ts-discriminated-unions',
    title: 'Discriminated Unions',
    description: 'Model state machines and variants with tagged union types.',
    level: 'advanced',
    duration: '30 min',
    objectives: [
      'Create discriminated unions with a common discriminant',
      'Narrow types using switch statements on the discriminant',
      'Model complex state with discriminated unions'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a discriminant in a discriminated union?',
        options: [
          'A common literal property shared across all union members',
          'A function that distinguishes types',
          'A generic type parameter',
          'A runtime type check'
        ],
        correctIndex: 0,
        explanation: 'The discriminant is a common property with a literal type that identifies each union member.'
      },
      {
        id: 2,
        question: 'How do you narrow a discriminated union?',
        options: [
          'Switch or if-else on the discriminant property',
          'Use typeof on the whole object',
          'Cast each member individually',
          'Use a type guard function'
        ],
        correctIndex: 0,
        explanation: 'Switching on the discriminant property narrows to the specific union member in each case.'
      },
      {
        id: 3,
        question: 'What pattern does a discriminated union model?',
        options: [
          'State machines with different states and associated data',
          'Class inheritance hierarchies',
          'Module dependencies',
          'Event listeners'
        ],
        correctIndex: 0,
        explanation: 'Discriminated unions naturally model states where each state has different data and transitions.'
      }
    ],
    topics: [
      {
        id: 'discriminated-union-basics',
        title: 'Discriminated Union Structure',
        content: 'A discriminated union is a union of types that share a common literal property called the discriminant. type Shape = { kind: \'circle\'; radius: number } | { kind: \'rectangle\'; width: number; height: number }. The kind property is the discriminant. Each member has a different literal type for kind. TypeScript uses the discriminant to narrow the union automatically. When you check shape.kind === \'circle\', TypeScript knows the remaining properties include radius. This pattern is powerful for modeling states, API responses with different shapes, and event types. It eliminates runtime type checks and catches unhandled cases at compile time.'
      },
      {
        id: 'discriminated-union-narrowing',
        title: 'Narrowing Discriminated Unions',
        content: 'The most common narrowing pattern uses switch statements on the discriminant. switch (shape.kind) { case \'circle\': /* shape is Circle */ break; case \'rectangle\': /* shape is Rectangle */ break; }. Each case narrows to the corresponding union member. TypeScript also narrows with if-else chains checking the discriminant. The default case can use never to ensure all cases are handled. Discriminated unions work with any literal type as the discriminant: strings, numbers, or booleans. The discriminant must be a property, not the value itself. This pattern replaces instanceof checks and type assertions with compile-time safe narrowing.'
      },
      {
        id: 'discriminated-union-advanced',
        title: 'Advanced Discriminated Union Patterns',
        content: 'Discriminated unions can model complex state machines where each state has different available data and transitions. API responses often use discriminated unions: type ApiResponse = { status: \'loading\' } | { status: \'success\'; data: T } | { status: \'error\'; error: string }. Error handling benefits from discriminated unions: type Result = { ok: true; value: T } | { ok: false; error: Error }. You can nest discriminated unions for hierarchical states. Combine with generic types for reusable patterns. The never type in the default case of a switch ensures exhaustiveness checking. Discriminated unions are one of TypeScript\'s most powerful patterns for type-safe data modeling.'
      }
    ]
  },
  {
    id: 238,
    slug: 'ts-exhaustiveness',
    title: 'Exhaustiveness',
    description: 'Ensure all cases are handled with compile-time checking.',
    level: 'advanced',
    duration: '25 min',
    objectives: [
      'Use the never type for exhaustiveness checking',
      'Catch unhandled cases at compile time',
      'Apply exhaustiveness in switch and if-else'
    ],
    quiz: [
      {
        id: 1,
        question: 'How does exhaustiveness checking work?',
        options: [
          'Assigning to never catches unhandled cases at compile time',
          'Running all cases at runtime',
          'Using a special exhaust keyword',
          'Enabling the exhaustChecks compiler option'
        ],
        correctIndex: 0,
        explanation: 'If a case is unhandled, its type is not assignable to never, causing a compile error.'
      },
      {
        id: 2,
        question: 'Where do you put the never assertion in a switch?',
        options: [
          'In the default case',
          'In the first case',
          'After the switch',
          'In the catch block'
        ],
        correctIndex: 0,
        explanation: 'The default case assigns the value to never. If any case is unhandled, this produces a compile error.'
      },
      {
        id: 3,
        question: 'What does the never type represent?',
        options: [
          'A value that can never be produced',
          'An empty object',
          'The null value',
          'An uninitialized variable'
        ],
        correctIndex: 0,
        explanation: 'never represents a type with no possible values, used for unreachable code and exhaustiveness.'
      }
    ],
    topics: [
      {
        id: 'exhaustiveness-basics',
        title: 'Exhaustiveness Checking Fundamentals',
        content: 'Exhaustiveness checking ensures every case in a union type is handled. The pattern uses the never type: after a switch on a discriminated union, the default case assigns the value to a variable typed as never. If any case is not handled, the variable will have a concrete type that is not assignable to never, producing a compile error. This catches missing cases at compile time rather than runtime. For example, in a Shape union with circle and rectangle, forgetting the rectangle case causes a compile error. This pattern works with discriminated unions and conditional branches. It is one of TypeScript\'s most valuable safety features.'
      },
      {
        id: 'exhaustiveness-patterns',
        title: 'Exhaustiveness Patterns',
        content: 'The standard exhaustiveness pattern declares a variable typed as never and assigns the narrowed value to it. function assertNever(x: never): never { throw new Error(); } creates a reusable helper. In the default case of a switch, call assertNever(value) to enforce exhaustiveness. This works because if all cases are handled, the default case is unreachable and value is never. For if-else chains, throw an error after the final else with a type assertion. The exhaustiveness check is especially valuable when new union members are added. The compiler immediately reports all locations that need updating. This eliminates a class of bugs where new enum values or states are not handled.'
      },
      {
        id: 'exhaustiveness-limitations',
        title: 'Limitations and Workarounds',
        content: 'Exhaustiveness checking only works with discriminated unions or well-narrowed types. It does not work with loose unions where the discriminant is optional or inconsistent. When using external APIs that return untyped data, you may not have a union to check exhaustiveness against. For arrays with unknown elements, exhaustive checks require runtime validation. Exhaustiveness does not cover all branches of complex conditional logic. Some TypeScript versions have edge cases with exhaustiveness checking in generic contexts. When exhaustiveness checking produces false positives, you can use explicit type assertions. Despite these limitations, exhaustiveness checking is a critical tool for maintaining type safety during refactoring.'
      }
    ]
  },
  {
    id: 239,
    slug: 'ts-never-type',
    title: 'Never Type',
    description: 'Understand the type that represents values that never occur.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Recognize when never is inferred',
      'Use never for exhaustiveness checking',
      'Apply never in conditional types'
    ],
    quiz: [
      {
        id: 1,
        question: 'When is the never type inferred?',
        options: [
          'In functions that always throw or have infinite loops',
          'For variables initialized to null',
          'For empty arrays',
          'For optional parameters'
        ],
        correctIndex: 0,
        explanation: 'Functions that never return, like those that throw or loop forever, have return type never.'
      },
      {
        id: 2,
        question: 'What happens when you narrow a union to all cases?',
        options: [
          'The remaining type is never',
          'The remaining type is any',
          'The remaining type is unknown',
          'TypeScript throws a runtime error'
        ],
        correctIndex: 0,
        explanation: 'After handling all union members, no cases remain, so the type narrows to never.'
      },
      {
        id: 3,
        question: 'How is never used in conditional types?',
        options: [
          'As a fallback when a type condition does not match',
          'To create infinite loops',
          'To disable type checking',
          'To infer generic types'
        ],
        correctIndex: 0,
        explanation: 'never is used in the false branch of conditional types when no type should be produced.'
      }
    ],
    topics: [
      {
        id: 'never-type-fundamentals',
        title: 'What Is the Never Type',
        content: 'The never type represents values that can never be produced. A function that always throws has return type never because it never returns a value. A function with an infinite loop also has return type never. The never type is the bottom type, meaning it is assignable to every type. When you narrow a union to handle all cases, the remaining type is never. This makes never useful for exhaustiveness checking. An empty array can be typed as never[] if no elements can be added. Variables declared in dead code after a return statement have type never. The never type is distinct from void, which represents the absence of a return value.'
      },
      {
        id: 'never-in-practice',
        title: 'Practical Never Type Usage',
        content: 'The most common use of never is exhaustiveness checking in switch statements. When all union cases are handled, the default case receives a value of type never. Assigning it to a never variable catches any unhandled cases at compile time. Never is also used in conditional types as the false branch when no type should be produced: T extends string ? T : never. This filters out non-string types from unions. Never appears in mapped types to remove properties: { [K in keyof T as T[K] extends never ? never : K]: T[K] }. Functions that throw errors are typed as returning never to indicate they do not produce a value. Understanding never helps write more precise and safer types.'
      },
      {
        id: 'never-vs-void',
        title: 'Never vs Void',
        content: 'Never and void both represent the absence of a meaningful return value, but they are different. Void means the function returns undefined, but you can still return explicitly. A void function can have return statements without values. Never means the function never completes at all. It either throws an error or enters an infinite loop. You cannot assign void to never because a void function might return undefined. You can assign never to void because never functions never return. In callbacks, void means the return value is ignored. Never means the callback should never be called. This distinction matters for type safety in generic code and callback patterns.'
      }
    ]
  },
  {
    id: 240,
    slug: 'ts-unknown-type',
    title: 'Unknown Type',
    description: 'Use the type-safe alternative to any.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Understand unknown as a type-safe any alternative',
      'Narrow unknown values before using them',
      'Apply unknown in function parameters and variables'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between unknown and any?',
        options: [
          'unknown requires type checking before use, any allows all operations',
          'unknown is less safe than any',
          'any requires explicit types, unknown does not',
          'They are identical'
        ],
        correctIndex: 0,
        explanation: 'unknown forces you to narrow the type before using the value, while any disables type checking.'
      },
      {
        id: 2,
        question: 'Can you assign a value of type unknown directly to a string variable?',
        options: [
          'No, you must narrow first',
          'Yes, TypeScript infers the type',
          'Only with as string',
          'Only in strict mode'
        ],
        correctIndex: 0,
        explanation: 'Unknown values cannot be used directly. You must narrow with typeof, instanceof, or assertions.'
      },
      {
        id: 3,
        question: 'When is unknown most useful?',
        options: [
          'When the type of a value is not known at compile time',
          'When you want to skip type checking',
          'When working with any type',
          'When you need the any type safely'
        ],
        correctIndex: 0,
        explanation: 'Unknown is ideal for data from external sources like JSON parsing where the shape is uncertain.'
      }
    ],
    topics: [
      {
        id: 'unknown-fundamentals',
        title: 'Unknown Type Fundamentals',
        content: 'The unknown type is the type-safe counterpart to any. Every type is assignable to unknown, but unknown is not assignable to anything except unknown and any. This means you cannot perform operations on an unknown value without first narrowing its type. Use typeof to check the type: if (typeof value === \'string\') then use value as a string. This forces explicit type checking, preventing accidental misuse. Unknown is the default return type of JSON.parse. It is used for function parameters that accept any type safely. Unlike any, unknown preserves type safety while allowing flexibility. This makes it essential for type-safe code that handles external data.'
      },
      {
        id: 'unknown-narrowing',
        title: 'Narrowing Unknown Values',
        content: 'To use an unknown value, you must narrow it first. Use typeof for primitives: typeof x === \'string\' narrows to string. Use instanceof for class instances: x instanceof Error narrows to Error. Use custom type guards for complex types: function isUser(x: unknown): x is User { ... }. Once narrowed, the value has the specific type within that branch. You can also use type assertions with as, but this bypasses type checking. For JSON data, parse and then narrow with a type guard. Switch statements work for discriminated unions of unknown values. Narrowing is the essential step that makes unknown type-safe. Without narrowing, the value remains unusable.'
      },
      {
        id: 'unknown-usage-patterns',
        title: 'Unknown Usage Patterns',
        content: 'Use unknown for function parameters that genuinely accept any type. A logging function might accept unknown to log any value. Use unknown for variables that receive data from external sources before parsing. JSON.parse returns unknown, requiring you to validate the structure. Use unknown in generic constraints when the type is determined at runtime. Store unknown values in arrays or maps when the elements have different types. The unknown type pairs well with type guards for building validation layers. For API responses with unknown shapes, start with unknown and narrow based on status codes. This pattern creates robust type-safe code that handles uncertainty gracefully.'
      }
    ]
  },
  {
    id: 241,
    slug: 'ts-void-type',
    title: 'Void Type',
    description: 'Use the void type for functions without return values.',
    level: 'beginner',
    duration: '15 min',
    objectives: [
      'Understand when void is used',
      'Differentiate void from undefined',
      'Use void in callback type definitions'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the void type represent?',
        options: [
          'A function that does not return a value',
          'An empty object',
          'The null value',
          'An uninitialized variable'
        ],
        correctIndex: 0,
        explanation: 'void indicates a function does not return a meaningful value.'
      },
      {
        id: 2,
        question: 'Can a void function have a return statement?',
        options: [
          'Yes, but without a value',
          'No, void functions cannot return',
          'Only with explicit return',
          'Only in strict mode'
        ],
        correctIndex: 0,
        explanation: 'A void function can have return statements without values, which is equivalent to returning undefined.'
      },
      {
        id: 3,
        question: 'When should you use void as a callback return type?',
        options: [
          'When you do not care about the callback return value',
          'When the callback must return a string',
          'When the callback is async',
          'When the callback throws errors'
        ],
        correctIndex: 0,
        explanation: 'void callback types let the callback return any value, but the caller ignores it.'
      }
    ],
    topics: [
      {
        id: 'void-type-basics',
        title: 'Void Type Fundamentals',
        content: 'The void type represents the absence of a return value. A function typed as void does not return anything useful. You can omit the return statement or use a bare return. The void type is used as the return type for functions that perform side effects like logging, updating the DOM, or sending network requests. Unlike never, a void function can finish execution normally. Unlike undefined, void indicates the caller should not use the return value. When you assign a void function result to a variable, the variable has type void, and you should not use it. Void is essential for typing callbacks and event handlers.'
      },
      {
        id: 'void-vs-undefined',
        title: 'Void vs Undefined',
        content: 'Void and undefined are related but distinct. A void return type means the function returns undefined, but the caller should not rely on it. A function typed to return undefined explicitly returns undefined and the caller can use it. In practice, void functions return undefined implicitly. The void type prevents you from using the return value, while undefined is an actual value you can assign and use. In callback types, void means ignore the return value. undefined means the callback must return undefined. This distinction matters in generic code where callback return types are used. Use void when the return value does not matter.'
      },
      {
        id: 'void-callback-patterns',
        title: 'Void in Callbacks and Promises',
        content: 'Void is commonly used in callback type definitions. Event listener types use void to indicate the return value is ignored: addEventListener(type: string, handler: () => void). Array methods like forEach use void callbacks: forEach((item) => void). When using Promise<void>, it indicates an async operation with no meaningful result. The void type in mapped types like { [K in keyof T]: void } creates objects where values are ignored. In RxJS, void indicates observables that complete without emitting values. Use void when designing APIs where callbacks perform side effects. This communicates that the return value is not important to the caller.'
      }
    ]
  },
  {
    id: 242,
    slug: 'ts-any-escape',
    title: 'Avoiding Any',
    description: 'Replace any with safer alternatives for better type safety.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Identify when any is used unnecessarily',
      'Replace any with unknown, generics, or specific types',
      'Configure linting to prevent any usage'
    ],
    quiz: [
      {
        id: 1,
        question: 'Why should any be avoided?',
        options: [
          'It disables type checking entirely',
          'It slows down compilation',
          'It is deprecated',
          'It does not work with strict mode'
        ],
        correctIndex: 0,
        explanation: 'any bypasses all type checking, allowing bugs to pass undetected.'
      },
      {
        id: 2,
        question: 'What is a good replacement for any when the type is truly unknown?',
        options: [
          'unknown',
          'void',
          'never',
          'null'
        ],
        correctIndex: 0,
        explanation: 'unknown forces type narrowing before use, providing type safety without losing flexibility.'
      },
      {
        id: 3,
        question: 'How can you prevent any in a codebase?',
        options: [
          'Enable the noImplicitAny compiler option',
          'Use any everywhere',
          'Disable TypeScript strict mode',
          'Use JavaScript instead'
        ],
        correctIndex: 0,
        explanation: 'noImplicitAny flags places where TypeScript cannot infer a type and would default to any.'
      }
    ],
    topics: [
      {
        id: 'why-any-is-dangerous',
        title: 'The Problem with Any',
        content: 'The any type completely disables type checking. When you use any, TypeScript stops verifying operations on that value. You can call any method, access any property, and assign it to any type without errors. This defeats the purpose of using TypeScript. Any is a gradual migration tool, not a permanent solution. Common uses of any include lazy typing, untyped external data, and complex generics that are difficult to type. Each any in your codebase is a potential bug that TypeScript cannot catch. The noImplicitAny compiler option catches places where any is inferred implicitly. Explicit any is safer than implicit any but still should be replaced with proper types.'
      },
      {
        id: 'any-replacements',
        title: 'Safer Alternatives to Any',
        content: 'Replace any with unknown when the type is truly unknown and you will narrow it before use. Use generics to preserve type information through function calls. Use union types to represent multiple possible types. Use specific interfaces or type aliases to describe data shapes. For third-party libraries, find or create type definitions. Use conditional types to derive types from existing ones. For callback parameters, use specific types or void. For array elements, use specific element types. For return types, let TypeScript infer or specify the actual type. Each replacement maintains type safety while providing the flexibility that any offered. The initial effort of proper typing pays off in catching errors and better tooling.'
      },
      {
        id: 'linting-any',
        title: 'Linting Rules Against Any',
        content: 'Configure ESLint with the no-explicit-any rule to flag any usage. The @typescript-eslint/no-explicit-any rule can be set to warn or error. For stricter control, use no-implicit-any to catch inferred any. The @typescript-eslint/ban-types rule can restrict specific dangerous types. Combine these rules with a pre-commit hook to prevent any from being committed. When migrating an existing codebase, set these rules to warn and fix them gradually. Allow any only in specific files with eslint-disable comments and documented justification. Track any usage over time with metrics. The goal is zero any usage, but pragmatic exceptions exist for rapid prototyping or complex type gymnastics.'
      }
    ]
  },
  {
    id: 243,
    slug: 'ts-assertion-angles',
    title: 'Angle Bracket vs As',
    description: 'Compare the two type assertion syntaxes and when to use each.',
    level: 'beginner',
    duration: '15 min',
    objectives: [
      'Use angle-bracket assertion syntax',
      'Use as assertion syntax',
      'Know when each syntax is appropriate'
    ],
    quiz: [
      {
        id: 1,
        question: 'Which syntax is preferred in modern TypeScript?',
        options: [
          'as syntax',
          'Angle-bracket syntax',
          'Both are equally preferred',
          'Neither, use type guards'
        ],
        correctIndex: 0,
        explanation: 'The as syntax is preferred because it works in all files including .tsx files.'
      },
      {
        id: 2,
        question: 'Why does angle-bracket syntax not work in .tsx files?',
        options: [
          'It conflicts with JSX element syntax',
          'TypeScript does not support it in tsx',
          'The compiler ignores it',
          'It throws a parse error'
        ],
        correctIndex: 0,
        explanation: 'Angle brackets conflict with JSX element syntax, causing ambiguity in parser.'
      },
      {
        id: 3,
        question: 'Do both syntaxes produce the same result?',
        options: [
          'Yes, they are semantically identical',
          'No, angle brackets are safer',
          'No, as is more type-safe',
          'They produce different JavaScript'
        ],
        correctIndex: 0,
        explanation: 'Both syntaxes are semantically identical and produce the same TypeScript output.'
      }
    ],
    topics: [
      {
        id: 'angle-bracket-syntax',
        title: 'Angle Bracket Assertion',
        content: 'The angle-bracket syntax places the type in angle brackets before the value. <HTMLDivElement>document.getElementById(\'app\') treats the result as an HTMLDivElement. This syntax reads as type first, then value. It is concise and visually clear. However, it conflicts with JSX syntax in .tsx files because angle brackets are also used for JSX elements. This parser ambiguity makes angle brackets unusable in React components and other JSX contexts. In plain .ts files, both syntaxes work identically. The angle-bracket syntax is older and less common in modern TypeScript code. Most linters and style guides recommend against using it for consistency.'
      },
      {
        id: 'as-syntax',
        title: 'As Assertion Syntax',
        content: 'The as keyword places the type after the value using the as operator. document.getElementById(\'app\') as HTMLDivElement reads as value as type. This syntax is the preferred modern TypeScript style. It works in all contexts including .tsx files. The as syntax chains naturally: document.getElementById(\'app\') as HTMLDivElement as HTMLElement. It reads left to right and composes well with other operations. TypeScript 4.0 introduced as const assertions using as const. The as syntax is required when the value is a union member and you want to narrow to a specific member. This is the standard assertion syntax in all modern TypeScript projects.'
      },
      {
        id: 'choosing-syntax',
        title: 'When to Use Each Syntax',
        content: 'Use the as syntax in all new code for consistency and compatibility. Reserve angle-bracket syntax only for legacy codebases that already use it. Neither syntax is inherently safer. Both bypass type checking, so ensure the assertion is correct. When working in .tsx files, only as syntax is available. For const assertions, only as const works. When chaining assertions, as syntax reads more naturally. Consider whether a type guard function would be more appropriate than an assertion. Type guards provide runtime checking while assertions are compile-time only. The style choice is less important than using assertions judiciously and preferring type guards when possible.'
      }
    ]
  },
  {
    id: 244,
    slug: 'ts-non-null-assertion',
    title: 'Non-Null Assertion',
    description: 'Use the exclamation mark to assert non-null values.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Apply non-null assertions with the exclamation mark',
      'Understand the risks of non-null assertions',
      'Use optional chaining and nullish coalescing instead'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the ! operator do in TypeScript?',
        options: [
          'Asserts that a value is not null or undefined',
          'Logical NOT operator',
          'Negates a type',
          'Creates a non-nullable type'
        ],
        correctIndex: 0,
        explanation: 'The non-null assertion operator tells TypeScript the value is definitely not null or undefined.'
      },
      {
        id: 2,
        question: 'What is the risk of using !?',
        options: [
          'It can cause runtime errors if the value is actually null',
          'It slows down execution',
          'It adds runtime overhead',
          'It is deprecated'
        ],
        correctIndex: 0,
        explanation: 'Non-null assertions bypass type checking, so a wrong assertion leads to runtime null reference errors.'
      },
      {
        id: 3,
        question: 'What is a safer alternative to !?',
        options: [
          'Optional chaining and nullish coalescing',
          'Using any type',
          'Disabling strict null checks',
          'Casting to unknown'
        ],
        correctIndex: 0,
        explanation: 'Optional chaining (?.) and nullish coalescing (??) handle null safely without assertions.'
      }
    ],
    topics: [
      {
        id: 'non-null-assertion-syntax',
        title: 'Non-Null Assertion Syntax',
        content: 'The non-null assertion operator is an exclamation mark placed after a value or property access. user!.name asserts user is not null or undefined. It can be chained: document.getElementById(\'app\')!.querySelector(\'button\')!.textContent!. This operator removes null and undefined from the type without any runtime check. TypeScript trusts the assertion and treats the value as non-nullable. Common uses include DOM queries where you know the element exists, and API responses where you know the data is present. However, this is a compile-time assertion only. If the value is actually null at runtime, you get a null reference error. Use with extreme caution.'
      },
      {
        id: 'non-null-risks',
        title: 'Risks of Non-Null Assertions',
        content: 'Non-null assertions are inherently unsafe because they lie to the compiler. If the value is null, the assertion hides the bug until runtime. This defeats the purpose of strict null checks. In DOM queries, the element might not exist if the selector is wrong or the DOM has not loaded yet. In API data, the server might return null for unexpected reasons. Each non-null assertion is a potential crash waiting to happen. They are especially dangerous in shared code where the caller might not know the value could be null. Consider non-null assertions as temporary workarounds while building proper null handling. Replace them with guards whenever possible.'
      },
      {
        id: 'better-alternatives',
        title: 'Safer Alternatives to Non-Null Assertions',
        content: 'Optional chaining (?.) safely returns undefined if any part of the chain is null, without throwing. Nullish coalescing (??) provides a default value when the left side is null or undefined. Together they replace most non-null assertions: user?.address?.city ?? \'Unknown\'. For DOM queries, check existence before using the element. For API responses, use type guards to validate the data shape. Early returns with null checks make code defensive: if (!user) return; Then use user freely after the guard. Type guard functions validate and narrow types in one step. These patterns add a few lines but prevent crashes and make code more maintainable.'
      }
    ]
  },
  {
    id: 245,
    slug: 'ts-keyof',
    title: 'Keyof',
    description: 'Extract and use object key types dynamically.',
    level: 'advanced',
    duration: '30 min',
    objectives: [
      'Use keyof to get keys of an object type',
      'Combine keyof with indexed access types',
      'Create type-safe property accessors'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does keyof T return?',
        options: [
          'A union of all property keys of type T',
          'The values of type T',
          'A boolean for each key',
          'The count of properties'
        ],
        correctIndex: 0,
        explanation: 'keyof T produces a union type of all property names (as string literals) of T.'
      },
      {
        id: 2,
        question: 'How do you access a property value type using keyof?',
        options: [
          'T[K] where K is keyof T',
          'T[K] where K is any string',
          'keyof T[K]',
          'T.keyof'
        ],
        correctIndex: 0,
        explanation: 'Indexed access types use T[K] where K extends keyof T to access property value types.'
      },
      {
        id: 3,
        question: 'What is a common use of keyof?',
        options: [
          'Creating type-safe getter functions',
          'Defining class constructors',
          'Creating new objects',
          'Importing modules'
        ],
        correctIndex: 0,
        explanation: 'keyof enables type-safe property access functions that work with any object shape.'
      }
    ],
    topics: [
      {
        id: 'keyof-fundamentals',
        title: 'Keyof Operator Basics',
        content: 'The keyof operator takes a type and produces a union of its property names as string literal types. For interface User { name: string; age: number }, keyof User produces \'name\' | \'age\'. This union can be used to constrain function parameters to valid property names. keyof works with interfaces, type aliases, classes, and object literal types. The result is always a subtype of string for string keys, number for numeric keys, or symbol for symbol keys. keyof is essential for creating generic utility functions that work with any object shape. It connects types and values in a type-safe way that prevents invalid property access.'
      },
      {
        id: 'keyof-with-generics',
        title: 'Keyof with Generics',
        content: 'The most powerful keyof pattern combines it with generics. function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] accepts any object and any valid key of that object. The return type T[K] is the type of that specific property. This creates fully type-safe property accessors. The generic constraint K extends keyof T ensures only valid keys are accepted. At the call site, TypeScript infers the specific key and return type. This pattern is used in utility libraries, state management, and ORM query builders. It eliminates the need for type assertions when accessing dynamic properties and catches key typos at compile time.'
      },
      {
        id: 'keyof-patterns',
        title: 'Keyof Advanced Patterns',
        content: 'Keyof combines with other types for powerful patterns. keyof T combined with omit creates types with specific properties removed. Mapped types using [K in keyof T] transform all properties of a type. Conditional types with keyof filter properties by their value types: Pick<T, { [K in keyof T]: T[K] extends string ? K : never }[keyof T]>. This picks only string properties. Keyof with template literal types creates dynamic property name patterns. In Angular, keyof is used for input bindings and event handlers. The combination of keyof and indexed access types is the foundation for most TypeScript utility types. Mastering these patterns unlocks advanced type-level programming.'
      }
    ]
  },
  {
    id: 246,
    slug: 'ts-typeof',
    title: 'Typeof',
    description: 'Extract types from values using the typeof operator.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Use typeof to extract types from values',
      'Apply typeof in type annotations',
      'Combine typeof with other type utilities'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does typeof do when used as a type operator?',
        options: [
          'Extracts the type of a value or variable',
          'Checks the type at runtime',
          'Creates a new type',
          'Returns a string representation'
        ],
        correctIndex: 0,
        explanation: 'typeof as a type operator extracts the TypeScript type of a declared value.'
      },
      {
        id: 2,
        question: 'Can typeof be used on a variable that does not exist yet?',
        options: [
          'No, typeof requires the value to be in scope',
          'Yes, it works on any name',
          'Only with the declare keyword',
          'Only in .d.ts files'
        ],
        correctIndex: 0,
        explanation: 'typeof extracts the type of a value that exists in the current scope.'
      },
      {
        id: 3,
        question: 'What is a common pattern with typeof?',
        options: [
          'Using typeof with a const object to derive its type',
          'Using typeof to check if a value is null',
          'Using typeof to create new values',
          'Using typeof for runtime validation'
        ],
        correctIndex: 0,
        explanation: 'typeof a const object creates a type that matches the object shape exactly.'
      }
    ],
    topics: [
      {
        id: 'typeof-type-operator',
        title: 'Typeof as a Type Operator',
        content: 'When used in a type position, typeof extracts the type of a value. const config = { apiUrl: \'https://api.example.com\', timeout: 5000 } creates a const object. Typeof config produces { apiUrl: string; timeout: number }. This is useful for deriving types from configuration objects without manually writing interfaces. The typeof operator works on variables, imported values, and object literals. It captures the inferred type at the declaration site. For const declarations, typeof captures the literal types. This pattern is common in library code where the runtime configuration doubles as the type definition.'
      },
      {
        id: 'typeof-with-imports',
        title: 'Typeof with Imports',
        content: 'Typeof can extract types from imported values. When you import a class, typeof ClassName gives the constructor type. This is useful for dependency injection where you need the constructor type, not the instance type. For imported objects or namespaces, typeof captures their type. Combined with ReturnType, typeof can extract the return type of imported functions. In Angular, typeof is used for type-safe factory providers. The expression typeof value in a type position refers to the type of value, not the runtime typeof operator. This distinction is important: runtime typeof returns a string, while type-level typeof produces a type.'
      },
      {
        id: 'typeof-patterns',
        title: 'Typeof Patterns and Best Practices',
        content: 'Use typeof with const objects to create type-safe configuration. const routes = { home: \'/\', about: \'/about\' } as const; type Route = keyof typeof routes. This extracts route names as a union. Use typeof with imported functions to create matching function types. typeof with ReturnType extracts return types of specific function instances. In utility types, typeof can narrow conditional branches. For class properties, typeof captures the property types without writing interfaces. The pattern of defining a value and extracting its type with typeof keeps type definitions close to their implementation. This reduces duplication and ensures types stay in sync with values.'
      }
    ]
  },
  {
    id: 247,
    slug: 'ts-infer',
    title: 'Infer',
    description: 'Extract types from complex type expressions using infer.',
    level: 'advanced',
    duration: '30 min',
    objectives: [
      'Use infer in conditional types',
      'Extract return types, parameter types, and array element types',
      'Build advanced utility types with infer'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does the infer keyword do?',
        options: [
          'Declares a type variable to be inferred in a conditional type',
          'Creates a new type from a value',
          'Extracts keys from an object',
          'Makes a type nullable'
        ],
        correctIndex: 0,
        explanation: 'infer introduces a type variable that TypeScript infers from the true branch of a conditional type.'
      },
      {
        id: 2,
        question: 'Where can infer be used?',
        options: [
          'Only within the extends clause of conditional types',
          'Anywhere in type annotations',
          'In function parameters',
          'In variable declarations'
        ],
        correctIndex: 0,
        explanation: 'infer is only valid in the extends clause of conditional types.'
      },
      {
        id: 3,
        question: 'What is a common use of infer?',
        options: [
          'Extracting the return type of a function type',
          'Creating new functions',
          'Defining class properties',
          'Importing modules'
        ],
        correctIndex: 0,
        explanation: 'infer is commonly used in utility types like ReturnType to extract function return types.'
      }
    ],
    topics: [
      {
        id: 'infer-fundamentals',
        title: 'Infer Keyword Basics',
        content: 'The infer keyword declares a type variable within conditional types. It lets TypeScript infer a type from a complex expression. type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never. Here, R is inferred from the return type of T. If T is a function type, R is its return type. If T is not a function, the result is never. Infer works in any conditional type where the checked type contains a generic parameter. It can infer from function parameters, return types, array elements, Promise values, and object properties. Infer is the key to building sophisticated utility types that extract and transform types.'
      },
      {
        id: 'infer-patterns',
        title: 'Infer Usage Patterns',
        content: 'Infer is used extensively in TypeScript utility types. Extract function parameters: type Params<T> = T extends (...args: infer P) => any ? P : never. Extract array element types: type ElementOf<T> = T extends (infer E)[] ? E : never. Extract Promise inner types: type Unwrap<T> = T extends Promise<infer V> ? V : T. Extract object property types by key: type PropType<T, K extends keyof T> = T[K]. These patterns let you derive new types from existing ones without manually defining them. Infer enables type-level programming where types are computed from other types. This reduces duplication and ensures type consistency across your codebase.'
      },
      {
        id: 'infer-advanced',
        title: 'Advanced Infer Techniques',
        content: 'Infer supports multiple type variables in a single conditional type. type Unpack<T> = T extends Promise<infer U> ? U : T extends Array<infer V> ? V : T. This recursively unwraps types. Infer can capture tuple elements: type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never. Inferring from overloaded functions uses the last overload. The infer keyword can appear multiple times in the same expression for different positions. In TypeScript 4.7 and later, infer supports extends constraints: infer T extends string. This limits what the inferred type can be. These advanced patterns are used in library code for type-safe API design and generic utilities.'
      }
    ]
  },
  {
    id: 248,
    slug: 'ts-exclude-extract',
    title: 'Exclude and Extract',
    description: 'Filter union types by excluding or extracting specific members.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Remove members from a union with Exclude',
      'Keep only specific members with Extract',
      'Combine these with other utility types'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does Exclude<T, U> do?',
        options: [
          'Removes from T all types assignable to U',
          'Extracts types common to T and U',
          'Creates a union of T and U',
          'Makes T optional'
        ],
        correctIndex: 0,
        explanation: 'Exclude filters a union by removing members that match the exclusion type.'
      },
      {
        id: 2,
        question: 'What does Extract<T, U> do?',
        options: [
          'Keeps only members of T that are assignable to U',
          'Removes members of U from T',
          'Creates an intersection of T and U',
          'Returns the count of matching types'
        ],
        correctIndex: 0,
        explanation: 'Extract filters a union by keeping only members that match the extraction type.'
      },
      {
        id: 3,
        question: 'What is Exclude<\'a\' | \'b\' | \'c\', \'b\'>?',
        options: [
          '\'a\' | \'c\'',
          '\'b\'',
          '\'a\' | \'b\' | \'c\'',
          'never'
        ],
        correctIndex: 0,
        explanation: 'Exclude removes \'b\' from the union, leaving \'a\' | \'c\'.'
      }
    ],
    topics: [
      {
        id: 'exclude-type',
        title: 'Exclude Utility Type',
        content: 'Exclude<T, U> produces a union with members from T that are not assignable to U. Exclude<\'a\' | \'b\' | \'c\', \'a\'> results in \'b\' | \'c\'. This filters out unwanted union members. Use it to create subsets of event types, status codes, or method names. When combined with keyof, Exclude removes specific property names from a key union. For function types, Exclude filters overloads. The second parameter can be any type, including unions, to exclude multiple members at once. Exclude works on any union type, whether created with literal types, string unions, or mixed type unions. It is the complement of Extract.'
      },
      {
        id: 'extract-type',
        title: 'Extract Utility Type',
        content: 'Extract<T, U> produces a union with only members from T that are assignable to U. Extract<\'a\' | \'b\' | \'c\', \'a\' | \'b\'> results in \'a\' | \'b\'. This selects specific members from a larger union. Use it to filter API methods by their return type, or event types by their category. Extract is useful for creating filtered views of large unions. When you have a union of optional properties, Extract can narrow to specific property names. Combined with mapped types, Extract selects which properties to include. It works with any union members: strings, numbers, objects, or functions. Extract and Exclude together provide complete control over union filtering.'
      },
      {
        id: 'exclude-extract-patterns',
        title: 'Exclude and Extract Patterns',
        content: 'A common pattern uses Exclude to remove keys before creating mapped types. Omit<T, K> is implemented as Pick<T, Exclude<keyof T, K>>. This removes K keys and picks the rest. Extract with keyof selects only keys whose values match a type. type StringKeys<T> = Extract<keyof T, { [K in keyof T]: T[K] extends string ? K : never }[keyof T]>. This extracts keys with string values. For event systems, Exclude filters events by type. For route definitions, Extract selects routes by method. These utility types are composable: pipe Exclude with Pick, or Extract with Partial. They form the building blocks of more complex type transformations.'
      }
    ]
  },
  {
    id: 249,
    slug: 'ts-record-type',
    title: 'Record',
    description: 'Create typed objects with specific key and value types.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Use Record to create typed dictionaries',
      'Combine Record with union key types',
      'Apply Record for configuration objects'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does Record<K, V> create?',
        options: [
          'An object type with keys of type K and values of type V',
          'An array of V',
          'A Map from K to V',
          'A function that returns V'
        ],
        correctIndex: 0,
        explanation: 'Record creates an object type where all keys have the specified value type.'
      },
      {
        id: 2,
        question: 'How do you create a Record with literal union keys?',
        options: [
          'Record<\'a\' | \'b\' | \'c\', number>',
          'Record<string[], number>',
          'Record<{a, b, c}, number>',
          'Array<Record<number>>'
        ],
        correctIndex: 0,
        explanation: 'Record accepts a union of string literals as the key type parameter.'
      },
      {
        id: 3,
        question: 'What is the benefit of Record over a plain object type?',
        options: [
          'Record ensures all keys from K are present with values of type V',
          'Record is faster at runtime',
          'Record prevents null values',
          'Record creates a class'
        ],
        correctIndex: 0,
        explanation: 'Record guarantees that every key in K exists in the object with a value of type V.'
      }
    ],
    topics: [
      {
        id: 'record-basics',
        title: 'Record Type Fundamentals',
        content: 'Record<K, V> is a utility type that creates an object type with keys of type K and values of type V. Record<string, number> creates an object where all properties have type number. Record<\'active\' | \'inactive\', boolean> creates an object with both active and inactive properties, each boolean. Unlike a plain index signature, Record guarantees that all specified keys exist. Record<string, T> is equivalent to { [key: string]: T }. Record is useful for dictionaries, lookup tables, and configuration objects. It ensures type safety for both keys and values. When used with literal unions, Record creates objects with a fixed set of required properties.'
      },
      {
        id: 'record-patterns',
        title: 'Record Usage Patterns',
        content: 'Record is commonly used for enum-to-value mappings. Record<Direction, string> maps each Direction value to a string. This ensures all enum values are handled. For i18n, Record<Locale, Record<TranslationKey, string>> creates nested translation objects. Record<string, unknown> creates loosely typed dictionaries. Record<number, User> creates user lookups by ID. Record with optional values uses Partial: Record<Status, string | null>. Combining Record with mapped types transforms property types while maintaining key structure. Record is essential for state management where each state needs a specific handler. It catches missing properties at compile time.'
      },
      {
        id: 'record-vs-index',
        title: 'Record vs Index Signatures',
        content: 'Record and index signatures both create typed dictionaries, but with key differences. Record<K, V> with a literal union K ensures all keys exist. An index signature with string key allows any string key. Record<\'a\' | \'b\', number> requires both a and b. { [key: string]: number } allows any string key. Record is more precise for fixed key sets. Index signatures are better for truly dynamic keys. Record with string key is equivalent to an index signature. Choose Record when you know the keys. Use index signatures when keys are dynamic and unknown. Both provide type safety for values. Record is generally preferred in modern TypeScript for its clarity.'
      }
    ]
  },
  {
    id: 250,
    slug: 'ts-pick-omit',
    title: 'Pick and Omit',
    description: 'Create subsets of object types by picking or omitting properties.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Create subset types with Pick',
      'Remove properties with Omit',
      'Combine Pick and Omit with keyof'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does Pick<T, K> do?',
        options: [
          'Creates a type with only the specified properties from T',
          'Removes the specified properties from T',
          'Makes the specified properties optional',
          'Creates a union of T and K'
        ],
        correctIndex: 0,
        explanation: 'Pick selects only the specified keys from a type, creating a subset.'
      },
      {
        id: 2,
        question: 'What does Omit<T, K> do?',
        options: [
          'Creates a type with all properties of T except those in K',
          'Adds the properties of K to T',
          'Makes the specified properties required',
          'Creates an intersection of T and K'
        ],
        correctIndex: 0,
        explanation: 'Omit removes the specified keys from a type, creating a type without those properties.'
      },
      {
        id: 3,
        question: 'How is Omit implemented internally?',
        options: [
          'Pick<T, Exclude<keyof T, K>>',
          'Exclude<T, K>',
          'Record<keyof T, K>',
          'Partial<T>'
        ],
        correctIndex: 0,
        explanation: 'Omit is built on Pick and Exclude: it removes K from the keys and picks the rest.'
      }
    ],
    topics: [
      {
        id: 'pick-type',
        title: 'Pick Utility Type',
        content: 'Pick<T, K> creates a type with only the properties specified in K. Pick<User, \'name\' | \'email\'> produces a type with only name and email from User. This is useful for creating view models that show a subset of data. When you have a large interface, Pick creates focused types for specific use cases. Form components might Pick specific fields from an entity. API responses might Pick a subset of entity properties. Pick maintains the original types of the selected properties. It does not modify optionality or readonly modifiers. Combined with keyof, Pick can dynamically select properties based on type conditions.'
      },
      {
        id: 'omit-type',
        title: 'Omit Utility Type',
        content: 'Omit<T, K> creates a type with all properties of T except those in K. Omit<User, \'password\' | \'salt\'> produces a type without sensitive fields. This is the complement of Pick and is useful for hiding internal properties. When creating API payloads, Omit removes fields that the client should not send. For update operations, Omit removes read-only properties like id and createdAt. Omit with nested keys does not work directly; you need custom mapped types for deep omission. Omit maintains the optionality and readonly modifiers of remaining properties. It is one of the most commonly used utility types in application development.'
      },
      {
        id: 'pick-omit-patterns',
        title: 'Pick and Omit Patterns',
        content: 'Combine Pick and Omit with keyof for type-safe field selection. Create UpdateInput by Omitting id and createdAt from the entity. Create CreateInput by Omitting auto-generated fields. Pick specific fields for list views: Pick<User, \'id\' | \'name\' | \'avatar\'>. Use Pick for form initial values from a subset of fields. Omit sensitive fields before returning API responses. These patterns create type-safe transformations without manual interface duplication. When the source type changes, the derived types update automatically. This is essential for maintainable codebases where entities evolve over time. Pick and Omit form the foundation for most TypeScript type transformations.'
      }
    ]
  },
  {
    id: 251,
    slug: 'ts-partial-required',
    title: 'Partial and Required',
    description: 'Make all properties optional or required in a type.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Make all properties optional with Partial',
      'Make all properties required with Required',
      'Apply these for update operations and defaults'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does Partial<T> do?',
        options: [
          'Makes all properties of T optional',
          'Makes all properties of T required',
          'Removes all properties',
          'Creates a union type'
        ],
        correctIndex: 0,
        explanation: 'Partial creates a type where every property is optional.'
      },
      {
        id: 2,
        question: 'What does Required<T> do?',
        options: [
          'Makes all properties of T required',
          'Makes all properties optional',
          'Creates a readonly type',
          'Removes optional properties'
        ],
        correctIndex: 0,
        explanation: 'Required creates a type where every property is required, removing optionality.'
      },
      {
        id: 3,
        question: 'When is Partial most useful?',
        options: [
          'For update operations where only some fields change',
          'For creating new entities',
          'For delete operations',
          'For type assertions'
        ],
        correctIndex: 0,
        explanation: 'Partial lets you pass only the fields you want to update without specifying all required fields.'
      }
    ],
    topics: [
      {
        id: 'partial-type',
        title: 'Partial Utility Type',
        content: 'Partial<T> creates a type where every property is optional. Partial<User> makes name, email, and all other properties optional. This is ideal for update operations where you want to change only some fields. A PATCH endpoint might accept Partial<User> to update any combination of fields. Partial is useful for default values where some fields have defaults and others do not. It works recursively only one level deep; nested objects remain as-is. Combined with Omit, Partial creates update input types. When using Partial, remember that undefined values need to be handled. The Partial type is one of the most frequently used utility types in TypeScript applications.'
      },
      {
        id: 'required-type',
        title: 'Required Utility Type',
        content: 'Required<T> creates a type where every property is required. Required<Config> makes all optional config properties mandatory. This is useful when you want to ensure all defaults are applied before using an object. Required removes the ? modifier from all properties. It is the inverse of Partial. Use Required after merging partial data with defaults to create a fully populated object. Required does not affect readonly modifiers; use Readonly if needed. For nested optionality, you need recursive Required types. Required is commonly used after default value assignment to guarantee all fields exist. It provides type safety for objects that must be fully initialized.'
      },
      {
        id: 'partial-required-patterns',
        title: 'Partial and Required Patterns',
        content: 'The most common pattern is Partial for updates and Required for initialization. Create an entity interface with some optional fields. Use Partial<Entity> for update DTOs. Use Required<Entity> after applying defaults. Combine Partial with Pick for targeted partial updates: Pick<Partial<User>, \'name\' | \'email\'>. Use Partial for function parameters with optional configuration. Required with Omit creates fully populated types without specific fields. For React state, Partial tracks which fields have been modified. For form handling, Partial represents the current form state. These utility types reduce duplication and keep type definitions in sync with entity changes.'
      }
    ]
  },
  {
    id: 252,
    slug: 'ts-readonly-deep',
    title: 'Deep Readonly',
    description: 'Make all nested properties readonly recursively.',
    level: 'advanced',
    duration: '25 min',
    objectives: [
      'Create a recursive readonly utility type',
      'Understand deep vs shallow readonly',
      'Apply deep readonly for immutable state'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the difference between Readonly and DeepReadonly?',
        options: [
          'Readonly is shallow, DeepReadonly applies recursively to all nested objects',
          'They are identical',
          'DeepReadonly only works with arrays',
          'Readonly is deprecated'
        ],
        correctIndex: 0,
        explanation: 'Readonly only makes top-level properties readonly, while DeepReadonly recurses into nested objects.'
      },
      {
        id: 2,
        question: 'How do you implement DeepReadonly?',
        options: [
          'Using a recursive mapped type',
          'Using the DeepReadonly built-in type',
          'Using Object.freeze',
          'Using the readonly keyword everywhere'
        ],
        correctIndex: 0,
        explanation: 'DeepReadonly is implemented as a recursive mapped type that applies Readonly to all nested levels.'
      },
      {
        id: 3,
        question: 'Does DeepReadonly prevent runtime mutation?',
        options: [
          'No, it is a compile-time check only',
          'Yes, it freezes all objects',
          'Only with strict mode',
          'Only with Object.freeze'
        ],
        correctIndex: 0,
        explanation: 'DeepReadonly is a type-level constraint. It does not prevent mutation at runtime.'
      }
    ],
    topics: [
      {
        id: 'deep-readonly-implementation',
        title: 'Implementing DeepReadonly',
        content: 'DeepReadonly is a recursive mapped type that applies readonly to all properties at every level. type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] }. This recursively processes nested objects, arrays, and Maps. For arrays, it produces readonly arrays. For Maps and Sets, it produces readonly versions. The recursion stops at primitive types that cannot have properties. This type is not built into TypeScript but is commonly defined in utility libraries. It ensures that deeply nested state cannot be mutated through property assignments. DeepReadonly is essential for functional programming patterns and Redux-like state management.'
      },
      {
        id: 'deep-readonly-limitations',
        title: 'DeepReadonly Limitations',
        content: 'DeepReadonly has several limitations. It is a compile-time check only; Object.freeze is needed for runtime immutability. The recursive type can cause performance issues with very deep or circular types. DeepReadonly does not prevent mutation of Map and Set contents; you need custom handling for those. Dates and other mutable objects are marked readonly but their methods can still mutate. The type does not handle union types inside nested structures perfectly. TypeScript 5.x improved recursive type performance, making DeepReadonly more practical. For most applications, a simpler approach with Object.freeze and selective readonly annotations provides sufficient protection without the complexity of full deep readonly.'
      },
      {
        id: 'deep-readonly-patterns',
        title: 'DeepReadonly Usage Patterns',
        content: 'Use DeepReadonly for application state management where immutability is enforced at the type level. Redux store state benefits from deep readonly to prevent accidental mutations. Configuration objects that should not change after initialization use DeepReadonly. API response types that are cached and shared use readonly to prevent modification. Combine DeepReadonly with immutable update patterns using spread syntax. For React state, DeepReadonly ensures state is not mutated directly. Use it for any data structure that represents a snapshot. The pattern of DeepReadonly for storage and mutable local copies for processing is common. This separates read-only views from mutable working copies.'
      }
    ]
  },
  {
    id: 253,
    slug: 'ts-return-type',
    title: 'ReturnType',
    description: 'Extract the return type of a function type.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Use ReturnType to extract function return types',
      'Apply ReturnType with generic functions',
      'Combine with typeof for function return extraction'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does ReturnType<T> extract?',
        options: [
          'The return type of a function type T',
          'The parameter types of T',
          'The key types of T',
          'The value types of T'
        ],
        correctIndex: 0,
        explanation: 'ReturnType extracts the type that a function returns when called.'
      },
      {
        id: 2,
        question: 'How do you get the return type of a function expression?',
        options: [
          'ReturnType<typeof myFunction>',
          'typeof myFunction',
          'myFunction.returnType',
          'Return<typeof myFunction>'
        ],
        correctIndex: 0,
        explanation: 'Combine typeof with ReturnType to extract the return type of a function value.'
      },
      {
        id: 3,
        question: 'What does ReturnType return for a non-function type?',
        options: [
          'never',
          'undefined',
          'any',
          'void'
        ],
        correctIndex: 0,
        explanation: 'When T is not a function type, ReturnType produces never.'
      }
    ],
    topics: [
      {
        id: 'return-type-basics',
        title: 'ReturnType Fundamentals',
        content: 'ReturnType<T> extracts the return type of a function type. If T is () => string, ReturnType<T> is string. This utility type is essential for creating types that depend on function implementations. When you have a function and want to type a variable with its return type, use ReturnType. It works with any function type: arrow functions, function expressions, class methods, and overloaded functions. For overloaded functions, ReturnType uses the last overload signature. The type is computed at compile time from the function signature. ReturnType ensures your types stay in sync with function implementations. If the function return type changes, the derived type updates automatically.'
      },
      {
        id: 'return-type-with-typeof',
        title: 'ReturnType with Typeof',
        content: 'The most common pattern combines ReturnType with typeof to extract return types from function values. function createUser() { return { name: \'Alice\', age: 30 }; } type User = ReturnType<typeof createUser>. This derives the return type without manually defining an interface. The typeof extracts the function type, and ReturnType extracts its return type. This pattern is useful for API response types, factory functions, and test helpers. It keeps type definitions close to their implementations. When the function changes its return value, the derived type updates automatically. This reduces duplication and prevents type mismatches between implementations and their type annotations.'
      },
      {
        id: 'return-type-patterns',
        title: 'ReturnType Advanced Patterns',
        content: 'ReturnType can extract types from async functions, which return Promise<T>. ReturnType<typeof asyncFn> gives Promise<ReturnType>, not the inner type. Use Awaited<ReturnType<typeof asyncFn>> to unwrap the Promise. For class methods, ReturnType<typeof Class.prototype.method> extracts the method return type. ReturnType with generic functions requires providing type arguments. Combined with conditional types, ReturnType can branch based on function return types. In Angular, ReturnType is used to type service methods in templates. For event handlers, ReturnType extracts the handler return type. These patterns create precise types that adapt to function signatures without manual annotation.'
      }
    ]
  },
  {
    id: 254,
    slug: 'ts-parameters-type',
    title: 'Parameters',
    description: 'Extract parameter types from function signatures.',
    level: 'intermediate',
    duration: '20 min',
    objectives: [
      'Use Parameters to extract all parameter types',
      'Extract individual parameter types with indexed access',
      'Apply Parameters for function type derivation'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does Parameters<T> return?',
        options: [
          'A tuple of all parameter types of function type T',
          'The return type of T',
          'The key types of T',
          'The this type of T'
        ],
        correctIndex: 0,
        explanation: 'Parameters extracts a tuple type containing all parameter types of the function.'
      },
      {
        id: 2,
        question: 'How do you get the first parameter type?',
        options: [
          'Parameters<typeof fn>[0]',
          'Parameters<typeof fn>.first',
          'FirstParam<typeof fn>',
          'typeof fn.params[0]'
        ],
        correctIndex: 0,
        explanation: 'Use tuple indexing on the Parameters result to get individual parameter types.'
      },
      {
        id: 3,
        question: 'What is Parameters used for?',
        options: [
          'Creating types that mirror function parameter signatures',
          'Extracting return types',
          'Creating new functions',
          'Validating function calls'
        ],
        correctIndex: 0,
        explanation: 'Parameters creates tuple types from function parameter lists for type derivation.'
      }
    ],
    topics: [
      {
        id: 'parameters-basics',
        title: 'Parameters Fundamentals',
        content: 'Parameters<T> extracts the parameter types of a function type as a tuple. Parameters<(a: string, b: number) => void> produces [a: string, b: number]. The tuple preserves parameter names and order. This is essential for creating wrapper functions, decorators, and test utilities that mirror function signatures. Parameters works with any function type including arrow functions, methods, and overloaded functions. For overloaded functions, it uses the last overload. The result is always a tuple, not an array, because each position has a specific type. Parameters with indexed access extracts individual parameter types: Parameters<T>[0] for the first parameter.'
      },
      {
        id: 'parameters-patterns',
        title: 'Parameters Usage Patterns',
        content: 'Parameters is used to create type-safe function wrappers. A logging decorator can use Parameters to type the original function parameters. Mock functions use Parameters to match the original function signature. In test utilities, Parameters creates mock parameter types. For event emitters, Parameters types the event handler parameters. Parameters combined with conditional types can filter parameters by type. The pattern of Parameters<typeof fn> extends func allows you to constrain a function to match another. In Angular, Parameters is used for dependency injection tokens. For API clients, Parameters types the request function parameters. This utility eliminates manual parameter type duplication.'
      },
      {
        id: 'parameters-advanced',
        title: 'Parameters Advanced Techniques',
        content: 'Parameters with constructor types extracts constructor parameter types: ConstructorParameters<typeof MyClass>. For async functions, Parameters extracts the declared parameter types directly. Parameters can be combined with spread types for variadic functions. In mapped types, Parameters can transform all methods of an interface. For generic functions, Parameters captures the generic constraints. When a function has rest parameters, Parameters captures the rest as a tuple. For overloaded functions, always the last overload is used, which may not be the intended one. In these cases, manual type extraction may be needed. Parameters is a powerful tool for building meta-programming utilities in TypeScript.'
      }
    ]
  },
  {
    id: 255,
    slug: 'ts-assertion-functions',
    title: 'Assertion Functions',
    description: 'Write functions that narrow types using assertions.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Write assertion functions with the asserts keyword',
      'Use assertion functions for type narrowing',
      'Understand the difference from type guards'
    ],
    quiz: [
      {
        id: 1,
        question: 'What does an assertion function return?',
        options: [
          'Nothing (void) or never, it asserts a condition about its parameter',
          'The narrowed type',
          'A boolean',
          'The original type'
        ],
        correctIndex: 0,
        explanation: 'Assertion functions return void or never and narrow the type of their parameter as a side effect.'
      },
      {
        id: 2,
        question: 'How do you declare an assertion function?',
        options: [
          'function assert(x: unknown): asserts x is string',
          'function assert(x: unknown): boolean',
          'function assert(x: unknown): string',
          'assert(x) is string'
        ],
        correctIndex: 0,
        explanation: 'The asserts keyword in the return type declares the function as an assertion function.'
      },
      {
        id: 3,
        question: 'What happens if an assertion function fails?',
        options: [
          'It should throw an error to narrow the type',
          'It returns false',
          'It returns undefined',
          'It logs a warning'
        ],
        correctIndex: 0,
        explanation: 'Assertion functions must throw on failure to ensure the narrowed type is correct after the call.'
      }
    ],
    topics: [
      {
        id: 'assertion-function-syntax',
        title: 'Assertion Function Syntax',
        content: 'Assertion functions use the asserts keyword in the return type. function isString(x: unknown): asserts x is string checks if x is a string and asserts it to the caller. After calling isString(value), TypeScript narrows value to string for the rest of the code. Assertion functions can return void or never. If the assertion fails, the function must throw an error to prevent execution from continuing with the wrong type. This is different from type guard functions that return boolean. Assertion functions modify the type of their parameter in the calling scope. They are useful for validation functions, null checks, and type narrowing in complex control flow.'
      },
      {
        id: 'assertion-vs-guards',
        title: 'Assertion Functions vs Type Guards',
        content: 'Type guard functions return boolean and narrow the type in the return value: function isUser(x: unknown): x is User. Assertion functions narrow the parameter type directly: function assertUser(x: unknown): asserts x is User. With type guards, you use the return value in a conditional: if (isUser(data)) { data.name }. With assertions, you call the function and it narrows the parameter: assertUser(data); data.name. Assertion functions are better for complex validation where throwing on failure is natural. Type guards are better for conditional logic where both branches need handling. Both achieve type narrowing but with different call patterns and error handling approaches.'
      },
      {
        id: 'assertion-patterns',
        title: 'Assertion Function Patterns',
        content: 'Common assertion patterns include null checks, type validation, and state assertions. function assertDefined<T>(x: T | null | undefined): asserts x is T throws if x is null. This simplifies null handling in function bodies. For complex validation, assertions that check object shapes narrow to specific types. Assertion functions work well with the non-null assertion operator for chained assertions. In test frameworks, assertions verify preconditions. For API data, assertions validate response shapes. Assertion functions can be generic: function assertInstanceOf<T>(x: unknown, ctor: new () => T): asserts x is T. These patterns reduce the need for type assertions and manual narrowing throughout your code.'
      }
    ]
  },
  {
    id: 256,
    slug: 'ts-function-overloads',
    title: 'Function Overloads',
    description: 'Define multiple function signatures for different parameter combinations.',
    level: 'advanced',
    duration: '30 min',
    objectives: [
      'Declare function overload signatures',
      'Implement overload signatures',
      'Choose overloads vs union types'
    ],
    quiz: [
      {
        id: 1,
        question: 'How do function overloads work in TypeScript?',
        options: [
          'Multiple signatures with a single implementation',
          'Multiple implementations for different types',
          'Functions with default parameters',
          'Generic functions with constraints'
        ],
        correctIndex: 0,
        explanation: 'Function overloads declare multiple call signatures but have one implementation that handles all cases.'
      },
      {
        id: 2,
        question: 'Where is the implementation placed in overloaded functions?',
        options: [
          'After all overload signatures',
          'Before the signatures',
          'Inside each signature',
          'In a separate file'
        ],
        correctIndex: 0,
        explanation: 'The implementation signature is the last one and is not visible to callers.'
      },
      {
        id: 3,
        question: 'When should you use function overloads?',
        options: [
          'When different parameter types produce different return types',
          'When you want default values',
          'When you want optional parameters',
          'When you need runtime performance'
        ],
        correctIndex: 0,
        explanation: 'Overloads are appropriate when parameter types determine the return type.'
      }
    ],
    topics: [
      {
        id: 'overload-syntax',
        title: 'Function Overload Syntax',
        content: 'Function overloads declare multiple call signatures before a single implementation. function parse(input: string): Config; function parse(input: Buffer): Config; function parse(input: string | Buffer): Config { ... }. The first two lines are overload signatures. The third is the implementation. Callers see only the overload signatures. The implementation signature must be compatible with all overloads. Overload signatures are checked in order; the first matching signature is used. If no overload matches, TypeScript reports an error. Overloads are useful when different parameter types require different return types. They provide more precise types than union types in some cases.'
      },
      {
        id: 'overload-implementation',
        title: 'Implementing Overloads',
        content: 'The implementation signature handles all overloaded cases. It typically accepts a union of all parameter types and uses type narrowing internally. The implementation must be compatible with every overload signature. This means it cannot have more restrictive parameters or less permissive return types. Inside the implementation, use typeof, instanceof, or switch statements to handle different cases. The implementation signature is not accessible from outside; callers only see the overloads. For complex overloads, the implementation may use type assertions to satisfy the return type. Keep the implementation simple and delegate complex logic to helper functions. Test each overload signature to ensure correct behavior.'
      },
      {
        id: 'overload-decisions',
        title: 'Overloads vs Union Types vs Generics',
        content: 'Function overloads are appropriate when parameter types determine the return type in ways generics cannot express. A function returning different object shapes based on string discriminants needs overloads. Union types work when the return type does not depend on the input variant. Generics work when the relationship between input and output types is consistent. Overloads provide the most precise types but add complexity. Consider whether a generic with conditional types can express the same relationship. For simple cases, optional parameters or union types are simpler. Overloads are common in library APIs where different call patterns produce different result types. Use them when type precision outweighs implementation simplicity.'
      }
    ]
  },
  {
    id: 257,
    slug: 'ts-abstract-classes',
    title: 'Abstract Classes',
    description: 'Define classes that cannot be instantiated directly.',
    level: 'intermediate',
    duration: '25 min',
    objectives: [
      'Declare abstract classes and abstract methods',
      'Extend abstract classes with concrete implementations',
      'Compare abstract classes with interfaces'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is an abstract class?',
        options: [
          'A class that cannot be instantiated directly',
          'A class with no methods',
          'A class marked as deprecated',
          'A class used only for testing'
        ],
        correctIndex: 0,
        explanation: 'Abstract classes serve as base classes that provide structure but cannot be instantiated.'
      },
      {
        id: 2,
        question: 'Can abstract classes have implementation?',
        options: [
          'Yes, they can have both abstract and concrete methods',
          'No, they can only have abstract methods',
          'Only with the static keyword',
          'Only in .d.ts files'
        ],
        correctIndex: 0,
        explanation: 'Abstract classes can have concrete methods with implementations that subclasses inherit.'
      },
      {
        id: 3,
        question: 'What is the difference between abstract class and interface?',
        options: [
          'Abstract classes can have implementations, interfaces cannot',
          'Interfaces are faster',
          'Abstract classes are not type-safe',
          'There is no difference'
        ],
        correctIndex: 0,
        explanation: 'Abstract classes can contain method implementations and state, while interfaces define only contracts.'
      }
    ],
    topics: [
      {
        id: 'abstract-class-basics',
        title: 'Abstract Class Fundamentals',
        content: 'Abstract classes use the abstract keyword and cannot be instantiated directly. abstract class Shape { abstract area(): number; describe() { return \'Area: \' + this.area(); } }. They can have both abstract methods without implementations and concrete methods with implementations. Abstract methods must be implemented by subclasses. Abstract classes provide a base for related classes to share code. They can have constructors, properties, and access modifiers. Unlike interfaces, abstract classes can maintain state. Abstract classes are useful when related classes share implementation, not just structure. They enforce a contract through abstract methods while providing shared behavior through concrete methods.'
      },
      {
        id: 'abstract-methods',
        title: 'Abstract Methods and Properties',
        content: 'Abstract methods have no implementation and must be overridden by subclasses. They are declared with the abstract keyword and end with a semicolon: abstract area(): number;. Abstract properties follow the same pattern: abstract readonly name: string;. Subclasses must implement all abstract members. If a subclass does not implement an abstract method, it must also be declared abstract. Abstract methods can have access modifiers: abstract protected method(): void;. This controls visibility in subclasses. Abstract methods enforce a contract at the class level. They differ from interface methods because they exist within a class hierarchy. Abstract methods are checked at compile time to ensure all subclasses provide implementations.'
      },
      {
        id: 'abstract-vs-interface',
        title: 'Abstract Classes vs Interfaces',
        content: 'Abstract classes and interfaces both define contracts, but with key differences. Interfaces define pure contracts with no implementation. Abstract classes can have method implementations, constructors, and state. Classes can extend only one abstract class but implement multiple interfaces. Interfaces are better for defining contracts that unrelated classes can implement. Abstract classes are better when related classes share code. Interfaces work well with TypeScript structural typing. Abstract classes use nominal typing for class identity. For dependency injection, interfaces are more flexible because they do not carry implementation. For template method patterns, abstract classes are appropriate. Choose based on whether you need shared implementation or just a contract.'
      }
    ]
  },
  {
    id: 258,
    slug: 'ts-mixin-patterns',
    title: 'Mixins',
    description: 'Compose behaviors from multiple sources using mixins.',
    level: 'advanced',
    duration: '30 min',
    objectives: [
      'Implement mixin functions in TypeScript',
      'Compose multiple mixins into a class',
      'Understand mixin type inference and constraints'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a mixin in TypeScript?',
        options: [
          'A function that takes a class and returns a new class with added behavior',
          'A type of interface',
          'A class with multiple constructors',
          'A utility for type checking'
        ],
        correctIndex: 0,
        explanation: 'A mixin is a function that accepts a base class and returns an extended class with new functionality.'
      },
      {
        id: 2,
        question: 'Why are mixins useful?',
        options: [
          'They allow composing behaviors from multiple sources without multiple inheritance',
          'They are faster than classes',
          'They replace interfaces',
          'They work only with React'
        ],
        correctIndex: 0,
        explanation: 'Mixins solve the problem of sharing behavior across unrelated class hierarchies.'
      },
      {
        id: 3,
        question: 'How do you apply a mixin to a class?',
        options: [
          'Pass the class to the mixin function',
          'Use the mixin keyword',
          'Extend the mixin class',
          'Import the mixin'
        ],
        correctIndex: 0,
        explanation: 'You call the mixin function with the base class as the argument to get a new class.'
      }
    ],
    topics: [
      {
        id: 'mixin-basics',
        title: 'Mixin Fundamentals',
        content: 'Mixins are functions that accept a base class and return a new class with additional behavior. They solve the problem of sharing behavior across unrelated class hierarchies. TypeScript does not support multiple inheritance, but mixins provide a similar capability. A mixin function takes a constructor type and returns an extended version. The returned class extends the input and adds new methods or properties. Mixins can be composed: multiple mixins can be chained together. Each mixin adds a specific behavior: logging, validation, serialization, or event handling. The mixin pattern is common in component frameworks where classes need flexible behavior composition.'
      },
      {
        id: 'mixin-implementation',
        title: 'Implementing Mixins',
        content: 'To implement a mixin, create a function that accepts a constructor and returns a class extending it. type Constructor<T = {}> = new (...args: any[]) => T. function Timestamped<TBase extends Constructor>(Base: TBase) { return class extends Base { createdAt = new Date(); }; }. The generic constraint ensures the mixin works with any class. Mixins can access and modify the base class through super. They can add properties, methods, and implement interfaces. When composing mixins, apply them in order: Timestamped(Activatable(MyClass)). Each layer adds its behavior. The final class has all behaviors from all mixins. This pattern is used in LitElement, MobX, and other frameworks.'
      },
      {
        id: 'mixin-advanced',
        title: 'Advanced Mixin Patterns',
        content: 'Advanced mixin patterns handle complex type inference. Mixins can implement interfaces by adding properties that satisfy the interface. They can use conditional types to adapt behavior based on the base class. Mixins can be combined with decorators for even more flexibility. For Angular, mixins provide behavior composition without inheritance. The applyMixins utility function copies prototype properties for runtime compatibility. Type-safe mixins use intersection types to combine base and mixin types. When mixins conflict, the last applied mixin wins. Document mixin requirements clearly so users know what the base class must provide. Mixins are powerful but can make code harder to follow. Use them when composition is clearly better than inheritance.'
      }
    ]
  },
  {
    id: 259,
    slug: 'ts-brand-types',
    title: 'Brand Types',
    description: 'Create nominal-like types using branded type patterns.',
    level: 'advanced',
    duration: '25 min',
    objectives: [
      'Create branded types with phantom properties',
      'Use branded types to prevent type confusion',
      'Build reusable branded type utilities'
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a branded type?',
        options: [
          'A type with a phantom property that makes it structurally distinct',
          'A type from a third-party library',
          'A type with runtime branding',
          'A deprecated type pattern'
        ],
        correctIndex: 0,
        explanation: 'Branded types add a unique symbol property that exists only at compile time.'
      },
      {
        id: 2,
        question: 'Why use branded types instead of plain strings?',
        options: [
          'To prevent accidentally passing one string type where another is expected',
          'For better runtime performance',
          'To enable JSON serialization',
          'To make types visible in error messages'
        ],
        correctIndex: 0,
        explanation: 'Branded types prevent confusing UserId with OrderId even though both are strings.'
      },
      {
        id: 3,
        question: 'How do you create a branded type?',
        options: [
          'Type intersection with a readonly unique symbol property',
          'Using the brand keyword',
          'Using the nominal keyword',
          'Extending a Brand class'
        ],
        correctIndex: 0,
        explanation: 'Branded types use intersection: string & { readonly __brand: unique symbol }.'
      }
    ],
    topics: [
      {
        id: 'brand-type-basics',
        title: 'Branded Type Fundamentals',
        content: 'Branded types add a phantom property that makes structurally identical types distinct. type UserId = string & { readonly __brand: unique symbol }. The __brand property does not exist at runtime and is erased by the compiler. This prevents passing a UserId where an OrderId is expected: type OrderId = string & { readonly __brand: unique symbol }. Even though both are strings at runtime, TypeScript treats them as different types. You create branded values using type assertions: const userId = id as UserId. This assertion is the only place you need to be careful. After branding, the type safety flows through your code. Branded types are essential for preventing ID confusion bugs in large codebases.'
      },
      {
        id: 'brand-type-creation',
        title: 'Creating Branded Types',
        content: 'The standard pattern uses a readonly unique symbol property: type Brand<K, T> = T & { readonly __brand: K }. Usage: type UserId = Brand<\'UserId\', string>. This creates a reusable branded type constructor. The unique symbol ensures each brand is distinct. You can create branded types for any base type: numbers for amounts, strings for emails, objects for validated data. Libraries like ts-brand provide utilities for creating and manipulating branded types. The opaque type pattern is similar but uses different syntax. Both achieve the same goal of nominal typing in a structural type system. Choose the pattern that best fits your team\'s conventions.'
      },
      {
        id: 'brand-type-patterns',
        title: 'Branded Type Usage Patterns',
        content: 'Use branded types for IDs, handles, tokens, and validated data. A branded Email type prevents passing arbitrary strings as email addresses. A branded Amount type with currency prevents mixing currencies. For API tokens, branded types prevent using a user token where an API token is expected. Branded types work well with type guards for validation: function parseEmail(input: string): Email | null. Combine branded types with discriminated unions for state machines where each state has branded identifiers. Branded types are zero-cost at runtime; they add no overhead. They are erased during compilation. The investment in branding upfront prevents entire classes of bugs that are difficult to detect with tests alone.'
      }
    ]
  }
];

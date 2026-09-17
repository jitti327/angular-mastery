import { Lesson } from '../models/lesson.model';

export const REACT_LESSONS: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // REACT BEGINNER (401-405)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 401, slug: 'react-introduction', title: 'Introduction to React',
    description: 'Learn what React is, how the Virtual DOM works, and write your first JSX.',
    level: 'beginner', duration: '30 min',
    objectives: ['Understand what React is and why it is used', 'Explain the Virtual DOM and its performance benefits', 'Write basic JSX expressions', 'Set up a simple React project'],
    topics: [
      { id: 'what-is-react', title: 'What is React?', content: `**What is React?**

React is a JavaScript library for building user interfaces, maintained by Meta. It lets you compose complex UIs from small, isolated pieces called **components**.

**Why React Matters:**
- Declarative approach makes UI code predictable and easier to debug
- Component-based architecture promotes reusability
- Massive ecosystem and community support
- Skills transfer to React Native for mobile development

**Core Concepts:**
1. **Declarative Rendering** — Describe *what* the UI should look like, not *how* to update it
2. **Component Architecture** — Encapsulate logic and rendering into reusable pieces
3. **Unidirectional Data Flow** — Data flows down through props, events bubble up
4. **Learn Once, Write Anywhere** — React DOM for web, React Native for mobile` },
      { id: 'virtual-dom', title: 'The Virtual DOM', content: `**How the Virtual DOM Works**

The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to minimize expensive direct DOM manipulations.

**The Reconciliation Process:**
1. State changes trigger a new Virtual DOM tree
2. React diffs the new tree against the previous one (reconciliation)
3. Only the minimal set of real DOM mutations are batched and applied

**Code Example:**
\`\`\`jsx
// React compares the new virtual DOM with the old one
// and only updates the changed text node in the real DOM
function Counter({ count }) {
  return <h1>Count: {count}</h1>;
}

// When count changes, React:
// 1. Creates new virtual DOM node
// 2. Diffs with previous node
// 3. Updates only the text content
\`\`\`

**Key Benefits:**
- Batches multiple updates into a single re-render
- Cross-browser compatibility (Virtual DOM is just JS)
- Enables efficient component updates via \`React.memo\` and \`shouldComponentUpdate\`` },
      { id: 'jsx', title: 'JSX Syntax', content: `**What is JSX?**

JSX is a syntax extension that lets you write HTML-like code inside JavaScript. It compiles to \`React.createElement()\` calls.

**Rules of JSX:**
1. Must return a single root element (use \`<></>\` fragments to group)
2. All tags must be closed
3. Use \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`
4. JavaScript expressions go inside \`{}\`

**Code Example:**
\`\`\`jsx
function App() {
  const name = 'React';
  const items = ['A', 'B', 'C'];

  return (
    <div className="app">
      <h1>Hello, {name}!</h1>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{2 + 2}</p>
    </div>
  );
}
\`\`\`

**Common Mistakes:**
\`\`\`jsx
// Wrong: JSX expects expressions, not statements
{if (show) { return <p>Visible</p>; }}

// Correct: Use ternary or logical AND
{show ? <p>Visible</p> : null}
{show && <p>Visible</p>}
\`\`\`

**Best Practices:**
- Keep JSX readable by extracting complex expressions
- Use fragments \`<>\` to avoid unnecessary wrapper divs
- Format multi-line JSX with proper indentation` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What does React use to minimize direct DOM manipulation?',
        options: ['Shadow DOM', 'Virtual DOM', 'Real DOM', 'Server DOM'],
        correctIndex: 1,
        explanation: 'React uses the Virtual DOM — a lightweight JavaScript copy of the real DOM — to diff changes and apply minimal updates.'
      },
      {
        id: 2,
        question: 'What does JSX compile to?',
        options: ['HTML strings', 'React.createElement() calls', 'DOM methods', 'CSS selectors'],
        correctIndex: 1,
        explanation: 'JSX compiles to React.createElement() calls, which return React elements — plain JavaScript objects describing the UI.'
      },
      {
        id: 3,
        question: 'Which attribute replaces `class` in JSX?',
        options: ['class', 'className', 'cssClass', 'classList'],
        correctIndex: 1,
        explanation: 'JSX uses className instead of class because class is a reserved word in JavaScript.'
      }
    ]
  },
  {
    id: 402, slug: 'react-components-props', title: 'Components & Props',
    description: 'Build reusable functional components and pass data with props.',
    level: 'beginner', duration: '35 min',
    objectives: ['Create functional components', 'Pass and receive props', 'Use the children prop', 'Destructure props effectively'],
    topics: [
      { id: 'functional-components', title: 'Functional Components', content: `**What are Functional Components?**

Functional components are JavaScript functions that accept props and return React elements. They are the modern, preferred way to write React components.

**Code Example:**
\`\`\`jsx
// Simple functional component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function variant
const Welcome = () => <h1>Hello, World!</h1>;

// With props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

// Usage
<Greeting name="Alice" age={30} />
\`\`\`

**Best Practices:**
- Name components with PascalCase (e.g., \`UserProfile\`)
- Keep components small and focused on a single responsibility
- Extract reusable pieces into their own components` },
      { id: 'props', title: 'Props in Depth', content: `**Understanding Props**

Props (short for "properties") are read-only inputs passed from parent to child components. They enable data flow in one direction.

**Props Patterns:**
\`\`\`jsx
// Destructuring in parameters
function Card({ title, description, variant = 'default' }) {
  return (
    <div className={\`card card--\${variant}\`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// Passing objects
const article = { title: 'React 101', description: 'An intro' };
<Card {...article} variant="featured" />

// Children prop
function Layout({ children, sidebar }) {
  return (
    <div className="layout">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

// Usage
<Layout sidebar={<Nav />}>
  <Article />
</Layout>
\`\`\`

**Key Rules:**
- Props are **immutable** — never modify them inside a child component
- Use default parameter values for optional props
- The \`children\` prop captures nested JSX content` },
      { id: 'component-composition', title: 'Component Composition', content: `**Composing Components**

React encourages building complex UIs by composing small, focused components together.

**Code Example:**
\`\`\`jsx
function UserCard({ user }) {
  return (
    <Card>
      <Avatar src={user.avatar} />
      <CardBody>
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </CardBody>
      <CardFooter>
        <FollowButton userId={user.id} />
      </CardFooter>
    </Card>
  );
}
\`\`\`

**Composition Patterns:**
- **Layout Components** — Handle page structure (\`<Layout>\`, \`<Sidebar>\`)
- **Container Components** — Manage data fetching and state
- **Presentational Components** — Focus purely on rendering UI
- **Compound Components** — Share implicit state (\`<Tabs>\`, \`<Tabs.Panel>\`)

**Best Practices:**
- Favor composition over inheritance
- Pass components as props for maximum flexibility
- Keep the component tree shallow when possible` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What are props in React?',
        options: ['Mutable state', 'Read-only inputs from parent to child', 'Global variables', 'CSS properties'],
        correctIndex: 1,
        explanation: 'Props are read-only inputs passed from parent components to child components, enabling unidirectional data flow.'
      },
      {
        id: 2,
        question: 'How do you access nested content passed between a component\'s opening and closing tags?',
        options: ['props.slot', 'props.children', 'props.content', 'props.inner'],
        correctIndex: 1,
        explanation: 'The special `children` prop captures any JSX content placed between a component\'s opening and closing tags.'
      },
      {
        id: 3,
        question: 'What is the recommended naming convention for React components?',
        options: ['camelCase', 'PascalCase', 'snake_case', 'kebab-case'],
        correctIndex: 1,
        explanation: 'React components should be named with PascalCase (e.g., UserProfile) to distinguish them from regular functions and HTML elements.'
      }
    ]
  },
  {
    id: 403, slug: 'react-state-management', title: 'State Management with useState',
    description: 'Manage component state with useState and understand immutability.',
    level: 'beginner', duration: '35 min',
    objectives: ['Use the useState hook correctly', 'Understand state update batching', 'Apply immutable update patterns', 'Handle complex state with objects and arrays'],
    topics: [
      { id: 'usestate', title: 'useState Hook', content: `**The useState Hook**

useState lets you add state to functional components. It returns a state value and a setter function.

**Code Example:**
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (functional)
      </button>
    </div>
  );
}
\`\`\`

**Key Rules:**
- State updates are **asynchronous** — reading state after \`setState\` shows the old value
- Use the **functional updater** (\`prev => prev + 1\`) when the new state depends on the previous one
- React batches multiple state updates for performance
- State should be treated as immutable` },
      { id: 'immutability', title: 'Immutability Patterns', content: `**Why Immutability Matters**

React determines re-renders by comparing object references. Mutating state directly won't trigger a re-render.

**Object Updates:**
\`\`\`jsx
const [user, setUser] = useState({ name: 'Alice', age: 30 });

// WRONG: Mutates existing object — no re-render
user.name = 'Bob';
setUser(user);

// CORRECT: Creates new object reference
setUser({ ...user, name: 'Bob' });

// CORRECT: Functional updater
setUser(prev => ({ ...prev, name: 'Bob' }));
\`\`\`

**Array Updates:**
\`\`\`jsx
const [items, setItems] = useState([1, 2, 3]);

// Add item
setItems([...items, 4]);

// Remove item
setItems(items.filter(item => item !== 2));

// Update item
setItems(items.map(item => item === 2 ? 20 : item));
\`\`\`

**Golden Rules:**
- Never mutate state directly — always create new references
- Use the spread operator (\`...\`) for shallow copies
- Use functional updaters for state that depends on the previous value` },
      { id: 'complex-state', title: 'Managing Complex State', content: `**Handling Multiple State Values**

There are two approaches for managing related state: multiple useState calls or useReducer.

**Multiple useState:**
\`\`\`jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
}
\`\`\`

**useReducer for Complex Logic:**
\`\`\`jsx
import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({
          type: 'setStep',
          payload: Number(e.target.value)
        })}
      />
    </div>
  );
}
\`\`\`

**When to Use useReducer:**
- Multiple state values that change together
- Complex state transition logic
- State logic that needs to be extracted and tested` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What does useState return?',
        options: ['A single value', 'A value and a setter function', 'An object with value and update', 'A promise'],
        correctIndex: 1,
        explanation: 'useState returns an array with two elements: the current state value and a function to update it.'
      },
      {
        id: 2,
        question: 'Why should you never mutate state directly in React?',
        options: ['It throws an error', 'It won\'t trigger a re-render', 'It causes memory leaks', 'It creates a new state'],
        correctIndex: 1,
        explanation: 'React uses object references to determine re-renders. Mutating the existing object doesn\'t change its reference, so React won\'t detect the change.'
      },
      {
        id: 3,
        question: 'When should you use the functional updater form of setState?',
        options: ['Never', 'When new state depends on previous state', 'When updating objects', 'When using useReducer'],
        correctIndex: 1,
        explanation: 'Functional updaters are essential when the new state depends on the previous state, as they guarantee you\'re working with the latest value.'
      }
    ]
  },
  {
    id: 404, slug: 'react-event-handling', title: 'Event Handling in React',
    description: 'Handle user interactions with synthetic events and event delegation.',
    level: 'beginner', duration: '30 min',
    objectives: ['Attach event handlers to elements', 'Understand React synthetic events', 'Handle events with arguments', 'Use event.preventDefault and event.stopPropagation'],
    topics: [
      { id: 'synthetic-events', title: 'Synthetic Events', content: `**React's Event System**

React wraps native DOM events in **SyntheticEvents** for cross-browser consistency and performance.

**Code Example:**
\`\`\`jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!', e.target);
    console.log('Event type:', e.type); // "click"
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
\`\`\`

**SyntheticEvent Features:**
- Uniform API across all browsers
- Uses **event delegation** — one listener at the root, not on every element
- Event handlers receive a SyntheticEvent object (not a native Event)
- Supports the same methods: \`preventDefault()\`, \`stopPropagation()\`, \`nativeEvent\`

**Common Event Handlers:**
- \`onClick\`, \`onDoubleClick\` — mouse clicks
- \`onChange\`, \`onInput\` — input changes
- \`onSubmit\` — form submissions
- \`onKeyDown\`, \`onKeyUp\` — keyboard events
- \`onFocus\`, \`onBlur\` — focus events
- \`onMouseEnter\`, \`onMouseLeave\` — hover events` },
      { id: 'passing-arguments', title: 'Passing Arguments to Handlers', content: `**Handling Events with Arguments**

Use arrow functions to pass extra arguments to event handlers.

**Code Example:**
\`\`\`jsx
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Important:** Do NOT call the function immediately:
\`\`\`jsx
// WRONG: Fires on every render
<button onClick={handleClick(id)}>Delete</button>

// CORRECT: Fires only on click
<button onClick={() => handleClick(id)}>Delete</button>
\`\`\`

**Accessing the Event Object with Arguments:**
\`\`\`jsx
<button onClick={(e) => handleClick(e, id)}>
  Delete
</button>
\`\`\`` },
      { id: 'event-pooling', title: 'Event Pooling & Performance', content: `**Understanding Event Pooling**

In React 16 and earlier, SyntheticEvents were pooled — reused for performance. React 17+ no longer pools events, but it's good to understand.

**Event Delegation in React:**
React attaches a single event listener at the root (\`#root\`) and delegates all events through it. This is more efficient than attaching listeners to every DOM element.

**Code Example:**
\`\`\`jsx
function SearchInput({ onSearch }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}

function SearchResults({ results }) {
  return (
    <ul>
      {results.map(r => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

**Best Practices:**
- Extract event handlers as named functions for readability
- Avoid creating new functions inside render for lists — consider \`useCallback\`
- Use \`e.preventDefault()\` for forms to prevent page reload
- Use \`e.stopPropagation()\` to prevent event bubbling when needed` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What are React\'s event handling objects called?',
        options: ['Native Events', 'Synthetic Events', 'DOM Events', 'Browser Events'],
        correctIndex: 1,
        explanation: 'React wraps native DOM events in SyntheticEvents, providing a consistent cross-browser API.'
      },
      {
        id: 2,
        question: 'How do you pass an argument to an onClick handler?',
        options: ['onClick={handleClick(id)}', 'onClick={() => handleClick(id)}', 'onClick={handleClick, id}', 'onClick={handleClick.bind(id)}'],
        correctIndex: 1,
        explanation: 'Use an arrow function to create a callback that calls your handler with the desired argument when clicked.'
      },
      {
        id: 3,
        question: 'What does `e.preventDefault()` do in a form submit handler?',
        options: ['Prevents the form from rendering', 'Prevents the default browser action (page reload)', 'Prevents state updates', 'Removes the form from DOM'],
        correctIndex: 1,
        explanation: 'preventDefault() stops the browser\'s default behavior, such as a page reload when submitting a form.'
      }
    ]
  },
  {
    id: 405, slug: 'react-conditional-rendering', title: 'Conditional Rendering',
    description: 'Display different UI based on conditions using ternary operators, &&, and early returns.',
    level: 'beginner', duration: '25 min',
    objectives: ['Use ternary operators for conditional rendering', 'Apply logical AND (&&) for simple conditions', 'Use early returns for guard clauses', 'Combine multiple conditions cleanly'],
    topics: [
      { id: 'ternary', title: 'Ternary Operator', content: `**Conditional Rendering with Ternary**

The ternary operator is ideal for choosing between two elements.

**Code Example:**
\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );
}

function UserBadge({ user }) {
  return (
    <span className={user.isPro ? 'badge-pro' : 'badge-free'}>
      {user.isPro ? 'Pro User' : 'Free User'}
    </span>
  );
}
\`\`\`

**Best Practices:**
- Keep both branches concise for readability
- Extract complex conditions into variables
- Use parentheses around each branch for clarity` },
      { id: 'logical-and', title: 'Logical AND (&&) Rendering', content: `**Short-Circuit Evaluation with &&**

Use \`&&\` when you want to render something or nothing at all.

**Code Example:**
\`\`\`jsx
function NotificationBadge({ count }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

function AdminPanel({ user }) {
  return (
    <div>
      <h1>Settings</h1>
      {user.isAdmin && <AdminControls />}
      {user.isModerator && <ModerationPanel />}
    </div>
  );
}
\`\`\`

**Watch Out:**
\`\`\`jsx
// WRONG: Renders "0" when count is 0
{count && <span>{count}</span>}

// CORRECT: Explicit boolean check
{count > 0 && <span>{count}</span>}
\`\`\`

Remember: \`0 && anything\` evaluates to \`0\`, which React renders as the text "0".` },
      { id: 'early-return', title: 'Early Returns & Guard Clauses', content: `**Early Returns for Complex Conditions**

For complex conditional logic, return early to avoid deeply nested JSX.

**Code Example:**
\`\`\`jsx
function UserProfile({ user, isLoading, error }) {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Multiple conditions with extracted helper
function SubscriptionBadge({ plan }) {
  const getBadge = () => {
    switch (plan) {
      case 'enterprise': return <EnterpriseBadge />;
      case 'pro': return <ProBadge />;
      case 'free': return <FreeBadge />;
      default: return null;
    }
  };

  return <div>{getBadge()}</div>;
}
\`\`\`

**When to Use Each Approach:**
- **&&** — Show or hide a single element
- **Ternary** — Choose between two elements
- **Early return** — Guard against multiple edge cases
- **Variable/function** — Complex logic that doesn't belong in JSX` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What will `{count > 0 && <Badge />}` render when count is 0?',
        options: ['false', 'null (nothing)', '0', '<Badge />'],
        correctIndex: 1,
        explanation: 'When count > 0 is false, `false && <Badge />` short-circuits and evaluates to false, which React renders as nothing.'
      },
      {
        id: 2,
        question: 'What will `{count && <Badge />}` render when count is 0?',
        options: ['null', 'false', '0', 'Nothing — it renders nothing'],
        correctIndex: 2,
        explanation: '0 && <Badge /> evaluates to 0, and React renders the number 0 as text. Use count > 0 to avoid this.'
      },
      {
        id: 3,
        question: 'Which approach is best for choosing between two elements based on a condition?',
        options: ['&& operator', 'Ternary operator', 'Early return', 'Switch statement'],
        correctIndex: 1,
        explanation: 'The ternary operator (condition ? A : B) is designed for choosing between two elements in JSX.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // REACT INTERMEDIATE (406-412)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 406, slug: 'react-hooks-deep-dive', title: 'Hooks Deep Dive',
    description: 'Master useEffect, useRef, useMemo, and useCallback for advanced component behavior.',
    level: 'intermediate', duration: '45 min',
    objectives: ['Use useEffect for side effects with proper cleanup', 'Access DOM elements with useRef', 'Memoize expensive computations with useMemo', 'Stabilize function references with useCallback'],
    topics: [
      { id: 'useeffect', title: 'useEffect & Side Effects', content: `**The useEffect Hook**

useEffect lets you perform side effects: data fetching, subscriptions, DOM manipulation, and timers.

**Code Example:**
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      const res = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    }

    fetchUser();

    // Cleanup function — runs on unmount or before re-run
    return () => { cancelled = true; };
  }, [userId]); // Re-runs when userId changes

  if (loading) return <Spinner />;
  return <h1>{user.name}</h1>;
}
\`\`\`

**Dependency Array Rules:**
- **No array** → runs after every render
- **Empty array \`[]\`** → runs once on mount
- **\`[dep1, dep2]\`** → runs when any dependency changes

**Cleanup Functions:**
- Cancel subscriptions, abort fetches, clear timers
- Run before the effect re-runs or on component unmount
- Prevent state updates on unmounted components` },
      { id: 'useRef', title: 'useRef for DOM & Mutable Values', content: `**The useRef Hook**

useRef creates a mutable reference that persists across renders without causing re-renders.

**Code Example:**
\`\`\`jsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <input ref={inputRef} placeholder="Auto-focused" />
      <p>Rendered {renderCount.current} times</p>
    </div>
  );
}
\`\`\`

**Common Use Cases:**
1. **DOM access** — Focus, scroll, measure elements
2. **Previous value** — Store the previous prop or state
3. **Intervals/timers** — Hold the interval ID for cleanup
4. **Mutable values** — Any value that shouldn't trigger re-renders

**useRef vs useState:**
- \`useRef\` → mutable, no re-render on change
- \`useState\` → immutable pattern, triggers re-render on change` },
      { id: 'usememo', title: 'useMemo for Expensive Computations', content: `**The useMemo Hook**

useMemo memoizes the result of an expensive computation, recomputing only when dependencies change.

**Code Example:**
\`\`\`jsx
import { useState, useMemo } from 'react';

function FilteredList({ items, query }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]); // Only recomputes when items or query change

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

**When to Use useMemo:**
- Expensive computations (sorting, filtering large lists)
- Creating objects/arrays passed as props (to prevent child re-renders)
- Derived state that's costly to compute

**When NOT to Use:**
- Simple calculations — overhead isn't worth it
- Values that change every render — memoization adds no benefit
- Premature optimization — profile first` },
      { id: 'usecallback', title: 'useCallback for Stable References', content: `**The useCallback Hook**

useCallback returns a memoized version of a callback function, only recreating it when dependencies change.

**Code Example:**
\`\`\`jsx
import { useState, useCallback, memo } from 'react';

const TodoItem = memo(function TodoItem({ todo, onDelete }) {
  console.log('Render:', todo.text);
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Stable reference — won't cause TodoItem re-renders
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // No dependencies — function never changes

  const handleAdd = useCallback(() => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
    setText('');
  }, [text]);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}
\`\`\`

**useCallback + React.memo:**
- \`useCallback\` stabilizes the function reference
- \`React.memo\` skips re-renders when props haven't changed
- Together, they prevent unnecessary child re-renders` },
    ],
    quiz: [
      {
        id: 1,
        question: 'When does the useEffect cleanup function run?',
        options: ['After every render', 'Only on unmount', 'Before the effect re-runs and on unmount', 'Never'],
        correctIndex: 2,
        explanation: 'The cleanup function runs before the effect re-executes (when dependencies change) and when the component unmounts.'
      },
      {
        id: 2,
        question: 'What is the key difference between useRef and useState?',
        options: ['useRef is faster', 'useRef doesn\'t trigger re-renders, useState does', 'useRef only works with DOM', 'There is no difference'],
        correctIndex: 1,
        explanation: 'useRef creates a mutable reference that persists across renders without triggering re-renders, while useState triggers a re-render when the value changes.'
      },
      {
        id: 3,
        question: 'When should you use useCallback?',
        options: ['For every function', 'When passing callbacks to memoized children', 'For expensive computations', 'For DOM manipulation'],
        correctIndex: 1,
        explanation: 'useCallback is most useful when passing callbacks to memoized child components to prevent unnecessary re-renders.'
      }
    ]
  },
  {
    id: 407, slug: 'react-custom-hooks', title: 'Custom Hooks',
    description: 'Extract reusable logic into custom hooks and follow the rules of hooks.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Create custom hooks to extract reusable logic', 'Follow the rules of hooks', 'Build practical custom hooks (useFetch, useDebounce)', 'Share stateful logic between components'],
    topics: [
      { id: 'creating-hooks', title: 'Creating Custom Hooks', content: `**What are Custom Hooks?**

Custom hooks are functions that start with \`use\` and can call other hooks. They let you extract component logic into reusable functions.

**Code Example:**
\`\`\`jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage in a component
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
\`\`\`

**Rules of Hooks:**
1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions
2. Only call hooks from **React functions** — components or other custom hooks
3. Hook names must start with **use**` },
      { id: 'practical-hooks', title: 'Practical Custom Hooks', content: `**useDebounce Hook**
\`\`\`jsx
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
\`\`\`

**useLocalStorage Hook**
\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

**useToggle Hook**
\`\`\`jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
\`\`\`` },
      { id: 'rules-of-hooks', title: 'Rules of Hooks Explained', content: `**Why Rules of Hooks Exist**

React relies on the **call order** of hooks to match state between renders. Violating the rules breaks this mechanism.

**The Rules:**
1. **Only call at the top level** — never inside if/for/early return
2. **Only from React functions** — components or custom hooks

**Code Example:**
\`\`\`jsx
// WRONG: Conditional hook call
function Component({ showName }) {
  const [name, setName] = useState('');
  if (showName) {
    const [alias, setAlias] = useState(''); // Breaks rules!
  }
}

// CORRECT: Always call hooks, conditionally use values
function Component({ showName }) {
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  return showName ? <p>{alias}</p> : <p>{name}</p>;
}
\`\`\`

**Enforcement:**
- ESLint plugin \`eslint-plugin-react-hooks\` catches violations at build time
- React throws a clear error if hooks are called conditionally at runtime
- The lint rule \`rules-of-hooks\` should be enabled in every React project` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the naming convention for custom hooks?',
        options: ['Any name', 'Must start with "use"', 'Must start with "hook"', 'Must end with "Hook"'],
        correctIndex: 1,
        explanation: 'Custom hooks must start with "use" so React\'s linting rules can check for hook violations.'
      },
      {
        id: 2,
        question: 'Where can you call hooks?',
        options: ['Anywhere in your code', 'Inside loops and conditions', 'Only at the top level of React functions', 'Only in class components'],
        correctIndex: 2,
        explanation: 'Hooks must be called at the top level of components or other custom hooks — never inside loops, conditions, or nested functions.'
      },
      {
        id: 3,
        question: 'What does a custom hook return?',
        options: ['A React element', 'JSX', 'Values and functions needed by the consumer', 'Nothing — it modifies state directly'],
        correctIndex: 2,
        explanation: 'Custom hooks return values and functions that the consuming component needs, encapsulating reusable stateful logic.'
      }
    ]
  },
  {
    id: 408, slug: 'react-router', title: 'React Router',
    description: 'Implement client-side routing with params, navigation, and nested routes.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Set up React Router in an application', 'Use route parameters and query strings', 'Implement nested routes with Outlet', 'Handle programmatic navigation'],
    topics: [
      { id: 'setup', title: 'Setting Up React Router', content: `**React Router v6+**

React Router enables client-side routing in single-page applications.

**Code Example:**
\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

**Key Components:**
- \`BrowserRouter\` — Wraps the app, uses HTML5 history API
- \`Routes\` — Container for \`Route\` elements (renders the first match)
- \`Route\` — Maps a URL path to an element
- \`Link\` — Declarative navigation (renders an \`<a>\` tag)` },
      { id: 'params', title: 'Route Parameters & Navigation', content: `**Dynamic Route Parameters**
\`\`\`jsx
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1>User {id}</h1>
      <p>Tab: {searchParams.get('tab')}</p>
      <button onClick={() => navigate('/')}>Go Home</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
\`\`\`

**Navigation Patterns:**
- \`<Link to="/users/42">View User</Link>\` — declarative
- \`navigate('/users/42')\` — programmatic
- \`navigate(-1)\` — go back in history
- \`navigate('/login', { replace: true })\` — replace current entry` },
      { id: 'nested-routes', title: 'Nested Routes & Layout', content: `**Nested Routes with Outlet**

Nested routes let you share layouts across multiple pages.

**Code Example:**
\`\`\`jsx
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
      <aside>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </aside>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
\`\`\`

**Benefits:**
- Shared layouts without prop drilling
- URL structure mirrors component hierarchy
- Child routes can access parent context
- Only the child portion re-renders on navigation` },
    ],
    quiz: [
      {
        id: 1,
        question: 'How do you access route parameters in a component?',
        options: ['props.params', 'useParams()', 'useRoute()', 'route.params'],
        correctIndex: 1,
        explanation: 'The useParams() hook returns an object containing dynamic URL parameters defined in the route path.'
      },
      {
        id: 2,
        question: 'What component renders child routes in React Router v6?',
        options: ['<ChildRoutes />', '<Outlet />', '<NestedRoutes />', '<RouterView />'],
        correctIndex: 1,
        explanation: 'The <Outlet /> component is used in parent route elements to render their child route elements.'
      },
      {
        id: 3,
        question: 'How do you perform programmatic navigation?',
        options: ['window.location', 'useNavigate()', 'useRedirect()', 'navigate.path()'],
        correctIndex: 1,
        explanation: 'The useNavigate() hook returns a function you can call to navigate programmatically, e.g., navigate("/home").'
      }
    ]
  },
  {
    id: 409, slug: 'react-forms', title: 'Forms in React',
    description: 'Build controlled forms with validation and submission handling.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Create controlled form inputs', 'Handle form submission properly', 'Implement client-side validation', 'Build complex multi-field forms'],
    topics: [
      { id: 'controlled-components', title: 'Controlled Components', content: `**Controlled Form Inputs**

In React, form inputs are controlled by setting their value to state and updating state on change.

**Code Example:**
\`\`\`jsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}
\`\`\`

**Benefits of Controlled Components:**
- Single source of truth for form data
- Instant validation and formatting
- Easy to programmatically control inputs` },
      { id: 'validation', title: 'Form Validation', content: `**Client-Side Validation Patterns**
\`\`\`jsx
import { useState } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (formData.age && (isNaN(formData.age) || formData.age < 18))
      newErrors.age = 'Must be 18 or older';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={formData.name}
          onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <input name="email" value={formData.email}
          onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
\`\`\`

**Validation Strategies:**
- Validate on submit for better UX
- Show errors after the user first interacts (on blur)
- Use HTML5 validation attributes as a first line of defense
- Consider libraries like Formik or React Hook Form for complex forms` },
      { id: 'form-libraries', title: 'Form Libraries Overview', content: `**React Hook Form**

React Hook Form is the recommended form library for React — performant, minimal re-renders.

**Code Example:**
\`\`\`jsx
import { useForm } from 'react-hook-form';

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Name is required' })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email'
          }
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**When to Use Libraries:**
- Complex forms with many fields
- Server-side validation integration
- Dynamic form fields
- Multi-step forms/wizards` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What makes a form input "controlled" in React?',
        options: ['It uses the DOM directly', 'Its value is set by React state', 'It has no event handlers', 'It uses refs'],
        correctIndex: 1,
        explanation: 'A controlled input has its value set from React state and is updated via onChange, making React the single source of truth.'
      },
      {
        id: 2,
        question: 'Why must you call e.preventDefault() in a form onSubmit handler?',
        options: ['To prevent the form from rendering', 'To prevent the default browser page reload', 'To stop form validation', 'To prevent state updates'],
        correctIndex: 1,
        explanation: 'By default, submitting a form causes a full page reload. preventDefault() stops this so React can handle the submission.'
      },
      {
        id: 3,
        question: 'What is the recommended form library for React?',
        options: ['Formik', 'React Hook Form', 'Both are equally recommended', 'Angular Forms'],
        correctIndex: 1,
        explanation: 'React Hook Form is the most recommended form library — it\'s performant with minimal re-renders and great DX.'
      }
    ]
  },
  {
    id: 410, slug: 'react-context-api', title: 'Context API',
    description: 'Share state across the component tree with useContext and the Provider pattern.',
    level: 'intermediate', duration: '35 min',
    objectives: ['Create and provide context values', 'Consume context with useContext', 'Avoid common Context pitfalls', 'Know when to use Context vs other solutions'],
    topics: [
      { id: 'creating-context', title: 'Creating & Providing Context', content: `**The Context API**

Context provides a way to pass data through the component tree without prop drilling.

**Code Example:**
\`\`\`jsx
import { createContext, useState, useContext } from 'react';

// 1. Create context with a default value
const ThemeContext = createContext('light');

// 2. Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Wrap the app
function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
\`\`\`

**Key Points:**
- Create context with \`createContext(defaultValue)\`
- Provide values with \`Context.Provider value={...}\`
- The provider re-renders all consumers when the value changes` },
      { id: 'consuming-context', title: 'Consuming Context', content: `**Reading Context Values**
\`\`\`jsx
import { useContext } from 'react';

// Simple consumer
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className={theme}
      onClick={toggleTheme}
    >
      Current theme: {theme}
    </button>
  );
}

// With TypeScript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
\`\`\`

**Performance Consideration:**
When the Provider's \`value\` prop changes, **all consumers re-render**. To optimize:
- Split contexts by frequency of updates
- Use \`useMemo\` for the value prop
- Consider state management libraries for complex state` },
      { id: 'when-to-use', title: 'When to Use Context', content: `**Context vs Other Solutions**

| Scenario | Solution |
|----------|----------|
| Theme, locale, auth | Context API |
| Form state | React Hook Form |
| Server state | React Query / SWR |
| Complex client state | Zustand / Redux |

**Good Use Cases for Context:**
- **Theme** — Light/dark mode across the app
- **Authentication** — Current user data
- **Locale** — Language and regional settings
- **Feature flags** — Toggle experimental features

**Avoid Context For:**
- **Frequently changing state** — causes all consumers to re-render
- **Complex state logic** — use a state management library
- **Server state** — use React Query or SWR for caching, refetching, deduping

**Pattern: Custom Provider + Hook**
\`\`\`jsx
// AuthContext.tsx
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await api.login(credentials);
    setUser(res.user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
\`\`\`` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What problem does the Context API solve?',
        options: ['State management', 'Prop drilling', 'Routing', 'Performance'],
        correctIndex: 1,
        explanation: 'Context API eliminates prop drilling by providing a way to pass data directly through the component tree without intermediate props.'
      },
      {
        id: 2,
        question: 'What happens when a Context Provider\'s value changes?',
        options: ['Only the deepest consumer re-renders', 'All consumers re-render', 'No components re-render', 'Only the provider re-renders'],
        correctIndex: 1,
        explanation: 'When the Provider\'s value prop changes, all components consuming that context will re-render.'
      },
      {
        id: 3,
        question: 'Which scenario is a good use case for Context API?',
        options: ['Complex form state', 'Theme settings', 'Server data caching', 'Frequently changing list data'],
        correctIndex: 1,
        explanation: 'Context API is ideal for low-frequency updates like themes, auth, and locale settings that are needed across the component tree.'
      }
    ]
  },
  {
    id: 411, slug: 'react-redux', title: 'State Management with Redux',
    description: 'Manage global state with actions, reducers, store, and middleware.',
    level: 'intermediate', duration: '45 min',
    objectives: ['Understand Redux principles and data flow', 'Create slices with Redux Toolkit', 'Dispatch actions and use selectors', 'Apply middleware for async operations'],
    topics: [
      { id: 'redux-principles', title: 'Redux Principles', content: `**Redux Core Concepts**

Redux provides a predictable state container using three principles:
1. **Single source of truth** — One store holds the entire state
2. **State is read-only** — Only way to change is dispatching actions
3. **Changes via pure functions** — Reducers compute new state

**Redux Toolkit (Modern Approach)**
\`\`\`jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

// Slice: combines reducers and actions
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// Dispatch
store.dispatch(increment());
store.dispatch(incrementByAmount(5));
\`\`\`

**Key Concepts:**
- **Store** — Single object holding the entire state tree
- **Slice** — A collection of reducers and actions for a feature
- **Action** — A plain object describing what happened (\`{ type, payload }\`)
- **Reducer** — A pure function that returns the next state` },
      { id: 'selectors', title: 'Selectors & Component Integration', content: `**Connecting Redux to React**
\`\`\`jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  // useSelector reads from the store
  const count = useSelector((state) => state.counter.value);

  // useDispatch returns the dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
\`\`\`

**Selectors:**
\`\`\`jsx
// Simple selector
const selectCount = (state) => state.counter.value;

// Memoized selector with createSelector
import { createSelector } from '@reduxjs/toolkit';

const selectFilteredTodos = createSelector(
  [(state) => state.todos, (state) => state.filter],
  (todos, filter) => todos.filter(t => t.status === filter)
);
\`\`\`

**Best Practices:**
- Keep selectors close to the slice that owns the data
- Use memoized selectors for derived data
- Normalize complex nested state` },
      { id: 'async-middleware', title: 'Async Operations with Thunks', content: `**Async Logic with createAsyncThunk**
\`\`\`jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
\`\`\`

**Thunk Lifecycle:**
1. \`pending\` — Request started
2. \`fulfilled\` — Request succeeded
3. \`rejected\` — Request failed

**When to Use Redux:**
- Large apps with many features sharing state
- Complex state update logic
- Need for time-travel debugging
- Predictable state transitions` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the only way to update state in Redux?',
        options: ['Direct mutation', 'Dispatching actions', 'Calling setState', 'Using Context'],
        correctIndex: 1,
        explanation: 'Redux enforces immutability — the only way to change state is by dispatching actions, which are processed by reducers.'
      },
      {
        id: 2,
        question: 'What does a Redux reducer return?',
        options: ['An action object', 'The previous state', 'The new state', 'undefined'],
        correctIndex: 2,
        explanation: 'A reducer is a pure function that takes the current state and an action, and returns the new state.'
      },
      {
        id: 3,
        question: 'What are the three states of a createAsyncThunk?',
        options: ['start, middle, end', 'pending, fulfilled, rejected', 'init, load, done', 'open, loading, closed'],
        correctIndex: 1,
        explanation: 'createAsyncThunk automatically dispatches three action types: pending (started), fulfilled (success), and rejected (error).'
      }
    ]
  },
  {
    id: 412, slug: 'react-server-communication', title: 'Server Communication',
    description: 'Fetch data with useEffect, handle loading states, and manage errors gracefully.',
    level: 'intermediate', duration: '40 min',
    objectives: ['Fetch data on component mount with useEffect', 'Display loading and error states', 'Implement abort controllers for cleanup', 'Use React Query / SWR for data fetching'],
    topics: [
      { id: 'fetching-data', title: 'Data Fetching with useEffect', content: `**Basic Data Fetching Pattern**
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch('/api/users', {
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

**Key Patterns:**
- Always use \`AbortController\` to prevent state updates on unmounted components
- Distinguish between user errors and network errors
- Use \`finally\` to always clear loading state` },
      { id: 'react-query', title: 'React Query / TanStack Query', content: `**Modern Data Fetching with React Query**

React Query handles caching, refetching, and deduping automatically.

**Code Example:**
\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const {
    data: users,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  if (isLoading) return <Spinner />;
  if (error) return (
    <div>
      <ErrorMessage message={error.message} />
      <button onClick={refetch}>Retry</button>
    </div>
  );

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

**React Query Benefits:**
- Automatic caching and stale-while-revalidate
- Background refetching
- Optimistic updates
- Deduplication of identical requests
- Pagination and infinite scroll support` },
      { id: 'error-handling', title: 'Error Handling Patterns', content: `**Comprehensive Error Handling**
\`\`\`jsx
// Error Boundary component
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <UserProfile userId={1} />
</ErrorBoundary>
\`\`\`

**Error Handling Strategy:**
- **Network errors** — Show retry button with exponential backoff
- **Validation errors** — Display inline field errors
- **404 errors** — Redirect to not-found page
- **401/403 errors** — Redirect to login page
- **Unexpected errors** — Use Error Boundary with fallback UI
- **Optimistic updates** — Roll back on failure and show toast` },
    ],
    quiz: [
      {
        id: 1,
        question: 'Why should you use AbortController when fetching data in useEffect?',
        options: ['To speed up requests', 'To prevent state updates on unmounted components', 'To cancel Redux actions', 'To handle CORS'],
        correctIndex: 1,
        explanation: 'AbortController lets you cancel the fetch request when the component unmounts, preventing "Can\'t perform a React state update on an unmounted component" warnings.'
      },
      {
        id: 2,
        question: 'What is a key benefit of using React Query over raw useEffect?',
        options: ['It\'s lighter weight', 'Automatic caching and background refetching', 'It uses less memory', 'It doesn\'t need React'],
        correctIndex: 1,
        explanation: 'React Query provides automatic caching, stale-while-revalidate, background refetching, and deduplication — things you\'d have to build manually with useEffect.'
      },
      {
        id: 3,
        question: 'What is the purpose of an Error Boundary?',
        options: ['To catch TypeScript errors', 'To catch JavaScript errors in child components', 'To validate props', 'To handle form errors'],
        correctIndex: 1,
        explanation: 'Error Boundaries catch JavaScript errors in their child component tree during rendering, allowing you to display a fallback UI instead of crashing.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // REACT ADVANCED (413-420)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 413, slug: 'react-performance', title: 'Performance Optimization',
    description: 'Optimize React apps with React.memo, lazy loading, and code splitting.',
    level: 'advanced', duration: '45 min',
    objectives: ['Prevent unnecessary re-renders with React.memo', 'Implement code splitting with lazy and Suspense', 'Profile and identify performance bottlenecks', 'Optimize list rendering with virtualization'],
    topics: [
      { id: 'react-memo', title: 'React.memo & useMemo', content: `**Preventing Unnecessary Re-renders**

React.memo wraps a component to skip re-renders when props haven't changed (shallow comparison).

**Code Example:**
\`\`\`jsx
import { memo, useMemo, useCallback, useState } from 'react';

const ExpensiveList = memo(function ExpensiveList({ items, onSelect }) {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

function Dashboard() {
  const [count, setCount] = useState(0);
  const [items] = useState([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);

  const handleSelect = useCallback((id) => {
    console.log('Selected:', id);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {/* ExpensiveList won't re-render when count changes */}
      <ExpensiveList items={items} onSelect={handleSelect} />
    </div>
  );
}
\`\`\`

**When to Use React.memo:**
- Component renders frequently with the same props
- Child is expensive to render
- You've identified a re-render bottleneck via profiling

**When NOT to Use:**
- Component is cheap to render
- Props change frequently
- Premature optimization without profiling` },
      { id: 'lazy-loading', title: 'Code Splitting & Lazy Loading', content: `**Dynamic Imports with React.lazy**

Split your bundle so components are loaded only when needed.

**Code Example:**
\`\`\`jsx
import { lazy, Suspense } from 'react';

// Lazy load route components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
\`\`\`

**Code Splitting Strategies:**
1. **Route-based** — Lazy load each page/route
2. **Component-based** — Lazy load heavy components (charts, editors)
3. **Feature-based** — Lazy load entire features based on user role

**Benefits:**
- Faster initial page load
- Smaller main bundle
- On-demand loading for features users actually use` },
      { id: 'virtualization', title: 'List Virtualization', content: `**Virtualizing Long Lists**

Only render items visible in the viewport for lists with hundreds or thousands of items.

**Code Example:**
\`\`\`jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style} className="list-row">
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

**Performance Checklist:**
- Profile with React DevTools before optimizing
- Use \`React.memo\` only where profiling shows bottlenecks
- Lazy load routes and heavy components
- Virtualize long lists
- Use \`useMemo\` for expensive computations
- Use \`useCallback\` for stable references passed to memoized children
- Avoid creating objects/arrays in render — move to \`useMemo\`` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What does React.memo do?',
        options: ['Memoizes state', 'Skips re-renders when props haven\'t changed', 'Prevents all re-renders', 'Caches API responses'],
        correctIndex: 1,
        explanation: 'React.memo wraps a component and skips re-renders if the props are shallowly equal to the previous props.'
      },
      {
        id: 2,
        question: 'How do you lazy load a component in React?',
        options: ['import() syntax inside React.lazy()', 'Using useEffect', 'With React.memo', 'Using Suspense without lazy'],
        correctIndex: 0,
        explanation: 'React.lazy(() => import("./MyComponent")) dynamically imports a component, splitting it into a separate chunk.'
      },
      {
        id: 3,
        question: 'When is list virtualization most beneficial?',
        options: ['Lists with 5 items', 'Lists with 10 items', 'Lists with hundreds or thousands of items', 'Always'],
        correctIndex: 2,
        explanation: 'List virtualization renders only visible items in the viewport, dramatically improving performance for long lists.'
      }
    ]
  },
  {
    id: 414, slug: 'react-server-components', title: 'Server Components',
    description: 'Understand React Server Components, streaming, and Suspense for RSC.',
    level: 'advanced', duration: '40 min',
    objectives: ['Understand the RSC architecture', 'Distinguish between Server and Client Components', 'Use streaming and Suspense effectively', 'Know when to use Server vs Client Components'],
    topics: [
      { id: 'rsc-overview', title: 'React Server Components (RSC)', content: `**What are Server Components?**

Server Components render on the server and send their output to the client. They never ship JavaScript to the browser, reducing bundle size.

**Server vs Client Components:**
\`\`\`jsx
// Server Component (default in Next.js App Router)
// Runs only on the server — no client JS sent
async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — \${p.price}</li>
      ))}
    </ul>
  );
}

// Client Component — "use client" directive
'use client';
import { useState } from 'react';

function SearchFilter({ onFilter }) {
  const [query, setQuery] = useState('');
  return (
    <input
      value={query}
      onChange={e => {
        setQuery(e.target.value);
        onFilter(e.target.value);
      }}
    />
  );
}
\`\`\`

**Key Differences:**
| Feature | Server Component | Client Component |
|---------|-----------------|-----------------|
| Runs on | Server | Client |
| Has state | No | Yes |
| Uses hooks | No | Yes |
| Accesses DB | Yes | No |
| Bundle impact | Zero JS sent | JS included |` },
      { id: 'streaming', title: 'Streaming & Suspense', content: `**Progressive Rendering with Streaming**

Stream HTML from server to client, showing content as it becomes available.

**Code Example:**
\`\`\`jsx
// Server Component with Suspense boundaries
import { Suspense } from 'react';

async function Page() {
  return (
    <div>
      <Header />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList /> {/* Slow DB query */}
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews /> {/* Another async operation */}
      </Suspense>
    </div>
  );
}
\`\`\`

**Streaming Benefits:**
- Users see content progressively instead of waiting for everything
- Reduces Time to First Byte (TTFB)
- Each Suspense boundary streams independently
- Works with SSR and static rendering

**Server Actions for Mutations:**
\`\`\`jsx
// Server Action — runs on the server
async function addToCart(formData) {
  'use server';
  const productId = formData.get('productId');
  await db.cart.add(userId, productId);
  revalidatePath('/cart');
}
\`\`\`` },
      { id: 'when-to-use-rsc', title: 'When to Use Server Components', content: `**RSC Decision Framework**

**Use Server Components for:**
- Data fetching from databases or APIs
- Accessing backend resources (filesystem, DB)
- Large dependencies that don't need to ship to client
- Static content that doesn't need interactivity
- SEO-critical content

**Use Client Components for:**
- Interactive UI (forms, buttons, modals)
- State management (useState, useReducer)
- Browser APIs (localStorage, geolocation)
- Event handlers (onClick, onChange)
- Effects (useEffect for client-side logic)

**Composition Pattern:**
\`\`\`jsx
// Server Component fetches data
async function UserProfile({ userId }) {
  const user = await getUser(userId);

  return (
    <div>
      <h1>{user.name}</h1> {/* Server-rendered */}
      <ClientInteractions user={user} /> {/* Client boundary */}
    </div>
  );
}
\`\`\`

**Best Practices:**
- Push Server Components as deep as possible in the tree
- Keep Client Components small and at the leaves
- Use \`'use client'\` only where interactivity is needed
- Fetch data in Server Components when possible` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the main benefit of Server Components?',
        options: ['Faster re-renders', 'Reduced client-side JavaScript bundle', 'Better error handling', 'Simpler code'],
        correctIndex: 1,
        explanation: 'Server Components render on the server and ship zero JavaScript to the client, significantly reducing bundle size.'
      },
      {
        id: 2,
        question: 'How do you create a Client Component in Next.js App Router?',
        options: ['Use "use client" at the top of the file', 'Use React.memo', 'Use "use server" directive', 'Export as default'],
        correctIndex: 0,
        explanation: 'Adding "use client" at the top of a file marks it as a Client Component, which runs on the client and can use hooks and state.'
      },
      {
        id: 3,
        question: 'What does streaming allow in React Server Components?',
        options: ['Real-time websockets', 'Progressive HTML rendering to the client', 'Server-side state management', 'Client-side routing'],
        correctIndex: 1,
        explanation: 'Streaming sends HTML progressively from server to client, showing content as each Suspense boundary resolves.'
      }
    ]
  },
  {
    id: 415, slug: 'react-server-actions', title: 'Server Actions',
    description: 'Handle mutations with Server Actions, revalidation, and progressive enhancement.',
    level: 'advanced', duration: '35 min',
    objectives: ['Create and use Server Actions', 'Implement form submissions with Server Actions', 'Understand revalidation strategies', 'Apply progressive enhancement patterns'],
    topics: [
      { id: 'creating-actions', title: 'Creating Server Actions', content: `**What are Server Actions?**

Server Actions are async functions that run on the server, callable from Client Components. They handle mutations (create, update, delete).

**Code Example:**
\`\`\`jsx
// actions.ts — Server Action file
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  await db.posts.create({ title, content });

  revalidatePath('/posts');
  redirect('/posts');
}

export async function deletePost(postId) {
  await db.posts.delete(postId);
  revalidatePath('/posts');
}
\`\`\`

**Calling from a Client Component:**
\`\`\`jsx
'use client';

import { createPost } from './actions';

function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
\`\`\`

**Key Features:**
- No API route needed — the action IS the endpoint
- Progressive enhancement — works without JavaScript
- Automatic serialization of form data
- Composable with useActionState and useOptimistic` },
      { id: 'revalidation', title: 'Revalidation Strategies', content: `**When and How to Revalidate Data**

After mutations, you need to refresh cached data.

**Revalidation Methods:**
\`\`\`jsx
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

// Revalidate a specific path
export async function updateProfile(formData) {
  const name = formData.get('name');
  await db.users.update(userId, { name });
  revalidatePath('/profile');
}

// Revalidate all pages using a specific cache tag
export async function addComment(formData) {
  const text = formData.get('text');
  await db.comments.create({ text, postId });
  revalidateTag('post-' + postId);
}

// Revalidate entire layouts
export async function updateSettings(formData) {
  await db.settings.update(formData);
  revalidatePath('/', 'layout');
}
\`\`\`

**Strategies:**
- **Path-based** — \`revalidatePath('/posts')\` — revalidates the specific page
- **Tag-based** — \`revalidateTag('posts')\` — revalidates all fetches with that tag
- **Layout** — \`revalidatePath('/', 'layout')\` — revalidates the entire layout
- **Time-based** — \`{ next: { revalidate: 60 } }\` in fetch options

**When to Use Each:**
- Path revalidation: After creating/updating a specific resource
- Tag revalidation: When one mutation affects multiple pages
- Layout revalidation: When navigation structure changes` },
      { id: 'progressive-enhancement', title: 'Progressive Enhancement', content: `**Making Forms Work Without JavaScript**

Server Actions enable progressive enhancement — forms work even if JavaScript fails to load.

**Code Example:**
\`\`\`jsx
// This form works with AND without JavaScript
<form action={createPost}>
  <input name="title" required />
  <textarea name="content" required />
  <button type="submit">Create Post</button>
</form>
\`\`\`

**Using useActionState for Form State:**
\`\`\`jsx
'use client';

import { useActionState } from 'react';
import { createPost } from './actions';

function NewPostForm() {
  const [state, formAction, isPending] = useActionState(
    createPost,
    { error: null }
  );

  return (
    <form action={formAction}>
      <input name="title" required />
      <textarea name="content" required />
      {state.error && <p className="error">{state.error}</p>}
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
\`\`\`

**useOptimistic for Instant Feedback:**
\`\`\`jsx
'use client';

import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function handleSubmit(formData) {
    const text = formData.get('text');
    addOptimistic({ id: Date.now(), text });
    await addTodo(text);
  }

  return (
    <form action={handleSubmit}>
      <input name="text" />
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.6 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  );
}
\`\`\`` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What directive marks a file as containing Server Actions?',
        options: ['"use client"', '"use server"', '"use strict"', '"use async"'],
        correctIndex: 1,
        explanation: 'The "use server" directive at the top of a file marks all exported functions as Server Actions that run on the server.'
      },
      {
        id: 2,
        question: 'What does revalidatePath do after a mutation?',
        options: ['Deletes the page', 'Refreshes the cached data for that path', 'Redirects the user', 'Clears all caches'],
        correctIndex: 1,
        explanation: 'revalidatePath tells Next.js to re-fetch and re-render the specified path, ensuring the UI shows the latest data.'
      },
      {
        id: 3,
        question: 'What is progressive enhancement in the context of Server Actions?',
        options: ['Adding animations to forms', 'Forms work without JavaScript enabled', 'Enhancing server performance', 'Adding TypeScript types'],
        correctIndex: 1,
        explanation: 'Progressive enhancement means forms using Server Actions work even if JavaScript fails to load, as the action is a server endpoint.'
      }
    ]
  },
  {
    id: 416, slug: 'react-advanced-patterns', title: 'Advanced React Patterns',
    description: 'Master compound components, render props, HOCs, and the provider pattern.',
    level: 'advanced', duration: '45 min',
    objectives: ['Implement compound component patterns', 'Use render props for flexible APIs', 'Create Higher-Order Components', 'Build the Provider pattern for shared state'],
    topics: [
      { id: 'compound-components', title: 'Compound Components', content: `**Implicit State Sharing**

Compound components share state implicitly, giving consumers a clean, declarative API.

**Code Example:**
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

// Internal context
const TabsContext = createContext(undefined);

// Compound Components
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      onClick={() => setActiveTab(value)}
      className={activeTab === value ? 'active' : ''}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div role="tabpanel">{children}</div>;
}

// Clean API for consumers
<Tabs defaultTab="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="profile"><ProfileForm /></TabPanel>
  <TabPanel value="settings"><SettingsForm /></TabPanel>
</Tabs>
\`\`\`

**Benefits:**
- Clean, declarative API
- Internal state is hidden from consumers
- Flexible composition — mix and match components` },
      { id: 'render-props', title: 'Render Props', content: `**Sharing Logic via Render Functions**

A render prop is a function prop that a component calls instead of rendering its own UI.

**Code Example:**
\`\`\`jsx
import { useState } from 'react';

// Component that provides mouse position
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage — consumer decides how to render
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <p>Mouse is at ({x}, {y})</p>
      )}
    />
  );
}
\`\`\`

**vs Custom Hooks (Modern Alternative):**
\`\`\`jsx
// Custom hook — simpler, more flexible
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

// Usage
function App() {
  const { x, y } = useMousePosition();
  return <p>Mouse is at ({x}, {y})</p>;
}
\`\`\`

**When to Use Each:**
- **Custom hooks** — Most cases, simpler API
- **Render props** — When you need to control when/how rendering happens
- **Compound components** — When building reusable component libraries` },
      { id: 'higher-order-components', title: 'Higher-Order Components (HOCs)', content: `**Enhancing Components with HOCs**

A HOC is a function that takes a component and returns a new enhanced component.

**Code Example:**
\`\`\`jsx
// HOC that adds loading and error handling
function withAsyncData(WrappedComponent, fetchData) {
  return function AsyncComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchData(props.id)
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [props.id]);

    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <WrappedComponent {...props} data={data} />;
  };
}

// Usage
function UserCard({ data }) {
  return <h1>{data.name}</h1>;
}

const UserCardWithData = withAsyncData(UserCard, fetchUser);
// <UserCardWithData id={42} />
\`\`\`

**HOC Caveats:**
- Don't use HOCs in render — create them outside the component
- Copy static methods with \`hoist-non-react-statics\`
- Refs don't pass through — use \`React.forwardRef\`
- The component name in DevTools can be confusing

**Modern Alternatives:**
- Custom hooks (preferred for logic reuse)
- Render props (for composition patterns)
- Compound components (for component libraries)` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the main benefit of the compound components pattern?',
        options: ['Better performance', 'Clean, declarative API with implicit state sharing', 'Simpler code', 'Fewer components'],
        correctIndex: 1,
        explanation: 'Compound components share state implicitly through context, giving consumers a clean API without exposing internal state management.'
      },
      {
        id: 2,
        question: 'What is a render prop?',
        options: ['A CSS prop for styling', 'A function prop that returns JSX instead of the component rendering its own UI', 'A prop that passes render methods', 'A prop for animations'],
        correctIndex: 1,
        explanation: 'A render prop is a function passed as a prop that the component calls, letting the consumer decide how to render the content.'
      },
      {
        id: 3,
        question: 'What is the modern alternative to Higher-Order Components?',
        options: ['Class components', 'Custom hooks', 'Context API', 'Redux'],
        correctIndex: 1,
        explanation: 'Custom hooks are the modern, preferred alternative to HOCs for reusing stateful logic — they\'re simpler, more composable, and don\'t add wrapper components.'
      }
    ]
  },
  {
    id: 417, slug: 'react-testing', title: 'Testing React Applications',
    description: 'Write reliable tests with React Testing Library, Jest, and proper mocking.',
    level: 'advanced', duration: '45 min',
    objectives: ['Write component tests with React Testing Library', 'Test user interactions and async behavior', 'Mock API calls and modules', 'Follow testing best practices'],
    topics: [
      { id: 'rtl-basics', title: 'React Testing Library Basics', content: `**Testing Philosophy: Test User Behavior, Not Implementation**

React Testing Library (RTL) encourages testing what users see and do.

**Code Example:**
\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  it('displays the initial count', () => {
    render(<Counter initialCount={0} />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('increments when the button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
\`\`\`

**Query Priority:**
1. \`getByRole\` — Accessible, reflects user experience
2. \`getByText\` — Matches visible text
3. \`getByLabelText\` — Best for form fields
4. \`getByTestId\` — Last resort (add \`data-testid\`)

**Common Queries:**
- \`getBy*\` — Returns element or throws error
- \`queryBy*\` — Returns element or null (useful for "not present")
- \`findBy*\` — Returns promise, waits for async elements` },
      { id: 'async-testing', title: 'Testing Async Behavior', content: `**Testing API Calls and Async Components**
\`\`\`jsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserList from './UserList';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList', () => {
  it('displays loading then users', async () => {
    render(<UserList />);

    // Assert loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for users to appear
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('displays error on failure', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
\`\`\`

**Mocking Strategies:**
- **MSW (Mock Service Worker)** — Intercept network requests (preferred)
- **jest.mock()** — Mock entire modules
- **jest.spyOn()** — Spy on specific methods` },
      { id: 'testing-patterns', title: 'Testing Best Practices', content: `**Testing Patterns and Guidelines**

**What to Test:**
1. Component renders correctly
2. User interactions work (clicks, inputs, submissions)
3. Async operations (API calls, loading states)
4. Conditional rendering
5. Error states

**What NOT to Test:**
- Implementation details (internal state, method calls)
- Third-party library internals
- CSS styles (use visual regression tools instead)
- Trivial code (simple wrappers)

**Code Example:**
\`\`\`jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  it('allows users to add and complete todos', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    // Add a todo
    await user.type(
      screen.getByRole('textbox', { name: /add todo/i }),
      'Buy milk'
    );
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    // Complete it
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('validates empty input', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/cannot be empty/i)).toBeInTheDocument();
  });
});
\`\`\`

**Testing Tips:**
- Use \`userEvent\` over \`fireEvent\` for realistic interactions
- Use \`screen\` for queries — better IDE autocomplete
- Wrap async assertions in \`waitFor\`
- Use \`data-testid\` only when no semantic query works
- Keep tests independent — no shared state between tests` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the preferred query for finding a button in React Testing Library?',
        options: ['getByClassName', 'getByRole', 'getByTestId', 'getById'],
        correctIndex: 1,
        explanation: 'getByRole is the preferred query because it matches elements by their accessible role, reflecting how users actually interact with the page.'
      },
      {
        id: 2,
        question: 'What is MSW (Mock Service Worker)?',
        options: ['A testing framework', 'A library for intercepting network requests in tests', 'A mock for DOM elements', 'A performance testing tool'],
        correctIndex: 1,
        explanation: 'MSW intercepts network requests at the network level, allowing you to mock API responses without modifying your application code.'
      },
      {
        id: 3,
        question: 'Why should you avoid testing implementation details?',
        options: ['It\'s slower', 'It makes tests brittle and tied to internal code', 'It\'s impossible', 'RTL doesn\'t support it'],
        correctIndex: 1,
        explanation: 'Testing implementation details (internal state, private methods) makes tests fragile — they break when you refactor internals even if behavior is the same.'
      }
    ]
  },
  {
    id: 418, slug: 'react-nextjs-fundamentals', title: 'Next.js Fundamentals',
    description: 'Master SSR, SSG, ISR, and API routes in the Next.js framework.',
    level: 'advanced', duration: '50 min',
    objectives: ['Understand rendering strategies in Next.js', 'Implement Server-Side Rendering (SSR)', 'Use Static Site Generation (SSG) and ISR', 'Create API routes for backend logic'],
    topics: [
      { id: 'rendering-strategies', title: 'Rendering Strategies', content: `**Next.js Rendering Modes**

Next.js supports multiple rendering strategies, often combined in a single app.

**Rendering Modes:**
- **CSR (Client-Side Rendering)** — Default for React apps
- **SSR (Server-Side Rendering)** — Rendered on every request
- **SSG (Static Site Generation)** — Built at build time
- **ISR (Incremental Static Regeneration)** — Static with periodic revalidation

**Code Example (App Router):**
\`\`\`jsx
// app/page.tsx — Static by default (SSG)
async function HomePage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  const data = await posts.json();

  return (
    <div>
      {data.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

**When to Use Each:**
| Strategy | Use Case | Performance |
|----------|----------|-------------|
| SSG | Blog, docs, marketing pages | Fastest (pre-built) |
| SSR | User-specific, real-time data | Slower (per-request) |
| ISR | Content that updates occasionally | Fast + fresh |
| CSR | Highly interactive, no SEO needs | Depends on client |` },
      { id: 'ssr-implementation', title: 'Server-Side Rendering', content: `**SSR in Next.js App Router**

Every component in the App Router is a Server Component by default — it runs on the server.

**Code Example:**
\`\`\`jsx
// app/dashboard/page.tsx — SSR on every request
async function DashboardPage({ searchParams }) {
  const tab = (await searchParams).tab || 'overview';

  const data = await fetch(\`https://api.example.com/dashboard?tab=\${tab}\`);

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardContent tab={tab} data={await data.json()} />
    </div>
  );
}
\`\`\`

**SSR Benefits:**
- Faster First Contentful Paint (FCP)
- Better SEO — search engines see full content
- No flash of uncontent
- Reduced client-side JavaScript

**SSR Considerations:**
- TTFB is higher than SSG (server processing time)
- Requires a running server (not deployable to CDNs as static)
- Database connections should be properly pooled` },
      { id: 'api-routes', title: 'API Routes & Backend Logic', content: `**Next.js API Routes (App Router)**
\`\`\`jsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.query('SELECT * FROM users');
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();

  // Validation
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    );
  }

  const user = await db.users.create(body);
  return NextResponse.json(user, { status: 201 });
}

// app/api/users/[id]/route.ts
export async function GET(request, { params }) {
  const { id } = await params;
  const user = await db.users.findById(id);
  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}
\`\`\`

**API Route Best Practices:**
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Validate input before processing
- Handle errors gracefully with try/catch
- Use environment variables for secrets
- Consider rate limiting for public endpoints` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is ISR (Incremental Static Regeneration)?',
        options: ['Interactive Server Rendering', 'Static pages that revalidate periodically', 'Internal State Recovery', 'Indexed Server Routing'],
        correctIndex: 1,
        explanation: 'ISR generates static pages at build time but allows them to be revalidated and rebuilt periodically, combining the benefits of SSG with fresh data.'
      },
      {
        id: 2,
        question: 'What is the default rendering mode for components in the Next.js App Router?',
        options: ['Client-Side Rendering', 'Server Components (SSR/SSG)', 'Static Site Generation', 'Incremental Static Regeneration'],
        correctIndex: 1,
        explanation: 'All components in the App Router are Server Components by default, running on the server and sending zero JavaScript to the client.'
      },
      {
        id: 3,
        question: 'Where do you define API endpoints in Next.js App Router?',
        options: ['pages/api/ directory', 'app/api/ directory with route.ts files', 'server.js file', 'config.js file'],
        correctIndex: 1,
        explanation: 'In the App Router, API routes are defined in the app/api/ directory using route.ts files with exported handler functions for each HTTP method.'
      }
    ]
  },
  {
    id: 419, slug: 'react-native-basics', title: 'React Native Basics',
    description: 'Understand mobile development concepts with React Native for cross-platform apps.',
    level: 'advanced', duration: '40 min',
    objectives: ['Understand React Native architecture', 'Use core mobile components', 'Handle platform-specific code', 'Manage navigation in mobile apps'],
    topics: [
      { id: 'architecture', title: 'React Native Architecture', content: `**How React Native Works**

React Native bridges React components to native mobile UI elements (UIKit on iOS, Views on Android).

**Architecture:**
1. **JavaScript Thread** — Runs your React code
2. **Bridge** — Serializes messages between JS and native
3. **Native Thread** — Renders actual native components

**Code Example:**
\`\`\`jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

function UserList({ users }) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, color: 'gray' }
});
\`\`\`

**Key Differences from React DOM:**
- No HTML elements — uses native components (\`<View>\`, \`<Text>\`)
- StyleSheet instead of CSS
- Platform-specific APIs (\`Platform.OS\`)
- Access to native modules (camera, GPS, etc.)` },
      { id: 'core-components', title: 'Core Mobile Components', content: `**Essential React Native Components**
\`\`\`jsx
import {
  View, Text, Image, ScrollView,
  TextInput, TouchableOpacity, Alert, Platform
} from 'react-native';

function App() {
  return (
    <ScrollView>
      <Image
        source={{ uri: 'https://example.com/photo.jpg' }}
        style={{ width: 200, height: 200 }}
      />

      <TextInput
        placeholder="Enter name"
        style={{ borderWidth: 1, padding: 12 }}
      />

      <TouchableOpacity
        onPress={() => Alert.alert('Pressed!')}
      >
        <Text>Click Me</Text>
      </TouchableOpacity>

      {/* Platform-specific code */}
      {Platform.OS === 'ios' ? (
        <Text>iOS specific content</Text>
      ) : (
        <Text>Android specific content</Text>
      )}
    </ScrollView>
  );
}
\`\`\`

**Component Mapping:**
| Web | React Native |
|-----|-------------|
| \`<div>\` | \`<View>\` |
| \`<p>\`, \`<span>\` | \`<Text>\` |
| \`<img>\` | \`<Image>\` |
| \`<input>\` | \`<TextInput>\` |
| \`<button>\` | \`<TouchableOpacity>\` |
| \`<ul>\` (scrollable) | \`<FlatList>\` |

**Platform-Specific Code:**
- \`Platform.OS\` — 'ios' or 'android'
- \`Platform.select()\` — Choose values per platform
- File extensions: \`.ios.tsx\`, \`.android.tsx\`` },
      { id: 'navigation', title: 'React Native Navigation', content: `**React Navigation**
\`\`\`jsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

**Navigation Patterns:**
- **Stack Navigator** — Push/pop screens (iOS back gesture)
- **Tab Navigator** — Bottom tabs (most common mobile pattern)
- **Drawer Navigator** — Side menu
- **Native Stack** — Uses native navigation (better performance)

**When to Use React Native:**
- Cross-platform mobile apps (iOS + Android)
- Shared web + mobile codebase (with Expo or React Native Web)
- Rapid prototyping
- Apps that need native performance` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What replaces `<div>` in React Native?',
        options: ['<div>', '<Container>', '<View>', '<Panel>'],
        correctIndex: 2,
        explanation: 'React Native uses <View> as the fundamental building block for layout, similar to <div> in web development.'
      },
      {
        id: 2,
        question: 'How do you write platform-specific code in React Native?',
        options: ['Media queries', 'Platform.OS and file extensions', 'CSS classes', 'Conditional imports only'],
        correctIndex: 1,
        explanation: 'React Native uses Platform.OS for runtime checks and platform-specific file extensions (.ios.tsx, .android.tsx) for separate implementations.'
      },
      {
        id: 3,
        question: 'What is the recommended navigation library for React Native?',
        options: ['React Router', 'React Navigation', 'Next.js Router', 'Native Navigation'],
        correctIndex: 1,
        explanation: 'React Navigation is the most popular and well-maintained navigation solution for React Native, providing stack, tab, and drawer navigators.'
      }
    ]
  },
  {
    id: 420, slug: 'react-architecture', title: 'React Architecture & Best Practices',
    description: 'Design scalable React applications with proper folder structure and patterns.',
    level: 'advanced', duration: '45 min',
    objectives: ['Design a scalable folder structure', 'Apply separation of concerns', 'Implement error boundaries and logging', 'Establish coding conventions for teams'],
    topics: [
      { id: 'folder-structure', title: 'Project Folder Structure', content: `**Scalable React Project Structure**

\`\`\`
src/
├── app/                    # App-level setup (providers, router)
│   ├── providers.tsx
│   └── layout.tsx
├── components/             # Shared reusable components
│   ├── ui/                 # Primitive UI (Button, Input, Card)
│   ├── layout/             # Layout components (Header, Sidebar)
│   └── common/             # Shared business components
├── features/               # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types.ts
│   ├── dashboard/
│   └── settings/
├── hooks/                  # Global shared hooks
├── lib/                    # Utilities and configurations
│   ├── api.ts
│   └── utils.ts
├── styles/                 # Global styles
└── types/                  # Shared TypeScript types
\`\`\`

**Key Principles:**
- **Feature-based organization** — Group by feature, not by type
- **Colocation** — Keep related files close together
- **Clear boundaries** — Features don't import from each other directly
- **Shared components** — Only truly reusable components go in \`/components\`` },
      { id: 'patterns', title: 'Architectural Patterns', content: `**Essential Patterns for Large React Apps**

**1. Container/Presentational Pattern**
\`\`\`jsx
// Container — handles logic
function UserListContainer() {
  const { users, loading, error } = useUsers();
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <UserList users={users} />;
}

// Presentational — handles UI
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </ul>
  );
}
\`\`\`

**2. Custom Hook Pattern**
\`\`\`jsx
// Encapsulate complex logic
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  return { user, loading };
}
\`\`\`

**3. Error Boundary Pattern**
\`\`\`jsx
// Wrap feature sections
<ErrorBoundary fallback={<FeatureError />}>
  <Dashboard />
</ErrorBoundary>
\`\`\`

**4. Provider Pattern**
\`\`\`jsx
// Compose providers at the top level
<ThemeProvider>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
    </QueryClientProvider>
  </AuthProvider>
</ThemeProvider>
\`\`\`` },
      { id: 'best-practices', title: 'Production Best Practices', content: `**Production Readiness Checklist**

**Code Quality:**
- TypeScript for type safety across the codebase
- ESLint + Prettier for consistent formatting
- Pre-commit hooks (husky, lint-staged)
- Component documentation (Storybook)

**Performance:**
- React.memo for expensive components
- Lazy loading for routes and heavy features
- Image optimization (next/image, lazy loading)
- Bundle analysis to identify large dependencies

**Testing:**
- Unit tests for utilities and hooks
- Component tests with RTL
- Integration tests for critical user flows
- E2E tests for full user journeys (Cypress, Playwright)

**Monitoring:**
- Error tracking (Sentry, LogRocket)
- Performance monitoring (Web Vitals)
- Analytics for user behavior
- Alerting for critical errors

**Security:**
- Environment variables for secrets
- Content Security Policy (CSP) headers
- Input sanitization (XSS prevention)
- Dependency auditing (npm audit)
- CORS configuration

**Code Review Checklist:**
- Does the code follow established patterns?
- Are there appropriate tests?
- Is error handling comprehensive?
- Are there any performance concerns?
- Is the code accessible (a11y)?
- Is the bundle size impact acceptable?` },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the recommended way to organize a large React project?',
        options: ['By file type (components, hooks, utils)', 'By feature (auth, dashboard, settings)', 'By page (home, about, contact)', 'Flat structure'],
        correctIndex: 1,
        explanation: 'Feature-based organization groups related code together, making it easier to find, maintain, and scale features independently.'
      },
      {
        id: 2,
        question: 'Why should features not import from each other directly?',
        options: ['It\'s slower', 'It creates tight coupling and makes refactoring harder', 'It\'s not possible in React', 'It causes performance issues'],
        correctIndex: 1,
        explanation: 'Direct feature-to-feature imports create tight coupling, making it harder to refactor, test, or reuse features independently.'
      },
      {
        id: 3,
        question: 'What is the purpose of error boundaries in production?',
        options: ['To catch TypeScript errors', 'To gracefully handle runtime errors and show fallback UI', 'To prevent all errors', 'To log errors to console'],
        correctIndex: 1,
        explanation: 'Error boundaries catch runtime errors in their component tree and display a fallback UI instead of crashing the entire application.'
      }
    ]
  }
];

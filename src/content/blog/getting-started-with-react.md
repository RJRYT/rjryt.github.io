---
title: "Getting Started with React: A Beginner's Guide"
date: "2026-10-01"
tags: ["React", "JavaScript", "Frontend", "Tutorial", "Vite", "Hooks"]
excerpt: "Learn React fundamentals from components and JSX to props, state, hooks, events, and modern project setup with Vite."
image: '/images/blog/getting-started-with-react.png'
featured: false
---

# Getting Started with React: A Beginner's Guide

React is one of the most widely used libraries for building interactive user interfaces with JavaScript. Instead of building an entire interface as one large piece of code, React lets you split your application into small, reusable components.

This guide introduces the core React concepts you need to start building modern frontend applications.

You don't need to know everything about React before building your first project. Start with the fundamentals, build something small, and learn additional concepts as your application grows.

---

## What is React?

**React** is a JavaScript library for building user interfaces.

It is particularly useful for applications where the interface changes frequently based on user interaction or application data.

React applications are built from **components**. A component can represent something small, such as a button, or something larger, such as an entire page.

For example:

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

You can then use that component inside another component:

```jsx
function App() {
  return (
    <main>
      <Welcome />
    </main>
  );
}
```

This component-based approach makes interfaces easier to organize and reuse.

---

## Why learn React?

React provides several concepts that make modern UI development easier to manage.

### Key concepts

| Concept | What it means |
| --- | --- |
| **Components** | Reusable pieces of UI |
| **JSX** | Syntax for describing UI inside JavaScript |
| **Props** | Data passed from one component to another |
| **State** | Data managed by a component that can change |
| **Hooks** | Functions that let components use React features |
| **Events** | Responding to user interactions |
| **Conditional rendering** | Showing different UI based on application state |

React also encourages a predictable data flow where data normally moves from parent components to their children.

---

## Setting up your first React app

Older tutorials often use **Create React App**, but it is no longer the recommended starting point for a new modern React project.

A lightweight way to start a React application is **Vite**.

### Create a React project with Vite

Make sure Node.js is installed, then run:

```bash
npm create vite@latest my-first-app -- --template react
cd my-first-app
npm install
npm run dev
```

Vite starts a development server and provides a fast development workflow.

You can then open the local development URL shown in your terminal.

### TypeScript option

If you want to learn React with TypeScript, create a TypeScript-based project instead:

```bash
npm create vite@latest my-first-app -- --template react-ts
cd my-first-app
npm install
npm run dev
```

For beginners who are still learning JavaScript, starting with regular React and JavaScript is perfectly reasonable.

---

## Understanding a React project

A typical Vite React project looks something like this:

```text
my-first-app/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
└─ vite.config.js
```

The important files are:

| File | Purpose |
| --- | --- |
| `src/App.jsx` | Main application component |
| `src/main.jsx` | React application entry point |
| `src/index.css` | Global styles |
| `package.json` | Dependencies and scripts |
| `vite.config.js` | Vite configuration |

As your application grows, you'll normally organize components, pages, hooks, services, and other application code into additional folders.

---

## Your first React component

A React component is usually a JavaScript function that returns UI.

For example:

```jsx
function Welcome({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to React!</p>
    </div>
  );
}

export default Welcome;
```

You can use it like this:

```jsx
function App() {
  return (
    <div>
      <Welcome name="Robin" />
    </div>
  );
}

export default App;
```

The `name` value is passed into `Welcome` as a **prop**.

---

## Understanding JSX

JSX allows you to describe UI using an HTML-like syntax directly inside JavaScript.

For example:

```jsx
const element = <h1>Hello, World!</h1>;
```

JSX is not HTML. It is syntax that React tooling transforms into JavaScript.

You can also use JavaScript expressions inside JSX:

```jsx
const name = "Robin";

function App() {
  return <h1>Hello, {name}!</h1>;
}
```

The `{name}` expression is evaluated by JavaScript.

### JSX attributes

JSX uses JavaScript-style property names for many attributes.

For example:

```jsx
function Profile() {
  const imageUrl = "/profile.png";

  return (
    <img
      src={imageUrl}
      alt="Profile"
      className="profile-image"
    />
  );
}
```

Notice that React uses `className` instead of HTML's `class`.

---

## Components should be reusable

One of the main benefits of React is that you can create a component once and use it multiple times.

```jsx
function Button({ children }) {
  return (
    <button type="button">
      {children}
    </button>
  );
}

function App() {
  return (
    <div>
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Continue</Button>
    </div>
  );
}
```

Instead of repeating the same markup, you can reuse the component with different content.

---

## Props: passing data between components

**Props** allow a parent component to pass information to a child component.

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}

function App() {
  return (
    <div>
      <UserCard
        name="Robin"
        role="Full-Stack Developer"
      />

      <UserCard
        name="Alex"
        role="Frontend Developer"
      />
    </div>
  );
}
```

Props are read by the child component.

A child component should not directly modify the parent's props.

---

## State: making your UI interactive

Props represent data received by a component. **State** represents data that the component needs to remember and update.

React provides the `useState` Hook for this.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times.</p>

      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
```

When `setCount` updates the state, React renders the component again with the new value.

### How `useState` works

This line:

```jsx
const [count, setCount] = useState(0);
```

gives you:

- `count` — the current state value.
- `setCount` — the function used to update it.
- `0` — the initial value.

---

## Handling events

React lets you respond to user interactions such as clicks, typing, form submissions, and keyboard events.

For example:

```jsx
function Button() {
  function handleClick() {
    console.log("Button clicked");
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

For an input:

```jsx
import { useState } from "react";

function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search..."
    />
  );
}
```

The input becomes a **controlled component** because its value is managed by React state.

---

## Conditional rendering

Applications often need to display different content depending on the current state.

For example:

```jsx
function Status({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  }

  return <p>Please log in.</p>;
}
```

You can also use a conditional expression:

```jsx
function App({ isLoggedIn }) {
  return (
    <main>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </main>
  );
}
```

Conditional rendering is one of the most common patterns you'll use in React.

---

## Rendering lists

React can render arrays of data using JavaScript's `map()` method.

```jsx
const users = [
  { id: 1, name: "Robin" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Sam" }
];

function UserList() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

### Why is `key` important?

The `key` helps React identify individual items when a list changes.

Prefer a stable unique identifier:

```jsx
<li key={user.id}>{user.name}</li>
```

Avoid using the array index as the key when list items can be inserted, deleted, or reordered.

---

## React Hooks

Hooks are functions that allow React components to use features such as state and effects.

Some commonly used Hooks are:

| Hook | Purpose |
| --- | --- |
| `useState` | Store component state |
| `useEffect` | Synchronize with external systems |
| `useContext` | Read context values |
| `useRef` | Keep a mutable value or reference a DOM element |
| `useMemo` | Cache a calculated value when appropriate |
| `useCallback` | Cache a function reference when appropriate |

### `useEffect`

`useEffect` is useful when a component needs to synchronize with something outside React, such as:

- browser APIs;
- subscriptions;
- timers;
- external systems;
- certain data-fetching patterns.

Example:

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "My React App";
  }, []);

  return <h1>Hello React</h1>;
}
```

Don't add `useEffect` automatically whenever something needs to happen. First consider whether the operation can be calculated during rendering or handled directly by an event.

---

## Fetching data from an API

React applications frequently communicate with backend APIs.

The browser's `fetch()` API can be used for HTTP requests:

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

For larger applications, consider a dedicated server-state library such as **TanStack Query** when caching, synchronization, retries, and request state become important.

---

## Forms in React

Forms are another fundamental React concept.

A simple controlled form can look like this:

```jsx
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Email:", email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <button type="submit">
        Login
      </button>
    </form>
  );
}
```

In a real application, validate form data on the server as well. Client-side validation improves user experience, but it should not be treated as a security boundary.

---

## Sharing state between components

Sometimes two components need access to the same piece of state.

A common solution is to **lift state up** to their closest shared parent.

For example:

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <main>
      <NameInput
        name={name}
        setName={setName}
      />

      <Greeting name={name} />
    </main>
  );
}

function NameInput({ name, setName }) {
  return (
    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  );
}

function Greeting({ name }) {
  return <h1>Hello, {name || "there"}!</h1>;
}
```

This keeps the source of truth in one place.

---

## Context for shared application values

When data needs to be accessed by many components at different levels of the component tree, **Context** can help avoid passing props through many intermediate components.

Typical examples include:

- authenticated user information;
- theme preferences;
- locale;
- application-level configuration.

However, Context is not automatically a replacement for every state-management library.

Use the simplest approach that fits your application's requirements.

---

## Routing in React applications

A multi-page application often needs client-side navigation.

A common option is **React Router**.

For example:

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Install it with:

```bash
npm install react-router-dom
```

Routing becomes especially useful once your application contains multiple pages or views.

---

## Styling React applications

React doesn't force you to use a particular styling solution.

Common approaches include:

- plain CSS;
- CSS Modules;
- Tailwind CSS;
- CSS-in-JS solutions;
- component libraries.

For example, with regular CSS:

```jsx
function Button() {
  return (
    <button className="primary-button">
      Save
    </button>
  );
}
```

Choose a styling approach that matches the size and requirements of your project.

---

## Component composition

As your application grows, avoid putting everything into one enormous component.

Instead, compose smaller components:

```text
App
├─ Header
│  ├─ Logo
│  └─ Navigation
├─ Main
│  ├─ UserProfile
│  └─ Dashboard
│     ├─ StatisticsCard
│     └─ ActivityList
└─ Footer
```

This makes individual pieces easier to understand, test, and reuse.

---

## Common beginner mistakes

When learning React, a few mistakes appear frequently.

### 1. Mutating state directly

Avoid:

```jsx
user.name = "Robin";
```

Instead, create a new value and update state through its setter.

For example:

```jsx
setUser((currentUser) => ({
  ...currentUser,
  name: "Robin"
}));
```

### 2. Forgetting list keys

Avoid:

```jsx
users.map((user) => (
  <li>{user.name}</li>
))
```

Prefer:

```jsx
users.map((user) => (
  <li key={user.id}>{user.name}</li>
))
```

### 3. Putting everything in global state

Not every value needs Redux or another global state manager.

Start with local state and move state upward or into a shared solution only when necessary.

### 4. Using `useEffect` for everything

An effect is not a general-purpose replacement for event handlers, calculations, or ordinary JavaScript.

Use it when synchronization with an external system is actually required.

### 5. Ignoring loading and error states

An API-driven interface should account for at least:

```text
Loading
Success
Error
Empty
```

This makes the application much more reliable for users.

---

## A simple React application architecture

As your application grows, you can organize code by responsibility:

```text
src/
├─ components/
│  ├─ Button.jsx
│  ├─ Header.jsx
│  └─ UserCard.jsx
│
├─ pages/
│  ├─ Home.jsx
│  ├─ About.jsx
│  └─ Dashboard.jsx
│
├─ hooks/
│  └─ useUsers.js
│
├─ services/
│  └─ api.js
│
├─ App.jsx
├─ main.jsx
└─ index.css
```

There is no universal folder structure. Start simple and introduce additional organization when the application actually needs it.

---

## A small complete example

Here is a simple counter application combining components, state, and events:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((currentCount) => currentCount + 1);
  }

  function decrement() {
    setCount((currentCount) => currentCount - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <section>
      <h1>Counter</h1>

      <p>Current value: {count}</p>

      <button onClick={decrement}>
        -
      </button>

      <button onClick={reset}>
        Reset
      </button>

      <button onClick={increment}>
        +
      </button>
    </section>
  );
}

export default Counter;
```

This small example already demonstrates several important React concepts:

- components;
- state;
- event handlers;
- JSX;
- re-rendering;
- functional state updates.

---

## What to learn next

Once you're comfortable with the basics, continue in this order:

1. **JavaScript fundamentals** — arrays, objects, functions, modules, promises, and async/await.
2. **React Hooks** — especially `useState`, `useEffect`, `useContext`, and `useRef`.
3. **Forms and validation** — controlled inputs and reliable form handling.
4. **Routing** — build applications with multiple views.
5. **API integration** — communicate with Node.js and Express backends.
6. **Server-state management** — learn when tools such as TanStack Query are useful.
7. **Application state** — understand Context and libraries such as Redux Toolkit.
8. **Testing** — learn component, integration, and end-to-end testing.
9. **Performance** — learn about rendering, memoization, code splitting, and asset optimization.
10. **Accessibility** — build interfaces that work well for a wider range of users.
11. **Deployment** — learn how to build and deploy a production React application.

---

## Beginner project ideas

The fastest way to learn React is to build projects.

Try starting with:

| Project | Concepts you'll practice |
| --- | --- |
| **Counter** | State and events |
| **Todo app** | State, lists, forms |
| **Weather app** | API requests and loading states |
| **Movie search** | Search, API integration, conditional rendering |
| **Notes app** | Forms, state, persistence |
| **Expense tracker** | Forms, lists, derived data |
| **Job board** | Routing, APIs, reusable components |
| **Dashboard** | Layouts, charts, API data, state management |

Start with a small project and gradually add more features.

---

## React learning checklist

Use this as a practical checklist:

- [ ] Understand components.
- [ ] Understand JSX.
- [ ] Pass data using props.
- [ ] Manage state with `useState`.
- [ ] Handle user events.
- [ ] Render lists with stable keys.
- [ ] Use conditional rendering.
- [ ] Understand `useEffect`.
- [ ] Build controlled forms.
- [ ] Fetch data from an API.
- [ ] Handle loading and error states.
- [ ] Understand component composition.
- [ ] Learn Context when appropriate.
- [ ] Add routing.
- [ ] Learn basic testing.
- [ ] Build and deploy a real project.

---

## Final thoughts

React becomes much easier once you stop trying to memorize every API and start thinking in terms of **components, data, state, and user interactions**.

Start with a small application. Build a component, pass it some props, add state, handle an event, connect it to an API, and gradually introduce more advanced concepts.

You don't need a huge architecture to learn React. Build something useful, make mistakes, debug them, and keep improving.

The goal is not simply to learn React syntax. It's to learn how to build **maintainable, interactive, accessible, and reliable user interfaces**.

Happy coding! 🚀

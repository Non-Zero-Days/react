# react
Exercise walking through setting up a React application

## Prerequisites

- [Node/npm](https://nodejs.org/en/download)
  - Node and NPM will operate as our dependency management solution and our Javascript runtime.

## Create a web site without react

We can create a web site without react that leverages HTML for layout, CSS for styling, and Javascript for logic.

Create an `app-without-react` directory with the following files:

### `index.html`
```html
<!DOCTYPE html>
<html>
  <link rel="stylesheet" href="index.css" />
  <body>
    <div>
      <input id="popupText" type="text" />
      <input id="popupButton" type="submit" class="primary" />
    </div>
    <script src="popup.js"></script>
  </body>
</html>

```

### `index.css`
```css
.primary {
    background: powderblue
  }

```

### `popup.js`
```js
window.onload = function () {
    // Get a reference to the elements by their IDs
    const popupButton = document.getElementById('popupButton');
    const popupText = document.getElementById('popupText');
    
    // Function to display a popup
    function displayPopup(inputText) {
        if (inputText === '') {
            alert('Please type something!');
        } else {
            alert(inputText);
        } 
    }

    // Add a click event listener to the button
    popupButton.addEventListener('click', () => displayPopup(popupText?.value));
};
    
```

Open `/app-without-react/index.html` in a browser and observe you have a web site. You can click the button and interact with the text box.

## Create a react app

Create a new react app

```cli
npx create-react-app app-with-react --template typescript
```


> **Note** - When we build our application we're transpiling our Typescript into Javascript. [Typescript docs have a playground](https://www.typescriptlang.org/play) which does live transpiling.

```
cd app-with-react
npm install
npm start
```

Open a browser to `http://localhost:3000/` to view the application.


### Explore the react application

- The [public](/app-with-react/public/) directory contains static code including an index.html file which serves as the main entry point for our web application's layout. 
- The [src](/app-with-react/src/) directory contains our react code including an index.tsx file which specifies [where to plug in our react code](/app-with-react/src/index.tsx#L8) to [the static web code](/app-with-react/public/index.html#L31).
- The [package.json](/app-with-react/package.json) specifies our dependencies and the commands aligned with `npm run` commands 

### Components

React allows us to quickly re-render or replace portions of an application through sections of code called components. Components are small, self-contained pieces of your webpage that can have their own structure, behavior, and appearance. 

We can create a new component by adding a new file [/app-with-react/src/component-test/index.tsx](./app-with-react/src/component-test/index.tsx)

```typescript
import React, { FC } from 'react';

const ComponentTest : FC = () => {
    return <div>
        <h1>You can reuse this all over the place and it's super cool</h1>
    </div>
}

export default ComponentTest;
```

We can then use this component in our [App.tsx](./app-with-react/src/App.tsx)

```typescript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import ComponentTest from './component-test';

function App() {
  return (
    <div className="App">
      <ComponentTest />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```


You can pass properties to components as inputs to the functional component.

```typescript
import React, { FC } from 'react';

interface Props {
    displayText: string;
}

const ComponentTest : FC<Props> = ({displayText}) => {
    return <div>
        <h1>You can reuse this all over the place and it's super cool</h1>
        <h2>{displayText}</h2>
    </div>
}

export default ComponentTest;
```

You can pass these properties from the parent component 
```typescript
<ComponentTest displayText="banana"/>
```

### Lifecycle hooks

Hooks allow functional components to manage state and side effects. React offers [this documentation on built-in hooks](https://react.dev/reference/react/hooks). Here are some commonly used built-in hooks:

1. useState:

This hook allows you to add state to a functional component and triggers re-renders when the state value changes. Note - the change in value of a const does not necessarily trigger re-rendering.

We can demonstrate this with a new component in `/app-with-react/src/counter/index.tsx`

```typescript
import React, { FC, useState } from 'react';

export const Counter: FC = () => {
    const [count, setCount] = useState(0);

    return <div>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
}

```


2. useEffect:

This hook enables you to perform side effects in your component, such as data fetching, DOM manipulation, or setting up subscriptions.
It's like saying, "When something happens, do this."
For instance, you can use it to fetch data from an API when the component is rendered.

```typescript
import { FC, useEffect, useState } from "react";

export const DisplayApiData : FC = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const [data, setData] = useState<any | undefined>(undefined);

    useEffect(() => {
        fetch(apiUrl)
        .then((response) =>  response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });
    }, [])

    return <div>
        <h1>API Data</h1>
        <p>{data?.title ?? ''}</p>
        <p>{data?.body ?? ''}</p>
    </div>
}
```

**WIP**

3. useContext:

This hook is used to read and subscribe to a value. Although not required, it is commonly used alongside Context.Provider to offer 
import React, { FC, useContext } from 'react';

```ts
// Create a context
const MyContext = React.createContext<string>('default value');

// Component that consumes the context value
const ConsumerComponent: FC = () => {
  const contextValue = useContext(MyContext);

  return (
    <div>
      <h1>Context Value</h1>
      <p>{contextValue}</p>
    </div>
  );
};

// Component that provides the context value
const ProviderComponent: FC = () => {
  return (
    <MyContext.Provider value="Hello from context">
      <ConsumerComponent />
    </MyContext.Provider>
  );
};

export default ProviderComponent;
```

4. useRef:

The `useRef` hook in React allows you to capture a reference to an element or a value. It returns a mutable ref object that persists across re-renders.

Here's an example of using `useRef` to capture a reference to an input element as well an example to capture a reference to a value:

```typescript
import React, { FC, useRef } from 'react';

const ReferenceDemo: FC = () => {
    // We can use the useRef hook to store a reference to a DOM element
    const myElementRef = useRef<HTMLDivElement>(null);

    // We can also use the useRef hook to store a value that persists between renders
    const counter = useRef<number>(0);
    
    const handleClick = () => {
        if (myElementRef.current) {
            // Do something with the element, e.g. change its background color
            myElementRef.current.style.backgroundColor = 'red';
        }

        counter.current += 1;
        console.log({counter})
    };

    return (
        <div>
            <div ref={myElementRef}>This is my element</div>
            <button onClick={handleClick}>Click me</button>
            {/* Note that counter.current changing does not trigger a re-render */}
            <p>Counter: {counter.current}</p>
        </div>
    );
};

export default ReferenceDemo;

```


5. useReducer:

The `useReducer` hook allows managing complex changes to state such as when multiple values change at the same time or when there's a dependency on the previous state values. 

```typescript
import React, { FC, useReducer } from 'react';

// Define the reducer function
const reducer = (state: number, action: string) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

const ReducerCounter: FC = () => {
  // Use the useReducer hook to manage the counter state
  const [count, dispatch] = useReducer(reducer, 0);

  const handleIncrement = () => {
    dispatch('increment');
  };

  const handleDecrement = () => {
    dispatch('decrement');
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default ReducerCounter;
```

### Legacy

React originally offered class components, but since 2019 has been pushing functional components as the path forward with modern React.
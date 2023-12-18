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
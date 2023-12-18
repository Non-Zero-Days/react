import React, { FC } from "react";
import { useContext } from "react";

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
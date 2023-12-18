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

import React, { useState } from 'react';

const CounterComponent = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement} disabled={count === 0}>Decrement</button>
            <button onClick={reset}>Reset</button>
            {count > 0 ? <p>The count is positive.</p> : count < 0 ? <p>The count is negative.</p> : <p>The count is zero.</p>}
        </div>
    );
};

export default CounterComponent;

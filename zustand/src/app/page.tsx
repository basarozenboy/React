"use client";
import { useEffect } from "react";
import { useCounterStore } from "./store";

const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("count", count);
};

const App = () => {
  // Get the count from the store
  const count = useCounterStore((state) => state.count);
  useEffect(() => {
    logCount();
  }, []);

  return (
    <div>
      <OtherComponent count={count} />
    </div>
  );
};

const OtherComponent = ({ count }: { count: number }) => {
  // Get the increment and decrement functions from the store
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);
  return (
    <div>
      {count}
      <div>
        <button onClick={incrementAsync}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default App;

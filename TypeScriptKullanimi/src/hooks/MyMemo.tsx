import { useMemo } from "react";

export default function MyMemo({a, b}: {a: number, b: number}){
    const expensiveCalculation = (num: number) => {
        console.log("Expensive calculation is running...");
        return num *2;
    };

    const memorizedValue = useMemo(() => expensiveCalculation(a), [a]);
    return(
        <div>
            <p> Memorized Value: {memorizedValue}</p>
            <p>Prop B: {b}</p>
        </div>
    )
}
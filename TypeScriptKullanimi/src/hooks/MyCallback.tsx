import { useCallback } from "react";

export default function MyCallback({count}: {count:number}){
    const handleClick = useCallback(() => {
        console.log("Button clicked");
    }, [count]);

    return(
        <button onClick={handleClick}>Click me</button>
    )
}
import { useContext } from "react";
import { ThemeContext } from "./const/consts"

export default function ThemedButton(){
    const theme = useContext(ThemeContext);
    return (
        <button 
        style={
            { background: theme === "dark" ? "#333" : "#FFF" }
        }>Theme Button</button>
    );
}
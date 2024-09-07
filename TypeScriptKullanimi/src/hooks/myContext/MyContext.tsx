import Toolbar from "./Toolbar";
import {ThemeContext} from "./const/consts"

export default function MyContext(){
    return(
        <ThemeContext.Provider value="dark">
            <Toolbar/>
        </ThemeContext.Provider>
    )
}
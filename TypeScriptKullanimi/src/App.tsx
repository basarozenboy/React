import MyCallback from "./hooks/MyCallback";
import MyContext from "./hooks/myContext/MyContext";
import MyMemo from "./hooks/MyMemo";
{/*import MyReducer from "./hooks/MyReducer";*/}

export default function App() {

  return (
    <div>
      {/*<MyReducer/>*/}
      <MyContext></MyContext>
      <MyMemo a={1} b={2}></MyMemo>
      <MyCallback count={1}></MyCallback>
    </div>
  );
}
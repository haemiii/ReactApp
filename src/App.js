import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

// 1.
function Hello() {
  function destroyedFn() {
    console.log("destroyed :( ");
  }
  function effectFn() {
    console.log("created :)");
    return destroyedFn;
  }
  useEffect(effectFn, []);
  return <h1>Hello</h1>;
}
//2.
function Hello() {
  useEffect(function () {
    console.log("hi :)");
    return function () {
      console.log("bye :(");
    };
  }, []);

  //3.
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);
  return <h1>Hello</h1>;
}

function App() {
  // const [counter, setValue] = useState(0);
  // const [keyword, setKeyword] = useState("");
  // const onClick = () => setValue((prev) => prev + 1);
  // const onChange = (event) => setKeyword(event.target.value);
  // useEffect(() => {
  //   console.log("Call the API...");
  // }, []);
  // useEffect(() => {
  //   console.log("SEARCH FOR", keyword);
  // }, [keyword]); //if keyword changes this code will execute
  // return (
  //   <div>
  //     <input
  //       value={keyword}
  //       onChange={onChange}
  //       type="text"
  //       placeholder="Search here..."
  //     />
  //     <h1 className={styles.title}>Welcome back!</h1>
  //     <Button text={"Continue"} />
  //   </div>
  // );

  ///cleanup
  const [showing, setShowing] = useState(0);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      {/* javascript 사용시 curly bracket {} 사용*/}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;

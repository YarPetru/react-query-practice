// import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <Posts />
      {/* <PokemonList /> */}
      {/* <hr /> */}
      {/* <PokemonSearch /> */}
      {/* <hr /> */}
      {/* <Berries />
      <hr />
      <Count /> */}
      <ReactQueryDevtools />
    </>
  );
}

export default App;

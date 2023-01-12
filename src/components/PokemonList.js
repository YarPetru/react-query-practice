import { usePokemon } from "../hooks/use-pokemon";
import CountPokemons from "./CountPokemons";

const PokemonList = () => {
  const { data, isLoading, isFetching, isSuccess, isError } = usePokemon();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {isSuccess && (
        <>
          <div className="App">
            {data?.map((res) => {
              return <div key={res.name}>{res.name}</div>;
            })}
          </div>
          <CountPokemons data={data} />
        </>
      )}

      {!isLoading && isFetching && <p>Updating...</p>}
    </>
  );
};

export default PokemonList;

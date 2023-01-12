// import axios, { CancelToken } from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

const PokemonSearch = () => {
  const [pokemon, setPokemon] = useState("");

  const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery(
    ["pokemon", pokemon],
    () => {
      // ------ Query cancellation using fentch
      // 1 --- create abort controller
      const controller = new AbortController();
      // 2 --- create signal
      const signal = controller.signal;

      const promise = new Promise((resolve) => setTimeout(resolve, 1000))
        .then(() => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
            // 3--- add configs
            method: "get",
            signal,
          });
        })
        // 5 --- res.json() instead of res.data
        .then((res) => res.json());

      //4 --- add func to show react query how to cancell promise
      promise.cancel = () => {
        controller.abort();
      };
      return promise;
    },
    {
      retry: 1, // how many times try to get data after get back error
      retryDelay: 1000,
      enabled: !!pokemon, // query works just in case pokemon is present
    }
  );

  const handleInputChange = (e) => {
    setPokemon(e.target.value);
  };

  return (
    <>
      <input type="text" value={pokemon} onChange={handleInputChange} />
      <br />
      {isLoading && !isSuccess && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && data?.sprites?.front_default ? (
        <>
          <img
            className="poke-sprite"
            alt={`${pokemon}'s front`}
            src={data.sprites.front_default}
            width="200"
          />
          <img
            className="poke-sprite"
            alt={`${pokemon}'s back`}
            src={data.sprites.back_default}
            width="200"
          />
        </>
      ) : (
        <p>Pokemon not found</p>
      )}

      {!isLoading && isFetching && <p>Updating...</p>}
    </>
  );
};

export default PokemonSearch;

// ----basic version
// const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery(
//   ["pokemon", pokemon],

//   async () => {
//     return axios
//       .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//       .then((res) => res.data);
//   },
//   {
//     //configs
//   }
// );
//-----------------------------

// ---------query cancellation using axios
// const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery(
//   ["pokemon", pokemon],
//   () => {
//     // ------ Query cancellation
//     // 1 --- create cancallation source
//     const source = CancelToken.source();

//     // 2 --- create promise
//     const promise = new Promise((resolve) => setTimeout(resolve, 1000))
//       .then(() => {
//         return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
//           // 3--- passing cancel token to the axios call
//           cancelToken: source.token,
//         });
//       })
//       .then((res) => res.data);

//     //4 --- add func to show react query how to cancell promise
//     promise.cancel = () => {
//       source.cancel("Query was cancelled by React Query");
//     };
//     return promise;
//   }
// );

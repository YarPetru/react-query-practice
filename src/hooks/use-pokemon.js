import { useQuery } from "react-query";
import axios from "axios";

export const usePokemon = () => {
  return useQuery(
    "pokemons",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (true) {
      //   throw new Error("Test Error");
      // }
      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results);
    },
    {
      // ---------configs

      // initialData: ... // allows to do !FIRST (only first) render from existing data, without query to server
      // initialStale: true - TRUE does initial data stale, so app does refetch as usual with stale data

      // refetchOnWindowFocus: false, //------ refetch every time opened page
      staleTime: 10000, // ------ how long data stay fresh
      // staleTime: Infinity, // --------- does data fresh forever
      cacheTime: 50000, //------ how long data stay in cache (without to make hardloading data). 5mins by default
    }
  );
};

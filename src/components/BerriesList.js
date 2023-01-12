import axios from "axios";
import { useQuery } from "react-query";


const Berries = () => {
  const { data, isLoading, isFetching, isSuccess, isError } = useQuery(
    "berries",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get("https://pokeapi.co/api/v2/berry")
        .then((res) => res.data.results);
    }
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {isSuccess && (
        <div className="berries-list">
          {data?.map((res) => {
            return <div key={res.name}>{res.name}</div>;
          })}
        </div>
      )}

      {!isLoading && isFetching && <p>Updating...</p>}
    </>
  );
};

export default Berries;

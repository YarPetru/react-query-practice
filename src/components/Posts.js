import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const Posts = () => {
  const email = "Shanna@melissa.tv";

  const userDataQuery = useQuery(
    "user-data",
    async () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0]);
    },
    { retry: 1 }
  );

  const postsDataQuery = useQuery(
    "posts-data",
    async () => {
      return axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?user=${userDataQuery.data.id}`
        )
        .then((res) => res.data);
    },
    { enabled: !!userDataQuery.data?.id }
  );

  return (
    <>
      {userDataQuery.isLoading ? (
        "Loading user..."
      ) : (
        <div>
          User ID: {userDataQuery.data.id}
          <br />
          <br />
          {postsDataQuery.isIdle ? null : postsDataQuery.isLoading ? (
            "Loading posts..."
          ) : (
            <div>Post Count: {postsDataQuery.data.length} </div>
          )}
        </div>
      )}
    </>
  );
};

export default Posts;

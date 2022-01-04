import { Container } from "./Search.styles";
import { useState, useEffect } from "react";

import MasonryLayout from "../MasonryLayout/MasonryLayout";
import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";
import Spinner from "../Spinner/Spinner";
const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  return (
    <Container>
      {loading && <Spinner message="Searching for posts" />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Posts found</div>
      )}
    </Container>
  );
};

export default Search;

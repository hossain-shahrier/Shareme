import { Container } from "./Feed.styles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";

import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../Spinner/Spinner";
import { feedQuery, searchQuery } from "../../utils/data";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const { categoryId } = useParams();
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client
        .fetch(query)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(true);
      client
        .fetch(feedQuery)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoryId]);
  const ideaName = categoryId || "new";
  if (loading)
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  if (!posts?.length) return <h2>No posts available</h2>;
  return <Container>{posts && <MasonryLayout posts={posts} />}</Container>;
};

export default Feed;

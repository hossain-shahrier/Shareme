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
    setLoading(true);
    if (categoryId) {
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

  if (loading)
    return <Spinner message="We are adding new ideas to your feed" />;
  return <Container>{posts && <MasonryLayout posts={posts} />}</Container>;
};

export default Feed;

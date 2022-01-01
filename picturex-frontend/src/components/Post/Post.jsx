import { urlFor } from "../../client";
import { Container } from "./Post.styles";

const Post = ({ post }) => {
  const { postedBy, image, _id, destination } = post;
  return (
    <Container>
      <img
        className="rounded-lg w-full"
        alt="user-post"
        src={urlFor(image).width(250).url()}
      />
    </Container>
  );
};

export default Post;

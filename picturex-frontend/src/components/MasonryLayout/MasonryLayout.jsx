import Masonry from "react-masonry-css";

import Post from "../Post/Post";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
const MasonryLayout = ({ posts }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {posts?.map((post) => {
        return <Post key={post._id} post={post} className="w-max" />;
      })}
    </Masonry>
  );
};

export default MasonryLayout;

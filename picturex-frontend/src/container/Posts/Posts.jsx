// Styles
import { Container } from "./Posts.styles";

// Routes
import { Routes, Route } from "react-router-dom";

// Components
import {
  Navbar,
  Feed,
  PostDetail,
  CreatePost,
  Search,
} from "../../components/index";
import { useState } from "react";
const Posts = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Container className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />}></Route>
          <Route path="/category/:categoryId" element={<Feed />}></Route>
          <Route
            path="/post-detail/:postId"
            element={<PostDetail user={user} />}
          ></Route>
          <Route
            path="/create-post"
            element={<CreatePost user={user} />}
          ></Route>
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          ></Route>
        </Routes>
      </div>
    </Container>
  );
};

export default Posts;

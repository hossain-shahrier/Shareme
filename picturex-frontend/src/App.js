import { Routes, Route } from "react-router-dom";
import Login from "./container/Login/Login";
import Home from "./container/Home/Home";
const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;

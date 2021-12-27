// Styles
import { Container } from "./Home.styles";
// Utlis
import { userQuery } from "../../utils/data";
// packages
import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../../components";
import Post from "../Post/Post";
// Client
import { client } from "../../client";
import Logo from "../../assets/logo.png";
const Home = () => {
  const [user, setUser] = useState(null);
  // User Info
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  useEffect(() => {
    const query = userQuery(userInfo.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <Container className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => {
            setToggleSidebar(true);
          }}
        />
        <Link to="/">
          <img src={Logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}
    </Container>
  );
};

export default Home;

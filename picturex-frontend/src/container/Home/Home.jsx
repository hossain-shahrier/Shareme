// Styles
import {
  Container,
  CustomSidebar,
  Navbar,
  MainLogo,
  UserImage,
  SidebarWrapper,
  SidebarCloseContainer,
  Scroll,
} from "./Home.styles";
// Utlis
import { userQuery } from "../../utils/data";
// packages
import { useState, useRef, useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../../components";
import Posts from "../Posts/Posts";
// Client
import { client } from "../../client";
import Logo from "../../assets/logo.png";
const Home = () => {
  const [user, setUser] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);
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
  }, [userInfo.googleId]);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <Container className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <CustomSidebar className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </CustomSidebar>
      <CustomSidebar className="flex md:hidden flex-row">
        <Navbar className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <BiMenuAltLeft
            fontSize={25}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <MainLogo src={Logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <UserImage
              src={user?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </Navbar>
        {toggleSidebar && (
          <SidebarWrapper className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <SidebarCloseContainer className="absolute w-full flex justify-end items-center p-2">
              <MdClose
                fontSize={25}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </SidebarCloseContainer>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </SidebarWrapper>
        )}
      </CustomSidebar>
      <Scroll
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Posts user={user && user} />} />
        </Routes>
      </Scroll>
    </Container>
  );
};

export default Home;

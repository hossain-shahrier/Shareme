import {
  Container,
  Wrapper,
  Logo,
  SidebarHome,
  DiscoverText,
  isActiveStyle,
  isNotActiveStyle,
} from "./Sidebar.styles";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";
import logo from "../../assets/logo.png";
// Categories

import { categories } from "../../utils/data";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <Container className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <Wrapper className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <Logo src={logo} alt="logo" className="w-full" />
        </Link>
        <SidebarHome className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <DiscoverText className="mt-2 px-5 text-base 2xl:text-xl ">
            Discover categories
          </DiscoverText>
          {categories.slice(0, categories.length - 1).map((category) => {
            return (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={category.name}
              >
                <img
                  src={category.image}
                  className="w-8 h-8 rounded-full shadow-sm"
                  alt="category"
                />
                {category.name}
              </NavLink>
            );
          })}
        </SidebarHome>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;

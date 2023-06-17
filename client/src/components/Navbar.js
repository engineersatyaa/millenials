import styled from "styled-components";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { Chat, Notifications, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Nav = styled.nav`
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.5);
  background-color: #1877f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: sticky;
  top: 0px;
  z-index: 99;
  padding: 0px 20px;
`;

const LogoContainer = styled.div`
  /* border: 1px solid black; */
  .link {
    text-decoration: none;
    color: white;
    font-size: 30px;
    font-weight: 500;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  margin: 0px 25px;
  border-radius: 20px;
  width: 45%;
  overflow: hidden;

  .search-icon {
    color: gray;
    margin-right: 5px;
  }

  input {
    background-color: #f0f2f5;
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 0px;
    font-size: 16px;
  }
`;

const NavIconContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  div.icon-container {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .icon {
      color: white;
      cursor: pointer;
    }
  }

  .img-link {
    /* background-color: red; */
    display: flex;
    align-items: center;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

//========================================================

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Nav>
      <LogoContainer>
        <Link to="/" className="link" title="Home">
          Millennials
        </Link>
      </LogoContainer>

      <SearchContainer>
        <Search className="search-icon" />
        <input type="text" placeholder="Search..." />
      </SearchContainer>

      <NavIconContainer>
        <div className="icon-container">
          <Link to="/messenger">
            <Badge badgeContent={2} color="warning">
              <Chat className="icon" />
            </Badge>
          </Link>

          <Link to={"/"}>
            <Badge badgeContent={3} color="warning">
              <Notifications className="icon" />
            </Badge>
          </Link>
        </div>

        <Link
          to={`/profile/${currentUser?._id}`}
          className="img-link"
          title="Profile"
        >
          <img src={currentUser?.profilePic || "/images/faceless.jpg"} alt="" />
        </Link>
      </NavIconContainer>
    </Nav>
  );
};

export default Navbar;

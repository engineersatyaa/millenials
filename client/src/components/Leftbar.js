import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Chat,
  DeleteForever,
  Diversity1,
  Diversity3,
  ExitToApp,
  Feed,
  Home,
  HourglassBottom,
  ManageAccounts,
  Notifications,
  SettingsRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchingSuccess } from "../redux/userSlice";

const Container = styled.aside`
  /* border: 1px solid black; */
  background-image: linear-gradient(150deg, #f0f2f5, #d5e5ff, #f0f2f5);
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 15px 10px;
  position: sticky;
  top: 60px;
  left: 0px;
  overflow-x: hidden;
  overflow-y: scroll;

  //-----Scrollbar CSS Code---------

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }

  //---------------------------------

  ul {
    /* border: 1px solid red; */
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      /* border: 1px solid blue; */

      &:first-child {
        border-bottom: 1.5px solid lightgray;
        padding-bottom: 10px;

        span {
          font-size: 18px;
          font-weight: 700;
        }
      }

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }

      .links {
        /* border: 1px solid red; */
        text-decoration: none;
        color: black;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px;

        &:hover {
          background-color: #c2d9ff;
          border-radius: 3px;
        }
      }
    }
  }

  footer {
    border-top: 1.5px solid lightgray;
    padding-top: 10px;
    margin-top: 25px;
    color: gray;
    font-size: 13px;
    text-align: center;
  }
`;

//======================================================

const Leftbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // To clear persisted currentUser data in userSlice's initialState on Logout.
  const handleLogout = () => {
    dispatch(fetchingSuccess(null));
  };

  return (
    <Container>
      <ul>
        <li>
          <Link to={`/profile/${currentUser._id}`} className="links">
            <img
              src={currentUser?.profilePic || "/images/faceless.jpg"}
              alt=""
            />
            <span className="hideOnPhoneMode">{currentUser?.userName}</span>
          </Link>
        </li>

        <li>
          <Link to="/" className="links">
            <Home className="icon" />
            <span className="hideOnPhoneMode">Home</span>
          </Link>
        </li>

        <li>
          <Link to={"/profile/" + currentUser._id} className="links">
            <HourglassBottom className="icon" />
            <span className="hideOnPhoneMode">Timeline</span>
          </Link>
        </li>

        <li>
          <Link to="/" className="links">
            <Feed className="icon" />
            <span className="hideOnPhoneMode">Feed</span>
          </Link>
        </li>

        <li>
          <Link to={`/followers/${currentUser?._id}`} className="links">
            <Diversity1 className="icon" />
            <span className="hideOnPhoneMode">Follower</span>
          </Link>
        </li>

        <li>
          <Link to={`/followings/${currentUser?._id}`} className="links">
            <Diversity3 className="icon" />
            <span className="hideOnPhoneMode">Following</span>
          </Link>
        </li>

        <li>
          <Link to={"/messenger/" + currentUser._id} className="links">
            <Chat className="icon" />
            <span className="hideOnPhoneMode">Message</span>
          </Link>
        </li>

        <li>
          <Link to="/" className="links">
            <Notifications className="icon" />
            <span className="hideOnPhoneMode">Notification</span>
          </Link>
        </li>

        <li>
          <Link to="/" className="links">
            <SettingsRounded className="icon" />
            <span className="hideOnPhoneMode">Settings</span>
          </Link>
        </li>

        <li>
          <Link to="/" className="links">
            <ManageAccounts className="icon" />
            <span className="hideOnPhoneMode">Update Account</span>
          </Link>
        </li>

        <li>
          <Link to="/" className="links">
            <DeleteForever className="icon" />
            <span className="hideOnPhoneMode">Delete Account</span>
          </Link>
        </li>

        <li>
          <Link to="/login" className="links" onClick={handleLogout}>
            <ExitToApp className="icon" />
            <span className="hideOnPhoneMode">Logout</span>
          </Link>
        </li>
      </ul>

      <footer>
        Copyright &#169; 2022 - {new Date().getFullYear()} Millennials&#8482;.
        <br />
        All rights reserved.
      </footer>
    </Container>
  );
};

export default Leftbar;

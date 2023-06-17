import { AssignmentInd, ChatRounded } from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";
import { publicRequest } from "../utils/requestMethods";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";

//==================================================================

const MainContainer = styled.div`
  /* border: 2px solid black; */
  display: flex;

  div.middleContainer {
    flex: 3;

    h3 {
      border-bottom: 1px solid #e8e8e8;
      margin: 10px 15px 0px;
      padding: 15px 0px 22px;
      color: #8e8e8e;
      text-transform: capitalize;
    }

    ul {
      /* border: 1px solid blue; */
      list-style: none;
      padding: 0px 15px;

      li {
        border-bottom: 1px solid #e8e8e8;
        padding: 15px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;

        div.imgAndInfo {
          /* border: 1px solid red; */
          display: flex;
          align-items: center;
          gap: 8px;

          .link {
            display: flex;
            cursor: pointer;

            img {
              width: 42px;
              height: 42px;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          div.info {
            .link {
              text-decoration: none;
              color: black;
              cursor: pointer;

              &:hover {
                color: #2061ca;
                text-decoration: underline 1px;
                text-underline-offset: 1.5px;
              }
            }

            p {
              font-size: 14px;
              color: #8e8e8e;
            }
          }
        }

        div.btnContainer {
          /* border: 1px solid red; */
          display: flex;
          gap: 10px;

          .btn-link {
            text-decoration: none;

            button {
              background-color: #1b74e4;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 5px;
              padding: 6px 10px;
              width: 101px;
              border: none;
              border-radius: 4px;
              color: white;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;

              &:hover {
                background-color: #2061ca;
              }

              &.msg-btn {
                background-color: #42b72a;

                &.msg-btn:hover {
                  background-color: #25a60b;
                }
              }
            }
          }
        }
      }
    }
  }
`;

//==================================================================

const FollowerOrFollowing = () => {
  const [otherUsers, setOtherUsers] = useState([]);
  const currentUserId = useParams().userId;
  const followers_Or_followings = useLocation().pathname.split("/")[1];

  // Fetching followers or followings list

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await publicRequest.get(
          `/users/${followers_Or_followings}/${currentUserId}`
        );

        setOtherUsers(res.data);
      } catch (error) {
        console.log(error);
        alert("Oops... Something went wrong.");
      }
    };

    fetchOtherUsers();
  }, [currentUserId, followers_Or_followings]);

  // Sorting according to user's name
  const sortedOtherUsers = otherUsers.sort((a, b) => {
    return a.userName.toLowerCase() > b.userName.toLowerCase() ? 1 : -1;
  });

  return (
    <>
      <Navbar />
      <MainContainer>
        <Leftbar />
        <div className="middleContainer">
          <h3>
            Total {followers_Or_followings} : {otherUsers.length}
          </h3>

          <ul>
            {sortedOtherUsers.map((otherUser, index) => (
              <li key={index}>
                <div className="imgAndInfo">
                  <Link to={`/profile/${otherUser?._id}`} className="link">
                    <img
                      src={otherUser?.profilePic || "/images/faceless.jpg"}
                      alt=""
                    />
                  </Link>

                  <div className="info">
                    <Link to={`/profile/${otherUser?._id}`} className="link">
                      <h4>{otherUser?.userName}</h4>
                    </Link>
                    <p>{`${otherUser.city} ${otherUser.country}`}</p>
                  </div>
                </div>

                <div className="btnContainer">
                  <Link to={"/profile/" + otherUser?._id} className="btn-link">
                    <button>
                      <AssignmentInd />
                      <span className="hideOnMob">Profile</span>
                    </button>
                  </Link>

                  <Link to={`/messenger/${currentUserId}`} className="btn-link">
                    <button className="msg-btn">
                      <ChatRounded />
                      <span className="hideOnMob">Message</span>
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Rightbar />
      </MainContainer>
    </>
  );
};

export default FollowerOrFollowing;

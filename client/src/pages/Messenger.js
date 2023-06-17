import { Send } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import OnlineFriends from "../components/OnlineFriends";

const Container = styled.div`
  /* border: 1px solid red; */
  background-image: linear-gradient(150deg, #f0f2f5, #d5e5ff, #f0f2f5);
  height: calc(100vh - 60px);
  display: flex;

  *::-webkit-scrollbar {
    width: 7px;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }

  //------------------------------------------
  div.chatMenu {
    border-right: 1px solid #a3a3a3;
    flex: 1;
    padding: 15px;
    overflow-y: scroll;
    position: relative;

    input {
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
      padding: 10px;
      border: none;
      outline: none;
      border-radius: 3px;
      background-color: #f0f2f5;
      width: 100%;
      font-size: 15px;
      color: gray;
      position: sticky;
      top: 0px;
    }

    ul {
      /* border: 1px solid blue; */
      list-style: none;
      margin-top: 15px;

      li {
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0px;
        }

        &:hover {
          background-color: #c2d9ff;
          border-radius: 3px;
        }

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
        }

        span {
          font-weight: 500;
        }
      }
    }
  }

  //------------------------------------------
  div.chatBox {
    /* border: 1px solid red; */
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 15px;

    div.chatBoxWrapper {
      /* border: 1px solid blue; */
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 15px 10px 0px;
      overflow-y: scroll;

      div.msgContainer {
        /* border: 1px solid red; */

        div.imgTxtContainer {
          /* border: 1px solid blue; */
          display: flex;
          gap: 5px;

          .img-link {
            /* background-color: red; */
            height: 35px;
            cursor: pointer;

            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          p {
            /* font-family: "Times New Roman", Times, serif; */
            background-color: #b4d0ff;
            border: 1px solid #b4bec6;
            padding: 5px 10px;
            border-radius: 10px;
            max-width: 60%;
            font-size: 15px;
          }
        }

        div.timeContainer {
          /* border: 1px solid blue; */
          margin-top: 2px;
          padding: 0px 45px;
          font-size: 12px;
          color: gray;
        }

        div.own {
          justify-content: flex-end;

          .img-link {
            order: 1;
          }

          p {
            background-color: #fff;
          }
        }

        div.ownTime {
          text-align: end;
        }
      }
    }

    div.typeBox {
      /* border: 1px solid red; */
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      padding: 0px 10px;

      input {
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        border: 1px solid #acacac;
        border-radius: 3px;
        width: 100%;
        height: 45px;
        font-size: 15px;
        padding: 10px;
        outline: none;
      }

      button {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
        width: 90px;
        height: 45px;
        background-color: #1b74e4;
        border: 1px solid #1b74e4;
        border-radius: 3px;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: #2061ca;
        }
      }
    }
  }

  //------------------------------------------
  div.onlineFrndContainer {
    border-left: 1px solid #a3a3a3;
    flex: 1;
    padding: 15px;
    overflow-y: scroll;
  }
`;

//======================================================

const Messenger = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="chatMenu">
          <input type="text" placeholder="Search Friends..." />
          <ul>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
            <li>
              <img src="/images/faceless.jpg" alt="" />
              <span>Sameer Jadaun</span>
            </li>
          </ul>
        </div>

        <div className="chatBox">
          {
            <div className="chatBoxWrapper">
              <div className="msgContainer">
                <div className="imgTxtContainer">
                  <Link to={"/"} className="img-link">
                    <img src="/images/faceless.jpg" alt="" />
                  </Link>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur doloribus esse accusantium sunt quia. Voluptates
                    dolore sit quos minus laborum magni laboriosam? Libero natus
                    quos et labore magni eius aliquam?
                  </p>
                </div>
                <div className="timeContainer">1 hour ago</div>
              </div>

              <div className="msgContainer">
                <div
                  className={true ? "imgTxtContainer own" : "imgTxtContainer"}
                >
                  <Link to={"/"} className="img-link">
                    <img src="/images/faceless.jpg" alt="" />
                  </Link>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ratione sapiente molestiae vel libero nam molestias sed non
                    ad soluta totam?
                  </p>
                </div>
                <div
                  className={true ? "timeContainer ownTime" : "timeContainer"}
                >
                  1 hour ago
                </div>
              </div>

              <div className="msgContainer">
                <div className="imgTxtContainer">
                  <Link to={"/"} className="img-link">
                    <img src="/images/faceless.jpg" alt="" />
                  </Link>
                  <p>
                    Sameer, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="timeContainer">1 hour ago</div>
              </div>
            </div>
          }

          <div className="typeBox">
            <input type="text" placeholder="Write here..." />
            <button>
              <Send />
            </button>
          </div>
        </div>

        <div className="onlineFrndContainer">
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
        </div>
      </Container>
    </>
  );
};

export default Messenger;

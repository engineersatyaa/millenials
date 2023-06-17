import styled from "styled-components";
import OnlineFriends from "./OnlineFriends";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.aside`
  /* border: 1px solid black; */
  background-image: linear-gradient(150deg, #f0f2f5, #d5e5ff, #f0f2f5);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
  right: 0px;
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
`;

const BirthdayContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  gap: 2px;

  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
  }

  span {
    padding-top: 6px;
    font-size: 13px;

    .link {
      text-decoration: none;
      color: black;
      font-weight: 700;

      &:hover {
        text-decoration: underline 1px;
        text-underline-offset: 1.5px;
        color: #2061ca;
      }
    }
  }
`;

const AdContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  position: relative;

  span {
    color: #f02849;
    font-size: 18px;
    font-weight: 700;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    10% {
      transform: scale(0.8);
    }
    90% {
      transform: rotateY(360deg);
    }
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  div.icon-container {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    cursor: pointer;

    .close-icon {
      font-size: 15px;
      background-color: #dadbde;
    }
  }
`;

//======================================================

const Rightbar = () => {
  const [hideAd, setHideAd] = useState(true);

  return (
    <Container>
      <BirthdayContainer>
        <img src="/images/gift.png" alt="" />
        <span>
          <Link to={"/"} className="link">
            Amit Thakur
          </Link>{" "}
          and{" "}
          <Link to={"/"} className="link">
            5 other friends
          </Link>{" "}
          have birthday today.
        </span>
      </BirthdayContainer>

      {hideAd && (
        <AdContainer>
          <span>Shop Now !</span>
          <img src="/images/rdr2.jpg" alt="advertisement" />
          <div className="icon-container" onClick={() => setHideAd(false)}>
            <Close className="close-icon" />
          </div>
        </AdContainer>
      )}

      <OnlineFriends />
    </Container>
  );
};

export default Rightbar;

import { useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.4);
  background-color: #f3f6fd;
  border-radius: 10px;
  margin: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 30px;
    color: #5b5b5b;
  }

  h2 {
    color: #0176d2;
  }

  p {
    color: gray;

    b {
      color: #5b5b5b;
    }
  }

  img {
    /* border: 1px solid red; */
    height: 250px;
    object-fit: contain;
  }
`;

//======================================================

const WelcomePost = ({ profileUser }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <h1>Welcome</h1>
      <h2>{currentUser.userName}</h2>

      {profileUser && profileUser._id !== currentUser._id ? (
        <p>
          Share your thoughts with <b>{profileUser.userName}</b> by posting or
          message privately.
        </p>
      ) : (
        <p>
          Start posting your thoughts, follow peoples and connect with them.
        </p>
      )}

      <img src="/images/boy.png" alt="" />
      <p>
        <b>{profileUser?.userName || currentUser.userName}</b> started using
        <b> Millennials&#8482; </b>
        {moment(
          new Date(profileUser?.createdAt || currentUser.createdAt)
        ).fromNow()}
        .
      </p>
    </Container>
  );
};

export default WelcomePost;

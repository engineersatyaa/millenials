import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* border: 1px solid black; */

  h4 {
    border-bottom: 1.5px solid lightgray;
    font-size: 18px;
    margin-bottom: 10px;
    padding-bottom: 3px;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      /* border: 1px solid red; */
      display: flex;
      align-items: center;
      gap: 5px;

      .frnd-link {
        /* border: 1px solid blue; */
        display: inline-block !important;
        text-decoration: none;
        color: black;
        font-size: 14px;
        font-weight: 700;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: 5px;
        }

        &:hover {
          text-decoration: underline 1px;
          text-underline-offset: 1.5px;
          color: #2061ca;
        }
      }

      .for-online-badge {
        position: relative;

        span.online-badge {
          background-color: #13dc13;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 1px solid white;
          position: absolute;
          top: 3px;
          right: -1px;
        }
      }
    }
  }
`;

//======================================================

const OnlineFriends = () => {
  return (
    <Container>
      <h4>Online Friends</h4>
      <ul>
        <li>
          <Link to={"/"} className="frnd-link for-online-badge">
            <img src="/images/faceless.jpg" alt="" />
            <span className="online-badge"></span>
          </Link>

          <Link to={"/"} className="frnd-link">
            Nisha Verma
          </Link>
        </li>
        <li>
          <Link to={"/"} className="frnd-link for-online-badge">
            <img src="/images/faceless.jpg" alt="" />
            <span className="online-badge"></span>
          </Link>

          <Link to={"/"} className="frnd-link">
            Nisha Verma
          </Link>
        </li>
        <li>
          <Link to={"/"} className="frnd-link for-online-badge">
            <img src="/images/faceless.jpg" alt="" />
            <span className="online-badge"></span>
          </Link>

          <Link to={"/"} className="frnd-link">
            Nisha Verma
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default OnlineFriends;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { publicRequest } from "../utils/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingFailure,
  fetchingStart,
  fetchingSuccess,
} from "../redux/userSlice";

//=================================================================

const Container = styled.div`
  background-color: #f0f2f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 426px) {
    background-image: linear-gradient(150deg, #f0f2f5, #d5e5ff, #f0f2f5);
  }
`;

const Wrapper = styled.div`
  /* border: 1px solid blue; */
  background-image: linear-gradient(150deg, #f0f2f5, #d5e5ff, #f0f2f5);
  padding-left: 20px;
  height: calc(100vh - 55px);
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 0px;
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  @media (max-width: 768px) {
    flex: none;
    margin-bottom: 25px;
    padding: 0px 15px;
  }

  h1 {
    color: #1877f2;
    font-size: 52px;
    font-weight: 900;

    @media (max-width: 768px) {
      font-size: 35px;
    }

    @media (max-width: 426px) {
      font-size: 30px;
    }
  }

  p {
    color: #054c82;
    font-size: 28px;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 426px) {
      font-size: 18px;
    }
  }
`;

const FormContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  @media (max-width: 768px) {
    flex: none;
  }
`;

const FormWrapper = styled.div`
  box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 75%;
  text-align: center;

  @media (max-width: 650px) {
    width: 90%;
  }

  @media (max-width: 426px) {
    box-shadow: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input {
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 10px;
      outline: none;
      font-size: 15px;
    }

    span.errMsg {
      color: red;
      font-size: 15px;
    }
  }

  p {
    margin: 10px 0px;
    font-size: 15px;

    .password-reset-link {
      text-decoration: none;
      color: #2874f0;
      cursor: pointer;

      &:hover {
        text-decoration: underline 1px;
        text-underline-offset: 4px;
        /* text-decoration-thickness: 1px; */
      }
    }
  }

  div.termNcondition {
    border-bottom: 1px solid lightgray;
    margin-bottom: 15px;
    padding-bottom: 10px;
    font-size: 13px;
    color: gray;

    span {
      color: #2874f0;
      cursor: pointer;
    }
  }
`;

const Button = styled.button`
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 5px;
  color: white;
  width: 100%;
  min-height: 44px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:disabled {
    cursor: default;
  }
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  margin: 0px auto;
  border: 3.5px solid #06408b;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CopyrightTxt = styled.div`
  /* border: 1px solid red; */
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 345px) {
    flex-direction: column;
  }

  span {
    font-size: 13px;
    color: gray;
    text-align: center;
  }
`;

//=================================================================

const Login = () => {
  const phoneEmail = useRef(null);
  const password = useRef(null);

  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // To clear persisted error data in userSlice's initialState on refresh page.
  useEffect(() => {
    dispatch(fetchingFailure(null));
  }, [dispatch]);

  // Fetching user data on login
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchUser = async () => {
      dispatch(fetchingStart());
      try {
        const res = await publicRequest.post("/auth/login", {
          phoneEmail: phoneEmail.current.value,
          password: password.current.value,
        });
        dispatch(fetchingSuccess(res.data));
      } catch (error) {
        dispatch(fetchingFailure(error.response.data));
      }
    };

    fetchUser();
  };

  return (
    <Container>
      <Wrapper>
        <LogoContainer>
          <h1>Millennials</h1>
          <p>A social media platform to connect with peoples.</p>
        </LogoContainer>
        <FormContainer>
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Phone number or e-mail"
                required
                autoComplete="off"
                ref={phoneEmail}
              />

              <input
                type="password"
                placeholder="Password"
                required
                ref={password}
              />

              {(error?.status === 404 && (
                <span className="errMsg">{error?.message}</span>
              )) ||
                (error?.status === 401 && (
                  <span className="errMsg">{error?.message}</span>
                )) ||
                (error && (
                  <span className="errMsg">
                    Internal server error. Please try after some time
                  </span>
                ))}

              <Button
                type="submit"
                color="#1877f2"
                hoverColor="#0c5cde"
                disabled={isFetching}
              >
                {isFetching ? <Spinner></Spinner> : "Login"}
              </Button>
            </form>
            <p>
              <Link to="/passwordReset" className="password-reset-link">
                <span>Forgotten password ?</span>
              </Link>
            </p>

            <div className="termNcondition">
              By logging in or creating an account, you agree with our
              <span> Terms & Conditions</span> and
              <span> Privacy Statement</span>.
            </div>

            <Link to="/register">
              <Button type="button" color="#42b72a" hoverColor="#25a60b">
                Create New Account
              </Button>
            </Link>
          </FormWrapper>
        </FormContainer>
      </Wrapper>
      <CopyrightTxt>
        <span>
          Copyright &#169; 2022 - {new Date().getFullYear()} Millennials&#8482;.
        </span>
        <span>
          <pre> All rights reserved.</pre>
        </span>
      </CopyrightTxt>
    </Container>
  );
};

export default Login;

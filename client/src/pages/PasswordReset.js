import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const SearchConatiner = styled.div`
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

  h2 {
    color: #054c84;
    @media (max-width: 426px) {
      font-size: 20px;
    }
  }

  p {
    color: #054c84;
    font-size: 16px;
    @media (max-width: 426px) {
      font-size: 15px;
    }
  }

  form {
    margin: 15px 0px;
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
  }
`;

const PassResetContainer = styled(SearchConatiner)`
  div.img {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    gap: 2px;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;

      @media (max-width: 426px) {
        width: 50px;
        height: 50px;
      }
    }

    span {
      font-size: 15px;
      color: gray;
    }
  }

  form div.radio {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    font-size: 15px;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: space-around;

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 3px;

      &:nth-child(1) {
        margin-right: 10px;
      }
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

const PasswordReset = () => {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Wrapper>
        <LogoContainer>
          <h1>Millennials</h1>
          <p>A social media platform to connect with peoples.</p>
        </LogoContainer>
        <FormContainer>
          {show ? (
            <SearchConatiner>
              <h2>Find Your Account</h2>

              <p>
                Please enter your phone number or email address to search for
                your account.
              </p>

              <form>
                <input
                  type="text"
                  placeholder="Phone number or e-mail"
                  required
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  color="#1877f2"
                  hoverColor="#0c5cde"
                  onClick={() => setShow(false)}
                >
                  Search
                </Button>
              </form>

              <Link to="/login">
                <Button type="button" color="#42b72a" hoverColor="#25a60b">
                  Back to login
                </Button>
              </Link>
            </SearchConatiner>
          ) : (
            <PassResetContainer>
              <h2>Reset Your Password</h2>

              <div className="img">
                <img
                  src={false ? "getImgSrc" : "/images/faceless.jpg"}
                  alt="user"
                />
                <span>
                  {false ? (
                    "getUserName"
                  ) : (
                    <span style={{ color: "red" }}>user not found</span>
                  )}
                </span>
                <span>{false ? "getUserPhoneOrEmail" : ""}</span>
              </div>

              {true && (
                <>
                  <p>
                    How do you want to receive the code to reset your password ?
                  </p>

                  <form>
                    <div className="radio">
                      <label>
                        <input type="radio" name="radio" required /> via SMS
                      </label>
                      <label>
                        <input type="radio" name="radio" required /> via Email
                      </label>
                    </div>

                    <Button type="submit" color="#1877f2" hoverColor="#0c5cde">
                      Continue
                    </Button>
                  </form>
                </>
              )}

              <Button
                type="button"
                color="#42b72a"
                hoverColor="#25a60b"
                onClick={() => setShow(true)}
              >
                {false ? "Not You ?" : "Go Back"}
              </Button>
            </PassResetContainer>
          )}
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

export default PasswordReset;

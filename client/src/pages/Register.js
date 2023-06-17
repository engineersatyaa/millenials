import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { publicRequest } from "../utils/requestMethods";
import styled from "styled-components";
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

    div.passInputContainer {
      border: 1px solid lightgray;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      input.passwordInput {
        width: 100%;
        border: none;
      }

      div.iconContainer {
        /* border: 1px solid blue; */
        display: flex;
        align-items: center;
        padding: 0px 10px;
        cursor: pointer;

        .icon {
          color: #535353;
          font-size: 20px;
        }
      }
    }

    div.gender {
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 10px;
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

        &:nth-child(2) {
          margin: 0px 10px;
        }
      }
    }

    span {
      color: red;
      font-size: 15px;
    }
  }

  div.termNcondition {
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
    margin: 10px 0px 15px;
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

const Register = () => {
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const [inputValues, setInputValues] = useState({});

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  /* Extracting "confirmPassword" property from "inputValues" object 
  bcoz we are not gonna send this property with object in API call.*/
  const { confirmPassword, ...inputDataObj } = inputValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputDataObj.password === confirmPassword) {
      const fetchUser = async () => {
        dispatch(fetchingStart());
        try {
          const res = await publicRequest.post("/auth/register", inputDataObj);
          dispatch(fetchingSuccess(res.data));
        } catch (error) {
          dispatch(fetchingFailure(error.response?.data));
        }
      };

      fetchUser();
    } else {
      setShowPasswordErrorMsg(true);
    }
  };

  // To clear persisted error data in userSlice's initialState on refresh page.
  useEffect(() => {
    dispatch(fetchingFailure(null));
  }, [dispatch]);

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
                name="userName"
                placeholder="Name"
                pattern="[a-zA-Z][a-zA-Z ]*[a-zA-Z]$"
                title="Numbers,Special Characters and Spaces at the start or end are not allowed."
                required
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneEmail"
                placeholder="Phone number or e-mail"
                pattern="^(?:\d{10}|\w+@\w+\.\w{2,3})$"
                title="Valid E-mail or Phone Number of 10 digit without country code."
                required
                autoComplete="off"
                onChange={handleChange}
              />

              <div className="passInputContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New password"
                  pattern="^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$"
                  title="Your password must include at least 3 Lowercase letters, 2 Uppercase letters, 2 Numbers, 1 Special Character and a length of minimum 8 characters."
                  required
                  className="passwordInput"
                  onChange={handleChange}
                  onFocus={() => setShowPasswordErrorMsg(false)}
                />

                <div
                  className="iconContainer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Visibility className="icon" />
                  ) : (
                    <VisibilityOff className="icon" />
                  )}
                </div>
              </div>

              <div className="passInputContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  className="passwordInput"
                  onChange={handleChange}
                  onFocus={() => setShowPasswordErrorMsg(false)}
                />

                <div
                  className="iconContainer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Visibility className="icon" />
                  ) : (
                    <VisibilityOff className="icon" />
                  )}
                </div>
              </div>

              <div className="gender">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    required
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    required
                    onChange={handleChange}
                  />
                  Female
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    required
                    onChange={handleChange}
                  />
                  Others
                </label>
              </div>

              {(showPasswordErrorMsg && <span>Password not matched.</span>) ||
                (error?.status === 400 && <span>{error?.message}</span>) ||
                (error && (
                  <span>Internal server error. Please try after some time</span>
                ))}

              <Button type="submit" color="#1877f2" hoverColor="#0c5cde">
                {isFetching ? <Spinner></Spinner> : "Register"}
              </Button>
            </form>

            <div className="termNcondition">
              By logging in or creating an account, you agree with our
              <span> Terms & Conditions</span> and
              <span> Privacy Statement</span>.
            </div>

            <Link to="/login">
              <Button type="button" color="#42b72a" hoverColor="#25a60b">
                Already have an account ?
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

export default Register;

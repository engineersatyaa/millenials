import { publicRequest } from "../utils/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import upload from "../utils/upload";
import { fetchingSuccess } from "../redux/userSlice";

import {
  BadgeRounded,
  CameraAlt,
  ChatRounded,
  Close,
  DeleteForever,
  Edit,
  Favorite,
  House,
  Male,
  Person,
  PersonAdd,
  PersonSharp,
  School,
} from "@mui/icons-material";

const Container = styled.div`
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.4);
  border-radius: 0px 0px 10px 10px;
  margin: 0px 3px;
  flex: 3;
`;

const Wrapper = styled.div`
  position: relative;

  div.userDeleteMsgContainer {
    /* border: 1px solid red; */
    position: absolute;
    top: 10px;
    z-index: 99;
    width: 100%;

    div.userDeleteMsgWrapper {
      box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.4);
      border: 1px solid black;
      background-color: #fff;
      border-radius: 5px;
      width: 80%;
      margin: 0px auto;
      padding: 20px 10px;

      h4 {
        text-align: center;
        margin-bottom: 20px;

        span {
          color: #d60303;
          font-size: 17px;
        }
      }

      div.btnContainer {
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;

        button {
          background-color: #d60303;
          border-radius: 3px;
          border: none;
          color: white;
          width: 80px;
          padding: 8px;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            background-color: #b20415;
          }

          &.cancelBtn {
            background-color: #42b72a;

            &:hover {
              background-color: #1f9d05;
            }
          }
        }
      }
    }
  }

  div.cover-img {
    /* border: 1px solid red; */
    border-radius: 0px 0px 10px 10px;
    aspect-ratio: 3 / 1;
    display: flex;
    position: relative;

    // To create a black blur on the bottom of a container.
    &::after {
      content: "";
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 25%;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 10%,
        rgba(0, 0, 0, 1) 100%
      );
      border-radius: 0px 0px 10px 10px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0px 0px 10px 10px;
    }

    label {
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 2;
      background-color: #f0f2f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 161px;
      height: 32px;
      padding: 4px 6px;
      border-radius: 4px;
      cursor: pointer;

      span {
        font-weight: 500;
      }
    }

    div.dp-and-name {
      /* border: 1px solid blue; */
      position: absolute;
      bottom: -135px;
      left: 0px;
      right: 0px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;

      h2 {
        font-size: 28px;
      }

      div.dpNbtn-container {
        background-color: #e1ebfa;
        width: 150px;
        height: 150px;
        border: 3px solid white;
        border-radius: 50%;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 1px solid #5b5b5b;
          border-radius: 50%;
        }

        label {
          background-color: #e4e6eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          width: 34px;
          padding: 5px;
          position: absolute;
          right: 0px;
          bottom: 10px;
          cursor: pointer;

          .dp-camera-icon {
            display: flex;
          }
        }
      }

      div.btn-container {
        /* border: 1px solid red; */
        display: flex;
        gap: 10px;
        min-height: 38px;

        button {
          background-color: #1b74e4;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px 10px;
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 15px;
          font-weight: 500;
          width: 130px;
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

  div.user-info {
    /* border: 1px solid red; */
    padding: 0px 20px 20px;
    margin-top: 150px;
    color: #5b5b5b;

    h2 {
      border-bottom: 1px solid lightgray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 2px;
      font-size: 22px;

      div.container {
        display: flex;
        gap: 5px;

        div {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e4e6eb;
          color: black;
          padding: 3px 5px;
          margin-bottom: 2px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 5px;

      li {
        display: flex;
        align-items: center;
        gap: 5px;

        span {
          font-size: 15px;
        }
      }
    }

    form {
      /* border: 1px solid blue; */
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 25px;

      h2 {
        border-bottom: 1px solid lightgray;
        margin-bottom: 5px;
        padding-bottom: 3px;
        font-size: 22px;
      }

      div {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        gap: 3px;
        font-weight: 700;

        input,
        textarea {
          border: 1px solid gray;
          border-radius: 3px;
          outline: none;
          padding: 7px 5px;
          font-size: 15px;
          resize: none; // For textarea
        }

        div.radio-btn-container {
          border: 1px solid gray;
          border-radius: 3px;
          padding: 7px 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          gap: 10px;

          div.radio-btn {
            /* border: 1px solid red; */
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2px;
            font-size: 15px;
            font-weight: normal;
          }
        }
      }

      button {
        background-color: #1b74e4;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px;
        margin-top: 5px;
        width: 115px;
        height: 38px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          background-color: #2061ca;
        }
      }
    }
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 3px solid #06408b;
  border-top-color: #e4e6eb;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

//============================================================================

const ProfileInfo = ({ profileUser, setProfileUser }) => {
  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [followed, setFollowed] = useState(false);

  // Updating "followed" state by actual response on page reload

  useEffect(() => {
    setFollowed(profileUser?.followers?.includes(currentUserId));
  }, [currentUserId, profileUser?.followers]);

  //-------- Follow or Unfollow other user -----------------------

  const followUnfollowUser = async () => {
    try {
      await publicRequest.put("/users/follow_unfollow", {
        userId: currentUserId,
        otherUserId: profileUser._id,
      });

      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  //-------- Updating Profile or Cover Image ----------------------

  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  /* Using "useEffect" hook to avoid an error which says
    "Warning: Cannot update a component X while rendering 
     a different component Y  etc." */

  useEffect(() => {
    const uploadImage = async () => {
      if (
        (file?.type.split("/")[0] || coverFile?.type.split("/")[0]) === "image"
      ) {
        setIsFetching(true);

        const imageUrl = await upload(file || coverFile);

        if (imageUrl !== "error") {
          const imageObj = file
            ? { profilePic: imageUrl }
            : { coverPic: imageUrl };

          try {
            const res = await publicRequest.put(
              `/users/update_user/${currentUserId}`,
              imageObj
            );

            /* Updating parent, "Profile.js" component's "profileUser" state by 
               taking below callback function as props.*/
            setProfileUser(res.data.updatedUser);

            // Updating current user
            dispatch(fetchingSuccess(res.data.updatedUser));

            file ? setFile(null) : setCoverFile(null);

            setIsFetching(false);
          } catch (error) {
            console.log(error);
            setIsFetching(false);
            alert("Oops... Something went wrong.");
          }
        }
      } else {
        file ? setFile(null) : setCoverFile(null);
        alert("Please select only image file.");
      }
    };

    (file || coverFile) && uploadImage();
  }, [file, coverFile, setProfileUser, dispatch, currentUserId]);

  //------ Update user details ---------------------------------

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();

    if (Object.keys(userInfo).length !== 0) {
      try {
        const res = await publicRequest.put(
          `/users/update_user/${currentUserId}`,
          userInfo
        );
        setProfileUser(res.data.updatedUser);

        // Updating current user
        dispatch(fetchingSuccess(res.data.updatedUser));
        setShowUpdateForm(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("There is no data to update user.");
    }
  };

  //------ Delete user account -------------------------------------

  const [showDeleteMsgBox, setShowDeleteMsgBox] = useState(false);

  const deleteUserAccount = async () => {
    try {
      await publicRequest.delete("/users/delete_user/" + currentUserId);
      dispatch(fetchingSuccess(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        {showDeleteMsgBox && (
          <div className="userDeleteMsgContainer">
            <div className="userDeleteMsgWrapper">
              <h4>
                <span>Warning:</span> You are about to permanently delete your
                account.
              </h4>

              <div className="btnContainer">
                <button
                  className="cancelBtn"
                  onClick={() => setShowDeleteMsgBox(false)}
                >
                  Cancel
                </button>

                <button onClick={deleteUserAccount}>Delete</button>
              </div>
            </div>
          </div>
        )}

        <div className="cover-img">
          <img
            src={profileUser?.coverPic || "/images/france.jpg"}
            alt="cover"
          />

          {currentUserId === profileUser?._id && (
            <label>
              {coverFile && isFetching ? <Spinner></Spinner> : <CameraAlt />}
              <span>Add Cover Photo</span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files[0])}
                disabled={isFetching}
                style={{ display: "none" }}
              />
            </label>
          )}

          <div className="dp-and-name">
            <div className="dpNbtn-container">
              <img
                src={profileUser?.profilePic || "/images/faceless.jpg"}
                alt=""
              />

              {currentUserId === profileUser?._id && (
                <label>
                  {file && isFetching ? (
                    <Spinner></Spinner>
                  ) : (
                    <CameraAlt className="dp-camera-icon" />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={isFetching}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>

            <h2>{profileUser?.userName}</h2>

            <div className="btn-container">
              {currentUserId !== profileUser?._id && (
                <>
                  <button onClick={followUnfollowUser}>
                    {followed ? <PersonSharp /> : <PersonAdd />}
                    {followed ? "Unfollow" : "Follow"}
                  </button>

                  <button className="msg-btn">
                    <ChatRounded /> Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="user-info">
          <h2>
            <span>About</span>

            {currentUserId === profileUser?._id && (
              <div className="container">
                <div
                  title="Update Account"
                  onClick={() => setShowUpdateForm(!showUpdateForm)}
                >
                  {showUpdateForm ? <Close /> : <Edit />}
                </div>

                <div
                  title="Delete Account"
                  onClick={() => setShowDeleteMsgBox(true)}
                >
                  <DeleteForever />
                </div>
              </div>
            )}
          </h2>

          <ul>
            <li>
              <Male /> <b>Gender :</b> <span> {profileUser?.gender} </span>
            </li>

            <li>
              <House /> <b>Place :</b>
              <span>{profileUser?.place}</span>
            </li>

            <li>
              <BadgeRounded /> <b>Profession :</b>
              <span> {profileUser?.profession}</span>
            </li>

            <li>
              <School /> <b>Education :</b>
              <span>{profileUser?.education}</span>
            </li>

            <li>
              <Favorite /> <b>Relationship :</b>
              <span> {profileUser?.relationship} </span>
            </li>

            <li>
              <Person />
              <b>
                <pre>About me :</pre>
              </b>
              <span>{profileUser?.aboutMe}</span>
            </li>
          </ul>

          {showUpdateForm && (
            <form onSubmit={updateUserInfo}>
              <h2>Update Info</h2>

              <div>
                <label htmlFor="userName">Name:</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  autoFocus
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="place">City State and Country:</label>
                <input
                  type="text"
                  id="place"
                  name="place"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="education">Education:</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="profession">Profession:</label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Gender:</label>

                <div className="radio-btn-container">
                  <div className="radio-btn">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      id="male"
                      onChange={handleChange}
                    />
                    <label htmlFor="male">Male</label>
                  </div>

                  <div className="radio-btn">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      id="female"
                      onChange={handleChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>

                  <div className="radio-btn">
                    <input
                      type="radio"
                      name="gender"
                      value={"Other"}
                      id="other"
                      onChange={handleChange}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>

              <div>
                <label>Relationship:</label>

                <div className="radio-btn-container">
                  <div className="radio-btn">
                    <input
                      type="radio"
                      name="relationship"
                      value={"Single"}
                      id="single"
                      onChange={handleChange}
                    />
                    <label htmlFor="single">Single</label>
                  </div>

                  <div className="radio-btn">
                    <input
                      type="radio"
                      name="relationship"
                      value={"Complicated"}
                      id="complicated"
                      onChange={handleChange}
                    />
                    <label htmlFor="complicated">Complicated</label>
                  </div>

                  <div className="radio-btn">
                    <input
                      type="radio"
                      name="relationship"
                      value={"In relationship"}
                      id="inRelationship"
                      onChange={handleChange}
                    />
                    <label htmlFor="inRelationship">In relationship</label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="about">About me:</label>
                <textarea name="aboutMe" id="about" onChange={handleChange} />
              </div>

              <button type="submit">Update</button>
            </form>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default ProfileInfo;

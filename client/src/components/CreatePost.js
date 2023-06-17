import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  AddPhotoAlternate,
  PersonPinCircle,
  TagFaces,
} from "@mui/icons-material";
import upload from "../utils/upload";
import { publicRequest } from "../utils/requestMethods";
import { setToBeUpdatedPostData } from "../redux/toBeUpdatedPostSlice";
import {
  addPost,
  postsFetchingStart,
  updatePostState,
} from "../redux/postsSlice";

const Form = styled.form`
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  border-radius: 10px;
  margin: 20px;
  padding: 15px;

  div.desc {
    /* border: 1px solid red; */
    border-bottom: 1.5px solid lightgray;
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 5px;
    }

    textarea {
      background-color: #f0f2f5;
      border-radius: 5px;
      font-size: 15px;
      width: 100%;
      min-height: 40px;
      height: 40px;
      padding: 7px;
      outline: none;
      border: none;
      resize: vertical;
    }
  }

  div.options {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    div {
      /* border: 1px solid red; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      border-radius: 5px;
      padding: 4px 5px;
      color: #4e4e4e;
      font-weight: 500;
      cursor: pointer;
      position: relative;

      &.active {
        background-color: #f0f2f5;
      }

      &:hover {
        background-color: #f0f2f5;
      }

      label {
        display: flex;
        align-items: center;
        gap: 2px;
        cursor: pointer;
      }

      span.responseTxt {
        /* border: 1px solid red; */
        font-weight: normal;
        font-size: 12px;
        padding: 2px;
        max-width: 90px;
        max-height: 20px;
        text-align: center;
        overflow: hidden;
      }

      ul {
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
        border: 1px solid #a1a1a1;
        background-color: #fff;
        min-width: 105px;
        border-radius: 3px;
        list-style: none;
        padding: 4px;
        position: absolute;
        top: 50px;
        left: 0px;
        animation: zoomOut 0.1s ease-out;

        @keyframes zoomOut {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        li {
          border-bottom: 1px solid #d9d8d8;

          &:last-child {
            border: none;
          }

          option {
            padding: 5px 10px;
            font-size: 15px;

            &:hover {
              background-color: #f0f2f5;
            }
          }
        }
      }

      .icon {
        font-size: 28px;
      }
    }

    button {
      background-color: #1b74e4;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 8px;
      width: 85px;
      height: 38px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:disabled {
        cursor: not-allowed;
      }

      &:hover {
        background-color: #2061ca;
      }

      span#spinner {
        display: inline-block;
        width: 25px;
        height: 25px;
        border: 3.5px solid #06408b;
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }

  div.switchBtnContainer {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 15px 0px 0px 7px;
    font-size: 15px;
    color: #8e8e8e;

    label.forPosition {
      /* border: 1px solid black; */
      position: relative;
      display: inline-block;
      width: 34px;
      height: 18px;

      input {
        /* (display:none) - It will not occupy space on page layout but a user can 
           still "check" or "uncheck" and,if "input" element type is "file" a user 
           can also open a window to select file with the help of "label" element.

           (visibility:hidden) - Element will be invisible but it will occupy space
           on page layout.
            
           (opacity:0) - Element will be transparent(invisible) but a user can still 
           interact with element. */

        display: none;

        &:checked + span.slider {
          background-color: #1b74e4;
        }

        &:checked + span.slider::before {
          transform: translateX(16px);
        }

        /* Adjacent Sibling Combinator (+) is used to select an element that is 
           directly after another element and both elements must be children of
           the same parent.You may also check for General Sibling Combinator (~) */
      }

      span.slider {
        /* border: 1px solid red; */
        background-color: #d3d3d3;
        border-radius: 24px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.2s;

        &::before {
          content: "";
          width: 14px;
          height: 14px;
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          bottom: 2px;
          transition: all 0.2s;
        }
      }
    }

    label {
      cursor: pointer;
    }
  }
`;

//=================================================================

const CreatePost = ({ profileUser }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { isFetching } = useSelector((state) => state.posts);
  const { toBeUpdatedPostData } = useSelector((state) => state.toBeUpdatedPost);
  const dispatch = useDispatch();

  let postDesc = useRef(null);
  const [file, setFile] = useState(null);
  const [showFeelingOpts, setShowFeelingOpts] = useState(false);
  const [feeling, setFeeling] = useState("");
  const [location, setLocation] = useState("");
  const dontShowLocation = useRef();

  //------- Get user's feeling ---------------------------------

  const getFeelingTxt = (e) => {
    setFeeling(e.target.value);
    setShowFeelingOpts(false);
  };

  //---- Setting user's feeling and location to update post ----

  useEffect(() => {
    toBeUpdatedPostData?.feeling && setFeeling(toBeUpdatedPostData.feeling);
    toBeUpdatedPostData?.location && setLocation(toBeUpdatedPostData.location);

    // Jump to update form
    toBeUpdatedPostData && postDesc.current.focus();
  }, [
    toBeUpdatedPostData,
    toBeUpdatedPostData?.feeling,
    toBeUpdatedPostData?.location,
  ]);

  //------- Get user's location ----------------------------------

  const userLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (positionSuccess) => {
          const { latitude, longitude } = positionSuccess.coords;

          try {
            const res = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            const { city, countryName } = res.data;
            setLocation(`${city}, ${countryName}`);
          } catch (error) {
            console.log(error);
          }
        },
        (positionError) => {
          /* JavaScript switch statement can contain "return" statements if
           it is present inside a function. The function will return the value
           from the switch statement and the code after the switch statement will
           not be executed. 
           "break" statements only jump out from the switch statement, but not out 
            of the function, so in this case statements after switch statement in a 
            function will be executed. */

          switch (positionError.code) {
            case positionError.PERMISSION_DENIED:
              return alert("You denied request for location.");

            case positionError.POSITION_UNAVAILABLE:
              return alert("Location information is unavailable.");

            case positionError.TIMEOUT:
              return alert("The request to get location timed out.");

            default:
              return alert("An unknown error occurred.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  //------- Create a new post or update a post -------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postDesc.current?.value || file || toBeUpdatedPostData?.img) {
      dispatch(postsFetchingStart());

      const imgOrVideoUrl = file && (await upload(file));

      const postData = {
        userId: currentUser._id,
        postDesc: postDesc.current?.value,
        location,
        showLocation: !dontShowLocation.current?.checked,
        feeling,
        img: imgOrVideoUrl || toBeUpdatedPostData?.img,
      };

      /* Taking out "userId" from "postData" Object
        bcoz we don't need it while updating post */
      const { userId, ...otherPostData } = postData;

      if (imgOrVideoUrl !== "error") {
        try {
          if (toBeUpdatedPostData) {
            const res = await publicRequest.put(
              `/posts/update_post/${toBeUpdatedPostData?._id}`,
              otherPostData
            );

            // Updating post
            dispatch(updatePostState(res.data));

            /* Clear "defaultValue" attribute data of "textarea" 
               and "update file" text after update post. */
            dispatch(setToBeUpdatedPostData(null));
          } else {
            const res = await publicRequest.post(
              "/posts/create_post",
              postData
            );

            dispatch(addPost(res.data));
          }

          // Clear form fields after post
          e.target.reset();
          setFile(null);
          setFeeling("");
          setLocation("");
        } catch (error) {
          console.log(error);
          alert("Oops... Something went wrong.");
        }
      }
    } else {
      alert("Post cannot be empty, add either text or image/video.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="desc">
        <Link to={"/profile/" + currentUser._id}>
          <img src={currentUser?.profilePic || "/images/faceless.jpg"} alt="" />
        </Link>

        {profileUser && profileUser._id !== currentUser._id ? (
          <textarea
            type="text"
            placeholder={`${currentUser.userName}, post something for ${profileUser.userName} !`}
            ref={postDesc}
            defaultValue={toBeUpdatedPostData?.postDesc || ""}
          />
        ) : (
          <textarea
            type="text"
            placeholder={`What's on your mind, ${currentUser.userName} ?`}
            ref={postDesc}
            defaultValue={toBeUpdatedPostData?.postDesc || ""}
          />
        )}
      </div>

      <div className="options">
        <div>
          <label>
            <AddPhotoAlternate htmlColor="#f02849" className="icon" />
            <span>Photo/Video</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </label>
          <span className="responseTxt">
            {file?.name || (toBeUpdatedPostData?.img && "update file")}
          </span>
        </div>

        <div
          className={showFeelingOpts ? "active" : ""}
          onClick={() => setShowFeelingOpts(!showFeelingOpts)}
        >
          <label>
            <TagFaces htmlColor="#f7b928" className="icon" />
            <span>Feelings</span>
          </label>
          <span className="responseTxt"> {feeling} </span>

          {showFeelingOpts && (
            <ul>
              <li>
                <option value={""} onClick={getFeelingTxt}>
                  None
                </option>
              </li>
              <li>
                <option onClick={getFeelingTxt}>happy &#128512;</option>
              </li>
              <li>
                <option onClick={getFeelingTxt}>excited &#128541;</option>
              </li>
              <li>
                <option onClick={getFeelingTxt}>angry &#128545;</option>
              </li>
              <li>
                <option onClick={getFeelingTxt}>sad &#128542;</option>
              </li>
              <li>
                <option onClick={getFeelingTxt}>bored &#128527;</option>
              </li>
              <li>
                <option onClick={getFeelingTxt}>sick &#129319;</option>
              </li>
            </ul>
          )}
        </div>

        <div onClick={userLocation}>
          <label>
            <PersonPinCircle htmlColor="#45bd62" className="icon" />
            <span>Location</span>
          </label>
          <span className="responseTxt"> {location} </span>
        </div>

        <button type="submit" disabled={isFetching}>
          {isFetching ? (
            <span id="spinner"></span>
          ) : toBeUpdatedPostData ? (
            "Update"
          ) : (
            "Post"
          )}
        </button>
      </div>

      <div className="switchBtnContainer">
        <label className="forPosition">
          <input type="checkbox" id="switch" ref={dontShowLocation} />
          <span className="slider"></span>
        </label>
        <label htmlFor="switch"> Don't show location. </label>
      </div>
    </Form>
  );
};

export default CreatePost;

import { useState, useEffect } from "react";
import { publicRequest } from "../utils/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "../redux/postsSlice";
import { setToBeUpdatedPostData } from "../redux/toBeUpdatedPostSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import {
  Chat,
  ChatOutlined,
  Close,
  Delete,
  LocationOn,
  MoreHoriz,
  Send,
  Settings,
  Share,
  ShareOutlined,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { useRef } from "react";
import {
  addComment,
  commentsFetchingFailure,
  commentsFetchingStart,
  commentsFetchingSuccess,
  removeComment,
  updateComment,
} from "../redux/commentsSlice";

const Container = styled.div`
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  border-radius: 10px;
  margin: 20px;
  padding: 15px;
`;

const TopConatiner = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  div.imgNname {
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;

    .link {
      /* border: 1px solid black; */
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 3px;
      }
    }

    div.details {
      /* border: 1px solid red; */

      div {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 700;

        .username-link {
          /* border: 1px solid red; */
          text-decoration: none;
          color: black;
          margin-left: 2.5px;
          cursor: pointer;

          &:hover {
            text-decoration: underline 1px;
            text-underline-offset: 1.5px;
            color: #2061ca;
          }
        }

        pre {
          display: flex;
          align-items: center;
          color: #4e4e4e;
          font-size: 14px;
          font-weight: 500;

          .icon {
            color: #2061ca;
            font-size: 16px;
          }
        }
      }
    }
  }

  div.btn-container {
    position: relative;

    ul {
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
      border: 1px solid #a1a1a1;
      background-color: #fff;
      border-radius: 3px;
      list-style: none;
      padding: 4px;
      position: absolute;
      top: 0px;
      left: -78px;
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
        font-size: 15px;
        padding: 5px 10px;
        cursor: pointer;

        &:last-child {
          border: none;
        }

        &:hover {
          background-color: #f0f2f5;
        }
      }
    }

    button {
      background-color: transparent;
      margin-left: 8px;
      border: none;
      padding: 4px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;

      &.activeBtn {
        background-color: #f0f2f5;
      }

      &:hover {
        background-color: #f0f2f5;
      }

      .btn-icon {
        /* background-color: red; */
        color: #65676b;
        height: 100%;
        width: 100%;
      }
    }
  }
`;

const MiddleContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 15px 0px;

  p {
    border-left: 4px solid lightgray;
    padding: 2px 10px;
    color: #050505;
  }

  div.imgContainer {
    /* border: 1px solid red; */
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 500px;

    img {
      max-width: 100%;
      max-height: 500px;
    }
  }
`;

const BottomContainer = styled.div`
  div.like-comment-share-container {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-around;

    div.actions {
      /* border: 1px solid blue; */
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: #60646a;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }

  div.comment-box-Container {
    /* border: 1px solid red; */
    margin-top: 15px;

    form.comment-box {
      border-top: 1.5px solid lightgray;
      display: flex;
      align-items: center;
      padding: 15px 0px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
      }

      textarea {
        background-color: #f0f2f5;
        font-size: 14px;
        width: 100%;
        height: 32px;
        padding: 3px 5px;
        border: none;
        border-radius: 3px;
        resize: none;

        &:focus {
          outline: 1px solid #919191;
        }
      }

      button {
        background-color: #1b74e4;
        width: 60px;
        height: 32px;
        padding: 5px;
        border: none;
        border-radius: 3px;
        margin-left: 10px;
        cursor: pointer;

        &:hover {
          background-color: #2061ca;
        }

        .send-icon {
          font-size: 20px;
          color: white;
        }
      }
    }

    div.others-comment {
      /* border: 1px solid red; */
      display: flex;
      margin-bottom: 10px;

      &:last-child {
        margin: 0px;
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
      }

      section {
        /* border: 1px solid blue; */
        width: 100%;

        div.name-comment {
          background-color: #f0f2f5;
          border-radius: 4px;
          padding: 5px 8px 8px;
          width: 100%;
          margin-bottom: 3px;

          div.name-btn-container {
            /* border: 1px solid blue; */
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;

            h5 .user-link {
              text-decoration: none;
              color: #2061ca;
              cursor: pointer;

              &:hover {
                text-decoration: underline 1px;
                text-underline-offset: 1.5px;
              }
            }

            div.comment-btn-container {
              /* border: 1px solid red; */
              display: flex;
              gap: 5px;

              button {
                background-color: #fff;
                width: 20px;
                height: 20px;
                padding: 2px;
                border: none;
                border-radius: 50%;
                color: #24272a;
                cursor: pointer;

                &:hover {
                  color: #1b74e4;
                }

                .comment-btn-icon {
                  font-size: 16px;
                }
              }
            }
          }

          p {
            font-size: 14px;
            color: #050505;
          }
        }

        div.actions-on-comment {
          /* border: 1px solid red; */
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0px 10px;

          div.left {
            display: flex;
            align-items: center;
            gap: 15px;

            span {
              font-size: 12px;
              font-weight: 700;
              color: #666872;
              cursor: pointer;

              &:hover {
                text-decoration: underline 1px;
                text-underline-offset: 1.5px;
                color: black;
              }
            }

            span.time {
              font-weight: normal;
              cursor: default;

              &:hover {
                text-decoration: none;
                color: #666872;
              }
            }
          }

          div.right {
            display: flex;
            align-items: center;
            gap: 10px;

            span {
              display: flex;
              align-items: center;
              gap: 2px;
              font-size: 12px;
              font-weight: 500;
              color: #666872;

              .comments-icon {
                font-size: 16px;
              }
            }
          }
        }

        div.reply-box {
          /* border: 1px solid red; */
          margin-top: 10px;
        }
      }
    }
  }
`;

//======================================================

const Post = ({ post, profileUser }) => {
  // console.log(post);
  const [hidePost, setHidePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showList, setShowList] = useState(false);

  //----------------------------------------------------

  const [user, setUser] = useState({});

  /* Fetching all users who created posts on rendering 
     by their userId which is present in "post" data */

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await publicRequest.get(
          "/users/get_following/" + post?.userId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [post?.userId]);

  //------- Like or Unlike a post -----------------------

  const currentUserId = useSelector((state) => state.user.currentUser._id);
  const [likes, setLikes] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(currentUserId));

  const handleLikeUnlike = async () => {
    try {
      const res = await publicRequest.put("/posts/like_unlike_post", {
        postId: post._id,
        userId: currentUserId,
      });
      setLikes(res.data.updatedPost.likes.length);
      setIsLiked(res.data.updatedPost.likes.includes(currentUserId));
    } catch (error) {
      console.log(error);
    }
  };

  //------- Delete a post -------------------------------

  const dispatch = useDispatch();

  const deletePost = async () => {
    try {
      await publicRequest.delete(`/posts/delete_post/${post._id}`);
      setShowList(false);
      dispatch(removePost(post._id));
    } catch (error) {
      console.log(error);
    }
  };

  //------- Initialising Post Update ---------------------

  const sendPostDataToUpdate = () => {
    dispatch(setToBeUpdatedPostData(post));
    setShowList(false);
  };

  //------- Add or Update comment --------------------------

  const [commentData, setCommentData] = useState(null);
  const commentTxt = useRef();

  const addOrUpdateComment = async (e) => {
    e.preventDefault();

    if (commentTxt.current?.value) {
      try {
        if (commentData) {
          const res = await publicRequest.put(
            `/comments/update_comment/${commentData?._id}`,
            { comment: commentTxt.current?.value }
          );

          dispatch(updateComment(res.data));

          // Clear textarea's "defaultValue" attribute value.
          setCommentData(null);
        } else {
          const res = await publicRequest.post("/comments/create_comment", {
            postId: post._id,
            commenterId: currentUserId,
            comment: commentTxt.current?.value,
          });

          dispatch(addComment(res.data));
        }

        // Clear form's "textarea" field.
        e.target.reset();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Comment cannot be empty.");
    }
  };

  //------- Get all comments of a post ----------------------

  const { comments, isFetching, isError } = useSelector(
    (state) => state.comments
  );

  const getAllComments = async () => {
    dispatch(commentsFetchingStart());

    try {
      const res = await publicRequest.get(
        "/comments/get_all_comments/" + post._id
      );

      dispatch(commentsFetchingSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(commentsFetchingFailure());
    }
  };

  //------- Delete a comment -----------------------------

  const deleteComment = async (commentId) => {
    try {
      await publicRequest.delete(`/comments/delete_comment/${commentId}`);
      dispatch(removeComment(commentId));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(comments);
  return (
    <>
      {!hidePost && (
        <Container>
          <TopConatiner>
            <div className="imgNname">
              <Link to={`/profile/${user._id}`} className="link">
                <img
                  src={
                    profileUser?.profilePic ||
                    user.profilePic ||
                    "/images/faceless.jpg"
                  }
                  alt=""
                />
              </Link>

              <div className="details">
                <div>
                  <Link to={`/profile/${user._id}`} className="username-link">
                    {profileUser?.userName || user.userName}
                  </Link>
                  {post?.feeling && <pre> is feeling {post?.feeling}</pre>}
                </div>

                <div>
                  {post?.showLocation && (
                    <pre>
                      <LocationOn className="icon" />
                      {post.location || "Unknown"} |
                    </pre>
                  )}

                  <pre style={{ marginLeft: "4px" }}>
                    {moment(new Date(post?.createdAt)).fromNow()}
                  </pre>
                </div>
              </div>
            </div>

            <div className="btn-container">
              {currentUserId === user._id && (
                <button
                  type="button"
                  className={showList ? "activeBtn" : ""}
                  onClick={() => setShowList(!showList)}
                >
                  <MoreHoriz className="btn-icon" />
                </button>
              )}

              {showList && (
                <ul>
                  <li onClick={sendPostDataToUpdate}>Update</li>
                  <li onClick={deletePost}>Delete</li>
                </ul>
              )}

              <button
                type="button"
                title="Hide Post"
                onClick={() => setHidePost(true)}
              >
                <Close className="btn-icon" />
              </button>
            </div>
          </TopConatiner>

          <MiddleContainer className="middle-content">
            {post?.postDesc && <p>{post?.postDesc}</p>}

            <div className="imgContainer">
              <img src={post?.img} alt="" />
            </div>
          </MiddleContainer>

          <BottomContainer>
            <div className="like-comment-share-container">
              <div className="actions" onClick={handleLikeUnlike}>
                {isLiked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
                <span>{likes} Likes</span>
              </div>

              <div
                className="actions"
                onClick={() => {
                  setShowReply(false);
                  setShowComments(!showComments);
                  !showComments && getAllComments();
                }}
              >
                {true ? <Chat /> : <ChatOutlined />}
                <span>
                  {post._id === comments[0]?.postId && comments.length} Comments
                </span>
              </div>

              <div className="actions">
                {true ? <ShareOutlined /> : <Share />}
                <span>7 Share</span>
              </div>
            </div>

            {showComments && (
              <div className="comment-box-Container">
                <form className="comment-box" onSubmit={addOrUpdateComment}>
                  <Link to="/">
                    <img src={true ? "/images/faceless.jpg" : ""} alt="" />
                  </Link>
                  <textarea
                    placeholder="Write a comment..."
                    autoFocus
                    ref={commentTxt}
                    defaultValue={commentData?.comment || ""}
                  />
                  <button type="submit">
                    <Send className="send-icon" />
                  </button>
                </form>

                {comments.map((commentObj, index) => (
                  <div className="others-comment" key={index}>
                    <Link to={"/profile/" + commentObj.commenterId}>
                      <img src={true ? "/images/faceless.jpg" : ""} alt="" />
                    </Link>

                    <section>
                      <div className="name-comment">
                        <div className="name-btn-container">
                          <h5>
                            <Link
                              to={`/profile/${commentObj.commenterId}`}
                              className="user-link"
                            >
                              Rahul Singh
                            </Link>
                          </h5>

                          <div className="comment-btn-container">
                            {currentUserId === commentObj.commenterId && (
                              <button
                                title="Edit"
                                onClick={() => {
                                  setCommentData(commentObj);
                                  commentTxt.current.focus(); // Jump to textarea.
                                }}
                              >
                                <Settings className="comment-btn-icon" />
                              </button>
                            )}

                            {(currentUserId === commentObj.commenterId ||
                              post.userId === currentUserId) && (
                              <button
                                title="Delete"
                                onClick={() => deleteComment(commentObj._id)}
                              >
                                <Delete className="comment-btn-icon" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p>{commentObj.comment}</p>
                      </div>

                      <div className="actions-on-comment">
                        <div className="left">
                          <span>Like</span>
                          <span onClick={() => setShowReply(!showReply)}>
                            {showReply ? "Cancel" : "Reply"}
                          </span>
                          <span className="time">3 min ago</span>
                        </div>

                        <div className="right">
                          <span>
                            <ThumbUpAlt className="comments-icon" /> 112
                          </span>
                          <span>
                            <Chat className="comments-icon" /> 15
                          </span>
                        </div>
                      </div>

                      {showReply && (
                        <div className="reply-box">
                          <form className="comment-box">
                            <Link to="/">
                              <img
                                src={true ? "/images/faceless.jpg" : ""}
                                alt=""
                              />
                            </Link>
                            <textarea
                              placeholder="Write a comment..."
                              autoFocus
                              required
                            />
                            <button type="submit">
                              <Send className="send-icon" />
                            </button>
                          </form>

                          <div className="others-comment">
                            <Link to="/">
                              <img
                                src={true ? "/images/faceless.jpg" : ""}
                                alt=""
                              />
                            </Link>

                            <section>
                              <div className="name-comment">
                                <div className="name-btn-container">
                                  <h5>
                                    <Link to={"/"} className="user-link">
                                      Nisha Verma
                                    </Link>
                                  </h5>

                                  <div className="comment-btn-container">
                                    <button type="button" title="Edit">
                                      <Settings className="comment-btn-icon" />
                                    </button>
                                    <button type="button" title="Delete">
                                      <Delete className="comment-btn-icon" />
                                    </button>
                                  </div>
                                </div>

                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Illo quos a reprehenderit
                                  adipisci nobis.
                                </p>
                              </div>

                              <div className="actions-on-comment">
                                <div className="left">
                                  <span>Like</span>
                                  <span className="time">2 min ago</span>
                                </div>

                                <div className="right">
                                  <span>
                                    <ThumbUpAlt className="comments-icon" /> 5
                                  </span>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      )}
                    </section>
                  </div>
                ))}
              </div>
            )}
          </BottomContainer>
        </Container>
      )}
    </>
  );
};

export default Post;

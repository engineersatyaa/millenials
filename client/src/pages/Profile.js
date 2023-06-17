import styled from "styled-components";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import ProfileInfo from "../components/ProfileInfo";
import CreatePost from "../components/CreatePost";
import WelcomePost from "../components/WelcomePost";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "../utils/requestMethods";
import { useParams } from "react-router-dom";
import { postsFetchingSuccess } from "../redux/postsSlice";

const MainContainer = styled.div`
  /* border: 2px solid black; */
  display: flex;

  div.middleContainer {
    flex: 3;
  }
`;

//======================================================

const Profile = () => {
  const allPosts = useSelector((state) => state.posts.posts);
  const [profileUser, setProfileUser] = useState({});
  const dispatch = useDispatch();

  // Get profile user's userId from URL
  const { profileUserId } = useParams();

  // Fetching profile user and his all posts
  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const res = await publicRequest.get("/users/get_user/" + profileUserId);
        setProfileUser(res.data);

        try {
          const res = await publicRequest.get(
            `/posts/get_user_all_post/${profileUserId}`
          );

          dispatch(postsFetchingSuccess(res.data));
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAndPosts();
  }, [profileUserId, dispatch]);



  return (
    <>
      <Navbar />
      <MainContainer>
        <Leftbar />

        <div className="middleContainer">
          <ProfileInfo
            profileUser={profileUser}
            setProfileUser={setProfileUser}
          />
          <CreatePost profileUser={profileUser} />

          {allPosts?.map((post, index) => (
            <Post post={post} key={index} profileUser={profileUser} />
          ))}

          <WelcomePost profileUser={profileUser} />
        </div>

        <Rightbar />
      </MainContainer>
    </>
  );
};

export default Profile;

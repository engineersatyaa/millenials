import styled from "styled-components";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import CreatePost from "../components/CreatePost";
import WelcomePost from "../components/WelcomePost";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { publicRequest } from "../utils/requestMethods";
import { postsFetchingSuccess } from "../redux/postsSlice";

const MainContainer = styled.div`
  /* border: 2px solid red; */
  display: flex;

  div.feedContainer {
    flex: 3;
  }
`;

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const allPosts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  // Fetching user's and his all followings' posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await publicRequest.get(
          `/posts/get_all_post/${currentUser._id}`
        );

        dispatch(postsFetchingSuccess(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [currentUser._id, dispatch]);

  return (
    <>
      <Navbar />
      <MainContainer>
        <Leftbar />

        <div className="feedContainer">
          <CreatePost />
          {/* You have to add here a post loader animation. */}
          {allPosts?.map((post, index) => (
            <Post post={post} key={index} />
          ))}

          <WelcomePost />
        </div>

        <Rightbar />
      </MainContainer>
    </>
  );
};

export default Home;

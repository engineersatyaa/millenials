import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import FollowerOrFollowing from "./pages/FollowerOrFollowing";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile/:profileUserId"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/messenger/:userId"
          element={user ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/passwordReset" element={<PasswordReset />} />

        <Route
          path="/followings/:userId"
          element={user ? <FollowerOrFollowing /> : <Navigate to="/login" />}
        />

        <Route
          path="/followers/:userId"
          element={user ? <FollowerOrFollowing /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

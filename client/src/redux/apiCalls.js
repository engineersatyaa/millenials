import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, userData) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", userData);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    // console.log(error.response.data);
    dispatch(loginFailure(error.response.data));
  }
};

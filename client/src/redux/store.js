import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import commentsReducer from "./commentsSlice";
import toBeUpdatedPostReducer from "./toBeUpdatedPostSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["posts", "comments", "toBeUpdatedPost"],
};
/* The blacklist takes an array of strings.
  String element in array will be given from "combineReducers".
  Now "postsReducer" and "toBeUpdatedPostReducer" will not be persisted */

const combinedReducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
  toBeUpdatedPost: toBeUpdatedPostReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

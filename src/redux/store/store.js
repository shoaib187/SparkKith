// src/app/redux/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from "../slices/authSlice/authSlice";
import tasksReducer from "../slices/taskSlice/taskSlice";
import feelingReducer from "../slices/feelingSlice/feelingSlice";
import communityReducer from "../slices/communitySlice/communitySlice";
import profileReducer from "../slices/profileSlice/profileSlice";

// Persist config ONLY for auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'isAuthenticated'],
};

// Wrap persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    tasks: tasksReducer,
    feelings: feelingReducer,
    performers: communityReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

export default store;



// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from "../slices/authSlice/authSlice"
// import tasksReducer from "../slices/taskSlice/taskSlice"

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     tasks: tasksReducer,
//   },
// });

// export default store;

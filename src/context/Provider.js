import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
WebBrowser.maybeCompleteAuthSession();
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allData, setAllData] = useState({
    userData: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({ prompt: "select_account" });
  // Google Sign IN Start
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1076467046409-sct5drjcd8896r7qc80lvgmajfnev5fs.apps.googleusercontent.com",
    iosClientId:
      "1076467046409-eauic2ru65l4b6lustejji71tjar5h40.apps.googleusercontent.com",
    webClientId:
      "1076467046409-f7dik116mreamar2fls2anor8aicijlp.apps.googleusercontent.com",
    expoClientId:
      "1076467046409-aefr4jm44k4boabqd8jrl9bakvbb5m5d.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    // console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        setToken(response.authentication.accessToken);
        getuser(response.authentication.accessToken);
      }
    } else {
      setUser(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@srabonbarua");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getuser = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/user/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@srabonbarua", JSON.stringify(user));
      setLoading(true);
      setUser(user);
    } catch (error) {
      // Add your own error handler here
    }
  };
  // Google signIn End

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (user) => {
    setLoading(true);
    return updateProfile(auth.currentUser, user);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signIn,
    signOutUser,
    user,
    setLoading,
    updateUser,
    allData,
    setAllData,
    error,
    setError,
    request,
    promptAsync,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const userContext = () => {
  const context = useContext(AuthContext);
  return context;
};

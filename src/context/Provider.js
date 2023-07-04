import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
      "178444591689-p05431klj4usrm1k3m9uba351krecfno.apps.googleusercontent.com",
    iosClientId:
      "178444591689-hoqm5ttkdm2paodnv41qfog43q1v6s25.apps.googleusercontent.com",
    webClientId:
      "178444591689-av11lgp73ugj5hb7haj9jbmpflcahkvk.apps.googleusercontent.com",
    expoClientId:
      "178444591689-p9dcahq7j98tuohg98rtn90atb0ttolu.apps.googleusercontent.com",
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
    const data = await AsyncStorage.getItem("@mahbubmorshed");
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
      await AsyncStorage.setItem("@mahbubmorshed", JSON.stringify(user));
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

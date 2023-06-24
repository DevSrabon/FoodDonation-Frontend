import { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`${process.env.URL}/?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            AsyncStorage.setItem("token", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;

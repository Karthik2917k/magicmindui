import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export default function UserPrivateRoute({ child }:any) {
  const [auth, setAuth] = useState(true);

  const validateSession = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user/valid`;
      await axios.get(url, { withCredentials: true });
    } catch (e) {
      setAuth(false);
      console.log("INVALID SESSION", e);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  if (auth) {
    return child;
  }

  return <Navigate to="/" />;
}

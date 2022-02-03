import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const Logout = () => {
    const {logout,user} = useUser();
    useEffect(logout,[user, logout])
  return <p>Logging Out...</p>
}

export default Logout;
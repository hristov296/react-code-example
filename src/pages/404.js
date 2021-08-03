import { useEffect } from "react";
import { navigate } from "gatsby";

const Error404 = () => {
  useEffect(() => {
    navigate("/");
  }, []);
  return null;
};

export default Error404
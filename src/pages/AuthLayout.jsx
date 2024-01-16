import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

// eslint-disable-next-line react/prop-types
function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.user.isUser);
  const navigate = useNavigate();
  const state = useLocation();

  useEffect(() => {
    console.log(state);
    if (!auth) {
      navigate("/signup", { state: { from: state.pathname }, replace: true });
    } else {
      setLoading(false);
    }
  }, [auth, navigate, state]);

  if (loading) {
    return <Loading />;
  }
  return children;
}

export default AuthLayout;

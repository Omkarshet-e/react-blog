import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

// eslint-disable-next-line react/prop-types
function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.user.isUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/signup", { replace: true, state: { origin: "authLayout" } });
    } else {
      setLoading(false);
    }
  }, [auth, navigate]);

  if (loading) {
    return <Loading />;
  }
  return children;
}

export default AuthLayout;

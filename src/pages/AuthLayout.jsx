import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function AuthLayout({ children }) {
  const auth = useSelector((state) => state.user.isUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function wait() {
      // setTimeout(() => {
      if (!auth) {
        navigate("/signup", { replace: true });
      } else {
        setLoading(false);
      }
      // }, 5 * 1000);
    }

    wait();
  }, [auth, navigate]);

  if (loading) {
    return <Loading />;
  }
  return children;
}

export default AuthLayout;

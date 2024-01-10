import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Error from "./components/Error.jsx";
import store from "./state/store.js";
import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import Logout from "./pages/Logout.jsx";
import AllBlogs from "./pages/AllBlogs.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";
import BlogPost from "./pages/BlogPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "add-blog",
        element: (
          <AuthLayout>
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "blogs",
        element: (
          <AuthLayout>
            <AllBlogs />
          </AuthLayout>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <AuthLayout>
            <BlogPost />
          </AuthLayout>
        ),
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

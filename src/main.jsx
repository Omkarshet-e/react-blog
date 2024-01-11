import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import AllBlogs from "./pages/AllBlogs.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Error from "./components/Error.jsx";
import store from "./state/store.js";
import "./index.css";

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
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);

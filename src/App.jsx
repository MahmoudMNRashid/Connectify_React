import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { ForgetPassword } from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { loader as checkResetValidationLoader } from "./pages/ResetPassword";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import { Toaster } from "react-hot-toast";
import PostContextProvider from "./context/PostContext";
import Test from "./pages/Test";
import MainContextProvider from "./context/MainContext";
function App() {
  const router = createBrowserRouter([
    { path: "/home", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/logout", element: <Profile /> },
    { path: "/error", element: <Error /> },
    { path: "/test", element: <Test /> },
    {
      path: "/auth",
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Auth /> },
        { path: "forget-password", element: <ForgetPassword /> },
        {
          path: "reset-password/:token",
          element: <ResetPassword />,
          loader: checkResetValidationLoader,
        },
      ],
    },
  ]);

  return (
    <PostContextProvider>
      <MainContextProvider>
        <RouterProvider router={router}>
          <Toaster />
        </RouterProvider>
      </MainContextProvider>
    </PostContextProvider>
  );
}

export default App;

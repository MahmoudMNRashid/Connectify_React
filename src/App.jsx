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
import AuthGuard from "./pages/AuthGuard";
import ProfileContextProvider from "./context/ProfileContext";
import Group from "./pages/Group";
import GroupContextProvider from "./context/GroupContext";
import Page from "./pages/Page";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          element: (
            <AuthGuard>
              <Home />
            </AuthGuard>
          ),
          index: true,
        },
        { path: "/profile/:userId", element: <Profile /> },
        { path: "/group/:groupId", element: <Group /> },
        { path: "/page/:pageId", element: <Page /> },
        { path: "/logout", element: <Profile /> },
        { path: "/error", element: <Error /> },
        { path: "/test", element: <Test /> },
      ],
    },

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
    <GroupContextProvider>
      <ProfileContextProvider>
        <PostContextProvider>
          <MainContextProvider>
            <RouterProvider router={router}>
              <Toaster />
            </RouterProvider>
          </MainContextProvider>
        </PostContextProvider>
      </ProfileContextProvider>
    </GroupContextProvider>
  );
}

export default App;

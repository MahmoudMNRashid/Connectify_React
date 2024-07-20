import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { ForgetPassword } from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { loader as checkResetValidationLoader } from "./pages/ResetPassword";
import ErrorPage from "./pages/DefaultError";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/CustomError";
import { Toaster } from "react-hot-toast";
import PostContextProvider, { PostContext } from "./context/PostContext";
import Test from "./pages/Test";
import MainContextProvider, { MainContext } from "./context/MainContext";
import AuthGuard from "./pages/AuthGuard";
import ProfileContextProvider, {
  ProfileContext,
} from "./context/ProfileContext";
import Group from "./pages/Group";
import GroupContextProvider, { GroupContext } from "./context/GroupContext";
import Page from "./pages/Page";
import PageContextProvider, { PageContext } from "./context/PageContext";
import Search from "./pages/Search";
import { clearCookies } from "./util/help";
import { useContext } from "react";
import { useNetworkStatus } from "./hooks/UseNetworkStatus";
import Offline from "./pages/Offline";
function App() {
  const { isOnline } = useNetworkStatus();
  const { resetAllStates } = useContext(ProfileContext);
  const { resetPageStates } = useContext(PageContext);
  const { resetPostsStates } = useContext(PostContext);
  const { resetGroupStates } = useContext(GroupContext);
  const {
    resetGroupsResultSearch,
    resetPagesResultSearch,
    resetUsersResultSearch,
  } = useContext(MainContext);
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
        {
          path: "/profile/:userId",
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
        },
        {
          path: "/group/:groupId",
          element: (
            <AuthGuard>
              <Group />
            </AuthGuard>
          ),
        },
        {
          path: "/page/:pageId",
          element: (
            <AuthGuard>
              <Page />
            </AuthGuard>
          ),
        },
        {
          path: "/logout",
          loader: () => {
            console.log("first");
            clearCookies();
            resetAllStates();
            resetPageStates();
            resetPostsStates();
            resetGroupStates();
            resetGroupsResultSearch(),
              resetPagesResultSearch(),
              resetUsersResultSearch();
            return redirect("/auth?mode=login");
          },
        },
        {
          path: "/search",
          element: (
            <AuthGuard>
              <Search />
            </AuthGuard>
          ),
        },

        { path: "/test", element: <Test /> },
      ],
      errorElement: <ErrorPage />,
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
    { path: "/error", element: <Error /> },
  ]);

  return (
    <>
      {isOnline && (
        <PageContextProvider>
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
        </PageContextProvider>
      )}

      {!isOnline && <Offline />}
    </>
  );
}

export default App;

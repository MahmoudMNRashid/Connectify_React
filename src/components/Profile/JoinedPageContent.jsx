import { useParams } from "react-router-dom";
import { useContext } from "react";
import PageInfoCard from "./PageInfoCard";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { ProfileContext } from "../../context/ProfileContext";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { MdOutlineContactPage } from "react-icons/md";
import classes from "./FriendsContent.module.css";

const JoinedPageContent = () => {
  const { userId } = useParams();
  const { loading } = useFetchedPost(`${host}/profile/getPagesLiked/${userId}`,'JOINED_PAGES');
  const { joinedPages } = useContext(ProfileContext);

  const totalPages = joinedPages?.total || 0;
  const pages = joinedPages?.pages || [];

  const skeletonLoaders = Array.from({ length: 20 }).map((_, index) => (
    <SkeletonLoader2 key={index} />
  ));

  return (
    <div className="container__profile">
      <header className={classes.header}>
        <MdOutlineContactPage fontSize={"2rem"} /> Total Pages: {totalPages}
      </header>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          margin: "1rem",
          width: "100%",
        }}
      >
        {!loading &&
          pages.length > 0 &&
          pages.map((page) => <PageInfoCard key={page.pageId} page={page} />)}

        {!loading && pages.length === 0 && <p className="no">No pages.</p>}

        {loading && skeletonLoaders}
      </div>
    </div>
  );
};

export default JoinedPageContent;

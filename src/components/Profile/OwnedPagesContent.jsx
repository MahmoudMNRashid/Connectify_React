import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import SkeletonLoader2 from "../UI/SkeletonLoader2";
import { MdOutlineContactPage } from "react-icons/md";
import classes from "./FriendsContent.module.css";
import PageInfoCard from "./PageInfoCard";
const OwnedPagesContent = () => {
    const { userId } = useParams();
    const { loading } = useFetchedPost(`${host}/profile/getPagesIOwned/${userId}`);
    const { ownedPages, setOwnedPages } = useContext(ProfileContext);
  
    const totalPages = ownedPages?.total || 0;
    const pages = ownedPages?.pages || [];

    useEffect(() => {
        setOwnedPages({ pages: [], total: 0 });
    }, [setOwnedPages]);
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
  
          {!loading && pages.length === 0 && <p>There are no pages.</p>}
  
          {loading && skeletonLoaders}
        </div>
      </div>
    );
}

export default OwnedPagesContent
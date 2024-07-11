import classes from "./FriendCard.module.css";
import defaultProfileLogo from '../../assets/post/profile_default.svg'
const FriendCard = ({ friend }) => {
    const src = friend.logo?friend.logo.asset.link:defaultProfileLogo
  return (

    
    <>
      <div className={classes.container}>
        <div >
          <div >
            <img
              
              src={src}
              alt="Randy Robertson"
            />
            <p className="pt-2 text-lg font-semibold">
              {friend.firstName} {friend.lastName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendCard;

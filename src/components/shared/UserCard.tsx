import { Models } from "appwrite";
import { Link } from "react-router-dom";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card-mobile">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14 border border-blue-100 p-1"
      />

     

      
    </Link>
  );
};

export default UserCard;
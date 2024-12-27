import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const UserPic: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
      <div>
        <img
          className="h-8 w-8 rounded-full"
          src={user?.profilePicture || "https://via.placeholder.com/150"}
          alt=""
        />
      </div>
  );
};

export default UserPic;

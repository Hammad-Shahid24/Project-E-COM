import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ProfileView: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="text-center">
      <img
        src={user?.image || "https://via.placeholder.com/150"}
        alt="User"
        className="mx-auto h-24 w-24 rounded-full border border-gray-300 dark:border-gray-700"
      />
      <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-200">{user?.name}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">{user?.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
        Joined on {new Date(user?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProfileView;

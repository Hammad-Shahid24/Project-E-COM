import { FC } from "react";
import ProfileForm from "./ProfileForm";

const EditProfile: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Edit Profile
      </h1>
      <ProfileForm />
    </div>
  );
};

export default EditProfile;

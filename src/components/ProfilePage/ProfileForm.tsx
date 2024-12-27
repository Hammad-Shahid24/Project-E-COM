import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import Loading from "../../shared/MiniLoading";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ProfileFormInputs {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
});

const ProfileForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    setSuccess(false);

    try {
      // await dispatch(updateUserProfile(data)).unwrap();
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-teal-500"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-teal-500"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg"
      >
        {loading ? <Loading /> : "Save Changes"}
      </button>
      {success && <p className="text-sm text-green-600 text-center">Profile updated successfully!</p>}
    </form>
  );
};

export default ProfileForm;

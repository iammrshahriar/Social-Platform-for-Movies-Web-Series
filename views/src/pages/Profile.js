import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../features/auth/authSlice";
import { logout } from "../features/auth/authState";
import toast from "react-hot-toast";
import { BsCamera } from "react-icons/bs";
import MovieModal from "../components/MovieModal";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateUser, { isLoading, isError, error, isSuccess }] =
    useUpdateUserMutation();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(user?.userName);
  const [contact, setContact] = useState(user?.contact);
  const [coverPhoto, setCoverPhoto] = useState("");
  const [status, setStatus] = useState(user?.isPublic);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: user._id,
      email,
      password,
      userName,
      contact,
      coverPhoto,
      isPublic: status,
    };

    updateUser(newUser);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated user successfully");
    }
  }, [isSuccess]);

  return (
    <section>
      <div>
        <div className="mb-10 relative">
          <img
            className="h-96  w-full object-cover rounded z-0"
            src={coverPhoto ? coverPhoto : user?.userCoverImg}
            alt="cover"
          />

          <button
            className="absolute top-5 right-5 bg-white p-2 rounded-full z-10"
            onClick={() => setShowModal(true)}
          >
            <BsCamera size={20} />
          </button>
        </div>
        <div className="flex items-center gap-5 px-6 ">
          <img
            src={user?.profile}
            alt="user"
            className="rounded border-2 border-white "
          />

          <div className="text-white">
            <h1 className="font-bold text-2xl">{user?.userName}</h1>
            <h1 className="font-bold text-xl">{user?.email}</h1>
            <h1 className="font-bold text-xl">{user?.country}</h1>

            <button
              className="p-1 bg-orange-600 rounded mt-3 w-full block text-center"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="my-3">
        <h1 className="text-white text-xl font-bold text-right">
          Update Profile
        </h1>

        <form className="my-5" onSubmit={handleSubmit}>
          {isError && (
            <h1 className="text-sm text-red-600 mb-3">
              {error?.data?.message}
            </h1>
          )}
          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              Email
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              Contact
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              min="11"
              max="11"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="user"
              className="block w-full text-white text-sm mb-2"
            >
              Profile Lock
            </label>
            <select
              id="user"
              value={status}
              onChange={handleChange}
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
            >
              <option value="false">Private</option>
              <option value="true">UnLock</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block w-full text-white text-sm mb-2"
              htmlFor="name"
            >
              Password
            </label>
            <input
              className="block w-full text-white bg-slate-800 py-3 px-5 focus:outline-none rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 rounded text-white bg-orange-600 text-sm"
            >
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <MovieModal setShowModal={setShowModal} setCoverPhoto={setCoverPhoto} />
      )}
    </section>
  );
};

export default Profile;

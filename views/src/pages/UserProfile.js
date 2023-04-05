import React from "react";
import { useParams } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { AiFillEnvironment } from "react-icons/ai";
import { SlCallEnd } from "react-icons/sl";
import { useGetUserQuery } from "../features/auth/authSlice";

const UserProfile = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserQuery(id);

  if (isLoading) {
    return (
      <h2 className="text-xl text-center font-bold text-white">Loading...</h2>
    );
  }
  return (
    <section>
      <div className="container">
        <div className="mb-5">
          <img
            src={user?.userCoverImg}
            alt="userCover"
            className="h-96 w-full object-cover"
          />
        </div>

        <div className="flex gap-5 items-center">
          <div className="">
            <img src={user?.profile} alt="" />
          </div>
          <div className="text-white ">
            <h1 className="font-bold text-2xl">{user?.userName}</h1>
            {user?.isPublic && (
              <>
                <h1 className="font-bold text-xl flex items-center gap-2 ">
                  <FaRegEnvelope color="orange" />
                  {user?.email}
                </h1>
                <h1 className="font-bold text-xl flex items-center gap-2">
                  <AiFillEnvironment color="orange" />
                  {user?.country}
                </h1>

                {user?.contact && (
                  <h1 className="font-bold text-xl flex items-center gap-2">
                    <SlCallEnd color="orange" />
                    {user?.contact}
                  </h1>
                )}
              </>
            )}

            {!user?.isPublic && (
              <div>
                <h2 className="text-orange-600 font-bold text-sm">
                  Profile Locked
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

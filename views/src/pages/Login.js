import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormInput from "../components/FromInput";
import useRedirect from "../hooks/useRedirect";
import { useLoginUserMutation } from "../features/auth/authSlice";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
    .max(255),
  password: yup.string().required("Password is required").min(6).max(12),
});

const Login = () => {
  const redirect = useRedirect();
  const navigate = useNavigate();
  const [addUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await addUser(data).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(redirect);
    }
  }, [redirect, navigate, isSuccess]);
  return (
    <section className="py-10 flex items-center justify-center">
      <div className="flex flex-col max-w-sm p-6 rounded-md sm:p-10 bg-slate-800 shadow-2xl ">
        <div className="mb-5 text-center">
          <h1 className="my-3 text-4xl font-bold text-white">Log in</h1>
          {isError ? (
            <p className="text-sm text-red-500">{error?.data?.message}</p>
          ) : (
            <p className="text-sm text-gray-400">
              Log in to access your account
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              type="email"
              placeholder="example@gmail.com"
              name="email"
              errorMessage={errors.email?.message}
              label="Email Address"
              register={{ ...register("email") }}
            />
            <FormInput
              type="password"
              placeholder="******"
              name="password"
              errorMessage={errors.password?.message}
              label="Password"
              register={{ ...register("password") }}
            />
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 rounded-md bg-slate-900 text-white"
              >
                {isLoading ? "Loading..." : "Log In"}
              </button>
            </div>
            <p className="px-6 text-sm text-center text-white">
              Don't have an account yet?{" "}
              <Link
                to={`/signin?redirect=${redirect}`}
                className="hover:underline text-white"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

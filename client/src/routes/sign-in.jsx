import React, { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { api, apiUrl } from "../../utils";
import toast from "react-hot-toast";
const SigninForm = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setErrorMsg(null);
      setIsLoading(true);
      const res = await api.post(`${apiUrl}/sign-in`, {
        user: { email: data.email, password: data.password },
      });
      if (res.status === 200) {
        toast.success("Welcome back");
        navigate("/");
        return;
      }
    } catch (error) {
      if (error.response.data) {
        setErrorMsg(error.response?.data?.message);
        return;
      }
      toast.error(error.message || "something went wrong! please try again  ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex overflow-hidden">
      <section className="md:w-1/3 w-full object-cover object-center hidden lg:block">
        <img src="/IMG.jpg" />
      </section>
      <section className="md:w-2/3 w-full p-2 md:p-4 flex flex-col gap-8 mx-auto lg:mx-0">
        <div className="flex justify-between">
          <Button
            as={Link}
            to={"/"}
            text={"Back to Home"}
            size={"sm"}
            color={"primary"}
          />
          <p>
            New user?{" "}
            <Link to={"/sign-up"} className="text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="self-center md:w-96 w-full flex flex-col gap-4 mt-10"
        >
          <h4 className="text-lg font-bold">Sign In to Dribble</h4>
          {errorMsg && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <MdError />
              <span className="mb-0.5 font-semibold">{errorMsg}</span>
            </p>
          )}

          <Input
            name={"email"}
            type={"email"}
            label={"Email"}
            placeholder={"your email address"}
            labelPlacement={"outside"}
            labelStyle={"font-bold"}
            size={"sm"}
            {...register("email", {
              required: "required",
              minLength: {
                value: 8,
                message: "please enter at least 8 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            isInvalid={errors.email && true}
            errorMessage={errors.email && errors.email.message}
          />
          <Input
            name={"passwrd"}
            type={"text"}
            label={"Password"}
            placeholder={"create Password"}
            labelPlacement={"outside"}
            labelStyle={"font-bold"}
            size={"sm"}
            {...register("password", {
              required: "required",
              minLength: {
                value: 6,
                message: "please enter at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>/?])[\w!@#$%^&*()-_=+[\]{};:'",.<>/?]+$/,
                message:
                  "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
              },
            })}
            isInvalid={errors.password && true}
            errorMessage={errors.password && errors.password.message}
          />
          <Button
            type={"submit"}
            text={"Login"}
            color={"secondary"}
            isLoading={isLoading}
          />
        </form>
      </section>
    </main>
  );
};

export default SigninForm;

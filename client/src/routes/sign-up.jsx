import React, { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";
import { MdError } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { api, apiUrl } from "../../utils";
import toast from "react-hot-toast";
const SignupForm = () => {
  const [isSelected, setIsSelected] = useState(false);
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
      if (!isSelected) {
        toast.error("please agree the terms and conditions");
        return;
      }
      setErrorMsg(null);
      setIsLoading(true);
      const res = await api.post(`${apiUrl}/register`, data);
      toast.success("your account has been registered");
      navigate("/create-profile");
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMsg(error.response.data.message);
        return;
      }
      toast.error(
        error.message || "unexpected error occurred! please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex overflow-hidden">
      <section className="w-1/3 object-cover object-center hidden lg:block">
        <img src="/IMG.jpg" />
      </section>
      <section className="w-2/3 p-4 flex flex-col gap-8 self-center lg:self-start mx-auto lg:mx-0">
        <div className="flex justify-between">
          <Button
            as={Link}
            to={"/"}
            text={"Back to Home"}
            size={"sm"}
            color={"primary"}
          />
          <p>
            Already a member?{" "}
            <Link to={"/sign-in"} className="text-blue-700">
              Sign In
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="self-center md:w-96 w-full flex flex-col gap-4"
        >
          <h4 className="text-lg font-bold">
            Sign up to{" "}
            <span className="text-lg font-bold italic mr-3 text-rose-800">
              Dribble
            </span>
          </h4>
          {errorMsg && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <MdError />
              <span className="mb-0.5 font-semibold">{errorMsg}</span>
            </p>
          )}

          <div className="flex gap-3">
            <Input
              name={"name"}
              type={"text"}
              label={"Name"}
              placeholder={"your name"}
              labelPlacement={"outside"}
              labelStyle={"font-bold"}
              size={"sm"}
              // register={}
              {...register("name", {
                required: {
                  value: true,
                  message: "required",
                },
                minLength: {
                  value: 3,
                  message: "please enter at least 3 characters",
                },
              })}
              isInvalid={errors.name && true}
              errorMessage={errors.name && errors.name.message}
            />
            <Input
              name={"username"}
              type={"text"}
              label={"Username"}
              placeholder={"create username"}
              labelPlacement={"outside"}
              labelStyle={"font-bold"}
              size={"sm"}
              {...register("username", {
                required: "required",
                minLength: {
                  value: 4,
                  message: "please enter at least 4 characters",
                },
                pattern: {
                  value: /^[a-z0-9_]+$/,
                  message: "only lowercase letters , 0-9 and _ are allowed",
                },
              })}
              isInvalid={errors.username && true}
              errorMessage={errors.username && errors.username.message}
            />
          </div>
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
          <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size="sm"
          >
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Deserunt, similique. Lorem ipsum dolor sit amet.
            </p>
          </Checkbox>
          <Button
            type={"submit"}
            text={"Create Account"}
            color={"secondary"}
            isLoading={isLoading}
          />
          <p className="text-xs font-thin">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rem
            facere omnis fug
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignupForm;

import React, { useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { PopupModel } from "./Modal";
import { Input } from "@nextui-org/react";
import Button from "./Button";
import { useDisclosure } from "@nextui-org/react";
import { api, apiUrl } from "../../utils";
import toast from "react-hot-toast";
const emailVerify = ({ session }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const revalidator = useRevalidator();
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEmail = formData.get("email");
    try {
      setIsLoading(true);
      const res = await api.post(`${apiUrl}/update-profile`, {
        type: "changeEmail",
        email: session.email,
        newEmail: newEmail,
      });

      toast.success("email changed successfully");
      revalidator.revalidate();
      onClose();
    } catch (error) {
      toast.error(
        error.message || `something went wrong with ${error.status} code`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="md:h-[82vh] text-center flex flex-col items-center gap-4 w-full md:w-[40%] mx-auto justify-center my-5">
      <h2 className="text-2xl font-bold">Please verify your email...</h2>
      <MdOutlineMarkEmailRead className="text-6xl" />
      <p className="text-xs">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis sunt
        incidunt voluptates!
      </p>
      <h6 className="text-xs font-bold">{session.email}</h6>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure.</p>
      <p className="text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        soluta animi expedita aut, distinctio at iste?{" "}
        <Link to="#" className="text-semibold text-rose-800">
          resend the confirmation link
        </Link>
      </p>
      <p className="tetx-xs">
        Lorem, ipsum dolor.{" "}
        <PopupModel
          trigger={
            <span className="text-rose-800 cursor-pointer" onClick={onOpen}>
              Change it
            </span>
          }
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <form className="flex flex-col gap-3" onSubmit={handleEmailUpdate}>
            <p className="text-xs">
              your existing email :{" "}
              <span className="font-semibold">{session.email}</span>
            </p>
            <Input type="email" placeholder="Enter new Email" name="email" />
            <Button
              type="submit"
              text={"Change"}
              color={"danger"}
              className="self-start"
              isLoading={isLoading}
            />
          </form>
        </PopupModel>
      </p>
    </section>
  );
};

export default emailVerify;

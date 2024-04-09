import React from "react";
import Button from "../components/Button";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CustomRadio } from "../components/CustomRadio";
import { RadioGroup, cn } from "@nextui-org/react";
import { api } from "../../utils";
import { useNavigate, useRevalidator } from "react-router-dom";

const selectRole = () => {
  const [selected, setSelected] = React.useState();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const onFinish = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/update-profile", {
        role: selected,
        type: "role",
      });
      if (res.status === 200) {
        alert("Profile updated successfully");
        navigate("/");
        revalidator.revalidate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="h-screen p-2 md:p-5 flex flex-col gap-5">
      <section className="flex gap-5 items-center">
        <div>Dribble</div>
        <Button
          isIconOnly={true}
          size={"sm"}
          variant={"flat"}
          as={Link}
          to={"/create-profile"}
        >
          <FaAngleLeft />
        </Button>
      </section>
      <section className="self-center text-center ">
        <div>
          <h2 className="text-2xl font-bold">Lorem ipsum dolor sit amet.</h2>
          <p className="text-xs opacity-85 font-semibold mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            laboriosam?
          </p>
        </div>
        <form className="mt-16" onSubmit={onFinish}>
          <RadioGroup
            className="mb-8"
            value={selected}
            onValueChange={setSelected}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10">
              <CustomRadio
                description={"I'm designer looking to share my work"}
                value={"designer"}
                classNames={{
                  base: cn(
                    "flex flex-col-reverse border-2 rounded md:w-48 w-full py-3 px-5 data-[selected=true]:border-blue-500"
                  ),
                  description: "font-bold text-black mb-1",
                }}
              >
                <img src="/img1.png" className="w-full" />
              </CustomRadio>

              <CustomRadio
                description={"I'm lookin to hire a designer"}
                value={"recruiter"}
                classNames={{
                  base: cn(
                    "flex flex-col-reverse border-2 rounded md:w-48 w-full py-3 px-5 data-[selected=true]:border-blue-500"
                  ),
                  description: "font-bold text-black mb-1",
                }}
              >
                <img src="/img2.png" className="w-full" />
              </CustomRadio>

              <CustomRadio
                description={"I'm looking for design inpiration"}
                value={"design inpiration"}
                classNames={{
                  base: cn(
                    "flex flex-col-reverse border-2 rounded md:w-48 w-full py-3 px-5 data-[selected=true]:border-blue-500"
                  ),
                  description: "font-bold text-black mb-1",
                }}
              >
                <img src="/img3.png" className="w-full" />
              </CustomRadio>
            </div>
          </RadioGroup>
          <p className="text-xs font-semibold mb-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <Button
            type={"submit"}
            text={"Finish"}
            color={"secondary"}
            className={"px-12 font-semibold"}
            size={"sm"}
            isDisabled={!selected}
          />
        </form>
      </section>
    </main>
  );
};

export default selectRole;

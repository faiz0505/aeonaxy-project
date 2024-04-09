import React, { useState } from "react";
import { Avatar, Input } from "@nextui-org/react";
import Button from "../components/Button";
import axios from "axios";
import { api } from "../../utils";
import { useNavigate } from "react-router-dom";
const CreateProfile = () => {
  const [tempImgUrl, setTempImgurl] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      formData.append("upload_preset", "xw1bcpgf");
      const image = formData.get("file");
      formData.append("file", image);
      const location = formData.get("location");

      if (!image.size > 0 || location == "") {
        alert("please choose image or location to continue");
        return;
      }
      setIsLoading(true);
      const uploadImage = await axios.post(
        "https://api.cloudinary.com/v1_1/drev9bq6g/image/upload",
        formData
      );
      const res = await api.post("/update-profile", {
        type: "createProfile",
        imageUrl: uploadImage.data.secure_url,
        imageId: uploadImage.data.public_id,
        location: location,
      });
      if (res.status === 200) {
        alert("user updated successfully");
        navigate("/select-role");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="h-screen flex flex-col gap-8">
      <div>Dribble</div>
      <div className="self-center flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Welcome! Lets create your profile
          </h1>
          <p className="text-xs opacity-85 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="profile" className="font-bold">
            Add an avatar
          </label>
          <div className="flex gap-4 mt-2 mb-4">
            <Avatar size="lg" src={tempImgUrl} />
            <div>
              <label
                htmlFor="profile"
                className="text-sm shadow-small px-2 py-1 rounded-md font-semibold"
              >
                Choose Image
              </label>
            </div>
            <input
              id="profile"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              // multiple="false"
              onChange={(e) => {
                const url = URL.createObjectURL(e.target.files[0]);
                setTempImgurl(url);
              }}
            />
          </div>
          <label htmlFor="location" className="font-bold">
            Add your location
          </label>
          <Input
            id="location"
            name="location"
            placeholder="Enter a location"
            variant="underlined"
          />
          <Button
            type={"submit"}
            text={"Next"}
            color={"secondary"}
            className={"px-14 self-start"}
            isLoading={isLoading}
          />
        </form>
      </div>
    </main>
  );
};

export default CreateProfile;

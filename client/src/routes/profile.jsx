import React, { useEffect, useState } from "react";
import { api, apiUrl, getToken } from "../../utils";
import Button from "../components/Button";
import { useNavigate, useRevalidator } from "react-router-dom";
import toast from "react-hot-toast";

const profile = () => {
  const [session, setSession] = useState();
  const [userData, setUserData] = useState();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const res = await api.post(`${apiUrl}/fetch-user`, {
        user: session.email,
      });
      if (res.status === 200) {
        setUserData(res.data.user);
        return;
      }
    } catch (error) {
      toast.error(error.message || "something went wrong! Please try again");
    }
  };
  const handleLogout = async () => {
    try {
      const res = await api.post(`${apiUrl}/logout`);
      if (res.status === 200) {
        revalidator.revalidate();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message || "logout failed");
    }
  };
  useEffect(() => {
    getToken()
      .then((res) => setSession(res))
      .catch((error) => {
        setError(typeof error === "string" ? error : error.toString());
      });
  }, []);
  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);
  return (
    <main className="w-full min-h-[85vh] flex flex-col gap-4 items-center justify-center">
      <p>
        your name : <span className="font-bold">{userData?.name}</span>
      </p>
      <p>
        your username : <span className="font-bold">{userData?.username}</span>
      </p>
      <p>
        your email : <span className="font-bold">{userData?.email}</span>
      </p>
      <p>
        your location : <span className="font-bold">{userData?.location}</span>
      </p>
      <Button color="danger" text={"Log Out"} handleClick={handleLogout} />
    </main>
  );
};

export default profile;

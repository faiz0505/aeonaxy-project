import React, { useEffect, useState } from "react";
import EmailVerify from "../components/emailVerify";
import { getToken } from "../../utils";
import { Link } from "react-router-dom";

const index = () => {
  const [session, setSession] = useState();
  useEffect(() => {
    getToken().then((res) => {
      setSession(res);
    });
  }, []);

  if (!session?.user) {
    return (
      <main className="w-full py-60 flex justify-center items-center">
        <h4 className="text-4xl font-bold">
          Please Register/SingIn to continue...
        </h4>
      </main>
    );
  }

  return !session?.user.isVerified ? (
    <EmailVerify session={session} />
  ) : (
    <main className="w-full min-h-[85vh] flex flex-col gap-4 items-center justify-center">
      <h4 className="text-4xl font-bold">You are Logged in</h4>
    </main>
  );
};

export default index;

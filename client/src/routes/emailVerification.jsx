import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useRevalidator } from "react-router-dom";
import { api, apiUrl } from "../../utils";
import toast from "react-hot-toast";
const emailVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  useEffect(() => {
    setIsLoading(true);
    api
      .post(`${apiUrl}/verify-token`, { token })
      .then((res) => {
        if (res.status === 200) {
          toast.success("email verified successfully");
          revalidator.revalidate();
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message || `verification failed with ${err.status}`);
      });
  }, []);

  return <main>{isLoading && "verifying..."}</main>;
};

export default emailVerification;

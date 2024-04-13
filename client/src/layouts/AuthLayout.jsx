import { Outlet, useNavigate } from "react-router-dom";
// import { getToken } from "../../utils";
// import { useEffect } from "react";

export default function AuthLayout() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const checkAuthAndRedirect = async () => {
  //     const session = await getToken();
  //     if (!session) {
  //       navigate("/sign-up");
  //     }
  //   };

  //   checkAuthAndRedirect();
  // }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
}

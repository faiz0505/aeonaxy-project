import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import IndexPage from "./routes/index.jsx";
import SignIn from "./routes/sign-in.jsx";
import SignUpPage from "./routes/sign-up.jsx";
import SelectRole from "./routes/selectRole.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import { NextUIProvider } from "@nextui-org/react";
import CreateProfile from "./routes/create-profile.jsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "create-profile", element: <CreateProfile /> },
      { path: "select-role", element: <SelectRole /> },
    ],
  },
  {
    element: <RootLayout />,
    children: [{ path: "/", element: <IndexPage /> }],
  },
]);
// const navigate = useNavigate();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
    {/* </ClerkProvider> */}
  </React.StrictMode>
);

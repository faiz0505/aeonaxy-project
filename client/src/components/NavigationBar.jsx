import React, { useEffect } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Button from "../components/Button";
export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState();
  const [session, setSession] = React.useState(false);
  const menuItems = ["Profile", "Dashboard", "Activity", "Analytics"];
  useEffect(() => {
    getToken().then((res) => res && setSession(res?.user));
  }, []);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarItem className="text-lg font-bold italic mr-3 text-rose-800">
          <Link to="/">Dribble</Link>
        </NavbarItem>
        <div className="hidden lg:flex gap-3 ">
          {menuItems.map((item, i) => {
            return (
              <NavbarItem key={i} className="text-sm">
                <Link to="#" className="text-gray-800">
                  {item}
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>
      {!session ? (
        <NavbarContent justify="end">
          <Input
            type="text"
            placeholder="search"
            size="sm"
            startContent={<FaMagnifyingGlass />}
            className=" w-32"
          />
          <NavbarItem className="hidden md:block">
            <Button
              text="SignIn"
              size="sm"
              color="primary"
              as={Link}
              variant="bordered"
              to="/sign-in"
            />
          </NavbarItem>
          <NavbarItem>
            <Button
              text="Signup"
              size="sm"
              color="secondary"
              as={Link}
              to="/sign-up"
            />
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Input
              type="text"
              placeholder="search"
              size="sm"
              startContent={<FaMagnifyingGlass />}
            />
          </NavbarItem>
          <NavbarItem>
            <Link to={"/profile"}>
              <Avatar size="sm" src={session.profile} showFallback />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              text="Upload"
              size="sm"
              color="secondary"
              as={Link}
              to="#"
            />
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden ml-auto"
      />
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

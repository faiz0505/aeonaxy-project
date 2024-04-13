import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const demoListArray = [
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
    { title: "Lorem, ipsum.", link: "#" },
  ];

  return (
    <footer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-lime-50 p-2 md:p-5 text-balance">
      <aside>
        <div className="text-lg font-bold italic mr-3 text-rose-800">
          Dribble
        </div>
        <p className="text-xs">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia tenetur
          atque rerum cupiditate.
        </p>
        <div className="flex gap-3 mt-4">
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
          <FaGithub />
        </div>
      </aside>
      <aside>
        <h5 className="font-bold text-sm">For designers</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <aside>
        <h5 className="font-bold text-sm">Hire designers</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.slice(0, 3).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <h5 className="font-bold text-sm mt-3">Brands</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.slice(0, 1).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <aside>
        <h5 className="font-bold text-sm">Company</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <aside>
        <h5 className="font-bold text-sm">Directories</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.slice(0, 6).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <h5 className="font-bold text-sm mt-3">Design Assests</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.slice(0, 4).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <aside>
        <h5 className="font-bold text-sm">Design Resources</h5>
        <ul className="text-xs flex flex-col gap-1 mt-3 font-semibold">
          {demoListArray.slice(0, 6).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </footer>
  );
};

export default Footer;

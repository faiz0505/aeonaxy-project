import React from "react";
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
    <footer
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      <aside>
        <div>Dribble</div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia tenetur
          atque rerum cupiditate.
        </p>
        <div></div>
      </aside>
      <aside>
        <h5>For designers</h5>
        <ul>
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
        <h5>Hire designers</h5>
        <ul>
          {demoListArray.slice(0, 3).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <h5>Brands</h5>
        <ul>
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
        <h5>Company</h5>
        <ul>
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
        <h5>Directories</h5>
        <ul>
          {demoListArray.slice(0, 6).map((item, i) => {
            return (
              <li key={i}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <h5>Design Assests</h5>
        <ul>
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
        <h5>Design Resources</h5>
        <ul>
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

import React from "react";
import "./../assets/styles/Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <a href="/" className="brand">
          都道府県別の総人口推移グラフ
        </a>
      </div>
    </header>
  );
}

export default Header;

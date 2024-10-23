import React, { useState } from "react";
import "../CSS/NavbarStyles.css";
import { Link } from "react-router-dom";
import { MenuItems } from "./Menultems";
import { useAuth } from '../context/AuthContext'; // 导入 useAuth

const Navbar = () => {
  const { user, logout } = useAuth(); // 获取用户信息和退出方法
  const [clicked, setClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false); // 关闭下拉菜单
    logout(); // 执行登出
  };

  const avatarUrl = user && user.avatar ? `http://localhost:8000/${user.avatar}` : 'http://localhost:8000/media/avatar/02.png'; 

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">TravelIQ</h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.filter(item => {
          // 仅在用户未登录时显示登录和注册链接
          return !(item.title === "登录" || item.title === "注册") || !user;
        }).map((item, index) => (
          <li key={index}>
            <Link to={item.url} className={item.cName}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}

        {user && ( // 如果用户已登录，显示头像和用户名
          <li className="user-info" onClick={toggleDropdown}>
            <img src={avatarUrl} alt="用户头像" className="user-avatar" />
            <span>{user.username}</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="#" className="logout-btn" onClick={handleLogout}>退出登录</Link>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

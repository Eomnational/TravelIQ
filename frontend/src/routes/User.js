import React, { useState } from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import UserImg from "../assets/night.jpg";
import Footer from "../Components/Footer";
import ChangeSelfInfo from "./ChangeSelfInfo"; 
import ChangePassword from "./ChangePassword"; // 导入 ChangePassword
import Profile from "../Components/Profile";

function User() {
  const [currentView, setCurrentView] = useState("profile"); // 状态管理当前视图

  const handleEdit = () => {
    setCurrentView("changeSelfInfo"); // 进入编辑模式
  };

  const handleChangePassword = () => {
    setCurrentView("changePassword"); // 进入修改密码模式
  };

  const handleBack = () => {
    setCurrentView("profile"); // 返回到个人信息视图
  };

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={UserImg}
        title="User"
        btnClass="hide"
      />
      {currentView === "changeSelfInfo" ? (
        <ChangeSelfInfo onBack={handleBack} /> // 传递返回函数
      ) : currentView === "changePassword" ? (
        <ChangePassword onBack={handleBack} /> // 传递返回函数
      ) : (
        <Profile onEdit={handleEdit} onChangePassword={handleChangePassword} /> // 修正属性名称
      )}
      <Footer />
    </>
  );
}

export default User;


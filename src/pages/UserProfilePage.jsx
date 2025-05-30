import React from "react";
import { Link } from "react-router-dom";
// import { inputStyle, buttonStyle, pageContainer, titleStyle } from '../components/SharedStyles';
export const inputStyle = "border border-black p-2 w-80 text-center text-lg";
export const buttonStyle =
  "bg-gray-400 text-white px-4 py-2 text-lg w-80 mt-2 disabled:opacity-50";
export const pageContainer =
  "flex flex-col items-center justify-center min-h-screen space-y-4 font-serif";
export const titleStyle = "text-3xl font-bold mt-4";

const ProfilePage = () => {
  const handleLogout = () => {
    // localStorage.removeItem("token"); // Удаляем токен
    // localStorage.removeItem("userData"); // Удаляем данные пользователя
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <header className="gia-header">
        <div className="gia-square"></div>
        <div className="gia-logo-block">
          <h1 className="gia-title">Проверь ГИА</h1>
        </div>
        <nav className="gia-nav">
          <Link to="/dashboard">Проверить бланк</Link>
        </nav>
        <nav className="gia-nav">
          {/* <Link to="/profile">Кабинет</Link> */}
          <a href="/">Выйти</a>
        </nav>
        <div className="gia-square"></div>
      </header>

      <div className="form-file">
        <h2 className="form-file">Кабинет</h2>
        <div className="form-fild">
          <p>Имя</p>
          <p>Ленс</p>
        </div>
        <div className="form-fild">
          <p>Фамилия</p>
          <p>Свитс</p>
        </div>
        <div className="form-fild">
          <p>Статус</p>
          <p>Прочее</p>
        </div>
        <div className="form-fild">
          <p>Почта</p>
          <p>afjh@gmail.com</p>
        </div>
        {/* <div className="mt-4">
        <input className={inputStyle} placeholder="Имя" />
        <input className={inputStyle} placeholder="Фамилия" />
        <input className={inputStyle} placeholder="Статус" />
        <input className={inputStyle} placeholder="Почта" />
        <div className="flex space-x-2 mt-2">
          <button className={buttonStyle}>Изменить</button>
          <button className={buttonStyle}>Отменить</button>
        </div>
      </div> */}
      </div>
      <footer className="gia-footer">
        <div className="gia-square"></div>
        <div className="gia-square"></div>
      </footer>
    </div>
  );
};
export default ProfilePage;

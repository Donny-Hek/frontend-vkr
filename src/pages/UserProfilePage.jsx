import React from 'react';
// import { inputStyle, buttonStyle, pageContainer, titleStyle } from '../components/SharedStyles';
export const inputStyle = "border border-black p-2 w-80 text-center text-lg";
export const buttonStyle = "bg-gray-400 text-white px-4 py-2 text-lg w-80 mt-2 disabled:opacity-50";
export const pageContainer = "flex flex-col items-center justify-center min-h-screen space-y-4 font-serif";
export const titleStyle = "text-3xl font-bold mt-4";
export default function ProfilePage() {
  return (
    <div className={pageContainer}>
      <h1 className={titleStyle}>Кабинет</h1>
      <div>
        <p>Имя</p>
        <div className="bg-gray-500 text-white w-80 text-center">Поле для отображения имени</div>
        <p>Фамилия</p>
        <div className="bg-gray-500 text-white w-80 text-center">Поле для отображения фамилии</div>
        <p>Статус</p>
        <div className="bg-gray-500 text-white w-80 text-center">Поле для отображения статуса</div>
        <p>Почта</p>
        <div className="bg-gray-500 text-white w-80 text-center">Поле для отображения почты</div>
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
  );
}
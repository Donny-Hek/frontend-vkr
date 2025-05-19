import React from "react";
// import "../styles/HomePage.css";
import '../styles/global.css';
import { Link, Navigate } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="gia-page">
      {/* Header */}
      <header className="gia-header">
        <div className="gia-square"></div>
        <div className="gia-logo-block">
          <h1 className="gia-title">Проверь ГИА</h1>
        </div>
        <nav className="gia-nav">
          <a href="#">О нас</a>
          <a href="#">Подписка</a>
          <a href="#">Задать вопрос</a>
        </nav>
        <div className="gia-square"></div>
      </header>

      {/* Hero Section */}
      <section className="gia-hero">
        <h2>
          Доверьте проверку бланков <br className="desktop-line" /> тестовой части нам!
        </h2>
        <Link to={"/login"} className="gia-start-button">Войти и начать проверку</Link>
      </section>

      <hr className="gia-divider" />

      {/* How it works */}
      <section className="gia-section">
        <h3>Как это работает?</h3>
        <ol className="gia-list">
          <li>Выбираете экзамен</li>
          <li>Скачиваете и заполняете файл с ответами</li>
          <li>Загружаете фото бланков и файл с ответами</li>
          <li>Ожидаете окончания проверки ;)</li>
          <li>Всё готово! Скачивайте файл с результатом проверки!</li>
        </ol>
      </section>

      <hr className="gia-divider" />

      {/* Pricing */}
      <section className="gia-section">
        <h3>Варианты предоставления услуг</h3>
        <div className="gia-pricing">
          <div>
            <h4>Бесплатно</h4>
            <ul>
              <li>До 10 фото/1 проверка</li>
              <li>До 4 проверок/мес</li>
              <li>Результаты хранятся неделю после проверки</li>
            </ul>
            <h4>В процессе разработки...</h4>
          </div>
        </div>
      </section>

      <hr className="gia-divider" />

      {/* Feedback Form */}
      <section className="gia-section">
        <h3>Форма обратной связи</h3>
        <form className="gia-form">
          <input type="email" placeholder="Ваша почта для обратной связи" />
          <textarea placeholder="Ваш вопрос"></textarea>
          <button type="submit">Отправить</button>
        </form>
        <p className="gia-note">
          Задайте интересующий вас вопрос, мы будем рады на него ответить!
        </p>
      </section>

      <footer className="gia-footer">
        <button className="gia-top-button">Наверх</button>
      </footer>
    </div>
  );
}
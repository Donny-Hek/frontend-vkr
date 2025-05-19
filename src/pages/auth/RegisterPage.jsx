import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthConsumer } from "../../context/AuthContext";
// import '/src/styles/global.css';

// Схема валидации
const schema = yup.object().shape({
  name: yup.string().required("* Обязательное"),
  email: yup.string().email("* Некорректный email").required("* Обязательное"),
  password: yup
    .string()
    .required("* Обязательное")
    .min(8, "* Пароль должен быть не менее 8 символов")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Пароль должен содержать заглавные буквы, строчные буквы и цифры"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "* Пароли должны совпадать")
    .required("* Обязательное"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => (
    <AuthConsumer>
      {({ register: registerUser }) => {
        registerUser(data)
          .then(() => navigate("/dashboard"))
          .catch((error) => {
            console.error("Registration failed:", error);
            alert("Ошибка регистрации: " + error.message);
          });
      }}
    </AuthConsumer>
  );

  return (
    <div className="gia-page">
      <header className="gia-header">
        <div className="gia-square"></div>
        <div className="gia-logo-block">
          <h1 className="gia-title">Проверь ГИА</h1>
        </div>
        <nav className="gia-nav">
          <a href="/">О сайте</a>
        </nav>
        <div className="gia-square"></div>
      </header>
      <div className="gia-hero">
        <h2>Зарегистрируйтесь</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Имя"
              {...register("name")}
              className={errors.name ? "is-invalid" : ""}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Фамилия"
              {...register("name")}
              className={errors.name ? "is-invalid" : ""}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Логин"
              {...register("email")}
              className={errors.email ? "is-invalid" : ""}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Пароль"
              {...register("password")}
              className={errors.password ? "is-invalid" : ""}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Подтвердите пароль"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "is-invalid" : ""}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <button type="submit" className="gia-start-button">
            Зарегистрироваться
          </button>

          <div className="auth-footer">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

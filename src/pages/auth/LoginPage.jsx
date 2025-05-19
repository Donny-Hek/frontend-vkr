import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthConsumer } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("* Некорректный email").required("* Обязательное"),
  password: yup
    .string()
    .required("* Обязательное")
    .min(8, "* Пароль должен быть не менее 8 символов"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => (
    <AuthConsumer>
      {({ login }) => {
        login(data)
          .then(() => {
            const { from } = location.state || {
              from: { pathname: "/dashboard" },
            };
            history.replace(from);
          })
          .catch((error) => {
            console.error("Login failed", error);
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
        <h2>Войдите</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              name="email"
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
              name="password"
              type="password"
              placeholder="Пароль"
              {...register("password")}
              className={errors.password ? "is-invalid" : ""}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="gia-start-button">
            Войти
          </button>
          <div className="auth-footer">
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import { useNavigate } from "react-router-dom";
import React from "react";

import style from "./style.module.scss";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className={style.section}>
      <h1 className={style.title}>Нет доступа на эту страницу</h1>

      <button onClick={goBack} className={style.link}>
        Назад
      </button>
    </section>
  );
};

export default Unauthorized;

import { Link } from "react-router-dom";
import React from "react";

import style from "./style.module.scss";

const Missing = () => {
  return (
    <section className={style.section}>
      <h1 className={style.title}>Упс! Страница не найдена</h1>
      <div className={style.link}>
        <Link to="/">На главную страницу</Link>
      </div>
    </section>
  );
};

export default Missing;

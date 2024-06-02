import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { FaArrowRightLong } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

import style from "./style.module.scss";

export default function Products() {
  const [productList, setProductList] = useState([]);
  const { cookies } = useAuth();

  useEffect(() => {
    refreshProductList();
  }, []);

  function refreshProductList() {
    setProductList([]);
    axios
      .get("/products")
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className={style.section}>
      <h1 className={style.title}>
        Наши услуги{" "}
        {cookies.get("roles") && cookies.get("roles").includes("Admin") && (
          <Link to="/productsedit">(Редактировать)</Link>
        )}
      </h1>
      <div className={style.content}>
        {productList.map((product, index) => {
          if (index % 2 === 0)
            return (
              <div key={product.id} className={style.card}>
                <div className={style.card__content}>
                  <Link to="/usershift">
                    <h2 className={style.card__content_title}>
                      <FaArrowRightLong />
                      <span>{product.name}</span>
                    </h2>
                  </Link>
                  <p className={style.card__content_text}>
                    {product.description}
                  </p>
                  <p className={style.card__content_price}>
                    <span>от</span> {product.price} ₽
                  </p>
                </div>
                <img
                  className={style.card__img}
                  src={`http://localhost:5288/images/${product.imagePath}`}
                />
              </div>
            );
          else
            return (
              <div key={product.id} className={style.card}>
                <img
                  className={style.card__img}
                  src={`http://localhost:5288/images/${product.imagePath}`}
                />
                <div className={style.card__content}>
                  <Link to="/usershift">
                    <h2 className={style.card__content_title}>
                      <FaArrowRightLong />
                      <span>{product.name}</span>
                    </h2>
                  </Link>
                  <p className={style.card__content_text}>
                    {product.description}
                  </p>
                  <p className={style.card__content_price}>
                    <span>от</span> {product.price} ₽
                  </p>
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import Product from "./Product";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { productAPI } from "../../services/ProductService";
import style from "./style.module.scss";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshProductList();
  }, []);

  function refreshProductList() {
    productAPI(axiosPrivate)
      .fetchAll()
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addOrEdit = (formData, onSuccess) => {
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    if (formData.get("Id") === "") {
      productAPI(axiosPrivate)
        .create(formData)
        .then((response) => {
          onSuccess(response.data);
          refreshProductList();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      productAPI(axiosPrivate)
        .update(formData.get("Id"), formData)
        .then((response) => {
          onSuccess(response.data);
          refreshProductList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const showRecordDetails = (data) => {
    console.log("ShowRecordDetails", data);
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product"))
      productAPI(axiosPrivate)
        .delete(id)
        .then((response) => {
          refreshProductList();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const imageCard = (data) => {
    data.imageSrc = `http://localhost:5288/images/${data.imagePath}`;
    return (
      <div
        className={style.card}
        onClick={() => {
          showRecordDetails(data);
        }}
      >
        <img src={data.imageSrc} className={style.card__img} />
        <div className={style.card__body}>
          <h2 className={style.card__body__title}>{data.name}</h2>
          <p>{data.description}</p>
          <h3 className={style.card__body__price}>{`₽ ${Number(
            data.price
          ).toFixed(2)}`}</h3>
          <button
            onClick={(e) => onDelete(e, data.id)}
            className={style.card__body__btn}
          >
            <i className="far fa-trash-alt"></i> Удалить
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className={style.title}>Услуги</h1>
      <section className={style.section}>
        <div>
          <Product addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </div>
        <div className={style.product_list}>
          {productList.map((elem, index) => (
            <div key={index}>{imageCard(elem)}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

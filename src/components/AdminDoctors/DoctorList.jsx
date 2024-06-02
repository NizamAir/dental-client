import { useEffect, useState } from "react";
import Doctor from "./Doctor";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { doctorAPI } from "../../services/DoctorService";

import style from "./style.module.scss";

export default function DoctorList() {
  const [doctorList, setDoctorList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshDoctorList();
  }, []);

  function refreshDoctorList() {
    doctorAPI(axiosPrivate)
      .fetchAllForAdmin()
      .then((response) => {
        console.log(response.data);
        setDoctorList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addOrEdit = (formData, onSuccess) => {
    const reqData = {};

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
      reqData[pair[0]] = pair[1];
    }

    doctorAPI(axiosPrivate)
      .update(formData.get("Id"), formData)
      .then((response) => {
        onSuccess(response.data);
        refreshDoctorList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showRecordDetails = (data) => {
    console.log("ShowRecordDetails", data);
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product"))
      doctorAPI(axiosPrivate)
        .delete(id)
        .then((response) => {
          refreshDoctorList();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const imageCard = (data) => {
    data.imageSrc = `http://localhost:5288/images/${data.imageName}`;

    return (
      <div
        className={style.card}
        onClick={() => {
          showRecordDetails(data);
        }}
      >
        <img src={data.imageSrc} className={style.card__img} />
        <div className={style.card__body}>
          <h3 className={style.card__body__title}>
            {data.lastName} {data.firstName} <p>{data.fatherName}</p>
          </h3>
          <p>Стаж: {data.workExperience}</p>
          <p>Образование: {data.education}</p>
          <p>Специальность: {data.specialization}</p>

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
      <h1 className={style.title}>Доктора</h1>

      <section className={style.section}>
        <div>
          <Doctor addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </div>
        <div className={style.doctor_list}>
          {doctorList.map((elem, index) => (
            <div key={index}>{imageCard(elem)}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

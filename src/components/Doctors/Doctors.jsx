import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import { MdOutlineStar } from "react-icons/md";

import style from "./style.module.scss";

export default function Doctors() {
  const [doctorList, setDoctorList] = useState([]);
  const { cookies } = useAuth();
  useEffect(() => {
    refreshDoctorList();
  }, []);

  function refreshDoctorList() {
    axios
      .get("/doctors")
      .then((response) => {
        console.log(response.data);
        setDoctorList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className={style.section}>
      <h1 className={style.title}>
        Наши специалисты
        {cookies.get("roles") && cookies.get("roles").includes("Admin") && (
          <Link to="/doctorsedit">(Редактировать)</Link>
        )}
      </h1>
      <div className={style.content}>
        {doctorList.map((doctor) => (
          <Link
            key={doctor.doctor.id}
            to={`/doctors/${doctor.doctor.id}`}
            state={doctor}
          >
            <div className={style.card}>
              <img
                src={`http://localhost:5288/images/${doctor.doctor.imageName}`}
              />
              {doctor.rating === "0.0" ? (
                <p className={style.card__norating}>Нет оценок</p>
              ) : (
                <p className={style.card__rating}>
                  <MdOutlineStar color="#ffcc00" />
                  <span>{doctor.rating}</span>
                </p>
              )}

              <h2 className={style.card__title}>
                {doctor.doctor.lastName} {doctor.doctor.firstName}{" "}
                {doctor.doctor.fatherName}
              </h2>
              <p className={style.card__text}>
                {" "}
                {doctor.doctor.specialization}{" "}
              </p>
              <p className={style.card__text}>
                стаж более {doctor.doctor.workExperience} лет
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

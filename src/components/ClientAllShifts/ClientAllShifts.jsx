import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import style from "./style.module.scss";
import { clientShiftsAPI } from "../../services/ClientShiftsService";
import { Link } from "react-router-dom";

import Review from "../Review/Review";

import { MdOutlineCancel, MdOutlineRateReview } from "react-icons/md";

export default function ClientAllShifts() {
  const [shifts, setShifts] = useState([]);
  const [oldShifts, setOldShifts] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const todayDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  // console.log(todayDay);

  useEffect(() => {
    refreshShiftsList();
  }, []);

  function refreshShiftsList() {
    setShifts([]);
    setOldShifts([]);
    clientShiftsAPI(axiosPrivate)
      .fetchShifts()
      .then((response) => {
        console.log("data", response.data);
        response.data.map((item) => {
          let tmpDate = new Date(
            item.shiftDate.split(".")[2],
            item.shiftDate.split(".")[1] - 1,
            item.shiftDate.split(".")[0]
          );
          if (tmpDate <= todayDay) {
            setOldShifts((prev) => [...prev, item]);
          } else {
            setShifts((prev) => [...prev, item]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDeleteShift = (event, id) => {
    event.preventDefault();
    if (window.confirm("Вы уверены, что хотите отменить запись на приём?")) {
      clientShiftsAPI(axiosPrivate)
        .delete(id)
        .then((response) => {
          console.log(response.data);
          refreshShiftsList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <section className={style.section}>
      <div className={style.content}>
        <div className={style.old}>
          <h2 className={style.content__title}>Прошлые посещения:</h2>
          {oldShifts.map((shift) => (
            <div key={shift.id} className={style.card}>
              <p>{shift.productName}</p>
              <p>Врач: {shift.doctorName}</p>
              {shift.assistantName ? (
                <p>Ассистент: {shift.assistantName}</p>
              ) : (
                <p>Без ассистента</p>
              )}

              <p className={style.card__time}>
                Время:{" "}
                <span>
                  {shift.shiftDate} {shift.shiftTime}
                </span>
              </p>

              <div>
                <Review shift={shift} />
              </div>
            </div>
          ))}
        </div>
        <div className={style.new}>
          <h2 className={style.content__title}>Предстоящие посещения:</h2>
          {shifts.map((shift) => (
            <div key={shift.id} className={style.card}>
              <p>{shift.productName}</p>
              <p>Врач: {shift.doctorName}</p>
              {shift.assistantName ? (
                <p>Ассистент: {shift.assistantName}</p>
              ) : (
                <p>Без ассистента</p>
              )}

              <p className={style.card__time}>
                Время:{" "}
                <span>
                  {shift.shiftDate} {shift.shiftTime}
                </span>
              </p>

              <div
                className={style.delete__icon}
                onClick={(event) => handleDeleteShift(event, shift.id)}
              >
                <MdOutlineCancel size={20} color="white" /> <p>Отменить</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

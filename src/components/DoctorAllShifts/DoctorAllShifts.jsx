import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import style from "./style.module.scss";

import { MdOutlineCancel } from "react-icons/md";
import { doctorShiftsAPI } from "../../services/DoctorShiftsService";

export default function DoctorAllShifts() {
  const [shifts, setShifts] = useState([]);
  const [oldShifts, setOldShifts] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const todayDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  useEffect(() => {
    refreshShiftsList();
  }, []);

  function refreshShiftsList() {
    setShifts([]);
    setOldShifts([]);
    doctorShiftsAPI(axiosPrivate)
      .fetchShifts()
      .then((response) => {
        console.log("data", response.data);
        let tmpArr = [];
        let date = response.data[0].date;
        tmpArr.push(response.data[0]);
        response.data.map((data, index) => {
          if (data.date !== date && index > 0) {
            date = data.date;
            tmpArr.push(data);
          }
        });
        tmpArr.map((item) => {
          let tmpDate = new Date(
            item.date.split(".")[2],
            item.date.split(".")[1] - 1,
            item.date.split(".")[0]
          );
          if (tmpDate < todayDay) {
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

  const handleDeleteShift = (event, date) => {
    event.preventDefault();
    console.log(date);
    let tmpDate = new Date(
      date.split(".")[2],
      date.split(".")[1] - 1,
      date.split(".")[0]
    );
    let normDate = `${tmpDate.getFullYear()}-${
      tmpDate.getMonth() + 1 < 10
        ? "0" + (tmpDate.getMonth() + 1)
        : tmpDate.getMonth() + 1
    }-${tmpDate.getDate() < 10 ? "0" + tmpDate.getDate() : tmpDate.getDate()}`;
    console.log("tmpdate", tmpDate);
    console.log("normDate", normDate);
    if (window.confirm("Вы уверены, что хотите удалить смену?")) {
      doctorShiftsAPI(axiosPrivate)
        .delete(JSON.stringify({ date: normDate }))
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
      <h1 className={style.title}>Смены</h1>
      <div className={style.content}>
        <div className={style.old}>
          <h2 className={style.content__title}>Старые смены:</h2>
          {oldShifts.map((shift, index) => (
            <div key={index} className={style.card}>
              <p className={style.card__time}>
                Дата: <span>{shift.date}</span>
              </p>
              {shift.assistantName ? (
                <p>Ассистент: {shift.assistantName}</p>
              ) : (
                <p>Без ассистента</p>
              )}
            </div>
          ))}
        </div>
        <div className={style.new}>
          <h2 className={style.content__title}>Предстоящие смены:</h2>
          {shifts.map((shift, index) => (
            <div key={index} className={style.card}>
              <p className={style.card__time}>
                Дата: <span>{shift.date}</span>
              </p>
              {shift.assistantName ? (
                <p>
                  Ассистент: <br /> {shift.assistantName}
                </p>
              ) : (
                <p>Без ассистента</p>
              )}

              {todayDay <
                new Date(
                  shift.date.split(".")[2],
                  shift.date.split(".")[1] - 1,
                  shift.date.split(".")[0]
                ) &&
                shift.assistantName === null &&
                shift.clientName === null && (
                  <div
                    className={style.delete__icon}
                    onClick={(event) => handleDeleteShift(event, shift.date)}
                  >
                    <MdOutlineCancel size={20} color="white" /> <p>Отменить</p>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

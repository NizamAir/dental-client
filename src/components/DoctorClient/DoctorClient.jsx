import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { doctorShiftsAPI } from "../../services/DoctorShiftsService";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);
import DatePicker from "react-datepicker";

import style from "./style.module.scss";

export default function DoctorClient() {
  const [shifts, setShifts] = useState([]);
  const [wasSelectedDate, setWasSelectedDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshShiftsList();
  }, []);

  function refreshShiftsList() {
    doctorShiftsAPI(axiosPrivate)
      .fetchDates()
      .then((response) => {
        console.log(response.data);

        // setShifts(response.data);
        let tmpArr = [];

        response.data.map((data, index) => {
          let tmpDate = new Date(
            data.split(".")[2],
            data.split(".")[1] - 1,
            data.split(".")[0]
          );
          tmpArr.push(tmpDate);
        });
        setWasSelectedDate(tmpArr);
        setSelectedDate(tmpArr[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleDatesChange = (date) => {
    setSelectedDate(date);
    let tmpDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    doctorShiftsAPI(axiosPrivate)
      .fetchClients(JSON.stringify({ date: tmpDate }))
      .then((response) => {
        console.log(response.data);
        setShifts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className={style.title}>Мои клиенты</h1>
      <section className={style.section}>
        <div>
          <h2 className={style.section__title}>Выбранная дата:</h2>

          <DatePicker
            locale="ru"
            includeDates={wasSelectedDate}
            selected={selectedDate}
            onSelect={(date) => handleDatesChange(date)}
          />
        </div>
        <div className={style.section__cards}>
          {shifts.map((shift) => (
            <div className={style.section__cards__card} key={shift.id}>
              <h3 className={style.section__cards__card__title}>
                {shift.shiftTime}
              </h3>
              {shift.productName ? (
                <p>Услуга: {shift.productName}</p>
              ) : (
                <p>Услуга не выбрана</p>
              )}
              {shift.clientName ? (
                <p>Клиент: {shift.clientName}</p>
              ) : (
                <p>Нет клиента</p>
              )}

              {shift.assistantName ? (
                <p>Ассистент: {shift.assistantName}</p>
              ) : (
                <p>Без ассистента</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

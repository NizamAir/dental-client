import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns";
import "react-datepicker/src/stylesheets/datepicker.scss";
import { doctorShiftsAPI } from "../../services/DoctorShiftsService";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

import style from "./style.module.scss";

import "./style.css";

registerLocale("ru", ru);

const DoctorShift = () => {
  const [wasSelectedDate, setWasSelectedDate] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  // const minDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const minDate = new Date(new Date());
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshShiftsList();
  }, []);

  function refreshShiftsList() {
    setShifts([]);
    setWasSelectedDate([]);
    doctorShiftsAPI(axiosPrivate)
      .fetchDates()
      .then((response) => {
        console.log(response.data);
        response.data.map((data) => {
          let tmpDate = new Date(
            data.split(".")[2],
            data.split(".")[1] - 1,
            data.split(".")[0]
          );
          console.log("data", data);
          console.log("wasSelectedDate", wasSelectedDate);
          if (tmpDate >= minDate) {
            setShifts((prev) => [...prev, data]);
          }
          setWasSelectedDate((prev) => [...prev, tmpDate]);
          // if (tmpDate > Date.now()) {
          //   setShifts((prev) => [...prev, data]);
          // }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleChange = (date) => {
    const tmpDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

    setSelectedDates([...selectedDates, tmpDate]);
  };
  const handleSubmit = () => {
    selectedDates.sort(function (a, b) {
      let dateA = new Date(a);
      let dateB = new Date(b);
      return dateA - dateB;
    });
    doctorShiftsAPI(axiosPrivate)
      .create(JSON.stringify({ dates: selectedDates }))
      .then((response) => {
        refreshShiftsList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className={style.section}>
      <h1 className={style.title}>Выбор смены</h1>
      <div className={style.content}>
        <div>
          <div>
            {selectedDates.length ? (
              <>
                <h2 className={style.content__title}>Выбранные даты:</h2>
                <ul className={style.content__selected}>
                  {selectedDates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </>
            ) : (
              <h2 className={style.content__title}>Даты не выбраны </h2>
            )}
          </div>

          <div className={style.content__datepicker}>
            <DatePicker
              placeholderText="Выберите даты"
              locale="ru"
              minDate={minDate}
              maxDate={maxDate}
              // selected={startDate}
              // startDate={startDate}
              // endDate={endDate}
              excludeDates={wasSelectedDate}
              inline={false}
              selectsMultiple={true}
              selectedDates={selectedDates}
              onSelect={(date) => handleChange(date)}
            />
          </div>
          <button className={style.content__btn} onClick={handleSubmit}>
            Добавить
          </button>
        </div>
        <div>
          {shifts.length ? (
            <>
              <h2 className={style.content__title}>Предстоящие смены:</h2>

              <ul className={style.shifts}>
                {shifts.map((shift, index) => (
                  <li key={index}>{shift}</li>
                ))}
              </ul>
            </>
          ) : (
            <h2 className={style.content__title}> Нет предстоящих смен</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export { DoctorShift };

import { useState, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { assistantShiftsAPI } from "../../services/AssistantShiftsService";
import DatePicker from "react-datepicker";

import style from "./style.module.scss";

export default function AssistantShift() {
  const [selectValue, setSelectValue] = useState();

  const [selectedDates, setSelectedDates] = useState([]);

  const [wasSelectedDate, setWasSelectedDate] = useState([]);
  const [wasSelectedDates, setWasSelectedDates] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [doctorDates, setDoctorDates] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

  useEffect(() => {
    refreshDoctorsList();
  }, []);

  function refreshDoctorsList() {
    setWasSelectedDates([]);
    setDoctors([]);
    assistantShiftsAPI(axiosPrivate)
      .fetchDoctors()
      .then((response) => {
        console.log(response.data);
        response.data.map((data) => {
          setDoctors((prev) => [...prev, data]);
        });
        setSelectValue(response.data[0].doctorId);
      })
      .catch((error) => {
        console.log(error);
      });
    assistantShiftsAPI(axiosPrivate)
      .fetchAssistantDates()
      .then((response) => {
        response.data.map((data) => {
          let tmpDate = new Date(
            data.split(".")[2],
            data.split(".")[1] - 1,
            data.split(".")[0]
          );
          setWasSelectedDate((prev) => [...prev, tmpDate]);
          setWasSelectedDates((prev) => [...prev, data]);
        });
        console.log("AssistantDates: ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    refreshDoctorDatesList();
    setSelectedDates([]);
  }, [selectValue]);

  function refreshDoctorDatesList() {
    assistantShiftsAPI(axiosPrivate)
      .fetchDoctorDates(selectValue)
      .then((response) => {
        console.log(response.data);
        let tmpArr = [];
        response.data.map((data) => {
          let tmpDate = new Date(
            data.split(".")[2],
            data.split(".")[1] - 1,
            data.split(".")[0]
          );
          tmpArr.push(tmpDate);
        });
        setDoctorDates(tmpArr);
      });
  }

  const handleOptionChange = (e) => {
    setSelectValue(e.target.value);
    console.log(e.target.value);
  };

  const handleDatesChange = (date) => {
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
    console.log("doctorId: ", selectValue, "selectedDates: ", selectedDates);
    assistantShiftsAPI(axiosPrivate)
      .create(JSON.stringify({ doctorId: selectValue, dates: selectedDates }))
      .then((response) => {
        refreshDoctorsList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className={style.title}>Выбор смены</h1>
      <section className={style.section}>
        <div className={style.edit}>
          <h3 className={style.content__title}>Выберите врача:</h3>
          <select
            onChange={(e) => handleOptionChange(e)}
            className={style.select}
            defaultValue={selectValue}
          >
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor.doctorId}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
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

          <DatePicker
            placeholderText="Выберите даты"
            locale="ru"
            minDate={minDate}
            maxDate={maxDate}
            includeDates={doctorDates}
            excludeDates={wasSelectedDate}
            inline={false}
            selectsMultiple={true}
            selectedDates={selectedDates}
            onSelect={(date) => handleDatesChange(date)}
          />
          <button className={style.btn} onClick={handleSubmit}>
            Добавить
          </button>
        </div>
        <div>
          {wasSelectedDates.length ? (
            <>
              <h3 className={style.content__title}>Предстоящие смены:</h3>

              <ul className={style.shifts}>
                {wasSelectedDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </>
          ) : (
            <h3 className={style.content__title}> Нет предстоящих смен</h3>
          )}
        </div>
      </section>
    </div>
  );
}

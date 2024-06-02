import { useState, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { assistantShiftsAPI } from "../../services/AssistantShiftsService";
import DatePicker from "react-datepicker";
import { clientShiftsAPI } from "../../services/ClientShiftsService";

import style from "./style.module.scss";

export default function ClientShift() {
  const [selectDoctorValue, setSelectDoctorValue] = useState();
  const [selectProductValue, setSelectProductValue] = useState();

  const [selectedDate, setSelectedDate] = useState();
  const [allowTimes, setAllowTimes] = useState();
  const [selectedTime, setSelectedTime] = useState();

  const [wasSelectedDate, setWasSelectedDate] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [products, setProducts] = useState([]);

  const [doctorDates, setDoctorDates] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

  useEffect(() => {
    refreshDoctorsList();
  }, []);

  function refreshDoctorsList() {
    setDoctors([]);
    setProducts([]);
    clientShiftsAPI(axiosPrivate)
      .fetchDoctors()
      .then((response) => {
        console.log(response.data);
        let doctorArr = [];
        response.data.map((data) => {
          doctorArr.push(data);
        });
        setDoctors(doctorArr);
        setSelectDoctorValue(response.data[0].doctorId);
      })
      .catch((error) => {
        console.log(error);
      });
    clientShiftsAPI(axiosPrivate)
      .fetchProducts()
      .then((response) => {
        let productArr = [];
        response.data.map((data) => {
          productArr.push(data);
        });
        setProducts(productArr);
        setSelectProductValue(response.data[0].id);
        console.log("Products: ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    refreshDoctorDatesList();
    setSelectedDate();
  }, [selectDoctorValue]);

  function refreshDoctorDatesList() {
    clientShiftsAPI(axiosPrivate)
      .fetchDoctorDates(selectDoctorValue)
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

  const handleOptionDoctorChange = (e) => {
    setSelectDoctorValue(e.target.value);
    console.log(e.target.value);
  };
  const handleOptionProductChange = (e) => {
    setSelectProductValue(e.target.value);
    console.log(e.target.value);
  };

  const handleDatesChange = (date) => {
    setSelectedTime();
    const tmpDate = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

    setSelectedDate(tmpDate);
    clientShiftsAPI(axiosPrivate)
      .fetchTimesForDay(
        JSON.stringify({ doctorId: selectDoctorValue, date: tmpDate })
      )
      .then((response) => {
        console.log(response.data);
        let tmpArr = [];
        response.data.map((data) => {
          tmpArr.push(data);
        });
        setAllowTimes(tmpArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    console.log(e.target.value);
    setSelectedTime(e.target.value);
  };

  const handleSubmit = () => {
    console.log(
      "doctorId: ",
      selectDoctorValue,
      "productId: ",
      selectProductValue,
      "selectedDateTime: ",
      `${selectedDate}T${selectedTime}:00`
    );
    if (window.confirm("Are you sure you want to make shift?")) {
      clientShiftsAPI(axiosPrivate)
        .create(
          JSON.stringify({
            doctorId: selectDoctorValue,
            productId: selectProductValue,
            date: `${selectedDate}T${selectedTime}:00`,
          })
        )
        .then((response) => {
          setAllowTimes();
          setSelectedDate();
          refreshDoctorDatesList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1 className={style.title}>Запись на приём</h1>
      <section className={style.section}>
        <div className={style.edit}>
          <h3 className={style.content__title}>Выберите врача:</h3>
          <select
            onChange={(e) => handleOptionDoctorChange(e)}
            className={style.select}
            defaultValue={selectDoctorValue}
          >
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor.doctorId}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
          <h3 className={style.content__title}>Выберите услугу:</h3>

          <select
            onChange={(e) => handleOptionProductChange(e)}
            className={style.select}
            defaultValue={selectProductValue}
          >
            {products.map((product, index) => (
              <option key={index} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <div>
            <div>
              {selectedDate ? (
                <>
                  <h3 className={style.content__title}>Выбранная дата:</h3>
                  <p className={style.content__text}>{selectedDate} </p>
                </>
              ) : (
                <h3 className={style.content__title}>Дата не выбрана </h3>
              )}

              <DatePicker
                locale="ru"
                placeholderText="Выберите дату"
                // minDate={minDate}
                maxDate={maxDate}
                includeDates={doctorDates}
                // excludeDates={wasSelectedDate}
                inline={false}
                selected={selectedDate}
                onSelect={(date) => handleDatesChange(date)}
              />
            </div>
            <button className={style.btn} onClick={handleSubmit}>
              Записаться
            </button>
          </div>
        </div>
        <div className={style.times}>
          {selectedDate && selectedTime && (
            <>
              <h3 className={style.content__title}>Выбранное время:</h3>
              <p className={style.content__text}>{selectedTime} </p>
            </>
          )}
          {selectedDate && allowTimes && (
            <h3 className={style.content__title}>Свободное время:</h3>
          )}
          <div className={style.times__buttons}>
            {selectedDate &&
              allowTimes &&
              allowTimes.map((time, index) => (
                <button
                  value={time}
                  onClick={(e) => handleClick(e)}
                  key={index}
                  className={style.times__buttons_item}
                >
                  {time}
                </button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

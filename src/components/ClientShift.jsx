import { useState, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { assistantShiftsAPI } from "../services/AssistantShiftsService";
import DatePicker from "react-datepicker";
import { clientShiftsAPI } from "../services/ClientShiftsService";

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

  const minTime = new Date().setHours(9, 0);
  const maxTime = new Date().setHours(18, 0);
  const includeArr = [new Date().setHours(12)];

  useEffect(() => {
    refreshDoctorsList();
  }, []);

  function refreshDoctorsList() {
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
      <select
        onChange={(e) => handleOptionDoctorChange(e)}
        className="select-css"
        defaultValue={selectDoctorValue}
      >
        {doctors.map((doctor, index) => (
          <option key={index} value={doctor.doctorId}>
            {doctor.firstName} {doctor.lastName}
          </option>
        ))}
      </select>
      <p>{selectDoctorValue}</p>

      <select
        onChange={(e) => handleOptionProductChange(e)}
        className="select-css"
        defaultValue={selectProductValue}
      >
        {products.map((product, index) => (
          <option key={index} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <p>{selectProductValue}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h3>Выбранная дата:</h3>
          <p>{selectedDate} </p>
          <DatePicker
            showIcon
            locale="ru"
            // minDate={minDate}
            maxDate={maxDate}
            includeDates={doctorDates}
            // excludeDates={wasSelectedDate}
            inline={false}
            selected={selectedDate}
            onSelect={(date) => handleDatesChange(date)}
          />
        </div>
        <div>
          {selectedDate && selectedTime && (
            <>
              <h3>Выбранное время:</h3>
              <p>{selectedTime} </p>
            </>
          )}
          {selectedDate && allowTimes && <h3>Свободное время:</h3>}
          <div style={{ display: "flex", gap: "10px" }}>
            {selectedDate &&
              allowTimes &&
              allowTimes.map((time, index) => (
                <button
                  value={time}
                  onClick={(e) => handleClick(e)}
                  key={index}
                >
                  {time}
                </button>
              ))}
          </div>
        </div>
      </div>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

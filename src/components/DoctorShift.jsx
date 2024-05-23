import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { doctorShiftsAPI } from "../services/DoctorShiftsService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);

const DoctorShift = () => {
  const [wasSelectedDate, setWasSelectedDate] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 1, 0);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshShiftsList();
  }, []);

  function refreshShiftsList() {
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
          setWasSelectedDate((prev) => [...prev, tmpDate]);
          if (tmpDate > Date.now()) {
            setShifts((prev) => [...prev, data]);
          }
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
    <div>
      <h1>DoctorShift Page</h1>
      <div style={{ display: "flex" }}>
        <div>
          <h3>Выбранные даты:</h3>
          <ul>
            {selectedDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
          <DatePicker
            showIcon
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
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <h3>Предстоящие даты:</h3>
          <ul>
            {shifts.map((shift, index) => (
              <li key={index}>{shift}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { DoctorShift };

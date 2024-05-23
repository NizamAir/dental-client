import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { doctorShiftsAPI } from "../services/DoctorShiftsService";
export default function DoctorClient() {
  const [shifts, setShifts] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    refreshShiftsList();
  }, []);

  function refreshShiftsList() {
    doctorShiftsAPI(axiosPrivate)
      .fetchAll()
      .then((response) => {
        console.log(response.data);
        setShifts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div style={{ color: "#fff" }}>
      <h1> Мои клиенты</h1>
      {shifts.map(
        (shift) => (
          // shift.clientName !== null && (
          <div
            style={{
              border: "2px solid #000",
              margin: "10px",
              padding: "10px",
            }}
            key={shift.id}
          >
            <p>Клиент: {shift.clientName}</p>
            <p>
              Дата и Время: {shift.shiftDate} {shift.shiftTime}
            </p>
            {shift.assistantName ? (
              <p>Ассистент: {shift.assistantName}</p>
            ) : (
              <p>Без ассистента</p>
            )}
          </div>
        )
        // )
      )}
    </div>
  );
}

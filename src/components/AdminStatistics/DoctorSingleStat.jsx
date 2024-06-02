import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { adminAPI } from "../../services/AdminService";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBump } from "@nivo/bump";

import style from "./style.module.scss";

const data = [
  {
    id: "japan",
    color: "hsl(79, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 225,
      },
      {
        x: "helicopter",
        y: 155,
      },
      {
        x: "boat",
        y: 170,
      },
      {
        x: "train",
        y: 158,
      },
      {
        x: "subway",
        y: 150,
      },
      {
        x: "bus",
        y: 164,
      },
      {
        x: "car",
        y: 17,
      },
      {
        x: "moto",
        y: 95,
      },
      {
        x: "bicycle",
        y: 66,
      },
      {
        x: "horse",
        y: 148,
      },
      {
        x: "skateboard",
        y: 231,
      },
      {
        x: "others",
        y: 230,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(294, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 15,
      },
      {
        x: "helicopter",
        y: 245,
      },
      {
        x: "boat",
        y: 157,
      },
      {
        x: "train",
        y: 260,
      },
      {
        x: "subway",
        y: 43,
      },
      {
        x: "bus",
        y: 186,
      },
      {
        x: "car",
        y: 175,
      },
      {
        x: "moto",
        y: 256,
      },
      {
        x: "bicycle",
        y: 45,
      },
      {
        x: "horse",
        y: 37,
      },
      {
        x: "skateboard",
        y: 275,
      },
      {
        x: "others",
        y: 4,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(145, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 249,
      },
      {
        x: "helicopter",
        y: 158,
      },
      {
        x: "boat",
        y: 258,
      },
      {
        x: "train",
        y: 176,
      },
      {
        x: "subway",
        y: 239,
      },
      {
        x: "bus",
        y: 65,
      },
      {
        x: "car",
        y: 28,
      },
      {
        x: "moto",
        y: 30,
      },
      {
        x: "bicycle",
        y: 103,
      },
      {
        x: "horse",
        y: 267,
      },
      {
        x: "skateboard",
        y: 101,
      },
      {
        x: "others",
        y: 120,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(257, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 218,
      },
      {
        x: "helicopter",
        y: 2,
      },
      {
        x: "boat",
        y: 247,
      },
      {
        x: "train",
        y: 254,
      },
      {
        x: "subway",
        y: 40,
      },
      {
        x: "bus",
        y: 278,
      },
      {
        x: "car",
        y: 285,
      },
      {
        x: "moto",
        y: 113,
      },
      {
        x: "bicycle",
        y: 132,
      },
      {
        x: "horse",
        y: 259,
      },
      {
        x: "skateboard",
        y: 93,
      },
      {
        x: "others",
        y: 192,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(71, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 297,
      },
      {
        x: "helicopter",
        y: 294,
      },
      {
        x: "boat",
        y: 20,
      },
      {
        x: "train",
        y: 176,
      },
      {
        x: "subway",
        y: 119,
      },
      {
        x: "bus",
        y: 255,
      },
      {
        x: "car",
        y: 212,
      },
      {
        x: "moto",
        y: 226,
      },
      {
        x: "bicycle",
        y: 100,
      },
      {
        x: "horse",
        y: 51,
      },
      {
        x: "skateboard",
        y: 191,
      },
      {
        x: "others",
        y: 34,
      },
    ],
  },
];

export default function DoctorSingleStat() {
  const [doctors, setDoctors] = useState([]);
  const [doctorStat, setDoctorStat] = useState([]);

  const [selectDoctorValue, setSelectDoctorValue] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setDoctorStat([]);
    adminAPI(axiosPrivate)
      .fetchDoctorList()
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    adminAPI(axiosPrivate)
      .fetchDoctorRates()
      .then((response) => {
        response.data.map((item) => {
          if (item.data.length > 1) setDoctorStat((prev) => [...prev, item]);
        });

        console.log(response.data);
      });
  }, []);

  return (
    <div>
      {doctorStat && (
        <div className={style.graph}>
          <ResponsiveBump
            data={doctorStat}
            colors={{ scheme: "spectral" }}
            lineWidth={2}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: "background" }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: "serie.color" }}
            // colors={{ scheme: "nivo" }}
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -36,
              truncateTickAt: 0,
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: 32,
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Рейтинг",
              legendPosition: "middle",
              legendOffset: -40,
              truncateTickAt: 0,
            }}
            margin={{ top: 40, right: 150, bottom: 40, left: 60 }}
            axisRight={null}
          />
        </div>
      )}
    </div>
  );
}

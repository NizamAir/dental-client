import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { adminAPI } from "../../services/AdminService";
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    id: "make",
    label: "make",
    value: 401,
    color: "hsl(78, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 341,
    color: "hsl(68, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 465,
    color: "hsl(197, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 185,
    color: "hsl(120, 70%, 50%)",
  },
  {
    id: "rust",
    label: "rust",
    value: 586,
    color: "hsl(90, 70%, 50%)",
  },
];

const theme = {
  label: {
    textColor: "#eee",
    fontSize: "20px",
    tickColor: "#eee",
  },
  text: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  grid: {
    stroke: "#888",
    strokeWidth: 1,
  },
};
export default function AllDoctorStarNew() {
  const [doctorsShifts, setDoctorsShifts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    adminAPI(axiosPrivate)
      .fetchDoctorsShifts()
      .then((response) => {
        console.log(response.data);
        setDoctorsShifts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <ResponsivePie
      data={doctorsShifts}
      // colors={{ scheme: "paired" }}
      // colors={{ scheme: "category10" }}
      colors={{ scheme: "spectral" }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      theme={theme}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      // fill={[
      //   {
      //     match: {
      //       id: "Олег Лешканов",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "c",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "go",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "Дмитрий Иванов",
      //     },
      //     id: "dots",
      //   },
      //   {
      //     match: {
      //       id: "Екатерина Захарова",
      //     },
      //     id: "lines",
      //   },
      //   {
      //     match: {
      //       id: "lisp",
      //     },
      //     id: "lines",
      //   },
      //   {
      //     match: {
      //       id: "elixir",
      //     },
      //     id: "lines",
      //   },
      //   {
      //     match: {
      //       id: "javascript",
      //     },
      //     id: "lines",
      //   },
      // ]}
      // legends={[
      //   {
      //     display: "none",
      //     anchor: "bottom",
      //     direction: "column",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 80,
      //     itemsSpacing: 10,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
}

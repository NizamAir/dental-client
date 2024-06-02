import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { adminAPI } from "../../services/AdminService";

import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    country: "AD",
    "hot dog": 49,
    "hot dogColor": "hsl(110, 70%, 50%)",
    burger: 79,
    burgerColor: "hsl(84, 70%, 50%)",
    sandwich: 3,
    sandwichColor: "hsl(35, 70%, 50%)",
    kebab: 77,
    kebabColor: "hsl(268, 70%, 50%)",
    fries: 58,
    friesColor: "hsl(117, 70%, 50%)",
    donut: 100,
    donutColor: "hsl(18, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(24, 70%, 50%)",
    burger: 87,
    burgerColor: "hsl(1, 70%, 50%)",
    sandwich: 81,
    sandwichColor: "hsl(282, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(250, 70%, 50%)",
    fries: 73,
    friesColor: "hsl(146, 70%, 50%)",
    donut: 149,
    donutColor: "hsl(177, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 152,
    "hot dogColor": "hsl(220, 70%, 50%)",
    burger: 56,
    burgerColor: "hsl(39, 70%, 50%)",
    sandwich: 193,
    sandwichColor: "hsl(241, 70%, 50%)",
    kebab: 85,
    kebabColor: "hsl(292, 70%, 50%)",
    fries: 24,
    friesColor: "hsl(169, 70%, 50%)",
    donut: 41,
    donutColor: "hsl(49, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 72,
    "hot dogColor": "hsl(304, 70%, 50%)",
    burger: 19,
    burgerColor: "hsl(326, 70%, 50%)",
    sandwich: 56,
    sandwichColor: "hsl(3, 70%, 50%)",
    kebab: 198,
    kebabColor: "hsl(203, 70%, 50%)",
    fries: 135,
    friesColor: "hsl(355, 70%, 50%)",
    donut: 158,
    donutColor: "hsl(330, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 8,
    "hot dogColor": "hsl(100, 70%, 50%)",
    burger: 100,
    burgerColor: "hsl(284, 70%, 50%)",
    sandwich: 59,
    sandwichColor: "hsl(138, 70%, 50%)",
    kebab: 180,
    kebabColor: "hsl(35, 70%, 50%)",
    fries: 84,
    friesColor: "hsl(287, 70%, 50%)",
    donut: 124,
    donutColor: "hsl(36, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 26,
    "hot dogColor": "hsl(88, 70%, 50%)",
    burger: 164,
    burgerColor: "hsl(53, 70%, 50%)",
    sandwich: 179,
    sandwichColor: "hsl(297, 70%, 50%)",
    kebab: 29,
    kebabColor: "hsl(76, 70%, 50%)",
    fries: 34,
    friesColor: "hsl(190, 70%, 50%)",
    donut: 20,
    donutColor: "hsl(193, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 150,
    "hot dogColor": "hsl(145, 70%, 50%)",
    burger: 132,
    burgerColor: "hsl(245, 70%, 50%)",
    sandwich: 76,
    sandwichColor: "hsl(232, 70%, 50%)",
    kebab: 108,
    kebabColor: "hsl(226, 70%, 50%)",
    fries: 114,
    friesColor: "hsl(207, 70%, 50%)",
    donut: 36,
    donutColor: "hsl(333, 70%, 50%)",
  },
];

const theme = {
  text: {
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default function AllProductStarNew() {
  const [productsShifts, setProductsShifts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    adminAPI(axiosPrivate)
      .fetchProductsShifts()
      .then((response) => {
        console.log(response.data);
        setProductsShifts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ResponsiveBar
        data={productsShifts}
        theme={theme}
        keys={["shifts"]}
        // keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="productName"
        margin={{ top: 50, right: 120, bottom: 100, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        // colors={{ scheme: "paired" }}
        colors={{ scheme: "spectral" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Количество приёмов",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        // role="application"
        // ariaLabel="Nivo bar chart demo"
        // barAriaLabel={(e) =>
        //   e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        // }
      />
    </>
  );
}

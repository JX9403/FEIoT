import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const labels = [
  "10:00",
  "10:02",
  "10:04",
  "10:06",
  "10:08",
  "10:10",
  "10:12",
  "10:14",
  "10:16",
  "10:18",
  "10:20",
  "10:22",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Nhiệt độ (°C)",
      data: [25, 26, 27, 26.5, 28, 29, 27, 26, 25.5, 27, 28, 29.5],
      borderColor: "#db3241",
      backgroundColor: "#db3241",
      fill: false,
      tension: 0.4,
      yAxisID: "y1",
      type: "line",
    },
    {
      label: "Độ ẩm (%)",
      data: [60, 65, 62, 70, 75, 78, 74, 69, 68, 72, 76, 80],
      borderColor: "#1ed998",
      backgroundColor: "#1ed998",
      fill: false,
      tension: 0.4,
      yAxisID: "y1",
      type: "line",
    },
    {
      label: "Ánh sáng (Lux)",
      data: [500, 700, 600, 900, 1000, 950, 850, 800, 750, 900, 950, 1050],
      backgroundColor: "rgb(232, 184, 26)",
      yAxisID: "y2",
      type: "bar",
      barThickness: 15, // Giảm chiều rộng cột
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y1: {
      type: "linear",
      position: "left",
      beginAtZero: true,
      title: {
        display: true,
        text: "Nhiệt độ (°C) & Độ ẩm (%)",
      },
      grid: {
        display: false, // Ẩn vạch kẻ ngang của trục y1
      },
    },
    y2: {
      type: "linear",
      position: "right",
      beginAtZero: true,
      title: {
        display: true,
        text: "Ánh sáng (Lux)",
      },
      grid: {
        display: false, // Ẩn vạch kẻ ngang của trục y2
        drawOnChartArea: false,
      },
    },
    x: {
      grid: {
        display: false, // Ẩn vạch kẻ dọc trên trục x
      },
    },
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
        modifierKey: "shift",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
      },
    },
  },
};

const ChartSensor = () => {
  return <Chart type="bar" data={data} options={options} />;
};

export default ChartSensor;

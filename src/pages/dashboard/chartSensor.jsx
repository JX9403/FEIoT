import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const ChartSensor = ({ sensorData }) => {
  const labels = sensorData
    .map((item) => new Date(item.createdAt).toLocaleTimeString())
    .reverse(); // Đảo ngược mảng để dữ liệu mới nhất nằm bên phải
  const data = {
    labels,
    datasets: [
      {
        label: "Nhiệt độ (°C)",
        data: sensorData.map((item) => item.temperature).reverse(),
        borderColor: "#db3241",
        tension: 0.5,
        pointRadius: 3,
        yAxisID: "y1",
        fill: false, // Không tô nền
      },
      {
        label: "Độ ẩm (%)",
        data: sensorData.map((item) => item.humidity).reverse(),
        borderColor: "#1ed998",
        tension: 0.5,
        pointRadius: 3,
        yAxisID: "y1",
        fill: false, // Không tô nền
      },
      {
        label: "Ánh sáng (Lux)",
        data: sensorData.map((item) => item.light).reverse(),
        borderColor: "rgb(232, 184, 26)",
        tension: 0.5,
        pointRadius: 3,
        yAxisID: "y2",
        fill: false, // Không tô nền
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
          display: false,
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
          display: false,
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          display: false,
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
    animation: {
      duration: 1000, // Thời gian hiển thị mượt hơn
      easing: "easeInOutQuad", // Hiệu ứng mượt mà
    },
  };

  return <Chart type="line" data={data} options={options} />;
};

export default ChartSensor;

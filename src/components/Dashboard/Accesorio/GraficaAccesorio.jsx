import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "./Accesorio.css";
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#1f2937",
        font: { family: "inherit", size: 12 },
      },
    },
    title: {
      display: false,
      text: "Accesorios creados en la última semana",
    },
    tooltip: {
      backgroundColor: "rgba(15,23,42,0.9)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "rgba(255,255,255,0.15)",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: "#2d3748", font: { size: 11 } },
      grid: { display: false },
    },
    y: {
      ticks: { color: "#2d3748", font: { size: 11 } },
      grid: { color: "rgba(66,66,66,0.08)" },
    },
  },
};
let labels = null;

const GraficaAccesorio = () => {
  const accesorios = useSelector((state) => state.accesory.accesories) || [];
  const { t } = useTranslation();

  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  labels = last7Days.map((d) => d.toISOString().split("T")[0]);

  const counts = labels.map(
    (dateStr) => accesorios.filter((acc) => acc.fechaCreacion && acc.fechaCreacion.split("T")[0] === dateStr).length
  );

  return (
    <div className="card grafica-accesorio-card">
      <div className="card-body">
        <h5 className="mb-3">Accesorios creados (últimos 7 días)</h5>
        <div className="chart-container">
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  label: "Accesorios creados",
                  data: counts,
                  backgroundColor: "rgba(66,153,225,0.6)",
                  hoverBackgroundColor: "rgba(43,108,176,0.7)",
                  borderRadius: 6,
                  borderSkipped: false,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GraficaAccesorio;

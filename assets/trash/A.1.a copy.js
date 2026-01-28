const BASE_URL = "https://script.google.com/macros/s/AKfycbxFbrDM6xaDp9eUNt14S0vExHWntq3SraUc6c8Up3LcObS6EnpaPguElIFm2LHpddYBXQ/exec"; // Ganti dengan URL kamu

const tahunSelect = document.getElementById("yearDropdown");
const triwulanSelect = document.getElementById("triwulanDropdown");
const chartCanvas = document.getElementById("chartProduksi");

tahunSelect.addEventListener("change", updateData);
triwulanSelect.addEventListener("change", updateData);
window.onload = updateData;

async function updateData() {
  const tahun = tahunSelect.value;
  const triwulan = triwulanSelect.value;
  const data = await fetchDataOnly(tahun, triwulan);

  // Simpan ke dataset
  chartCanvas.dataset.labels = JSON.stringify(data.labels);
  chartCanvas.dataset.values = JSON.stringify(data.produksi);

  // DEBUG
  console.log("DATA YANG DITERIMA:", data);

  // Tampilkan pertumbuhan
  document.getElementById("qtq").textContent = `${parseFloat(data.pertumbuhan.qtoq).toFixed(2)}%`;
  document.getElementById("yoy").textContent = `${parseFloat(data.pertumbuhan.yoy).toFixed(2)}%`;
  document.getElementById("ctc").textContent = `${parseFloat(data.pertumbuhan.ctc).toFixed(2)}%`;

  const qtoq = parseFloat(data.pertumbuhan.qtoq);
  const yoy = parseFloat(data.pertumbuhan.yoy);
  const ctc = parseFloat(data.pertumbuhan.ctc);

  // Update warna card berdasarkan nilai
  updateCardColor(qtoq, "qtq-card");
  updateCardColor(yoy, "yoy-card");
  updateCardColor(ctc, "ctc-card");

  console.log("Chart Labels:", data.labels);
  console.log("Chart Produksi:", data.produksi);

  // Tampilkan chart
  drawChartFromDataset(chartCanvas);
}

function fetchDataOnly(tahun, triwulan) {
  const url = `${BASE_URL}?tahun=${tahun}&triwulan=${triwulan}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      return {
        labels: data.labels,
        produksi: data.produksi,
        pertumbuhan: data.pertumbuhan
      };
    });
}

function drawChartFromDataset(canvas) {
  const labels = JSON.parse(canvas.dataset.labels);
  const values = JSON.parse(canvas.dataset.values);

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Produksi",
        data: values,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.1)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // ✅ Agar tinggi chart stabil
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: '#000',
          font: {
            weight: 'bold'
          },
          formatter: function(value) {
            return value.toLocaleString();
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    plugins: [ChartDataLabels] // ✅ Aktifkan plugin
  });
}

function updateCardColor(value, cardId) {
  const card = document.getElementById(cardId);
  card.classList.remove("bg-success", "bg-danger");

  if (value > 0) {
    card.style.backgroundColor = "#198754"; // hijau
    card.style.color = "white";
  } else if (value < 0) {
    card.style.backgroundColor = "#dc3545"; // merah
    card.style.color = "white";
  } else {
    card.style.backgroundColor = "#dc7235ff"; // netral
    card.style.color = "white";
  }
}

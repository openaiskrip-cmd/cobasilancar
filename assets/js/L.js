const BASE_URL = "https://script.google.com/macros/s/AKfycbzYW0EV-uoyervGBqbdct9aRgfqmpAh4EFAt5KwAPDPDnZn0_CYyJylR4vk_deU7lXGLQ/exec";

// List komoditas & grafik yang dimiliki
const komoditasList = [
  {
    key: "realisasi_belanja_perumahan",
    charts: [
      { id: "chart_realisasi_belanja_perumahan", dataKey: "realisasi" },  
      { id: "chart_jumlah_proyek", dataKey: "jumlah" }
      // { id: "chart_produktivitas_tanam_pangan", dataKey: "produktivitas" }
    ]
  }
];

const tahunSelect = document.getElementById("yearDropdown");
const triwulanSelect = document.getElementById("triwulanDropdown");
window.addEventListener("load", updateAllKomoditas);

async function updateAllKomoditas() {
  tahunSelect.addEventListener("change", updateAllKomoditas);
  triwulanSelect.addEventListener("change", updateAllKomoditas);
  const tahun = tahunSelect.value;
  const triwulan = triwulanSelect.value;

  for (const { key, charts } of komoditasList) {
    try {
      setValueText(`qtq_${key}`, 0, true);
      setValueText(`yoy_${key}`, 0, true);
      setValueText(`ctc_${key}`, 0, true);
      const dataKomoditas = await fetchKomoditasData(tahun, triwulan, key);
      updateKomoditasUI(key, dataKomoditas, charts);
    } catch (err) {
      console.error(`Gagal memuat data ${key}:`, err);
    }
  }
}

function fetchKomoditasData(tahun, triwulan, komoditas) {
  const url = `${BASE_URL}?tahun=${tahun}&triwulan=${triwulan}&komoditas=${komoditas}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      return data;
    });
}

function updateKomoditasUI(key, data, charts) {
  // Update angka pertumbuhan
  const { pertumbuhan } = data;
  setValueText(`qtq_${key}`, pertumbuhan.qtoq);
  setValueText(`yoy_${key}`, pertumbuhan.yoy);
  setValueText(`ctc_${key}`, pertumbuhan.ctc);

  updateCardColor(pertumbuhan.qtoq, `qtq_${key}-card`);
  updateCardColor(pertumbuhan.yoy, `yoy_${key}-card`);
  updateCardColor(pertumbuhan.ctc, `ctc_${key}-card`);

  // Render semua grafik yang ada di daftar
  for (const { id, dataKey } of charts) {
    const canvas = document.getElementById(id);
    if (!canvas) continue;

    const labels = data.labels || [];
    const values = data[dataKey] || [];

    canvas.dataset.labels = JSON.stringify(labels);
    canvas.dataset.values = JSON.stringify(values);
    drawChartFromDataset(canvas);
  }
}

function setValueText(id, value, loading = false) {
  const el = document.getElementById(id);
  if (loading) {
    el.textContent = "⏳ Memuat...";
  } else {
    if (el) el.textContent = `${parseFloat(value).toFixed(2)}%`;
  }
}

function updateCardColor(value, cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  card.style.backgroundColor = value > 0 ? "#198754" : value < 0 ? "#dc3545" : "#dc7235";
  card.style.color = "white";
}

function drawChartFromDataset(canvas) {
  const labels = JSON.parse(canvas.dataset.labels || "[]");
  const values = JSON.parse(canvas.dataset.values || "[]");

  if (window[`chart_${canvas.id}`]) {
    window[`chart_${canvas.id}`].destroy();
  }

  window[`chart_${canvas.id}`] = new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Data",
        data: values,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.1)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 24 // ✅ Tambahkan padding atas agar label tidak terpotong
        }
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: '#000',
          font: { weight: 'bold' },
          formatter: value => value.toLocaleString()
        }
      },
      scales: { y: { beginAtZero: true } }
    },
    plugins: [ChartDataLabels]
  });
}

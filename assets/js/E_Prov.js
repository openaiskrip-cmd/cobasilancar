// Fungsi dinamis: Opsi 2 (BASE_URL di dalam parameter)
async function fetchQTQValue({ baseUrl, uraian, judul, targetId }) {
  const tahun = document.getElementById("yearDropdown").value;
  const triwulanCode = document.getElementById("triwulanDropdown").value; // TW1, TW2, dst
  const triwulan = convertTriwulan(triwulanCode); // → "I", "II", dst

  const el = document.getElementById(targetId);
  // ⏳ Tampilkan loading sementara
  el.textContent = '⏳ Memuat...';
  const cardEl = document.getElementById(`${targetId}-card`);

  try {
    const url = `${baseUrl}?tahun=${tahun}&triwulan=${triwulan}&uraian=${encodeURIComponent(uraian)}&judul=${encodeURIComponent(judul)}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(`Data untuk ${uraian}:`, data);

    if (data.result.length > 0) {
      const nilai = parseFloat(data.result[0].nilai).toFixed(2);
      el.textContent = `${nilai} %`;
      updateCardColorProv(parseFloat(nilai), cardEl);
    } else {
      el.textContent = 'Data tidak ditemukan';
    }
  } catch (err) {
    console.error('❌ Gagal ambil data:', err);
    document.getElementById(targetId).textContent = 'Error';
  }
}

// Inisialisasi ketika dropdown berubah
document.getElementById("yearDropdown").addEventListener("change", updateAllUraian);
document.getElementById("triwulanDropdown").addEventListener("change", updateAllUraian);
window.addEventListener("load", updateAllUraian);

// Fungsi untuk update semua card kategori A (misalnya)
function updateAllUraian() {
  const baseUrl = "https://script.google.com/macros/s/AKfycbyy_GhgyIfALQzmGjWxgHZrqrah4Fw5GPsC98okC9QdQAG6F6EtxeRG_B42PT-vhzpK/exec";

  // Tambahkan semua uraian kategori A yang ingin ditampilkan
  fetchQTQValue({
    baseUrl,
    uraian: "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    judul: "tabel 4",
    targetId: "qtq_pemakaian_air_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    judul: "tabel 5",
    targetId: "yoy_pemakaian_air_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    judul: "tabel 6",
    targetId: "ctc_pemakaian_air_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "pertambangan bijih logam",
    judul: "tabel 4",
    targetId: "qtq_pertambangan_bijih_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "pertambangan bijih logam",
    judul: "tabel 5",
    targetId: "yoy_pertambangan_bijih_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "pertambangan bijih logam",
    judul: "tabel 6",
    targetId: "ctc_pertambangan_bijih_prov"
  });
}

function convertTriwulan(code) {
  const mapping = {
    TW1: "I",
    TW2: "II",
    TW3: "III",
    TW4: "IV"
  };
  return mapping[code] || code;
}

function updateCardColorProv(value, card) {
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
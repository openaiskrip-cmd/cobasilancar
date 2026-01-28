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
    uraian: "Industri Makanan dan Minuman",
    judul: "tabel 4",
    targetId: "qtq_makan_minum_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Makanan dan Minuman",
    judul: "tabel 5",
    targetId: "yoy_makan_minum_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Makanan dan Minuman",
    judul: "tabel 6",
    targetId: "ctc_makan_minum_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Tekstil dan Pakaian Jadi",
    judul: "tabel 4",
    targetId: "qtq_tekstil_pakaian_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Tekstil dan Pakaian Jadi",
    judul: "tabel 5",
    targetId: "yoy_tekstil_pakaian_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Tekstil dan Pakaian Jadi",
    judul: "tabel 6",
    targetId: "ctc_tekstil_pakaian_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    judul: "tabel 4",
    targetId: "qtq_kayu_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    judul: "tabel 5",
    targetId: "yoy_kayu_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    judul: "tabel 6",
    targetId: "ctc_kayu_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    judul: "tabel 4",
    targetId: "qtq_kertas_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    judul: "tabel 5",
    targetId: "yoy_kertas_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    judul: "tabel 6",
    targetId: "ctc_kertas_prov"
  });
  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kimia, Farmasi dan Obat Tradisional",
    judul: "tabel 4",
    targetId: "qtq_kimia_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kimia, Farmasi dan Obat Tradisional",
    judul: "tabel 5",
    targetId: "yoy_kimia_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Kimia, Farmasi dan Obat Tradisional",
    judul: "tabel 6",
    targetId: "ctc_kimia_prov"
  });
    
  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Karet, Barang dari Karet dan Plastik",
    judul: "tabel 4",
    targetId: "qtq_karet_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Karet, Barang dari Karet dan Plastik",
    judul: "tabel 5",
    targetId: "yoy_karet_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Karet, Barang dari Karet dan Plastik",
    judul: "tabel 6",
    targetId: "ctc_karet_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Barang Galian bukan Logam",
    judul: "tabel 4",
    targetId: "qtq_barang_galian_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Barang Galian bukan Logam",
    judul: "tabel 5",
    targetId: "yoy_barang_galian_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Barang Galian bukan Logam",
    judul: "tabel 6",
    targetId: "ctc_barang_galian_prov"
  });
    
  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Logam Dasar",
    judul: "tabel 4",
    targetId: "qtq_logam_dasar_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Logam Dasar",
    judul: "tabel 5",
    targetId: "yoy_logam_dasar_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Logam Dasar",
    judul: "tabel 6",
    targetId: "ctc_logam_dasar_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    judul: "tabel 4",
    targetId: "qtq_komputer_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    judul: "tabel 5",
    targetId: "yoy_komputer_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    judul: "tabel 6",
    targetId: "ctc_komputer_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Alat Angkutan",
    judul: "tabel 4",
    targetId: "qtq_alat_angkut_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Alat Angkutan",
    judul: "tabel 5",
    targetId: "yoy_alat_angkut_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Alat Angkutan",
    judul: "tabel 6",
    targetId: "ctc_alat_angkut_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Furnitur",
    judul: "tabel 4",
    targetId: "qtq_furnitur_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Furnitur",
    judul: "tabel 5",
    targetId: "yoy_furnitur_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri Furnitur",
    judul: "tabel 6",
    targetId: "ctc_furnitur_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    judul: "tabel 4",
    targetId: "qtq_pengolahan_reparasi_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    judul: "tabel 5",
    targetId: "yoy_pengolahan_reparasi_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    judul: "tabel 6",
    targetId: "ctc_pengolahan_reparasi_prov"
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
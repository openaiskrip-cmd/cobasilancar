const BASE_URLF = "https://script.google.com/macros/s/AKfycbzxmBWJ0jjfTCJQy__r_LuOJJ-PDsupFr7JhCwBJmJv30OcXvbkF-tuAsOQTvb6Ja7Gqg/exec";

// Kategori tetap per halaman
const fixedKategori = document.body.dataset.kategori || "A";

// Ambil elemen
const tahunSelectF = document.getElementById("yearDropdown");
const triwulanSelectF = document.getElementById("triwulanDropdown");
const fenomenaList = document.getElementById("fenomenaList");

// Event listener
tahunSelectF.addEventListener("change", loadFenomena);
triwulanSelectF.addEventListener("change", loadFenomena);
window.addEventListener("load", loadFenomena);

// Fungsi untuk mengambil dan menampilkan fenomena
function loadFenomena() {
  const tahun = tahunSelectF.value;
  const triwulan = triwulanSelectF.value;

  const url = `${BASE_URLF}?tahun=${tahun}&triwulan=${triwulan}&kategori=${encodeURIComponent(fixedKategori)}`;
  // DEBUG: tampilkan URL di konsol
  console.log("URL fetch:", url);

  // ⏳ Tampilkan loading sebelum fetch
  fenomenaList.innerHTML = `<p class="text-muted">⏳ Memuat...</p>`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      fenomenaList.innerHTML = "";

      const items = data.fenomena || [];

      if (items.length === 0) {
        fenomenaList.innerHTML = "<p class='text-muted'>Tidak ada fenomena ditemukan.</p>";
        return;
      }

      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card mb-2 text-white shadow-sm";
        card.style.padding = "6px";

        const sentiment = item.sentimen?.toLowerCase() || "";

        card.style.backgroundColor = sentiment === "positif" ? "#198754"
                                : sentiment === "negatif" ? "#dc3545"
                                : "#6c757d"; // Abu-abu jika netral/tidak diketahui
        card.style.fontSize = "10px";  

        card.innerHTML = `
          <h6 class="mb-1 text-white" style="font-size: 12px;">${item.judul}</h6>
          <!-- <small><strong>${item.periode}</strong> | ${item.mediaMassa || ""}</small> -->
        `;

        fenomenaList.appendChild(card);
      });
    })
    .catch(err => {
      fenomenaList.innerHTML = "<p class='text-danger'>Gagal memuat data.</p>";
      console.error("Fetch error:", err);
    });
}

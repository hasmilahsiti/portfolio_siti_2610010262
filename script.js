// Data detail tiap unit usaha.
// Ganti jam operasional dengan informasi resmi dari pengurus HMP-TI.
var units = {
  fnb: {
    title: "Unit F&B",
    desc: "Pesan makanan dan minuman harian, atau paket untuk acara himpunan.",
    hours: "Senin - Jumat, 09.00 - 17.00",
    contact: "Instagram: @its_hmpti"
  },
  percetakan: {
    title: "Unit Percetakan & Dokumen",
    desc: "Kirim file lewat Instagram atau datang langsung, lalu ambil hasil print atau fotokopi.",
    hours: "Senin - Jumat, 09.00 - 17.00",
    contact: "Instagram: @its_hmpti"
  },
  konsinyasi: {
    title: "Unit Konsinyasi",
    desc: "Titipkan produkmu dan kami pajang di etalase unit. Hubungi kami untuk syarat dan bagi hasil.",
    hours: "Senin - Jumat, 09.00 - 17.00",
    contact: "Instagram: @its_hmpti"
  },
  kreatif: {
    title: "Unit Jasa Kreatif",
    desc: "Ceritakan kebutuhan desain, foto, atau videomu, lengkap dengan tenggat waktunya.",
    hours: "Senin - Jumat, 09.00 - 17.00",
    contact: "Instagram: @its_hmpti"
  }
};

// Daftar harga: [nama, harga dalam rupiah, kategori]
var daftarHarga = [
  ["Ichitan", 9000, "minuman"], ["Good Day", 7000, "minuman"], ["Prof", 4000, "minuman"],
  ["Kopi ABC", 4000, "minuman"], ["Milku", 4000, "minuman"], ["Floridina", 5000, "minuman"],
  ["Teh Pucuk", 5000, "minuman"], ["Golda", 4000, "minuman"], ["Ultramilk", 9000, "minuman"],
  ["Pocari", 7000, "minuman"],
  ["Nextar", 3000, "makanan"], ["Choco Pie", 3000, "makanan"], ["Kalpa", 3000, "makanan"],
  ["Beng-Beng", 3000, "makanan"], ["Siip", 1000, "makanan"], ["Triks", 1000, "makanan"],
  ["Tissu besar", 4000, "atk"], ["Tissu kecil", 2000, "atk"], ["Tipx merah", 5000, "atk"],
  ["Tipx biru", 7000, "atk"], ["Peniti", 2000, "atk"], ["Pulpen", 3000, "atk"],
  ["Print/FC hitam putih", 500, "print"], ["Print/FC warna", 1000, "print"],
  ["Print/FC amplop", 1000, "print"], ["Jilid", 2000, "print"],
  ["Print stiker", 3000, "print"], ["Print/FC sertifikat", 3000, "print"]
];

// Pop-up detail unit
var modal = document.getElementById("modal");

function openModal(key) {
  var unit = units[key];
  document.getElementById("modal-title").textContent = unit.title;
  document.getElementById("modal-desc").textContent = unit.desc;
  document.getElementById("modal-hours").textContent = unit.hours;
  document.getElementById("modal-contact").textContent = unit.contact;
  modal.showModal();
}

document.querySelectorAll("[data-open]").forEach(function (button) {
  button.addEventListener("click", function () {
    openModal(button.getAttribute("data-open"));
  });
});

document.getElementById("modal-close").addEventListener("click", function () {
  modal.close();
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.close();
  }
});

// Layanan dan harga yang tampil saat kartu layanan diklik
var judulKategori = { minuman: "Minuman", makanan: "Makanan", atk: "ATK", print: "Print & jilid" };
var catatanTanpaHarga = "Harga layanan ini belum tercantum di daftar harga. Hubungi IT-Solution lewat Instagram @its_hmpti untuk menanyakan biaya sesuai kebutuhanmu.";

var layanan = {
  print: { judul: "Print & penjilidan", kategori: ["print"] },
  ketik: { judul: "Pengetikan", kategori: [] },
  instalasi: { judul: "Instalasi OS, aplikasi, dan lainnya", kategori: [] },
  konsultasi: { judul: "Konsultasi laptop/PC", kategori: [] },
  editing: { judul: "Photo & video editing", kategori: [] },
  desain: { judul: "Desain grafis", kategori: [] },
  web: { judul: "Web sederhana", kategori: [] },
  jual: { judul: "Jual ATK, snack, dan minuman", kategori: ["minuman", "makanan", "atk"] }
};

var hargaJudul = document.getElementById("harga-judul");
var hargaIsi = document.getElementById("harga-isi");
var layananButtons = document.querySelectorAll(".layanan-btn");

function buatDaftar(kategori) {
  var ul = document.createElement("ul");
  ul.className = "harga-list";
  daftarHarga.forEach(function (item) {
    if (item[2] !== kategori) {
      return;
    }
    var li = document.createElement("li");
    var nama = document.createElement("span");
    var harga = document.createElement("span");
    nama.textContent = item[0];
    harga.className = "harga";
    harga.textContent = "Rp" + item[1].toLocaleString("id-ID");
    li.appendChild(nama);
    li.appendChild(harga);
    ul.appendChild(li);
  });
  return ul;
}

function tampilkanLayanan(key) {
  var data = layanan[key];
  hargaJudul.textContent = "Harga: " + data.judul;
  document.getElementById("harga-cmd").textContent = "$ harga --layanan=" + key;
  hargaIsi.innerHTML = "";

  if (data.kategori.length === 0) {
    var catatan = document.createElement("p");
    catatan.className = "harga-catatan";
    catatan.textContent = catatanTanpaHarga;
    hargaIsi.appendChild(catatan);
  }

  data.kategori.forEach(function (kategori) {
    if (data.kategori.length > 1) {
      var sub = document.createElement("h4");
      sub.textContent = judulKategori[kategori];
      hargaIsi.appendChild(sub);
    }
    hargaIsi.appendChild(buatDaftar(kategori));
  });

  layananButtons.forEach(function (button) {
    var aktif = button.getAttribute("data-layanan") === key;
    button.setAttribute("aria-pressed", aktif ? "true" : "false");
  });
}

layananButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    tampilkanLayanan(button.getAttribute("data-layanan"));
    document.getElementById("harga-panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

tampilkanLayanan("print");

// Efek kode muncul baris demi baris di bagian atas halaman
var barisKode = document.querySelectorAll(".baris");
var kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!kurangiGerak) {
  barisKode.forEach(function (baris) { baris.style.visibility = "hidden"; });
  var nomor = 0;
  var pewaktu = setInterval(function () {
    barisKode[nomor].style.visibility = "visible";
    nomor++;
    if (nomor >= barisKode.length) {
      clearInterval(pewaktu);
    }
  }, 320);
}

// Bar progres scroll di bagian paling atas halaman
var barProgres = document.getElementById("progress");

function perbaruiProgres() {
  var tinggi = document.documentElement.scrollHeight - window.innerHeight;
  var rasio = tinggi > 0 ? window.scrollY / tinggi : 0;
  barProgres.style.transform = "scaleX(" + rasio + ")";
}

window.addEventListener("scroll", perbaruiProgres);
perbaruiProgres();

// Angka statistik naik dari 0, dan elemen muncul halus saat di-scroll
document.getElementById("stat-produk").setAttribute("data-hitung", daftarHarga.length);

if (!kurangiGerak) {
  document.querySelectorAll("[data-hitung]").forEach(function (el) {
    var target = Number(el.getAttribute("data-hitung"));
    var langkah = 0;
    var hitung = setInterval(function () {
      langkah++;
      el.textContent = Math.round(target * langkah / 25);
      if (langkah >= 25) {
        clearInterval(hitung);
      }
    }, 40);
  });

  var pengamat = new IntersectionObserver(function (entri) {
    entri.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("tampil");
        pengamat.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".section .tag, .section h2, .unit-card, .layanan-grid li, .harga-panel, .footer-term, .tech-hub, .tech-card").forEach(function (el) {
    el.classList.add("reveal");
    pengamat.observe(el);
  });
}

// Cahaya lembut mengikuti kursor pada kartu unit dan layanan
document.querySelectorAll(".unit-card, .layanan-btn, .tech-card").forEach(function (kartu) {
  kartu.addEventListener("pointermove", function (e) {
    var kotak = kartu.getBoundingClientRect();
    kartu.style.setProperty("--mx", (e.clientX - kotak.left) + "px");
    kartu.style.setProperty("--my", (e.clientY - kotak.top) + "px");
  });
});

// Tambahan: menu hamburger untuk HP
var tombolMenu = document.getElementById("menu-btn");
var menuNav = document.getElementById("menu-nav");

tombolMenu.addEventListener("click", function () {
  var buka = menuNav.classList.toggle("buka");
  tombolMenu.setAttribute("aria-expanded", buka ? "true" : "false");
});

menuNav.querySelectorAll("a").forEach(function (tautan) {
  tautan.addEventListener("click", function () {
    menuNav.classList.remove("buka");
    tombolMenu.setAttribute("aria-expanded", "false");
  });
});


// Tambahan: tiga pilar interaktif (pilih bidang, lihat layanannya)
var daftarBidang = {
  business: ["Kebutuhan harian usaha dan perkuliahan.", [
    ["print", "Print & penjilidan", "Print, fotokopi, dan jilid untuk tugas dan laporan."],
    ["ketik", "Pengetikan", "Pengetikan dokumen, laporan, dan proposal."],
    ["jual", "Jual ATK, snack, dan minuman", "Kebutuhan harian untuk kuliah dan acara."]]],
  creative: ["Visual untuk acara, organisasi, dan media sosial.", [
    ["desain", "Desain grafis", "Poster, banner, dan materi promosi."],
    ["editing", "Photo & video editing", "Penyuntingan foto dan video dokumentasi."]]],
  technology: ["Bantuan teknis untuk laptop, PC, dan web.", [
    ["web", "Web sederhana", "Halaman web sederhana untuk kebutuhanmu."],
    ["instalasi", "Instalasi OS, aplikasi, dan lainnya", "Instalasi sistem operasi dan aplikasi."],
    ["konsultasi", "Konsultasi laptop/PC", "Tanya jawab seputar laptop dan PC."]]]
};
var tabBidang = document.querySelectorAll(".bidang-tab");

function tampilkanBidang(kunci) {
  var data = daftarBidang[kunci];
  document.getElementById("bidang-desc").textContent = data[0];
  var isi = document.getElementById("bidang-isi");
  isi.innerHTML = "";
  data[1].forEach(function (item) {
    var kartu = document.createElement("article");
    kartu.className = "bidang-card";
    var h = document.createElement("h3");
    var p = document.createElement("p");
    var b = document.createElement("button");
    h.textContent = item[1];
    p.textContent = item[2];
    b.className = "btn btn-small";
    b.type = "button";
    b.textContent = "Lihat harga";
    b.addEventListener("click", function () {
      tampilkanLayanan(item[0]);
      document.getElementById("harga-panel").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    kartu.appendChild(h);
    kartu.appendChild(p);
    kartu.appendChild(b);
    isi.appendChild(kartu);
  });
  tabBidang.forEach(function (t) {
    t.setAttribute("aria-pressed", t.getAttribute("data-bidang") === kunci ? "true" : "false");
  });
}
tabBidang.forEach(function (t) {
  t.addEventListener("click", function () { tampilkanBidang(t.getAttribute("data-bidang")); });
});
tampilkanBidang("business");
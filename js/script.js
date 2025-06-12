/* script.js */
document.getElementById('nameForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nama').value.trim();
  if (name) {
    document.getElementById('greeting').textContent = `Hi, ${name}! Welcome!`;
    this.reset();
  }
});

// Script untuk halaman messages.html (Message Us form)
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  const nameVal = name.value.trim();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();
  const messageVal = message.value.trim();

  // Validasi field kosong
  if (!nameVal || !emailVal || !phoneVal || !messageVal) {
    alert("Harap isi semua kolom sebelum mengirim!");
    return;
  }

  // Validasi nomor HP hanya angka
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(phoneVal)) {
    alert("Nomor HP harus hanya berisi angka.");
    return;
  }

  // Validasi pesan minimal 10 kata
  const messageWords = messageVal.split(/\s+/).filter(word => word.length > 0);
  if (messageWords.length < 10) {
    alert("Pesan harus minimal 10 kata.");
    return;
  }

  // Tampilkan hasil input di form hasil (form duplikat)
  document.getElementById('resultName').value = nameVal;
  document.getElementById('resultEmail').value = emailVal;
  document.getElementById('resultPhone').value = phoneVal;
  document.getElementById('resultMessage').value = messageVal;

  // Tampilkan form hasil jika sebelumnya tersembunyi
  document.getElementById('resultForm').style.display = "block";
});

// Slideshow otomatis untuk banner di profile.html
const banners = ["img/banner1.jpg", "img/banner-2.jpg", "img/banner33.jpg", "img/banner5.jpg", "img/banner6.jpg"];
let currentIndex = 0;

const bannerImg = document.getElementById("bannerSlide");
if (bannerImg) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % banners.length;
    bannerImg.src = banners[currentIndex];
  }, 1000); // Ganti gambar setiap 1 detik
}

const bird = document.querySelector('.bird');
if (bird) {
  // Ambil waktu awal dari localStorage jika ada
  let startTime = localStorage.getItem('birdStartTime');
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('birdStartTime', startTime);
  }

  function updateBirdPosition() {
  const elapsed = (Date.now() - startTime) / 1000; // detik
  const duration = 15; // durasi bolak-balik (kanan dan kiri)

  const progress = (elapsed % duration) / duration;
  const direction = Math.floor(elapsed / duration) % 2 === 0 ? 1 : -1;

  const windowWidth = window.innerWidth;
  const birdWidth = bird.offsetWidth;

  let posX;
  if (direction === 1) {
    // Terbang ke kanan
    posX = progress * (windowWidth + birdWidth) - birdWidth;
  } else {
    // Terbang ke kiri
    posX = (1 - progress) * (windowWidth + birdWidth) - birdWidth;
  }

  // Tetapkan posisi horizontal
  bird.style.left = `${posX}px`;

  // Set variabel CSS untuk arah, digunakan di animasi sayap
  bird.style.setProperty('--direction', direction);

  requestAnimationFrame(updateBirdPosition);
}

  updateBirdPosition();
}

// Animasi ombak realistis yang tetap di bawah layar
const wave = document.getElementById('movingWave');
if (wave) {
  let waveStartTime = localStorage.getItem('waveStartTime');
  if (!waveStartTime) {
    waveStartTime = Date.now();
    localStorage.setItem('waveStartTime', waveStartTime);
  }

  function updateWavePosition() {
    const elapsed = (Date.now() - waveStartTime) / 1000;
    const waveSpeed = 30; // durasi penuh translateX

    const progress = (elapsed % waveSpeed) / waveSpeed;
    const posX = -progress * 50; // translateX: 0% ke -50%

    // Pasang surut (gerakan vertikal kecil)
    const verticalShift = Math.sin(elapsed * 1.5) * 2; // max 2px saja

    wave.style.transform = `translateX(${posX}%) translateY(${verticalShift}px)`;

    requestAnimationFrame(updateWavePosition);
  }

  updateWavePosition();
}

function playAllAudio() {
    // Kode untuk memutar audio
}

// Ambil elemen tombol (HANYA SEKALI)
const audioControl = document.getElementById("audioControl");

// Buat elemen audio
const audioOmbak = new Audio("audio/ombak.mp3");
const audioBurung = new Audio("audio/burung.mp3");
const audioAngin = new Audio("audio/angin.mp3");

// Set volume untuk audio
audioOmbak.preload = "auto";
audioBurung.preload = "auto";
audioAngin.preload = "auto";


let isPlaying = localStorage.getItem("soundActive") === "true";

// Fungsi untuk toggle suara
function toggleSound() {
  if (isPlaying) {
    audioOmbak.pause();
    audioBurung.pause();
    audioAngin.pause();
    localStorage.setItem("soundActive", "false");
    if (audioControl) audioControl.textContent = "🔇 Aktifkan Suara";
  } else {
    audioOmbak.play();
    audioBurung.play();
    audioAngin.play();
    localStorage.setItem("soundActive", "true");
    if (audioControl) audioControl.textContent = "🔊 Nonaktifkan Suara";
  }
  isPlaying = !isPlaying;
}

// Jalankan suara jika sebelumnya aktif
if (isPlaying) {
  audioOmbak.play();
  audioBurung.play();
  audioAngin.play();
  if (audioControl) audioControl.textContent = "🔊 Nonaktifkan Suara";
} 
else {
  if (audioControl) audioControl.textContent = "🔇 Aktifkan Suara";
}

// Tambahkan event listener jika tombol ada
if (audioControl) {
  audioControl.addEventListener("click", toggleSound);
}

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  if (!audioControl) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    audioControl.style.opacity = "0";
    audioControl.style.pointerEvents = "none";
  } else {
    audioControl.style.opacity = "1";
    audioControl.style.pointerEvents = "auto";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});



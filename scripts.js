// Tahun otomatis di footer
document.getElementById('tahun').textContent = new Date().getFullYear();

// Tema terang/gelap (disimpan di browser)
const root = document.documentElement;
const tombolTema = document.getElementById('tema');

function terapkanTema(tema) {
  root.setAttribute('data-theme', tema);
  try { localStorage.setItem('tema', tema); } catch (e) {}
}

let temaAwal = null;
try { temaAwal = localStorage.getItem('tema'); } catch (e) {}
if (!temaAwal) {
  temaAwal = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
terapkanTema(temaAwal);

tombolTema.addEventListener('click', () => {
  terapkanTema(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Validasi formulir kontak
const form = document.getElementById('form-kontak');
const status = document.getElementById('status');

const aturan = {
  nama: (v) => (v.trim() ? '' : 'Nama wajib diisi.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Masukkan alamat email yang valid.'),
  pesan: (v) => (v.trim().length >= 10 ? '' : 'Pesan minimal 10 karakter.'),
};

function periksa(nama) {
  const field = form.elements[nama];
  const pesanError = aturan[nama](field.value);
  form.querySelector('[data-for="' + nama + '"]').textContent = pesanError;
  field.setAttribute('aria-invalid', pesanError ? 'true' : 'false');
  return !pesanError;
}

Object.keys(aturan).forEach((nama) => {
  form.elements[nama].addEventListener('blur', () => periksa(nama));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valid = Object.keys(aturan).map(periksa).every(Boolean);
  if (!valid) {
    status.textContent = 'Periksa kembali isian yang ditandai.';
    return;
  }
  // Ganti bagian ini dengan pengiriman ke server atau layanan formulir.
  status.textContent = 'Terima kasih, ' + form.elements.nama.value.trim() + '. Pesan Anda sudah diterima.';
  form.reset();
});

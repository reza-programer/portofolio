import { ref, watch, computed } from 'vue'

const defaultProjects = [
  {
    id: 1,
    title: 'Toko Parfum Kuningan',
    desc: 'Platform e-commerce toko parfum merupakan platform berbasis web yang dikembangkan untuk mempermudah proses penjualan parfum secara online, di mana pengguna dapat melihat katalog produk, mencari parfum berdasarkan kategori atau merek, serta melakukan pembelian dengan mudah tanpa harus datang ke toko fisik.',
    images: ['/parfum.png', '/parfum1.png', '/parfum3.png'],
    tags: ['Vue', 'Tailwind', 'Laravel'],
    featured: true
  },
  {
    id: 2,
    title: 'Simtah Kuningan',
    desc: 'Aplikasi ini merupakan sistem informasi yang dikembangkan untuk mendukung layanan pertanahan di lingkungan kantor pertanahan, yang berfungsi sebagai solusi digital untuk mengelola administrasi tanah secara terpusat, mencakup pendaftaran layanan, pengecekan status berkas, pengelolaan data, serta penyampaian informasi dan pengaduan sehingga proses menjadi lebih terstruktur, efisien, dan transparan.',
    images: ['/clinic.png'],
    tags: ['Next.js', 'Express', 'MySQL'],
    featured: true
  }
]

// Centralized State
const state = ref({
  projects: [],
  messages: []
})

// Exposed refs for convenience
export const projects = computed({
  get: () => state.value.projects,
  set: (val) => state.value.projects = val
})

export const messages = computed({
  get: () => state.value.messages,
  set: (val) => state.value.messages = val
})

let isFetching = true

// Initial Load: Try LocalStorage first (immediate), then API
const localData = localStorage.getItem('portfolio_db')
if (localData) {
  try {
    const parsed = JSON.parse(localData)
    // Basic migration/validation
    state.value.projects = parsed.projects || (Array.isArray(parsed) ? parsed : [])
    state.value.messages = parsed.messages || []
    isFetching = false
  } catch (e) {
    console.error("Gagal baca LocalStorage:", e)
  }
}

// Background Sync from API
fetch('/api/projects')
  .then(res => res.json())
  .then(data => {
    // Migration logic for old db format (if data is just an array)
    const normalizedData = (data && data.projects) ? data : { projects: Array.isArray(data) ? data : [], messages: [] }
    
    if (normalizedData.projects.length > 0 || normalizedData.messages.length > 0) {
      state.value = normalizedData
      localStorage.setItem('portfolio_db', JSON.stringify(normalizedData))
    } else if (!localData) {
      state.value.projects = defaultProjects
    }
  })
  .catch(err => {
    console.warn("Backend link unavailable, using local data.", err)
    if (!state.value.projects.length) {
      state.value.projects = defaultProjects
    }
  })
  .finally(() => {
    isFetching = false
  })

// Persist changes to both LocalStorage and API
watch(state, (newVal) => {
  if (isFetching) return;
  
  // Save to browser immediately
  localStorage.setItem('portfolio_db', JSON.stringify(newVal))
  
  // Try to save to file backend in background
  fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newVal)
  }).catch(e => console.error("Sync API failed (offline mode):", e))
}, { deep: true })

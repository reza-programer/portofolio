import { ref, watch } from 'vue'

const defaultProjects = [
  {
    id: 1,
    title: 'Toko Parfum Kuningan',
    desc: 'Aplikasi penjualan parfum eksklusif di wilayah Kuningan dengan desain modern dan sistem manajemen stok yang efisien.',
    images: ['/parfum.png', '/parfum1.png', '/parfum3.png'],
    tags: ['Vue', 'Tailwind', 'Laravel'],
    featured: true
  },
  {
    id: 2,
    title: 'Sistem Manajemen Klinik',
    desc: 'Sistem manajemen data kesehatan terpadu dan dashboard pelaporan yang informatif untuk dokter dan staf klinik.',
    images: ['/clinic.png'],
    tags: ['Next.js', 'Express', 'MySQL'],
    featured: true
  },
  {
    id: 3,
    title: 'Platform E-Learning',
    desc: 'Desain antarmuka kelas virtual dan manajemen kursus online interaktif dengan video player kustom.',
    images: ['/elearning.png'],
    tags: ['React', 'Firebase', 'CSS'],
    featured: false
  },
  {
    id: 4,
    title: 'Dashboard Analitik Keuangan',
    desc: 'Aplikasi pelacak metrik keuangan dengan grafik data interaktif, menggunakan tema gelap high-tech futuristik.',
    images: ['/finance.png'],
    tags: ['Vue', 'Chart.js', 'Python'],
    featured: false
  }
]

export const projects = ref([])

let isFetching = true

// Load Real Data from Node.js Backend
fetch('/api/projects').then(res => res.json()).then(data => {
  if (data) {
    projects.value = data
  } else {
    // If DB is empty or doesn't exist, use default
    projects.value = defaultProjects
  }
  isFetching = false
}).catch(err => {
  console.error("Gagal terhubung ke backend:", err)
  projects.value = defaultProjects
  isFetching = false
})

// Trigger save globally when any changes happen
watch(projects, (newVal) => {
  if (isFetching) return; // Prevent initial overwriting
  
  fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newVal)
  }).catch(e => console.error("Gagal menyimpan data:", e))
}, { deep: true })

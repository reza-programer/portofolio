import { ref, watch, computed } from 'vue'
import { supabase } from './supabase.js'

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

export const projects = computed({
  get: () => state.value.projects,
  set: (val) => state.value.projects = val
})

export const messages = computed({
  get: () => state.value.messages,
  set: (val) => state.value.messages = val
})

let isFetching = true
let previousProjectIds = []
let previousMessageIds = []

// Fetch Data from Supabase
const fetchFromSupabase = async () => {
  try {
    const { data: projData, error: projErr } = await supabase.from('projects').select('*').order('id', { ascending: true })
    if (projErr) throw projErr
    
    if (projData && projData.length > 0) {
      state.value.projects = projData
    } else {
      state.value.projects = defaultProjects
      // Seed default projects to Supabase if empty
      await supabase.from('projects').upsert(defaultProjects)
    }

    const { data: msgData, error: msgErr } = await supabase.from('messages').select('*').order('id', { ascending: true })
    if (msgErr) throw msgErr
    
    if (msgData) {
      state.value.messages = msgData
    }

    // Keep track of IDs for deletion detection
    previousProjectIds = state.value.projects.map(p => p.id)
    previousMessageIds = state.value.messages.map(m => m.id)

  } catch (err) {
    console.error("Gagal terhubung ke Supabase:", err)
    // Fallback to defaults if completely offline/error
    if (!state.value.projects.length) {
      state.value.projects = defaultProjects
    }
  } finally {
    isFetching = false
  }
}

fetchFromSupabase()

// Auto-sync changes to Supabase
watch(state, async (newVal) => {
  if (isFetching) return;

  try {
    // 1. Sync Projects
    const currentProjectIds = newVal.projects.map(p => p.id)
    const deletedProjectIds = previousProjectIds.filter(id => !currentProjectIds.includes(id))
    
    if (deletedProjectIds.length > 0) {
      await supabase.from('projects').delete().in('id', deletedProjectIds)
    }
    
    if (newVal.projects.length > 0) {
      // Supabase automatically handles JSON arrays if the column is JSONB
      await supabase.from('projects').upsert(newVal.projects)
    }
    previousProjectIds = currentProjectIds

    // 2. Sync Messages
    const currentMessageIds = newVal.messages.map(m => m.id)
    const deletedMessageIds = previousMessageIds.filter(id => !currentMessageIds.includes(id))
    
    if (deletedMessageIds.length > 0) {
      await supabase.from('messages').delete().in('id', deletedMessageIds)
    }

    if (newVal.messages.length > 0) {
      await supabase.from('messages').upsert(newVal.messages)
    }
    previousMessageIds = currentMessageIds

  } catch (err) {
    console.error("Gagal menyimpan ke Supabase:", err)
  }
}, { deep: true })

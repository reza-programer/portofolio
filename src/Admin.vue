<template>
  <div class="min-h-screen bg-[#050505] text-[#f8fafc] font-sans p-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-4xl font-extrabold font-['Outfit'] text-gradient">Admin Panel Proyek</h1>
        <a href="#" class="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold">Kembali ke Portofolio</a>
      </div>

      <!-- Add / Edit Form -->
      <div class="bg-[#121216] border border-white/10 rounded-3xl p-8 mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit Proyek' : 'Tambah Proyek Baru' }}</h2>
        <form @submit.prevent="saveProject" class="grid gap-6">
          <div>
            <label class="block text-sm text-[#94a3b8] mb-2">Judul Proyek</label>
            <input v-model="form.title" type="text" required class="w-full p-4 bg-[#050505] border border-white/10 rounded-xl focus:outline-none focus:border-[#8b5cf6] transition-all">
          </div>
          <div>
            <label class="block text-sm text-[#94a3b8] mb-2">Deskripsi</label>
            <textarea v-model="form.desc" required rows="3" class="w-full p-4 bg-[#050505] border border-white/10 rounded-xl focus:outline-none focus:border-[#8b5cf6] transition-all"></textarea>
          </div>
          <div>
            <label class="block text-sm text-[#94a3b8] mb-2">Upload Gambar Proyek</label>
            <input @change="handleFileUpload" type="file" multiple accept="image/*" class="w-full p-4 bg-[#050505] border border-white/10 rounded-xl focus:outline-none focus:border-[#8b5cf6] transition-all text-[#94a3b8] file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:text-sm file:font-bold file:bg-[#8b5cf6]/20 file:text-[#8b5cf6] hover:file:bg-[#8b5cf6]/30 cursor-pointer">
            <div v-if="form.images && form.images.length > 0" class="flex gap-4 mt-4 flex-wrap">
              <div v-for="(img, idx) in form.images" :key="idx" class="relative group">
                <img :src="img" class="w-20 h-20 object-cover rounded-lg border border-white/10" />
                <button type="button" @click="removeImage(idx)" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><i class="fas fa-times text-xs"></i></button>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm text-[#94a3b8] mb-2">Keahlian/Tags (pisahkan dengan koma)</label>
            <input v-model="tagsInput" type="text" placeholder="Vue, Tailwind, MySQL" class="w-full p-4 bg-[#050505] border border-white/10 rounded-xl focus:outline-none focus:border-[#8b5cf6] transition-all">
          </div>
          <div class="flex items-center gap-3">
            <input v-model="form.featured" type="checkbox" id="featured" class="w-5 h-5 rounded border-white/20 bg-[#050505] text-[#8b5cf6] focus:ring-[#8b5cf6]">
            <label for="featured" class="text-sm text-[#94a3b8]">Tandai sebagai Proyek Pilihan (Featured)</label>
          </div>
          <div class="flex gap-4 mt-4">
            <button type="submit" class="px-8 py-4 rounded-xl text-white font-bold bg-gradient-premium hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-1 transition-all">
              {{ isEditing ? 'Simpan Perubahan' : 'Tambah Proyek' }}
            </button>
            <button v-if="isEditing" type="button" @click="resetForm" class="px-8 py-4 rounded-xl text-white font-bold bg-white/10 hover:bg-white/20 transition-all">
              Batal
            </button>
          </div>
        </form>
      </div>

      <!-- List of Projects -->
      <h2 class="text-2xl font-bold mb-6">Daftar Proyek Anda</h2>
      <div class="grid gap-6">
        <div v-for="proj in projects" :key="proj.id" class="bg-[#121216] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#8b5cf6]/50 transition-all" :class="proj.featured ? 'border-[#8b5cf6]/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]' : ''">
          <div class="flex gap-6 items-center">
            <img :src="proj.images[0] || '/placeholder.png'" class="w-24 h-24 object-cover rounded-xl bg-black" />
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-bold font-['Outfit']">{{ proj.title }}</h3>
                <span v-if="proj.featured" class="px-3 py-1 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full text-white text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  <i class="fas fa-star mr-1"></i>Featured
                </span>
              </div>
              <p class="text-[#94a3b8] text-sm max-w-xl truncate">{{ proj.desc }}</p>
              <div class="flex gap-2 mt-3">
                <span v-for="tag in proj.tags" :key="tag" class="text-xs px-2 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-md">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-3 shrink-0">
            <button @click="editProject(proj)" class="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"><i class="fas fa-edit"></i></button>
            <button @click="deleteProject(proj.id)" class="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div v-if="projects.length === 0" class="text-center py-10 text-[#94a3b8]">
          Belum ada proyek ditambahkan.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects } from './data.js'

const form = ref({
  id: null,
  title: '',
  desc: '',
  images: [],
  featured: false
})
const tagsInput = ref('')

const isEditing = computed(() => form.value.id !== null)

const handleFileUpload = (event) => {
  const files = event.target.files
  if (!files) return
  
  for(let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.images.push(e.target.result)
    }
    reader.readAsDataURL(files[i])
  }
  // Clear the input value so user can upload the same file again if they deleted it
  event.target.value = ''
}

const removeImage = (idx) => {
  form.value.images.splice(idx, 1)
}

const saveProject = () => {
  const newProject = {
    ...form.value,
    id: form.value.id || Date.now(),
    tags: tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
  }

  if (isEditing.value) {
    const index = projects.value.findIndex(p => p.id === form.value.id)
    if (index !== -1) {
      projects.value[index] = newProject
    }
  } else {
    projects.value.push(newProject)
  }

  resetForm()
}

const editProject = (proj) => {
  form.value = { id: proj.id, title: proj.title, desc: proj.desc, images: [...(proj.images || [])], featured: proj.featured || false }
  tagsInput.value = proj.tags ? proj.tags.join(', ') : ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteProject = (id) => {
  if (confirm('Yakin ingin menghapus proyek ini?')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}

const resetForm = () => {
  form.value = { id: null, title: '', desc: '', images: [], featured: false }
  tagsInput.value = ''
}
</script>

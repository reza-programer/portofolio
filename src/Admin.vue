<template>
  <div class="min-h-screen bg-[#fafafa] text-[#1e293b] font-sans p-4 md:p-6">
    <div class="max-w-5xl mx-auto">
      
      <!-- Minimal Header -->
      <header class="flex justify-between items-center mb-10 py-6 border-b border-slate-200">
        <div>
          <h1 class="text-2xl font-bold font-['Outfit'] tracking-tight flex items-center gap-2">
            <span class="w-2 h-8 bg-slate-900 rounded-full"></span>
            Portfolio Manager
          </h1>
          <p class="text-slate-400 text-sm font-medium mt-1">Hello Reza, manage your digital assets.</p>
        </div>
        <a href="#" class="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
          <i class="fas fa-arrow-left text-xs"></i> View Site
        </a>
      </header>

      <!-- Compact Navigation -->
      <nav class="flex gap-1 mb-8 bg-slate-100/50 p-1 rounded-xl w-fit border border-slate-200">
        <button 
          @click="activeTab = 'projects'" 
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          :class="activeTab === 'projects' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
        >
          Projects
        </button>
        <button 
          @click="activeTab = 'messages'" 
          class="px-6 py-2 rounded-lg text-sm font-bold transition-all relative"
          :class="activeTab === 'messages' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
        >
          Inbox
          <span v-if="unreadCount > 0" class="absolute top-0 right-0 w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
        </button>
      </nav>

      <!-- Projects Tab -->
      <main v-if="activeTab === 'projects'" class="space-y-12">
        <!-- Compact Form Card -->
        <section class="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
            <i class="fas" :class="isEditing ? 'fa-pen-nib' : 'fa-plus-circle'"></i>
            {{ isEditing ? 'Edit Project' : 'New Entry' }}
          </h2>

          <form @submit.prevent="saveProject" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Left Side: Basic Info -->
            <div class="md:col-span-2 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                  <input v-model="form.title" type="text" required class="minimal-input" placeholder="Project Name">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tags</label>
                  <input v-model="tagsInput" type="text" placeholder="Vue, Laravel..." class="minimal-input">
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Summary</label>
                <textarea v-model="form.desc" required rows="3" class="minimal-input resize-none" placeholder="Brief description..."></textarea>
              </div>
              <div class="flex items-center gap-3 py-2">
                <input v-model="form.featured" type="checkbox" id="featured" class="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-0">
                <label for="featured" class="text-sm font-medium text-slate-500">Feature this project in carousel</label>
              </div>
            </div>

            <!-- Right Side: Media -->
            <div class="space-y-4">
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Assets</label>
                <div class="relative group">
                  <input @change="handleFileUpload" type="file" multiple accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-10">
                  <div class="h-32 border border-slate-200 border-dashed rounded-xl bg-slate-50/50 flex flex-col items-center justify-center gap-2 group-hover:bg-slate-100 transition-colors">
                    <i class="fas fa-arrow-up-from-bracket text-slate-400 group-hover:text-slate-900 transition-colors"></i>
                    <p class="text-[11px] font-bold text-slate-400 group-hover:text-slate-900">Upload Media</p>
                  </div>
                </div>
              </div>

              <!-- Compact Preview Grid -->
              <div v-if="form.images && form.images.length > 0" class="flex flex-wrap gap-2">
                <div v-for="(img, idx) in form.images.slice(0, 4)" :key="idx" class="relative w-12 h-12 group">
                  <img :src="img" loading="lazy" class="w-full h-full object-cover rounded-lg border border-slate-200" />
                  <button type="button" @click="removeImage(idx)" class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100"><i class="fas fa-times"></i></button>
                </div>
                <div v-if="form.images.length > 4" class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">+{{ form.images.length - 4 }}</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="md:col-span-3 flex justify-between items-center pt-4 border-t border-slate-100">
              <div class="flex gap-2">
                <button type="submit" :disabled="isSaving" class="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50">
                  {{ isSaving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Publish Project') }}
                </button>
                <button v-if="isEditing" type="button" @click="resetForm" class="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </section>

        <!-- Refined List -->
        <section>
          <div class="flex items-center gap-4 mb-6">
            <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Workspace / {{ projects.length }} Items</h2>
            <div class="flex-grow h-[1px] bg-slate-200"></div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="proj in projects" :key="proj.id" class="group bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-900 transition-all">
              <div class="flex gap-4 items-start mb-4">
                <img :src="proj.images[0] || '/placeholder.png'" loading="lazy" class="w-16 h-16 object-cover rounded-lg bg-slate-50 border border-slate-100" />
                <div class="min-w-0">
                  <h3 class="font-bold text-sm truncate">{{ proj.title }}</h3>
                  <div class="flex gap-1 mt-1 truncate">
                    <span v-for="tag in proj.tags.slice(0, 2)" :key="tag" class="text-[10px] text-slate-400">{{ tag }}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center pt-4 border-t border-slate-50">
                <div class="flex gap-1">
                   <div v-if="proj.featured" class="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center text-[8px] text-white" title="Featured"><i class="fas fa-star"></i></div>
                </div>
                <div class="flex gap-2">
                  <button @click="editProject(proj)" class="text-[11px] font-bold text-slate-500 hover:text-slate-900">Edit</button>
                  <button @click="deleteProject(proj.id)" class="text-[11px] font-bold text-slate-500 hover:text-red-600">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Messages Tab -->
      <main v-if="activeTab === 'messages'" class="space-y-4">
        <div v-for="msg in messages" :key="msg.id" class="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-900 transition-all group">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                 {{ msg.name.charAt(0) }}
               </div>
               <div>
                 <h4 class="text-sm font-bold flex items-center gap-2">
                   {{ msg.name }}
                   <span v-if="msg.status === 'unread'" class="w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
                 </h4>
                 <p class="text-[11px] text-slate-400 font-medium">{{ msg.email }} • {{ msg.date }}</p>
               </div>
            </div>
            <div class="flex gap-2">
              <button @click="deleteMessage(msg.id)" class="text-slate-300 hover:text-red-500 transition-colors text-xs"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <p class="text-slate-600 text-sm bg-slate-50 p-4 rounded-lg leading-relaxed">{{ msg.message }}</p>
          <div v-if="msg.status === 'unread'" class="mt-4">
            <button @click="markAsRead(msg.id)" class="text-[11px] font-bold text-slate-900 hover:underline underline-offset-4">Mark as read</button>
          </div>
        </div>

        <div v-if="messages.length === 0" class="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
           <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Inbox Zero</p>
        </div>
      </main>

      <!-- Toast -->
      <transition name="pop">
        <div v-if="saveSuccess" class="fixed bottom-10 right-1/2 translate-x-1/2 z-[3000] bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2">
          <i class="fas fa-check-circle text-white"></i> Successfully Saved
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, messages } from './data.js'

const activeTab = ref('projects')
const tagsInput = ref('')
const isSaving = ref(false)
const saveSuccess = ref(false)

const form = ref({
  id: null,
  title: '',
  desc: '',
  images: [],
  featured: false
})

const isEditing = computed(() => form.value.id !== null)
const unreadCount = computed(() => messages.value.filter(m => m.status === 'unread').length)

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
  event.target.value = ''
}

const removeImage = (idx) => {
  form.value.images.splice(idx, 1)
}

const saveProject = async () => {
  isSaving.value = true
  
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

  setTimeout(() => {
    isSaving.value = false
    saveSuccess.value = true
    resetForm()
    setTimeout(() => { saveSuccess.value = false }, 3000)
  }, 400)
}

const editProject = (proj) => {
  form.value = { ...proj, images: [...(proj.images || [])] }
  tagsInput.value = proj.tags ? proj.tags.join(', ') : ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteProject = (id) => {
  if (confirm('Permanently remove this project?')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}

const markAsRead = (id) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg) msg.status = 'read'
}

const deleteMessage = (id) => {
  if (confirm('Delete message?')) {
    messages.value = messages.value.filter(m => m.id !== id)
  }
}

const resetForm = () => {
  form.value = { id: null, title: '', desc: '', images: [], featured: false }
  tagsInput.value = ''
}
</script>

<style scoped>
.minimal-input {
  @apply w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 transition-all text-sm font-medium;
}

.pop-enter-active, .pop-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.pop-enter-from { opacity: 0; transform: translate(50%, 20px); }
.pop-leave-to { opacity: 0; transform: translate(50%, 20px); }
</style>

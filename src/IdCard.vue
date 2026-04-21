<template>
  <div class="relative perspective-1000 w-full max-w-[210px] sm:max-w-[230px] mx-auto h-[290px] sm:h-[320px] mt-4 md:mt-8"
       :class="startAnimation ? 'animate-drop-down' : 'card-hidden'"
       @mousemove="handleMouseMove"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave">
    
    <!-- Lanyard moved inside The Card for perfect centering -->

    <!-- The Card -->
    <div ref="cardRef" 
         class="id-card w-full h-full rounded-3xl relative transition-all duration-200 ease-out z-10 cursor-pointer"
         :class="{'transition-all duration-500 ease-in-out': !isHovered}"
         :style="{
           transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isHovered ? 1.05 : 1})`,
           boxShadow: isHovered ? '0 40px 80px rgba(139, 92, 246, 0.5)' : '0 20px 40px rgba(0,0,0,0.8)'
         }">
      
      <!-- Backing gradient & Glassmorphism -->
      <!-- Removed overflow-hidden so the lanyard can extend upwards -->
      <div class="absolute inset-0 rounded-3xl bg-white/90 backdrop-blur-2xl border flex flex-col" 
           :class="isHovered ? 'border-[#8b5cf6]/60 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]' : 'border-black/10'">
           
        <!-- Top bar -->
        <div class="h-16 sm:h-20 w-full bg-[#f8fafc] relative shrink-0 rounded-t-[1.4rem] border-b border-black/5 z-[60]">
           <!-- Beautiful Top Gradient Mesh -->
           <div class="absolute inset-0 opacity-80 rounded-t-[1.4rem]" style="background: radial-gradient(circle at top left, #8b5cf6 0%, transparent 80%), radial-gradient(circle at top right, #ec4899 0%, transparent 80%);"></div>
           
           <!-- Lanyard Mechanism ENTIRELY inside the 3D Card context for perfect centering -->
           <div class="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%-8px)] flex flex-col items-center z-[70] pointer-events-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
              <!-- Lanyard Ribbon -->
              <div class="w-4 sm:w-6 h-[150vh] bg-[#f1f5f9] relative border-x border-black/20 flex justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)] z-10">
                 <!-- Neon Stripe down the ribbon -->
                 <div class="w-px h-full bg-gradient-to-b from-[#8b5cf6] to-[#ec4899] opacity-80 blur-[0.5px] rounded-full"></div>
              </div>
              <!-- Metallic Clip Base -->
              <div class="w-6 sm:w-8 h-8 bg-gradient-to-b from-[#f4f4f5] via-[#a1a1aa] to-[#3f3f46] rounded-md -mt-1 relative z-20 flex flex-col items-center border-t border-b border-[#ffffff]/70 border-b-[#09090b]">
                 <div class="w-full h-1 bg-[#ffffff]/90 rounded-t-md mb-1.5"></div>
                 <div class="w-2.5 h-2.5 border-[2px] border-black/20 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] bg-gray-300"></div>
              </div>
           </div>

           <!-- The Hook (Carabiner ring) extending from inside the clip -->
           <div class="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 sm:w-4 h-6 border-[2.5px] border-gray-400 rounded-b-xl z-[40] pointer-events-none shadow-[0_4px_4px_rgba(0,0,0,0.5)] border-t-0"></div>

           <!-- Card Punch Hole Background (The dark void) -->
           <div class="absolute top-4 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3.5 rounded-full bg-gray-200 z-0 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] border-t border-black/10"></div>

           <!-- Card Punch Hole Bottom Lip (Covers the hook!) -->
           <div class="absolute top-[23px] left-1/2 -translate-x-1/2 w-10 sm:w-12 h-[7px] rounded-b-full overflow-hidden z-[50]">
               <div class="w-full h-3.5 -mt-[7px] rounded-full shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] border-b border-black/10 opacity-90 bg-gradient-to-t from-[#f8fafc] to-white"></div>
           </div>
           
           <div class="absolute bottom-2 left-0 w-full px-5 flex justify-between items-center z-10 opacity-70">
             <div class="w-8 sm:w-10 border-t border-black/10"></div>
             <h3 class="text-black/80 font-['Outfit'] font-black tracking-[0.3em] text-[7px] sm:text-[8px] uppercase drop-shadow-md">STAFF PASS</h3>
             <div class="w-8 sm:w-10 border-t border-black/10"></div>
           </div>
        </div>

        <!-- Content -->
        <div class="p-3 flex flex-col items-center flex-grow relative z-10 id-content justify-between bg-gradient-to-b from-white/50 to-[#f8fafc] rounded-b-[1.4rem]">
          
          <!-- Subtle dot pattern background -->
          <div class="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] z-0 rounded-b-[1.4rem]"></div>

          <!-- Profile Image -->
          <div class="relative w-16 h-16 sm:w-20 sm:h-20 mt-0 rounded-xl p-1 bg-[#f8fafc] shadow-[0_15px_30px_rgba(0,0,0,0.8)] shrink-0 transform transition-transform duration-500 border border-black/10 z-20"
               :class="isHovered ? 'scale-110 translate-z-10' : ''">
            <div class="w-full h-full rounded-lg overflow-hidden border border-gray-200 relative bg-white relative">
               <!-- Removed 'filter contrast-110' to make photo clearly visible -->
               <img src="/profile.jpeg" class="w-full h-full object-cover brightness-105" />
               <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
            </div>
            <!-- Futuristic corners -->
            <div class="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-[3px] border-l-[3px] border-[#8b5cf6] z-20 rounded-tl-sm"></div>
            <div class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-[3px] border-r-[3px] border-[#ec4899] z-20 rounded-br-sm"></div>
          </div>

          <!-- Info Text -->
          <div class="text-center w-full mt-2 z-20">
            <h2 class="text-base sm:text-lg font-extrabold text-[#0f172a] tracking-widest font-['Outfit'] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1">M. REZA N.</h2>
            <p class="text-[8px] sm:text-[9px] text-[#ec4899] font-black tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">Frontend Developer</p>
            <p class="text-[7px] sm:text-[7.5px] text-slate-500 mt-1 leading-tight px-1 font-semibold">Spesialis dalam merancang antarmuka premium dan pengalaman web modern.</p>
            
            <!-- Metadata Box -->
            <div class="mt-2 text-[7px] sm:text-[8px] font-bold text-left w-full space-y-1.5 text-slate-600 font-mono bg-white/60 p-2 sm:p-2.5 rounded-lg border border-black/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
               <!-- Deco line -->
               <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#8b5cf6] to-[#ec4899]"></div>
               <div class="flex justify-between items-center pl-2"><span class="text-[#0f172a]/40">ID_NUM</span> <span class="text-[#0f172a] tracking-widest">REZA-2026</span></div>
               <div class="flex justify-between items-center pl-2"><span class="text-[#0f172a]/40">DEPT</span> <span class="tracking-widest text-[#8b5cf6]">ENGINEERING</span></div>
               <div class="flex justify-between items-center pl-2"><span class="text-[#0f172a]/40">ACCESS</span> <span class="px-1.5 py-0.5 bg-gradient-to-r from-[#ec4899]/20 to-[#8b5cf6]/20 text-[#0f172a] rounded-[4px] border border-black/10 tracking-widest">PREMIUM</span></div>
            </div>
          </div>

          <!-- Futuristic Barcode Fake -->
          <div class="w-full flex justify-between items-end h-5 sm:h-6 mt-2 opacity-80 z-20 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]">
             <div class="h-full w-1 sm:w-1.5 bg-white/90 rounded-t-sm"></div>
             <div class="h-[70%] w-2 sm:w-2.5 bg-white/90 rounded-t-sm"></div>
             <div class="h-full w-1 sm:w-1 bg-white/90 rounded-t-sm"></div>
             <div class="h-[85%] w-3 sm:w-3.5 bg-[#8b5cf6] rounded-t-sm"></div>
             <div class="h-full w-0.5 sm:w-1 bg-white/90 rounded-t-sm"></div>
             <div class="h-full w-4 sm:w-5 bg-[#ec4899] rounded-t-sm"></div>
             <div class="h-[60%] w-1 sm:w-1.5 bg-white/90 rounded-t-sm"></div>
             <div class="h-[90%] w-2 sm:w-2.5 bg-white/90 rounded-t-sm"></div>
             <div class="h-full w-1 sm:w-1 bg-white/90 rounded-t-sm"></div>
             <div class="h-full w-2 sm:w-2.5 bg-white/90 rounded-t-sm"></div>
             <div class="h-[70%] w-1 sm:w-1.5 bg-[#8b5cf6] rounded-t-sm"></div>
          </div>
        </div>
      </div>

      <!-- Holographic Glare Effect -->
      <div v-show="isHovered" 
           class="absolute inset-0 rounded-3xl pointer-events-none opacity-50 mix-blend-overlay transition-opacity duration-300 z-30"
           :style="{
             background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)`
           }">
      </div>
      
      <!-- Specular Reflection / Premium Rainbow Foil -->
      <div v-show="isHovered" 
           class="absolute inset-0 rounded-3xl pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-300 z-30"
           :style="{
             background: `linear-gradient(${rotX * 2 + rotY * 2 + 180}deg, rgba(236,72,153,0) 0%, rgba(139,92,246,0.6) 30%, rgba(255,255,255,0.9) 50%, rgba(59,130,246,0.6) 70%, rgba(28,28,28,0) 100%)`,
             transform: `translateZ(1px)`
           }">
      </div>
      
      <!-- Scanline Overlay for Cyberpunk feel -->
      <div class="absolute inset-0 pointer-events-none rounded-3xl z-20 
                  bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_51%)] 
                  bg-[length:100%_4px] opacity-20 hidden sm:block mix-blend-overlay"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cardRef = ref(null)
const rotX = ref(0)
const rotY = ref(0)
const glareX = ref(50)
const glareY = ref(50)
const isHovered = ref(false)
const startAnimation = ref(false)

const handleMouseMove = (e) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  
  // Calculate cursor position relative to card center
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const mouseX = e.clientX - centerX
  const mouseY = e.clientY - centerY
  
  // Max rotation degrees
  const maxRotX = 15
  const maxRotY = 20
  
  rotY.value = (mouseX / (rect.width / 2)) * maxRotY
  rotX.value = -(mouseY / (rect.height / 2)) * maxRotX
  
  // Glare position (percentage)
  glareX.value = ((e.clientX - rect.left) / rect.width) * 100
  glareY.value = ((e.clientY - rect.top) / rect.height) * 100
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  rotX.value = 0
  rotY.value = 0
  glareX.value = 50
  glareY.value = 50
}

// Gentle floating animation when not hovered
let frameId = null
let angle = 0

const animateIdle = () => {
  if (!isHovered.value) {
    angle += 0.015
    rotY.value = Math.sin(angle) * 8
    rotX.value = Math.cos(angle * 1.5) * 5
  }
  frameId = requestAnimationFrame(animateIdle)
}

onMounted(() => {
  // Sync the drop down animation with the disappearance of the preloader
  setTimeout(() => {
    startAnimation.value = true
  }, 2800) // Trigger slightly before preloader exits to make it seamless

  frameId = requestAnimationFrame(animateIdle)
})

onUnmounted(() => {
  if (frameId) cancelAnimationFrame(frameId)
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.id-card {
  transform-style: preserve-3d;
}
.id-content {
  transform: translateZ(40px);
}
.translate-z-10 {
  transform: translateZ(60px) scale(1.1);
}

.card-hidden {
  transform: translateY(-150vh) rotateZ(8deg);
  opacity: 0;
}

@keyframes dropDown {
  0%   { transform: translateY(-150vh) rotateZ(15deg); opacity: 1; animation-timing-function: ease-in; }
  35%  { transform: translateY(60px) rotateZ(-8deg); opacity: 1; animation-timing-function: ease-out; }
  55%  { transform: translateY(-30px) rotateZ(5deg); opacity: 1; animation-timing-function: ease-in-out; }
  75%  { transform: translateY(15px) rotateZ(-2deg); opacity: 1; animation-timing-function: ease-in-out; }
  85%  { transform: translateY(-5px) rotateZ(1deg); opacity: 1; animation-timing-function: ease-in-out; }
  95%  { transform: translateY(2px) rotateZ(-0.5deg); opacity: 1; animation-timing-function: ease-in-out; }
  100% { transform: translateY(0) rotateZ(0); opacity: 1; }
}

.animate-drop-down {
  animation: dropDown 2.2s linear forwards;
  transform-origin: top center;
}
</style>

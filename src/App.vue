<template>
  <div class="font-sans antialiased text-[#0f172a] bg-[#f8fafc] min-h-screen">
    <!-- Awesome Premium Preloader -->
    <transition name="preloader">
      <div v-if="isLoading" class="fixed inset-0 z-[9999] bg-[#f8fafc] flex flex-col items-center justify-center">
        <div class="relative flex items-center justify-center">
          <div class="absolute w-32 h-32 rounded-full border-t-2 border-b-2 border-[#8b5cf6] animate-spin"></div>
          <div class="absolute w-28 h-28 rounded-full border-l-2 border-r-2 border-[#ec4899] animate-[spin_1.5s_linear_reverse_infinite]"></div>
          <div class="absolute w-24 h-24 rounded-full border-t-2 border-b-2 border-[#3b82f6] animate-[spin_2s_linear_infinite]"></div>
          <img src="/profile.jpeg" alt="Loading" class="w-16 h-16 rounded-full object-cover border-2 border-black/10 shadow-[0_0_20px_#8b5cf6] animate-pulse" />
        </div>
        <h2 class="mt-8 text-2xl font-['Outfit'] font-extrabold tracking-widest text-gradient animate-pulse">SELAMAT DATANG...</h2>
      </div>
    </transition>

    <Admin v-if="currentRoute === '#admin'" @goBack="currentRoute = ''" />
    <div v-else>
    <!-- Navbar -->
    <nav :class="['fixed top-0 left-0 w-full z-50 transition-all duration-300', isScrolled ? 'py-4 glass' : 'py-6 bg-transparent']">
      <div class="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a href="#" class="font-['Outfit'] text-3xl font-extrabold tracking-wide text-gradient relative z-50">REZA<span class="text-[#0f172a]">.</span></a>
        <!-- Desktop Nav -->
        <ul class="hidden md:flex gap-10">
          <li><a href="#home" class="nav-link">Beranda</a></li>
          <li><a href="#about" class="nav-link">Tentang</a></li>
          <li><a href="#experience" class="nav-link">Pengalaman</a></li>
          <li><a href="#projects" class="nav-link">Proyek</a></li>
          <li><a href="#contact" class="nav-link">Kontak</a></li>
        </ul>
        <!-- Mobile Toggle Button -->
        <button class="md:hidden text-2xl text-[#0f172a] relative z-50 focus:outline-none" @click="isMenuOpen = !isMenuOpen">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
      <!-- Mobile Nav -->
      <div 
        :class="['absolute top-0 left-0 w-full h-screen bg-[#f8fafc]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-500', isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible']"
      >
        <ul class="flex flex-col gap-8 text-center text-xl font-bold">
          <li><a href="#home" class="nav-link" @click="isMenuOpen = false">Beranda</a></li>
          <li><a href="#about" class="nav-link" @click="isMenuOpen = false">Tentang</a></li>
          <li><a href="#experience" class="nav-link" @click="isMenuOpen = false">Pengalaman</a></li>
          <li><a href="#projects" class="nav-link" @click="isMenuOpen = false">Proyek</a></li>
          <li><a href="#contact" class="nav-link" @click="isMenuOpen = false">Kontak</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center overflow-hidden pt-20">
      <!-- Decorative background blobs -->
      <div class="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] animate-[float_20s_infinite_alternate]"></div>
      <div class="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[100px] animate-[float_20s_infinite_alternate] delay-1000"></div>
      
      <div class="max-w-7xl mx-auto px-8 relative z-10 w-full">
        <div class="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
          <div class="flex-1 text-center md:text-left">
            <h2 class="animate-fade-up [animation-delay:200ms] text-xl md:text-2xl text-[#8b5cf6] mb-2 tracking-widest uppercase font-semibold opacity-0">Halo, Saya</h2>
            <h1 class="text-5xl md:text-7xl font-extrabold mb-4 leading-tight font-['Outfit'] opacity-0 animate-fade-up [animation-delay:400ms]">
              {{ typedName }}<span class="animate-pulse text-[#8b5cf6]">|</span>
            </h1>
            <h3 class="animate-fade-up [animation-delay:600ms] text-2xl md:text-4xl text-gradient font-semibold mb-6 opacity-0">Frontend Developer</h3>
            <p class="animate-fade-up [animation-delay:800ms] text-xl text-[#475569] mb-10 max-w-2xl mx-auto md:mx-0 opacity-0">Membangun pengalaman digital premium dengan teknologi modern yang berfokus pada estetika dan performa.</p>
            <div class="animate-fade-up [animation-delay:1000ms] flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0">
              <a href="#projects" class="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold font-['Outfit'] tracking-wide text-white bg-gradient-premium shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all">Lihat Karya</a>
              <a href="#contact" class="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold font-['Outfit'] tracking-wide text-[#0f172a] bg-transparent border border-black/10 backdrop-blur-sm hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/10 hover:-translate-y-1 transition-all">Hubungi Saya</a>
            </div>
          </div>
          <div class="flex-1 flex justify-center items-center relative w-full perspective-1000">
            <IdCard />
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 md:py-32 bg-white border-y border-black/5">
      <div class="max-w-7xl mx-auto px-6 md:px-8">
        <h2 class="text-3xl md:text-5xl font-extrabold text-center mb-10 md:mb-16 font-['Outfit']">Tentang <span class="text-gradient">Saya</span></h2>
        <div class="max-w-4xl mx-auto text-center text-base md:text-lg text-[#475569]">
          <p>Saya adalah seorang Web Developer yang berdedikasi dengan gairah untuk menciptakan situs web yang bersih, interaktif, dan ramah pengguna. Saya spesialis dalam membangun pengalaman frontend dan backend yang kuat.</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 reveal-group">
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group overflow-hidden relative reveal-item">
              <i class="fab fa-html5 text-5xl text-[#0f172a] opacity-70 group-hover:opacity-100 group-hover:text-[#8b5cf6] transition-all group-hover:scale-110"></i>
              <span class="font-semibold text-sm md:text-base">HTML5</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <i class="fab fa-css3-alt text-5xl text-[#0f172a] opacity-70 group-hover:opacity-100 group-hover:text-[#8b5cf6] transition-all group-hover:scale-110"></i>
              <span class="font-semibold text-sm md:text-base">CSS3</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <i class="fab fa-js text-5xl text-[#0f172a] opacity-70 group-hover:opacity-100 group-hover:text-[#8b5cf6] transition-all group-hover:scale-110"></i>
              <span class="font-semibold text-sm md:text-base">JavaScript</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <i class="fab fa-laravel text-5xl text-[#0f172a] opacity-70 group-hover:opacity-100 group-hover:text-[#8b5cf6] transition-all group-hover:scale-110"></i>
              <span class="font-semibold text-sm md:text-base">Laravel</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <img src="https://cdn.worldvectorlogo.com/logos/codeigniter.svg" class="w-12 h-12 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <span class="font-semibold text-sm md:text-base">CodeIgniter</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <i class="fab fa-python text-5xl text-[#0f172a] opacity-70 group-hover:opacity-100 group-hover:text-[#8b5cf6] transition-all group-hover:scale-110"></i>
              <span class="font-semibold text-sm md:text-base">Python</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" class="w-12 h-12 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <span class="font-semibold text-sm md:text-base">Next.js</span>
            </div>
            <div class="bg-[#f8fafc] p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#8b5cf6] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] transition-all flex flex-col items-center gap-4 group reveal-item">
              <i class="fab fa-vuejs text-5xl text-[#0f172a] opacity-70 group-hover:opacity-100 group-hover:text-[#8b5cf6] transition-all group-hover:scale-110"></i>
              <span class="font-semibold text-sm md:text-base">Vue.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-32">
      <div class="max-w-7xl mx-auto px-8">
        <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-16 font-['Outfit']">Pengalaman <span class="text-gradient">Magang</span></h2>
        <div class="grid md:grid-cols-3 gap-10 reveal-group">
          <!-- Card 1: PT Orbit Ventura -->
          <div class="glass-card group cursor-pointer reveal-item" @click="openModal('AI Engineer di PT Orbit Ventura', 'Mengerjakan proyek Website AI berbasis Computer Vision menggunakan algoritma YOLOv5 untuk deteksi objek secara real-time menggunakan bahasa pemrograman python. Membangun backend menggunakan Python untuk integrasi model AI ke aplikasi web. Melakukan preprocessing dataset, training model, dan optimasi hyperparameter untuk meningkatkan akurasi deteksi.', ['/orbit.png'])">
            <div class="relative pt-[60%] overflow-hidden bg-black/50">
              <img src="/orbit.png" loading="lazy" class="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity text-[#0f172a] hover:text-[#8b5cf6]"><i class="fas fa-search-plus"></i></div>
            </div>
            <div class="p-8 bg-gradient-to-t from-white to-transparent h-full">
              <h3 class="text-2xl font-bold mb-2">AI Engineer</h3>
              <p class="text-[#8b5cf6] font-semibold mb-1">PT Orbit Ventura Indonesia</p>
              <p class="text-xs text-[#475569] mb-4 uppercase tracking-wider">Februari 2024 - Juli 2024</p>
              <p class="text-[#475569] text-sm leading-relaxed">Fokus pada pengembangan Website AI berbasis Computer Vision (YOLOv5) dan integrasi model AI ke backend Python.</p>
            </div>
          </div>
          <!-- Card 2: BPN -->
          <div class="glass-card group cursor-pointer reveal-item" @click="openModal('Frontend Developer di BPN', 'Mengembangkan antarmuka aplikasi menggunakan Vue.js dan JavaScript. Mengimplementasikan desain UI/UX menjadi komponen yang reusable dan modular. Mengelola state dan interaksi data pada frontend untuk meningkatkan pengalaman pengguna.', ['/bpn.png'])">
            <div class="relative pt-[60%] overflow-hidden bg-black/50">
              <img src="/bpn.png" loading="lazy" class="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity text-[#0f172a] hover:text-[#8b5cf6]"><i class="fas fa-search-plus"></i></div>
            </div>
            <div class="p-8 bg-gradient-to-t from-white to-transparent h-full">
              <h3 class="text-2xl font-bold mb-2">Frontend Developer</h3>
              <p class="text-[#8b5cf6] font-semibold mb-1">Badan Pertanahan Nasional</p>
              <p class="text-xs text-[#475569] mb-4 uppercase tracking-wider">Juni 2025 - Oktober 2025</p>
              <p class="text-[#475569] text-sm leading-relaxed">Mengembangkan antarmuka modular dengan Vue.js, menangani integrasi API, serta optimasi performa aplikasi.</p>
            </div>
          </div>
          <!-- Card 3: BSN -->
          <div class="glass-card group cursor-pointer reveal-item" @click="openModal('Fullstack Developer di BSN', 'Mengembangkan aplikasi web menggunakan Laravel (backend) dan Vue.js (frontend). Membangun dan mengelola REST API menggunakan Laravel untuk kebutuhan integrasi sistem. Mengelola database (MySQL) termasuk desain struktur tabel dan query.', ['/bsn.png'])">
            <div class="relative pt-[60%] overflow-hidden bg-black/50">
              <img src="/bsn.png" loading="lazy" class="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity text-[#0f172a] hover:text-[#8b5cf6]"><i class="fas fa-search-plus"></i></div>
            </div>
            <div class="p-8 bg-gradient-to-t from-white to-transparent h-full">
              <h3 class="text-2xl font-bold mb-2">Fullstack Developer</h3>
              <p class="text-[#8b5cf6] font-semibold mb-1">Badan Standardisasi Nasional</p>
              <p class="text-xs text-[#475569] mb-4 uppercase tracking-wider">November 2025 - Mei 2026</p>
              <p class="text-[#475569] text-sm leading-relaxed">Mengembangkan aplikasi web end-to-end menggunakan Laravel dan Vue.js, serta mengelola arsitektur database MySQL.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-8">
        <div class="flex flex-col items-center justify-center mb-16 gap-6">
          <h2 class="text-4xl md:text-5xl font-extrabold font-['Outfit'] text-center">Proyek <span class="text-gradient">Pilihan</span></h2>
          <div class="w-24 h-1.5 bg-gradient-premium rounded-full"></div>
        </div>
        
        <!-- Featured Projects -->
        <div v-if="featuredProjects.length > 0" class="mb-16">
          <div class="flex flex-col items-center gap-3 mb-10">
            <h3 class="text-xl font-bold text-[#8b5cf6] uppercase tracking-wider">Featured Projects</h3>
            <div class="w-12 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full"></div>
          </div>
          <div class="relative">
            <!-- Navigation Arrows -->
            <button v-if="featuredProjects.length > 1" @click="prevFeatured" class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 w-12 h-12 rounded-full bg-white border border-black/10 items-center justify-center text-[#0f172a] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button v-if="featuredProjects.length > 1" @click="nextFeatured" class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 w-12 h-12 rounded-full bg-white border border-black/10 items-center justify-center text-[#0f172a] hover:text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <i class="fas fa-chevron-right"></i>
            </button>
            
            <!-- Carousel -->
            <div class="overflow-hidden">
              <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${featuredIndex * 100}%)` }">
                <div v-for="proj in featuredProjects" :key="proj.id" class="w-full flex-shrink-0 px-4">
                  <div class="glass-card group cursor-pointer flex flex-col h-full relative max-w-4xl mx-auto reveal-on-scroll" @click="openModal(proj.title, proj.desc, proj.images)">
                    <!-- Featured badge -->
                    <div class="absolute top-4 left-4 z-20">
                      <span class="px-4 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                        <i class="fas fa-star mr-2"></i>Featured
                      </span>
                    </div>
                    <div class="relative aspect-video overflow-hidden bg-[#f1f5f9] flex items-center justify-center rounded-t-2xl">
                      <img :src="proj.images[0] || '/placeholder.png'" loading="lazy" class="absolute inset-0 w-full h-full object-cover sm:object-contain opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
                      <!-- Hover Overlay with tags -->
                      <div class="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                      
                      <div class="absolute bottom-6 left-6 right-6 flex gap-2 flex-wrap z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span v-for="tag in proj.tags" :key="tag" class="px-4 py-1.5 bg-white/80 backdrop-blur-md border border-black/5 rounded-full text-[11px] font-bold tracking-wider text-[#0f172a] shadow-lg uppercase">{{ tag }}</span>
                      </div>
                      
                      <div class="absolute top-6 right-6 w-14 h-14 rounded-full bg-[#8b5cf6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-white shadow-[0_0_25px_#8b5cf6]"><i class="fas fa-arrow-right -rotate-45 text-xl"></i></div>
                    </div>
                    <div class="p-6 md:p-10 bg-gradient-to-br from-white to-[#f1f5f9] flex-grow flex flex-col justify-between border-t border-white/5 relative overflow-hidden rounded-b-2xl">
                       <!-- Subtle glow behind text -->
                      <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#8b5cf6]/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div class="relative z-10">
                        <h3 class="text-3xl font-extrabold mb-4 font-['Outfit'] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] transition-all">{{ proj.title }}</h3>
                        <p class="text-[#475569] text-base leading-relaxed text-justify">{{ proj.desc }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Dots Navigation -->
            <div v-if="featuredProjects.length > 1" class="flex justify-center gap-3 mt-8">
              <button 
                v-for="(proj, idx) in featuredProjects" 
                :key="proj.id"
                @click="featuredIndex = idx; startFeaturedSlide()"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="idx === featuredIndex ? 'bg-[#8b5cf6] w-8' : 'bg-[#0f172a]/20 hover:bg-[#0f172a]/40'"
              ></button>
            </div>
          </div>
        </div>
        
        <!-- Regular Projects -->
        <div v-if="regularProjects.length > 0">
          <div class="flex flex-col items-center gap-3 mb-12">
            <h3 class="text-xl font-bold text-[#475569] uppercase tracking-wider">Other Projects</h3>
            <div class="w-12 h-1 bg-black/10 rounded-full"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 justify-items-center reveal-group">
            <div v-for="proj in regularProjects" :key="proj.id" class="glass-card group cursor-pointer flex flex-col h-full reveal-item" @click="openModal(proj.title, proj.desc, proj.images)">
              <div class="relative aspect-video overflow-hidden bg-[#f1f5f9] flex items-center justify-center">
                <img :src="proj.images[0] || '/placeholder.png'" loading="lazy" class="absolute inset-0 w-full h-full object-cover sm:object-contain opacity-70 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
                <!-- Hover Overlay with tags -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                <div class="absolute bottom-6 left-6 right-6 flex gap-2 flex-wrap z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span v-for="tag in proj.tags" :key="tag" class="px-4 py-1.5 bg-white/80 backdrop-blur-md border border-black/5 rounded-full text-[11px] font-bold tracking-wider text-[#0f172a] shadow-lg uppercase">{{ tag }}</span>
                </div>
                
                <div class="absolute top-6 right-6 w-14 h-14 rounded-full bg-[#8b5cf6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-white shadow-[0_0_25px_#8b5cf6]"><i class="fas fa-arrow-right -rotate-45 text-xl"></i></div>
              </div>
              <div class="p-6 md:p-10 bg-gradient-to-br from-white to-[#f1f5f9] flex-grow flex flex-col justify-between border-t border-white/5 relative overflow-hidden">
                 <!-- Subtle glow behind text -->
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#8b5cf6]/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative z-10">
                  <h3 class="text-3xl font-extrabold mb-4 font-['Outfit'] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] transition-all">{{ proj.title }}</h3>
                  <p class="text-[#475569] text-base leading-relaxed text-justify">{{ proj.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-32">
      <div class="max-w-7xl mx-auto px-8">
        <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-16 font-['Outfit']">Hubungi <span class="text-gradient">Saya</span></h2>
        <div class="max-w-xl mx-auto drop-shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <form @submit.prevent="submitForm" class="bg-white p-8 md:p-12 rounded-3xl border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative overflow-hidden reveal-group">
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-premium"></div>
            <div class="mb-6 reveal-item">
              <input v-model="contactForm.name" type="text" placeholder="Nama" required class="w-full p-4 bg-[#f8fafc] border border-black/5 rounded-xl focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all">
            </div>
            <div class="mb-6 reveal-item">
              <input v-model="contactForm.email" type="email" placeholder="Email" required class="w-full p-4 bg-[#f8fafc] border border-black/5 rounded-xl focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all">
            </div>
            <div class="mb-8 reveal-item">
              <textarea v-model="contactForm.message" rows="5" placeholder="Pesan" required class="w-full p-4 bg-[#f8fafc] border border-black/5 rounded-xl focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"></textarea>
            </div>
            <div class="reveal-item">
              <button type="submit" :disabled="isSubmitting" class="w-full font-['Outfit'] font-bold text-lg p-4 rounded-xl text-white bg-gradient-premium shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all disabled:opacity-70 disabled:hover:translate-y-0 relative z-10 overflow-hidden group">
                <span class="relative z-10">{{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}</span>
                <div class="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#ec4899] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              </button>
            </div>
          </form>

          <!-- Floating Toast Notification for Contact -->
          <transition name="toast">
            <div v-if="contactSuccess" class="fixed top-10 right-10 z-[3000] flex items-center gap-4 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white px-8 py-5 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.5)] border border-white/20 backdrop-blur-md">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
                <i class="fas fa-paper-plane text-sm"></i>
              </div>
              <div>
                <p class="font-bold text-lg">Pesan Terkirim!</p>
                <p class="text-white/80 text-sm">Terima kasih atas pesan Anda.</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-black/5 bg-white text-center">
      <div class="max-w-7xl mx-auto px-8">
        <p class="text-[#475569] mb-6">&copy; 2026 REZA. Hak Cipta Dilindungi.</p>
        <div class="flex justify-center gap-6">
          <a href="https://github.com/reza-programer" target="_blank" rel="noopener noreferrer" class="w-12 h-12 flex items-center justify-center rounded-full bg-[#f8fafc] border border-black/5 text-[#475569] hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6] hover:-translate-y-1 shadow-lg transition-all text-xl"><i class="fab fa-github"></i></a>
          <a href="#" class="w-12 h-12 flex items-center justify-center rounded-full bg-[#f8fafc] border border-black/5 text-[#475569] hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6] hover:-translate-y-1 shadow-lg transition-all text-xl"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="w-12 h-12 flex items-center justify-center rounded-full bg-[#f8fafc] border border-black/5 text-[#475569] hover:text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6] hover:-translate-y-1 shadow-lg transition-all text-xl"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </footer>

    <!-- Modal Lightbox -->
    <transition name="modal-fade">
      <div v-if="modal.show" class="fixed inset-0 z-[2000] bg-white/90 backdrop-blur-xl p-4 md:p-8 overflow-y-auto w-full h-full flex items-start justify-center md:items-center py-10" @click.self="closeModal">
        <!-- Modern Floating Close Button (Fixed so it doesn't scroll away) -->
        <button class="fixed top-4 right-4 z-[2001] w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-[#0f172a] hover:text-[#ec4899] hover:scale-110 active:scale-95 transition-all shadow-lg border border-black/10 focus:outline-none" @click="closeModal">
          <i class="fas fa-times text-lg"></i>
        </button>
        
        <div class="modal-content-scale bg-white border border-black/5 rounded-3xl overflow-hidden w-full max-w-6xl md:w-[95vw] shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative mt-16 md:mt-0 flex flex-col md:flex-row min-h-[50vh] md:min-h-[70vh]">
          <!-- Image Section -->
          <div class="relative bg-[#f1f5f9] md:w-2/3 flex justify-center items-center h-[35vh] sm:h-[45vh] md:h-auto overflow-hidden group">
            <button v-if="modal.images.length > 1" @click.stop="prevImg" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md border border-black/5 rounded-full text-[#0f172a] hover:bg-[#8b5cf6] hover:text-white hover:scale-110 transition-all flex items-center justify-center z-20 shadow-lg md:opacity-0 md:group-hover:opacity-100"><i class="fas fa-chevron-left text-base md:text-lg"></i></button>
            <transition name="image-fade" mode="out-in">
              <img :key="modal.currentIndex" :src="modal.images[modal.currentIndex]" class="w-full h-full object-contain p-2 sm:p-6 md:p-8 transform transition-transform duration-700 ease-out hover:scale-[1.02]" />
            </transition>
            <button v-if="modal.images.length > 1" @click.stop="nextImg" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md border border-black/5 rounded-full text-[#0f172a] hover:bg-[#8b5cf6] hover:text-white hover:scale-110 transition-all flex items-center justify-center z-20 shadow-lg md:opacity-0 md:group-hover:opacity-100"><i class="fas fa-chevron-right text-base md:text-lg"></i></button>
          </div>
          <!-- Info Section -->
          <div class="md:w-1/3 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-center relative bg-white border-t md:border-t-0 md:border-l border-black/5">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-[#8b5cf6]/10 blur-3xl rounded-full pointer-events-none"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ec4899]/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 md:mb-6 font-['Outfit'] bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">{{ modal.title }}</h3>
            <p class="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed text-justify">{{ modal.desc }}</p>
            
            <div v-if="modal.images.length > 1" class="flex gap-2.5 mt-6 sm:mt-8 md:mt-12 justify-start">
              <div 
                v-for="(img, idx) in modal.images" 
                :key="idx" 
                @click="setImg(idx)"
                class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300"
                :class="idx === modal.currentIndex ? 'bg-[#8b5cf6] w-6 sm:w-8' : 'bg-slate-200 hover:bg-slate-300'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    </div> <!-- End Portfolio Layout -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed, defineAsyncComponent, nextTick } from 'vue'
const Admin = defineAsyncComponent(() => import('./Admin.vue'))
import IdCard from './IdCard.vue'
import { projects, messages } from './data.js'

const currentRoute = ref(window.location.hash)

watch(currentRoute, (newVal) => {
  if (newVal !== window.location.hash) {
    window.location.hash = newVal
  }
  if (newVal !== '#admin') {
    nextTick(() => {
      window.scrollTo(0, 0)
      setupScrollObserver()
    })
  }
})

window.addEventListener('hashchange', () => {
  currentRoute.value = window.location.hash
})

const isLoading = ref(true)
const typedName = ref('')
const fullName = "Mohamad Reza Nurpadilah"
const isScrolled = ref(false)
const isSubmitting = ref(false)
const contactSuccess = ref(false)
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})
const isMenuOpen = ref(false)

const startTypingEffect = () => {
  let i = 0
  typedName.value = ''
  const timer = setInterval(() => {
    if (i < fullName.length) {
      typedName.value += fullName.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  }, 100)
}

const modal = ref({
  show: false,
  title: '',
  desc: '',
  images: [],
  currentIndex: 0
})

const featuredProjects = computed(() => {
  return projects.value.filter(p => p.featured)
})

const regularProjects = computed(() => {
  return projects.value.filter(p => !p.featured)
})

const featuredIndex = ref(0)
let featuredSlideInterval = null

const startFeaturedSlide = () => {
  if (featuredSlideInterval) clearInterval(featuredSlideInterval)
  featuredSlideInterval = setInterval(() => {
    if (featuredProjects.value.length > 1) {
      featuredIndex.value = (featuredIndex.value + 1) % featuredProjects.value.length
    }
  }, 5000)
}

const nextFeatured = () => {
  featuredIndex.value = (featuredIndex.value + 1) % featuredProjects.value.length
  startFeaturedSlide()
}

const prevFeatured = () => {
  featuredIndex.value = (featuredIndex.value - 1 + featuredProjects.value.length) % featuredProjects.value.length
  startFeaturedSlide()
}

watch(featuredProjects, () => {
  featuredIndex.value = 0
  startFeaturedSlide()
})

onMounted(() => {
  startFeaturedSlide()
})

onUnmounted(() => {
  if (featuredSlideInterval) clearInterval(featuredSlideInterval)
})

let slideInterval = null

const startSlideShow = () => {
  if (slideInterval) clearInterval(slideInterval)
  slideInterval = setInterval(() => {
    if (modal.value.show && modal.value.images.length > 1) {
      modal.value.currentIndex = (modal.value.currentIndex + 1) % modal.value.images.length
    }
  }, 4000)
}

const pauseSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

let scrollObserver = null

const setupScrollObserver = () => {
  if (scrollObserver) {
    scrollObserver.disconnect()
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('reveal-group')) {
          const items = entry.target.querySelectorAll('.reveal-item')
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('revealed')
            }, index * 100) // 100ms delay between items
          })
          entry.target.classList.add('revealed')
          scrollObserver.unobserve(entry.target)
        } else {
          entry.target.classList.add('revealed')
          scrollObserver.unobserve(entry.target)
        }
      }
    })
  }, { threshold: 0.1 })

  // Observe all sections and reveal groups and individual reveal-on-scroll items
  document.querySelectorAll('section, .reveal-group, .reveal-on-scroll').forEach(el => {
    if (!el.classList.contains('reveal-group') && !el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll')
    }
    // Only observe if not already revealed
    if (!el.classList.contains('revealed')) {
      scrollObserver.observe(el)
    }
  })
}

watch(projects, () => {
  nextTick(() => {
    setupScrollObserver()
  })
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Fake delay for elegant loading - shortened to 1s for snappier feel
  setTimeout(() => {
    isLoading.value = false
    setTimeout(startTypingEffect, 600) // Start typing after name line fades up
  }, 1000)

  nextTick(() => {
    setupScrollObserver()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollObserver) scrollObserver.disconnect()
  pauseSlideShow()
})

const submitForm = () => {
  isSubmitting.value = true
  // Simulate API call
  setTimeout(() => {
    // Save message to global state
    messages.value.push({
      id: Date.now(),
      ...contactForm.value,
      date: new Date().toLocaleString('id-ID'),
      status: 'unread'
    })

    isSubmitting.value = false
    contactSuccess.value = true
    
    // Clear form
    contactForm.value = {
      name: '',
      email: '',
      message: ''
    }
    
    // Hide notification after 4 seconds
    setTimeout(() => {
      contactSuccess.value = false
    }, 4000)
  }, 1500)
}

const openModal = (title, desc, images) => {
  modal.value = {
    show: true,
    title,
    desc,
    images: images || [],
    currentIndex: 0
  }
  document.body.style.overflow = 'hidden'
  startSlideShow()
}

const closeModal = () => {
  modal.value.show = false
  document.body.style.overflow = 'auto'
  pauseSlideShow()
}

const prevImg = () => {
  if (modal.value.images.length > 0) {
    const len = modal.value.images.length
    modal.value.currentIndex = (modal.value.currentIndex - 1 + len) % len
    startSlideShow()
  }
}

const nextImg = () => {
  if (modal.value.images.length > 0) {
    modal.value.currentIndex = (modal.value.currentIndex + 1) % modal.value.images.length
    startSlideShow()
  }
}

const setImg = (idx) => {
  modal.value.currentIndex = idx
  startSlideShow()
}
</script>

<style>
/* Any required generic animations not in tailwind config */
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(100px, 50px) scale(1.2); }
}

@keyframes morph {
  0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
  100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
}

.animate-fade-up {
  animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link {
  @apply text-[#475569] font-medium relative hover:text-[#0f172a] transition-colors duration-300;
}
.nav-link::after {
  content: '';
  @apply absolute -bottom-1 left-1/2 right-1/2 h-[2px] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] transition-all duration-300 ease-out;
}
.nav-link:hover::after {
  @apply left-0 right-0;
}

html {
  scroll-behavior: smooth;
}

/* Modal and Image Transitions */
.preloader-enter-active,
.preloader-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.preloader-enter-from,
.preloader-leave-to {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(10px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-content-scale,
.modal-fade-leave-active .modal-content-scale {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from .modal-content-scale,
.modal-fade-leave-to .modal-content-scale {
  transform: scale(0.9) translateY(30px);
  opacity: 0;
}

.image-fade-enter-active,
.image-fade-leave-active {
  transition: all 0.3s ease;
}
.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
  filter: blur(4px);
}

/* Scroll Reveal Base Styles */
.reveal-on-scroll, .reveal-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.revealed, .reveal-item.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Toast Notification Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>

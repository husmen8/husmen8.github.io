/* =========================================
   1. LANGUAGE TOGGLE
   ========================================= */
   let currentLang = 'en';

   function toggleLanguage() {
       currentLang = currentLang === 'en' ? 'jp' : 'en';
       const elements = document.querySelectorAll('[data-en]');
       elements.forEach(el => {
           if (el.children.length > 0 || el.innerHTML.includes('<')) {
               el.innerHTML = el.getAttribute(`data-${currentLang}`);
           } else {
               el.textContent = el.getAttribute(`data-${currentLang}`);
           }
       });
       const btn = document.getElementById('lang-btn');
       if(btn) btn.textContent = currentLang === 'en' ? '[ EN / JP ]' : '[ JP / EN ]';
   }
   
   /* =========================================
      2. PARTICLE SYSTEM
      ========================================= */
   const canvas = document.getElementById('canvas');
   if (canvas) {
       const ctx = canvas.getContext('2d');
       function resizeCanvas() {
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;
       }
       window.addEventListener('resize', resizeCanvas);
       resizeCanvas();
   
       const particles = [];
       const particleCount = 40;
   
       class Particle {
           constructor() { this.reset(); }
           reset() {
               this.x = Math.random() * canvas.width;
               this.y = Math.random() * canvas.height;
               this.size = Math.random() * 2;
               this.speedY = Math.random() * 0.5 + 0.1;
               this.color = '223, 129, 24'; // Turuncu
               this.alpha = Math.random() * 0.5 + 0.1;
           }
           update() {
               this.y -= this.speedY; 
               if (this.y < 0) {
                   this.y = canvas.height;
                   this.x = Math.random() * canvas.width;
               }
           }
           draw() {
               ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
               ctx.beginPath();
               ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
               ctx.fill();
           }
       }
   
       for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }
       
       function animate() {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           for (let i = 0; i < particles.length; i++) {
               particles[i].update();
               particles[i].draw();
           }
           requestAnimationFrame(animate);
       }
       animate();
   }
   
   /* =========================================
      3. PROJECT DATA
      ========================================= */
   const projects = [
       {
           title: "Real-Time Dense SLAM",
           role: "Graduation Thesis",
           description: "Built a pipeline to capture RGB-D data from a stereo camera and feed it into a Gaussian Splatting training loop in real-time. Optimized rendering for NVIDIA Jetson Orin Nano edge devices.",
           technologies: ["Python", "ROS 2", "CUDA", "Docker", "NVIDIA Jetson"],
           link: "https://github.com/husmen8/Gaussian-SLAM",
           image: "photos/myexpwith_gs-slam.png",
           gif: "photos/gaussian_slam.gif" 
       },
       {
           title: "DiffCV Quest",
           role: "Solo Developer",
           description: "A gamified computer vision education project. Designed interactive levels to visualize concepts like edge detection and thresholding using game mechanics.",
           technologies: ["Godot Engine", "GDScript", "Python", "OpenCV"],
           link: "https://github.com/husmen8/Godot_Diff_CV",
           image: "photos/godot-cv/full_scene.png",
           slideshow: [
               "photos/godot-cv/background_only.png",
               "photos/godot-cv/full_scene.png",
               "photos/godot-cv/differences_marked.png"
           ]
       },
       {
           title: "3D Asset Tools",
           role: "Technical Artist",
           description: "Developed parametric tools using Blender Geometry Nodes to automate asset creation. Created a 'Wall Generator' and procedural Rock/Wood texture alpha generators.",
           technologies: ["Blender", "Geometry Nodes", "Unity", "ZBrush"],
           link: "#",
           image: "",
           gif: ""
       },
       
       {
           title: "Auto-Agri Rover",
           role: "Software Developer",
           description: "Contributed to SLAM-based 3D mapping and system integration using ROS 2. Integrated motor control and sensor interfacing for an autonomous ground vehicle.",
           technologies: ["ROS 2", "C++", "SLAM", "Robotics"],
           link: "photos/poster.png",
           image: "photos/solid_rover.png",
           gif: ""
       }
   ];
   
   const container = document.getElementById('projects-container');
   
   if (container) {
       projects.forEach((project) => {
           const row = document.createElement('div');
           row.className = 'project-row'; 
   
           let imageHTML = project.image 
               ? `<img src="${project.image}" alt="${project.title}" class="project-img">` 
               : `<span class="placeholder-text">Coming Soon</span>`;
   
           const tags = project.technologies.map(t => `<span>#${t}</span>`).join('');
   
           row.innerHTML = `
               <div class="project-image-box">${imageHTML}</div>
               <div class="project-content">
                   <h2 class="project-title">${project.title}</h2>
                   <span class="project-role">${project.role}</span>
                   <p class="project-desc">${project.description}</p>
                   <div class="tech-tags">${tags}</div>
                   <a href="${project.link}" class="view-btn" target="_blank">VIEW DETAILS →</a>
               </div>
           `;
           
           const imgElement = row.querySelector('.project-img');

           // --- GIF MANTIĞI ---
           if (project.gif && imgElement) {
               row.addEventListener('mouseenter', () => { imgElement.src = project.gif; });
               row.addEventListener('mouseleave', () => { imgElement.src = project.image; });
           }

           // --- SLIDESHOW MANTIĞI (Yumuşak Geçişli) ---
           if (project.slideshow && project.slideshow.length > 0 && imgElement) {
               let interval;
               let slideIndex = 0;

               row.addEventListener('mouseenter', () => {
                   // Hemen döngüyü başlat
                   interval = setInterval(() => {
                       // 1. Önce resmi görünmez yap (Fade Out)
                       imgElement.style.opacity = 0;

                       // 2. CSS geçiş süresi (0.5s) kadar bekle, sonra resmi değiştir
                       setTimeout(() => {
                           slideIndex = (slideIndex + 1) % project.slideshow.length;
                           imgElement.src = project.slideshow[slideIndex];
                           
                           // 3. Resmi tekrar görünür yap (Fade In)
                           imgElement.style.opacity = 1;
                       }, 500); // 500ms CSS'teki transition süresiyle aynı olmalı

                   }, 2000); // 2000ms = 2s
               });

               row.addEventListener('mouseleave', () => {
                   clearInterval(interval);
                   imgElement.style.opacity = 1; // Her ihtimale karşı görünür yap
                   imgElement.src = project.image; // Ana resme dön
                   slideIndex = 0;
               });
           }

           container.appendChild(row);
       });
   }

   /* =========================================
      4. LIGHTBOX GALLERY LOGIC
      ========================================= */
   const lightbox = document.getElementById('lightbox');
   const lightboxImg = document.getElementById('lightbox-img');
   const lightboxCaption = document.getElementById('lightbox-caption');
   let galleryImages = [];
   let currentImageIndex = 0;

   document.addEventListener('DOMContentLoaded', () => {
       const items = document.querySelectorAll('.gallery-item img');
       items.forEach((img, index) => {
           img.style.cursor = 'pointer';
           img.addEventListener('click', () => { openLightbox(index); });
           const captionText = img.nextElementSibling ? img.nextElementSibling.innerText : '';
           galleryImages.push({ src: img.src, caption: captionText });
       });
   });

   function openLightbox(index) {
       currentImageIndex = index;
       updateLightboxImage();
       lightbox.style.display = "flex";
   }

   function closeLightbox() {
       lightbox.style.display = "none";
   }

   function changeSlide(n) {
       currentImageIndex += n;
       if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
       else if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
       updateLightboxImage();
   }

   function updateLightboxImage() {
       const imgData = galleryImages[currentImageIndex];
       lightboxImg.src = imgData.src;
       lightboxCaption.innerText = imgData.caption;
   }

   document.addEventListener('keydown', (e) => {
       if (lightbox.style.display === "flex") {
           if (e.key === "Escape") closeLightbox();
           if (e.key === "ArrowRight") changeSlide(1);
           if (e.key === "ArrowLeft") changeSlide(-1);
       }
   });
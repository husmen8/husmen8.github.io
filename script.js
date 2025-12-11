// --- DİL DEĞİŞTİRME ---
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'jp' : 'en';
    
    // Data-en ve Data-jp olan her elementi bul ve değiştir
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(el => {
        // Eğer içinde HTML tag varsa innerHTML kullan, yoksa textContent
        if (el.children.length > 0 || el.innerHTML.includes('<')) {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        } else {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        }
    });

    // Buton metnini güncelle
    const btn = document.getElementById('lang-btn');
    if(btn) btn.textContent = currentLang === 'en' ? '[ EN / JP ]' : '[ JP / EN ]';
}

// --- PROJE DATASI ---
const projects = [
    {
        title: "Real-Time Dense SLAM",
        role: "Graduation Thesis",
        description: "Built a pipeline to capture RGB-D data from a stereo camera and feed it into a Gaussian Splatting training loop in real-time. Optimized rendering for NVIDIA Jetson Orin Nano edge devices.",
        technologies: ["Python", "ROS 2", "CUDA", "Docker", "NVIDIA Jetson"],
        link: "#",
        image: "photos/myexpwith_gs-slam.png" 
    },
    {
        title: "DiffCV Quest",
        role: "Solo Developer",
        description: "A gamified computer vision education project. Designed interactive levels to visualize concepts like edge detection and thresholding using game mechanics.",
        technologies: ["Godot Engine", "GDScript", "Python", "OpenCV"],
        link: "#",
        image: ""
    },
    {
        title: "3D Asset Tools",
        role: "Technical Artist",
        description: "Developed parametric tools using Blender Geometry Nodes to automate asset creation. Created a 'Wall Generator' and procedural Rock/Wood texture alpha generators.",
        technologies: ["Blender", "Geometry Nodes", "Unity", "ZBrush"],
        link: "#",
        image: ""
    },
    {
        title: "Auto-Agri Rover",
        role: "Software Developer",
        description: "Contributed to SLAM-based 3D mapping and system integration using ROS 2. Integrated motor control and sensor interfacing for an autonomous ground vehicle.",
        technologies: ["ROS 2", "C++", "SLAM", "Robotics"],
        link: "#",
        image: ""
    }
];

// PROJELERİ LİSTELEME
const container = document.getElementById('projects-container');

if (container) {
    projects.forEach((project, index) => {
        const row = document.createElement('div');
        row.className = 'project-row';
        
        row.setAttribute('data-index', index + 1);

        let imageHTML = '';
        if (project.image) {
            imageHTML = `<img src="${project.image}" alt="${project.title}">`;
        } else {
            imageHTML = `<span class="placeholder-text">NO SIGNAL</span>`;
        }

        const tags = project.technologies.map(t => `<span>${t}</span>`).join('');

        row.innerHTML = `
            <div class="project-image-box">
                ${imageHTML}
            </div>
            <div class="project-info-box">
                <div>
                    <h2 class="project-title">${project.title}</h2>
                    <span class="project-role">/// ${project.role}</span>
                    <p class="project-desc">${project.description}</p>
                </div>
                <div>
                    <div class="tech-tags">${tags}</div>
                    <a href="${project.link}" class="project-link-btn" target="_blank">INITIALIZE_PROJECT_VIEW()</a>
                </div>
            </div>
        `;

        container.appendChild(row);
    });
}
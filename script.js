// --- LANGUAGE TOGGLE ---
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

// --- PROJECT DATA ---
const projects = [
    {
        title: "Real-Time Dense SLAM",
        role: "Graduation Thesis",
        description: "Built a pipeline to capture RGB-D data from a stereo camera and feed it into a Gaussian Splatting training loop in real-time. Optimized rendering for NVIDIA Jetson Orin Nano edge devices.",
        technologies: ["Python", "ROS 2", "CUDA", "Docker", "NVIDIA Jetson"],
        link: "https://github.com/husmen8/Gaussian-SLAM",
        // Resim Yolu Düzeltildi
        image: "photos/myexpwith_gs-slam.png" 
    },
    {
        title: "DiffCV Quest",
        role: "Solo Developer",
        description: "A gamified computer vision education project. Designed interactive levels to visualize concepts like edge detection and thresholding using game mechanics.",
        technologies: ["Godot Engine", "GDScript", "Python", "OpenCV"],
        link: "#",
        image: "" // Başka resim varsa "photos/ad.png" olarak ekle
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

// RENDER LOGIC
const container = document.getElementById('projects-container');

if (container) {
    projects.forEach((project, index) => {
        const row = document.createElement('div');
        row.className = 'project-row';

        let imageHTML = '';
        if (project.image) {
            imageHTML = `<img src="${project.image}" alt="${project.title}">`;
        } else {
            imageHTML = `<span class="placeholder-text" style="font-family:'Archivo Black'; text-transform:uppercase; color:#ccc;">NO IMAGE</span>`;
        }

        const tags = project.technologies.map(t => `<span>#${t}</span>`).join('');

        row.innerHTML = `
            <div class="project-image-box">
                ${imageHTML}
            </div>
            <div class="project-content">
                <h2 class="project-title">${project.title}</h2>
                <span class="project-role">${project.role}</span>
                <p class="project-desc">${project.description}</p>
                <div class="tech-tags">${tags}</div>
                <a href="${project.link}" class="view-btn" target="_blank">VIEW DETAILS →</a>
            </div>
        `;

        container.appendChild(row);
    });
}
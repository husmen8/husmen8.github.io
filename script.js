const projects = [
    {
        title: "Real-Time Dense SLAM with 3D Gaussian Splatting",
        role: "Graduation Thesis",
        description: "Built a pipeline to capture RGB-D data from a stereo camera and feed it into a Gaussian Splatting training loop in real-time. Optimized rendering for NVIDIA Jetson Orin Nano edge devices.",
        technologies: ["Python", "ROS 2", "CUDA", "Docker", "NVIDIA Jetson"],
        link: "#",
        image: "" // Örn: "slam.jpg"
    },
    {
        title: "DiffCV Quest",
        role: "Solo Developer",
        description: "A gamified computer vision education project. Designed interactive levels to visualize concepts like edge detection and thresholding using game mechanics in Godot Engine.",
        technologies: ["Godot Engine", "GDScript", "Python", "OpenCV"],
        link: "#",
        image: ""
    },
    {
        title: "3D Asset Pipeline Tools",
        role: "Indie Project",
        description: "Developed parametric tools using Blender Geometry Nodes to automate asset creation. Created a 'Wall Generator' and procedural Rock/Wood texture alpha generators.",
        technologies: ["Blender", "Geometry Nodes", "Unity", "ZBrush"],
        link: "#",
        image: ""
    },
    {
        title: "Autonomous Agricultural Rover",
        role: "Software Developer",
        description: "Contributed to SLAM-based 3D mapping and system integration using ROS 2. Integrated motor control and sensor interfacing for an autonomous ground vehicle.",
        technologies: ["ROS 2", "C++", "SLAM", "Robotics"],
        link: "#",
        image: ""
    }
];

// Sayfaya yazdırma kodu
const container = document.getElementById('projects-container');

if (container) {
    projects.forEach(project => {
        const row = document.createElement('div');
        row.className = 'project-row';

        let imageHTML = '';
        if (project.image) {
            imageHTML = `<img src="${project.image}" alt="${project.title}">`;
        } else {
            imageHTML = `<span class="placeholder-text">Project Image Placeholder</span>`;
        }

        const tags = project.technologies.map(t => `<span>#${t}</span>`).join('');

        row.innerHTML = `
            <div class="project-image-box">
                ${imageHTML}
            </div>
            <div class="project-info-box">
                <h2 class="project-title">${project.title}</h2>
                <span class="project-role">${project.role}</span>
                <p class="project-desc">${project.description}</p>
                <div class="tech-tags">${tags}</div>
                <a href="${project.link}" class="project-link-btn" target="_blank">View Details →</a>
            </div>
        `;

        container.appendChild(row);
    });
}
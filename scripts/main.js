// Initialize the application
function init() {
    // Initialize the main scene
    initScene();
    
    // Add lighting
    addLighting();
    
    // Create the main robot
    const robot = createRobot();
    
    // Initialize interaction
    initInteraction();
    
    // Initialize camera animation
    initCameraAnimation();
    
    // Initialize product viewers
    initProductViewers();
    
    // Add dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            scene.background = new THREE.Color(0x1a1a1a);
            darkModeToggle.textContent = '☀️';
        } else {
            scene.background = new THREE.Color(0xf5f7fa);
            darkModeToggle.textContent = '🌙';
        }
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        document.querySelector('#products').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Initialize product viewers
function initProductViewers() {
    const viewers = [
        { id: 'robot-viewer', create: window.createRobotToy, adjust: true },
        { id: 'teddy-viewer', create: window.createTeddyBearToy },
        { id: 'butterfly-viewer', create: window.createButterflyToy },
        { id: 'lego-viewer', create: window.createLegoBotToy },
        { id: 'dino-viewer', create: window.createDinoBotToy }
    ];
    viewers.forEach(({ id, create, adjust }) => {
        const container = document.getElementById(id);
        if (!container || typeof create !== 'function') return;
        container.innerHTML = '';
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f7fa);
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        camera.position.set(0, 1.2, 5.5);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0xf5f7fa, 1);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        // Toy
        const toy = create();
        if (adjust) {
            toy.position.set(0, -0.4, 0); // Lower the robot toy
        } else {
            toy.position.set(0, 0.45, 0);
        }
        toy.scale.set(1.3, 1.3, 1.3);
        scene.add(toy);
        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        controls.minDistance = 2.2;
        controls.maxDistance = 8;
        controls.target.set(0, 1, 0);
        controls.update();
        // Render loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
        // Responsive
        window.addEventListener('resize', () => {
            const aspect = container.clientWidth / container.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    });
}

// Minimal 3D viewer for the home screen (viewer-container)
function initHomeViewer() {
    const container = document.getElementById('viewer-container');
    if (!container || typeof window.createRobotToy !== 'function') return;
    container.innerHTML = '';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fa);
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.set(0, 1.2, 5.5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xf5f7fa, 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    // Toy (robot)
    const toy = window.createRobotToy();
    toy.position.set(0, -1, 0); // Lower the robot toy even more
    toy.scale.set(1.5, 1.5, 1.5);
    scene.add(toy);
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minDistance = 2.2;
    controls.maxDistance = 8;
    controls.target.set(0, 1, 0);
    controls.update();
    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    // Responsive
    window.addEventListener('resize', () => {
        const aspect = container.clientWidth / container.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Start the application when the window loads
window.addEventListener('load', () => {
    initHomeViewer();
    initProductViewers();
}); 
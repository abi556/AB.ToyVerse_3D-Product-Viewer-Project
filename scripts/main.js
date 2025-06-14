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
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            document.body.classList.add('light-mode');
            darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
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

// Rocket Toy
function createRocketToy() {
    const rocket = new THREE.Group();
    // Body
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.2, 32), bodyMaterial);
    rocket.add(body);
    // Nose cone
    const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xff3c00, metalness: 0.4, roughness: 0.3 });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.4, 32), coneMaterial);
    cone.position.y = 0.8;
    rocket.add(cone);
    // Fins
    const finMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 0.4, roughness: 0.3 });
    for (let i = 0; i < 3; i++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.25, 0.2), finMaterial);
        fin.position.set(Math.cos(i * 2 * Math.PI / 3) * 0.22, -0.6, Math.sin(i * 2 * Math.PI / 3) * 0.22);
        fin.rotation.y = i * 2 * Math.PI / 3;
        rocket.add(fin);
    }
    // Window
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.6, roughness: 0.2 });
    const windowMesh = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), windowMaterial);
    windowMesh.position.set(0, 0.3, 0.23);
    rocket.add(windowMesh);
    return rocket;
}

// Car Toy
function createCarToy() {
    const car = new THREE.Group();
    // Body
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.3, roughness: 0.5 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 0.4), bodyMaterial);
    body.position.y = 0.2;
    car.add(body);
    // Cabin
    const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x2222ff, metalness: 0.3, roughness: 0.5 });
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.35), cabinMaterial);
    cabin.position.set(0, 0.35, 0);
    car.add(cabin);
    // Wheels
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.3 });
    for (let i = -1; i <= 1; i += 2) {
        for (let j = -1; j <= 1; j += 2) {
            const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.18, 24), wheelMaterial);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(0.28 * i, 0.08, 0.18 * j);
            car.add(wheel);
        }
    }
    return car;
}

// House Toy
function createHouseToy() {
    const house = new THREE.Group();
    // Base
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xf5c16c, metalness: 0.2, roughness: 0.7 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.8), baseMaterial);
    base.position.y = 0.25;
    house.add(base);
    // Roof
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xc0392b, metalness: 0.3, roughness: 0.5 });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.4, 4), roofMaterial);
    roof.position.y = 0.7;
    roof.rotation.y = Math.PI / 4;
    house.add(roof);
    // Chimney
    const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3, roughness: 0.6 });
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.22, 0.13), chimneyMaterial);
    chimney.position.set(0.22, 0.75, -0.18);
    house.add(chimney);
    return house;
}

// Initialize product viewers
function initProductViewers() {
    const viewers = [
        { id: 'robot-viewer', create: createRobot, adjust: true },
        { id: 'teddy-viewer', create: window.createTeddyBearToy, adjust: true },
        { id: 'butterfly-viewer', create: createRocketToy },
        { id: 'lego-viewer', create: createCarToy },
        { id: 'dino-viewer', create: window.createDinoBotToy },
        { id: 'house-viewer', create: createHouseToy }
    ];

    viewers.forEach(({ id, create, adjust }) => {
        const container = document.getElementById(id);
        if (!container || typeof create !== 'function') return;
        const canvasContainer = container.querySelector('.product-canvas');
        if (!canvasContainer) return;
        canvasContainer.innerHTML = '';
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf5f7fa);
        const aspect = canvasContainer.clientWidth / canvasContainer.clientHeight || 1.36;
        const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        if (id === 'robot-viewer') {
            camera.position.set(0, 1, 4);
        } else if (id === 'lego-viewer') {
            camera.position.set(0, 0.4, 1.4);
        } else {
            camera.position.set(0, 1.2, 5.5);
        }
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(0xf5f7fa, 1);
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        canvasContainer.appendChild(renderer.domElement);
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.1);
        mainLight.position.set(5, 10, 5);
        mainLight.castShadow = true;
        scene.add(mainLight);
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 5, -5);
        scene.add(fillLight);
        // Toy
        const toy = create();
        if (id === 'robot-viewer') {
            toy.position.set(0, -0.7, 0);
            toy.rotation.set(0, 0, 0);
            toy.scale.set(1.2, 1.2, 1.2);
        } else if (id === 'lego-viewer') {
            toy.position.set(0, 0, 0);
            toy.scale.set(1.5, 1.5, 1.5);
        } else if (id === 'dino-viewer') {
            toy.position.set(0, 1, 0);
            toy.scale.set(1.95, 1.95, 1.95);
        } else if (id === 'butterfly-viewer') {
            toy.position.set(0, 0.75, 0);
            toy.scale.set(2.4, 2.4, 2.4);
        } else if (id === 'house-viewer') {
            toy.position.set(0, -0.5, 0);
            toy.scale.set(3.5, 3.5, 3.5);
        } else if (adjust) {
            toy.position.set(0, 0.35, 0);
            toy.scale.set(1.5, 1.5, 1.5);
        } else {
            toy.position.set(0, 0.45, 0);
            toy.scale.set(1.3, 1.3, 1.3);
        }
        scene.add(toy);
        // Controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        if (id === 'robot-viewer') {
            controls.minDistance = 1.5;
            controls.maxDistance = 8;
            controls.target.set(0, 1, 0);
        } else if (id === 'lego-viewer') {
            controls.minDistance = 0.8;
            controls.maxDistance = 3;
            controls.target.set(0, 0.25, 0);
        } else if (id === 'dino-viewer') {
            controls.minDistance = 2.2;
            controls.maxDistance = 8;
            controls.target.set(0, 1.2, 0);
        } else {
            controls.minDistance = 2.2;
            controls.maxDistance = 8;
            controls.target.set(0, 1, 0);
        }
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
            const aspect = canvasContainer.clientWidth / canvasContainer.clientHeight || 1.36;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        });
    });
}

// Minimal 3D viewer for the home screen (viewer-container)
function initHomeViewer() {
    const container = document.getElementById('viewer-container');
    if (!container || typeof createRobot !== 'function') return;
    container.innerHTML = '';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fa);
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.set(0, 1, 4);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0xf5f7fa, 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.1);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);
    // Toy (robot)
    const toy = createRobot();
    toy.position.set(0, 0, 0);
    toy.rotation.set(0, 0, 0);
    toy.scale.set(0.8, 0.8, 0.8);
    scene.add(toy);
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minDistance = 1.5;
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
    // Set dark mode as default
    document.body.classList.remove('light-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
    init();
    initHomeViewer();
    initProductViewers();
});

// Ensure this runs after DOM and product viewers are rendered
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initProductActions, 500); // Delay to ensure all viewers are rendered
});

// Move this function to the global scope
function initProductActions() {
    const grid = document.querySelector('.product-viewer-grid');
    const productViewers = document.querySelectorAll('.product-viewer');
    const filterAll = document.getElementById('filter-all');
    const filterLiked = document.getElementById('filter-liked');
    const filterBookmarked = document.getElementById('filter-bookmarked');
    const filterBtns = [filterAll, filterLiked, filterBookmarked];

    // Event delegation for like/save buttons
    grid.addEventListener('click', function(e) {
        // Like button
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn && grid.contains(likeBtn)) {
            likeBtn.classList.toggle('active');
            const isActive = likeBtn.classList.contains('active');
            likeBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            const viewer = likeBtn.closest('.product-viewer');
            if (viewer) {
                viewer.setAttribute('data-liked', isActive ? 'true' : 'false');
            }
        }
        // Save button
        const saveBtn = e.target.closest('.save-btn');
        if (saveBtn && grid.contains(saveBtn)) {
            saveBtn.classList.toggle('active');
            const isActive = saveBtn.classList.contains('active');
            saveBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            const viewer = saveBtn.closest('.product-viewer');
            if (viewer) {
                viewer.setAttribute('data-saved', isActive ? 'true' : 'false');
            }
        }
    });

    // Filter logic
    function setActive(btn) {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    filterAll.addEventListener('click', () => {
        setActive(filterAll);
        productViewers.forEach(v => v.style.display = '');
    });
    filterLiked.addEventListener('click', () => {
        setActive(filterLiked);
        productViewers.forEach(v => {
            v.style.display = v.getAttribute('data-liked') === 'true' ? '' : 'none';
        });
    });
    filterBookmarked.addEventListener('click', () => {
        setActive(filterBookmarked);
        productViewers.forEach(v => {
            v.style.display = v.getAttribute('data-saved') === 'true' ? '' : 'none';
        });
    });
} 
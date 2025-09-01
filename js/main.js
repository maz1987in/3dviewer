import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/OBJLoader.js';
import { STLLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/STLLoader.js';

class ThreeDViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        this.wireframe = false;
        
        this.init();
        this.loadFileList();
    }
    
    init() {
        const canvas = document.getElementById('3d-canvas');
        if (!canvas) return;
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Controls
        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        document.getElementById('reset-view')?.addEventListener('click', () => this.resetView());
        document.getElementById('wireframe-toggle')?.addEventListener('click', () => this.toggleWireframe());
        
        this.animate();
    }
    
    async loadFileList() {
        try {
            const response = await fetch(OC.generateUrl('/apps/files/api/v1/files/?format=json'));
            const data = await response.json();
            
            const fileList = document.getElementById('file-list');
            const supportedFormats = ['obj', 'stl'];
            
            data.files?.forEach(file => {
                const extension = file.name.split('.').pop().toLowerCase();
                if (supportedFormats.includes(extension)) {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    fileItem.textContent = file.name;
                    fileItem.addEventListener('click', () => this.loadModel(file.id, file.name));
                    fileList.appendChild(fileItem);
                }
            });
        } catch (error) {
            console.error('Error loading file list:', error);
        }
    }
    
    async loadModel(fileId, fileName) {
        try {
            document.getElementById('loading')?.style.setProperty('display', 'block');
            document.getElementById('welcome-message').style.display = 'none';
            document.getElementById('viewer-container').style.display = 'block';
            
            const response = await fetch(OC.generateUrl(`/apps/3dviewer/api/model/${fileId}`));
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            const content = atob(data.content);
            const extension = fileName.split('.').pop().toLowerCase();
            
            // Remove previous model
            if (this.currentModel) {
                this.scene.remove(this.currentModel);
            }
            
            let loader;
            if (extension === 'obj') {
                loader = new OBJLoader();
            } else if (extension === 'stl') {
                loader = new STLLoader();
            }
            
            const geometry = loader.parse(content);
            
            let object;
            if (extension === 'stl') {
                const material = new THREE.MeshLambertMaterial({ color: 0x666666 });
                object = new THREE.Mesh(geometry, material);
            } else {
                object = geometry;
            }
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDim;
            
            object.position.sub(center);
            object.scale.multiplyScalar(scale);
            
            this.currentModel = object;
            this.scene.add(object);
            
            document.getElementById('loading')?.style.setProperty('display', 'none');
        } catch (error) {
            console.error('Error loading model:', error);
            document.getElementById('loading').textContent = 'Error loading model: ' + error.message;
        }
    }
    
    resetView() {
        if (this.camera && this.controls) {
            this.camera.position.set(5, 5, 5);
            this.controls.reset();
        }
    }
    
    toggleWireframe() {
        if (this.currentModel) {
            this.wireframe = !this.wireframe;
            this.currentModel.traverse(child => {
                if (child.isMesh) {
                    child.material.wireframe = this.wireframe;
                }
            });
        }
    }
    
    onWindowResize() {
        const container = document.getElementById('app-content');
        if (container && this.camera && this.renderer) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThreeDViewer();
});
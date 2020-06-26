<template lang='pug'>
    .scene
        #container
</template>

<script>
/* eslint-disable new-parens */
/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import img0 from '@/assets/img/num0.png';
import imgC from '@/assets/img/numC.png';
import noise from '@/helpers/PerlinNoise';

export default {
    name: 'Scene',
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            // mesh: null,
            //
            geometry: null,
            geometry2: null,
            //
            time: 0,
            move: 0,
            step: 0,
            mountHeight: 0,
            height: 0,
            //
            points: {
                flyingTime: 18,
                flyingSpeed: 16,
                vibrationSpeed: 16,
                riseSpeed: 1.05,
                riseHeight: 50,
                mountainHeight: 0
            }
        };
    },
    methods: {
        init() {
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            const container = document.getElementById('container');
            container.appendChild(this.renderer.domElement);

            this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 3000);
            this.camera.position.z = 700;
            this.camera.position.y = 500;
            this.camera.position.x = 200;

            // Scene

            const texture = (new THREE.TextureLoader).load(img0);
            const material = new THREE.PointsMaterial({
                size: 10,
                vertexColors: THREE.VertexColors,
                map: texture,
                alphaTest: 0.5
            });
            const texture2 = (new THREE.TextureLoader).load(imgC);
            const material2 = new THREE.PointsMaterial({
                size: 10,
                vertexColors: THREE.VertexColors,
                map: texture2,
                alphaTest: 0.5
            });

            this.geometry = new THREE.Geometry();
            this.geometry2 = new THREE.Geometry();

            for (let i = 0; i < 10000; i++) {
                this.geometry.vertices.push(new THREE.Vector3());
                this.geometry.colors.push(new THREE.Color());
            }

            for (let i = 0; i < 10000; i++) {
                const rand = Math.floor(Math.random() * 2);
                const colorArr = ['#ffffff', '#000000'];
                const color = colorArr[rand];
                this.geometry2.vertices.push(new THREE.Vector3());
                this.geometry2.colors.push(new THREE.Color(color));
            }

            const points = new THREE.Points(this.geometry, material);
            const points2 = new THREE.Points(this.geometry2, material2);

            this.scene.add(points);
            this.scene.add(points2);

            // Scene-end

            window.addEventListener('resize', this.onWindowResize, false);
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        // init() {
        //     const container = document.getElementById('container');

        //     this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
        //     this.camera.position.z = 1;

        //     this.scene = new Three.Scene();

        //     const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
        //     const material = new Three.MeshNormalMaterial();

        //     this.mesh = new Three.Mesh(geometry, material);
        //     this.scene.add(this.mesh);

        //     this.renderer = new Three.WebGLRenderer({ antialias: true });
        //     this.renderer.setSize(container.clientWidth, container.clientHeight);
        //     container.appendChild(this.renderer.domElement);
        // },
        goForward() {
            this.step += this.points.flyingTime;
        },
        goBack() {
            this.step -= this.points.flyingTime;
        },
        animate() {
            this.time++;

            if (this.move <= this.step) this.move++;
            if (this.move > this.step) this.move--;
            if (this.mountHeight <= this.height) {
                this.mountHeight = (this.mountHeight + 1) * this.points.riseSpeed;
            }

            requestAnimationFrame(this.animate);

            this.geometry.vertices.forEach((particle, index) => {
                const x = Math.floor(index / 150);
                const y = index % 150;
                const dx = x / 20;
                const dy = (this.move / 1000) * this.points.flyingSpeed - y / 20;
                const dz = (this.time / 10000) * this.points.vibrationSpeed;
                particle.x = x * 20 - 600;
                particle.y = (this.mountHeight * 10 + this.points.mountainHeight) * noise(dx, dy, dz);
                particle.z = y * 20 - 2200;
            });

            this.geometry2.vertices.forEach((particle, index) => {
                const x = Math.floor(index / 150);
                const y = index % 150;
                const dx = x / 20;
                const dy = (this.move / 1000) * this.points.flyingSpeed - y / 20;
                const dz = (this.time / 10000) * this.points.vibrationSpeed;
                particle.x = x * 20 - 600;
                particle.y = (this.mountHeight * 10 + this.points.mountainHeight) * noise(dx, dy, dz);
                particle.z = y * 20 - 2200;
            });

            this.geometry.verticesNeedUpdate = true;
            this.geometry2.verticesNeedUpdate = true;

            this.renderer.render(this.scene, this.camera);
        }
    },
    mounted() {
        this.init();
        this.animate();
    },
    created() {
        setTimeout(() => {
            this.height += this.points.riseHeight;
        }, 500);
    }
};
</script>

<style lang='sass'>
    @import '@/assets/styles/mixins'

    #container
        +b
</style>

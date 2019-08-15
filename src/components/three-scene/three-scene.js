import React, { Component } from "react";
import ThreeSlider from '../three-slider';
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader';;

const OrbitControls = require('three-orbit-controls')(THREE);


export default class ThreeScene extends Component {

    state = {
        rotation: 0,
        model:1
    };

    vertexShader () {
        return 
    }

    fragmentShader () {
        return 
    }


    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x555555 );

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.initializeControls();


        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);


        this.initializeCamera();
        this.addLights();

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
   
        // shader-based material 

        const material =  new THREE.ShaderMaterial({
   
            uniforms: {
                colorB: {type: 'vec3', value: new THREE.Color(0xFF00FF)},
                colorA: {type: 'vec3', value: new THREE.Color(0x000FFF)}
             },

            vertexShader: `
                varying vec3 vUv; 
                varying vec4 modelViewPosition; 
                varying vec3 vecNormal;
            
                void main() {
                    vUv = position; 
                    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                    vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz; 
                    gl_Position = projectionMatrix * modelViewPosition; 
                }
            `,

            fragmentShader: `
                uniform vec3 colorA; 
                uniform vec3 colorB; 
                varying vec3 vUv;
        
                void main() {
                    gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
                }
            `,
          })

        this.cube = new THREE.Mesh( geometry, material );
        this.cube.castShadow = true;
        this.cube.receiveShadow = false;
        this.scene.add( this.cube );

        this.helper = new THREE.GridHelper( 20, 20, 0x303030, 0x303030 );
        this.helper.position.set(0,-0.5,0);
        this.scene.add( this.helper );

        this.plane = new THREE.Mesh( 
            new THREE.PlaneGeometry( 6, 6, 4 ), 
            new THREE.MeshStandardMaterial( 
                {
                    //color: 0xffff,
                    map: new THREE.TextureLoader().load('wood-texture.jpg'),
                    side: THREE.DoubleSide
                } 
            )  
        );

        this.plane.rotation.set(Math.PI/2,0,0);
        this.plane.position.set(0,-0.5,0);
        this.plane.receiveShadow=true;
        this.plane.castShadow = false;

        this.scene.add( this.plane );

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('grasshopper/scene.gltf', (gltf) => {
            gltf.scene.traverse( function( node ) {
                if ( node instanceof THREE.Mesh ) { node.castShadow = true; }
            } );

            this.grasshopper = gltf.scene;
            this.grasshopper.scale.set(0.02,0.02,0.02);
            this.grasshopper.position.set(0,0.25,0);
            this.grasshopper.rotation.set(0,-Math.PI/3,0);
            this.grasshopper.visible = false;
            this.grasshopper.castShadow = true;
            this.grasshopper.receiveShadow = false;
            this.scene.add(this.grasshopper);
            // fix - момент загрузки наступат позже запуска animate 
            this.animate(); // поэтому он перенесён сюда
        });

        
    }

    componentDidUpdate(prevProps){
        
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    addLights = () => {
        this.ambientLight = new THREE.AmbientLight( 0x606060 );
        this.scene.add( this.ambientLight );
        this.SpotLight = new THREE.SpotLight( 0xffffff );
        this.SpotLight.position.set( 1, 1.75, 1.5 );
        this.SpotLight.castShadow = true;
        this.SpotLight.penumbra = 0.75;
        this.scene.add( this.SpotLight );

        this.SpotLight.shadow.mapSize.width = 1024;  // default
        this.SpotLight.shadow.mapSize.height = 1024; // default
        this.SpotLight.shadow.camera.near = 0.1;       // default
        this.SpotLight.shadow.camera.far = 500      // default
    }

    initializeControls = () => {
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
    }

    initializeCamera = () => {
        this.camera.position.x = 2;
        this.camera.position.y = 2;
        this.camera.position.z = 2;
        this.camera.lookAt(0,0.5,0);

    }

   animate = () => {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        this.cube.rotation.y+=this.state.rotation;
        this.SpotLight.position.z=this.state.rotation*10;
        // fix - загружаемая модель тоже анимируется
        this.grasshopper.rotation.y+=this.state.rotation;

    }

    addCube = (cube) => {
        this.scene.add(cube);
    }

    onChangeSlider = (val)=>{
        this.setState(
            {
                rotation: 0.01*val
            }
        );
    }

    onChangeModelSlider = (val) =>{
        this.grasshopper.visible=!this.grasshopper.visible;
        this.cube.visible=!this.cube.visible;
    }

    render() {

        return (
            <div>

                <ThreeSlider
                    onChangeSlider={ this.onChangeSlider }
                    compName="ThreeSlider" 
                    min="-10" 
                    max="10"
                    step="any"
                />
                <ThreeSlider
                    onChangeSlider={ this.onChangeModelSlider }
                    compName="Model Selector" 
                    min="1" 
                    max="2" 
                    step="1"
                />
                <div
                    id="boardCanvas"
                    style={{ width: "100%", height: "300px" }}
                    ref={mount => {
                    this.mount = mount;
                    }}
                />
            </div>
        );
    }
}

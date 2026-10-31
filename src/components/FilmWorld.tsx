'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Component, Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import * as THREE from 'three';

type Vector = [number, number, number];
const stops = [0, .235, .46, .685, .91, 1];
const clamp = (n:number) => Math.max(0, Math.min(1, n));
const smooth = (a:number,b:number,t:number) => { const x=clamp((t-a)/(b-a));return x*x*(3-2*x); };
function path(t:number, values:Vector[]):Vector {
  const index=Math.max(0, Math.min(stops.length-2, stops.findIndex((s,i)=>i<stops.length-1&&t>=s&&t<=stops[i+1])));
  const k=smooth(stops[index],stops[index+1],t);
  return values[index].map((v,j)=>THREE.MathUtils.lerp(v,values[index+1][j],k)) as Vector;
}
class WebGLBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?null:this.props.children}}

function CodeArchitecture(){
  const texture=useMemo(()=>{const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=640;const ctx=canvas.getContext('2d')!;ctx.fillStyle='#12171e';ctx.fillRect(0,0,1024,640);ctx.fillStyle='#242b35';ctx.fillRect(0,0,1024,64);['#ff8c5a','#e0c285','#95bfa9'].forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(32+i*28,32,7,0,Math.PI*2);ctx.fill()});ctx.font='22px monospace';ctx.fillStyle='#88939e';ctx.fillText('EXPLORATION / CREATIVE DEVELOPMENT',145,40);const lines=[['#a8bacc','01  const experience = {'],['#e6b48d','02    curiosity: true,'],['#b6c8b8','03    craft: "intentional",'],['#e6b48d','04    possibilities: Infinity'],['#a8bacc','05  };'],['#647681','06'],['#bad9cb','07  build(experience);']];ctx.font='34px monospace';lines.forEach(([c,line],i)=>{ctx.fillStyle=c;ctx.fillText(line,55,140+i*62)});const image=new THREE.CanvasTexture(canvas);image.colorSpace=THREE.SRGBColorSpace;return image},[]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  return <group rotation={[-.04,-.25,-.06]}>
    <mesh><boxGeometry args={[3.2,2,.16]}/><meshStandardMaterial color="#333941" metalness={.8} roughness={.3}/></mesh>
    <mesh position={[0,0,.086]}><planeGeometry args={[3.04,1.9]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <mesh position={[0,-1.13,.48]} rotation={[-.55,0,0]}><boxGeometry args={[3.2,.08,1]}/><meshStandardMaterial color="#454b52" metalness={.9} roughness={.3}/></mesh>
    {[0,1,2,3].map(i=><lineSegments key={i} position={[i*.16,i*.13,-.8-i*.8]} rotation={[0,0,i*.045]}><edgesGeometry args={[new THREE.BoxGeometry(3.65,2.35,.03)]}/><lineBasicMaterial color="#c29471" transparent opacity={.35-i*.06}/></lineSegments>)}
  </group>;
}

function DataSculpture(){return <group><gridHelper args={[9,18,'#638d7e','#22392f']} position={[0,-1.6,0]}/>{Array.from({length:16},(_,i)=>{const height=.35+((i*7)%13)/5;return <mesh key={i} position={[(i%8)*.42-1.5,height/2-1.6,Math.floor(i/8)*.65]}><boxGeometry args={[.23,height,.23]}/><meshStandardMaterial color={i%3===0?'#b8dfc7':'#639d83'} metalness={.5} roughness={.3}/></mesh>})}</group>}
function NeuralSculpture(){const {points,lines}=useMemo(()=>{const pts:Vector[]=Array.from({length:38},(_,i)=>{const y=1-(i/37)*2;const r=Math.sqrt(1-y*y);const a=i*2.39996;return [Math.cos(a)*r*1.6,y*1.6,Math.sin(a)*r*1.6]});const values:number[]=[];for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){if(new THREE.Vector3(...pts[i]).distanceTo(new THREE.Vector3(...pts[j]))<1.0)values.push(...pts[i],...pts[j])}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(values,3));return {points:pts,lines:geo}},[]);useEffect(()=>()=>lines.dispose(),[lines]);return <group><lineSegments geometry={lines}><lineBasicMaterial color="#b6a8e5" transparent opacity={.55}/></lineSegments>{points.map((p,i)=><mesh position={p} key={i}><sphereGeometry args={[.045,10,10]}/><meshStandardMaterial color="#d0c1f5" emissive="#7a629e" emissiveIntensity={.6} metalness={.6} roughness={.2}/></mesh>)}<mesh><icosahedronGeometry args={[.47,1]}/><meshStandardMaterial color="#a699cf" metalness={.9} roughness={.2}/></mesh></group>}

// One continuous corridor: each chapter moves the camera through the next gate.
function PortalCorridor({progress,reduced}:{progress:MutableRefObject<number>;reduced:boolean}){
  const host=useRef<THREE.Group>(null);
  useFrame(({size})=>{if(!host.current)return;const p=reduced?0:progress.current;const mobile=size.width<768;
    host.current.position.set(mobile?.25:1.6,mobile?-1.1:0,-5);
    host.current.children.forEach((gate,i)=>{const travel=(p*4+i/7)%1;gate.position.z=-22+travel*30;gate.rotation.z=i*.16+p*1.8;const material=(gate as THREE.Mesh).material as THREE.MeshBasicMaterial;material.opacity=Math.sin(travel*Math.PI)*.24;material.color.set(p>.57&&p<.84?'#bca5ff':p>.34&&p<.57?'#91e8c3':'#f2b679')});
  });
  return <group ref={host}>{Array.from({length:7},(_,i)=><mesh key={i}><torusGeometry args={[3.4,.025,6,64]}/><meshBasicMaterial color="#f2b679" transparent opacity={.15} depthWrite={false}/></mesh>)}</group>;
}

function World({progress,reduced,onReady,renderFrame}:{progress:MutableRefObject<number>;reduced:boolean;onReady:()=>void;renderFrame:MutableRefObject<(()=>void)|null>}){
  const avatarTexture=useLoader(THREE.TextureLoader,'/images/personal/sanket-cutout.png');
  const avatar=useRef<THREE.Mesh>(null),code=useRef<THREE.Group>(null),data=useRef<THREE.Group>(null),neural=useRef<THREE.Group>(null),rings=useRef<THREE.Group>(null),light=useRef<THREE.PointLight>(null);
  const invalidate=useThree(state=>state.invalidate);const cursor=useRef({x:0,y:0});
  useEffect(()=>{avatarTexture.colorSpace=THREE.SRGBColorSpace;avatarTexture.needsUpdate=true;renderFrame.current=invalidate;invalidate();onReady();return()=>{renderFrame.current=null}},[avatarTexture,invalidate,onReady,renderFrame]);
  useEffect(()=>{if(reduced||!matchMedia('(pointer: fine)').matches)return;const move=(event:PointerEvent)=>{cursor.current.x=event.clientX/innerWidth*2-1;cursor.current.y=1-event.clientY/innerHeight*2;invalidate()};window.addEventListener('pointermove',move,{passive:true});return()=>window.removeEventListener('pointermove',move)},[invalidate,reduced]);
  const particles=useMemo(()=>{const positions=new Float32Array(450);for(let i=0;i<150;i++){positions[i*3]=Math.sin(i*127.1)*11;positions[i*3+1]=Math.sin(i*311.7)*7;positions[i*3+2]=-2-Math.abs(Math.sin(i*74.7))*12}return positions},[]);
  useFrame(({camera,size})=>{
    const p=reduced?0:progress.current;const mobile=size.width<768;
    const cam=path(p,[[0,0,8.8],[1.1,.4,8],[-.8,.5,8.3],[.9,.25,7.6],[0,.2,8.9],[0,.2,8.9]]);
    camera.position.set(cam[0]+(mobile||reduced?0:cursor.current.x*.09),cam[1]+(mobile||reduced?0:cursor.current.y*.06),cam[2]);camera.lookAt(0,mobile?-.1:0,0);
    if(avatar.current){const pos=path(p,mobile?[[.6,-1.3,0],[.65,-1.5,-1.6],[-.6,-1.6,-2],[.6,-1.6,-2],[.6,-1.3,0],[.6,-1.3,0]]:[[1.65,-.05,0],[2.1,-.2,-1.8],[-2,-.2,-2.5],[2.1,-.2,-2.7],[1.7,-.05,0],[1.7,-.05,0]]);avatar.current.position.set(...pos);avatar.current.quaternion.copy(camera.quaternion);const scale=path(p,[[1,1,1],[.78,.78,.78],[.68,.68,.68],[.68,.68,.68],[1,1,1],[1,1,1]])[0]*(mobile?.58:1);avatar.current.scale.setScalar(scale)}
    const codeWeight=smooth(.11,.23,p)*(1-smooth(.33,.43,p));const dataWeight=smooth(.33,.45,p)*(1-smooth(.56,.66,p));const neuralWeight=smooth(.56,.68,p)*(1-smooth(.83,.95,p));
    if(code.current){code.current.visible=codeWeight>.001;code.current.scale.setScalar(Math.max(.001,codeWeight)*(mobile?.64:1));code.current.position.set(mobile?-.2:.5,mobile?-1.35:-.15,1-codeWeight);code.current.rotation.y=(p-.235)*3;code.current.rotation.z=(p-.235)*.7}
    if(data.current){data.current.visible=dataWeight>.001;data.current.scale.setScalar(Math.max(.001,dataWeight)*(mobile?.74:1.2));data.current.position.set(mobile?-.1:-1.25,mobile?-1.05:-.5,0);data.current.rotation.y=-.35+(p-.46)*4}
    if(neural.current){neural.current.visible=neuralWeight>.001;neural.current.scale.setScalar(Math.max(.001,neuralWeight)*(mobile?.73:1.2));neural.current.position.set(mobile?0:.9,mobile?-1.15:0,.1);neural.current.rotation.set(p*2,p*5,p*.6)}
    if(rings.current){rings.current.rotation.set(.5+p*2,.2+p*3,-.35+p);rings.current.position.set(mobile?0:1.4,mobile?-1.1:-.2,-2);rings.current.scale.setScalar(mobile?.85:1.35)}
    if(light.current)light.current.color.set(dataWeight>.2?'#a8d5ba':neuralWeight>.2?'#a995ec':'#ee9c63');
  });
  return <>
    <ambientLight intensity={1.2}/><directionalLight position={[-4,6,5]} intensity={3.2} color="#fff0df"/><pointLight ref={light} position={[3,2,4]} intensity={30} color="#ee9c63"/>
    <PortalCorridor progress={progress} reduced={reduced}/>
    <mesh ref={avatar} renderOrder={2}><planeGeometry args={[3.3,5.1]}/><meshBasicMaterial map={avatarTexture} transparent alphaTest={.025} depthWrite={false} toneMapped={false}/></mesh>
    <group ref={rings}>{[0,1,2].map(i=><mesh key={i} rotation={[i*.6,i*.3,i*.7]}><torusGeometry args={[1.9+i*.24,.012,8,130]}/><meshStandardMaterial color={i===1?'#ab8e74':'#66666b'} metalness={.8} roughness={.4}/></mesh>)}</group>
    <group ref={code} visible={false}><CodeArchitecture/></group><group ref={data} visible={false}><DataSculpture/></group><group ref={neural} visible={false}><NeuralSculpture/></group>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[particles,3]}/></bufferGeometry><pointsMaterial color="#d9bc9d" size={.018} transparent opacity={.42} sizeAttenuation/></points>
    <gridHelper args={[30,50,'#272420','#111111']} position={[0,-2.8,-3]} />
  </>;
}

export default function FilmWorld({progress,reduced,onReady,renderFrame}:{progress:MutableRefObject<number>;reduced:boolean;onReady:()=>void;renderFrame:MutableRefObject<(()=>void)|null>}){
  const [available,setAvailable]=useState(false),[visible,setVisible]=useState(true);const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{try{const canvas=document.createElement('canvas');setAvailable(!!canvas.getContext('webgl2'))}catch{setAvailable(false)}const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));if(host.current)observer.observe(host.current);return()=>observer.disconnect()},[]);
  return <div ref={host} className="film-webgl" aria-hidden="true">{available&&<WebGLBoundary><Canvas camera={{position:[0,0,8.8],fov:38}} dpr={[1,1.5]} frameloop={visible?'demand':'never'} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}><Suspense fallback={null}><World progress={progress} reduced={reduced} onReady={onReady} renderFrame={renderFrame}/></Suspense></Canvas></WebGLBoundary>}</div>;
}

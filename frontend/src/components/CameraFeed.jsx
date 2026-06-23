import { useRef, useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CameraFeed() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const { isScanning, detectSign } = useApp();
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode:'user', width:640, height:480 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(() => {});
        };
      }
      setCameraOn(true);
    } catch {
      setError('Camera access denied. Please allow camera permissions in your browser.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  };

  useEffect(() => { startCamera(); return () => stopCamera(); }, []);

  const btn = (type, disabled=false) => ({
    flex: type==='primary' ? 1 : 'none',
    padding:'10px 18px',borderRadius:10,fontWeight:600,fontSize:'0.9rem',
    border: type==='primary' ? 'none' : '1px solid var(--border)',
    background: type==='primary' ? (disabled?'#1e3a2f':'var(--accent)') : 'var(--glass)',
    color: type==='primary' ? (disabled?'#4b7a63':'#fff') : 'var(--text-muted)',
    cursor: disabled?'not-allowed':'pointer',transition:'all 0.2s',
    backdropFilter:'blur(8px)',
  });

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <div style={{
        position:'relative',borderRadius:16,overflow:'hidden',
        background:'#000',aspectRatio:'4/3',border:'1px solid var(--border)',
        boxShadow: cameraOn ? '0 0 30px rgba(16,185,129,0.2)' : 'none',
      }}>
        <video ref={videoRef} autoPlay muted playsInline
          style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
        {cameraOn && (
          <div style={{position:'absolute',top:12,left:12,display:'flex',alignItems:'center',gap:6,
            background:'rgba(0,0,0,0.6)',borderRadius:6,padding:'4px 10px',
            fontSize:'0.75rem',fontWeight:700,fontFamily:'var(--font-mono)',color:'#fff'}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#ef4444',animation:'recPulse 1.5s infinite'}} />
            REC
          </div>
        )}
        {isScanning && (
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'rgba(0,0,0,0.85)',borderRadius:12,padding:'12px 24px',border:'1px solid var(--accent)',color:'var(--accent)',fontWeight:600}}>
              Scanning...
            </div>
          </div>
        )}
        {!cameraOn && (
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,color:'var(--text-muted)'}}>
            <span style={{fontSize:'3rem'}}>📷</span>
            <span style={{textAlign:'center',padding:'0 1rem'}}>{error || 'Camera is off'}</span>
          </div>
        )}
      </div>
      <div style={{display:'flex',gap:'0.75rem'}}>
        <button onClick={cameraOn ? stopCamera : startCamera} style={btn('outline')}>
          {cameraOn ? 'Stop Camera' : 'Start Camera'}
        </button>
        <button onClick={detectSign} disabled={!cameraOn||isScanning} style={btn('primary',!cameraOn||isScanning)}>
          {isScanning ? 'Detecting...' : 'Detect Sign'}
        </button>
      </div>
      <style>{`@keyframes recPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </div>
  );
}

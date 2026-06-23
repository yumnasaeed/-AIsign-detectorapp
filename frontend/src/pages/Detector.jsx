import { Link } from 'react-router-dom';
import CameraFeed from '../components/CameraFeed';
import DetectionCard from '../components/DetectionCard';
import HistorySidebar from '../components/HistorySidebar';
import Sidebar from '../components/Sidebar';
import SignCard from '../components/SignCard';
import { useApp } from '../context/AppContext';

export default function Detector() {
  const { MOCK_SIGNS } = useApp();

  return (
    <div style={{maxWidth:1400,margin:'0 auto',padding:'2rem',display:'flex',gap:'1.5rem'}}>
      <Sidebar />

      <div style={{flex:1,display:'flex',flexDirection:'column',gap:'1.5rem',minWidth:0}}>

        {/* Header bar */}
        <div style={{
          background:'var(--card)',border:'1px solid var(--border)',
          borderRadius:16,padding:'1.25rem 1.5rem',
          display:'flex',alignItems:'center',gap:10,
        }}>
          <h1 style={{fontSize:'1.3rem',fontWeight:700}}>Live Detection</h1>
          <span style={{display:'flex',alignItems:'center',gap:6,color:'var(--accent)',fontSize:'0.85rem',fontWeight:600}}>
            <span style={{
              width:8,height:8,borderRadius:'50%',background:'var(--accent)',
              animation:'livePulse 2s infinite',display:'inline-block',
            }} />
            Connected
          </span>
        </div>

        {/* Camera + Detection side by side */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
            <CameraFeed />
          </div>
          <DetectionCard />
        </div>

        {/* Library preview */}
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.25rem'}}>
            <div>
              <h2 style={{fontSize:'1.05rem',fontWeight:700}}>Explore Sign Library</h2>
              <p style={{fontSize:'0.8rem',color:'var(--text-muted)',marginTop:2}}>Browse all signs and learn their meanings</p>
            </div>
            <Link to="/library" style={{
              padding:'8px 18px',borderRadius:8,background:'var(--accent)',
              color:'#fff',fontWeight:600,fontSize:'0.85rem',
            }}>Browse Library</Link>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0.75rem'}}>
            {MOCK_SIGNS.slice(0,5).map(sign => <SignCard key={sign.id} sign={sign} />)}
          </div>
        </div>
      </div>

      <div style={{width:260,flexShrink:0}}>
        <HistorySidebar />
      </div>

      <style>{"@keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}"}</style>
    </div>
  );
}

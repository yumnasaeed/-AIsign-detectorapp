import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SignCard from '../components/SignCard';

export default function Home() {
  const { MOCK_SIGNS } = useApp();

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'3rem 2rem'}}>

      {/* Hero */}
      <div style={{
        textAlign:'center',padding:'4rem 2rem',
        background:'radial-gradient(ellipse at 50% 0%,rgba(16,185,129,0.12) 0%,transparent 70%)',
        borderRadius:24,marginBottom:'4rem',border:'1px solid var(--border)',
      }}>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:8,
          background:'var(--accent-dim)',border:'1px solid rgba(16,185,129,0.3)',
          borderRadius:20,padding:'6px 16px',marginBottom:'1.5rem',
          fontSize:'0.8rem',color:'var(--accent)',fontWeight:600,
        }}>✦ AI-Powered Sign Language Recognition</div>

        <h1 style={{
          fontSize:'clamp(2.5rem,6vw,4rem)',fontWeight:800,lineHeight:1.1,marginBottom:'1.5rem',
          background:'linear-gradient(135deg,#f1f5f9 40%,var(--accent))',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
        }}>AI Sign Language<br />Detector</h1>

        <p style={{
          fontSize:'1.1rem',color:'var(--text-muted)',
          maxWidth:500,margin:'0 auto 2.5rem',lineHeight:1.7,
        }}>
          Real-time American Sign Language detection powered by computer vision.
          Bridge communication gaps effortlessly.
        </p>

        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/detector" style={{
            padding:'14px 36px',borderRadius:12,background:'var(--accent)',
            color:'#fff',fontWeight:700,fontSize:'1rem',display:'inline-block',
          }}>Start Detection →</Link>
          <Link to="/library" style={{
            padding:'14px 36px',borderRadius:12,background:'var(--glass)',
            color:'var(--text)',border:'1px solid var(--border)',
            fontWeight:600,fontSize:'1rem',display:'inline-block',
          }}>Browse Library</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.5rem',marginBottom:'4rem'}}>
        {[
          {label:'Signs Supported',value:'26+',desc:'ASL alphabet & common phrases'},
          {label:'Detection Accuracy',value:'92%',desc:'Average confidence score'},
          {label:'Real-time',value:'<2s',desc:'Detection response time'},
        ].map(s => (
          <div key={s.label} style={{
            background:'var(--card)',border:'1px solid var(--border)',
            borderRadius:16,padding:'1.5rem',textAlign:'center',
          }}>
            <div style={{fontSize:'2.5rem',fontWeight:800,color:'var(--accent)',fontFamily:'var(--font-mono)'}}>{s.value}</div>
            <div style={{fontWeight:600,marginTop:4}}>{s.label}</div>
            <div style={{fontSize:'0.8rem',color:'var(--text-muted)',marginTop:4}}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Featured */}
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <h2 style={{fontSize:'1.3rem',fontWeight:700}}>Popular Signs</h2>
          <Link to="/library" style={{color:'var(--accent)',fontWeight:600,fontSize:'0.9rem'}}>View All →</Link>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'1rem'}}>
          {MOCK_SIGNS.slice(0,6).map(sign => <SignCard key={sign.id} sign={sign} />)}
        </div>
      </div>
    </div>
  );
}

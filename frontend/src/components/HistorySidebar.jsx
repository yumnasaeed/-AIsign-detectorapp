import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function HistorySidebar() {
  const { history } = useApp();
  const recent = history.slice(0, 5);

  return (
    <div style={{background:'var(--card)',border:'1px solid var(--border)',
      borderRadius:16,padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1rem'}}>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{fontSize:'1.05rem',fontWeight:600}}>History (Last 5)</h2>
        <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{history.length} total</span>
      </div>

      {recent.length === 0 ? (
        <div style={{color:'var(--text-muted)',textAlign:'center',padding:'2rem 0',fontSize:'0.9rem'}}>
          No detections yet
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          {recent.map((item,i) => (
            <div key={item.id||i} style={{
              display:'flex',alignItems:'center',gap:'0.75rem',
              background:'var(--glass)',borderRadius:10,
              padding:'10px 12px',border:'1px solid var(--border)',
            }}>
              <div style={{
                width:36,height:36,borderRadius:8,flexShrink:0,
                background:'var(--accent-dim)',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',
              }}>🤚</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:'0.9rem'}}>{item.name}</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{item.time}</div>
              </div>
              <div style={{color:'var(--accent)',fontWeight:700,fontSize:'0.85rem',fontFamily:'var(--font-mono)'}}>
                {item.confidence?.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/history" style={{
        display:'block',textAlign:'center',padding:'10px',borderRadius:10,
        border:'1px solid var(--accent)',color:'var(--accent)',fontWeight:600,fontSize:'0.9rem',
      }}>View Full History →</Link>
    </div>
  );
}

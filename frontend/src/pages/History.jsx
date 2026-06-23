import { useApp } from '../context/AppContext';

export default function History() {
  const { history, clearHistory } = useApp();

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:'2rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
        <div>
          <h1 style={{fontSize:'1.8rem',fontWeight:800}}>Detection History</h1>
          <p style={{color:'var(--text-muted)',marginTop:4}}>{history.length} total detections</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory} style={{
            padding:'8px 18px',borderRadius:10,cursor:'pointer',
            background:'rgba(239,68,68,0.12)',color:'#ef4444',
            border:'1px solid rgba(239,68,68,0.3)',fontWeight:600,fontSize:'0.85rem',
          }}>Clear All</button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{
          textAlign:'center',padding:'5rem',
          background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,color:'var(--text-muted)',
        }}>
          <div style={{fontSize:'3rem',marginBottom:'1rem'}}>📋</div>
          <div style={{fontWeight:600,fontSize:'1.1rem'}}>No history yet</div>
          <div style={{fontSize:'0.9rem',marginTop:4}}>Start detecting signs to see history here</div>
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
          {history.map((item, i) => (
            <div key={item.id||i} style={{
              background:'var(--card)',border:'1px solid var(--border)',
              borderRadius:12,padding:'1rem 1.5rem',
              display:'flex',alignItems:'center',gap:'1rem',
            }}>
              <div style={{
                width:44,height:44,borderRadius:12,flexShrink:0,fontSize:'1.4rem',
                background:'var(--accent-dim)',border:'1px solid rgba(16,185,129,0.2)',
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>🤚</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{item.name}</div>
                <div style={{fontSize:'0.8rem',color:'var(--text-muted)',marginTop:2}}>
                  {item.category} · {item.language || 'ASL'}
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{
                  fontWeight:700,fontSize:'1.1rem',fontFamily:'var(--font-mono)',
                  color: item.confidence>=90?'#10b981':item.confidence>=75?'#f59e0b':'#ef4444',
                }}>{item.confidence?.toFixed(2)}%</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useApp } from '../context/AppContext';

const confColor = c => c>=90?'#10b981':c>=75?'#f59e0b':'#ef4444';
const confLabel = c => c>=90?'High Confidence':c>=75?'Medium Confidence':'Low Confidence';

export default function DetectionCard() {
  const { detectedSign, isScanning } = useApp();

  return (
    <div style={{background:'var(--card)',border:'1px solid var(--border)',
      borderRadius:16,padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1.2rem'}}>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{fontSize:'1.1rem',fontWeight:600}}>Detection Result</h2>
        <span style={{
          fontSize:'0.75rem',padding:'4px 10px',borderRadius:20,
          background: isScanning?'rgba(245,158,11,0.15)':detectedSign?'var(--accent-dim)':'rgba(255,255,255,0.05)',
          color: isScanning?'#f59e0b':detectedSign?'var(--accent)':'var(--text-muted)',
          border: `1px solid ${isScanning?'rgba(245,158,11,0.3)':detectedSign?'rgba(16,185,129,0.3)':'var(--border)'}`,
        }}>
          {isScanning ? '● Scanning' : detectedSign ? '● Connected' : '○ Waiting'}
        </span>
      </div>

      <div style={{background:'var(--glass)',border:'1px solid var(--border)',borderRadius:12,
        padding:'1.5rem',display:'flex',alignItems:'center',gap:'1.5rem',minHeight:100}}>
        <div style={{
          width:80,height:80,borderRadius:16,background:'var(--accent-dim)',
          border:'1px solid rgba(16,185,129,0.3)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:'2.5rem',flexShrink:0,
        }}>🤚</div>
        <div>
          {isScanning ? (
            <div>
              <div style={{fontSize:'1.4rem',fontWeight:700,color:'var(--accent)',marginBottom:4}}>Analyzing...</div>
              <div style={{color:'var(--text-muted)',fontSize:'0.9rem'}}>Hold your hand steady</div>
            </div>
          ) : detectedSign ? (
            <>
              <div style={{fontSize:'2rem',fontWeight:700,color:'var(--accent)',lineHeight:1.1}}>{detectedSign.name}</div>
              <div style={{color:'var(--text-muted)',fontSize:'0.8rem',marginTop:2}}>Detected Sign</div>
              <div style={{fontSize:'1.1rem',fontWeight:600,color:confColor(detectedSign.confidence),marginTop:4}}>
                {detectedSign.confidence?.toFixed(2)}%
              </div>
            </>
          ) : (
            <div style={{color:'var(--text-muted)'}}>
              <div style={{fontWeight:500,marginBottom:4}}>No sign detected</div>
              <div style={{fontSize:'0.85rem'}}>Press Detect Sign to start</div>
            </div>
          )}
        </div>
      </div>

      {detectedSign && !isScanning && (
        <>
          <div>
            <div style={{fontSize:'0.8rem',color:'var(--text-muted)',marginBottom:6,fontWeight:600,textTransform:'uppercase',letterSpacing:1}}>Meaning</div>
            <p style={{fontSize:'0.9rem',lineHeight:1.6}}>{detectedSign.meaning}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
            {[
              {label:'Category',value:detectedSign.category},
              {label:'Language',value:detectedSign.language},
              {label:'Detected At',value:detectedSign.time},
              {label:'Status',value:confLabel(detectedSign.confidence),accent:true},
            ].map(item => (
              <div key={item.label} style={{background:'var(--glass)',borderRadius:8,padding:'8px 12px',border:'1px solid var(--border)'}}>
                <div style={{fontSize:'0.7rem',color:'var(--text-muted)',marginBottom:2}}>{item.label}</div>
                <div style={{fontSize:'0.85rem',fontWeight:500,color:item.accent?confColor(detectedSign.confidence):'var(--text)'}}>{item.value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

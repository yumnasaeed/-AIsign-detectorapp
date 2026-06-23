import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { validateForm } from '../utils/regex';

export default function Profile() {
  const { user, history } = useApp();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = e => {
    setForm(p => ({...p,[e.target.name]:e.target.value}));
    setErrors(p => ({...p,[e.target.name]:''}));
    setSaved(false);
  };

  const handleSave = () => {
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const avgConf = history.length > 0
    ? (history.reduce((s,h) => s+h.confidence,0)/history.length).toFixed(1)+'%'
    : 'N/A';

  const initials = user?.name?.split(' ').map(n=>n[0]).join('') || '?';

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:'2rem'}}>
      <h1 style={{fontSize:'1.8rem',fontWeight:800,marginBottom:'2rem'}}>Profile</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'2rem'}}>
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <div style={{width:80,height:80,borderRadius:'50%',margin:'0 auto 12px',
              background:'linear-gradient(135deg,var(--accent),#059669)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'1.8rem',fontWeight:800,color:'#fff'}}>{initials}</div>
            <div style={{fontWeight:700,fontSize:'1.2rem'}}>{user?.name}</div>
            <div style={{color:'var(--accent)',fontSize:'0.85rem',marginTop:4}}>{user?.role || 'ASL Learner'}</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            {[{label:'Full Name',name:'name',type:'text'},{label:'Email',name:'email',type:'email'},{label:'New Password',name:'password',type:'password'}].map(field => (
              <div key={field.name}>
                <label style={{display:'block',fontSize:'0.8rem',color:'var(--text-muted)',marginBottom:6,fontWeight:600}}>{field.label}</label>
                <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange}
                  placeholder={field.name==='password'?'(leave blank to keep current)':''}
                  style={{width:'100%',padding:'10px 14px',borderRadius:8,
                    background:'var(--glass)',border:`1px solid ${errors[field.name]?'#ef4444':'var(--border)'}`,
                    color:'var(--text)',fontSize:'0.9rem',outline:'none',boxSizing:'border-box',fontFamily:'var(--font-main)'}} />
                {errors[field.name] && <div style={{color:'#ef4444',fontSize:'0.75rem',marginTop:4}}>{errors[field.name]}</div>}
              </div>
            ))}
            <button onClick={handleSave} style={{padding:11,borderRadius:10,
              background:saved?'#059669':'var(--accent)',color:'#fff',fontWeight:700,
              border:'none',fontSize:'0.95rem',cursor:'pointer',marginTop:4,
              transition:'background 0.3s',fontFamily:'var(--font-main)'}}>
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
            <h3 style={{fontWeight:700,marginBottom:'1rem'}}>Your Stats</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {[
                {label:'Total Detections',value:history.length},
                {label:'Most Recent Sign',value:history.length>0?history[0].name:'N/A'},
                {label:'Avg Confidence',value:avgConf},
              ].map(stat => (
                <div key={stat.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                  padding:'10px 14px',background:'var(--glass)',borderRadius:10,border:'1px solid var(--border)'}}>
                  <span style={{color:'var(--text-muted)',fontSize:'0.9rem'}}>{stat.label}</span>
                  <span style={{fontWeight:700,color:'var(--accent)'}}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

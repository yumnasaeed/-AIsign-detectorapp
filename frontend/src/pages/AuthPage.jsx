import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { validateForm } from '../utils/regex';

export default function AuthPage() {
  const { authMode, setAuthMode, authError, setAuthError, signup, login } = useApp();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});

  const handleSubmit = () => {
    setAuthError('');
    const fieldErrors = validateForm(
      authMode === 'signup' ? { name, email, password } : { email, password }
    );
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }
    setErrors({});
    if (authMode === 'signup') signup(name, email, password);
    else login(email, password);
  };

  const inp = (hasErr) => ({
    width:'100%', padding:'11px 14px', borderRadius:10, fontSize:'0.95rem',
    border: `1px solid ${hasErr ? '#ef4444' : 'var(--border)'}`,
    background:'var(--glass)', color:'var(--text)', outline:'none',
    boxSizing:'border-box', marginBottom: hasErr ? '4px' : '14px',
    fontFamily:'var(--font-main)',
  });

  const err = (msg) => msg ? (
    <div style={{color:'#ef4444',fontSize:'0.78rem',marginBottom:12}}>{msg}</div>
  ) : null;

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'var(--primary)',padding:'1rem'}}>
      <div style={{width:'100%',maxWidth:420,background:'var(--card)',borderRadius:20,
        padding:'2.5rem 2rem',border:'1px solid var(--border)',
        boxShadow:'0 20px 60px rgba(22,163,74,0.15)'}}>

        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'0.5rem'}}>🤟</div>
          <h2 style={{fontSize:'1.6rem',fontWeight:800,color:'var(--text)'}}>
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{color:'var(--text-muted)',fontSize:'0.9rem',marginTop:6}}>
            AI Sign Language Detector
          </p>
        </div>

        {authMode === 'signup' && (
          <>
            <input style={inp(errors.name)} placeholder="Full Name" value={name}
              onChange={e => { setName(e.target.value); setErrors(p=>({...p,name:''})); }} />
            {err(errors.name)}
          </>
        )}

        <input style={inp(errors.email)} placeholder="Email Address" type="email" value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p=>({...p,email:''})); }} />
        {err(errors.email)}

        <input style={inp(errors.password)} placeholder="Password" type="password" value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p=>({...p,password:''})); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        {err(errors.password)}

        {authError && (
          <div style={{color:'#ef4444',fontSize:'0.85rem',textAlign:'center',
            background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',
            borderRadius:8,padding:'8px 12px',marginBottom:14}}>
            {authError}
          </div>
        )}

        <button onClick={handleSubmit} style={{
          width:'100%',padding:'13px',borderRadius:10,border:'none',
          background:'var(--accent)',color:'#fff',fontWeight:700,fontSize:'1rem',
          cursor:'pointer',marginBottom:'1.25rem',fontFamily:'var(--font-main)',
        }}>
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </button>

        <p style={{textAlign:'center',color:'var(--text-muted)',fontSize:'0.9rem'}}>
          {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => { setAuthMode(authMode==='login'?'signup':'login'); setAuthError(''); setErrors({}); }}
            style={{color:'var(--accent)',cursor:'pointer',fontWeight:600}}>
            {authMode === 'login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

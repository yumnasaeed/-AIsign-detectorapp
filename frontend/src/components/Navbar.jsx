import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const navLinks = [
  {path:'/',label:'Home'},
  {path:'/detector',label:'Detector'},
  {path:'/library',label:'Sign Library'},
  {path:'/history',label:'History'},
];

export default function Navbar() {
  const { user, logout } = useApp();
  const location = useLocation();
  const initials = user?.name?.split(' ').map(n=>n[0]).join('') || '?';

  return (
    <nav style={{
      position:'sticky',top:0,zIndex:100,
      background:'rgba(255,255,255,0.95)',backdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)',
      padding:'0 2rem',height:64,
      display:'flex',alignItems:'center',justifyContent:'space-between',
    }}>
      <Link to="/" style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:36,height:36,borderRadius:10,background:'var(--accent-dim)',
          border:'1px solid var(--accent)',display:'flex',alignItems:'center',
          justifyContent:'center',fontSize:'1.2rem'}}>🤚</div>
        <span style={{fontWeight:700,fontSize:'1.05rem'}}>
          AI Sign <span style={{color:'var(--accent)'}}>Detector</span>
        </span>
      </Link>

      <div style={{display:'flex',gap:'2rem',alignItems:'center'}}>
        {navLinks.map(l => (
          <Link key={l.path} to={l.path} style={{
            color: location.pathname===l.path ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight:500,fontSize:'0.9rem',
            borderBottom: location.pathname===l.path ? '2px solid var(--accent)' : '2px solid transparent',
            paddingBottom:2,transition:'all 0.2s',
          }}>{l.label}</Link>
        ))}
      </div>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:36,height:36,borderRadius:'50%',
          background:'linear-gradient(135deg,var(--accent),#059669)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontWeight:700,fontSize:'0.85rem',color:'#fff'}}>{initials}</div>
        <span style={{fontSize:'0.9rem',fontWeight:500}}>{user?.name}</span>
        <button onClick={logout} style={{
          padding:'6px 14px',borderRadius:8,border:'1px solid var(--border)',
          background:'transparent',color:'var(--text-muted)',cursor:'pointer',
          fontSize:'0.8rem',fontFamily:'var(--font-main)',
        }}>Logout</button>
      </div>
    </nav>
  );
}

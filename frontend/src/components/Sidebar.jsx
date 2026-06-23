import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const navItems = [
  {path:'/detector',label:'Detector',icon:'🎯'},
  {path:'/library',label:'Sign Library',icon:'📚'},
  {path:'/history',label:'History',icon:'🕐'},
  {path:'/profile',label:'Profile',icon:'👤'},
];

export default function Sidebar() {
  const { user, logout } = useApp();
  const location = useLocation();
  const initials = user?.name?.split(' ').map(n=>n[0]).join('') || '?';

  return (
    <aside style={{
      width:220,flexShrink:0,background:'var(--card)',border:'1px solid var(--border)',
      borderRadius:16,padding:'1.5rem 1rem',display:'flex',flexDirection:'column',
      gap:'1.5rem',alignSelf:'flex-start',position:'sticky',top:80,
    }}>
      <div style={{textAlign:'center',padding:'0 0.5rem'}}>
        <div style={{width:52,height:52,borderRadius:'50%',margin:'0 auto 10px',
          background:'linear-gradient(135deg,var(--accent),#059669)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontWeight:700,fontSize:'1.1rem',color:'#fff'}}>{initials}</div>
        <div style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>Welcome Back,</div>
        <div style={{fontWeight:700,color:'var(--accent)'}}>{user?.name}</div>
      </div>

      <nav style={{display:'flex',flexDirection:'column',gap:4}}>
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{
              display:'flex',alignItems:'center',gap:10,
              padding:'10px 12px',borderRadius:10,
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? '#fff' : 'var(--text-muted)',
              fontWeight: active ? 600 : 400,fontSize:'0.9rem',transition:'all 0.2s',
            }}>
              <span>{item.icon}</span>{item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{marginTop:'auto',borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
        <button onClick={logout} style={{
          width:'100%',padding:'9px',borderRadius:10,
          background:'rgba(239,68,68,0.1)',color:'#ef4444',
          border:'1px solid rgba(239,68,68,0.2)',cursor:'pointer',
          fontWeight:600,fontSize:'0.85rem',fontFamily:'var(--font-main)',
        }}>Logout</button>
      </div>
    </aside>
  );
}

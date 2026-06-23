import { useState } from 'react';
import { useApp } from '../context/AppContext';
import SignCard from '../components/SignCard';

const EXTRA = [
  {id:9,name:'Good Morning',confidence:88,meaning:'A greeting used in the morning.',category:'Greeting',language:'ASL'},
  {id:10,name:'Water',confidence:90,meaning:'Referring to the liquid water.',category:'Noun',language:'ASL'},
  {id:11,name:'Food',confidence:87,meaning:'Referring to eating or food items.',category:'Noun',language:'ASL'},
  {id:12,name:'Family',confidence:91,meaning:'Referring to family members.',category:'Noun',language:'ASL'},
  {id:13,name:'Friend',confidence:89,meaning:'Referring to a close companion.',category:'Noun',language:'ASL'},
  {id:14,name:'Home',confidence:88,meaning:'Referring to a residence or home.',category:'Noun',language:'ASL'},
  {id:15,name:'School',confidence:87,meaning:'Referring to a place of education.',category:'Noun',language:'ASL'},
];

export default function SignLibrary() {
  const { MOCK_SIGNS } = useApp();
  const all = [...MOCK_SIGNS, ...EXTRA];
  const cats = ['All', ...new Set(all.map(s => s.category))];
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = all.filter(s => {
    const mc = cat === 'All' || s.category === cat;
    const ms = s.name.toLowerCase().includes(search.toLowerCase()) || s.meaning.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'2rem'}}>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.8rem',fontWeight:800}}>Sign Library</h1>
        <p style={{color:'var(--text-muted)',marginTop:4}}>Browse all American Sign Language signs</p>
      </div>

      <input
        type="text" placeholder="Search signs..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{
          width:'100%',maxWidth:480,padding:'10px 16px',borderRadius:10,
          background:'var(--card)',border:'1px solid var(--border)',
          color:'var(--text)',fontSize:'0.9rem',outline:'none',marginBottom:'1.5rem',
        }}
      />

      <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'2rem'}}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding:'6px 16px',borderRadius:20,cursor:'pointer',
            background: cat===c ? 'var(--accent)' : 'var(--card)',
            color: cat===c ? '#fff' : 'var(--text-muted)',
            border: `1px solid ${cat===c ? 'var(--accent)' : 'var(--border)'}`,
            fontSize:'0.85rem',fontWeight:500,transition:'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      <div style={{color:'var(--text-muted)',fontSize:'0.85rem',marginBottom:'1rem'}}>
        Showing {filtered.length} signs
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'1rem'}}>
        {filtered.map(sign => <SignCard key={sign.id} sign={sign} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:'center',padding:'4rem',color:'var(--text-muted)'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>🔍</div>
          <div style={{fontWeight:600}}>No signs found for "{search}"</div>
        </div>
      )}
    </div>
  );
}

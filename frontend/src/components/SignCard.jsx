const catColors = {
  Greeting: '#10b981', Expression: '#6366f1', Response: '#f59e0b',
  Request: '#ec4899', Polite: '#14b8a6', Noun: '#3b82f6', default: '#94a3b8',
};

const signEmoji = {
  'Hello': '👋', 'Thank You': '🙏', 'Yes': '✅', 'No': '❌', 'Please': '🫶', 'Sorry': '😔', 'Help': '🆘',
  'Good Morning': '🌅', 'Water': '💧', 'Food': '🍽️', 'Family': '👨‍👩‍👧',
  'Friend': '🤝', 'Home': '🏠', 'School': '🏫',
};

const signDesc = {
  'Hello': 'Wave open hand from forehead outward.',
  'Thank You': 'Touch chin with fingers, move hand forward.',
  'Yes': 'Fist bobs up and down like a nod.',
  'No': 'Index & middle finger tap thumb twice.',
  'Please': 'Flat hand rubs circle on chest.',
  'Sorry': 'Fist circles over heart.',
  'Help': 'Fist on palm, both hands lift up.',
  'Good Morning': 'Hand rises upward like the sun.',
  'Water': 'W-shape taps chin twice.',
  'Food': 'Fingertips tap lips.',
  'Family': 'F-hands circle outward to meet.',
  'Friend': 'Hooked index fingers link together.',
  'Home': 'Fingertips touch cheek twice.',
  'School': 'Flat hands clap twice.',
};

export default function SignCard({ sign }) {
  const color = catColors[sign.category] || catColors.default;
  const emoji = signEmoji[sign.name] || '🤚';
  const desc = signDesc[sign.name] || sign.meaning;

  return (
    <div
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '1.25rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.75rem', textAlign: 'center',
        transition: 'transform 0.2s,box-shadow 0.2s', cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: 16, fontSize: '2.4rem',
        background: `${color}20`, border: `1px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{emoji}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{sign.name}</div>
        <div style={{
          fontSize: '0.72rem', marginTop: 4, padding: '2px 8px', borderRadius: 20,
          background: `${color}20`, color, fontWeight: 600, display: 'inline-block',
        }}>{sign.category}</div>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

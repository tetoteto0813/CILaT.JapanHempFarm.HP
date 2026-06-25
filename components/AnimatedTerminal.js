import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedTerminal({ lines = [], loop = false, style = {} }) {
  const [displayed, setDisplayed] = useState([]); // lines already finished
  const [current, setCurrent] = useState(''); // current typing text
  const [index, setIndex] = useState(0);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false }, []);

  useEffect(() => {
    if (!lines || lines.length === 0) return;
    let cancelled = false;
    const typeLine = async (i) => {
      const line = lines[i];
      const text = line?.text ?? '';
      setCurrent('');
      for (let j = 0; j <= text.length; j++) {
        if (cancelled || !mounted.current) return;
        setCurrent(text.slice(0, j));
        // variable speed for realism
        // small pause on spaces
        // eslint-disable-next-line no-await-in-loop
        await new Promise(r => setTimeout(r, j % 7 === 0 ? 20 : 32));
      }
      if (!mounted.current) return;
      setDisplayed(prev => [...prev, line]);
      setCurrent('');
      // wait a bit before next
      await new Promise(r => setTimeout(r, line.delayAfter ?? 500));
      const next = i + 1;
      if (next < lines.length) {
        setIndex(next);
        typeLine(next);
      } else if (loop) {
        // restart after short pause
        await new Promise(r => setTimeout(r, 800));
        if (!mounted.current) return;
        setDisplayed([]);
        setIndex(0);
        typeLine(0);
      }
    };
    // start
    setDisplayed([]);
    setIndex(0);
    typeLine(0);
    return () => { cancelled = true };
  }, [lines, loop]);

  const renderLine = (line, i) => {
    const common = { margin: 0, padding: 0 };
    if (line.type === 'cmd') {
      return (
        <div key={i} style={{ ...common }}>
          <span style={{ color: '#6ee7b7', marginRight: 6 }}>$</span>
          <span style={{ color: '#cfe8ff' }}>{line.text}</span>
        </div>
      );
    }
    if (line.type === 'info') {
      return (
        <div key={i} style={{ ...common }}>
          <span style={{ color: '#60a5fa', fontWeight: 700 }}>INFO</span>
          <span style={{ color: '#cfe8ff', marginLeft: 8 }}>{line.text.replace(/^INFO\s+/, '')}</span>
        </div>
      );
    }
    if (line.type === 'warn') {
      return (
        <div key={i} style={{ ...common }}>
          <span style={{ color: '#fca5a5', fontWeight: 700 }}>WARN</span>
          <span style={{ color: '#cfe8ff', marginLeft: 8 }}>{line.text.replace(/^WARN\s+/, '')}</span>
        </div>
      );
    }
    return <div key={i} style={common}>{line.text}</div>;
  };

  return (
    <div style={{ width: 'min(980px,90%)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 12px 40px rgba(2,6,23,0.6)', border: '1px solid rgba(255,255,255,0.04)', ...style }}>
      <div style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(0,0,0,0.06))', padding: '12px 16px', color: '#9fb4d5', fontFamily: 'monospace', fontSize: '0.92rem' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, background: '#ff5f56', borderRadius: 999 }} />
          <span style={{ width: 10, height: 10, background: '#ffbd2e', borderRadius: 999 }} />
          <span style={{ width: 10, height: 10, background: '#27c93f', borderRadius: 999 }} />
        </div>
      </div>
      <div style={{ background: '#071025', color: '#9fb4d5', padding: 18, fontFamily: 'monospace', fontSize: '0.95rem', minHeight: 140 }}>
        <div style={{ lineHeight: 1.6 }}>
          {displayed.map((l, i) => renderLine(l, i))}
          {/* current typing line */}
          {current !== '' && (
            <div style={{ marginTop: 0 }}>
              <span style={{ color: '#6ee7b7', marginRight: 6 }}>$</span>
              <span style={{ color: '#cfe8ff' }}>{current}</span>
              <span style={{ display: 'inline-block', width: 10, marginLeft: 6, background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.05))', height: 14, verticalAlign: 'middle', animation: 'blink 1s steps(2,start) infinite' }} />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes blink { from { opacity: 1 } to { opacity: 0 } }
      `}</style>
    </div>
  );
}

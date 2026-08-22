import React, {useState, useRef, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Gallery({items, onAddFiles}){
  const [active, setActive] = useState(null)
  const scrollerRef = useRef(null)
  const rafRef = useRef(null)
  const lastRef = useRef(0)
  const pausedRef = useRef(false)
  const [autoScroll, setAutoScroll] = useState(false)
  const [targetSpeed, setTargetSpeed] = useState(80) // px per second
  const currentSpeedRef = useRef(0)

  useEffect(()=>{
    const el = scrollerRef.current
    if(!el) return
    const onEnter = ()=> pausedRef.current = true
    const onLeave = ()=> pausedRef.current = false
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return ()=>{
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(()=>{
    let running = true
    lastRef.current = 0

    const step = (ts)=>{
      if(!running) return
      if(!lastRef.current) lastRef.current = ts
      const delta = ts - lastRef.current
      lastRef.current = ts

      // smooth ramp current speed towards targetSpeed when autoScroll on, else ramp down
      const target = autoScroll ? targetSpeed : 0
      const cur = currentSpeedRef.current
      // lerp factor based on delta (fast response)
      const t = Math.min(1, delta / 300)
      const next = cur + (target - cur) * t
      currentSpeedRef.current = next

      if(!pausedRef.current && el.scrollWidth > el.clientWidth){
        el.scrollLeft += next * (delta/1000)
        if(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1){
          el.scrollLeft = 0
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return ()=>{ running = false; cancelAnimationFrame(rafRef.current); lastRef.current = 0 }
  }, [autoScroll, targetSpeed])

  const handleAdd = (files)=> onAddFiles(files)

  // simplified: no presets or premium boost — classic, clean controls

  return (
    <div className="gallery">
      <div className="gallery-actions">
        <label className="btn">Add files (temp preview)
          <input type="file" multiple accept="image/*,video/*,audio/*" onChange={(e)=>handleAdd(Array.from(e.target.files))} />
        </label>
        <div className="auto-controls">
          <label className="auto-toggle"><input type="checkbox" checked={autoScroll} onChange={(e)=>setAutoScroll(e.target.checked)} /> Auto-scroll</label>
        </div>
        <small className="hint">Place permanent files in <code>/public/media/</code> and update <code>src/media.js</code>.</small>
      </div>

        <div className="scroller-wrap">
        <div className="scroller" ref={scrollerRef}>
          {items.map(it => (
            <motion.div key={it.id} layout whileHover={{ scale: 1.02 }} className="card-thumb" onClick={()=>setActive(it)}>
              {it.type === 'image' && <img loading="lazy" src={it.src} alt={it.title} />}
              {it.type === 'video' && <video loading="lazy" src={it.src} muted playsInline />}
              {it.type === 'audio' && <div className="audio-thumb">🎵 {it.title}</div>}
              <div className="caption">{it.title}</div>
            </motion.div>
          ))}
        </div>
        </div>
        <div className="edge left" aria-hidden></div>
        <div className="edge right" aria-hidden></div>

      <AnimatePresence>
        {active && (
          <motion.div className="media-modal" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={()=>setActive(null)}>
            <motion.div className="media-card" initial={{ scale:0.96 }} animate={{ scale:1 }} exit={{ scale:0.96 }} onClick={e=>e.stopPropagation()}>
              <button className="close" onClick={()=>setActive(null)}>×</button>
              <h3>{active.title}</h3>
              {active.type === 'image' && <img src={active.src} alt={active.title} />}
              {active.type === 'video' && <video src={active.src} controls autoPlay />}
              {active.type === 'audio' && <audio src={active.src} controls autoPlay />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

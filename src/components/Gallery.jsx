import React, {useState, useRef, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Gallery({items, onAddFiles}){
  const [active, setActive] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (items.length === 0) {
      setCurrentIndex(0)
      return
    }

    setCurrentIndex((prev) => Math.min(prev, items.length - 1))
  }, [items.length])

  const handleAdd = (files)=> onAddFiles(files)

  const hasItems = items.length > 0
  const currentItem = hasItems ? items[currentIndex] : null

  const goToPrevious = () => {
    if (!hasItems) return
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (!hasItems) return
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div className="gallery">
      <div className="gallery-actions">
        <label className="btn">Add files (temp preview)
          <input type="file" multiple accept="image/*,video/*,audio/*" onChange={(e)=>handleAdd(Array.from(e.target.files))} />
        </label>
        <small className="hint">Place permanent files in <code>/public/media/</code> and update <code>src/media.js</code>.</small>
      </div>

      {hasItems ? (
        <div className="gallery-showcase">
          <div className="showcase-header">
            <div>
              <p className="eyebrow soft">Memory spotlight</p>
              <h3>{currentItem.title}</h3>
            </div>

            <div className="showcase-nav">
              <button type="button" className="nav-button" onClick={goToPrevious} aria-label="Previous memory">←</button>
              <button type="button" className="nav-button" onClick={goToNext} aria-label="Next memory">→</button>
            </div>
          </div>

          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="featured-media"
            onClick={() => setActive(currentItem)}
          >
            {currentItem.type === 'image' && <img loading="lazy" src={currentItem.src} alt={currentItem.title} />}
            {currentItem.type === 'video' && <video loading="lazy" src={currentItem.src} muted playsInline autoPlay loop />}
            {currentItem.type === 'audio' && <div className="audio-thumb feature-audio">🎵 {currentItem.title}</div>}
            <div className="floating-gallery-hearts" aria-hidden="true">
              <span>♥</span>
              <span>♡</span>
              <span>♥</span>
              <span>♡</span>
              <span>♥</span>
            </div>
          </motion.div>

          <div className="thumb-strip">
            {items.map((it, index) => (
              <button
                key={it.id}
                type="button"
                className={`thumb-chip ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                {it.type === 'image' && <img loading="lazy" alt={it.title} src={it.src} />}
                {it.type === 'video' && <video loading="lazy" muted playsInline src={it.src} />}
                {it.type === 'audio' && <span className="mini-audio">♫</span>}
                <span className="thumb-label">{it.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-gallery">No memories yet. Add your first photo or video.</div>
      )}

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

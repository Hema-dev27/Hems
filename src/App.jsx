import React, {useState} from 'react'
import { motion } from 'framer-motion'
import Gallery from './components/Gallery'
import AudioPlayer from './components/AudioPlayer'
import initialMedia from './media'

function HeartSvg(){
  return (
    <svg viewBox="0 0 24 24" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s-7-4.35-9.5-7.2C-0.2 9.6 3 4 7.5 5.6 9.6 6.3 11 8.2 12 9.4c1-1.2 2.4-3.1 4.5-3.8C21 4 24.2 9.6 21.5 13.8 19 16.65 12 21 12 21z" fill="var(--accent)" />
    </svg>
  )
}

export default function App(){
  const [media, setMedia] = useState(initialMedia)
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'letters', label: 'Love Letters' },
    { id: 'more', label: 'More Memories' }
  ]
  const [activeTab, setActiveTab] = useState('all')

  const addFiles = (files)=>{
    // create temporary object URLs for immediate preview (not persisted)
    const created = files.map((f, idx)=>{
      const type = f.type.startsWith('image') ? 'image' : f.type.startsWith('video') ? 'video' : 'audio'
      return { id: `local-${Date.now()}-${idx}`, type, src: URL.createObjectURL(f), title: f.name }
    })
    setMedia(m=>[...created, ...m])
  }

  const imageItems = media.filter(m=>m.type==='image')
  const audioItems = media.filter(m=>m.type==='audio')

  return (
    <div className="page">

      <div className="scene">
        <div className="card">
          <h1 className="title">For My Love</h1>
          <p className="subtitle">A little site to celebrate you — photos, memories, and more.</p>
          <div className="badge">Together — Forever</div>
        </div>

        <motion.div className="floating-blob" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} />

        <motion.div className="heart" style={{ left: '12%', top: '62%', transform: 'scale(1)' }} animate={{ y: [0, -16, 0], opacity: [0,1,1,0] }} transition={{ duration:9, repeat: Infinity, delay:0 }}>
          <HeartSvg />
        </motion.div>
        <motion.div className="heart" style={{ left: '30%', top: '22%', transform: 'scale(1.1)' }} animate={{ y: [0, -20, 0], opacity: [0,1,1,0] }} transition={{ duration:10, repeat: Infinity, delay:1.2 }}>
          <HeartSvg />
        </motion.div>
        <motion.div className="heart" style={{ right: '18%', top: '34%', transform: 'scale(0.9)' }} animate={{ y: [0, -14, 0], opacity: [0,1,1,0] }} transition={{ duration:8, repeat: Infinity, delay:0.6 }}>
          <HeartSvg />
        </motion.div>

      </div>

      <div className="content">
        <div className="tabs">
          {tabs.map(t => (
            <button key={t.id} className={`tab-button ${activeTab===t.id? 'active':''}`} onClick={()=>setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'all' && (
            <section>
              <h2>All Media</h2>
              <Gallery items={media} onAddFiles={addFiles} />
            </section>
          )}

          {activeTab === 'photos' && (
            <section>
              <h2>Photos</h2>
              <Gallery items={media.filter(m=>m.type==='image')} onAddFiles={addFiles} />
            </section>
          )}

          {activeTab === 'videos' && (
            <section>
              <h2>Videos</h2>
              <Gallery items={media.filter(m=>m.type==='video')} onAddFiles={addFiles} />
            </section>
          )}

          {activeTab === 'letters' && (
            <section>
              <h2>Love Letters</h2>
              <div className="letters">
                <article className="letter">
                  <h3>To my love</h3>
                  <p>I still remember the first time we met — warm, effortless, like the world folded into one perfect moment. This little site is for our memories.</p>
                </article>
                <div className="letter-form">
                  <label>Write a new letter
                    <textarea placeholder="Write your love letter here..." />
                  </label>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'more' && (
            <section>
              <h2>More Memories</h2>
              <p className="lead">Short clips and candid moments. Use the 'Add files' button in each gallery to preview additional content.</p>
              <Gallery items={media.slice(0,8)} onAddFiles={addFiles} />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

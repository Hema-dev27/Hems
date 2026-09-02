import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Gallery from './components/Gallery'
import initialMedia from './media'

const reasons = [
  'Your smile makes my whole world feel lighter.',
  'You make even ordinary days feel special.',
  'Your calm heart makes me feel safe and at home.',
  'I love how easy it is to be my real self with you.',
  'You are my favorite person to laugh with and dream with.'
]

const favoriteMoments = [
  { title: 'The first time we clicked', detail: 'Like two pieces of a quiet, beautiful story finally meeting.', image: '/media/us.jpg' },
  { title: 'Our laughter', detail: 'The kind that softens the world and turns small moments into memories.', image: '/media/us.jpg' },
  { title: 'Our calm dates', detail: 'The simple times were the ones that stayed with me the longest.', image: '/media/us.jpg' },
  { title: 'Every little “us” moment', detail: 'Because love is not just big gestures — it is the feeling of being chosen.', image: '/media/us.jpg' }
]

function HeartSvg() {
  return (
    <svg viewBox="0 0 24 24" width="72" height="72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 21s-7-4.35-9.5-7.2C-0.2 9.6 3 4 7.5 5.6 9.6 6.3 11 8.2 12 9.4c1-1.2 2.4-3.1 4.5-3.8C21 4 24.2 9.6 21.5 13.8 19 16.65 12 21 12 21z" fill="currentColor" />
    </svg>
  )
}

export default function App() {
  const [media, setMedia] = useState(initialMedia)
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'letters', label: 'Love Letter' },
    { id: 'more', label: 'More Memories' }
  ]

  const [activeTab, setActiveTab] = useState('all')

  const addFiles = (files) => {
    const created = files.map((f, idx) => {
      const type = f.type.startsWith('image') ? 'image' : f.type.startsWith('video') ? 'video' : 'audio'
      return { id: `local-${Date.now()}-${idx}`, type, src: URL.createObjectURL(f), title: f.name }
    })
    setMedia((current) => [...created, ...current])
  }

  const renderGallery = (items) => <Gallery items={items} onAddFiles={addFiles} />

  return (
    <div className="page-shell">
      <div className="sparkles" aria-hidden="true" />

      <header className="hero section-shell">
        <div className="floating-tag">Made with love</div>
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          whileHover={{ rotateX: 3, rotateY: -3, y: -4 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <p className="eyebrow">Happy Birthday, My Love</p>
          <h1>In Every Universe , Every Version of ME loves Every Version of YOU.</h1>
          <p className="lead">
            I think every last time we met , I did something for the first time. I don't know you deeply when i said yes, But you gave me every reason to thank God for that decision and vice versa 😂😁😉
          </p>

          <div className="hero-actions">
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} type="button" className="primary-btn" onClick={() => setActiveTab('all')}>Open our memories</motion.button>
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} type="button" className="secondary-btn" onClick={() => setActiveTab('letters')}>Read my note</motion.button>
          </div>

          <div className="mini-stats">
            <div>
              <strong>365</strong>
              <span>days I love you</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>reasons to stay</span>
            </div>
            <div>
              <strong>Us</strong>
              <span>my favorite forever</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          whileHover={{ rotateY: 3, rotateX: -4, y: -6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="photo-frame">
            <div className="frame-glow" />
            <div
              className="portrait-card"
              style={{ backgroundImage: "linear-gradient(180deg, rgba(138, 61, 75, 0.15), rgba(127, 157, 138, 0.18)), url('/media/us.jpg')" }}
            >
              <span className="portrait-badge">You + I</span>
              <h2>Forever looks beautiful with you.</h2>
            </div>
          </div>

          <motion.div className="floating-heart heart-one" animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 6, repeat: Infinity }}>
            <HeartSvg />
          </motion.div>
          <motion.div className="floating-heart heart-two" animate={{ y: [0, -16, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}>
            <HeartSvg />
          </motion.div>
        </motion.div>
      </header>

      <main className="content">
        <section className="story-grid section-shell">
          <article className="message-card">
            <p className="eyebrow soft">For my favorite human</p>
            <h3>Sometimes medicine is the person</h3>
            <p>
              Loving you quietly is the loudest thing i ever did ,And no body heard it ,Not even you ,
              Probably not even me ,But i know it was there somewhere ,Somewhere in the depth of my heart ,Somewhere in the depth of my mind ,Somewhere in the depth of my being ,Somewhere in the depth of my existence.
            </p>
            <p>
              Every minute i spent with you is tattooed in my brain
            </p>
          </article>

          <aside className="reasons-card">
            <p className="eyebrow soft">Why I adore you</p>
            <ul>
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="moments section-shell">
          <div className="section-heading">
            <p className="eyebrow">Our favorite little moments</p>
            <h3>Love is built in the small things.</h3>
          </div>

          <div className="moments-grid">
            {favoriteMoments.map((moment) => (
              <div className="moment-card" key={moment.title}>
                <img className="moment-image" src={moment.image} alt={moment.title} />
                <span>{moment.title}</span>
                <p>{moment.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="gallery-panel section-shell">
          <div className="tabs" role="tablist" aria-label="Memory sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'all' && <section><h2>All memories</h2>{renderGallery(media)}</section>}
            {activeTab === 'photos' && <section><h2>Photos</h2>{renderGallery(media.filter((item) => item.type === 'image'))}</section>}
            {activeTab === 'videos' && <section><h2>Videos</h2>{renderGallery(media.filter((item) => item.type === 'video'))}</section>}
            {activeTab === 'letters' && (
              <section>
                <h2>Love note</h2>
                <div className="letters">
                  <article className="letter">
                    <h3>Dear my love,</h3>
                    <p>
                      Happy birthday to you, my favorite person. Thank you for being the calm in my chaos, the light in my quietest
                      moments, and the beautiful reason my heart feels so full.
                    </p>
                    <p>
                      I hope this year brings you all the peace, laughter, adventure, and love you deserve. I am so lucky to be
                      walking through life beside you.
                    </p>
                    <p>Forever yours, always.</p>
                  </article>

                  <div className="letter-form">
                    <label>
                      Write a little note for your love
                      <textarea placeholder="I love you more than words can say..." />
                    </label>
                  </div>
                </div>
              </section>
            )}
            {activeTab === 'more' && <section><h2>More memories</h2><p className="lead">A few more moments of us, captured in the way only love can be remembered.</p>{renderGallery(media.slice(0, 8))}</section>}
          </div>
        </section>
      </main>
    </div>
  )
}

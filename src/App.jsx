import React from 'react'
import { motion } from 'framer-motion'

const Leaf = ({style, delay = 0}) => (
  <motion.div
    className="leaf"
    style={style}
    animate={{ y: [0, -40, 0], rotate: [0, 10, -10, 0], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay }}
  >
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 32c0 0 18-26 34-18 16 8 24 28 24 28s-24 14-40 6C8 44 2 32 2 32z" fill="#2f7a3e" />
      <path d="M12 34c10-6 20-4 28 2" stroke="#19692f" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  </motion.div>
)

export default function App() {
  return (
    <div className="page">
      <div className="scene">
        <div className="card">
          <h1 className="title">Happy Birthday</h1>
          <p className="subtitle">To my love — lush, green, and full of life.</p>
        </div>

        <Leaf style={{ left: '10%', top: '60%', transform: 'scale(0.9)' }} delay={0} />
        <Leaf style={{ left: '25%', top: '20%', transform: 'scale(1.1)' }} delay={1.2} />
        <Leaf style={{ right: '18%', top: '30%', transform: 'scale(0.8)' }} delay={0.6} />
        <Leaf style={{ left: '60%', top: '70%', transform: 'scale(1.2)' }} delay={2} />

        <motion.div className="floating-blob" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} />
      </div>
    </div>
  )
}

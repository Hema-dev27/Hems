import  {useState, useRef, useEffect} from 'react'

export default function AudioPlayer({tracks=[]}){
  const [index, setIndex] = useState(0)
  const audioRef = useRef(null)

  useEffect(()=>{
    if(audioRef.current){
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play().catch(()=>{})
    }
  }, [index])

  if(tracks.length===0) return null

  const next = ()=> setIndex((i)=> (i+1) % tracks.length)

  return (
    <div className="audio-player">
      <div className="track-info">Now playing: <strong>{tracks[index].title}</strong></div>
      <audio ref={audioRef} controls onEnded={next}>
        <source src={tracks[index].src} />
        Your browser does not support the audio element.
      </audio>
      <div className="playlist">
        {tracks.map((t, i)=> (
          <button key={t.id} className={i===index? 'active':''} onClick={()=>setIndex(i)}>{t.title}</button>
        ))}
      </div>
    </div>
  )
}

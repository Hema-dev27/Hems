// manifest of user media stored in /public/media or added via the in-app uploader (temporary)
// Edit this list to include your own files (filenames under public/media)
const initialMedia = [
  { id: 'img-1', type: 'image', src: '/media/us.jpg', title: 'Us' },
  { id: 'img-2', type: 'image', src: '/media/HemsBirthday.jpg', title: 'A Day to Remember' },
  { id: 'img-3', type: 'image', src: '/media/Yard.jpg', title: 'First Pic Together' },
  { id: 'vid-1', type: 'video', src: '/media/clip1.mp4', title: 'Our moment' },
  { id: 'aud-1', type: 'audio', src: '/media/song1.mp3', title: 'Birthday song' }
]

export default initialMedia

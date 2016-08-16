import Progress from '../src/progress.js'
import './style.css'

const stop = document.querySelector('button')

const progress = new Progress({

})


progress.on('init', () => {
  console.log('init')
})

progress.on('start', () => {
  console.log('start')
})

progress.on('progress', () => {
  console.log('progress')
})

progress.start()
console.log(progress)

stop.addEventListener('click', () => {
  progress.end()
})

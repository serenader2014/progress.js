import Progress from '../src/progress.js'
import './style.css'

const stop = document.querySelector('button')

const progress = new Progress({

})

function randomNumber(length) {
  return Math.floor(Math.random() * length)
}

progress.on('start', () => {
  console.log('start')
})

progress.on('progress', (p) => {
  console.log('progress', p)
  progress.setColor(`rgb(${randomNumber(255)},${randomNumber(255)},${randomNumber(255)})`)
})

progress.start()
console.log(progress)

stop.addEventListener('click', () => {
  progress.end()
})

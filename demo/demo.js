import Progress from '../src/progress.js'
import './style.css'

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
progress.increase(true)
console.log(progress)

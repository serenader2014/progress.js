import './progress.css'

const defaultOption = {
  color: 'blue'
}

export default class Progress {
  constructor(options) {
    this.options = Object.assign({}, defaultOption, options)
  }
}


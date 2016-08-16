/* eslint-disable no-underscore-dangle */
import extend from './extend'
import * as color from './color'
import './progress.css'

const body = document.querySelector('body')

const defaultOption = {
  element: body,
  position: 'top',
  color: 'rgb(2, 141, 192)'
}

let instanceCount = 0

export default class Progress {
  constructor(options) {
    instanceCount++
    this.options = extend({}, defaultOption, options)
    this.percent = 0
    this.id = instanceCount
    this._intervalHandler = null
    this.status = 'waiting'
    this.callbacks = {}
    this.init()
  }

  init() {
    let position = 'fixed'
    let display = 'block'
    let top = 0
    let bottom = 'auto'
    let highlight = 'rotate(2deg) translate(0,-4px);'

    if (this.options.element !== body) {
      position = 'absolute'
      display = 'none'
    }

    if (this.options.position === 'bottom') {
      top = 'auto'
      bottom = 0
      highlight = 'rotate(-2deg) translate(0,1px)'
    }

    const tmpl = `
      <div class="progress-main">
        <span class="progress-bar">
          <span class="progress-bar-inner"></span>
        </span>
        <span class="progress-circle"></span>
        <style>
            .progress-wrapper{
              position: ${position};
              top: ${top};
              bottom: ${bottom};
            }
            .progress-main{
              top: ${top};
              bottom: ${bottom};
            }
            .progress-bar-inner{
              -webkit-transform: ${highlight};
              -moz-transform: ${highlight};
              -ms-transform: ${highlight};
              -o-transform: ${highlight};
              transform: ${highlight};
            }
            .progress-circle{
              display:${display};
            }
        </style>
      </div>
      `
    this.element = document.createElement('div')
    this.element.innerHTML = tmpl
    this.element.className = 'progress-wrapper'
    this.setColor(this.options.color)
    this.options.element.appendChild(this.element)
    this.trigger('init')
  }

  start() {
    if (~['loading', 'prohibit'].indexOf(this.status)) return

    this.status = 'loading'

    this._intervalHandler = setInterval(() => {
      this.percent = this.percent + Math.floor(Math.random() * 5)
      if (this.percent > 98) {
        this.percent = 98
        this.stop()
      }
      this.set(this.percent)
    }, 400)

    this.trigger('start')
    if (this.options.autoIncrease) this.increase(true)
  }

  stop() {
    if (this._intervalHandler) {
      clearInterval(this._intervalHandler)
      this._intervalHandler = null
    }
    this.trigger('stop')
  }

  set(percent) {
    if (this.status !== 'loading') return

    this.percent = percent
    extend(this.element.querySelector('.progress-bar').style, {
      width: `${this.percent}%`
    })
    this.trigger('progress')
  }

  end() {
    if (this.status !== 'loading') return

    this.stop()
    this.set(100)
    this._autoIncrease = false
    setTimeout(() => {
      let opacity = 1
      const handler = setInterval(() => {
        extend(this.element.style, {
          opacity
        })
        if (opacity <= 0) {
          clearInterval(handler)
          this.percent = 0
          this.status = 'waiting'
          this.element.parentNode.removeChild(this.element)
          this.trigger('end')
        }
        opacity -= 0.1
      }, 50)
    }, 400)
  }

  setColor(c) {
    if (!c) return

    let rgb
    let hex
    if (c[0] === '#') {
      rgb = color.hexToRgb(c)
      hex = c
    } else {
      rgb = c.match(/\((.*)\)/)[1]
      hex = color.rgbToHex(c)
    }

    this.options.color = hex
    extend(this.element.querySelector('.progress-bar').style, {
      background: hex,
      boxShadow: `0 0 10px 0 rgba(${rgb}, 0.5)`
    })
    extend(this.element.querySelector('.progress-bar-inner').style, {
      background: hex,
      boxShadow: `0 0 10px rgba(${rgb},0.5)`
    })
    extend(this.element.querySelector('.progress-circle').style, {
      borderBottomColor: hex,
      borderLeftColor: hex
    })
    this.trigger('setColor')
  }

  on(name, fn, context) {
    if (!this.callbacks[name] || !this.callbacks[name].length) {
      this.callbacks[name] = [{
        fn,
        context: context || this
      }]
    } else {
      this.callbacks[name].push({
        fn,
        context: context || this
      })
    }
  }

  trigger(name) {
    if (!this.callbacks[name] || !this.callbacks[name].length) return

    this.callbacks[name].forEach(cb => cb.fn.call(cb.context))
  }

}

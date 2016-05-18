import { h } from '../util/hyper'

import Bar from '../components/bar/Bar'


export default class Sort {
  state: any
  element: any

  animations: any[]
  animationTime: number
  barWidth: number

  constructor ({
    data,
    animationTime = 1000,
    barWidth = 50
  }: {
    data: any[],
    animationTime?: number,
    barWidth?: number
  }) {
    this.animationTime = animationTime
    this.barWidth = barWidth

    this.state = data.map((d, i) => ({
      value: d,
      key: `groove-bar-${i}`}
    ))

    this.element = this.render()
  }

  // set background color for bar
  style (index, color) {
    const { element, state } = this
    element.querySelector(`[data-key=${state[index].key}]`)
      .style['background'] = color
  }

  unstyle (index) {
    const { element, state } = this
    element.querySelector(`[data-key=${state[index].key}]`)
      .style['background'] = ''
  }

  // render the DOM
  render () {
    return h('div.groove-bars-container', {}, this.state
      .reduce((prev, current, index) => {
        const bar = new Bar({
          value: current.value,
          key: current.key,
          style: `left: ${index * this.barWidth}px;`,
          animationTime: this.animationTime / 1000,
          barWidth: this.barWidth,
        })

        prev.appendChild(bar.element)
        return prev
      }, document.createDocumentFragment())
    )
  }

  queryByIndex (index: number) {
    const { element, state } = this
    return element.querySelector(`[data-key=${state[index].key}]`)
  }

  play () {
    const intervalId = setInterval(() => {
      if (this.animations.length === 0) {
        clearInterval(intervalId)
        return
      }
      this.animations.shift()()
    }, this.animationTime)
  }
}
import { h } from '../util/hyper'
import { swap } from '../util/array'
import { sleep } from '../util/async'

import {
  query,
  getLeft,
} from '../util/dom'

import {
  COLOR_GREEN,
  COLOR_BLUE,
  COLOR_ORANGE,
  COLOR_PINK,
} from '../util/constant'

import Bar from '../components/bar/Bar'
import Sort from './Sort'

export default class SelectionSort extends Sort {
  constructor ({
    data,
    animationTime,
    barWidth,
  }: {
    data: any[],
    animationTime?: number,
    barWidth?: number
  }) {
    super({
      data,
      animationTime,
      barWidth
    })

    this.element = this.render()
  }

  // selection sort
  async sort () {
    const { state, element, animationTime } = this

    for (let i = 0; i < state.length - 1; i++) {
      let minIndex = i
      this.style(minIndex, COLOR_ORANGE)
      await sleep(animationTime)

      for (let j = i + 1; j < state.length; j++) {
        this.style(j, COLOR_PINK)
        await sleep(animationTime)

        // find the index of the minimum value
        if (state[j].value < state[minIndex].value) {
          this.unstyle(minIndex)
          this.style(j, COLOR_ORANGE)
          minIndex = j
        } else {
          this.unstyle(j)
        }

        await sleep(animationTime)
      }

      // swap position and value
      this.swap(i, minIndex)
      swap(i, minIndex, state)
      this.style(i, COLOR_GREEN)
      await sleep(animationTime)
    }

    // style the last one
    this.style(state.length - 1, COLOR_GREEN)
  }

  // swap two bar position. by changing `left` property
  swap (i: number, minIndex: number) {
    const { element, state, animationTime } = this

    // find the element using `data-key` value
    const item1 = element.querySelector(`[data-key=${state[i].key}]`)
    item1.style.left = `${(minIndex - i) * this.barWidth + getLeft(item1)}px`

    const item2  = element.querySelector(`[data-key=${state[minIndex].key}]`)
    item2.style.left = `${-(minIndex - i) * this.barWidth + getLeft(item2)}px`;
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
    return h('div.bar', {}, this.state
      .reduce((prev, current) => {
        const bar = new Bar({
          value: current.value,
          key: current.key,
          animationTime: this.animationTime / 1000,
          barWidth: this.barWidth
        })

        prev.appendChild(bar.element)
        return prev
      }, document.createDocumentFragment())
    )
  }
}

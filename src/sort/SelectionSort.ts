import { h } from '../util/hyper'
import { swap } from '../util/array'
import { sleep } from '../util/async'
import {
  query,
  getLeft,
} from '../util/dom'

import Bar from '../components/bar/Bar'
import Sort from './Sort'

export default class SelectionSort extends Sort {
  state: any
  element: any
  children: any[] = []

  constructor (data: number[]) {
    super()

    this.state = data.map((d, i) => ({
      value: d,
      key: `groove-bar-${i}`}
    ))

    this.element = this.render()
  }

  async sort () {
    const { state, element, animationTime } = this

    for (let i = 0; i < state.length - 1; i++) {
      let minIndex = i
      this.style(minIndex, 'orange')
      await sleep(animationTime)

      for (let j = i + 1; j < state.length; j++) {
        this.style(j, 'pink')
        await sleep(animationTime)

        if (state[j].value < state[minIndex].value) {
          this.unstyle(minIndex)
          this.style(j, 'orange')
          minIndex = j
        } else {
          this.unstyle(j)
        }

        await sleep(animationTime)
      }

      this.swap(i, minIndex)
      swap(i, minIndex, state)
      this.style(i, '#57A769')

      await sleep(animationTime)
    }
    this.style(state.length - 1, '#57A769')
  }

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

  swap (i: number, minIndex: number) {
    const { element, state, animationTime } = this

    const item1 = element.querySelector(`[data-key=${state[i].key}]`)
    item1.style.left = `${(minIndex - i) * 20 + getLeft(item1)}px`

    const item2  = element.querySelector(`[data-key=${state[minIndex].key}]`)
    item2.style.left = `${-(minIndex - i) * 20 + getLeft(item2)}px`;
  }

  render () {
    return h('div.bar', {}, this.state
      .reduce((prev, current) => {
        const bar = new Bar(current.value, current.key, this.animationTime / 1000)

        this.children.push(bar)
        prev.appendChild(bar.element)

        return prev
      }, document.createDocumentFragment())
    )
  }
}

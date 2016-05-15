import { swap } from '../util/array'
import { getLeft } from '../util/dom'

import {
  COLOR_GREEN,
  COLOR_BLUE,
  COLOR_ORANGE,
  COLOR_PINK,
} from '../util/constant'

import { sleep } from '../util/async'

import Sort from './Sort'

export default class InsertSort extends Sort {
  constructor ({
    data
  }: {
    data: number[]
  }) {
    super({ data })
  }

  async sort () {
    const { state } = this

    for (let i = 0; i < state.length; i++) {
      const tmp = state[i].value

      await sleep(this.animationTime)
      this.style(i, COLOR_ORANGE)
      this.pullOut(i)
      await sleep(this.animationTime)

      let j = 0  // we need it after loop
      for (j = i - 1; j >= 0 && state[j].value > tmp; j--) {
        this.style(j, COLOR_PINK)
        await sleep(this.animationTime)

        this.swap(j, j + 1)
        swap(j, j + 1, state)
        await sleep(this.animationTime)

        this.style(j + 1, COLOR_GREEN)
        await sleep(this.animationTime)
      }

      this.style(j + 1, COLOR_GREEN)
      this.pushIn(j + 1)
      await sleep(this.animationTime)
    }
  }

  // pull the bar out
  pullOut (index: number) {
    const item = this.queryByIndex(index)
    item.style.top = `${+item.style.height.slice(0, -2) + 42}px`
  }
  pushIn (index: number) {
    const item = this.queryByIndex(index)
    item.style.top = 0
  }

  // swap two bar position. by changing `left` property
  swap (i: number, j: number) {
    const item1 = this.queryByIndex(i)
    item1.style.left = `${this.barWidth + getLeft(item1)}px`

    const item2  = this.queryByIndex(j)
    item2.style.left = `${-this.barWidth + getLeft(item2)}px`
  }
}
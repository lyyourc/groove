import { swap } from '../util/array'
import { getLeft } from '../util/dom'
import { sleep } from '../util/async'

import {
  COLOR_GREEN,
  COLOR_BLUE,
  COLOR_ORANGE,
  COLOR_PINK,
} from '../util/constant'

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

      // animation start
      await sleep(this.animationTime)
      this.style(i, COLOR_ORANGE)
      this.pullOut(i)
      await sleep(this.animationTime)
      // animation end

      let j = 0  // we need it after loop
      for (j = i - 1; j >= 0 && state[j].value > tmp; j--) {
        // animation start
        this.style(j, COLOR_PINK)
        await sleep(this.animationTime)
        // animation end

        // animation start
        this.swap(state[j].key, state[j + 1].key)
        await sleep(this.animationTime)
        // animation end

        swap(j, j + 1, state)

        // animation start
        this.style(j + 1, COLOR_GREEN)
        await sleep(this.animationTime)
        // animation end
      }

      // animation start
      this.style(j + 1, COLOR_GREEN)
      this.pushIn(j + 1)
      await sleep(this.animationTime)
      // animation end
    }
  }

  // pull the bar out
  pullOut (index: number) {
    const item = this.queryByIndex(index)
    item.style.bottom = 0
  }
  pushIn (index: number) {
    const item = this.queryByIndex(index)
    item.style.bottom = '100px' // cuz we set `bottom: 100px` in css originally
  }

  swap (
    key1: string,
    key2: string
  ) {
    // animation start
    const item1 = this.queryByKey(key1),
      left1 = getLeft(item1)
    const item2 = this.queryByKey(key2),
      left2 = getLeft(item2)

    item1.style.left = `${left2}px`
    item2.style.left = `${left1}px`
    // animation end
  }
}
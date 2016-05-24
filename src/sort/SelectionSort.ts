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
  }

  // selection sort
  async sort () {
    const { state, element, animationTime } = this

    for (let i = 0; i < state.length - 1; i++) {
      let minIndex = i

      // animation start
      this.style(minIndex, COLOR_ORANGE)
      await sleep(animationTime)
      // animation end

      for (let j = i + 1; j < state.length; j++) {
        // animation start
        this.style(j, COLOR_PINK)
        await sleep(animationTime)
        // animation end

        // find the index of the minimum value
        if (state[j].value < state[minIndex].value) {
          // animation start
          this.unstyle(minIndex)
          this.style(j, COLOR_ORANGE)
          // animation end

          minIndex = j
        } else {
          // animation start
          this.unstyle(j)
          // animation end
        }

        // animation start
        await sleep(animationTime)
        // animation end
      }

      // animation start
      this.swap(state[i].key, state[minIndex].key )
      // animation end

      // swap position and value
      swap(i, minIndex, state)

      // animation start
      this.style(i, COLOR_GREEN)
      await sleep(animationTime)
      // animation end
    }

    // style the last one
    // animation start
    this.style(state.length - 1, COLOR_GREEN)
    // animation end
  }

  // swap two bar position. by changing `left` property
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

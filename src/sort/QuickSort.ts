import { swap } from '../util/array'
import { getLeft } from '../util/dom'
import { sleep } from '../util/async'

import Sort from './Sort'

export default class QuickSort extends Sort {
  constructor ({
    data = []
  }: {
    data: number[]
  }) {
    super({ data })
  }

  sort (): number[] {
    const { state } = this

    this.quickSort(0, state.length)
    this.play()

    return state.map(s => s.value)
  }

  quickSort (
    left: number,
    right: number
  ) {
    if (left >= right) return

    const newRight = this.partition(left, right)
    this.quickSort(0, newRight - 1)
    this.quickSort(newRight + 1, right)
  }

  partition (
    left: number,
    right: number
  ): number {
    const { state } = this

    const pivot = left
    let i = left + 1
    for (let j = i; j < right; j++) {
      if (state[j].value <= state[pivot].value) {
        swap(j, i, state)

        // animation start
        this.animations.push(
          this.swap.bind(this, state[j].key, state[i].key)
        )
        // animation end

        i++
      }
    }

    swap(pivot, i - 1, state)

    // animation start
    this.animations.push(
      this.swap.bind(this, state[pivot].key, state[i - 1].key)
    )
    // animation end

    return i - 1
  }

  swap (
    key1: string,
    key2: string
  ): void {
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
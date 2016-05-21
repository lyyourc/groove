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

    this.quickSort(0, state.length - 1)
    this.play()

    return state.map(s => s.value)
  }

  quickSort (
    left: number,
    right: number
  ): void {
    if (left >= right) {
      // animation start
      if (left === right) {
        this.animations.push(
          this.styleByKey.bind(this, this.state[left].key, 'green')
        )
      }
      // animation end
      return
    }

    const newRight = this.partition(left, right)
    this.quickSort(left, newRight - 1)
    this.quickSort(newRight + 1, right)
  }

  partition (
    left: number,
    right: number
  ): number {
    const { state } = this

    const pivot = left
    let i = left + 1

    // animation start
    const pivotKey = state[pivot].key
    const currentKey = state[i].key
    this.animations.push(() => {
      this.queryByKey(pivotKey)
        .style.background = 'orange'
    })
    // animation end

    for (let j = i; j <= right; j++) {
      // animation start
      this.animations.push(
        this.styleByKey.bind(this, state[j].key, 'pink')
      )
      // animation end

      if (state[j].value <= state[pivot].value) {
        swap(j, i, state)

        // animation start
        const key1 = state[i].key
        const key2 = state[j].key
        this.animations.push(() => {
          this.styleByKey(key1, 'purple')
          this.styleByKey(key1, 'purple')
          this.swap(key1, key2)
        })
        // animation end

        i++
      }

      // animation start
      this.animations.push(
        this.styleByKey.bind(this, state[j].key, '')
      )
      // animation end
    }

    swap(pivot, i - 1, state)
    // animation start
    this.animations.push(
      this.swap.bind(this, state[pivot].key, state[i - 1].key)
    )
    this.animations.push(
      this.styleByKey.bind(this, state[i - 1].key, 'green')
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

  styleByKey (key, color) {
    this.element.querySelector(`[data-key=${key}]`)
      .style.background = color
  }
}
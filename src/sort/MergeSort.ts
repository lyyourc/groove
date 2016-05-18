import { sleep } from '../util/async'

import Sort from './Sort'

export default class MergeSort extends Sort {
  animations: any[] = []

  constructor ({
    data
  }: {
    data: number[]
  }) {
    super ({ data })
  }

  sort (): number[] {
    const { state } = this
    const auxiliary = Array.from(Array(state.length))

    this.mergeSort(state, auxiliary, 0, state.length - 1)

    // animation start
    this.play()
    // animation end

    return this.state.map(s => s.value)
  }

  mergeSort (
    items: any[],
    aux: any[],
    left: number,
    right: number
  ) {
    if (left >= right) return
    const mid = left + Math.floor((right - left) / 2)

    this.mergeSort(items, aux, left, mid)
    this.mergeSort(items, aux, mid + 1, right)
    this.merge(items, aux, left, mid, right)
  }

  async merge (
    items: any[],
    aux: any[],
    left: number,
    mid: number,
    right: number
  ) {
    // copy
    for (let k = left; k <= right; k++) {
      // animation start
      // const currentState = Object.assign({}, this.state)

      // this.animations.push(() => {
      //   this.element.querySelector(`[data-key=${currentState[k].key}]`)
      //     .style.background = 'pink'
      // })
      // animation end
      aux[k] = items[k]
    }

    // merge
    let i = left, j = mid + 1
    for (let k = left; k <= right; k++) {
      if (i > mid) {
        // animation start
        this.animations.push(this.sortAnimation.bind(this, aux[j].key, k))
        // this.sortAnimation(aux[j].key, k)
        // animation end

        items[k] = aux[j++]

      } else if (j > right) {
        // animation start
        this.animations.push(this.sortAnimation.bind(this, aux[i].key, k))
        // animation end

        items[k] = aux[i++]

      } else if (aux[j].value < aux[i].value) {
        // animation start
        this.animations.push(this.sortAnimation.bind(this, aux[j].key, k))
        // animation end

        items[k] = aux[j++]

      } else {
        // animation start
        this.animations.push(this.sortAnimation.bind(this, aux[i].key, k))
        // animation end

        items[k] = aux[i++]
      }
    }

    // animation start
    for (let k = left; k <= right; k++) {
      const currentState = Object.assign({}, this.state)

      this.animations.push(() => {
        this.element.querySelector(`[data-key=${currentState[k].key}]`)
          .style.bottom = '100px'
      })
    }
    // animation end
  }

  sortAnimation (key, position): void {
    const bar =  this.element.querySelector(`[data-key=${key}]`)
    bar.style.bottom = 0
    bar.style.left = `${position * this.barWidth}px`
  }
}
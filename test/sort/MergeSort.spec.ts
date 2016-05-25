import MergeSort from '../../src/sort/MergeSort'
import { random } from '../../src/util/array'

describe('merge sort component', () => {
  it('MergeSort Class', () => {
    const data = Array.from(Array(8))
      .map(() => random(1, 50))

    const merge = new MergeSort({ data })

    document.querySelector('body')
      .appendChild(merge.element)

    merge.sort()
  })
})

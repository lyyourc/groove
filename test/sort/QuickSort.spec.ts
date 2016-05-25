import QuickSort from '../../src/sort/QuickSort'
import { random } from '../../src/util/array'

describe('quick sort component', () => {
  it('QuickSort Class', () => {
    const data = Array.from(Array(8))
      .map(() => random(1, 50))

    const quick = new QuickSort({ data })

    document.querySelector('body')
      .appendChild(quick.element)

    quick.sort()
  })
})

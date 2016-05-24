import SelectionSort from '../../src/sort/SelectionSort'
import { random } from '../../src/util/array'

describe('selection sort component', () => {
  it('SelectionSort Class', () => {
    const data = Array.from(Array(8))
      .map(() => random(1, 50))

    const select = new SelectionSort({ data })

    document.querySelector('body')
      .appendChild(select.element)

    select.sort()
  })
})

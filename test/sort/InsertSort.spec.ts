import InsertSort from '../../src/sort/InsertSort'
import { random } from '../../src/util/array'

describe('insert sort component', () => {
  it('InsertSort Class', () => {
    const data = Array.from(Array(8))
      .map(() => random(1, 50))

    const insert = new InsertSort({ data })

    document.querySelector('body')
      .appendChild(insert.element)

    insert.sort()
  })
})

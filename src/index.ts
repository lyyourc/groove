import './app.css'

import QuickSort from './sort/QuickSort'

const data = [17, 24, 33, 24, 42, 3, 10]
const quick = new QuickSort({ data })

document.querySelector('main')
  .appendChild(quick.element)

quick.sort()
// quick.play()
console.table(quick.state)
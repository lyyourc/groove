import './app.css'

import MergeSort from './sort/MergeSort'

const data = [33, 24, 17, 24, 42, 3, 10]
const merge = new MergeSort({ data })

document.querySelector('main')
  .appendChild(merge.element)

merge.sort()
// merge.play()
console.table(merge.state)
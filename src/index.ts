import './app.css'

import SelectionSort from './sort/SelectionSort'

const data = [33, 24, 17, 24, 42, 3, 10]
const selectionSort = new SelectionSort({
  data,
  animationTime: 500,
  barWidth: 50
})
document.querySelector('main')
  .appendChild(selectionSort.element)
  
selectionSort.sort()
// selectionSort.play()
// console.log(selectionSort.element)

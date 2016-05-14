import './app.css'

import SelectionSort from './sort/SelectionSort'

const data = [33, 17, 24, 42, 3, 10]
const selectionSort = new SelectionSort(data)
document.querySelector('main')
  .appendChild(selectionSort.element)
  
selectionSort.sort()
// selectionSort.play()
// console.log(selectionSort.element)

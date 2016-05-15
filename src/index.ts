import './app.css'

import InsertSort from './sort/InsertSort'

const data = [33, 24, 17, 24, 42, 3, 10]
const insert = new InsertSort({ data })

document.querySelector('main')
  .appendChild(insert.element)

insert.sort()
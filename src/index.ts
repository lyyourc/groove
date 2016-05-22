import './app.css'

import Nav from './components/nav/Nav'

const nav = new Nav({
  name: 'groove',
  children: [{
    name: 'Sorting',
    children: [{
      name: 'Select',
      route: '/sorting/selectsort',
    }, {
      name: 'Insert',
      route: '/sorting/insertsort'
    }, {
      name: 'Merge',
      route: '/sorting/mergesort',
    }, {
      name: 'Quick',
      route: '/sorting/quicksort',
    }]
  }, {
    name: 'Linked List'
  }]
})

document.querySelector('body')
  .appendChild(nav.element)
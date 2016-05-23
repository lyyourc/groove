import './app.css'

// import Nav from './components/nav/Nav'
import Tree from './components/tree/Tree'

const nav = new Tree({
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
    name: 'Linked List',
    children: [{
      name: 'Stack'
    }, {
      name: 'Queue'
    }]
  }]
})

document.querySelector('body')
  .appendChild(nav.element)
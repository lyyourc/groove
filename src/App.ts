import { h } from './util/hyper'
import { random } from './util/array'
import Router from './router/Router'

import Nav from './components/nav/Nav'
import { NavItem } from './components/nav/NavInterface'
import { NAV_DATA } from './util/constant'

import SelectionSort from './sort/SelectionSort'
import InsertSort from './sort/InsertSort'
import MergeSort from './sort/MergeSort'
import QuickSort from './sort/QuickSort'

export default class App {
  props: { navData: NavItem }
  element: HTMLElement
  mainView: HTMLElement

  constructor () {
    this.props = { navData: NAV_DATA }
    this.mainView = h('main.groove-main')
    this.element = this.render()
    this.route()
  }

  render () {
    const { props } = this
    return h('div.groove-app', {},
      new Nav(props.navData).element,
      this.mainView
    )
  }

  route () {
    // route here
    const data = Array.from(Array(8)).map(x => random(5, 50))
    const router = new Router(this.mainView)

    router.route('/sorting/select', () =>
      renderSortComponent(SelectionSort, { data })
    )
    router.route('/sorting/insert', () =>
      renderSortComponent(InsertSort, { data })
    )
    router.route('/sorting/merge', () =>
      renderSortComponent(MergeSort, { data })
    )
    router.route('/sorting/quick', () =>
      renderSortComponent(QuickSort, { data })
    )
    router.bootstrap()
  }
}

function renderSortComponent (Component, options) {
  const component = new Component(options)
  component.sort()
  return component.element
}

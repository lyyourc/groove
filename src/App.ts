import { h } from './util/hyper'
import Router from './router/Router'

import Nav from './components/nav/Nav'
import { NavItem } from './components/nav/NavInterface'
import { NAV_DATA } from './util/constant'

import QuickSort from './sort/QuickSort'

export default class App {
  props: { navData: NavItem }
  element: HTMLElement
  mainView: HTMLElement

  constructor () {
    this.props = { navData: NAV_DATA }
    this.mainView = h('main.groove-main')
    this.element = this.render()

    // route here
    const data = [17, 24, 33, 24, 42, 3, 10]
    const router = new Router(this.mainView)

    router.route('/sorting/insert', () => console.log('hello'))
    router.route('/sorting/quick', () => {
      const quick = new QuickSort({data})
      quick.sort()
      return quick.element
    })
    router.bootstrap()
  }

  render () {
    const { props } = this
    return h('div.groove-app', {},
      new Nav(props.navData).element,
      this.mainView
    )
  }
}
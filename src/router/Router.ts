import { router } from './RouterInterface'

export default class Router {
  routes: router[] = []
  view: HTMLElement

  constructor (view) {
    this.view = view
  }

  route (
    path: string,
    controller: any
  ) {
    this.routes.push({ path, controller })
  }

  render () {
    const url = location.hash.slice(1) || '/'
    const route = this.routes.filter(r => r.path === url)[0]

    // non-registered route
    if (route == null) {
      this.view.innerHTML = ''
      return
    }

    const component = route.controller()

    if (typeof component === 'string' || component == null) {
      this.view.innerHTML = route.controller() || ''
    } else {
      this.view.innerHTML = ''
      this.view.appendChild(component || null)
    }
  }

  bootstrap () {
    window.addEventListener('hashchange', this.render.bind(this))
    window.addEventListener('load', this.render.bind(this))
  }
}
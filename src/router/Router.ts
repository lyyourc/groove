interface router {
  path: string,
  controller: any
}

export default class Router {
  routes: router[] = []
  view: HTMLElement

  constructor (view) {
    this.view = view
  }

  route (path, controller) {
    this.routes.push({ path, controller})
  }

  render () {
    const url = location.hash.slice(1) || '/'
    const route = this.routes.filter(r => r.path === url)[0]

    if (route == null) return
    const component = route.controller()
    if (typeof component === 'string') {
      this.view.innerHTML = route.controller() || ''
    } else {
      this.view.appendChild(component || null)
    }
  }

  bootstrap () {
    window.addEventListener('hashchange', this.render.bind(this))
    window.addEventListener('load', this.render.bind(this))
  }
}
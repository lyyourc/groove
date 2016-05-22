import { h } from '../../util/hyper'

import './nav.css'

export default class Nav {
  state: any
  data: any
  element: HTMLElement

  constructor (data = {}) {
    this.state = {
      data,
      selectedNodeName: ''
    }
    this.element = this.render()
  }

  render (
    data: any = {}
  ): HTMLElement {
    const { state } = this

    return h('nav.groove-nav', {},
      h('ul', {}, this.renderNode(state.data))
    )
  }

  renderNode ({
    name = '',
    expand = true,
    route = '',
    children = []
  }: {
    name: string,
    expand: boolean,
    route: string,
    children: any[]
  }): HTMLElement {
    const { state } = this
    const node = h('li.node')

    if (name) {
      const nodeTitle = h('div.node-name', {
        'data-selected': state.selectedNodeName === name,
        onClick: e => this.selectNode(node, name)
      }, !route
        ? name
        : h('a', { href: `#${route}` }, name)
      )

      node.appendChild(nodeTitle)
    }

    if (children.length === 0) return node

    const childNodes = children.reduce((prev, child) => {
      prev.appendChild(this.renderNode(child))
      return prev
    }, document.createDocumentFragment())

    node.appendChild(h('ul', {
      style: `display: ${expand ? 'block' : 'none'}`
    }, childNodes))

    return node
  }

  selectNode (node, name) {
    const { state } = this
    state.selectedNodeName = name
    this.toggleNode(name)
    this.reRender()
  }

  toggleNode (name) {
    const { state } = this
    this.state = JSON.parse(
      JSON.stringify(state)
        .replace(new RegExp(`("name":"${name}")`, 'i'), `$1,"expand":false`)
    )
  }

  reRender () {
    const oldElement = this.element
    const newElement = this.render(this.data)

    oldElement.parentNode.replaceChild(newElement, oldElement)
    this.element = newElement
  }
}
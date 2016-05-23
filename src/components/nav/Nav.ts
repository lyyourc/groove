import { h } from '../../util/hyper'
import {
  NavState,
  NavItem,
  NavProps,
} from './NavInterface'

import './nav.css'

export default class Nav {
  state: NavState
  props: NavProps
  element: HTMLElement

  constructor (
    data: NavItem
  ) {
    this.state = { selectedNodeName: '' }
    this.props = { data }

    this.element = this.render()
  }

  render (): HTMLElement {
    const { state, props } = this

    return h('nav.groove-nav', {},
      h('ul', {}, this.renderNode(props.data))
    )
  }

  renderNode ({
    name = '',
    route = '',
    children = []
  }: NavItem
  ): HTMLElement {
    const { state } = this
    const node = h('li.node')

    // node title
    const nodeTitle = h('div.node-name', {
      'data-selected': state.selectedNodeName === name,
      onClick: e => this.selectNode(node, name)
    },
      h('a', { href: `#${route}` }, name)
    )
    node.appendChild(nodeTitle)

    // node children
    if (children.length === 0) return node

    const childNodes = children.reduce((prev, child) => {
      prev.appendChild(this.renderNode(child))
      return prev
    }, document.createDocumentFragment())

    node.appendChild(h('ul', {}, childNodes))

    return node
  }

  selectNode (node, name) {
    const { state } = this
    state.selectedNodeName = name
    this.reRender()
  }

  reRender () {
    const oldElement = this.element
    const newElement = this.render()

    oldElement.parentNode.replaceChild(newElement, oldElement)
    this.element = newElement
  }
}
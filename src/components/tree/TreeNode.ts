import { h } from '../../util/hyper'
import { TreeData } from './TreeInterface'

export default class TreeNode {
  element: HTMLElement
  state: any
  props: {
    data: TreeData,
    selectedNodeId: string,
    selectNode: any
  }

  constructor ({
    data,
    selectedNodeId,
    selectNode
  }: {
    data: TreeData,
    selectedNodeId: string,
    selectNode: any
  }) {
    this.props = { data, selectedNodeId, selectNode }
    this.state = {
      isFolder: false,
    }
    this.element = this.render()
  }

  render () {
    const { state } = this
    const { data, selectedNodeId, selectNode } = this.props

    let childNodes = []
    if (data.children != null) {
      childNodes = data.children.map((child) => {
        return h('li', {}, new TreeNode({
          data: child,
          selectedNodeId,
          selectNode
        }).element)
      })
    }

    const node = h('div', { 'data-leaf': childNodes.length === 0 },
      h('h5', {
        style: `background: ${selectedNodeId === data.name ? 'pink' : '#fff'}`,
        onClick: this.toggle.bind(this, data.name, childNodes.length === 0),
      }, data.name),

      h('ul', {
        style: `display: ${state.isFolder ? 'none' : 'block'}`
      }, ...childNodes)
    )

    return node
  }

  toggle (name: string, isLeaf: boolean) {
    if (isLeaf) {
      const { selectNode } = this.props
      selectNode(name)
    } else {
      const { state } = this
      state.isFolder = !state.isFolder
      this.reRender()
    }
  }

  reRender () {
    const oldElement = this.element
    const newElement = this.render()

    oldElement.parentNode.replaceChild(newElement, oldElement)
    this.element = newElement
  }
}
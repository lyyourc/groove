import { h } from '../../util/hyper'
import { TreeData, TreeState } from './TreeInterface'
import TreeNode from './TreeNode'

export default class Tree {
  data: TreeData
  state: TreeState
  element: HTMLElement

  constructor (data) {
    this.data = data
    this.state = {
      selectedNodeId: 'root'
    }

    this.element = this.render()
  }

  render () {
    const { data, state, selectNode } = this
    const selectedNodeId = state.selectedNodeId

    return h('div', {}, new TreeNode({
      data,
      selectedNodeId,
      selectNode: selectNode.bind(this),
    }).element)
  }

  selectNode (nodeId) {
    this.state.selectedNodeId = nodeId
    this.reRender()
  }

  reRender () {
    const oldElement = this.element
    const newElement = this.render()
    oldElement.parentNode.replaceChild(newElement, oldElement)
    this.element = newElement
  }
}
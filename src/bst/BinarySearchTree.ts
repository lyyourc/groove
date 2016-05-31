import { svgH } from '../util/hyper'
import Node from './Node'
import Line from './Line'

export default class BinarySearchTree {
  element: HTMLElement
  state: number[]
  root: Node
  props

  constructor ({
    data
  }) {
    this.props = {
      containerWidth: 700,
      verticalHeight: 40,
    }
    this.state = data
    this.element = this.render()
  }

  insert (value: number) {
    const { root } = this
    const { verticalHeight, containerWidth } = this.props

    if (root == null) {
      const newNode = new Node({
        translate: [containerWidth / 2, verticalHeight / 2],
        value
      })
      this.root = newNode
      return newNode.element
    }

    let current = root
    while (true) {
      const parent = current
      const parentTranslateX = parent.props.translate[0]
      const parentTranslateY = parent.props.translate[1]

      if (value > current.props.value) {
        current = current.right

        if (current == null) {
          const newNode = new Node({
            translate: [parentTranslateX + verticalHeight, parentTranslateY + verticalHeight],
            value
          })
          parent.right = newNode

          const slot = Math.sqrt(2) / 2 * parent.props.r
          const line = new Line({
            x1: parentTranslateX + slot,
            y1: parentTranslateY + slot,
            x2: parentTranslateX + verticalHeight - slot,
            y2: parentTranslateY + verticalHeight - slot,
          })

          const fragment = document.createDocumentFragment()
          fragment.appendChild(newNode.element)
          fragment.appendChild(line.element)

          return fragment
        }
      } else if (value < current.props.value) {
        current = current.left

        if (current == null) {
          const newNode = new Node({
            translate: [parentTranslateX - verticalHeight, parentTranslateY + verticalHeight],
            value
          })
          parent.left = newNode

          const slot = Math.sqrt(2) / 2 * parent.props.r
          const line = new Line({
            x1: parentTranslateX - slot,
            y1: parentTranslateY + slot,
            x2: parentTranslateX - verticalHeight + slot,
            y2: parentTranslateY + verticalHeight - slot,
          })

          const fragment = document.createDocumentFragment()
          fragment.appendChild(newNode.element)
          fragment.appendChild(line.element)

          return fragment
        }
      } else {
        throw Error('Node value shouldnt be equal in BST')
      }
    }
  }

  draw () {
    // this.element.appendChild
  }

  render () {
    const children = this.state.map(s => this.insert(s))
    const { containerWidth } = this.props

    return svgH('svg', {
      style: `width: ${containerWidth}px; height: 400px; border:1px solid #000;`
    }, ...children)
  }
}
import { svgH } from '../util/hyper'

interface NodeState {
  cx?: number
  cy?: number
  r?: number
  translate: number[]
  value: number
}

export default class Node {
  props: NodeState
  element: HTMLElement
  left: Node
  right: Node

  constructor ({
    cx = 0,
    cy = 0,
    r = 10,
    translate = [0, 0],
    value = 0,
  }: NodeState) {
    this.props = { cx, cy, r, translate, value }
    this.element = this.render()
  }

  render () {
    const { cx, cy, r, translate, value } = this.props

    return svgH('g', {
      transform: `translate(${translate[0]}, ${translate[1]})`
    },
      svgH('circle', {
        cx, cy, r,
        fill: 'none',
        stroke: '#000',
        'stroke-width': '1',
      }),
      svgH('text', {
        'text-anchor': 'middle',
        'baseline-shift': "-7px"
      }, value))
  }
}

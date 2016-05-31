import { svgH } from '../util/hyper'

interface LineState {
  x1: number
  y1: number
  x2: number
  y2: number
}

export default class Line {
  props: LineState
  element: HTMLElement

  constructor ({
    x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0,
  }: LineState) {
    this.props = { x1, y1, x2, y2 }

    this.element = this.render()
  }

  render () {
    const { x1, y1, x2, y2 } = this.props

    return svgH('line', {
      x1, y1, x2, y2,
      stroke: '#000',
      'stroke-width': '1'
    })
  }
}
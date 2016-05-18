import './bar.css'

import {
  h
} from '../../util/hyper'

export default class Bar {
  width: number
  height: number = 0
  element: HTMLDivElement

  constructor ({
    value,
    key,
    style = '',
    animationTime = 1000,
    barWidth = 50
  }: {
    value: number,
    key: string,
    style?: string,
    animationTime?: number,
    barWidth?: number
  }) {
    this.width = barWidth
    this.height = value * 2

    this.element = h('div', {
      class: 'groove-bar',
      'data-value': value,
      'data-key': key,
      style: `${style} width: ${this.width}px; height: ${this.height}px; transition: all ${animationTime}s;`,
    })
  }
}


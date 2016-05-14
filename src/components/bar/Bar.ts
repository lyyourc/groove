import './bar.css'

import {
  h
} from '../../util/hyper'

export default class Bar {
  width: number = 20
  height: number = 0
  element: HTMLDivElement

  constructor (value: number, key: string, animationTime: number) {
    this.height = value * 2

    this.element = h('div', {
      class: 'groove-bar',
      'data-value': value,
      'data-key': key,
      style: `
        width: ${this.width}px;
        height: ${this.height}px; 
        transition: all ${animationTime}s;`,
    })
  }

  style (type: string) {
    const { element } = this

    element.className = 'groove-bar'
    type && element.classList.add(type)
  }
}


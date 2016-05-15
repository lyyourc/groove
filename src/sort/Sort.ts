export default class Sort {
  state: any
  element: any

  animationTime: number = 1000
  barWidth: number = 50

  constructor ({
    data,
    animationTime,
    barWidth
  }: {
    data: any[],
    animationTime?: any,
    barWidth?: any
  }) {
    this.animationTime = animationTime
    this.barWidth = barWidth

    this.state = data.map((d, i) => ({
      value: d,
      key: `groove-bar-${i}`}
    ))
  }
}
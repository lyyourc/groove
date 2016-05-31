export function swap (index1, index2, arr) {
  return [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
}

export function random (
  lower: number = 0,
  upper: number = 1,
  floating: boolean = false
) {
  const result: number = Math.random() * (upper - lower) + lower
  return floating ? result : Math.floor(result)
}

export function unique (
  array: number[]
) {
  return array.filter((item, index) =>
    array.indexOf(item) === index
  )
}
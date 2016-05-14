export function getLeft (item) {
  return parseInt(item.style.left.slice(0, -2)) || 0
}

export function query (selector, parent) {
  return parent
    ? parent.querySelector(selector)
    : document.querySelector(selector)
}
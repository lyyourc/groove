const isNode = node =>
  node && node.nodeType ? true : false

function h (
  type = 'div',
  props = {},
  ...children
) {
  // split 'id' and 'class' from 'type'
  const match = type.match(/[\.#]?[^\s#.]+/g)
  let el = null

  match.forEach(item => {
    if (item.indexOf('.') !== -1) el.classList.add(item.slice(1))
    else if (item.indexOf('#') !== -1) el.setAttribute('id', item.slice(1))
    else el = document.createElement(item)
  })

  // set attributes
  Object.keys(props).forEach(prop => {
    prop.slice(0, 2) === 'on'
      ? el.addEventListener(prop.slice(2).toLowerCase(), props[prop], false)
      : el.setAttribute(prop, props[prop])
  })

  children.forEach(child => {
    child = child || ''
    isNode(child) ? el.appendChild(child) : el.innerHTML += child
  })

  return el
}

export {
  h
}
const isNode = node =>
  node && node.nodeType ? true : false

const hyper = (
  type = 'div',
  props = {},
  children,
  svg = false
) => {
  // split 'id' and 'class' from 'type'
  const match = type.match(/[\.#]?[^\s#.]+/g)
  let el = null

  match.forEach(item => {
    if (item.indexOf('.') !== -1) el.classList.add(item.slice(1))
    else if (item.indexOf('#') !== -1) el.setAttribute('id', item.slice(1))
    else el = svg
      ? document.createElementNS('http://www.w3.org/2000/svg', type)
      : document.createElement(item)
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

const h = (
  type = 'div',
  props = {},
  ...children
) => {
  return hyper(type, props, children, false)
}

const svgH = (
  type = 'div',
  props = {},
  ...children
) => {
  return hyper(type, props, children, true)
}

export {
  h,
  svgH
}
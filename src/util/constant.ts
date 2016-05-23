export const COLOR_ORANGE = '#FFD5B7'
export const COLOR_GREEN = '#AEE3A3'
export const COLOR_BLUE = '#89BFB8'
export const COLOR_PINK = '#F9B3BA'

export const NAV_DATA = {
  name: 'groove',
  children: [{
    name: 'Sorting',
    children: [{
      name: 'Select',
      route: '/sorting/select',
    }, {
      name: 'Insert',
      route: '/sorting/insert'
    }, {
      name: 'Merge',
      route: '/sorting/merge',
    }, {
      name: 'Quick',
      route: '/sorting/quick',
    }]
  }, {
    name: 'Linked List',
    children: [{
      name: 'Stack'
    }, {
      name: 'Queue'
    }]
  }]
}
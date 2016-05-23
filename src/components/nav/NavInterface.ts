export interface NavItem {
  name: string,
  route?: string,
  children?: NavItem[]
}

export interface NavState {
  selectedNodeName: string
}

export interface NavProps {
  data: NavItem
}
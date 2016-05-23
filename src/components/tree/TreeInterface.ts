export interface TreeState {
  selectedNodeId: string
}

export interface TreeData {
  name: string
  children: TreeData[]
}

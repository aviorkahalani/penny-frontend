export interface ILink {
  to: string
  label: string
  variant:
    | 'ghost'
    | 'subtle'
    | 'solid'
    | 'outline'
    | 'surface'
    | 'plain'
    | undefined
}

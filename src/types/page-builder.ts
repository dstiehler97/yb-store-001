export interface BlockComponent {
  id: string
  type: string
  content: Record<string, unknown>
  style?: Record<string, unknown>
  children?: BlockComponent[]
}

export interface PageBuilderProps {
  initialContent?: BlockComponent[]
  onSave?: (content: BlockComponent[]) => void
  readOnly?: boolean
}

export type BlockType = 
  | "header"
  | "hero"
  | "text"
  | "image"
  | "gallery"
  | "button"
  | "container"
  | "grid"
  | "spacer"
  | "product-grid"
  | "feature-list"
  | "testimonial"
  | "footer"

export interface BlockConfig {
  type: BlockType
  label: string
  icon: string
  defaultContent: Record<string, unknown>
  settings: BlockSetting[]
}

export interface BlockSetting {
  key: string
  label: string
  type: "text" | "textarea" | "number" | "color" | "select" | "toggle" | "image"
  options?: { label: string; value: string }[]
  defaultValue?: unknown
}

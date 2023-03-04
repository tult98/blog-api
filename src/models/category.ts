export interface CategoryInput {
  title: string
  description: string
}

export interface CategoryDocument extends CategoryInput {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryFilter {
  id?: string
  slug?: string
  description?: string
}

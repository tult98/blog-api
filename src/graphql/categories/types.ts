export const types = `#graphql
  type Category {
    id: ID
    title: String
    slug: String
    description: String
    createdAt: Date
    updatedAt: Date
  }

  type Meta {
    total: Int
  }

  type Categories {
    categories: [Category!]!
    meta: Meta!
  }

  type DeletedCategory {
    id: ID
  }
`

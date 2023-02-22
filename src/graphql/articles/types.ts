export const types = `#graphql
  type Article {
    id: ID
    title: String
    slug: String
    thumbnail: String
    preface: String
    body: String
    category: String
    tags: [String!]
    createdAt: Date
    updatedAt: Date
  }

  type Meta {
    total: Int
  }

  type Articles {
    articles: [Article!]!,
    meta: Meta!
  }
`

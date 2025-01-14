export interface ArticlesProps {
    id: number
    title: string
    description: string
    body: string
    createdAt: string
}

export interface ResponseProps {
    articles: ArticlesProps[]
}
'use client'

import { useEffect, useState } from "react"

const Articles = () => {
    
    const [article, setArticle] = useState<any>({})
    const [articles, setArticles] = useState<any>([])

    useEffect(() => {
        getArticles()
    }, [])

    async function getArticles() {
        const res = await fetch('http://localhost:3001/articles')
        const articles = await res.json()
        setArticles(articles)
    }

    async function getArticleById(id: number) {
        const res = await fetch(`http://localhost:3001/${id}`)
        const article = res.json()
        setArticle(article)
    }

    async function createArticle() {
        await fetch('http://localhost:3001/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication',
            },
            body: JSON.stringify(article),
        })
        setArticle({})
        await getArticles()
    }

    async function updateArticle() {
        await fetch(`http://localhost:3001/${article.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'aplication',
            },
            body: JSON.stringify(article)
        })
        setArticle({})
        await getArticles()
    }

    async function deleteArticle(id: number) {
        await fetch(`http://localhost:3001/${id}`, {
            method: 'DELETE',
        })
        await getArticles()
    }

}

export default Articles
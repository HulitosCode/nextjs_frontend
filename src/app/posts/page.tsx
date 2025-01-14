'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Articles() {
    const [article, setArticle] = useState<any>({})
    const [articles, setArticles] = useState<any>([])

    useEffect(() => {
        getArticles()
    }, [])

    async function getArticles() {
        const resp = await fetch('https://nestjs-backend-v9c5.onrender.com/articles')
            const articles = await resp.json()
            setArticles(articles)
    }

    async function createArticle() {
        await fetch('https://nestjs-backend-v9c5.onrender.com/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        })
            setArticle({})
            await getArticles()
    }

    async function updateArticle() {
        await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${article.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(article),
        })
            setArticle({})
            await getArticles()
    }

    async function deleteArticle(id: number) {
        await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${id}`, {
            method: 'DELETE',    
        })
            await getArticles()
    }

    async function updateArticleById(id: number) {
        const res = await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${id}`)
        const article = await res.json()
        setArticle(article)
    }

    function renderFormArticle() {
        return (
            <div className="grid grid-cols-3 gap-5 items-end">
                <div className="flex flex-col">
                    <label htmlFor="title">Titulo</label>
                    <input 
                        id="title"
                        type="text" 
                        value={article.title ?? ''} 
                        onChange={(e) => setArticle({...article, title: e.target.value })}
                        className="bg-zinc-900 p-2 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Descricao</label>
                    <input 
                        id="description"
                        type="text" 
                        value={article.description ?? ''} 
                        onChange={(e) => setArticle({...article, description: e.target.value })}
                        className="bg-zinc-900 p-2 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="body">Corpo</label>
                    <input 
                        id="body"
                        type="text" 
                        value={article.body ?? ''} 
                        onChange={(e) => setArticle({...article, body: e.target.value })}
                        className="bg-zinc-900 p-2 rounded-md w-full"
                    />
                </div>
                <div>
                    {article.id ? (
                        <button onClick={updateArticle} className="bg-green-600 rounded-md px-4 py-2">Alterar artigo</button>
                    ): (
                        <button onClick={createArticle} className="bg-green-600 rounded-md px-4 py-2">Criar artigo</button>
                    )}
                </div>
            </div>
            
        )
    }

    function renderArticles() {
        return (
            <div>
            <h1 className="flex items-center justify-center py-4 font-bold">Lista de artigos</h1>
            <div className="flex items-center justify-center w-full mx-auto max-w-7xl">  
                <div className="flex flex-col gap-4 mx-2">
                    {articles.map((article: any) => (
                        <div key={article.id} className="bg-zinc-900 p-4 rounded-md text-gray-500">
                            <h2 className="font-bold py-4 text-green-600">{article.title}</h2>
                            <p>{article.description}</p>
            
                            <div className="flex items-center gap-4 py-4">
                            <button className="bg-green-600 p-2 rounded-md">
                            <Link className="text-white text-sm" href={`/posts/${article.id}`}>
                                Ver detalhes do artigo
                            </Link>
                            </button>
                            <div>
                                <button onClick={() => deleteArticle(article.id)} className="bg-red-600 p-2 rounded-md text-white">Excluir artigo</button>
                            </div>
                            <div>
                                <button onClick={() => updateArticleById(article.id)} className="bg-zinc-800 p-2 rounded-md text-white">Editar artigo</button>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
       
        )
    }

    return(
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            {renderFormArticle()}
            {renderArticles()}
        </div>
    )
}
import Link from "next/link"
import { useEffect, useState } from "react"

// Interface para definir o tipo do artigo
interface Article {
    id?: number;
    title: string;
    description: string;
    body: string;
    userId?: number;  // ID do usuário que criou o artigo
    createdAt?: string;
}

export default function Articles() {
    const [article, setArticle] = useState<Article>({
        title: '',
        description: '',
        body: '',
    });
    const [articles, setArticles] = useState<Article[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    // Função para obter o ID do usuário autenticado
    function getUserIdFromToken() {
        const token = localStorage.getItem("authToken");  // Supondo que o token esteja no localStorage
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));  // Decodifica o JWT
            return payload.userId;  // Supondo que o JWT contenha o userId
        }
        return null;
    }

    useEffect(() => {
        const userId = getUserIdFromToken();
        setUserId(userId);  // Define o userId do usuário autenticado
    }, []);

    useEffect(() => {
        if (userId !== null) {
            getArticles();
        }
    }, [userId]); // Só chama getArticles quando userId for definido

    async function getArticles() {
        if (userId === null) return; // Garantir que o userId esteja definido
        try {
            const resp = await fetch('https://nestjs-backend-v9c5.onrender.com/articles');
            const articlesData: Article[] = await resp.json();
            setArticles(articlesData.filter(article => article.userId === userId));  // Filtra artigos do usuário
        } catch (error) {
            console.error("Erro ao buscar artigos:", error);
        }
    }

    async function createArticle() {
        try {
            const newArticle = { ...article, userId };  // Inclui o userId ao criar o artigo
            await fetch('https://nestjs-backend-v9c5.onrender.com/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });
            setArticle({ title: '', description: '', body: '' });
            await getArticles();
        } catch (error) {
            console.error("Erro ao criar artigo:", error);
        }
    }

    async function updateArticle() {
        if (!article.id) return;
        try {
            await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${article.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });
            setArticle({ title: '', description: '', body: '' });
            await getArticles();
        } catch (error) {
            console.error("Erro ao atualizar artigo:", error);
        }
    }

    async function deleteArticle(id: number) {
        try {
            await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${id}`, {
                method: 'DELETE',
            });
            await getArticles();
        } catch (error) {
            console.error("Erro ao excluir artigo:", error);
        }
    }

    async function updateArticleById(id: number) {
        try {
            const res = await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${id}`);
            const articleData: Article = await res.json();
            setArticle(articleData);
        } catch (error) {
            console.error("Erro ao buscar artigo por ID:", error);
        }
    }

    function renderFormArticle() {
        return (
            <div className="grid grid-cols-3 gap-5 items-end">
                <div className="flex flex-col">
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        value={article.title}
                        onChange={(e) => setArticle({ ...article, title: e.target.value })}
                        className="bg-zinc-900 p-2 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Descrição</label>
                    <input
                        id="description"
                        type="text"
                        value={article.description}
                        onChange={(e) => setArticle({ ...article, description: e.target.value })}
                        className="bg-zinc-900 p-2 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="body">Corpo</label>
                    <input
                        id="body"
                        type="text"
                        value={article.body}
                        onChange={(e) => setArticle({ ...article, body: e.target.value })}
                        className="bg-zinc-900 p-2 rounded-md w-full"
                    />
                </div>
                <div>
                    {article.id ? (
                        <button onClick={updateArticle} className="bg-green-600 rounded-md px-4 py-2">
                            Alterar artigo
                        </button>
                    ) : (
                        <button onClick={createArticle} className="bg-green-600 rounded-md px-4 py-2">
                            Criar artigo
                        </button>
                    )}
                </div>
            </div>
        );
    }

    function renderArticles() {
        return (
            <div>
                <h1 className="flex items-center justify-center py-4 font-bold">Lista de artigos</h1>
                <div className="flex items-center justify-center w-full mx-auto max-w-7xl">
                    <div className="flex flex-col gap-4 mx-2">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-zinc-900 p-4 rounded-md text-gray-500">
                                <h2 className="font-bold py-4 text-green-600">{article.title}</h2>
                                <p>{article.description}</p>
                                <div className="flex items-center gap-4 py-4">
                                    <button className="bg-green-600 p-2 rounded-md">
                                        <Link className="text-white text-sm" href={`/posts/${article.id}`}>
                                            Ver detalhes do artigo
                                        </Link>
                                    </button>
                                    <button
                                        onClick={() => deleteArticle(article.id!)}
                                        className="bg-red-600 p-2 rounded-md text-white"
                                        disabled={article.userId !== userId}  // Desabilita o botão se não for o artigo do usuário
                                    >
                                        Excluir artigo
                                    </button>
                                    <button
                                        onClick={() => updateArticleById(article.id!)}
                                        className="bg-zinc-800 p-2 rounded-md text-white"
                                        disabled={article.userId !== userId}  // Desabilita o botão se não for o artigo do usuário
                                    >
                                        Editar artigo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            {renderFormArticle()}
            {renderArticles()}
        </div>
    );
}

import { ResponseProps } from "@/interfaces/articlesInterface"

export default async function Articles(){

    const response = await fetch('https://nestjs-backend-v9c5.onrender.com/articles')
    const data: ResponseProps = await response.json()

    console.log(data)

    return(
        <div>
            <h1>Todos Artigos</h1> 

            <div className="flex flex-col gap-4 mx-2">
                {data.articles?.map(article => (
                    <div key={article.id} className="bg-gray-400 p-4 rounded-md">
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <p>{article.body}</p>
                        <p>{article.createdAt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
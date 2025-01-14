import { ArticlesProps } from "@/interfaces/articlesInterface"

export default async function DetailPost({
    params
}: {
    //o id e esse entre [id] como poderia ser qualquer nome
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const response = await fetch(`https://nestjs-backend-v9c5.onrender.com/articles/${id}`)
    const data: ArticlesProps = await response.json()

    return (
        <div>
            <h1 className="flex items-center justify-center py-4 font-bold">Detalhes de artigo: {id}</h1>


            <div className="flex items-center justify-center w-full mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 mx-2">
            <div className="bg-zinc-900 p-4 rounded-md text-gray-500">
                <h2 className="font-bold py-4 text-green-600">{data.title}</h2>
                <p>{data.description}</p>
                <p>{data.body}</p><br />
                <p>{data.createdAt}</p>
            </div>
            </div>
            
            
            </div>
        </div>
    )
}
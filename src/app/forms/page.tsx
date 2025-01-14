import Articles from "@/api/articles"

const Forms = () => {

    return (
        <div className="flex items-center justify-center mx-auto h-screen">
            <div className="bg-zinc-900 p-4 rounded-md">
                <form 
                    action=""
                    className="grid gap-4 w-80"
                >
                    <h1 className="text-green-700">
                        Registar Artigos
                    </h1>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={Articles.title ?? ''}
                        onChange={(e) => setArticle({...Articles, title: e.target.value})}
                        placeholder="Titulo do artigo"
                        className="bg-zinc-800 rounded-md p-2"
                    />
                    <input 
                        type="text-area" 
                        name="description" 
                        id="description" 
                        placeholder="Descricao"
                        className="bg-zinc-800 rounded-md p-2"
                    />    
                    <input 
                        type="text-area" 
                        name="body" 
                        id="body" 
                        placeholder="Texto do artigo"
                        className="bg-zinc-800 rounded-md p-2"
                    />
                    <div>
                        <button
                            className="bg-green-700 p-2 rounded-md w-80"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Forms
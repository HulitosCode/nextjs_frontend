import Link from "next/link";

export default function NotFound(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-center font-bold">Pagina 404 nao encontrada!</h1>
            <p>A pagina acessada nao existe!</p>

            <Link href='/'>
                Voltar para home
            </Link>
        </div>
    )
}
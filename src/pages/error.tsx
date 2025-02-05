import { Link, useRouteError } from "react-router-dom";

export function Error(){
    const error = useRouteError() as Error

    return(
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">Algo aconteceu</h1>
            <p className="text-accent-foreground"> Um erro aconteceu na aplicação, abaixo estão mais detalhes.</p>
            <pre>{error?.message || JSON.stringify(error)}</pre>
            <p className="text-accent-foreground">
                Voltar para o {''}
                <Link to='/' className="text-chart-1">Dashoboard</Link>
            </p>
        </div>
    )
}
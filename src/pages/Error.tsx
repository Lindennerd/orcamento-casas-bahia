import { useRouteError } from "react-router-dom";

export interface AppError {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as AppError;
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center align-middle min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Oops!</h1>
      <p>Ocorreu um erro nesse serviço</p>
      <p className="font-medium text-slate-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/" className="text-blue-500 hover:text-blue-700 transition-all">
        Voltar
      </a>
    </div>
  );
}

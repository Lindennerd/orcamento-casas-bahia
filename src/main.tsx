import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import "./index.css";
import Edit from "./pages/Edit.tsx";
import ErrorPage from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";
import New from "./pages/New.tsx";
import OrcamentoPage from "./pages/Orcamento.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orcamento/novo",
        element: <New />,
      },
      {
        path: "/novo-orcamento",
        element: <New />,
      },
      {
        path: "/orcamento/:id",
        element: <OrcamentoPage />,
      },
      {
        path: "/orcamento/editar/:id",
        element: <Edit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

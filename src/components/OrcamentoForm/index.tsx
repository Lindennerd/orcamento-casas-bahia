import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Orcamento } from "../../../types";
import { useAppContext } from "../../context/AppContext";
import { Tabs } from "../Tabs";
import { ClienteForm } from "./ClienteForm";
import { ProdutosForm } from "./ProdutosForm";
import { VendedorForm } from "./VendedorForm";

const defaultValues: Orcamento = {
  id: 0,
  cliente: {
    id: 0,
    name: "",
    cnpj: "",
    ac: "",
  },
  vendedor: {
    id: 0,
    name: "",
    phone: "",
    email: "",
  },
  produtos: [],
  total: 0,
  data: "",
};

export interface OrcamentoFormProps {
  orcamento?: Orcamento;
}

export const OrcamentoForm = (props: OrcamentoFormProps) => {
  const navigate = useNavigate();
  const [orcamento, setOrcamento] = useState<Orcamento>(defaultValues);
  const { orcamentos, setOrcamentos } = useAppContext();

  useEffect(() => {
    if (!props.orcamento) return;
    setOrcamento(props.orcamento);
  }, [orcamento, props.orcamento]);

  function handleSaveOrcamento(orcamento: Orcamento) {
    if (orcamento.cliente.name === "") {
      toast.error("Nome do cliente é obrigatório");
      return;
    }

    if (orcamento.vendedor.name === "") {
      toast.error("Nome do vendedor é obrigatório");
      return;
    }

    if (orcamento.produtos.length === 0) {
      toast.error("Produtos são obrigatórios");
      return;
    }

    orcamento.total = orcamento.produtos.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity + cur.frete;
    }, 0);

    orcamento.data = new Date().toLocaleDateString("pt-BR");
    if (orcamento.id === 0) {
      orcamento.id = 1;
      setOrcamentos([...orcamentos, orcamento]);
    } else {
      const orcamentosUpdated = orcamentos.map((orc) => {
        if (orc.id === orcamento.id) {
          return orcamento;
        }
        return orc;
      });
      setOrcamentos(orcamentosUpdated);
    }
    setOrcamento(defaultValues);
    navigate(`/orcamento/${orcamento.id}`);
  }

  const tabs = [
    {
      label: "Cliente",
      content: (
        <ClienteForm
          cliente={orcamento.cliente}
          setCliente={(cliente) =>
            setOrcamento({
              ...orcamento,
              cliente,
            })
          }
        />
      ),
    },
    {
      label: "Vendedor",
      content: (
        <VendedorForm
          vendedor={orcamento.vendedor}
          setVendedor={(vendedor) =>
            setOrcamento({
              ...orcamento,
              vendedor,
            })
          }
        />
      ),
    },
    {
      label: "Produtos",
      content: (
        <ProdutosForm
          produtos={orcamento.produtos}
          setProdutos={(produtos) =>
            setOrcamento({ ...orcamento, produtos: produtos })
          }
        />
      ),
    },
  ];

  return (
    <>
      <Tabs tabs={tabs} />
      <div className="flex gap-3 mt-4 justify-end">
        <button
          className="rounded-md p-2 bg-blue-500 text-white  hover:shadow-md hover:shadow-gray-400 transition-all"
          onClick={() => handleSaveOrcamento(orcamento)}
        >
          Salvar
        </button>
        <button
          className="rounded-md p-2 bg-red-600 text-white hover:shadow-md hover:shadow-gray-400 transition-all"
          onClick={() => {
            setOrcamento(defaultValues);
          }}
        >
          Limpar
        </button>
      </div>
    </>
  );
};

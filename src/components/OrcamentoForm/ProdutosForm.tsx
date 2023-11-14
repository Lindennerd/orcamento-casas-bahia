import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import { Produto } from "../../../types";
import { Form, Input } from "../Form";

export interface ProdutosFormProps {
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
}

const defaultValue: Produto = {
  id: 0,
  description: "",
  quantity: 1,
  price: 1,
  frete: 0,
  code: "",
};

export const ProdutosForm = (props: ProdutosFormProps) => {
  const [produto, setProduto] = useState<Produto>(defaultValue);

  function handleAddProduto(produto: Produto) {
    if (produto.description === "") {
      toast.error("Descrição é obrigatória");
      return;
    }
    if (produto.code === "") {
      toast.error("Código é obrigatório");
      return;
    }

    props.setProdutos([...props.produtos, { ...produto, editting: false }]);
    setProduto(defaultValue);
  }

  function handleDeleteProduto(index: number) {
    const produto = props.produtos[index];
    props.setProdutos([
      ...props.produtos.filter((_, i) => i !== index),
      { ...produto, deleted: true },
    ]);
  }

  function handleEditProduto(index: number) {
    const produto = props.produtos[index];
    props.setProdutos([
      ...props.produtos.filter((_, i) => i !== index),
      { ...produto, editting: true },
    ]);
  }

  return (
    <div>
      <Form>
        <Input
          label="Descrição"
          name="descricao"
          type="text"
          value={produto.description}
          onChange={(e) =>
            setProduto({ ...produto, description: e.target.value })
          }
        />

        <Input
          label="Quantidade"
          name="quantidade"
          type="number"
          min={1}
          value={produto.quantity}
          onChange={(e) =>
            setProduto({ ...produto, quantity: Number(e.target.value) })
          }
        />
        <Input
          label="Código"
          name="codigo"
          type="text"
          mask="9999999"
          value={produto.code}
          onChange={(e) => setProduto({ ...produto, code: e.target.value })}
        />

        <Input
          label="Preço"
          name="preco"
          type="number"
          step={0.01}
          min={1}
          value={produto.price}
          onChange={(e) =>
            setProduto({ ...produto, price: Number(e.target.value) })
          }
        />
        <Input
          label="Frete"
          name="frete"
          type="number"
          step={0.01}
          min={0}
          value={produto.frete}
          onChange={(e) =>
            setProduto({ ...produto, frete: Number(e.target.value) })
          }
        />
        <button
          className="p-2 text-white rounded bg-blue-500"
          onClick={(e) => {
            e.preventDefault();
            handleAddProduto(produto);
          }}
        >
          Adicionar
        </button>
      </Form>
      <div className="mt-4">
        {props.produtos
          .filter((p) => !p.deleted)
          .filter((p) => !p.editting)
          .map((produto, index) => (
            <div
              className="max-w-md mx-auto border-t border-b overflow-hidden md:max-w-2xl"
              key={index}
            >
              <div className="md:flex justify-between items-center">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Código: {produto.code}
                  </div>
                  <a
                    href="#"
                    className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  >
                    {produto.description}
                  </a>
                  <div className="mt-2 text-gray-500 flex gap-4">
                    <span>Quantidade: {produto.quantity}</span>
                    <span className="text-gray-500">
                      Price: R$ {produto.price}
                    </span>
                  </div>
                </div>
                <div className="p-2 flex">
                  <a
                    className="cursor-pointer p-4 text-blue-500 hover:text-blue-700 transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditProduto(index);
                    }}
                  >
                    <FiEdit />
                  </a>
                  <a
                    className="cursor-pointer p-4 text-red-500 hover:text-red-700 transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteProduto(index);
                    }}
                  >
                    <FiTrash />
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

import casasBahiaLogo from "../assets/casas-bahia-logo.svg.png";

export default function Navbar() {
  return (
    <nav className="flex px-2 py-2 border-b items-center bg-gradient-to-r from-blue-500 to-red-500">
      <a className="flex-1 flex gap-2 align-middle items-center" href="/">
        <img src={casasBahiaLogo} className="h-12" />
      </a>
      <div className="flex-1 text-right text-white">
        <a href="/orcamento/novo">Novo Orçamento</a>
      </div>
    </nav>
  );
}

import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;

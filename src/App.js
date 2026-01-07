import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import AllProducts from "./pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/" element={<AllProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


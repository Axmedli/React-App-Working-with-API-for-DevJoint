import { useEffect, useState } from "react";
import api from "../utils/axios";
import Card from "../components/Card";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Yüklənir...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Xəta: {error}</p>;
  if (products.length === 0) return <p className="text-center mt-10">Heç bir məhsul tapılmadı.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-6">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
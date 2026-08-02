import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || data.image);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Yüklənir...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Xəta: {error}</p>;
  if (!product) return <p className="text-center mt-10">Məhsul tapılmadı.</p>;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-20 py-6">
      <Link
        to="/"
        className="inline-block mb-6 text-[#181A2A] hover:text-blue-500 font-medium"
      >
        ← Geri qayıt
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="w-full h-[350px] md:h-[420px] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={selectedImage}
              alt={product.title}
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`shrink-0 w-[70px] h-[70px] border rounded-lg overflow-hidden ${
                    selectedImage === img
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} - ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2">
          {product.brand && (
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          )}
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          {product.rating && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500 font-medium">
                ★ {product.rating}
              </span>
              {product.stock !== undefined && (
                <span className="text-sm text-gray-500">
                  ({product.stock} ədəd stokda)
                </span>
              )}
            </div>
          )}

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <p className="text-red-600 font-semibold text-2xl">
              ${product.price}
            </p>
            {product.discountPercentage && (
              <span className="text-sm text-green-600 font-medium">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <button className="mt-6 w-full sm:w-auto px-8 py-3 bg-[#181A2A] text-white rounded-lg font-medium hover:bg-black transition-colors">
            Səbətə əlavə et
          </button>

          {product.category && (
            <p className="text-sm text-gray-500 mt-4">
              Kateqoriya:{" "}
              <span className="capitalize font-medium">
                {product.category}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
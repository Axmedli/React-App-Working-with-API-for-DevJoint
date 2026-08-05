import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <Link className="min-w-[300px] w-full" to={`/product-details/${product.id}`}>
      <div className="relative w-full h-full border bg-white hover:bg-taupe-50 border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 ease-in-out">
        <img
          className="w-full h-[200px] object-contain"
          src={product.image ? product.image : product.images[0]}
          alt={product.title}
        />
        <h2 className="text-2xl font-semibold mt-3">{product.title}</h2>
        <p className="my-4">{product.description}</p>
        <p className="text-red-600 font-medium">${product.price}</p>
      </div>
    </Link>
  );
};

export default Card;
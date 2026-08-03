import Card from "../components/Card";
import Spinner from "../components/Spinner";
import useInfiniteFetch from "../hooks/useInfiniteFetch";

const Products = () => {
  const { items, loading, hasMore, loaderRef } = useInfiniteFetch("/products", 12);

  if (loading) return <Spinner size="lg" fullPage />;           
  if (items.length === 0) return <p className="text-center mt-10">Heç bir məhsul tapılmadı.</p>;

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {hasMore && <div ref={loaderRef}><Spinner /></div>}
    </div>
  );
};

export default Products;
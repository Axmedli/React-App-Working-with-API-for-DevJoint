import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../utils/axios";

const DEBOUNCE_DELAY = 400;

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    let ignore = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const { data } = await api.get("/products/search", {
          params: { q: query, limit: 5 },
        });
        if (!ignore) {
          setResults(data.products || []);
          setIsOpen(true);
        }
      } catch {
      } finally {
        if (!ignore) setLoading(false);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
      <Link
        to="/"
        className="self-start sm:self-auto text-[#181A2A] hover:text-blue-500 font-medium"
      >
        Ana səhifə
      </Link>

      <div className="relative w-full sm:w-auto" ref={wrapperRef}>
        <input
          className="w-full sm:w-[220px] md:w-[260px] h-[40px] px-4 py-2 rounded-lg outline-none bg-[#F4F4F5] text-black"
          placeholder="Axtar..."
          type="search"
          aria-label="Məhsul axtarışı"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
        />

        {isOpen && (
          <div className="absolute top-[45px] left-0 w-full sm:w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[320px] overflow-y-auto">
            {loading ? (
              <p className="text-sm text-gray-500 px-4 py-3">Axtarılır...</p>
            ) : results.length === 0 ? (
              <p className="text-sm text-gray-500 px-4 py-3">Nəticə tapılmadı.</p>
            ) : (
              results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{product.title}</p>
                    <p className="text-xs text-gray-500">${product.price}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
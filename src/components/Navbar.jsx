import { Link } from "react-router-dom";


const Navbar = () => {
 
  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
      <Link
        to="/"
        className="self-start sm:self-auto text-[#181A2A] hover:text-blue-500 font-medium"
      >
        Ana səhifə
      </Link>

      <div className="relative w-full sm:w-auto">
        <input
          className="w-full sm:w-[220px] md:w-[260px] h-[40px] px-4 py-2 rounded-lg outline-none bg-[#F4F4F5] text-black"
          placeholder="Axtar..."
          type="search"
          aria-label="Məhsul axtarışı"
        />

      </div>
    </div>
  );
};

export default Navbar;
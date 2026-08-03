const SIZE_CLASSES = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-22 h-22 border-4",
};

const Spinner = ({ size = "md", fullPage = false, className = "" }) => {
  const spinner = (
    <div
      className={`${SIZE_CLASSES[size]} border-gray-300 border-t-blue-500 rounded-full animate-spin ${className}`}
    />
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center py-8">{spinner}</div>;
};

export default Spinner;
const LoadingSkeleton = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-2 rounded-md">
      <div className="animate-pulse w-full">
        <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
        <div className="mt-4 h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

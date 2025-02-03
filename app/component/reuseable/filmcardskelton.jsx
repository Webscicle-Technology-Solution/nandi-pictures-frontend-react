const SkeletonLoader = () => {
    return (
      <div className="w-[76vw] flex flex-col gap-10 overflow-visible">
        <div className="align-self-start!">
          <div className="flex space-x-4 overflow-visible">
            {/* Repeat this div for each skeleton card */}
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="mt-5 ml-3 mb-5 h-[400px] bg-gray-900 rounded-lg overflow-hidden shadow-lg text-white animate-pulse"
              >
                <div className="h-[100px] bg-gray-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute top-6 left-4 text-[15px] font-semibold pr-10 overflow-clip bg-gray-700 h-4 mb-2"></div>
                <div className="absolute top-5 items-end justify-end w-full flex flex-col pr-3 bg-gray-700 h-8"></div>
                <div className="absolute pt-2 bottom-4 ml-2 pl-3 pr-3 pb-2 flex items-center space-x-2 hover:bg-white/40 rounded-xl cursor-pointer">
                  <div className="w-8 h-8 bg-gray-700 rounded-full animate-spin"></div>
                  <span className="text-lg font-light bg-gray-700 w-24 h-6 animate-pulse"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  
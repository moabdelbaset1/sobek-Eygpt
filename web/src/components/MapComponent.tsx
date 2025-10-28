"use client";

interface MapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  mapStyle?: 'default' | 'minimal';
}

export const MapComponent = ({ center, mapStyle = 'default' }: MapComponentProps) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-100">
      {/* Fake Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-200">
        {/* Street-like grid */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="streetGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streetGrid)" />
          </svg>
        </div>

        {/* Buildings */}
        <div className="absolute top-10 left-10 w-8 h-12 bg-gray-400 rounded-sm opacity-60"></div>
        <div className="absolute top-20 right-16 w-6 h-16 bg-gray-500 rounded-sm opacity-60"></div>
        <div className="absolute bottom-16 left-20 w-10 h-8 bg-gray-300 rounded-sm opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-7 h-14 bg-gray-400 rounded-sm opacity-60"></div>
        <div className="absolute top-32 left-1/3 w-9 h-10 bg-gray-500 rounded-sm opacity-60"></div>

        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-300 opacity-40"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-gray-300 opacity-40"></div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
        <div className="flex flex-col gap-1">
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Location Marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-white px-2 py-1 rounded shadow-lg text-xs font-medium text-gray-800 whitespace-nowrap">
              Our Office
            </div>
          </div>
        </div>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <div className="text-xs text-gray-600 mb-1">© Virtual Map</div>
        <div className="text-sm font-medium text-gray-800">Cairo, Egypt</div>
        <div className="text-xs text-gray-500 mt-1">30.0444°N, 31.2357°E</div>
      </div>
    </div>
  );
};
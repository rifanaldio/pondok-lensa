import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { formatCurrency, getProductImageUrl } from '../../utils/products';
import { Phone, Navigation, X, AlertTriangle } from 'lucide-react';
import { updateOrderStatus } from '../../store/slices/orderSlice';

// Location data
const locationData = {
  jakarta: {
    name: 'Pondok Lensa Jakarta',
    address: 'Jl. Tebet Raya No.45A, Tebet, Jakarta Selatan, DKI Jakarta 12820, Indonesia',
    website: 'www.facebook.com/pondoklensa',
    phone: '082130003366',
    hours: 'Jam Buka: 24 hours',
    whatsapp: '6282130003366', // Format untuk WhatsApp: tanpa + dan spasi
    mapsUrl: 'https://www.google.com/maps/place/Pondok+Lensa+Jakarta/@-6.2287111,106.8544389,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f3f7380cc1d5:0xdcfc5a97e4aec34e!8m2!3d-6.2287111!4d106.8544389!16s%2Fg%2F11fjyvgjm2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
  },
  surabaya: {
    name: 'Pondok Lensa Surabaya',
    address: 'Jl. Raya Darmo Permai I No.58, Pradahkalikendal, Kec. Dukuhpakis, Surabaya, Jawa Timur 60226',
    website: 'www.facebook.com/pondoklensa',
    phone: '082140007010',
    hours: 'Jam Buka: 07:00 - 23:00 local time',
    whatsapp: '6282140007010', // Format untuk WhatsApp: tanpa + dan spasi
    mapsUrl: 'https://www.google.com/maps/place/Pondok+Lensa+Surabaya/@-7.2821261,112.6957925,15z/data=!4m6!3m5!1s0x2dd7fd47ca889c77:0x8dd97a15b57b52f9!8m2!3d-7.2821261!4d112.6957925!16s%2Fg%2F11vt5lyjlf?entry=tts',
  },
};

const BelumDiambil = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orders);
  const belumDiambilOrders = orders.filter((order) => order.status === 'belum_diambil');
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  const handleCancelOrder = (orderId: string) => {
    setCancelOrderId(orderId);
  };

  const confirmCancel = () => {
    if (cancelOrderId) {
      dispatch(updateOrderStatus({ orderId: cancelOrderId, status: 'dibatalkan' }));
      setCancelOrderId(null);
    }
  };

  const cancelCancel = () => {
    setCancelOrderId(null);
  };

  if (belumDiambilOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Belum ada pesanan yang belum diambil</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
        >
          Mulai Pesan
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {belumDiambilOrders.map((order) => {
        const mainImage = order.product.images?.[0];
        const location = locationData[order.pickupLocation];
        const pickupDateTime = new Date(`${order.pickupDate}T${order.pickupTime}`);
        const returnDateTime = new Date(`${order.returnDate}T${order.returnTime}`);

        return (
          <div
            key={order.id}
            className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            {/* Cancel Button - Top Right */}
            <button
              onClick={() => handleCancelOrder(order.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              aria-label="Cancel order"
            >
              <X size={20} />
            </button>

            {/* Product Info */}
            <div className="flex gap-6 pr-12">
              {mainImage && (
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={getProductImageUrl(mainImage.image)}
                    alt={order.product.title || order.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                  {order.product.title || order.product.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {formatCurrency(order.product.price || 0)} / day
                </p>
                
                {/* Rental Info - Compact */}
                <div className="space-y-1.5 text-sm">
                  <div className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Pengambilan:</span>{' '}
                    {pickupDateTime.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    {order.pickupTime} WIB
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Pengembalian:</span>{' '}
                    {returnDateTime.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    {order.returnTime} WIB
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Durasi:</span> {order.rentalDays} hari
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Actions - Simple */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {location.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{location.address}</p>
                </div>
                
                {/* Icon Actions */}
                <div className="flex items-center gap-3">
                  {/* Phone Icon */}
                  <a
                    href={`https://wa.me/${location.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    onMouseEnter={() => setHoveredIcon(`phone-${order.id}`)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors cursor-pointer">
                      <Phone size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    {hoveredIcon === `phone-${order.id}` && (
                      <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-20 shadow-xl animate-in fade-in duration-200">
                        {location.phone}
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                      </div>
                    )}
                  </a>

                  {/* Map Icon */}
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    onMouseEnter={() => setHoveredIcon(`map-${order.id}`)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors cursor-pointer">
                      <Navigation size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    {hoveredIcon === `map-${order.id}` && (
                      <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-20 shadow-xl animate-in fade-in duration-200">
                        Lihat petunjuk arah
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Cancel Confirmation Modal */}
      {cancelOrderId && (
        <div className="fixed -inset-full z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={cancelCancel}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            <div className="p-6">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                Batalkan Rental?
              </h3>

              {/* Message */}
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Apakah anda yakin untuk membatalkan rental?
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={cancelCancel}
                  className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Ya, Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BelumDiambil;


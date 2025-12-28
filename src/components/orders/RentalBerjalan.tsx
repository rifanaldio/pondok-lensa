import { useAppSelector } from '../../hooks/useAppSelector';

const RentalBerjalan = () => {
  const orders = useAppSelector((state) => state.order.orders);
  const rentalBerjalanOrders = orders.filter((order) => order.status === 'rental_berjalan');

  if (rentalBerjalanOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Belum ada rental yang sedang berjalan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rentalBerjalanOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-500 dark:text-gray-400">Rental berjalan untuk: {order.product.title || order.product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default RentalBerjalan;


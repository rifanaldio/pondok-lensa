import { useAppSelector } from '../../hooks/useAppSelector';

const Dibatalkan = () => {
  const orders = useAppSelector((state) => state.order.orders);
  const dibatalkanOrders = orders.filter((order) => order.status === 'dibatalkan');

  if (dibatalkanOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Belum ada pesanan yang dibatalkan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dibatalkanOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-500 dark:text-gray-400">Pesanan dibatalkan: {order.product.title || order.product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Dibatalkan;


import { useCartStore } from "../stores/useCartStore";
import { Trash } from "lucide-react";

const SavedForLaterItem = ({ item }) => {
  const { removeFromSaved, addToCart } = useCartStore();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(item);  
    removeFromSaved(item._id); 
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-20 w-20 rounded object-cover"
            src={item.image}
            alt={item.name}
          />
          <p className="text-base font-medium text-white">{item.name}</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>

          <button
            className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 hover:underline"
            onClick={() => removeFromSaved(item._id)}
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedForLaterItem;

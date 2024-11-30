import { useCartStore } from "../stores/useCartStore";
import SavedForLaterItem from "./SavedForLaterItem";

const SavedForLater = () => {
  const { savedForLater } = useCartStore();

  if (savedForLater.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-semibold text-gray-500">You have no items saved for later</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-emerald-400 mb-8">
          Saved for Later
        </h2>

        <div className="space-y-6">
          {savedForLater.map((item) => (
            <SavedForLaterItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedForLater;

import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-16 w-full rounded-lg group">
      <Link to={`/category${category.href}`}>
        <div className="w-full h-full cursor-pointer relative">
          <img
            className="w-16 h-16 object-cover rounded-md transform transition-transform duration-300 ease-out group-hover:scale-110"
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;

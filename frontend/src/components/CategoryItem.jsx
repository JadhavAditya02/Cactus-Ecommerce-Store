import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-[4rem] w-full rounded-lg group">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <img
            className="w-16 h-16 object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-110"
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
          />
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;




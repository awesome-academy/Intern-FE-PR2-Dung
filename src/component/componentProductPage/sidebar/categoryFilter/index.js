import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getCategories } from "../../../../redux/action";

export default function CategoryFilter() {
  const filter = useSelector((state) => state.productsReducer.filter);
  const categoriesFilter = useSelector((state) => state.filter.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="Categories">
      <ul>
        {categoriesFilter.map((category) => (
          <li
            className={filter.category === category.name && "active"}
            onClick={() => {
              dispatch(changeFilter({ ...filter, category: category.name }));
            }}
            key={category.id}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

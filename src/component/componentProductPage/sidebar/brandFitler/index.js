import "./style.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getBrand } from "../../../../redux/action";

export default function BrandFilter() {
  const brandFitler = useSelector((state) => state.filter.brand);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  return (
    <div className="Brand">
      <ul>
        {brandFitler.map((brand) => (
          <BrandFilterItem key={brand.name} brand={brand} />
        ))}
      </ul>
    </div>
  );
}

const BrandFilterItem = ({ brand }) => {
  const filter = useSelector((state) => state.productsReducer.filter);
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const filterBrand = filter.brand || [];

  const handleFilterBrand = (brand) => {
    const index = filterBrand.findIndex((item) => item === brand);
    index === -1 ? filterBrand.push(brand) : filterBrand.splice(index, 1);
    dispatch(changeFilter({ ...filter, brand: filterBrand }));
  };

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      setChecked(false);
    }
  }, [filter]);
  return (
    <li className={isChecked === true && "active"}>
      <input
        type="checkbox"
        value={brand.name}
        id={brand.name}
        hidden
        checked={isChecked}
      />
      <label
        htmlFor={brand.name}
        onClick={() => {
          setChecked(!isChecked);
          handleFilterBrand(brand.name);
        }}
      >
        {brand.name}
      </label>
    </li>
  );
};

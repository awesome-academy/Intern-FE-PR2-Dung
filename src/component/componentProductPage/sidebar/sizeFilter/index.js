import "./style.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getSize } from "../../../../redux/action";

export default function SizeFilter() {
  const sizeFilter = useSelector((state) => state.filter.size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSize());
  }, []);
  return (
    <div className="size-filter d-flex">
      {sizeFilter.map((size) => (
        <SizeFilterItem key={`size-${size}`} size={size} />
      ))}
    </div>
  );
}

const SizeFilterItem = ({ size }) => {
  const filter = useSelector((state) => state.productsReducer.filter);
  const filterSize = filter.size_like || [];
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleSizeFilter = (size) => {
    const index = filterSize.findIndex((item) => item === size);

    index === -1 ? filterSize.push(size) : filterSize.splice(index, 1);
    dispatch(changeFilter({ ...filter, size_like: filterSize }));
  };

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      setChecked(false);
    }
  }, [filter]);
  return (
    <div className={`size-filter__item m-2 ${isChecked === true && "active"}`}>
      <input type="checkbox" id={`size${size}`} hidden checked={isChecked} />
      <label
        htmlFor={`size${size}`}
        onClick={() => {
          setChecked(!isChecked);
          handleSizeFilter(size);
        }}
      >
        {size}
      </label>
    </div>
  );
};

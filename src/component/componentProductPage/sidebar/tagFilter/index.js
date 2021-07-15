import "./style.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getTag } from "../../../../redux/action";

export default function TagFilter() {
  const tagFilter = useSelector((state) => state.filter.tag);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTag());
  }, []);
  return (
    <div className="tag d-flex flex-wrap">
      {tagFilter.map((tag) => (
        <TagFilterItem key={`tag-${tag}`} tag={tag} />
      ))}
    </div>
  );
}

const TagFilterItem = ({ tag }) => {
  const filter = useSelector((state) => state.productsReducer.filter);
  const filterTag = filter.tag_like || [];
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleTagFilter = (tag) => {
    const index = filterTag.findIndex((item) => item === tag);
    index === -1 ? filterTag.push(tag) : filterTag.splice(index, 1);
    dispatch(changeFilter({ ...filter, tag_like: filterTag }));
  };

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      setChecked(false);
    }
  }, [filter]);
  return (
    <div className={`tag-item ${isChecked === true && "active"}`}>
      <input type="checkbox" id={`tag${tag}`} hidden checked={isChecked} />
      <label
        htmlFor={`tag${tag}`}
        onClick={() => {
          setChecked(!isChecked);
          handleTagFilter(tag);
        }}
      >
        {tag}
      </label>
    </div>
  );
};

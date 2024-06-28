import React, { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success mb-2">
        Add Element
      </button>
      <ul className="p-0">
        {array.map((item, index) => (
          <li key={index} className="card d-flex">
            <div className="card-body">
              {item}
              <button
                onClick={() => deleteElement(index)}
                id="wd-delete-element-click"
                className="btn btn-danger ms-5"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

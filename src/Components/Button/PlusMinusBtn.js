import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  // States
  const [btn, setBtn] = useState(1);
  useEffect(()=> {
    props.setCount(Number(btn))
  }, [btn])
  
  return (
    <div className="d-flex align-items-center gap-2">
      <div>
        <input
          type="number"
          className="form-control"
          value={btn}
          min={1}
          max={100}
          onChange={(e) => {
            if (e.target.value >= 1) {
              setBtn(e.target.value);
            } 
            else {
              setBtn('');
            }
          }}
        />
      </div>

      <div className="d-flex align-items-center gap-1">
          <button
            type="button"
            style={{width: '40px'}}
            className="btn btn-danger btn-number"
            onClick={(e) => {
            if (btn > 0) {
              setBtn((prev) => prev - 1);
            }
          }}
            disabled={btn <= 1}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            type="button"
            style={{width: '40px'}}
            className="btn btn-success btn-number"
             onClick={(e) => {
              setBtn((prev) => ++prev);
            }}
            disabled={btn >= 100}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
      </div>
    </div>
  );
}

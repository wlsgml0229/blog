import { useState } from "react";

const IMAGE_1_URL = "";
export default function Carousel() {
  const [activeImg, setActiveImg] = useState(1);
  return (
    <div className="carousel">
      <ul className="carousel__slides">
        <input
          type="radio"
          name="radio-buttons"
          id="img-1"
          checked={activeImg === 1}
          readOnly
        />
        <li className="carousel__slide-container">
          <div className="carousel__slide-img">
            <img alt="scenery 1" src={IMAGE_1_URL} />
          </div>
          r
          <div className="carousel__controls">
            <label
              onClick={() => setActiveImg(3)}
              className="corousel__slide-prev"
            >
              <span>&lsaquo;</span>
            </label>
            <label
              onClick={() => setActiveImg(2)}
              className="carusel__slide-next"
            >
              <span>&rsaquo;</span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}

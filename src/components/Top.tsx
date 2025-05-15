import React, { useEffect } from "react";
import top from "../assets/img/icon/topbtn2.png";

export default function Top() {
  useEffect(() => {
    const topButton = document.querySelector(".top_btn");
    if (topButton) {
      topButton.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }, []);

  return (
    <div className="top_btn" id="top_btn">
      <span>GO TOP!</span>
      <img src={top} alt="" />
    </div>
  );
}

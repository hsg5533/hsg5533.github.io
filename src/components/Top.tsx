import React, { useEffect } from "react";
import top from "../assets/img/icon/topbtn2.png";

export default function Top() {
  useEffect(() => {
    const topButton = document.querySelector(".top-btn");
    if (topButton) {
      topButton.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    }
  }, []);

  return (
    <div className="top-btn" id="top-btn">
      <span>GO TOP!</span>
      <img src={top} alt="" />
    </div>
  );
}

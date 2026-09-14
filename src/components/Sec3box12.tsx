import image52 from "../assets/img/background/image52.png";
import image53 from "../assets/img/background/image53.png";
import image54 from "../assets/img/background/image54.png";
import image55 from "../assets/img/background/image55.png";

export default function Sec3box12() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide12">
          <img src={image52} alt="" />
        </div>
        <div className="pr-img slide12">
          <img src={image53} alt="" />
        </div>
        <div className="pr-img slide12">
          <img src={image54} alt="" />
        </div>
        <div className="pr-img slide12">
          <img src={image55} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L12" />
        <input type="button" value="〉" className="pr-btn btn_R12" />
        <div className="indis12"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">주얼리 컨시어져 챗봇</div>
          <div className="pr-desc">React, Node.js, MySQL</div>
          <p className="pr-txt">
            (주)세미콜론즈에서 제작한 주얼리 컨시어져 챗봇입니다. ai를 활용하여
            반지 추천, 지역 기반 매장 추천, 다이아 상담이 가능합니다.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

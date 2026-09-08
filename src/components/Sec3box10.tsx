import image42 from "../assets/img/background/image42.png";
import image43 from "../assets/img/background/image43.png";
import image44 from "../assets/img/background/image44.png";
import image45 from "../assets/img/background/image45.png";
import image46 from "../assets/img/background/image46.png";
import image47 from "../assets/img/background/image47.png";
import image48 from "../assets/img/background/image48.png";

export default function Sec3box10() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide10">
          <img src={image42} alt="" />
        </div>
        <div className="pr-img slide10">
          <img src={image43} alt="" />
        </div>
        <div className="pr-img slide10">
          <img src={image44} alt="" />
        </div>
        <div className="pr-img slide10">
          <img src={image45} alt="" />
        </div>
        <div className="pr-img slide10">
          <img src={image46} alt="" />
        </div>
        <div className="pr-img slide10">
          <img src={image47} alt="" />
        </div>
        <div className="pr-img slide10">
          <img src={image48} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L10" />
        <input type="button" value="〉" className="pr-btn btn_R10" />
        <div className="indis10"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">빙그리 어플리케이션</div>
          <div className="pr-desc">React Native, php, MySQL</div>
          <p className="pr-txt">
            React Native를 활용하여 빙그리 어플리케이션을 제작하였습니다.
            <br />
            백엔드로 php를 사용한 그누보드와 MySQL을 활용하여 데이터베이스를
            구축하였습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

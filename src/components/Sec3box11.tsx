import image49 from "../assets/img/background/image49.jpg";
import image50 from "../assets/img/background/image50.jpg";
import image51 from "../assets/img/background/image51.jpg";

export default function Sec3box10() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide11">
          <img src={image49} alt="" />
        </div>
        <div className="pr-img slide11">
          <img src={image50} alt="" />
        </div>
        <div className="pr-img slide11">
          <img src={image51} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L11" />
        <input type="button" value="〉" className="pr-btn btn_R11" />
        <div className="indis11"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">영덕 알리미 어플리케이션</div>
          <div className="pr-desc">React Native, php, MySQL</div>
          <p className="pr-txt">
            (주)세미콜론즈에서 제작한 영덕 알리미 어플리케이션 입니다. 백엔드로
            php를 사용한 그누보드와 MySQL을 활용하여 데이터베이스를
            구축하였습니다. <br />
            영덕에 관한 다양한 정보를 제공하는 어플리케이션으로, 영덕군청에서
            제공하는 공지사항, 행사정보, 관광정보, 재난문자 등을 확인할 수
            있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

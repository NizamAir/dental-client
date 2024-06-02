import NavMenu from "../NavMenu/NavMenu";
import logo from "/logo.svg";
import map from "/map.svg";
import phone from "/phone.svg";
import style from "./style.module.scss";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className={style.info}>
            <div className={style.info__desc}>
              <img className={style.info__desc_logo} src={logo} />
              <p className={style.info__desc_text}>
                Стоматологическая клиника <br /> в Казани
              </p>
            </div>
            <div className={style.info__contacts}>
              <div className={style.info__contacts_address}>
                <img src={map} />
                <p>
                  Ульянова ул., 3 Казань <br /> С 10.00 по 18.00
                </p>
              </div>
              <div className={style.info__contacts_phone}>
                <img src={phone} />
                <p>
                  <a href="tel:+79156904343">+7 (915) 690 43 43</a>
                  Звоните по любым вопросам
                </p>
              </div>
            </div>
          </div>
        </div>
        <NavMenu />
      </header>
    </>
  );
};

export default Header;

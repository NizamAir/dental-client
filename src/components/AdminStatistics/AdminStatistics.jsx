import style from "./style.module.scss";

import AllProductStarNew from "./AllProductStarNew";
import AllDoctorStarNew from "./AllDoctorStarNew";
import DoctorSingleStat from "./DoctorSingleStat";

export default function AdminStatistics() {
  return (
    <section className={style.section}>
      <h2 className={style.title}>Статистика</h2>
      <div className={style.pie}>
        <h2 className={style.subtitle}>Врачи/Смены</h2>
        <AllDoctorStarNew />
      </div>

      <div className={style.bar}>
        <h2 className={style.subtitle}>Популярность услуг</h2>
        <AllProductStarNew />
      </div>
      <div className={style.bump}>
        <h2 className={style.subtitle}>Рейтинги врачей</h2>
        <DoctorSingleStat />
      </div>
    </section>
  );
}

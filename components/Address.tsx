import style from "../styles/address.module.css";

interface IInfoProps {
  title: string;
  desc: string;
}

interface ILocationProps {
  info: string;
  locationInfo: Array<IInfoProps>;
}

export default function address({ info, locationInfo }: ILocationProps) {
  return (
    <div className={style.wrap}>
      {locationInfo?.map((item: IInfoProps) => {
        const { title, desc } = item;
        return (
          <div key={title}>
            <p className={style.title}>{title}</p>
            <p className={style.desc}>{desc}</p>
          </div>
        );
      })}
      <div>
        <p className={style.emoji}>💓💓</p>
        <p className={style.info}>{info}</p>
      </div>
    </div>
  );
}

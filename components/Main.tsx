import style from "../styles/main.module.css";

interface IMainProps {
  title: string;
  eventDetail: string;
  message: string;
}

export default function Main({ title, eventDetail, message }: IMainProps) {
  return (
    <div>
      <img
        src="https://d36zg6kvpmh9c7.cloudfront.net/invitations/wedding/EVBEtC/coverImage_2024-09-10T15:52:58.951Z_da_e69f2de3.jpeg"
        className={style.img}
      />
      <h3 className={style.h3}>{title}</h3>
      <p className={style.p}>{eventDetail}</p>
      <h2 className={style.h2}>모시는 글</h2>
      <img
        src="https://d36zg6kvpmh9c7.cloudfront.net/invitations/wedding/EVBEtC/greetingImage_2024-09-10T15:10:15.030Z_Fb_f62de649.jpeg"
        className={style.image}
      />
      <div className={style.message}>
        <p>{message}</p>
      </div>
    </div>
  );
}

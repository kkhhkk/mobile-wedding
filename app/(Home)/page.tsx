import style from "../../styles/home.module.css";
import Main from "../../components/Main";
import data from "../../data.json";
import Host from "../../components/Host";
import Calendar from "../../components/Calendar";
import Countdown from "../../components/Countdown";
import Photo from "../../components/gallery/Photo";
import Account from "../../components/account/Account";
import Map from "../../components/Map/Map";
import Address from "../../components/Address";
import Guestbook from "../../components/Guestbook";

export default function Home() {
  const wedding = data;
  return (
    <div className={style.container}>
      <Main
        title={wedding.greeting.title}
        eventDetail={wedding.greeting.eventDetail}
        message={wedding.greeting.message}
      />
      <Host
        groom={wedding.greeting.host.groom}
        bridge={wedding.greeting.host.bride}
      />
      <Calendar />
      <Countdown
        weddingDate={wedding.greeting.weddingDate}
        groomName={wedding.greeting.host.groom.name}
        brideName={wedding.greeting.host.bride.name}
      />
      <Photo />
      <Account hostInfo={wedding.hostInfo} />
      <Map
        address1={wedding.mapInfo.address1}
        address2={wedding.mapInfo.address2}
        naverMap={wedding.mapInfo.naverMap}
        kakaoMap={wedding.mapInfo.kakaoMap}
        lat={wedding.mapInfo.lat}
        lon={wedding.mapInfo.lon}
      />
      <Address info={wedding.info} locationInfo={wedding.locationInfo} />
      <Guestbook />
    </div>
  );
}

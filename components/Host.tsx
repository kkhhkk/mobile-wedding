import style from "../styles/host.module.css";

interface IParentsProps {
  relation: string;
  name: string;
}

interface IHostInfoProps {
  name: string;
  relation: string;
  parents: Array<IParentsProps>;
}

interface IHostProps {
  groom: IHostInfoProps;
  bridge: IHostInfoProps;
}

export default function Host({ groom, bridge }: IHostProps) {
  return (
    <div className={style.hostcontainer}>
      <div className={style.host}>
        {groom.parents && (
          <>
            {groom.parents.map((parent, index) => (
              <div key={index}>
                {index > 0 && " · "}
                {parent.name}
              </div>
            ))}
            <div className={style.text}>
              <div>의</div>
              <div className={style.relation}>{groom.relation}</div>
            </div>
            <span className={style.name}>{groom.name}</span>
          </>
        )}
      </div>
      <div className={style.host}>
        {bridge.parents && (
          <>
            {bridge.parents.map((parent, index) => (
              <div key={index}>
                {index > 0 && " · "}
                {parent.name}
              </div>
            ))}
            <div className={style.text}>
              <div>의</div>
              <div className={style.relation}>{bridge.relation}</div>
            </div>
            <span className={style.name}>{bridge.name}</span>
          </>
        )}
      </div>
    </div>
  );
}

import style from "../../styles/account.module.css";
import Arcodian from "./Arcodian";
import AccountDetail from "../account/AccountDetail";

interface IAccountProps {
  name: string;
  relation: string;
  bank: string;
  account: string;
  kakaopayAccount?: string;
  tossAccount?: string;
}

interface IHostProps {
  host: string;
  accountInfo: Array<IAccountProps>;
}
interface IHostInfoProps {
  hostInfo: Array<IHostProps>;
}

export default function account({ hostInfo }: IHostInfoProps) {
  return (
    <div>
      <div className={style.title}>마음 전하실 곳</div>
      <div className={style.wrap}>
        {hostInfo.map((host) => {
          return (
            <Arcodian title={host.host} key={host.host}>
              {host.accountInfo.map((account) => {
                return (
                  // <div key={account.name}>되나?</div>
                  <AccountDetail
                    key={account.name}
                    name={account.name}
                    relation={account.relation}
                    bank={account.bank}
                    account={account.account}
                    kakaopayAccount={account.kakaopayAccount}
                    tossAccount={account.tossAccount}
                  />
                );
              })}
            </Arcodian>
          );
        })}
      </div>
    </div>
  );
}

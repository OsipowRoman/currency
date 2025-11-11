import { Card, Divider,Table, Flex, Typography} from "antd";
import { useContext} from "react";
import type { AppContextType } from "../shared/types";
import AppContext from "../shared/AppContext";
import WalletDrawer from "./WalletDrawer";

const {Meta} = Card

const walletStyle:React.CSSProperties = {
  maxWidth: "70dvw",
  width: "1000px",
  marginLeft: "auto",
  maxHeight:"100%",
  overflowY: "auto",
  overflowX: "hidden"
}


export default function Wallet() {
    const {wallet} = useContext<AppContextType>(AppContext)

const columns = [
  {
    title: 'Код валюты',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Валюта',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Стоимость',
    dataIndex: 'price',
    key: 'price',
  },
];

const value = wallet.map((item) => {
  return {
    code: item.code,
    name: item.name,
    amount: item.amount,
    price: (+(1/item.totalSpend).toFixed(4)) + " $"
  }
})


  return (
    <Flex style={{flexDirection: "column", gap: "30px"}}>
      <WalletDrawer />
      <Card style={walletStyle} >
        <Meta
        title = {<Typography.Title style={{marginTop: "0px", marginBottom: "0px"}} level={4}>Электронный кошелёк</Typography.Title>}
        />
        <Divider/>

        <Table pagination = {false} dataSource={value} columns={columns} />
    </Card>
    </Flex>
  )
}

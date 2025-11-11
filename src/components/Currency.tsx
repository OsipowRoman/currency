import { Card, Typography } from 'antd';
import CurrecyValueNow from './Layount/CurrencyValueNow';

export default function Currency() {
  
  return (
    <Card
        style={{ width: '80%', height: "100%", overflowX: "hidden", overflowY: "auto" }}
        title= {<Typography.Title level={4} style={{margin: "0px"}}>Курсы валют</Typography.Title>}
      >
        <CurrecyValueNow/>
      </Card>
  )
}

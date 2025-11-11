import { Card, Statistic, List, Typography} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { type AppContextType} from '../../shared/types';
import AppContext from '../../shared/AppContext';


function AppSider() {
  const {wallet, currency} = useContext<AppContextType>(AppContext)
  
    return(
        <>
          {wallet.map((item) => {

            const purchasePricePerUnit = item.totalSpend / item.amount;
            const currentPrice = currency[item.code] || 0;
            const currentValue = item.amount / currentPrice;
            const profit = currentValue - item.totalSpend;
            const priceChange = (1/currentPrice) - purchasePricePerUnit;
            const persentDifference = purchasePricePerUnit !== 0 
              ? (priceChange / purchasePricePerUnit) * 100 
              : 0;
            const grow = currentValue > item.totalSpend;

            return (
              <Card key={item.code} size='small' variant="borderless" style={{ width: 180, marginBottom: "10px" }}>
               <Statistic
                title={<Typography.Title style={{margin: "0px"}} level={5} >{item.name}</Typography.Title>}
                value={persentDifference}
                precision={2}
                valueStyle={{ color: grow ? 'green' : "red"}}
                prefix={grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/> }
                suffix="%"
              />
               <List
                  size="small"
                  key={item.code}
                  dataSource={[
                    {title: "Инвестировано", value: item.totalSpend, hasSign: true},
                    {title: "Количество", value: item.amount},
                    {title: "Прибыль", value: profit.toFixed(3), hasSign: true},
                    {title: "Рыночная стоимость", value: (1/currency[item.code]).toFixed(4), hasSign: true}
                  ]}
                  renderItem={({title,value, hasSign}) => 
                  <List.Item style={{display:'flex', alignContent: "space-between", padding: "0px", paddingTop: "8px", paddingBottom: "8px"}}>
                    <span style={{textAlign: "left"}}>{title}</span>
                    <span style={{textAlign: "right"}}>
                      <Typography.Text type={grow? "success":"danger"}>
                        {value}{hasSign&& "$"}
                        </Typography.Text>
                    </span>
                  </List.Item>}
                />
            </Card>
            )
          })}
        </>
    )
}

export default AppSider
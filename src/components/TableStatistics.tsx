import { Table } from 'antd';
import type { TableColumnsType} from 'antd';
import type { AppContextType } from '../shared/types';
import AppContext from '../shared/AppContext';
import { useContext } from 'react';

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  capitalization: number;
  displayCapitalization: string;
  profit: number;
  displayProfit: string;
  marketValue: number;
  displayMarketValue: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Капитализация',
    dataIndex: 'displayCapitalization',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.capitalization - b.capitalization,
  },
  {
    title: 'Прибыль',
    dataIndex: 'displayProfit',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.profit - b.profit,
  },
   {
    title: 'Рыночная стоимость',
    dataIndex: 'displayMarketValue',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.marketValue - b.marketValue,
  },
];


export default function TableStatistics() {
  const {wallet, currency} = useContext<AppContextType>(AppContext)

  const data:DataType[] = wallet.map((money) => {
    const currentPrice = currency[money.code] || 0;
    const currentValue = money.amount / currentPrice;
    const profit = currentValue - money.totalSpend;

    return{
        key: money.code,
        name: money.name,
        amount: money.amount,
        capitalization: money.totalSpend,
        displayCapitalization: money.totalSpend + " $",
        profit: +profit.toFixed(3),
        displayProfit: profit.toFixed(3) + " $",
        marketValue: +(1/currency[money.code]).toFixed(3),
        displayMarketValue: +(1/currency[money.code]).toFixed(3) + " $"
    }
  }
)

    return (
        <Table<DataType>
            columns={columns}
            dataSource={data}
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination = {false}
        />
    )
}
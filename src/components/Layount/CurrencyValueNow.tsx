import type { FormProps } from 'antd';
import { Button, Flex, Form, Select, Table } from 'antd';
import AppContext from '../../shared/AppContext';
import { useContext, useState } from 'react';
import type { AppContextType} from '../../shared/types';
import type { TableColumnsType} from 'antd';

type FieldType = {
  code: string[];
};

interface DataType {
  key: React.Key;
  name: string;
  marketValue: number;
  displayValue: string;
  country: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
   {
    title: 'Рыночная стоимость',
    dataIndex: 'displayValue',
    defaultSortOrder: 'descend',
    sorter: (a,b) => a.marketValue - b.marketValue,
  },
  {
    title: 'Страна',
    dataIndex: 'country',
  },
];

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const CurrecyValueNow = () => {
    const [form] = Form.useForm<FieldType>()
    const {codeCurrency, currency, supportedCodes} = useContext<AppContextType>(AppContext)
    const [data, setData] = useState<DataType[]>()
    
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const tableData = values.code.map((codes) => {
      const currencyName = codeCurrency.find(c => c.code === codes)
      const marketValue = 1/currency[codes]
      
     return {
      key: codes,
      name: currencyName?.currency || 'Неизвестно',
      marketValue: marketValue,
      displayValue: marketValue.toFixed(3) + " $",
      country: currencyName?.country || 'Не указано'
    } as DataType;
    
    })

    setData(tableData)
  };
  
  

    const options = Object.values(supportedCodes).map((coin) => {
      return {
          value: coin[0],
          label : coin[1],
      }
    })

    return (
        <Flex style={{flexDirection: "column"}}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ width :"100%", display: "flex"}}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
              <Form.Item<FieldType>
              label=""
              name="code"
              rules={[{ required: true, message: 'Пожалуйста выберите валюту' }]}
              >
                <Select
                    style={{width: "100%", minWidth: "200px"}}
                    showSearch
                    placeholder="Выберите валюту"
                    optionFilterProp="label"
                    mode={'multiple'}
                    options={options}
                     onChange={(value: string[]) => {
                      form.setFieldsValue({ code: value});
                    }}
                  />
              </Form.Item>
  
              <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                  Найти
              </Button>
              </Form.Item>
          </Form>
          { data && <Table<DataType>
              columns={columns}
              dataSource={data}
              showSorterTooltip={{ target: 'sorter-icon' }}
          />}
        </Flex>

      );
}
 
export default CurrecyValueNow;
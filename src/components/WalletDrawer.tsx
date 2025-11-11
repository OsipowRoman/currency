  import { useContext, useRef, useState } from 'react'
  import { Button, Col, Drawer, Form, InputNumber, Row, Select, Space, Result, Modal } from "antd";
  import { type AppContextType, type fieldTypes, type Wallet } from '../shared/types';
  import AppContext from '../shared/AppContext';
  import { PlusOutlined } from '@ant-design/icons';
  import type { FormProps } from 'antd';

  export default function WalletDrawer() {
    const {currency, codeCurrency, supportedCodes, addAsset} = useContext<AppContextType>(AppContext)
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<fieldTypes>()
    const [modal, setModal] = useState(false)
    const newAsset = useRef<Wallet>({
      code: "",
      name: "",
      amount: 0,
      totalSpend: 0
    })


    const onFinish: FormProps<fieldTypes>['onFinish'] = (values) => {
      const newWallet: Wallet = {
        code: form.getFieldValue('code'),
        name: form.getFieldValue('name'),
        amount: form.getFieldValue('amount'),
        totalSpend: values.totalCost,
      }

      newAsset.current = newWallet
      setModal(true)
      addAsset(newWallet)
  };

    const onFinishFailed: FormProps<fieldTypes>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };

    const UpdatePrice = () => {
      const code = form.getFieldValue("code")
      const amount = form.getFieldValue('amount') || 0
      const price = currency[code]

      form.setFieldsValue({
        price: +price.toFixed(6),
        totalCost: +(amount * (1/price)).toFixed(2) || 0
      })
    }

  const options = Object.values(supportedCodes).map((coin) => {
      return {
          value: coin[0],
          label : coin[1],
      }
  })

    return (
        <>
        <Button style={{width : "20%"}} type="primary" onClick={()=> setOpen(true)} icon={<PlusOutlined />}>
          Купить валюту
        </Button>
        <Drawer
          title="Форма покупки валюты"
          width={720}
          onClose={()=> setOpen(false)}
          open={open}
          destroyOnHidden
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={()=> setOpen(false)}>Cancel</Button>
            </Space>
          }
        >
          <Form layout="vertical"
            onValuesChange={UpdatePrice}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{maxWidth: "100%"}}
          >
            <Row gutter={16}>
              <Col span={16}>
              <Form.Item
                  name="code"
                  label="Выберите валюту"
                  rules={[{ 
                    required: true,
                    type: "string",
                    message: 'Пожалуйста выберите валюту' }]}
                  >
              <Select
                  style={{width: "100%"}}
                  showSearch
                  placeholder="Выберите валюту"
                  optionFilterProp="label"
                  options={options}
                  onChange={(value: string) => {
                    form.setFieldsValue({ 
                      code: value,
                      price: currency[value],
                      name: codeCurrency.find(coin => coin.code === value)?.currency
                    });
                  }}
                />
                </Form.Item>

              <Form.Item
                  label = {`Количество`}
                  name="amount"
                  rules={[{
                    required: true,
                    type: "number",
                    min: 1,
                    message: "Пожалуйста введите число"
                  }]} 
                  >
                <InputNumber style={{width: '100%'}}/>
              </Form.Item>

              <Form.Item
              name= "price"
              label = {`Стоимость`}
              >
                <InputNumber prefix= {<span>$</span>} name='price' style={{width: '100%'}} disabled/>
              </Form.Item>

              <Form.Item
              label = {`Общая стоимость`}
              name='totalCost'
              >
                <InputNumber prefix= {<span>$</span>} style={{width: '100%'}} disabled/>
              </Form.Item>

              <Form.Item
              >
                <Button type="primary" htmlType="submit">
                  Купить
                </Button>
              </Form.Item>
                <Modal
                  title=""
                  open = {modal}
                  closable={{ 'aria-label': 'Custom Close Button' }}
                  onOk={() => setModal(false)}
                  onCancel={() => setModal(false)}
                >
                   <Result
                      status="success"
                      title={`Покупка прошла успешно`}
                      subTitle={`Добавлено ${newAsset.current.amount} ${newAsset.current.name} на сумму ${newAsset.current.totalSpend.toFixed(2)}$`}
                    />
                </Modal>

              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    )
  }

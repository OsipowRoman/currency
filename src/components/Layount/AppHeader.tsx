import { Layout, Menu, Popover} from 'antd';
import { Link } from 'react-router-dom';
import { BarChartOutlined, WalletOutlined, LineChartOutlined, SyncOutlined} from '@ant-design/icons';
import { useContext } from 'react';
import AppContext from '../../shared/AppContext';
import { type AppContextType} from '../../shared/types';
import { message,FloatButton} from 'antd';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const AppHeader = () => {
  const {updateData} = useContext<AppContextType>(AppContext)
  const [messageApi, contextHolder] = message.useMessage();
  
  const updateCurrency = () => {
    updateData()
     messageApi.info('Обновление данных')
  }

  return(
  <Header style={headerStyle}>
    <Popover title = "Обновить данные">
    <FloatButton icon= {<SyncOutlined/>} onClick={() => updateCurrency()}/>
    </Popover>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      items={[
        { key: 1, icon: <WalletOutlined />, label: <Link to="/">Кошелёк</Link> },
        { key: 2, icon: <LineChartOutlined />, label: <Link to="/currency">Просмотр валют</Link> },
        { key: 3, icon: <BarChartOutlined />, label: <Link to="/statistics">Статистика</Link> },
      ]}
      style={{ display: 'flex', gap: "10px"}}
      />
      {contextHolder}
  </Header>
  )
};

export default AppHeader;
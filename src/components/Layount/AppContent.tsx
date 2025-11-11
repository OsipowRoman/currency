import { Layout } from 'antd';
import { Route, Routes } from 'react-router';
import Statistics from '../Statistics';
import Currency from '../Currency';
import Wallet from '../Wallet';
import Error from '../Error';
const { Content } = Layout;

class configuration {
  main = '/';
  currency = '/currency';
  statistics = '/statistics';
  settings = '/settings'
  error = '*';
}

const configProvider = new configuration

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: "#001529",
  color: 'white',
  height: "100dvh",
  padding: '30px',
  paddingLeft: '0px',
  display:"flex",
  alignContent: "center",
  justifyContent: "center "
};


const AppContent = function AppContent() {
 
    return(
      <Content style={contentStyle}>
        <Routes>
          <Route path = {configProvider.main}  element= {<Wallet/>} />
          <Route path = {configProvider.currency} element= {<Currency/>} />
          <Route path = {configProvider.statistics} element= {<Statistics/>} />
          <Route path = {configProvider.error}  element = {<Error/>}/> 
        </Routes>
      </Content>
    )
}




export default AppContent
import React, { useContext } from 'react';
import { Flex, Layout, Spin } from 'antd';
import AppSider from './AppSider';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppContext from '../../shared/AppContext';
import type { AppContextType } from '../../shared/types';
import Sider from 'antd/es/layout/Sider';
import { ErrorNotification } from '../ErrorNotification';

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  height: "100%",
  width: "100dvw",
  minHeight: '100vh',
};

const style = {
  alignContent: "center",
  justifyContent: "center",
  width: "100dvw",
  height: "100%"
}

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40x",
  height: '110dvh',
  overflowX: "hidden",
  overflowY: "auto",
  scrollbarWidth: "none",
}

const loadingStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0)',
  display: "flex",
  justifyContent: "center",
  alignContent: "center"
}

const content = <div style={loadingStyle} />;

const AppLayout = function AppLayout() {
    const {loading, error} = useContext<AppContextType>(AppContext)
  

  if(loading) return (
  <Flex style={style}>
    <Spin 
    size='large'
    tip = 'Loading...'
    >
      {content}
    </Spin>
  </Flex>
)
  
    return(
      <>
      {error ? <ErrorNotification/> :  
      <Layout hasSider  style={layoutStyle}>
        <Sider style={siderStyle}>
          <AppSider/>
        </Sider>
        <Layout >
         <AppHeader/>
         <AppContent/>
        </Layout>
      </Layout>
      }
      </>
    )
}

export default AppLayout
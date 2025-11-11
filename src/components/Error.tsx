import { Button, Card, Result, Typography } from 'antd';

export default function Error() {
  return (
    <Card
    style={{width: "80%", height: "100%", overflowY: "auto"}}
    >
      <Result
       status="404"
       title={<Typography.Title level={3} style={{fontSize: "40px"}}>404</Typography.Title>}
       subTitle={<Typography.Text>Похоже вы заблудились, но жизнь это вечный поиск, не отчаивайтесь</Typography.Text>}
       extra={<Button href='/' type="primary">Вернуться на главную</Button>}
     />
    </Card>
  )
}

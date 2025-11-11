import { Button, Card, Result, Typography } from 'antd';
import AppContext from "../shared/AppContext";
import { type AppContextType } from "../shared/types";
import { useContext } from 'react';


export const ErrorNotification = () => {
    const {updateData}= useContext<AppContextType>(AppContext)

    return(
        <Card style={{width: "100dvw", height: "100dvh"}}>
            <Result
                status="warning"
                title={<Typography.Title level={4}>Проблема подключения попробуйте позднее</Typography.Title>}
                extra={
                <Button onClick={updateData} type="primary" key="console">
                    Обновить данные
                </Button>
                }
            />
        </Card>
    )
}
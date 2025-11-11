import { Card} from "antd";
import PieStatictics from "./PieStatistics";
import { useState } from "react";
import TableStatistics from "./TableStatistics";

const statisticsStyle: React.CSSProperties = {
  width: "70%",
  overflowY: "auto",
  overflowX: "hidden",
}

const tabListNoTitle = [
  {
    key: 'pieDiagram',
    label: 'Круговая диаграмма',
  },
  {
    key: 'table',
    label: 'Табличное представление',
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  pieDiagram:<div style={{display: "flex"}}><PieStatictics /></div> ,
  table: <TableStatistics/>,
};


export default function Statistic(){
  const [activeTabKey2, setActiveTabKey2] = useState<string>('pieDiagram');


  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  return (
     <Card
        style={statisticsStyle}
        styles={{
          header: {
            display: "flex",
            justifyContent: "space-around"
          }
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>

  )
}

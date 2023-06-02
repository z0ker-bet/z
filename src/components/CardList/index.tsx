import { Avatar, Card, List } from 'antd';
import React, { FC } from 'react';

type Props = {
  className?: string;
  itemList: any[];
  title?: string;
  headerButton?: React.ReactNode | React.ReactElement;
  rowActions?: React.ReactNode[];
};

const CardList: FC<Props> = ({
  itemList,
  title,
  headerButton,
  className,
  rowActions,
}) => {
  return (
    <Card className={className} title={title} extra={headerButton}>
      <List
        itemLayout="horizontal"
        dataSource={itemList}
        renderItem={(item, index) => {
          return (
            <List.Item actions={rowActions} key={index}>
              <List.Item.Meta
                avatar={<Avatar size={30} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default CardList;

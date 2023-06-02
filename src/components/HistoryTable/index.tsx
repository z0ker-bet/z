import LinkIcon from '@assets/images/icons/link.svg';
// import TUnitIcon from '@assets/images/icons/t-unit.svg';
import { Table, TableColumnsType, Typography } from 'antd';
import { useRef, type FC } from 'react';
import useHistoryTable, {
  HistoryDataTable,
  type Props,
  type ReceivedProps,
} from './hook';
import styles from './style.module.scss';
// import { Link } from 'react-router-dom';
// import { ROUTES_NAMES } from '@/router/router';
import { ADDRESS_DATA, CHAINS_TYPE } from '@/contracts';
import { truncateAddress } from '@/utils';

const columns: TableColumnsType<HistoryDataTable> = [
  {
    title: 'Game',
    key: 'game',
    render: ({ game }: HistoryDataTable) => {
      return <span>Blackjack #{game}</span>;
      // return (
      //   <Link
      //     to={ROUTES_NAMES.BLACKJACK + '/' + game}
      //     className="w-fit flex cursor-pointer text-white underline"
      //   >
      //     {game}
      //     {/* <img src={LinkIcon} alt="LinkIcon" /> */}
      //   </Link>
      // );
    },
  },
  {
    title: 'Player',
    key: 'player',
    render: ({ player }: HistoryDataTable) => {
      return player ? truncateAddress(player) : 'N/A';
    },
  },
  {
    title: 'Dealer',
    key: 'dealer',
    render: ({ dealer }: HistoryDataTable) => {
      return dealer ? truncateAddress(dealer) : 'N/A';
    },
  },
  {
    title: 'Event Name',
    key: 'eventName',
    dataIndex: 'eventName',
  },
  {
    title: 'Created At',
    key: 'createdAt',
    render: ({ createdAt }: HistoryDataTable) => {
      return (
        <div className="flex">
          {createdAt}&nbsp;
          {/* <img src={LinkIcon} alt="LinkIcon" /> */}
        </div>
      );
    },
  },
  {
    title: 'Transaction Hash',
    key: 'transactionHash',
    render: ({ transactionHash }: HistoryDataTable) => {
      return (
        <a
          href={
            ADDRESS_DATA[CHAINS_TYPE].EXPLORER_TX_URL + '/txs/' + transactionHash
          }
          target="_blank"
          className="w-fit flex cursor-pointer underline text-brand"
        >
          {transactionHash ? truncateAddress(transactionHash) : 'N/A'}
          &nbsp;
          <img src={LinkIcon} alt="LinkIcon" />
        </a>
      );
    },
  },

  // {
  //   title: 'Bets',
  //   dataIndex: 'bets',
  //   key: 'bets',
  // },
  // {
  //   title: 'Wager',
  //   key: 'wager',
  //   render: ({ wager }: HistoryDataTable) => {
  //     return (
  //       <div className="flex">
  //         {wager}&nbsp;&nbsp;
  //         <img src={TUnitIcon} alt="TUnitIcon" />
  //       </div>
  //     );
  //   },
  // },
  // {
  //   title: 'Multiplier',
  //   dataIndex: 'multiplier',
  //   key: 'multiplier',
  // },
  // {
  //   title: 'Payout',
  //   key: 'payout',
  //   render: ({ payout }: HistoryDataTable) => {
  //     return (
  //       <div className="flex">
  //         {payout}&nbsp;&nbsp;
  //         <img src={TUnitIcon} alt="TUnitIcon" />
  //       </div>
  //     );
  //   },
  // },
  // {
  //   title: 'Profit',
  //   key: 'profit',
  //   render: ({ profit }: HistoryDataTable) => {
  //     return (
  //       <div className="flex">
  //         {profit}&nbsp;&nbsp;
  //         <img src={TUnitIcon} alt="TUnitIcon" />
  //       </div>
  //     );
  //   },
  // },
];

const HistoryTableLayout: FC<Props> = (props) => {
  const { historyDataTable } = props;

  const tableRef: React.Ref<HTMLDivElement> | undefined = useRef(null);

  return (
    <div className={styles['history']}>
      <div className={styles['history__header']}>
        <Typography.Text className={styles['history__header--left']}>
          bet history
        </Typography.Text>
        {/* <Button className={styles['history__header--right']}>
          view personal
        </Button> */}
      </div>
      <div className={styles['history__table']}>
        <Table
          ref={tableRef}
          dataSource={historyDataTable}
          columns={columns}
          pagination={false}
          scroll={{ y: 640, scrollToFirstRowOnChange: true }}
        />
      </div>
    </div>
  );
};

const HistoryTable: FC<ReceivedProps> = (props) => (
  <HistoryTableLayout {...useHistoryTable(props)} />
);

export default HistoryTable;

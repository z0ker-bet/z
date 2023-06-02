import CN from 'classnames';
import { useNavigate } from 'react-router';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import styles from './style.module.scss';
import Logo from '@assets/images/logo.svg';
import GamesIcon from '@assets/images/icons/games-icon.svg';
import GamesActiveIcon from '@assets/images/icons/games-active-icon.svg';
import DocsIcon from '@assets/images/icons/docs-icon.svg';
import DocsActiveIcon from '@assets/images/icons/docs-active-icon.svg';
import StarIcon from '@assets/images/icons/star-icon.svg';
import StarActiveIcon from '@assets/images/icons/star-active-icon.svg';
import RocketIcon from '@assets/images/icons/rocket-icon.svg';
import RocketActiveIcon from '@assets/images/icons/rocket-active-icon.svg';
import { Menu } from 'antd';
import MenuIcon from './MenuIcon';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

type SideMenuItemType = MenuItemType;

type Props = {
  className?: string;
};

const MenuKeys = ['/games', '/earn', '/referral', '/docs'];

function Component(): React.ReactElement<Props> {
  // const { pathname } = useLocation();
  const navigate = useNavigate();
  // animate sidebar
  const handleNavigate = ({ key, ...href }: { key: string }) => {
    console.log('href', href);
    if (key !== '/docs') {
      navigate(`${key}`);
    }
  };

  const location = useLocation();

  const selectedItems: any[] = useMemo(() => {
    let itemKey: any[] = [];
    MenuKeys.map((item: string) => {
      if (location.pathname.startsWith(item)) {
        itemKey = [item];
      }
      return item;
    });
    return itemKey;
  }, [location.pathname, MenuKeys]);

  const menuItems: SideMenuItemType[] = useMemo(
    () => [
      {
        key: '/games',
        icon: (
          <MenuIcon
            icon={GamesIcon}
            activeIcon={GamesActiveIcon}
            isActive={selectedItems.includes('/games')}
          />
        ),
        label: 'Games',
      },
      {
        key: '/docs',
        icon: (
          <MenuIcon
            icon={DocsIcon}
            activeIcon={DocsActiveIcon}
            isActive={selectedItems.includes('/docs')}
          />
        ),
        label: (
          <a
            href="https://medium.com/@zoker_bet/zero-knowledge-the-next-trend-of-crypto-or-just-a-child-who-cannot-grow-up-2f4ba50ebb7b"
            target="_blank"
          >
            Docs
          </a>
        ),
        // disabled: true,
      },
      {
        key: '/earn',
        icon: (
          <MenuIcon
            icon={RocketIcon}
            activeIcon={RocketActiveIcon}
            isActive={selectedItems.includes('/earn')}
          />
        ),
        label: 'Earn',
        disabled: true,
      },
      {
        key: '/referral',
        icon: (
          <MenuIcon
            icon={StarIcon}
            activeIcon={StarActiveIcon}
            isActive={selectedItems.includes('/referral')}
          />
        ),
        label: 'Referral',
        disabled: true,
      },
    ],
    []
  );

  return (
    <div className="h-full w-[70px] min-h-screen flex flex-col justify-between content-center sidebar-menu">
      <div
        className={CN(
          'min-h-24 min-w-24 flex justify-center content-center px-[12px] py-[16px]',
          styles.logoContainer
        )}
      >
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-full" />
        </Link>
      </div>
      <Menu
        className="bg-transparent border-e-0 flex flex-col align-center flex-1"
        items={menuItems}
        selectedKeys={selectedItems}
        onClick={handleNavigate}
      />
    </div>
  );
}

export default Component;

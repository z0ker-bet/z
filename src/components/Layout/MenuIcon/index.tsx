import React from 'react';
import styles from './style.module.scss';
import CN from 'classnames';

type MenuIconType = {
  icon: any;
  activeIcon: any;
  isActive?: boolean;
};

const MenuIcon: React.FC<MenuIconType> = ({ icon, activeIcon, isActive }) => {
  return (
    <div
      className={CN(styles.menuIcon, {
        [styles.active]: isActive,
      })}
    >
      <img src={isActive ? activeIcon : icon} className="w-[24px]" />
    </div>
  );
};

export default MenuIcon;

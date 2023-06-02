import React, { ComponentType, ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '@pages/Root';
import Home from '@pages/Home';
import Notfound from '@/pages/Notfound';

export class LazyLoader {
  public loader;
  public element;

  constructor(promise: () => Promise<{ default: ComponentType<any> }>) {
    this.loader = promise;
    this.element = React.lazy(promise);
  }

  public generateRouterObject(
    path: string
  ): {
    path: string;
    loader: () => Promise<any>;
    element: ReactNode;
  } {
    const Component = this.element;

    return {
      path,
      loader: this.loader,
      element: <Component />,
    };
  }
}

export const ROUTES_NAMES = {
  HOME: '/home',
  GAMES: '/games',
  BLACKJACK: '/games/blackjack',
  BLACKJACK_DETAIL: '/games/blackjack/:gameId',
};

const Games = new LazyLoader(() => import('@pages/Games'));
const Blackjack = new LazyLoader(() => import('@pages/Blackjack'));
const BlackjackDetail = new LazyLoader(() => import('@pages/BlackjackDetail'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      Games.generateRouterObject(ROUTES_NAMES.GAMES),
      Blackjack.generateRouterObject(ROUTES_NAMES.BLACKJACK),
      BlackjackDetail.generateRouterObject(ROUTES_NAMES.BLACKJACK_DETAIL),
    ],
  },
  {
    path: '*',
    element: <Notfound />,
  },
]);

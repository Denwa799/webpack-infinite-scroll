import { ReactNode } from 'react';

/**
 * @description This is the interface for the app infinite scroll component
 */
export interface IAppInfiniteScroll<T> {
  data: T[];
  threshold?: number;
  renderItem: (item: T) => ReactNode;
  fetchMore: () => void;
}

/**
 * @description This is the interface for the item elements component in app infinite scroll component
 */
export interface IItemElements<T> {
  visibleItems: T[];
  visibleStartIndex: number;
  itemHeight: number;
  renderItem: (item: T) => ReactNode;
}

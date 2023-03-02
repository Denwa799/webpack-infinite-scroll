import React from 'react';
import { IItemElements } from './types';
import styles from './styles.module.scss';

/**
 *
 * @description - This is a list of elements used in the app infinite scroll component
 *
 * @param {T[]} visibleItems - This is an array with elements that need to be drawn
 * @param {number} visibleStartIndex - This is the index of the first element to draw
 * @param {number} itemHeight - This is the height of the item
 * @param {function} renderItem - This is a callback function that returns an element for rendering
 * @return {JSX.Element} Returns a list with rendered elements
 */
export const ItemElements = <T,>({
  visibleItems,
  visibleStartIndex,
  itemHeight,
  renderItem,
}: IItemElements<T>) => {
  return (
    <>
      {visibleItems.map((item, index) => {
        const key = JSON.stringify(item);

        return (
          <div
            key={key}
            className={styles.itemContainer}
            style={{ top: (visibleStartIndex + index) * itemHeight }}
          >
            {renderItem(item)}
          </div>
        );
      })}
    </>
  );
};

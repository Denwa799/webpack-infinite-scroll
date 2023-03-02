import React, { useEffect, useRef, useState } from 'react';
import { IAppInfiniteScroll } from './types';
import { ItemElements } from './ItemElements';
import styles from './styles.module.scss';

/**
 *
 * @description - This is a component for drawing a list of elements, with loading new ones when reaching the bottom of the scroll
 *
 * @param {T[]} data - This is an array with data for rendering
 * @param {number} threshold - This is the number of elements that will additionally be located at the top and bottom inside the virtual scroll
 * @param {function} renderItem - This is a callback function that returns an element for rendering
 * @param {function} fetchMore - This is a function called when the last item in the list is reached
 * @returns Returns a list with rendered elements
 */

export const AppInfiniteScroll = <T,>({
  data,
  threshold = 5,
  renderItem,
  fetchMore,
}: IAppInfiniteScroll<T>) => {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleEndIndex, setVisibleEndIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* The initial height must not be equal to 0, otherwise division by 0 will occur in calculations */
  const [itemHeight, setItemHeight] = useState<number>(1);

  const visibleItems = data.slice(visibleStartIndex, visibleEndIndex + 1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      /* The height of the content is taken after the initial rendering */
      const itemContainer = container.children[0];
      const itemElement = itemContainer.children[0] as HTMLElement;
      setItemHeight(itemElement.offsetHeight);

      const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - threshold
      );
      const endIndex = Math.min(
        data.length - 1,
        Math.ceil((scrollTop + clientHeight) / itemHeight) + threshold - 1
      );

      setVisibleStartIndex(startIndex);
      setVisibleEndIndex(endIndex);

      if (scrollTop + clientHeight >= scrollHeight && itemHeight > 1) {
        fetchMore();
      }
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [data, itemHeight, fetchMore]);

  return (
    <div className={styles.AppInfiniteScroll} ref={containerRef}>
      <div
        className={styles.itemsBlock}
        style={{ height: data.length * itemHeight }}
      >
        {itemHeight <= 1 || visibleItems.length === data.length ? (
          renderItem(data[0])
        ) : (
          <ItemElements
            visibleItems={visibleItems}
            visibleStartIndex={visibleStartIndex}
            itemHeight={itemHeight}
            renderItem={renderItem}
          />
        )}
      </div>
    </div>
  );
};

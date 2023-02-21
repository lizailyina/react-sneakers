import React from 'react';
import { AppContext } from '../../App';

import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"

function Card({ id,
  title,
  imageUrl,
  price,
  itemId,
  onFavorite,
  onPlus,
  loading = false
}) {

  const { isItemAdded, isItemFavorite } = React.useContext(AppContext);

  const obj = {title: title, imageUrl: imageUrl, price: price, itemId: itemId }

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
  };

  return (
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader
            rtl
            speed={2}
            width={150}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
            <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="120" rx="5" ry="5" width="90" height="15" />
            <rect x="110" y="150" rx="10" ry="10" width="40" height="34" />
            <rect x="0" y="162" rx="10" ry="10" width="100" height="20" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite &&
              <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isItemFavorite(itemId) ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
              </div>
            }
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price} RUB.</b>
              </div>
              {onPlus && <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(itemId) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />}
            </div>
          </>

        )
      }
    </div >
  );
}

export default Card;

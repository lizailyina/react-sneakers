import React from 'react';
import { AppContext } from '../../App';

import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"

function Card({ id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
}) {

  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
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
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            </div>
          </>

        )
      }
    </div >
  );
}

export default Card;

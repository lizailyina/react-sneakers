import styles from "./Card.module.scss"
import React from "react";

function Card({title, imageUrl, price, onPlus, onFavorite}) {

    const [isAdded, setIsAdded] = React.useState(false)

    const onClickPlus = () => {
        onPlus({title : title, price: price, imageUrl: imageUrl});
        setIsAdded(true);
    }

    return (
        <div className={styles.card}>
            <div className="favorite">
            <img onClick={onFavorite}src="img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена: </span>
                <b>{price} руб.</b>
            </div>
            <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="" />
            </div>
        </div>
    );
}

export default Card;
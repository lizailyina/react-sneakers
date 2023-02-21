import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  async function changeOrderState() {
    await delay(1000);
    await setIsOrderComplete(false);
  }

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://63c488ec8067b6bef6da5be8.mockapi.io/orders', {
        items: cartItems
      });
      setOrderId(data.id);
      setIsOrderComplete(true)
      setCartItems([]);

      for (let i = 0; i < cartItems.length; ++i) {
        const item = cartItems[i];
        await axios.delete(`https://63c21e388bb1ca34754e1bcc.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert('Cannot submit order :(');
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened && styles.overlayVisible}`}>
      <div className={`${styles.drawer}`}>
        <h2 className="d-flex justify-between mb-30">
          Cart <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className={`${styles.items} flex`}>
              {items.map((obj, index) => (
                <div key={index}>
                  <div className="cartItem d-flex align-center mb-20" key={obj.id} >
                    <div
                      style={{ backgroundImage: `url(${obj.imageUrl})` }}
                      className="cartItemImg"></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} RUB.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.itemId)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} RUB. </b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} RUB. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Place Your Order <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info image={isOrderComplete ? "/img/complete-order.jpg" : "/img/cart-empty.png"}
            title={isOrderComplete ? "Order is Placed!" : "Cart is Empty"}
            description={isOrderComplete ?
              `Your order #${orderId} will be delivered soon` :
              "Add at least one sneakers to place an order."}
             onGreenButton = {() => changeOrderState()}/>
       )}
      </div>
    </div>
  );
}

export default Drawer;

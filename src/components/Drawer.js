import CartItem from "./CartItem"

function Drawer({ onClose, items = []}) {

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                Корзина
                <img onClick={onClose} className="remove-btn cu-p" src="/img/btn-remove.svg" alt="Remove" />
                </h2>
                <div className="items">
                    {items.map((obj, index) => 
                        (<CartItem 
                            title = {obj.title}
                            price = {obj.price}
                            imageUrl = {obj.imageUrl}
                        />)
                    )}
                </div>

                <div className="cartTotalBlock">
                <ul>
                    <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб. </b>
                    </li>
                    <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб. </b>
                    </li>
                </ul>
                <div className="d-flex justify-center">
                    <button className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
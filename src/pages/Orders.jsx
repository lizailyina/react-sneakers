import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { AppContext } from '../App';

function Orders() {

    const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState([]);


    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://63c488ec8067b6bef6da5be8.mockapi.io/orders')
                setOrders(data.map((obj) => obj.items).flat());
                setIsLoading(false);
            } catch {
                alert("error loading orders");
            }
        })();
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>My Orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(12)] : orders)
                    .map((item, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Orders;

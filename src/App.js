import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://63c21e388bb1ca34754e1bcc.mockapi.io/items').then(res => {
      return res.json();
    }).then((json) => setItems(json));
  }, []);

  const onAddtoCart = (obj) => {
    setCartItems((items) => [...items, obj]);
  }

  // const onRemoveFromCart = (obj) => {
  //   console.log(obj);
  //   setCartItems((items) => items.filter((item) => (item !== obj)));
  // }

  return (
    <div className="wrapper clear">
      {cartOpened && (<Drawer 
        onClose = {() => setCartOpened(false)}
        items = {cartItems}
      />)}
      <Header 
        onClickCart = {() => setCartOpened(true)}
      />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {
          items.map((item) => (
            <Card 
              title = {item.name} 
              price = {item.price} 
              imageUrl={item.imageUrl}
              onPlus = {(obj) => {onAddtoCart(obj)}}
              onFavorite = {() => {console.log("Нажали на закладки")}}/>
          ))
        }
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://63c21e388bb1ca34754e1bcc.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://63c21e388bb1ca34754e1bcc.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://63c488ec8067b6bef6da5be8.mockapi.io/favorites/').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = async (obj) => {
    const { data } = await axios.post('https://63c21e388bb1ca34754e1bcc.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, data]);
  };

  const onRemoveItem = (id) => {
    console.log(id);
    axios.delete(`https://63c21e388bb1ca34754e1bcc.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://63c488ec8067b6bef6da5be8.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://63c488ec8067b6bef6da5be8.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;

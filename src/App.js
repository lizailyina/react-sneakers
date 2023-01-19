import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Orders from './pages/Orders';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      try {

        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://63c21e388bb1ca34754e1bcc.mockapi.io/cart'),
          axios.get('https://63c488ec8067b6bef6da5be8.mockapi.io/favorites'),
          axios.get('https://63c21e388bb1ca34754e1bcc.mockapi.io/items'),
        ]);
  
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch(error) {
        alert("Error loading data");
              console.log(error);

      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => item.itemId === obj.itemId)) {
        const cartObj = cartItems.find((item) => item.itemId === obj.itemId);
        setCartItems(prev => prev.filter(item => item.itemId !== obj.itemId))
        await axios.delete(`https://63c21e388bb1ca34754e1bcc.mockapi.io/cart/${cartObj.id}`);
      } else {
        const {data} = await axios.post('https://63c21e388bb1ca34754e1bcc.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch(error) {
      alert('Error adding to cart')
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      const cartObj = cartItems.find((item) => item.itemId === id);
      setCartItems(prev => prev.filter(item => item.itemId !== id))
      axios.delete(`https://63c21e388bb1ca34754e1bcc.mockapi.io/cart/${cartObj.id}`);
    } catch(error) {
      alert("error removing from cart");
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.itemId === obj.itemId)) {
        const favObj = favorites.find((item) => item.itemId === obj.itemId);
        setFavorites(prev => prev.filter(item => item.itemId !== obj.itemId))
        await axios.delete(`https://63c488ec8067b6bef6da5be8.mockapi.io/favorites/${favObj.id}`);
      } else {
        const {data} = await axios.post('https://63c488ec8067b6bef6da5be8.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((item) => Number(id) === Number(item.itemId));
  }

  const isItemFavorite = (id) => {
    return favorites.some((item) => Number(id) === Number(item.itemId));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart, isItemFavorite }}>
      <div className="wrapper clear">
        <Drawer opened={cartOpened} items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            cartItems={cartItems}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;

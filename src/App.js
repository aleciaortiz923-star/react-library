import Nav from './components/nav';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from './pages/Books';
import BooksInfo from './pages/BooksInfo';
import Cart from './pages/Cart';
import { books } from './data';
import { useState } from 'react';


function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  const changeQuantity = (id, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  function removeItem(id) {
    setCart(cart.filter(book => book.id !== id));
  };

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  return (
    <Router>
    <div className="App">
   <Nav numberOfItems={numberOfItems()} />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/books" element={<Books books={books} />} />
    <Route path="/books/:id" element={<BooksInfo books={books} 
    addToCart={addToCart} cart={cart} />} />
    <Route path="/cart" element={<Cart books={books} cart={cart}
    changeQuantity={changeQuantity} removeItem={removeItem} />} />
   
   

    </Routes>
    <Footer />
    </div>
    </Router>
  );
}

export default App;

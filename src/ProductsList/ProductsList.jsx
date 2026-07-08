import React, { useState, useEffect, useRef, useCallback } from 'react';
import Details from './Details';

export default function ProducctsList(){
    const [searchVal, setSearchVal] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const [selectedItem, setSelectedItem] = useState({});

  async function getData() {
    let response = await fetch('https://dummyjson.com/products/search');
    let data = await response.json();
    setProductsList(data.products);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };
  const debounceSearch = useCallback(
    debounce(async (query) => {
      let searchUrl = query
        ? `https://dummyjson.com/products/search?q=${query}`
        : 'https://dummyjson.com/products/search';

      try {
        let response = await fetch(searchUrl);
        let data = await response.json();
        setProductsList(data.products);
        console.log(data);
      } catch {
        console.log('error');
      }
    }, 500)
  ,[]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
    debounceSearch(e.target.value);
  };

  const showDetails = (item) =>{
    // setShowModal(true);
    setSelectedItem(item);
    modalRef.current.showModal();
  }
  return (
    <div>
      <h1>Products List Component!</h1>
      <div>
        <input
          type="text"
          name="search"
          placeholder="search by product"
          value={searchVal}
          onChange={handleChange}
        />
        <div className="productContainer">
          {productsList?.length > 0 &&
            productsList?.map((product) => {
              return (
                <div className="productDiv" key={product.id} onClick={()=>{showDetails(product)}}>
                  <img src={product.thumbnail} width="100" height="100" />
                  <h4>{product.title}</h4>
                  <h4>{product.price}</h4>
                </div>
              );
            })}
        </div>
      </div>
     <Details {...selectedItem} ref={modalRef}/>
    </div>
  );
}
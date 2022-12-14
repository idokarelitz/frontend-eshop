import styled from 'styled-components';
import Product from './Product';
import Card from './Card';
import { useEffect, useState } from 'react';
import axios from 'axios'
// import { mobile } from '../responsive';

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

`

const Products = ({cat, filters, sort}) => {
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

useEffect(() => {
  const getProducts = async ()=>{
    try{
      const res = await axios.get(cat ? `https://eshop-api.onrender.com/api/products?category=${cat}`
                                      : 'https://eshop-api.onrender.com/api/products')
      setProducts(res.data)
    }catch(err){}
  }
  getProducts()
}, [cat])

useEffect(() => {
  cat && setFilteredProducts(
    products.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)
    ))
  )
}, [products, cat, filters])

useEffect(() => {
  if ((sort === 'newest')) {
    setFilteredProducts((prev) =>
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
    )
  } else if ((sort === 'asc')) {
    setFilteredProducts((prev) =>
        [...prev].sort((a,b) => a.price - b.price)
    )
  } else {
    setFilteredProducts((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
    )
  }

}, [sort])


  return (
    <Container>
        {cat ? filteredProducts.map((item)=> 
            <Card item={item} key={item.id}/>)
            : products.slice(22,32).map((item)=>
            <Card item={item} key={item.id} />)}
    </Container>
  )
}

export default Products
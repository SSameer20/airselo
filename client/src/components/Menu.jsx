import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/menu.css"
import Vine from "../media/Vine.jpg";
import Beer from "../media/Beer.jpg";
import Juice from "../media/Juice.jpg";
import Navigation from './Navigation';


export default function Menu() {
 const [label, setLabel] = useState([]);
  const [data, setData] = useState([])
  const [meal, setMeal] = useState([]);
  const [price, setPrice] = useState(0);
  const [drink, setDrink] = useState([])
  const [order, setOrder] = useState([])



  const fetchHandler = async () => {
    await axios.get("http://localhost:3001/data")
      .then((res) => {
        setData(res.data.meal)
        setLabel(res.data.label);
        setMeal(res.data.meal)
      })
      .catch((err) => alert("Error While Connecting to Server " + err))
  }



  const handleFilter = (e) => {
    const item = e.target.value;
    if (item !== '') {
      const filter = data.filter((food) => food.labels.includes(item));
      setMeal(filter);
    } else {
      setMeal(data);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);



  // Filter 
  const addItem = (item) => {
   const findItem = order.find((food) => food.id === item.id)
    console.log(findItem)

    if(!findItem) {
      const newItem = { id: item.id, price: Math.round(item.price * 100) / 100 }
    
    setOrder([...order, newItem])
    setPrice(price + Math.round(item.price * 100) / 100)
    }
  }

  const deleteItem = (item) => {
    setOrder(order.filter((menu) => menu.id !== item.id))
    const newPrice = Math.max(price - Math.round(item.price * 100) / 100, 0);
    try {
      setPrice(newPrice);
    } catch (error) {
      setPrice(0);

    }

  }


  const handleDrink = (item, menuId) => {

    const findDrink = drink.find((food) => food.id === item.id )
    if(!findDrink){
      const newDrink = {id : item.id, title : item.title, menu : menuId, price : item.price};
      setDrink([...drink, newDrink])
      setPrice(prev => prev + item.price)

    }   

  }


  const deleteDrink = (item) => {
    setDrink(drink.filter((drinkItem) => drinkItem.id !== item.id))
    const newPrice = Math.max(price - Math.round(item.price * 100) / 100, 0);
    try {
      setPrice(newPrice);
    } catch (error) {
      setPrice(0);

    }

  }

  //deleteDrink


  return (
   <>
      <Navigation />
      <div className="menu">
        <div className="menu-area">
          <div className="tags">
            <button onClick={handleFilter} value="">ALL</button>
            {
              label.map((item) => {
                return <button onClick={handleFilter} value={item.id}>{item.label}</button>

              })

            }
          </div>
          <div className="order-cards">
            {
              meal.map((item) => {
                return <div className="card">
                  <div className="card-image">
                    <img src={item.img} alt={item.id} className='card-img' onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} />
                  </div>
                  <div className="details">
                    <span className='meal-details'>{item.title}</span>
                    <div className="food-details">
                      <span><strong>Starter: </strong>{item.starter}</span>
                      <span><strong>Desert: </strong>{item.desert}</span>
                      {drink ? (<span><strong>Selected drink: </strong> Orange Juice</span>) : (<span></span>)}
                    </div>
                    <div className="card-bottom">
                      <div className="drinks">
                        <div className='drink'>
                          {
                            item.drinks.map((drink) => {
                              return <img
                                src={drink.title === "Vine" ? Vine : drink.title === "Juice" ? Juice : Beer}
                                alt={drink.title}
                                value={drink.price}
                                onClick={() => handleDrink(drink, item.id)} />
                            })

                          }


                        </div>
                      </div>
                      <div className="price">
                        <span>&#36; {item.price}</span>
                        
                      </div>
                    </div>
                      <button onClick={() => addItem(item)}>Add Item</button>
                  </div>

                </div>
              })
            }





          </div>

        </div>
        <div className="menu-order">
          <p>Order Details</p>
          <details className='bill-items'>
            <summary>Items Ordered</summary>
            {order.map(item => (
              <span key={item.id}>
                {item.id} - $ {item.price}
                <button onClick={() => deleteItem(item)}>x</button>
              </span>
            ))}

          </details>

          <details className='bill-drinks'>
            <summary>Drinks Ordered</summary>
            {drink.map(item => (
              <span key={item.id}>
                {item.id} -  {item.price} $
                <button onClick={() => deleteDrink(item)}>Delete</button>
              </span>
            ))}

          </details>
          <p>Total Bill : &#36; { Math.round(price * 100) / 100}</p>
          <button>Order</button>

        </div>
      </div>
    </>

  )
}

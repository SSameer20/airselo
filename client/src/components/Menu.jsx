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
  // const [selectDrink, setSelectDrink] = useState(false)
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);


  const fetchHandler = async () => {
    await axios.get("http://localhost:3001/data")
      .then((res) => {
        setData(res.data.meal)
        setLabel(res.data.label);
        setMeal(res.data.meal)
      })
      .catch((err) => alert("Error While Connecting to Server " + err))
  }

  //  Calling the Fetch

  useEffect(() => {
    fetchHandler();
  }, [])


  // Filter 

  const handleFilter = (e) => {
    const item = e.target.value;
    if(item !== "") {
      setMeal(data)
      const filter = data.filter((food) => food.labels.includes(item));
      setMeal(filter)
    }
    else {
      setMeal(data);
    }
  }

const handleDrink = (e) => {
  console.log(e.target.getAttribute('value'));

}

const addItem = (cost) => {
  // console.log(cost);
  
}


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
                    {/* {selectDrink ? (<span><strong>Selected drink: </strong> Orange Juice</span>) : (<span></span>)} */}
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
                          onClick={handleDrink}/>
                        })

                      }
                      

                     </div>
                    </div>
                    <div className="price">
                      <span>{item.price}</span>
                      <button onClick={addItem(item.price)}>Select</button>
                    </div>
                  </div>
                </div>

              </div>
            })
          }

          



        </div>

      </div>
      <div className="menu-order">
        

      </div>
    </div>
</>
  )
}

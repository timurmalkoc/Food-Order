import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() =>{
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://food-order-df58c-default-rtdb.firebaseio.com/meals.json');
      if (!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json();
      // I fetched the data from firebase then it returns an obj.
      const loadedMeals = [];

      for (let key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setIsLoading(false);
      setHttpError();
      setMeals(loadedMeals)
    };

    // Handling error with promise base fetch function
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if (isLoading){
    return(
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError){
    return(
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem 
        id = {meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description}
        price={meal.price}    
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;

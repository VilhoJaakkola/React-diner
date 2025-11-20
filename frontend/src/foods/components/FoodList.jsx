import FoodItem from './FoodItem';
import './FoodList.css';

const FoodList = (props) => {
  return <ul className='food-list'>
    {props.items.map(food => (
      <FoodItem
        key={food.id}
        id={food.id}
        name={food.name}
        image={food.image}
        price={food.price}
        description={food.description}
      />
    ))}
  </ul>
};

export default FoodList;
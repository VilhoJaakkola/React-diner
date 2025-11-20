
import {useRef, useEffect} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useHistory } from "react-router-dom";

import { config } from "../../config/config";
import Input from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';

import { useAuthContext } from "../../shared/context/auth-context";
import { getFoodById, updateFood  } from "../api/foods";
import './AddFood.css';

const EditFood = () => {
  const { token } = useAuthContext();

  const history = useHistory();

  const queryClient = useQueryClient();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const { id: foodId } = useParams();

  const { data, isLoading, isError } = useQuery(
    { 
      queryKey: ["foodData", foodId], 
      queryFn: () => getFoodById( { id: foodId } )
    }
  );

  useEffect(() => {
    if (data) {
      nameRef.current.value = data.name || "";
      priceRef.current.value = data.price || "";
      descriptionRef.current.value = data.description || "";
      imageRef.current.value = data.image || "";
    }
  }, [data]);

  const updateFoodMutation = useMutation({
    mutationFn: updateFood,
    onSuccess: () => {
      queryClient.invalidateQueries("foodData");
      queryClient.invalidateQueries(["foodData", foodId]);
      history.push("/")
    },
    onError: (error) => {
      console.error(error)
    }
  });

  if (isLoading) { 
    return (
      <div className="center">
        <LoadingSpinner />;
      </div>
    )
  }

  if (isError) { 
    return (
      <div className="center">
        <h2>Failed to load the food for editing</h2>;
      </div>
    )
  }

  const foodSubmitHandler = async event => {
    event.preventDefault();
    updateFoodMutation.mutate({
      id: parseInt(foodId),
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      token: token
    })    
  };

  return (
      <form className="food-form" onSubmit={foodSubmitHandler}>
        <div className="food-item__image">
          <img src={`${config.API_URL}/images/${data.image}`} alt={data.name} />
        </div>
        <Input id="name" ref={nameRef} type="text" label="Name"/>
        <Input id="price" ref={priceRef} type="text" label="Price"/>
        <Input id="description" ref={descriptionRef} type="text" label="Description" />
        <Input id="image" ref={imageRef} type="text" label="Image filename" />
        <Button type="submit">
          UPDATE FOOD
        </Button>
      </form>
  )
};
export default EditFood;
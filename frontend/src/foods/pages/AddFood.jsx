import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

import Input from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import { createFood } from "../api/foods";
import { useAuthContext } from "../../shared/context/auth-context";

import "./AddFood.css";

const AddFood = () => {
  const { token } = useAuthContext();
  const history = useHistory();

  const queryClient = useQueryClient();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const createFoodMutation = useMutation({
    mutationFn: createFood,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("foodsData");      

    },
    onError: (error) => {
      console.log(error);
    },
  });

  const foodSubmitHandler = (event) => {
    event.preventDefault();
    const priceValue = parseFloat(priceRef.current.value);
    if (isNaN(priceValue)) {
      alert("Please enter a valid number for the price.");
      return;
    }

    createFoodMutation.mutate({
      name: nameRef.current.value,
      price: priceValue,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      token: token,
    })
    history.push("/");
  };

  return (
    <form className="food-form" onSubmit={foodSubmitHandler}> 
      <Input id="name" ref={nameRef} type="text" label="Name"></Input>
      <Input id="price" ref={priceRef} type="text" label="Price"></Input>
      <Input id="description" ref={descriptionRef} type="text" label="Description"></Input>
      <Input id="image" ref={imageRef} type="text" label="Image filename"></Input>
      <Button type="submit">
        Add Food
      </Button>
    </form>
  )

};

export default AddFood;

import { config } from "../../config/config";

export const  getFoods = async () => {
  const res = await fetch(`${config.API_URL}/api/foods`);
  console.log(res);
  
  return await res.json();
};

export const getFoodById = async ({id}) => {
  const res = await fetch(`${config.API_URL}/api/foods/${id}`);
  if (!res.ok) throw new Error("Failed to fetch food data");
  return await res.json();
}

export const createFood = async (food) => {
  console.log(food);
  const res = await fetch(`${config.API_URL}/api/foods`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${food.token}`,
    },
    body: JSON.stringify(food),
  });
  console.log(res);
  

  return await res.json();
}


export const updateFood = async (food) => {
  const res = await fetch(
    `${config.API_URL}/api/foods/` + food.id, 
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + food.token
      },
      body: JSON.stringify({
        name: food.name,
        price: food.price,
        description: food.description,
        image: food.image
      })
    }
  );

  if (!res.ok) throw new Error("Failed to update food");

  return await res.json();
}

export const deleteFood = async (food) => {
  const res = await fetch(
    `${config.API_URL}/api/foods/${food.id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + food.token
      }
    }
  );

  if (!res.ok) throw new Error("Failed to delete food");

  return await res.json();
};
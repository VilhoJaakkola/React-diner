import { useQuery } from "@tanstack/react-query";

import FoodList from "../components/FoodList"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";


import { getFoods } from "../api/foods";

const Foods = () => {
  const { status, error, data } = useQuery({
    queryKey: ["foodsData"],
    queryFn: () => getFoods(),
  });

  if (status === "pending")
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <h1>An error has occured while trying to fetch foods: {error.message} </h1>;

  return <FoodList items={data} />;
};

export default Foods;

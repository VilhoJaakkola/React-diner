import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { config } from "../../config/config";
import { useAuthContext } from "../../shared/context/auth-context";

import Modal from "../../shared/Modal/Modal";
import Card from "../../shared/Card/Card";
import Button from "../../shared/Button/Button";
import { deleteFood } from "../api/foods";

import "./FoodItem.css";

const FoodItem = props => {
  const history = useHistory();
  const { isLoggedIn, token } = useAuthContext();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmModal(true);
  const cancelConfirmationHandler = () => setShowConfirmModal(false);

  const deleteFoodMutation = useMutation({
    mutationFn: deleteFood,
    onSuccess: (data) => {
      console.log(data);      
    },
    onError: (error) => {
      console.log(error);
      alert("Failed to delete food");
    }
  });

  const deleteConfirmedHandler = () => {
    setShowConfirmModal(false);
    deleteFoodMutation.mutate({ id: props.id, token });
  }

  const handleEdit = () => {
    history.push(`/foods/edit/${props.id}`);
  };

  return (
    <>
      <li className="food-item">
        <Card className="food-item__content">
          <div className="food-item__image">
            <img src={`${config.API_URL}/images/${props.image}`} alt={props.name} />
          </div>
          <div className="food-item__info">
            <h3>
              {props.name} - {props.price}
            </h3>
          </div>
          {isLoggedIn && (
            <div className="food-item__actions">
              <Button onClick={handleEdit} data-cy="edit">Edit</Button>
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            </div>
          )}
        </Card>
      </li>
      <Modal
        show={showConfirmModal}
        header="Are you sure?" footerClass="place-item__modal-actions" footer=
        {
          <>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button delete onClick={deleteConfirmedHandler}>
              Delete
            </Button>
          </>
        }
        >
          <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>
    </>
  );
};

export default FoodItem;

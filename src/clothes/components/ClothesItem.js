import React, { useState } from 'react';
import './ClothesItem.css';
import Card from '../../shared/components/UIElements/Card'; 
import Button from '../../shared/components/Buttons/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const ClothesItem = (props) => {
  const [openMap, setOpenMap] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const openMapHandler = () => setOpenMap(true);

  const closeMapHandler = () => setOpenMap(false);

  const showDeleteWarningHandler = () => {
    setOpenConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setOpenConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setOpenConfirmModal(false);
    console.log('DELETING');
  };
  
  return (
    <>
    <Modal 
      open={openMap} 
      onClose={closeMapHandler} 
      header="User localization" 
      contentClass="clothes-item_modal-content"
      footerClass="clothes-item_modal-actions"
      footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
    >
      <div className="map-container">
      <Map center={props.coordinates} zoom={17} />
      </div>
    </Modal>
    <Modal
        show={openConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure to delete this item??"
        footerClass="clothes-item_modal-actions"
        footer={
          <>
            <Button primary onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button delete onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this clothes?
        </p>
      </Modal>
      <li className="clothes-item">
        <Card className="clothes-item_content">
          <div className="clothes-item_image">
              <img src={props.image} alt={props.title} />
          </div>
          <div className="clothes-item_about">
              <h2>{props.title}</h2>
              <h2>{props.size}</h2>
              <p>{props.price}</p>
              <p>{props.description}</p>
          </div>
          <div className="clothes-item_actions">
              <Button primary onClick={openMapHandler}>PICK UP</Button>
              <Button to={`/clothes/${props.id}`}>EDIT</Button>
              <Button delete onClick={showDeleteWarningHandler}>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
 );
};

export default ClothesItem;
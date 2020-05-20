import React, { useState } from 'react';
import './ClothesItem.css';
import Card from '../../shared/components/UIElements/Card'; 
import Button from '../../shared/components/Buttons/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const ClothesItem = (props) => {
  const [openMap, setOpenMap] = useState(false);

  const openMapHandler = () => setOpenMap(true);

  const closeMapHandler = () => setOpenMap(false);
  
  return (
    <>
    <Modal 
      open={openMap} 
      onClose={closeMapHandler} 
      header="User localization" 
      contentClass="place-item_modal-content"
      footerClass="place-item_modal-actions"
      footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
    >
      <div className="map-container">
      <Map center={props.coordinates} zoom={17} />
      </div>
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
            <Button delete>DELETE</Button>
        </div>
      </Card>
    </li>
    </>
 );
};

export default ClothesItem;
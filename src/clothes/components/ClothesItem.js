import React from 'react';
import './ClothesItem.css';
import Card from '../../shared/components/UIElements/Card'; 
import Button from '../../shared/components/Buttons/Button';

const ClothesItem = (props) => {
  return (
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
            <Button primary>VIEW ON MAP</Button>
            <Button to={`/clothes/${props.id}`}>EDIT</Button>
            <Button delete>DELETE</Button>
        </div>
      </Card>
    </li>
 );
};

export default ClothesItem;
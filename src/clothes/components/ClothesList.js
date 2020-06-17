import React from 'react';
import './ClothesList.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/Buttons/Button';
import ClothesItem from './ClothesItem';

const ClothesList = props => {
    if (props.items.length === 0) {
        return (
        <div className="clothes-list center">
            <Card>
                <h2>No clothes. Add some.</h2>
                <Button to="/clothes/new"> Share clothes</Button>
            </Card>
        </div>
      );
    }
    return (
    <ul className="clothes-list">
       {props.items.map(clothe => (
         <ClothesItem
            key={clothe.id}
            id={clothe.id}
            image={clothe.image}
            title={clothe.title}
            description={clothe.description}
            size={clothe.size}
            price={clothe.price}
            address={clothe.address}
            creatorId={clothe.creator}
            coordinates={clothe.location}
            onDelete={props.onDeleteClothes}
            />
        ))}
    </ul>
);
};
    

export default ClothesList;
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
       {props.items.map(clothes => (
         <ClothesItem
            key={clothes.id}
            id={clothes.id}
            image={clothes.image}
            title={clothes.title}
            description={clothes.description}
            size={clothes.size}
            price={clothes.price}
            address={clothes.address}
            creatorId={clothes.creator}
            coordinates={clothes.location}
            onDelete={props.onDeleteClothes}
            />
        ))}
    </ul>
);
};
    

export default ClothesList;
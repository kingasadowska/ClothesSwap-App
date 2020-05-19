import React from 'react';
import './ClothesList.css';
import Card from '../../shared/components/UIElements/Card';
import ClothesItem from './ClothesItem';

const ClothesList = props => {
    if (props.items.length === 0) {
        return (
        <div className="clothes-list center">
            <Card>
                <h2>No clothes. Add some.</h2>
                <button> Share clothes</button>
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
            image={clothes.imageUrl}
            title={clothes.title}
            description={clothes.description}
            size={clothes.size}
            price={clothes.price}
            creatorId={clothes.creator}
            coordinates={clothes.location}
            />
        ))}
    </ul>
);
};
    

export default ClothesList;
import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './ClothesForm.css';

const DUMMY_CLOTHES = [
    {
       id: 'p1',
       title: 'Dress',
       description: 'short yellow',
       imageUrl: 'https://content.asos-media.com/-/media/homepages/ww/2020/05/11/ww_global_mobile-hero_1650-x-1884_4th-may.jpg',
       size: 'S',
       price: '15 $',
       location: {
           lat: 40.7484405,
           lng: -73.9878584
         },
       creator: 'u1'
    },
    {
       id: 'p2',
       title: 'Dress',
       description: 'long green',
       imageUrl: 'https://www.pronovias.com/media/wysiwyg/2021/05/Homepage/the-party-edit-ss2020-pronovias-m_2x.jpg',
       size: 'S',
       price: '40 $',
       location: {
           lat: 40.7484405,
           lng: -73.9878584
       },
       creator: 'u2'
    },
    {
       id: 'p3',
       title: 'Dress',
       description: 'mid red',
       imageUrl: 'https://cdn.shopify.com/s/files/1/0074/5124/6676/products/053203826649-60-0.jpg?v=1587421343',
       size: 'S',
       price: '10 $',
       location: {
           lat: 40.7484405,
           lng: -73.9878584
       },
       creator: 'u3'
    }
   ];

const UpdateClothes = () => {
    const clothesId = useParams().clothesId;

    const identifiedClothes = DUMMY_CLOTHES.find(p => p.id === clothesId);

    if (!identifiedClothes) {
        return (
        <div className="center">
            <h2>Could not find clothes!</h2>
        </div>
        );
    }

    return (
        <form className="clothes-form">
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Fill empty space."
            onInput={() => {}}
            value={identifiedClothes.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Enter description (min. 6 characters)."
            onInput={() => {}}
            value={identifiedClothes.description}
            valid={true}
          />
          <Button type="submit" disabled={true}>
            UPDATE PLACE
          </Button>
        </form>
      );
    };

export default UpdateClothes;
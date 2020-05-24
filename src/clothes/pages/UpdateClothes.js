import React, { useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import './ClothesForm.css';
import { useForm } from '../../shared/hooks/form-hook';

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
    const [isLoading, setIsLoading] = useState(true);

    const clothesId = useParams().clothesId;

    const [formState, inputHandler, setFormData] = useForm(
      {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        size: {
          value: '',
          isValid: false
        }
      },
      false
    );
  
      const identifiedClothes = DUMMY_CLOTHES.find(p => p.id === clothesId);

      useEffect(() => {
        setFormData(
          {
            title: {
              value: identifiedClothes.title,
              isValid: true
            },
            description: {
              value: identifiedClothes.description,
              isValid: true
            },
            size: {
              value: identifiedClothes.size,
              isValid: true
            }
          },
          true
        );
        setIsLoading(false);
      }, [setFormData, identifiedClothes]);
    
      const clothesUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
      };

      if (!identifiedClothes) {
        return (
          <div className="center">
            <h2>Could not find clothes!</h2>
          </div>
        );
      }

      if (isLoading) {
        return (
          <div className="center">
            <h2>Loading</h2>
          </div>
        );
      }

    return (
        <form className="clothes-form" onSubmit={clothesUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Fill empty space."
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Enter description (min. 6 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Input
            id="size"
            element="text"
            label="Size"
            validators={[VALIDATOR_MAXLENGTH(2)]}
            errorText="Enter size (XS-XXL)."
            onInput={inputHandler}
            initialValue={formState.inputs.size.value}
            initialValid={formState.inputs.size.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE CLOTHES
          </Button>
        </form>
      );
    };

export default UpdateClothes;
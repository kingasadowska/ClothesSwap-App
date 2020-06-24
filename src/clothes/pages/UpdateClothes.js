import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import './ClothesForm.css';
import Spinner from '../../shared/components/UIElements/Spinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const UpdateClothes = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [loadedClothes, setLoadedClothe] = useState();
    const clothesId = useParams().clothesId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
      {
        title: {
          value: '',
          isValid: false
        },
        size: {
          value: '',
          isValid: false
        },
        price: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
      },
      false
    );

      useEffect(() => {
        const fetchClothes = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/clothes/${clothesId}`
            );
            setLoadedClothe(responseData.clothe);
            setFormData(
              {
                title: {
                  value: responseData.clothe.title,
                  isValid: true
                },
                size: {
                  value: responseData.clothe.size,
                  isValid: true
                },
                price: {
                  value: responseData.clothe.price,
                  isValid: true
                },
                description: {
                  value: responseData.clothe.description,
                  isValid: true
                }
              },
              true
            );
    
          } catch (err) {}
        };
        fetchClothes();
      }, [sendRequest, clothesId, setFormData]);
    
      const clothesUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/clothes/${clothesId}`,
            'PATCH',
            JSON.stringify({
              title: formState.inputs.title.value,
              size: formState.inputs.size.value,
              price: formState.inputs.price.value,
              description: formState.inputs.description.value
            }),
            {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + auth.token
            }
          );
          history.push('/' + auth.userId + '/clothes');
        } catch (err) {}
      };

      if (isLoading) {
        return (
          <div className="center">
              <Spinner />
          </div>
        );
      }

      if (!loadedClothes && !error) {
        return (
          <div className="center">
            <Card>
          <h2>Could not find clothes!</h2>
        </Card>
          </div>
        );
      }

    return (
      <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedClothes && (
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
            id="size"
            element="text"
            label="Size"
            validators={[VALIDATOR_MAXLENGTH(2)]}
            errorText="Enter size (XS-XXL)."
            onInput={inputHandler}
            initialValue={formState.inputs.size.value}
            initialValid={formState.inputs.size.isValid}
          />
          <Input
            id="price"
            element="text"
            label="price"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter price."
            onInput={inputHandler}
            initialValue={formState.inputs.price.value}
            initialValid={formState.inputs.price.isValid}
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
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE CLOTHES
          </Button>
        </form>
       )}
       </>
     );
   };
export default UpdateClothes;
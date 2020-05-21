import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import './NewClothe.css';

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };
 
const NewClothe = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        isValid: false
      });
    
      const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: isValid,
          inputId: id
        });
      }, []);
   
    const clothesSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send to the backend
    };

return (
    <form className="clothes-form" onSubmit={clothesSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter title."
        onInput={inputHandler}
      />
       <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(6)]}
        errorText="Enter description."
        onInput={inputHandler}
      />
        <Input
        id="size"
        element="input"
        label="Size"
        validators={[VALIDATOR_MAXLENGTH(2)]}
        errorText="Enter size (XS-XXL)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD
      </Button>
    </form>
  );
};

export default NewClothe;
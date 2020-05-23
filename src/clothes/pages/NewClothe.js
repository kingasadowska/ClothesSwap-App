import React from 'react';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ClothesForm.css';

const NewClothe = () => {
    const [formState, inputHandler] = useForm(
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

      const clothesSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); 
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
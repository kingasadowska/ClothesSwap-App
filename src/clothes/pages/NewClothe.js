import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from '../../shared/util/validators';
import Spinner from '../../shared/components/UIElements/Spinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './ClothesForm.css';

const NewClothe = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

      const history = useHistory();

      const clothesSubmitHandler = async event => {
        event.preventDefault();
        try {
          await sendRequest(
            'http://localhost:5000/api/places',
            'POST',
            JSON.stringify({
              title: formState.inputs.title.value,
              description: formState.inputs.description.value,
              size: formState.inputs.size.value,
              creator: auth.userId
            }),
            { 'Content-Type': 'application/json' }
          );
          history.push('/');
        } catch (err) {}
      }; 

return (
  <>
   <ErrorModal error={error} onClear={clearError} />
    <form className="clothes-form" onSubmit={clothesSubmitHandler}>
    {isLoading && <Spinner asOverlay />}
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
    </>
  );
};

export default NewClothe;
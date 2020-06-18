import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Spinner from '../../shared/components/UIElements/Spinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import UploadImg from '../../shared/components/UIElements/UploadImg';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  
  const [isLoginOption, setIsLoginOption] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchOptionHandler = () => {
    if (!isLoginOption) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginOption(prevOption => !prevOption);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginOption) {
      try {
        const responseData =  await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
    <Card className="authentication">
         {isLoading && <Spinner asOverlay />}
      <h2>Login Required</h2>
        <hr />
      <form onSubmit={authSubmitHandler}>
      {!isLoginOption && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginOption && (
        <UploadImg center id="image" onInput={inputHandler}/>
        )}
        <Input className="auth"
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
        {isLoginOption ? 'LOGIN' : 'REGISTER'}
        </Button>
      </form>
      <Button onClick={switchOptionHandler}>
        SWITCH TO {isLoginOption ? 'REGISTER' : 'LOGIN'}
      </Button>
    </Card>
    </>
  );
};

export default Auth;

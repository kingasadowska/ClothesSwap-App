import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/Inputs/Input';
import Button from '../../shared/components/Buttons/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';

const Auth = () => {
  const [isLoginOption, setIsLoginOption] = useState(true);

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
          name: undefined
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
          }
        },
        false
      );
    }
    setIsLoginOption(prevOption => !prevOption);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>{isLoginOption ? 'Log in to your account' : 'Create new account'} </h2>
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
      <Button inverse onClick={switchOptionHandler}>
        SWITCH TO {isLoginOption ? 'REGISTER' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;

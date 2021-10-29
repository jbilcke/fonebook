import React from 'react';
import { Button, Flex, HeadsetFilled, Spacer, TextFieldInput, Typography } from '@aircall/tractor';
import { useForm } from 'react-hook-form';
import {  useMutation } from '@apollo/client';

import { SignIn, SignInVariables } from '../queries/__generated__/SignIn';
import { LoginInput } from '../../__generated__/globalTypes';

import { SIGN_IN } from '../queries';
import { setSession } from '../services/session';
import { getContext } from '../services/client';

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submit] = useMutation<SignIn, SignInVariables>(
    SIGN_IN,
    {
      context: getContext(),
      onCompleted: ({ login }) => {
        setSession({
          ...login,
          created_at: Date.now()
        });
        window.location.reload();
      }
    }
  );

  const submitForm = handleSubmit(
    (input: LoginInput) => submit({ variables: { input } })
  );
  
  return (
    <Flex width="100%" height="100vh" bg="primary.light" alignItems="center" justifyContent="center">
        <Flex bg="white" borderRadius={16} boxShadow={6} p={6}>
          <form onSubmit={submitForm}>
            <Spacer fluid direction="vertical" space="m">
              <Flex color="primary.base">
                <Flex mr="1"><HeadsetFilled width="40" height="40" /></Flex>
                <Typography variant="displayL" fontFamily="Klavika">fonebook</Typography> 
              </Flex>
              <TextFieldInput
                placeholder="Username"
                size="small"
                {...register('username', { required: true })}
              />
              {errors.username && <span>Username is required</span>}
              <TextFieldInput
                placeholder="Password"
                size="small"
                {...register('password', { required: true })}
              />
              {errors.password && <span>Password is required</span>}
              <Button onClick={submitForm}>Login</Button>
            </Spacer>
          </form>
      </Flex>
    </Flex>
  );
};
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAuthContext } from "../../shared/context/auth-context";

import Card from "../../shared/Card/Card";
import Input from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";

import { signUpUser, loginUser } from "../api/users";

import "./Authenticate.css";

const Authenticate = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const { login } = useAuthContext();

  const switchModeHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  
  const onSubmitHandler = event => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    } else {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    }
  }

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      login(data.id, data.token)
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });

 const loginUserMutation = useMutation({
  mutationFn: loginUser, 
  onSuccess: (data) => {
    // Will execute only once, for the last mutation,
    // regardless which mutation resolves first
    console.log(data);
    login(data.id, data.token)
  },
  onError: (error) => {
    // An error happened!
    console.log(error);
  }
});

  return (
    <Card className="authentication">
      {!isLoginMode && <h2>Sign Up</h2>}
      {isLoginMode && <h2>Login</h2>}
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input id="name" ref={nameRef} type="text" label="Name" />
        )}
        <Input data-cy="email" id="email" ref={emailRef} type="text" label="Email" />
        <Input
          data-cy="password"
          id="password"
          ref={passwordRef}
          type="password"
          label="Password"
        />

        <Button data-cy="login" type="submit" disable={signUpUserMutation.isLoading}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button data-cy="singUpInstead" inverse onClick={switchModeHandler}>
        {isLoginMode ? "SignUp" : "Login"} instead?
      </Button>
    </Card>
  );
};

export default Authenticate;

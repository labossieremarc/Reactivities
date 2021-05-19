import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

const RegisterForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({error}))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().test(
          "passwords-match",
          "Passwords must match",
          function (value) {
            return this.parent.password === value;
          }
        ),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoCapitalize="off">
          <Header
            as="h2"
            content="Register to Reactivities"
            color="blue"
            textAlign="center"
          />
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="email" placeholder="Email" type="email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <MyTextInput name="confirmPassword" placeholder="Confirm Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
                <ValidationErrors errors={errors.error}/>
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Sign Up!"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);

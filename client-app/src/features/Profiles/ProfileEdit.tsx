
import { observer } from "mobx-react-lite";
import React from "react";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { Form, Formik } from "formik";


interface Props {
  setEditMode: (editMode: boolean) => void;
}

const ProfileDescription = ({setEditMode}:Props) => {
    const { profileStore: {profile, updateProfile} } = useStore();
    
    const validationSchema = Yup.object({
        displayName: Yup.string().required('A Display Name is Required')
    })

  return (
    <Formik
      initialValues={{
        displayName: profile?.displayName,
        bio: profile?.bio,
      }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea placeholder="Add your Bio" name="bio" rows={5} />
          <Button
            loading={isSubmitting}
            positive
            content="Update Profile"
            type="submit"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(ProfileDescription);

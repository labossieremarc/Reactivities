import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { updateActivity, createActivity, loading, loadActivity, loadingInitial } =
    activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if(id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity]);

  const submitHandler = () => {
    
    if (activity.id.length === 0) {
      let newActivity = {...activity, id: uuid()}
      createActivity(newActivity).then(() => history.push(`/activities/:${newActivity.id}`));
    }
    else updateActivity(activity).then(() =>
      history.push(`/activities/:${activity.id}`)
    );
  };
  const inputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setActivity({ ...activity, [name]: value });
  };

  if(loadingInitial) return <LoadingComponent content='Loading Activity...'/>

  return (
    <Segment clearing>
      <Form onSubmit={submitHandler} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={inputChangeHandler}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          name="date"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={inputChangeHandler}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


const ActivityDetails = () => {
  const {id} = useParams<{id: string}>();
  const { activityStore } = useStore();
  const { selectedActivity, loadActivity, loadingInitial } = activityStore;
  
  useEffect(() => {
    if (id) loadActivity(id)

  }, [id, loadActivity]);
  
  if (loadingInitial || !selectedActivity) return <LoadingComponent />;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            as={Link}
            to={`/manage/${selectedActivity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button as={Link} to='/activities' basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/actvity";

interface Props {
  selectedActivity: Activity;
  resetActivity: () => void;
  openEdit: (id: string) => void;
}

export default function ActivityDetails({ selectedActivity, resetActivity, openEdit}: Props) {
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
            basic
            color="blue"
            content="Edit"
            onClick={() => openEdit(selectedActivity.id)}
          />
          <Button basic color="grey" content="Cancel" onClick={resetActivity} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

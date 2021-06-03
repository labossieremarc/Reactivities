import React from "react";
import { Card, Image } from "semantic-ui-react";
import { UserActivity } from "../../../app/models/profile";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Props {
  activity: UserActivity;
}

const ProfileActivitiesCard = ({activity} : Props) => {

  return (
    <Card as={Link} to={`/activities/${activity.id}`}>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} style={{minHeight: 100, objectFit: 'cover'}}/>
      <Card.Content>
        <Card.Header textAlign='center'>{activity.title}</Card.Header>
        <Card.Meta textAlign='center'>
          <div>{format(new Date(activity.date), 'do LLL')}</div>
          <div>{format(new Date(activity.date), 'h:mm a')}</div>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ProfileActivitiesCard;

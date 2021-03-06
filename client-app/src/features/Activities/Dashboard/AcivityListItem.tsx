import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Icon, Item, Label, Segment,  } from "semantic-ui-react";
import { Activity } from "../../../app/models/actvity";
import ActivityListIemAttendee from "./ActivityListIemAttendee";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const [index] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<boolean>(false)

  const accordianHandle = () => {
    setActiveIndex(prevState => !prevState)
  }
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              src={activity.host?.image || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link to={`/profiles/${activity.host!.username}`}>
                  {activity.host?.displayName}
                </Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this activity
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Accordion>
        <Accordion.Title
          active={activeIndex}
          index={index}
          onClick={accordianHandle}
        >
          <Icon name="address card" />
          <span>People going: {activity.attendees.length}</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex}>
          <Segment secondary>
            <ActivityListIemAttendee attendees={activity.attendees!} />
          </Segment>
        </Accordion.Content>
      </Accordion>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityListItem);

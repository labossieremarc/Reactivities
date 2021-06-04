import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - Looks like theres nothing here
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Take me back!
        </Button>{" "}
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;

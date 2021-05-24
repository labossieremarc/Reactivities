import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';



const ProfileCard = () => {
     const {profileStore} = useStore();

    return (
      <Card as={Link} to={`/profiles/${profileStore.profile?.username}`}>
        <Image src={profileStore.profile?.image || "/assets/user.png"} />
        <Card.Content>
          <Card.Header>{profileStore.profile?.displayName}</Card.Header>
          <Card.Description>Bio goes here</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          20 followers
        </Card.Content>
      </Card>
    );
}

export default observer(ProfileCard);
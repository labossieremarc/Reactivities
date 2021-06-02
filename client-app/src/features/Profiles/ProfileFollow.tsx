import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileCard from './ProfileCard';


const ProfileFollowing = () => {
    const {
      profileStore: {loadingFollow, followings, profile, activeTab },
    } = useStore();



    return (
      <Tab.Pane loading={loadingFollow}>
        <Grid>
          <Grid.Column width={16}>
            <Header
              floated="left"
              icon="user"
              content={activeTab === 3 ? `${profile?.displayName}'s Followers` : `People following ${profile?.displayName}` }
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Card.Group itemsPerRow={4}>
              {followings.map((profile) => (
                <ProfileCard key={profile.username} profile={profile} />
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    );
}


export default observer(ProfileFollowing);
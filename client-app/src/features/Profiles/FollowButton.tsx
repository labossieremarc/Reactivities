import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react'
import { Button, Reveal } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props {
    profile: Profile;
}

const FollowButton = ({ profile }: Props) => {
    const { profileStore, userStore } = useStore();
    const { toggleFollow, loading } = profileStore;

    if (userStore.user?.username === profile.username) return null;

    const followHandler = (event: SyntheticEvent, username: string) => {
        event.preventDefault();
        profile.following ? toggleFollow(username, false) : toggleFollow(username, true);
    }


    return (
      <Reveal animated="move">
        <Reveal.Content visible style={{ width: "100%" }}>
          <Button
            fluid
            color="teal"
            content={
              profile.following ? "Following" : "Not Following"
            }
          />
        </Reveal.Content>
        <Reveal.Content hidden style={{ width: "100%" }}>
          <Button
            fluid
            basic
            color={profile.following ? "red" : "green"}
            loading={loading}
            content={profile.following ? "Unfollow" : "Follow"}
            onClick={(event) => followHandler(event, profile.username)}
          />
        </Reveal.Content>
      </Reveal>
    );
}

export default observer(FollowButton);
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import FollowButton from "./FollowButton";

const ProfileHeader = () => {
  const { profileStore } = useStore();
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profileStore.profile!.image || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profileStore.profile!.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic
              label="Followers"
              value={profileStore.profile?.followersCount}
            />
            <Statistic
              label="Following"
              value={profileStore.profile?.followingCount}
            />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <FollowButton profile={profileStore.profile!} />
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);

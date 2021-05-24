import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/Layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
  const { profileStore } = useStore();
  const { profile, loadProfile, loading } = profileStore;
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    loadProfile(username);
  }, [username, loadProfile]);

  if (loading) return <LoadingComponent />;
  else
    return (
      <Grid>
        <Grid.Column width={16}>
          {profile && (
            <>
              <ProfileHeader />
              <ProfileContent profile={profile} />
            </>
          )}
        </Grid.Column>
      </Grid>
    );
};

export default observer(ProfilePage);

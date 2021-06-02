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
  const { profile, loadProfile, loadingProfile, setActiveTab} = profileStore;
  const { username } = useParams<{ username: string }>();



  useEffect(() => {
    loadProfile(username);
    return () => {
      setActiveTab(0);
    }
  }, [username, loadProfile, setActiveTab]);

  if (loadingProfile) return <LoadingComponent />;
  else
    return (
      <Grid>
        <Grid.Column width={16}>
          {profile && (
            <>
              <ProfileHeader />
              <ProfileContent />
            </>
          )}
        </Grid.Column>
      </Grid>
    );
};

export default observer(ProfilePage);

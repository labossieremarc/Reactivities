import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, GridColumn} from "semantic-ui-react";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";


const ActivityDetails = () => {
  const {id} = useParams<{id: string}>();
  const { activityStore } = useStore();
  const { selectedActivity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
  
  useEffect(() => {
    if (id) loadActivity(id)
    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);
  
  if (loadingInitial || !selectedActivity) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={selectedActivity} />
        <ActivityDetailsInfo activity={selectedActivity} />
        <ActivityDetailsChat activityId={selectedActivity.id}/>
      </Grid.Column>
      <GridColumn width={6}>
        <ActivityDetailsSidebar activity={selectedActivity}/>
      </GridColumn>
    </Grid>
  );
}

export default observer(ActivityDetails);
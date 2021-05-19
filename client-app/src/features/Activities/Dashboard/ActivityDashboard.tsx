import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Grid, Rail, Ref, Segment, Sticky } from "semantic-ui-react";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const contextRef = useRef<any>();
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities...." />;

  return (
      <Grid>
        <Grid.Column width="10">
          <Ref innerRef={contextRef}>
            <Segment basic>
              <ActivityList />
              <Rail position="right">
              <Sticky context={contextRef} offset={42} styleElement={{zIndex:0}}>
                  <ActivityFilters />
                </Sticky>
              </Rail>
            </Segment>
          </Ref>
        </Grid.Column>
      </Grid>
  );
};

export default observer(ActivityDashboard);

import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {  Grid, Loader, Rail, Ref, Segment, Sticky } from "semantic-ui-react";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceHolder from "./ActivityListItemPlaceHolder";

const ActivityDashboard = () => {
  const contextRef = useRef<any>();
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
  const [loadingNext, setLoadingNext] = useState<boolean>(false);
  
  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry.size]);

  
  const getNextHandler = () => {
    setLoadingNext(true)
    setPagingParams(new PagingParams(pagination!.currentPage + 1))
    loadActivities().then(() => setLoadingNext(false));
  }
  

  
  return (
    <Grid>
      <Grid.Column width="10">
        <Ref innerRef={contextRef}>
          <Segment basic>
            {activityStore.loadingInitial && !loadingNext ? (
              <>
                <ActivityListItemPlaceHolder margin={14}/>
                <ActivityListItemPlaceHolder margin={45}/>
                <ActivityListItemPlaceHolder margin={45}/>
                </>
            ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={getNextHandler}
              hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={false}
            >
            <ActivityList />
            </InfiniteScroll>
                
            )}

            <Rail position="right">
              <Sticky
                context={contextRef}
                offset={42}
                styleElement={{ zIndex: 0 }}
              >
                <ActivityFilters/>
              </Sticky>
            </Rail>
          </Segment>
        </Ref>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);

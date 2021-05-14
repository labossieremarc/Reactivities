import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/actvity";
import ActivityDetails from "../Details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  resetActivity: () => void;
  editMode: boolean;
  openEdit: (id: string) => void;
  closeEdit: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectActivity,
  selectedActivity,
  resetActivity,
  editMode,
  openEdit,
  closeEdit,
  createOrEdit,
  deleteActivity,
  submitting
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          selectActivity={selectActivity}
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            resetActivity={resetActivity}
            openEdit={openEdit}
          />
        )}
        {editMode && (
          <ActivityForm
            closeEdit={closeEdit}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

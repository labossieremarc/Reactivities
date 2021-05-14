import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/actvity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const selectActivityHandler = (id: string) => {
    setActivity(activities.find((x) => x.id === id));
  };
  const resetActivityHandler = () => {
    setActivity(undefined);
  };
  const openEditHandler = (id?: string) => {
    id ? selectActivityHandler(id) : resetActivityHandler();
    setEditMode(true);
  };
  const closeEditHandler = () => {
    setEditMode(false);
  };
  const createOrEditHandler = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };
  const deleteHandler = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((x) => x.id !== id));
    })
    setSubmitting(false)
  };
  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingComponent content="Loading App" />;

  return (
    <>
      <NavBar openEdit={openEditHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={activity}
          selectActivity={selectActivityHandler}
          resetActivity={resetActivityHandler}
          editMode={editMode}
          openEdit={openEditHandler}
          closeEdit={closeEditHandler}
          createOrEdit={createOrEditHandler}
          deleteActivity={deleteHandler}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;

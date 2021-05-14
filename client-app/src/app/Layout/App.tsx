import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { Activity } from "../models/actvity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid()}]);
    setEditMode(false);
    setActivity(activity);
  };
  const deleteHandler = (id: string) => {
      setActivities(activities.filter(x => x.id !== id))
  }
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

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
        />
      </Container>
    </>
  );
}

export default App;

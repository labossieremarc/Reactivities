import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities/ProfileActivities";
import ProfileFollow from "./ProfileFollow";
import ProfilePhotos from "./ProfilePhotos";


const ProfileContent = () => {
  const {
    profileStore: { activeTab, setActiveTab },
  } = useStore();
  


  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout />,
    },
    { menuItem: "Photos", render: () => <ProfilePhotos /> },
    { menuItem: "Events", render: () => <ProfileActivities/> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollow />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollow />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) => setActiveTab(+data.activeIndex!)}
      activeIndex={activeTab}
    />
  );
};

export default observer(ProfileContent);

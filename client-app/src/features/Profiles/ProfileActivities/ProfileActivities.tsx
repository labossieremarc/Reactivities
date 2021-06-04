import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfileActivityLayout from './ProfileActivityLayout';



const ProfileActivities = () => {
    const { profileStore: { setActivityTab, activityTab } } = useStore();

    const panes = [
      { menuItem: "Future Events", render: () => <ProfileActivityLayout /> },
      { menuItem: "Past Events", render: () => <ProfileActivityLayout /> },
      {
        menuItem: "Events I'm Hosting",
        render: () => <ProfileActivityLayout />,
      },
    ];

    return (
      <Tab.Pane>
            <Tab
          panes={panes}
          onTabChange={(_, data) => setActivityTab(+data.activeIndex!)}
          activeIndex={activityTab}
        />
      </Tab.Pane>
    );
}

export default observer(ProfileActivities);
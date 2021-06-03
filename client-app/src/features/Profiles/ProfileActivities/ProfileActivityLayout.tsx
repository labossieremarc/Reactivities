import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Tab } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProfileActivitiesCard from './ProfileActivitiesCard';


const ProfileActivityLayout = () => {
    
    const {profileStore: {loadingActivities, userActivites}} = useStore();
    
    return (<Tab.Pane loading={loadingActivities}>
        <Card.Group itemsPerRow={4}>
            {userActivites.map(activity => <ProfileActivitiesCard key={activity.id} activity={activity}/>)}
        </Card.Group>
        
        </Tab.Pane>
)
}

export default observer(ProfileActivityLayout);
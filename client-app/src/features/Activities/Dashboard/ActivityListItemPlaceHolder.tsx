import { Button, Placeholder, Segment } from "semantic-ui-react"

interface Props {
    margin: number
}

const ActivityListItemPlaceHolder = ({margin} : Props) => {
    return <>
        <Placeholder fluid style={{ marginTop: margin }} />
        <Segment.Group>
            <Segment style={{ minHeight: 110 }}>
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Segment>
            <Segment>
                <Placeholder>
                    <Placeholder.Line />
                </Placeholder>
            </Segment>
            <Segment secondary style={{ minHeight: 30 }} />
            <Segment clearing>
                <Button disabled color='blue' floated='right' content='View'/>
            </Segment>
        </Segment.Group>
    </>
}

export default ActivityListItemPlaceHolder;

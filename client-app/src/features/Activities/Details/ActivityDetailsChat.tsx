import { Formik, Form, Field, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup'
import { formatDistanceToNow } from "date-fns";

interface Props {
  activityId: string;
}

const ActivityDetailsChat = ({ activityId }: Props) => {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) commentStore.createHubConnection(activityId);
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);

  const validationSchema = Yup.object({
    body: Yup.string().required("Please add text to the comment")
  })

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder="Hit ENTER to submit, SHIFT ENTER for new line"
                      rows={2}
                      {...props.field}
                      onKeyPress={(event) => {
                        if (event.key === "Enter" && event.shiftKey) return;
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text stye={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default observer(ActivityDetailsChat);

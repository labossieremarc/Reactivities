import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo } from "../../app/models/profile";

const ProfilePhotos = () => {
  const {
    profileStore: {
      isCurrentUser,
      profile,
      uploadPhoto,
      uploading,
      loadingMainPhoto,
      setMainPhoto,
      deletePhoto,
      deleting
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function setMainPhotoHandler(
    photo: Photo,
    event: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(event.currentTarget.name);
    setMainPhoto(photo);
  }
  function deletePhotoHandler(
    photo: Photo,
    event: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(event.currentTarget.name);
    deletePhoto(photo);
  };

  function photoUploadHandler(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              size="small"
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              color={addPhotoMode ? "red" : "green"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={photoUploadHandler}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={4}>
              {profile!.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        icon="eye"
                        name={'main' + photo.id}
                        disabled={photo.isMain}
                        loading={target === 'main' + photo.id && loadingMainPhoto}
                        onClick={(e) => setMainPhotoHandler(photo, e)}
                      />
                      <Button
                        basic
                        disabled={photo.isMain}
                        name={photo.id}
                        loading={target === photo.id && deleting}
                        color="red"
                        icon="trash"
                        onClick={(e) => deletePhotoHandler(photo, e)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);

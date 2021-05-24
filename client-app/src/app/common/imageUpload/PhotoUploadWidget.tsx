import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Header,
} from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
  loading: boolean,
  uploadPhoto: (file:Blob) => void
}

const PhotoUploadWidget = ({loading, uploadPhoto} : Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      {files && files.length > 0 && (
        <>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Resize Image" />
            <PhotoWidgetCropper
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          </Grid.Column>
          <Grid.Column width={4} />
          <Grid.Column width={6}>
            <Header sub color="teal" content="Preview & Upload" />
            <>
              <Container textAlign="center">
                <div
                  className="img-preview"
                  style={{ minHeight: 200, overflow: "hidden" }}
                />
              </Container>
            </>
          </Grid.Column>
          <Grid.Row centered>
            <Button.Group>
              <Button onClick={() => setFiles([])} disabled={loading} icon="trash alternate" />
              <Button onClick={onCrop} positive loading={loading} icon="check" />
            </Button.Group>
          </Grid.Row>
        </>
      )}

      {files.length === 0 && (
        <Grid.Column width={6}>
          <Header sub color="teal" content="Add Photo" />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
      )}
    </Grid>
  );
};

export default PhotoUploadWidget;

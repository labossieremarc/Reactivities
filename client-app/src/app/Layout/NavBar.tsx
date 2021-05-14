import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openEdit: () => void;
}

export default function NavBar({ openEdit }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openEdit} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

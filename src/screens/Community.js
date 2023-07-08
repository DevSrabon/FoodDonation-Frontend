import { View, Text, Image } from "react-native";
import React from "react";
import Container from "../components/container";
import Label from "../components/label";

const Community = () => {
  return (
    <Container>
      <Header>Community</Header>
      <Label>Your Name</Label>
      <Label>Organization</Label>
      <Label>Location</Label>
      <Label>Description</Label>
      <Label>No of Items</Label>
      <Label>Date and Time</Label>
      <Image />
    </Container>
  );
};

export default Community;

import React from "react";
import { Image } from "react-native";
import Container from "../components/container";
import Label from "../components/label";
import useFetchData from "../hook/useFetchData";

const Community = () => {
  const { loading, error, data } = useFetchData(`community/get`);
  console.log("🚀 ~ file: Community.js:10 ~ Community ~ data:", data);
  return (
    <Container>
      {/* <Header>Community</Header> */}
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

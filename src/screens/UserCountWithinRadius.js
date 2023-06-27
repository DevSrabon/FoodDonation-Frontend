import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

const UserCountWithinRadius = () => {
  const [userCount, setUserCount] = useState(0);

  const handleGetUserCount = async () => {
    console.log("handle user count=====", userCount);
    try {
      const response = await axios.get('http://localhost:4000/api/users/count', {

        params: {
          latitude: 23.0786,
          longitude: 91.3336,
          radius: 5000, // 5 km radius
        },
      });

      console.log("response data====", response);

      const { count } = response.data;
      setUserCount(count);
    } catch (error) {
      console.error('Error getting user count:', error);
      Alert.alert('Error', 'Failed to get user count. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Number of Users: {userCount}</Text>
      <Button title="Get User Count" onPress={handleGetUserCount} />
    </View>
  );
};

export default UserCountWithinRadius;


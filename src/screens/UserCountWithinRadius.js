import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text } from 'react-native';

const UserCountWithinRadius = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCountWithinRadius = async () => {
      try {
        const userLocation = { latitude: 37.7749, longitude: -122.4194 }; //  specific location

        const response = await axios.get('http://localhost:3000/users'); //  API endpoint

        const users = response.data; // API response contains an array of user objects
        const usersWithinRadius = getUsersWithinRadius(users, userLocation, 5); // Calculate users within a 5km radius

        setUserCount(usersWithinRadius.length);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCountWithinRadius();
  }, []);

  const getUsersWithinRadius = (users, location, radius) => {
    const usersWithinRadius = [];

    users.forEach((user) => {
      const userLocation = { latitude: user.latitude, longitude: user.longitude }; // Assuming each user object has latitude and longitude properties

      const distance = calculateDistance(location, userLocation);

      if (distance <= radius) {
        usersWithinRadius.push(user);
      }
    });

    return usersWithinRadius;
  };

  const calculateDistance = (location1, location2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const latDiff = toRad(location2.latitude - location1.latitude);
    const lonDiff = toRad(location2.longitude - location1.longitude);

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(toRad(location1.latitude)) * Math.cos(toRad(location2.latitude)) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  return (
    <Text>Number of users within a 5km radius: {userCount}</Text>
  );
};

export default UserCountWithinRadius;

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";

const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:8000/accepted-friends/${userId}`
        );
        const data = await response.json();
        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (e) {
        console.log("ERROR", e);
      }
    };
    acceptedFriendsList();
  }, []);
  console.log(acceptedFriends);

  return (
    <ScrollView>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});

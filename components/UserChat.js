import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

const UserChat = ({ item }) => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [messsages, setMesssages] = useState([]);
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.2:8000/messages/${userId}/${item._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setMesssages(data);
      } else {
        console.log("Error", response.status.message);
      }
    } catch (e) {
      console.log("error retrieving details", e);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const getLastMessage = () => {
    const userMessages = messsages.filter(
      (message) => message.messageType === "text"
    );
    const n = userMessages.length;
    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  console.log(lastMessage);
  const formatTime = (time) => {
    const option = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", option);
  };
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Messages", {
          recepientId: item._id,
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "gray",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>{item?.name}</Text>
        {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.message}
          </Text>
        )}
      </View>
      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatTime(lastMessage?.timeStamp)}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});

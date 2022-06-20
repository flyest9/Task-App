// In App.js in a new project

import * as React from "react";
import { useState } from "react";
import { View, Text, Button, TextInput, B } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Tasks({ item, setTo }) {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text
        style={{ display: item.checked ? "none" : "flex", borderWidth: "2px", width: "100%" }}
        onPress={() => setTo(item)}
      >
        {item.description}
      </Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [myTask, setMyTask] = useState([]);
  const [textInputs, setTextInputs] = useState("");

  const setTaskCheck = (item) => {
    const finded = myTask.find(f => f.description == item.description)
    const filtered = myTask.filter((f) => f.description != item.description);
    if(finded) finded.checked = !finded.checked
    setMyTask([...filtered, finded])
    
  }
  return (
    <View style={{ flex: 1 }}>
      <Text>My Task Screen</Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextInput
          onChange={(e) => setTextInputs(e.target.value)}
          value={textInputs}
          style={{ width: "100%" }}
        ></TextInput>
        <Button
          title="Add a task"
          onPress={() => {
            setMyTask([...myTask, { description: textInputs, checked: false }]);
            setTextInputs("");
          }}
        />
      </View>
      <View style={{ flexDirection: "column", width: "100%" }}>
        {myTask.map((item, idx) => (
          <Tasks setTo={setTaskCheck} key={idx} item={item}></Tasks>
        ))}
      </View>
      <Button
        title="See all hidden tasks"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            tasks: myTask
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { tasks } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {tasks.map((item, idx) => (
        <Text key={idx}>{idx}-{item.description}</Text>
      ))}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Mylist" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

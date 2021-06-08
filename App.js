import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { Map, Modal, Panel, Input, List } from "./components";

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [puntoTemp, setPuntoTemp] = useState({});
  const [visibilityFilter, setVisibilityFilter] = useState("new_punto"); // new_punto, all_puntos

  const [visibility, setVisibility] = useState(false);

  const handleLongpress = ({ nativeEvent }) => {
    setVisibilityFilter("new_punto");
    setPuntoTemp(nativeEvent.coordinate);
    setVisibility(true);
  };

  const [nombre, setNombre] = useState("");
  const handleChangeText = (text) => {
    setNombre(text);
  };

  const handleSubmit = () => {
    const newPunto = { coordinate: puntoTemp, name: nombre };
    setPuntos(puntos.concat(newPunto));
    setVisibility(false);
    setNombre("");
  };

  const handleLista = () => {
    setVisibilityFilter("all_puntos");
    setVisibility(true);
  };

  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongpress} />
      <Modal visibility={visibility}>
        {visibilityFilter === "new_punto" ? (
          <>
            <Text>
              <Input
                title="Nombre"
                placeholder="Nombre del punto"
                onChangeText={handleChangeText}
              />
            </Text>
            <Button title="Aceptar" onPress={handleSubmit} />
            <Button
              title="Cancelar"
              color="#f00"
              onPress={() => setVisibility(false)}
            />
          </>
        ) : (
          <List data={puntos} onPress={()=> setVisibility(false)} />
        )}
        <></>
      </Modal>
      <Panel onPressLeft={handleLista} textLeft="Lista" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

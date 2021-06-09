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

  const [pointsFilter, setPointsFilter] = useState(true);
  const togglePointsFilter = () => setPointsFilter(!pointsFilter)

  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongpress} puntos={puntos} pointsFilter={pointsFilter} />
      <Modal visibility={visibility}>
        {visibilityFilter === "new_punto" ? (
          <View style={styles.form}>
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
          </View>
        ) : (
          <List data={puntos} closeModal={()=> setVisibility(false)} />
        )}
      </Modal>
      <Panel onPressLeft={handleLista} textLeft="Lista" togglePointsFilter={togglePointsFilter} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

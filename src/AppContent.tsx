import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";

import { useItems } from "./hooks/useItems";
import { Item } from "./models/Item";
import { ItemList } from "./components/ItemList";
import { ItemForm } from "./components/ItemForm";

import "./config/localeCalendar";

export const AppContent = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Item | undefined>();

  const { items, addItem, updateItem, deleteItem } = useItems(selectedDate);

  // Crear objeto de días con marcadores
  const marked: Record<string, any> = {};
  items.forEach((item) => {
    if (!marked[item.date]) {
      marked[item.date] = { marked: false };
    }
  });

  if (marked[selectedDate]) {
    marked[selectedDate].selected = true;
    marked[selectedDate].selectedColor = "#03A9F4";
  } else {
    marked[selectedDate] = { selected: true, selectedColor: "#03A9F4" };
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Agenda</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditing(undefined);
            setVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>Nueva tarea</Text>
        </TouchableOpacity>
      </View>

      {/* Calendario */}
      <Calendar
        firstDay={1}
        onDayPress={(day) => setSelectedDate(day.dateString)} 
        markedDates={marked}
        style={styles.calendar}
      />

      {/* Lista de items */}
      <ItemList
        items={items}
        onEdit={(item) => {
          setEditing(item);
          setVisible(true);
        }}
        onDelete={deleteItem}
      />

      {/* Modal para crear/editar */}
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ItemForm
              initialValues={editing}
              onSubmit={async (item) => {
                const itemWithDate = {
                  ...item,
                  date: editing?.date ?? selectedDate,
                };
                editing
                  ? await updateItem(itemWithDate as Item)
                  : await addItem(itemWithDate as Omit<Item, "id">);
                setVisible(false);
              }}
              onCancel={() => setVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#03A9F4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  calendar: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

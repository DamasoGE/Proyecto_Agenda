import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Item } from "../models/Item";

interface Props {
  initialValues?: Item;
  onSubmit: (item: Omit<Item, "id"> | Item) => void;
  onCancel: () => void;
}

export const ItemForm = ({ initialValues, onSubmit, onCancel }: Props) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [date, setDate] = useState(
    initialValues
      ? new Date(`${initialValues.date}T${initialValues.time}`)
      : new Date()
  );
  const [showPicker, setShowPicker] = useState<"date" | "time" | null>(null);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const formatTime = (d: Date) =>
    `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  const onChange = (_event: any, selected?: Date) => {
    if (selected) setDate(selected);
    setShowPicker(null);
  };

  const handleSubmit = () => {
    onSubmit(
      initialValues
        ? {
            ...initialValues,
            title,
            description: description || null,
            date: formatDate(date),
            time: formatTime(date),
          }
        : {
            title,
            description: description || null,
            date: formatDate(date),
            time: formatTime(date),
          }
    );
  };

  const isDisabled = title.trim().length === 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity
            onPress={() => setShowPicker("date")}
            style={styles.pickerButton}
          >
            <Text>{formatDate(date)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Hora</Text>
          <TouchableOpacity
            onPress={() => setShowPicker("time")}
            style={styles.pickerButton}
          >
            <Text>{formatTime(date)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={showPicker}
          display="default"
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <Text style={styles.label}>Título</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        multiline
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={onCancel}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isDisabled}
          style={[
            styles.button,
            styles.saveButton,
            { opacity: isDisabled ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFF",
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerButton: {
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#EF5350",
  },
  saveButton: {
    backgroundColor: "#66BB6A",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

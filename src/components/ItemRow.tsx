// src/components/ItemRow.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../models/Item';

interface Props {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

export const ItemRow = ({ item, onEdit, onDelete }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {item.description ? <Text style={styles.description}>{item.description}</Text> : null}

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={[styles.button, styles.editButton]}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  time: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flexShrink: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#66BB6A',
  },
  deleteButton: {
    backgroundColor: '#EF5350',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

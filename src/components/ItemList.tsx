// src/components/ItemList.tsx
import { FlatList } from 'react-native';
import { Item } from '../models/Item';
import { ItemRow } from './ItemRow';

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

export const ItemList = ({ items, onEdit, onDelete }: Props) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <ItemRow
        item={item}
        onEdit={() => onEdit(item)}
        onDelete={() => onDelete(item.id)}
      />
    )}
  />
);

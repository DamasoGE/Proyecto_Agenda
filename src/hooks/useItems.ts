// src/hooks/useAgendaItems.ts
import { useCallback, useEffect, useState } from 'react';
import { Item } from '../models/Item';
import { itemService } from '../services/ItemService';

export const useItems = (date: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const data = await itemService.getByDate(date);
    setItems(data);
    setLoading(false);
  }, [date]);

  const addItem = async (item: Omit<Item, 'id'>) => {
    await itemService.create(item);
    await loadItems();
  };

  const updateItem = async (item: Item) => {
    await itemService.update(item);
    await loadItems();
  };

  const deleteItem = async (id: number) => {
    await itemService.remove(id);
    await loadItems();
  };

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    reload: loadItems,
  };
};

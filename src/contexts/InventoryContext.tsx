import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage'; // Assuming hooks are in src/hooks
import { Pokemon } from '@/types'; // Assuming types are in src/types

interface InventoryContextType {
  inventory: Pokemon[];
  addPokemonToInventory: (pokemon: Pokemon) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useLocalStorage<Pokemon[]>('pokemon-inventory', []);

  const addPokemonToInventory = (pokemonToAdd: Pokemon) => {
    // Add to inventory only if it's not already there
    if (!inventory.find(p => p.id === pokemonToAdd.id)) {
      setInventory(prev => [...prev, pokemonToAdd]);
    }
  };

  return (
    <InventoryContext.Provider value={{ inventory, addPokemonToInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to easily use the inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
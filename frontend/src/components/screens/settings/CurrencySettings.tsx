import React from 'react';
import { Text, TextInput, View, Button, Switch } from 'react-native';
import { useCurrency } from "@/src/context/currencyContext";

export default function CurrencySettings() {
  const { currency, symbol, isPrefix, setCurrency, setSymbol, setIsPrefix } = useCurrency();

  const handleSave = () => {
    setCurrency(currency);
    setSymbol(symbol);
    setIsPrefix(isPrefix);
  };

  return (
    <View>
      <Text className="text-2xl font-bold mb-4">Currency Settings</Text>
      <Text className="text-gray-600 mb-2">Manage your currency settings here.</Text>

      <Text className="text-lg font-semibold mb-2">Current Currency:</Text>
      <TextInput
        className="border p-2 mb-4"
        value={currency}
        onChangeText={setCurrency}
        placeholder="Enter currency code (e.g., USD)"
      />

      <Text className="text-lg font-semibold mb-2">Current Symbol:</Text>
      <TextInput
        className="border p-2 mb-4"
        value={symbol}
        onChangeText={setSymbol}
        placeholder="Enter currency symbol (e.g., $)"
      />

      <View className="flex-row items-center mb-4">
        <Text className="text-lg font-semibold">Symbol Position: </Text>
        <Text>{isPrefix ? 'Prefix' : 'Suffix'}</Text>
        <Switch
          value={isPrefix}
          onValueChange={setIsPrefix}
        />
      </View>

      <Button title="Save Settings" onPress={handleSave} />
    </View>
  );
}
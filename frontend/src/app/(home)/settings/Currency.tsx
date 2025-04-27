import React from 'react';
import { Text, TextInput, View, Button, Switch } from 'react-native';
import { useUserContext } from "@/src/hooks/useUserContext";
import { useCurrency } from "@/src/hooks/useCurrency";
import BackHeader from '@/src/components/navigation/BackHeader';

export default function CurrencySettings() {
  const { user } = useUserContext();
  const { currency, symbol, isPrefix, setCurrency, setSymbol, setIsPrefix } = useCurrency();

  if (!user) {
    return <Text>Loading user...</Text>;
  }

  const handleSave = () => {
    setCurrency(currency);
    setSymbol(symbol);
    setIsPrefix(isPrefix);
  };

  return (
    <View className="flex-1 bg-background p-4">
      <BackHeader headerTitle='Currency Settings'/>
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
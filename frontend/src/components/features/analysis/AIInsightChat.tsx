import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useUserContext } from "@/src/context/userContext";
import askInsightAI from "@/src/services/insightService";
import Markdown from 'react-native-markdown-display';
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIInsightChat() {
  const { user } = useUserContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const aiReply = await askInsightAI(user.id, input);
      setMessages((prev) => [...prev, { role: "ai", content: aiReply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      className="flex-1 bg-white rounded-2xl mb-12 shadow-lg min-h-[300px] max-h-[700px] border border-gray-200"
    >
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2 border-b border-gray-100 bg-white rounded-t-2xl">
              <View className="flex-row items-center mb-2 mt-2">
        <TouchableOpacity
          className="px-3 py-1 bg-gray-200 rounded-lg mr-2 active:bg-gray-300"
          onPress={() => router.back()}
        >
      <ArrowLeft size={12} color="black" />
        </TouchableOpacity>
      </View>
        <Text className="text-lg font-bold text-gray-900">💬 AI Financial Assistant</Text>
        <TouchableOpacity
          className="px-3 py-1 bg-gray-100 rounded-lg active:bg-gray-200"
          onPress={() => setMessages([])}
          disabled={loading || messages.length === 0}
        >
          <Text className="text-xs text-gray-500 font-bold">Clear</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 min-h-[200px] max-h-[600px] bg-gray-50 px-2">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 py-2"
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={true}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 && !loading && (
            <Text className="text-gray-400 text-center mt-12 text-base leading-6">
              Ask anything about your spending, e.g.:
              {"\n"}- "How much did I spend on food last month?"
              {"\n"}- "What category did I overspend in this year?"
              {"\n"}- "Give me a summary for March."
              {"\n"}
            </Text>
          )}
          {messages.map((msg, idx) => (
            <View
              key={idx}
              className={`mb-3 w-full flex-row ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" ? (
                <View className="bg-white border border-blue-100 rounded-2xl px-4 py-3 max-w-[85%] shadow-sm">
                  <Markdown>{msg.content}</Markdown>
                </View>
              ) : (
                <View className="bg-blue-500 rounded-2xl px-4 py-3 max-w-[85%]">
                  <Text className="text-white font-semibold text-base leading-6">{msg.content}</Text>
                </View>
              )}
            </View>
          ))}
          {loading && (
            <View className="flex-row justify-start mb-2">
              <View className="bg-white border border-blue-100 rounded-2xl px-4 py-3 max-w-[85%] shadow-sm">
                <ActivityIndicator size="small" color="#2f95dc" />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <View className="flex-row items-end px-4 py-3 gap-2 bg-white rounded-b-2xl border-t border-gray-100">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-base text-gray-900 min-h-[40px] max-h-[80px]"
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your spending..."
          placeholderTextColor="#A0AEC0"
          editable={!loading}
          multiline
          numberOfLines={2}
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          className={`bg-blue-500 px-5 py-2 rounded-lg active:bg-blue-600 ${loading || !input.trim() ? 'opacity-60' : ''}`}
          onPress={sendMessage}
          disabled={loading || !input.trim()}
        >
          <Text className="text-white font-bold text-base">Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

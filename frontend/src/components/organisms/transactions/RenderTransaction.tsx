import React from 'react';
import { FlatList } from 'react-native';
import TransactionItem from './TransactionItem';
import type { Transaction } from '@/src/types/Transaction';

export const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} />
  );
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import LottieView from 'lottie-react-native';
import AnimatedWrapper from './components/AnimatedWrapper';

export default function App() {
  const [items, setItems] = useState<number[]>([]);

  const buttonRef = useRef<LottieView>(null);

  const onDelete = useCallback((index: number) => {
    setItems((currentItems) =>
      currentItems.filter((_, currentItemIndex) => currentItemIndex !== index)
    );
  }, []);

  const onAdd = useCallback(() => {
    buttonRef.current?.reset();
    buttonRef.current?.play(0, 75);
    setItems((currentItems) => [...currentItems, 0]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <AnimatedWrapper
        showAnimation={items.length === 0}
        title={'Add new items ➕'}
        source={require('./assets/lottie/astronaut.json')}
      >
        <ScrollView style={styles.scrollView}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => onDelete(index)}
              style={styles.itemContainer}
            >
              <View style={styles.item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </AnimatedWrapper>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <LottieView
          ref={buttonRef}
          source={require('./assets/lottie/add.json')}
          style={{ flex: 1 }}
          autoPlay={false}
          loop={false}
          speed={3}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const FLOATING_ACTION_BUTTON_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    height: 100,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
  },
  floatingButton: {
    height: FLOATING_ACTION_BUTTON_SIZE,
    width: FLOATING_ACTION_BUTTON_SIZE,
    backgroundColor: 'black',
    borderRadius: FLOATING_ACTION_BUTTON_SIZE / 2,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 64,
    right: 32,
  },
});

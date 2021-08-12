import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';

interface AnimatedWrapperProps extends AnimatedLottieViewProps {
  children: React.ReactNode;
  showAnimation?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  showAnimation,
  containerStyle,
  textStyle,
  title,
  style,
  ...lottieProps
}) => {
  if (!showAnimation) return <>{children}</>;

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30%',
        },
        containerStyle,
      ]}
    >
      <LottieView
        style={[{ width: '80%', aspectRatio: 1 }, style]}
        autoPlay
        loop
        {...lottieProps}
      />
      {title && (
        <Text style={[{ fontSize: 25, fontWeight: '300' }, textStyle]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default AnimatedWrapper;

const styles = StyleSheet.create({});

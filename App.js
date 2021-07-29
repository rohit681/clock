import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import Constants from 'expo-constants';
import Clock from './components/Clock';
import StopWatch from './components/StopWatch';
import Timer from './components/Timer';
import Weather from './components/Weather';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D2F41" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Clock') {
                return (
                  <Image
                    style={styles.logo}
                    source={require('./assets/clock_icon.png')}
                  />
                );
              } else if (route.name === 'StopWatch') {
                return (
                  <Image
                    style={styles.logo}
                    source={require('./assets/stopwatch_icon.png')}
                  />
                );
              } else if (route.name === 'Timer') {
                return (
                  <Image
                    style={styles.logo}
                    source={require('./assets/timer_icon.png')}
                  />
                );
              } else if (route.name === 'Weather') {
                
                  return <Ionicons name={'globe-outline'} size={34} color={'#4B4D5D'} />;
                
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'cyan',
            inactiveTintColor: 'white',
            fontSize:20,
            style: {
              
              backgroundColor: '#2D2F41',
              size:20
            },
          }}>
          <Tab.Screen name="Clock" component={Clock} />
          <Tab.Screen name="Weather" component={Weather} />

          <Tab.Screen name="Timer" component={Timer} />
          <Tab.Screen name="StopWatch" component={StopWatch} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  logo:{
  width:33,height:33,
  }
});

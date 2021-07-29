import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('screen');
const size = width * 0.9;
import dayjs from 'dayjs';

var d = new Date();

class Clock extends React.Component {
  state = {
    index: new Animated.Value(0),
    tick: new Animated.Value(0),
    d: new Date(),
  };

  update = () => {
    this.setState({ d: new Date() });
  };

  timer = 0;
  ticker = null;

  componentDidMount() {
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'second');
    const oneDay = 24 * 60 * 60;
    this.timer = oneDay - diff;

    this.state.tick.setValue(this.timer);
    this.state.index.setValue(this.timer - 30);

    this.animate();

    this.ticker = setInterval(() => {
      this.timer += 1;
      this.state.tick.setValue(this.timer);
    }, 1000);

    setInterval(this.update, 1000);
  }

  animate = () => {
    Animated.timing(this.state.index, {
      toValue: this.state.tick,
      duration: 1000 / 2,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { index } = this.state;

    const rotate = {
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    };

    const secDeg = Animated.multiply(index, 6);
    const rotateSec = {
      transform: [{ rotate: secDeg.interpolate(rotate) }],
    };

    const minDeg = Animated.divide(secDeg, new Animated.Value(60));
    const rotateMin = {
      transform: [{ rotate: minDeg.interpolate(rotate) }],
    };

    const hourDeg = Animated.divide(minDeg, new Animated.Value(12));
    const rotateHour = {
      transform: [{ rotate: hourDeg.interpolate(rotate) }],
    };

    const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'avenir',
            position: 'absolute',
            top: 10,
            fontWeight: '700',
            fontSize: 25,
            left: 24,
            width: 100,
          }}>
          Clock
        </Text>
        <View style={{ position: 'absolute', top: 100, left: 20 }}>
          <Text style={{ color: 'white', fontSize: 45 }}>
            {this.state.d.getHours().toString().length == 1 ? (
              <Text>0{this.state.d.getHours()}</Text>
            ) : (
              <Text>{this.state.d.getHours()}</Text>
            )}
            :
            {this.state.d.getMinutes().toString().length == 1 ? (
              <Text>0{this.state.d.getMinutes()}</Text>
            ) : (
              <Text>{this.state.d.getMinutes()}</Text>
            )}
          </Text>
          <Text style={{ color: 'white', fontSize: 15, left: 5 }}>
            {dayName[d.getDay() - 1]}, {d.getDate()} {monthName[d.getMonth()]}
          </Text>
        </View>
        <View style={styles.alarm}></View>

        <Animated.View style={[styles.hand, rotateHour]}>
          <View style={[styles.hour]}></View>
        </Animated.View>

        <Animated.View style={[styles.hand, rotateMin]}>
          <View style={[styles.min]}></View>
        </Animated.View>

        <Animated.View style={[styles.hand, rotateSec]}>
          <View style={[styles.sec]}></View>
        </Animated.View>
        <View style={styles.dot}></View>
      </View>
    );
  }
}

export default Clock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2F41',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hand: {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hour: {
    height: '20%',
    marginTop: '30%',
    backgroundColor: 'cyan',
    width: 12,
    borderRadius: 6,
  },
  min: {
    height: '25%',
    marginTop: '25%',
    backgroundColor: 'fuchsia',
    width: 8,
    borderRadius: 4,
  },
  sec: {
    height: '30%',
    marginTop: '20%',
    backgroundColor: '#ffb74d',
    width: 4,
    borderRadius: 2,
  },
  alarm: {
    width: size * 0.6,
    height: size * 0.6,
    borderRadius: size * 0.3,
    backgroundColor: '#444974',
    borderWidth: 16,
    borderColor: '#EAECFF',
    position: 'absolute',
  },

  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    backgroundColor: '#EAECFF',
  },
});

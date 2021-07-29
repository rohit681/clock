import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

function Timer({ interval }) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Text style={styles.timer}>{pad(duration.minutes())}</Text>
      <Text style={styles.tim}>:</Text>
      <Text style={styles.timer}>{pad(duration.seconds())}</Text>
      <Text style={styles.tim}>:</Text>
      <Text style={styles.timer}>
        {pad(Math.floor(duration.milliseconds() / 10))}
      </Text>
    </View>
  );
}

function LapTimer({ interval,num }) {
  const duration = moment.duration(interval);
  const pad = (n) => (n < 10 ? '0' + n : n);
  return (
    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
    <View style={styles.lapContainer}><Text style={{color:'tomato',fontSize:20,paddingRight:'60%'}}>Lap {num+1}</Text></View>
    <View style={styles.lapContainer}>
      <Text style={{ fontSize: 20, color: 'white' }}>
        {pad(duration.minutes())}
      </Text>
      <Text style={{ fontSize: 20, color: 'white' }}>:</Text>
      <Text style={{ fontSize: 20, color: 'white' }}>
        {pad(duration.seconds())}
      </Text>
      <Text style={{ fontSize: 20, color: 'white' }}>:</Text>
      <Text style={{ fontSize: 20, color: 'white' }}>
        {pad(Math.floor(duration.milliseconds() / 10))}
      </Text>
      </View>
      </View>
    
  );
}

function RoundBtn({ title, color, background, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, { backgroundColor: background }]}>
        <Text style={{ color, fontSize: 20 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
function Lap({ num, interval }) {
  return (
    <View style={styles.lapContainer}>
    <LapTimer interval={interval} num={num}/>
    </View>
  );
}
function LapTable({ laps, timer }) {
  return (
    <ScrollView
      style={{
        alignSelf: 'stretch',
        width: '100%',
        fontSize: 45,
      }}>
      {laps.map((lap, index) => (
        <Lap num={index} interval={index === 0 ? timer + lap : lap} />
      ))}
    </ScrollView>
  );
}
export default class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };
  }
  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
      laps: [0],
    });
    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime(),
      });
    }, 100);
  };
  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };
  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };
  resume = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now,
    });
    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime(),
      });
    }, 100);
  };
  stop = () => {
    clearInterval(this.timer);
    const { now, start, laps } = this.state;
    const [firstLap, ...other] = laps;
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
  };
  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <View style={styles.container}>
        <View
          style={{
            borderWidth: 10,
            borderColor: 'fuchsia',
            height: 235,
            borderRadius: 100,
            width: 235,
            justifyContent: 'center',
          }}>
          <Timer
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
          />
        </View>
        {laps.length === 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 34,
              paddingHorizontal: 10,
            }}>
            <RoundBtn
              title="Start"
              color="#00ff3c"
              background="#3a853f"
              onPress={this.start}
            />
            <RoundBtn title="Reset" color="white" background="#808080" />
          </View>
        )}
        {laps.length > 0 && start === 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 34,
              paddingHorizontal: 10,
            }}>
            <RoundBtn
              title="Resume"
              color="yellow"
              background="#7b7531"
              onPress={this.resume}
            />
            <RoundBtn
              title="Reset"
              color="white"
              background="#808080"
              onPress={this.reset}
            />
          </View>
        )}
        {start > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 34,
              paddingHorizontal: 10,
            }}>
            <RoundBtn
              title="Stop"
              color="#E33935"
              background="#693c3c"
              onPress={this.stop}
            />
            <RoundBtn
              title="Lap"
              color="white"
              background="#808080"
              onPress={this.lap}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            marginTop: 34,
            paddingHorizontal: 10,
          }}>
          <LapTable laps={laps} timer={timer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2F41',
    alignItems: 'center',
    paddingTop:'7%'
  },
  timer: {
    color: '#f03541',
    fontSize: 40,
    fontWeight: 200,
    flexDirection: 'row',
    width: '29%',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:'3%'
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  lapContainer: {
    height: 50,
    flexDirection:'row',
    alignItems:'center',
  },
  tim: {
    color: '#f03541',
    fontSize: 35,
    fontWeight: 'bold',
    flexDirection: 'row',
    width: '3%',
    height:50
  },
});

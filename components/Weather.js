import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const Weather = () => {
  const [inp, setInp] = useState();
  const [city, setCity] = useState('Agra');
  const [icon, setIcon] = useState('sunny-sharp');
  const [temp, setTemp] = useState(30);
  const [main, setMain] = useState('Sunny');
  const [des, setDes] = useState('Hot Summer');
  const [feel, setFeel] = useState(32);
  const [humidity, setHumidity] = useState(10);
  const [wind, setWind] = useState(2);
  const [press, setPress] = useState(750);
  const [country,setCountry] = useState('IN')
    useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e3e22f8b78d17c68b56a89993b1339d4`
      )
      .then((res) => {
        let d = res && res.data;
        let we = d.weather[0].main
        setTemp(d.main.temp);
        setMain(we);
        setDes(d.weather[0].description);
        setFeel(d.main.feels_like);
        setHumidity(d.main.humidity);
        setWind(d.wind.speed);
        setPress(d.main.pressure);
        setCountry(d.sys.country)
        if(we==='Rain')
        {
          setIcon('rainy-outline')
        }
        else if(we==='Clouds')
        {
          setIcon('cloud-outline')
        }
        else if(we==='Haze')
        {
          setIcon('thunderstorm-outline')
        }
        console.log(d)
      }).catch(()=>{
        setCity('Agra')
        alert("Invalid City Name");
      });
  }, [city]);
  return (
    <View style={styles.main}>
      <View style={styles.input}>
        <Ionicons
          style={styles.icon}
          name="cloud-circle"
          size={35}
          color="white"
        />
        <TextInput
          value={inp}
          style={styles.textInp}
          placeholder="Enter city"
          placeholderTextColor="lightgray"
          onChangeText={(text) => {
            setInp(text);
          }}
        />
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            setCity(inp);
            setInp('');
          }}>
          <Ionicons
            style={styles.righticon}
            name="search-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.weather}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.weather}>
          <Text style={styles.city}>{city}, {country}</Text>
          <Ionicons
            style={styles.midicon}
            name={icon}
            size={100}
            color="cyan"
          />
          <Text style={styles.temp}>{temp}&deg;C</Text>
          <Text style={styles.city}>{main}</Text>
          <Text style={styles.city}> {des} </Text>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.bot}>
            <View style={styles.des}>
              <Ionicons
                style={styles.boticon}
                name="thermometer-outline"
                size={30}
                color="tomato"
              />
              <Text style={styles.botText}>Feels like : {feel}&deg;C</Text>
            </View>
            <View style={styles.des}>
              <Ionicons
                style={styles.boticon}
                name="rainy-outline"
                size={30}
                color="tomato"
              />
              <Text style={styles.botText}>Humidity : {humidity}%</Text>
            </View>
          </View>
          <View style={styles.bot}>
            <View style={styles.des}>
              <Ionicons
                style={styles.boticon}
                name="leaf-outline"
                size={30}
                color="tomato"
              />
              <Text style={styles.botText}>Wind Speed : {wind}m/s</Text>
            </View>
            <View style={styles.des}>
              <Ionicons
                style={styles.boticon}
                name="speedometer-outline"
                size={30}
                color="tomato"
              />
              <Text style={styles.botText}>Pressure : {press} kPa</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#2D2F41',
  },
  icon: {
    marginLeft: 10,
    flex: 2,
  },
  input: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    padding: 10,
  },
  weather: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  textInp: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    outline: 'none',
    fontSize: 22,
    marginRight: 10,
    textAlign: 'center',
    flex: 8,
    color: 'white',
  },
  bottom: {
    flex: 2,
  },
  righticon: {
    marginLeft: 10,
  },
  city: {
    fontSize: 26,
    marginBottom: 10,
    color: 'white',
    textTransform:'capitalize'
  },
  midicon: {
    marginBottom: 10,
  },
  temp: {
    fontSize: 40,
    color: 'tomato',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bot: {
    flex: 1,
    flexDirection: 'row',
  },
  des: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    // justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boticon: {
    flex: 0.3,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  botText: {
    flex: 0.7,
    marginTop: 10,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  touch: {
    flex: 2,
    justifyContent: 'center',
    // marginTop:10,
  },
});

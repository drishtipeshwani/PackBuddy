import { View, Text,StyleSheet,BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { Flex, ScrollView, VStack,Heading,Box,HStack,FavouriteIcon,ArrowBackIcon } from 'native-base'
import axios from 'axios'
import { DataStore } from '@aws-amplify/datastore';
import { Place} from '../models';
import TodoComponent from './TodoComponent'

const List = ({navigation,route}) => {

  const [placeId,setPlaceId] = React.useState('');

  const defaultTodoItems = require('../defaultTodos.json');

  
   useEffect(() => {

    async function createPlace() {
      const defaultTodos = [];
      defaultTodoItems.forEach((item) => {
        if(route.params.activities.includes(item.activity)){
          let todoItem = {
            name: item.name,
            activity: item.activity,
          }
          defaultTodos.push(todoItem);
        }
      });

      await DataStore.save(
        new Place({
        "name": route.params.place,
        "Todos": defaultTodos,
        "activities":route.params.activities
      })
    );
    const currentPlace = await DataStore.query(Place, c => c.name("eq", route.params.place));
    setPlaceId(currentPlace[0].id);
    console.log(currentPlace[0].id);
    }
    createPlace();
   },[])

   // Using open weather app to get the weather data
    const [weather,setWeather] = React.useState([]);

    useEffect(() => {
      const fetchWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${route.params.place}&appid=`);
        setWeather(response.data);
      }
      fetchWeather();
    },[])


    // Disbale the mobile phone back button and only allow the back button on the app
    useEffect(() => {
      const backAction = () => {
        navigation.navigate('Home');
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, []);



  return (
    <Flex justifyContent={'center'} padding='2.5' backgroundColor={'#D2DAFF'} height='100%'>
        <Box style={styles.headingCtn} marginTop='10'>
    <FavouriteIcon size='8' m='2' color='#E94560'/>
    <Heading color={'#0F3460'}>PackBuddy</Heading>
    </Box>
    <Box alignItem = 'center' margin = '2.5' p='5' rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" bgColor={'coolGray.100'} >
              <VStack space={2} justifyContent='space-between'>
              <Heading color="coolGray.800" size='md'>
                Place: {route.params.place}
              </Heading> 
              <Heading color="coolGray.800" size='md'>
                Weather: {weather.weather && weather.weather[0].description}
              </Heading>
              <Heading color="coolGray.800" size='md'>
                Temperature: {weather.main && weather.main.temp}
              </Heading>
              </VStack>
            </Box>
        {placeId !== '' ? <TodoComponent placeId={placeId} navigation={navigation} route={route} isNew={true} activities={route.params.activities}/> : <Text>Loading</Text>}
    </Flex>
  )
}

const styles = StyleSheet.create({
  headingCtn:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
})

export default List
import { View, Text ,StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { Flex, FavouriteIcon, VStack,Heading,Box,HStack } from 'native-base'
import axios from 'axios'
import { DataStore } from '@aws-amplify/datastore';
import { Place} from '../models';
import TodoComponent from './TodoComponent'

const List = ({navigation,route}) => {

   // Using open weather app to get the weather data
    const [weather,setWeather] = React.useState([]);
    const [placeId,setPlaceId] = React.useState(route.params.placeId);

    useEffect(() => {
      const fetchWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${route.params.placeName}&appid=`);
        setWeather(response.data);
      }
      fetchWeather();
    },[])


  return (
    <Flex justifyContent={'center'} padding='2.5' backgroundColor={'#D2DAFF'} height='100%'>
       <Box style={styles.headingCtn} marginTop='10'>
    <FavouriteIcon size='8' m='2' color='#E94560'/>
    <Heading color={'#0F3460'}>PackBuddy</Heading>
    </Box>
    <Box alignItem = 'center' margin = '2.5' p='5' rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" bgColor={'coolGray.100'} >
              <VStack space={2} justifyContent='space-between'>
              <Heading color="coolGray.800" size='md'>
                Place: {route.params.placeName}
              </Heading> 
              <Heading color="coolGray.800" size='md'>
                Weather: {weather.weather && weather.weather[0].description}
              </Heading>
              <Heading color="coolGray.800" size='md'>
                Temperature: {weather.main && weather.main.temp}
              </Heading>
              </VStack>
            </Box>
        {placeId !== '' ? <TodoComponent placeId={placeId} navigation={navigation} route={route} isNew={false} activites={route.params.placeActivities}/> : <Text>Loading...</Text>}
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
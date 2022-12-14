import { StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Place } from '../models';
import { ScrollView ,Flex,Pressable,Box,HStack,Text,FavouriteIcon,Heading} from 'native-base';

const PlacesList = ({navigation}) => {


   const [places, setPlaces] = useState([]);

    useEffect(() => {
        async function fetchPlaces() {
            const queryPlaces = await DataStore.query(Place);
            queryPlaces.map((place) => {
                setPlaces(places => [...places, 
              {name: place.name,id:place.id}]);
            })
        }
        fetchPlaces();
    }, []);

    const handleClick = (id,name,activities) => {
        navigation.navigate('SavedList',{placeId:id,placeName:name,placeActivities:activities});
    }


  return (
    <ScrollView backgroundColor={'#D2DAFF'} height='100%'>
        <Box style={styles.headingCtn} marginTop='10'>
    <FavouriteIcon size='8' m='2' color='#E94560'/>
    <Heading color={'#0F3460'}>PackBuddy</Heading>
    </Box>
    <Flex>
    {places.map((place) => {
        return (
          <Pressable onPress={()=>handleClick(place.id,place.name,place.activities)} key={place.name}>
            {({
              isPressed,
              isHovered,
              isClicked,
            }) => {
            return <Box alignItem = 'center' margin = '2.5' p='5' rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" bg={isPressed ? "#FF9494" : isHovered ? "coolGray.200" : "coolGray.100"}  style={{
              transform: [{
                scale: isPressed ? 0.96 : 1
              }]
            }}>
              <HStack space={2} justifyContent='space-between'>
              <Text color={isPressed? "white":"coolGray.800"} fontWeight="medium" fontSize="xl">
                {place.name}
              </Text> 
              </HStack>
            </Box>
        }}

          </Pressable>
        )
    })}
    </Flex>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headingCtn:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
})

export default PlacesList
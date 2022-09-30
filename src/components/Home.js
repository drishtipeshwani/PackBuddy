import { View, Text, SafeAreaView,StyleSheet,Dimensions,ImageBackground } from 'react-native'
import React from 'react'
import {Center,Button,Flex,Heading,FavouriteIcon,Box } from 'native-base'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const Home = ({navigation}) => {  

  return (
    <SafeAreaView styles={styles.mainCtn}>
       <ImageBackground
        source={require('./assets/bgImage1.jpeg')}
        style={styles.img}>
    <Center>
    <Box style={styles.headingCtn} marginBottom='10'>
    <FavouriteIcon size='8' m='2' color='#E94560'/>
    <Heading color={'#0F3460'}>PackBuddy</Heading>
    </Box>
      <Button style={styles.btn} variant="unstyled" onPress={()=>navigation.navigate('Dashboard')}>New Trip</Button>
      <Button style={styles.btn} variant="unstyled" onPress={()=>navigation.navigate('PlacesList')}>Saved Trips</Button>
    </Center>
    </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainCtn: {
    backgroundColor: '#fff',
    height:'100%',
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    marginTop:10,
    width:200,
    backgroundColor:'#f5f5f5',
    borderColor:'#f5f5f5',
    borderWidth:1,
    borderRadius:10,
    color:'#4C0033',
  },
  headingCtn:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f5f5f5',
    padding:10,
  }
})

export default Home



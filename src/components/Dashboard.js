import {StyleSheet} from 'react-native';
import React ,{useState} from 'react'
import {VStack,Box,Input,Icon,Center,Button, Flex,Heading, FavouriteIcon, ScrollView} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import PlacesInput from 'react-native-places-input';



const Dashboard = ({navigation}) => {

    const [location, setLocation] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [startdate, setStartDate] = useState(0);
    const [startMonth, setStartMonth] = useState('');
    const [enddate, setEndDate] = useState(0);
    const [endMonth, setEndMonth] = useState('');
    const [tripmode, settripMode] = useState('');
    const [staymode, setStayMode] = useState('');

    const [firstopen, setfirstOpen] = useState(false);
    const [secondopen, setsecondOpen] = useState(false);
    const [thirdopen, setthirdOpen] = useState(false);
    const [fourthopen, setfourthOpen] = useState(false);

    const dropdownMonths = [{'label':'January','value':'January'},{'label':'February','value':'February'},{'label':'March','value':'March'},{'label':'April','value':'April'},{'label':'May','value':'May'},{'label':'June','value':'June'},{'label':'July','value':'July'},{'label':'August','value':'August'},{'label':'September','value':'September'},{'label':'October','value':'October'},{'label':'November','value':'November'},{'label':'December','value':'December'}];

   
  return (
    
   <Flex justifyContent='center' padding='2.5' backgroundColor={'#D2DAFF'} height='100%'>
    <Box style={styles.headingCtn} marginBottom='10'>
    <FavouriteIcon size='8' m='2' color='#E94560'/>
    <Heading color={'#0F3460'}>PackBuddy</Heading>
    </Box>
    <VStack space={8} backgroundColor='#f5f5f5' padding='5'>
      <Box>
        <Heading color={'black'} size='sm'>Where are you going?</Heading>
        <Box>
        <PlacesInput
        googleApiKey=''
        onSelect={place => {
          setLocation(place.result.formatted_address)
          setLatitude(place.result.geometry.location.lat)
          setLongitude(place.result.geometry.location.lng)
        }}
        language={'en'}
        stylesContainer={{
          position: 'relative',
          alignSelf: 'stretch',
          margin: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
      }}
      stylesList={{
          top: 0,
          left: -1,
          right: -1
      }}
       />
       </Box>
     </Box>
     <Box mt='5'>
     <Heading size="sm">From</Heading>
      <Flex flexDirection={'row'}>
      <Input type = 'number' value = {startdate} onChangeText = {(e)=>{setStartDate(e)}} width='22.5%' marginRight={'2.5'} borderColor='black' borderWidth='1' borderRadius='5' />
      <Box width={'75%'}>
      <DropDownPicker
      open = {firstopen}
      setOpen = {setfirstOpen}
      items = {dropdownMonths}
      value = {startMonth}
      setValue = {setStartMonth}
      dropDownDirection = 'TOP'
      />
      </Box>
     </Flex>
     </Box>
     <Box>
      <Heading size="sm">To</Heading>
      <Flex flexDirection={'row'} >
      <Input type = 'number' value = {enddate} onChangeText = {(e)=>{setEndDate(e)}} width='22.5%' marginRight={'2.5'} borderColor='black' borderWidth='1' borderRadius='5' />
      <Box width={'75%'}>
      <DropDownPicker
      open = {secondopen}
      setOpen = {setsecondOpen}
      items = {dropdownMonths}
      value = {endMonth}
      setValue = {setEndMonth}
      dropDownDirection = 'TOP'
      />
      </Box>
     </Flex>
     </Box>
      <Box>
      <Heading size="sm">How are you travelling ?</Heading>
      <DropDownPicker 
      items={[
          {label: 'Flight', value: 'flight'},
          {label: 'Train', value: 'train'},
          {label: 'Bus/Car', value: 'road'},
      ]}
      open = {thirdopen}
      multiple = {false}
      setValue = {settripMode}
      setOpen = {setthirdOpen}
      value = {tripmode}
      dropDownDirection = 'TOP'
      />   
      </Box>
      <Box>
      <Heading size="sm">Where are you staying ?</Heading>
      <DropDownPicker
      items={[
          {label: 'Hotel', value: 'hotel'},
          {label: 'Homestay', value: 'home'}
      ]}
      open = {fourthopen}
      multiple = {false}
      setValue = {setStayMode}
      setOpen = {setfourthOpen}
      value = {staymode}
      dropDownDirection = 'TOP'
      />
      </Box>
      <Box>
      <Button onPress={()=>navigation.navigate('Activities',{place:location,
                                                              lat:latitude,
                                                              log:longitude,
                                                              startdate:startdate,
                                                              startmonth:startMonth,
                                                              enddate:enddate,
                                                              endmonth:endMonth,
                                                              tripmode:tripmode,
                                                              staymode:staymode,
                                                             })} colorScheme='blue' width='100%'>Select Activities</Button>
      </Box>
    </VStack>
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


       
export default Dashboard
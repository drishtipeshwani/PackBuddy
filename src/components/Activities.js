import React,{useEffect, useState} from 'react'
import { Pressable, Text, Box,Flex,Button, Center,HStack,CheckCircleIcon,Modal,Input,FormControl, ScrollView,ChevronRightIcon} from "native-base";
import { StyleSheet } from 'react-native';


const Activities = ({navigation,route}) => {

  const [selectedActivities, setselectedActivities] = React.useState([])
  const [customActivity, setcustomActivity] = React.useState('')
  const [showModal, setShowModal] = useState(false);
  

  const [activitiesList,setActivitiesList] = React.useState(['Swimming','Running','Hiking','Beach','Snow Sports','Gym','Business','Baby','Pets'])


  const addCustomActivity = () => {
     setShowModal(false)
     console.log(customActivity)
     setActivitiesList([...activitiesList,customActivity])
     
  }

  const handleSelectedActivity = (activity) => {
    
    if(selectedActivities.includes(activity)){
      setselectedActivities(selectedActivities.filter(item => item !== activity))
    }else{
      setselectedActivities([...selectedActivities,activity])
    }
    console.log(selectedActivities)
  }

  return (
    <ScrollView backgroundColor={'#D2DAFF'} height='100%'>
    <Flex>
    {activitiesList.map((activity) => {
        return (
          <Pressable onPress={()=>handleSelectedActivity(activity)} key={activity}>
            {({
              isPressed,
              isHovered,
              isClicked,
            }) => {
            return <Box alignItem = 'center' margin = '2.5' p='5' rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300"  backgroundColor={selectedActivities.includes(activity) ? "green.400":"coolGray.100"}  style={{
              transform: [{
                scale: isPressed ? 0.96 : 1
              }]
            }}>
              <HStack space={2} justifyContent='space-between'>
               <ChevronRightIcon size="xl" color={"coolGray.400"} />
              <Text color="coolGray.800" fontWeight="medium" fontSize="xl">
                {activity}
              </Text> 
              </HStack>
            </Box>
        }}

          </Pressable>
        )
    })}
     <Center>
        <Button onPress={() => setShowModal(true)} style={styles.btn} variant="unstyled" w={'75%'}>Add Custom Activity</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add Activity</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input type='text' value={customActivity} onChangeText={(text)=>setcustomActivity(text)}/>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={()=>addCustomActivity()}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
    <Center>
        <Button onPress={()=>navigation.navigate('List',{place:route.params.place,
                                                          lat:route.params.lat,
                                                          log:route.params.log,
                                                          startdate:route.params.startdate,
                                                          startmonth:route.params.startmonth,
                                                          enddate:route.params.enddate,
                                                          endmonth:route.params.endmonth,
                                                          tripmode:route.params.tripmode,
                                                          staymode:route.params.staymode,
                                                          activities:selectedActivities})} style={styles.btn} variant="unstyled" w={'75%'}>Next</Button>
                                                         
    </Center>
    </Flex>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btn:{
    marginTop:10,
    width:200,
    backgroundColor:'#f5f5f5',
    borderColor:'#f5f5f5',
    borderWidth:1,
    borderRadius:10,
    color:'#4C0033',
  }
})

export default Activities
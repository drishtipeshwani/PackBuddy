import React,{useState,useEffect} from "react";
import { Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center, useToast, NativeBaseProvider, ScrollView,CheckIcon, Button, Badge } from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import { DataStore } from '@aws-amplify/datastore';
import { Place } from '../models';
import { SafeAreaView, StyleSheet } from "react-native";


const Todo = (props) => {
  
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();

  const [place, setPlace] = useState(null);
  const [activities, setActivities] = useState(props.activities);
  const [placeId, setPlaceId] = useState(props.placeId);
  const [isNew, setIsNew] = useState(props.isNew);
 

  useEffect(() => {
    async function fetchCurrentPlace() {
      // On rendering this place I am fetching the current place from the database and setting the place state
      // Once the place is set I am setting a list of default todo items
      const queryPlace = await DataStore.query(Place, placeId);
      setPlace(queryPlace);
    }
    fetchCurrentPlace();
  }, []);

  
    
  useEffect(() => {
    async function fetchList() {
      // Getting the current list using the place instance of the current place gets call everytime the place state changes
        const query = await DataStore.query(Place, place.id);
        
        let currentList = query.Todos;
        if(!props.isNew){
          // Convert JSON String to JSON Object
          currentList = JSON.parse(query.Todos);
        }
        setList(currentList);
      }
    fetchList();
  }, [place]);



  // In add Item I am adding the details to the database and also to the local list
  const addItem = async (title) => {

    if (title === "") {
      toast.show({
        name: "Please Enter Text",
        status: "warning"
      });
      return;
    }

    setList([...list, { name: title, activity:'Custom'}]);

    // Adding the item to the database by deleting the previous place and creating a new place with the updated list
    const todelete = await DataStore.query(Place,place.id);
    DataStore.delete(todelete);

      await DataStore.save(
        new Place({
          "name": place.name,
          "Todos": [...list, { name: title, activity:'Custom'}],
          "activities":activities
        })
      );
    

    const currentPlace = await DataStore.query(Place, c => c.name("eq", place.name));

    const query = await DataStore.query(Place,currentPlace[0].id);
    setPlace(query);
    setPlaceId(query.id);

  };

  const handleDelete = async (index) => {
    
    const newList = list.filter((item, i) => i !== index);
    setList(newList);

    // Deleting the old place instance and creating a new one with the updated list
    const todelete = await DataStore.query(Place,place.id);
    DataStore.delete(todelete);

      await DataStore.save(
        new Place({
          "name": place.name,
          "Todos": newList,
          "activities":activities
        })
      );
  
    const currentPlace = await DataStore.query(Place, c => c.name("eq", place.name));
    const query = await DataStore.query(Place,currentPlace[0].id);
    setPlace(query);
    setPlaceId(query.id);
    
  }; 


  return <Center w="100%" padding='2.5'>
      <Box maxW="300" w="100%">
        <VStack space={4}>
         <Heading>Your Custom Packing List</Heading>
          <HStack space={2}>
            <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Custom Item.." accessibilityLabel="Input" placeholderTextColor={'black'} borderColor='black'/>
            <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="white" />} onPress={() => {
            addItem(inputValue);
            setInputValue("");
          }} accessibilityLabel="Add"/>
          </HStack>
          <VStack space={2}>
          {list.map((item, itemI) => 
          <VStack space={2} key={itemI} backgroundColor={'#f5f5f5'} padding={'2.5'} rounded='8' w="100%" >
          <Badge key={itemI} variant="subtle" colorScheme="info" alignSelf={'flex-start'} py='0'>{item.activity}</Badge>
          <HStack  justifyContent="space-between" alignItems="center" key={item.name + itemI.toString()}>
                <Heading size='sm'>{itemI+1}.</Heading>
                <Heading size='sm'>
                  {item.name}
                </Heading>
                <IconButton accessibilityLabel='Delete' size="sm" colorScheme="trueGray" icon={<CheckIcon size="md" color="green.400" />} onPress={() => handleDelete(itemI)} />
              </HStack>
              </VStack>
              )}
          </VStack>
          </VStack>
      </Box>
    </Center>;
};

  const TodoComponent = (props) => {
        return (
          <ScrollView>
          <NativeBaseProvider>
            <Center flex={1} px="3">
              <Todo placeId={props.placeId} isNew={props.isNew} activities={props.activities}/>
            </Center>
            </NativeBaseProvider>
          </ScrollView>
        );
    };


  const styles = StyleSheet.create({
      btn:{
        marginTop:10,
        width:300,
        backgroundColor:'#f5f5f5',
        borderColor:'#f5f5f5',
        borderWidth:1,
        borderRadius:10,
        color:'#4C0033',
        marginBottom:10
      }
    })

    
 export default TodoComponent;
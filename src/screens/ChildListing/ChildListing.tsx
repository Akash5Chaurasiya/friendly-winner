import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Clickable from '../../components/Clickable/Clickable';
import { getTodoSuccessAction, todoFailureAction, todoRequestAction } from '../../reducer/postReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { fetchTodos } from '../../reducer/postReducer/api';
import CurrentSlips from '../CurrentSlips/CurrentSlips';
import CurrentSlipsCard from './components/CurrentSlips/CurrentSlipsCard';
import LogsCard from './components/Logs/LogsCard';

const dummyData = [
  {
    "id": "1",
    "name": "Child Part A",
    "fieldname": "Wire Cutting",
    "passcode": "#PS-7866-001",
    "time": "2h 45m",
    "entity": ["log#4"],
    "status": "completed"
  },
  {
    "id": "2",
    "name": "Child Part B",
    "fieldname": "Assembly",
    "passcode": "#PS-7866-002",
    "time": "3h 30m",
    "entity": ["log#2"],
    "status": "incomplete"
  },
  {
    "id": "3",
    "name": "Child Part C",
    "fieldname": "Testing",
    "passcode": "#PS-7866-003",
    "time": "1h 15m",
    "entity": ["log#6"],
    "status": "completed"
  }
]


export default function ChildListing({ route, navigation }: any) {
  // Access the parameters from route.params
  const { id, title, userId } = route.params;
  const dispatch = useDispatch
  const { data: todos, error } = useSWR('todos', fetchTodos);
  // useEffect(() => {
  //   if (error != undefined) {
  //     dispatch(todoFailureAction());
  //   } else if (todos) {
  //     dispatch(getTodoSuccessAction(todos));
  //   }
  // }, [dispatch, todos, error]);

  const todo = useSelector((state: any) => state.todos);
  // console.log("new cardddd", todo);

  const truncateTitle = (text: string, numWords: number): any => {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ');
  };
  const truncatedTitle = truncateTitle(title, 3);
  // const [state, setState] = React.useState<ChildListing.State>({
  //   // selectedEntity: 'currentSlips',
  //   selectedEntity: 'logs'

  // });
  const [state, setState] = useState({
    selectedEntity: 'logs',
  });
  const handleCurrentSlipsClick = () => {
    setState({ selectedEntity: 'currentSlips' });
    // navigation.navigate('CurrentSlips')

    // You can add additional logic here if needed
  };

  const handleLogsClick = () => {
    setState({ selectedEntity: 'logs' });
    // navigation.navigate('Logs')
    // You can add additional logic here if needed
  };


  return (
    <View style={styles.container}>
      <Navbar />
      {/* <Text>{title}</Text> */}

      <View style={{ width: "100%", height: '100%', }}>
        <View style={{ padding: '6%' }}
        >

          <Text style={{ color: '#757575', fontSize: 12, fontWeight: '600' }}>{`WORD ORDER #${id}`}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: 26, fontWeight: '700', fontFamily: 'Inter-Regular', }}>{truncatedTitle}</Text>
            <Text style={{ color: '#666666', fontSize: 19, fontWeight: '500' }}>{`${id} Items`}</Text>
          </View>

        </View>
        <View className='rounded-full' style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingVertical: 6, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
          {/* <View className="bg-red-300"> */}
          <View>
            <Clickable
              onPress={handleCurrentSlipsClick}
            >
              <Text className={`text-base ${state.selectedEntity === 'currentSlips'
                ? 'text-blue-900 font-700 bg-white px-14 py-4 shadow-lg shadow-gray-800 rounded-full mx-3'
                : 'text-slate-900 text-base font-900 bg-transparent mx-9'
                } `}
                style={{ fontFamily: 'Inter-Bold' }}>
                Current Slips
              </Text>

            </Clickable>
          </View>

          <View >
            <Clickable
              onPress={handleLogsClick}
            // onPress={() => {
            //   console.log('clickedlogs');
            // }}
            ><Text className={`text-base ${state.selectedEntity === 'logs'
              ? 'text-blue-900 font-700 bg-white px-14 py-4 shadow-lg shadow-gray-800 rounded-full mx-3 '
              : 'text-slate-900 text-base font-900 bg-transparent mx-9'
              } `}
              style={{ fontFamily: 'Inter-Bold' }}>
                {/* <Text style={state.selectedEntity === 'currentSlips' ? styles.textnormalslip : styles.textslip}> */}
                Logs
              </Text>
            </Clickable>
          </View>
        </View>

        {state.selectedEntity === 'currentSlips' ? (

          <FlatList
            data={dummyData}
            renderItem={({ item, index }) => {
              return (
                <Clickable
                  key={item.id}
                  onPress={() => {
                    // Handle navigation if needed
                  }}
                >
                  {dummyData.map((item, index) => (
                    <CurrentSlipsCard
                    // key={index}
                    // name={item.name}
                    // fieldname={item.fieldname}
                    // passcode={item.passcode}
                    // time={item.time}
                    // entity={log} // Pass each log entry individually
                    // status={item.status}
                    />
                  ))}
                </Clickable>
              );
            }}
          />


        ) : (
          <View>
            <FlatList
              data={todo}
              renderItem={p => {
                const v = p.item;
                return (
                  <Clickable
                    key={p.index}
                    onPress={() => {
                      // navigation.navigate('childListing', {

                      //     id: p.item.id,
                      //     title: p.item.title,
                      //     userId: p.item.userId
                      // }
                      // );
                    }}>
                    <LogsCard />
                  </Clickable>
                );
              }}
            />
          </View>
        )}

      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textnormalslip: {
    color: '#757575',
    fontSize: 15,
    fontWeight: '600'
  },
  textslip: {
    color: '#283093',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,

  }
});

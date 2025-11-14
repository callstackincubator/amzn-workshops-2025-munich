import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
  const { navigate } = useNavigation();

  return (
    <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#7837F5',
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
          borderRadius: 8,
          padding: 10,
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        onPress={() => navigate('Settings')}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          ⚙️ Settings
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

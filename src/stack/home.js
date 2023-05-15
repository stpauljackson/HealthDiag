import First from '../pages/first';
// import Predict from '../pages/Predict';
import About from '../pages/about'
import Home from '../pages/home'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
             <Stack.Screen name='First' component={First} options={{ headerShown: false }} />
            <Stack.Screen name='About' component={About} options={{ headerShown: false }} />
            {/* <Stack.Screen name='Predict' component={Predict} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
        </Stack.Navigator>
    );
}


export default HomeStack;
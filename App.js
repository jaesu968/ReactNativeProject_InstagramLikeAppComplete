import React, { useState, createContext, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Woof from './components/Woof';
import SignUp from './SignUp'; 

// -- Authentication Context --
// create context and hook to access it
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// -- Components -- 
const Stack = createStackNavigator(); 

// --- Main screens ---
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

// HomeScreen 
const HomeScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
};
// FeedScreen 
const FeedScreen = () => {
  return (
    <View style={styles.layout}>
      <Woof /> 
    </View>
  );
};
// CatalogScreen 
const CatalogScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Catalog Screen</Text>
    </View>
  );
};
// AccountScreen
const AccountScreen = () => {
  const { signOut } = useAuth(); // access the signOut function from the AuthContext

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Account Screen</Text>
      <Button 
      onPress={() => signOut()} 
      title={'Sign Out'} 
      color="red"
      /> 
    </View>
  );
};

// --- Onboarding screens ---
const SignInScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  
  return (
  <View style={styles.layout}>
    <Text style={styles.title}>Sign In Screen</Text>
    <Button onPress={() => navigation.navigate('SignUp')} title={'Sign Up?'} />
    <Button onPress={() => signIn()} title={'Sign In'} />
  </View> 
  ); 
}; 

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
  <View style={styles.layout}>
    <Text style={styles.title}>Sign Up Screen</Text>
    <SignUp /> 
    <Button onPress={() => navigation.navigate('SignIn')} title={'Sign In?'} /> 
  </View>
  ); 
}; 

// --- App ---
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

 // optimized for performance - oply recreates when isSignedIn changes
 const authValue = useMemo(() => ({
  signIn,
  signOut,
  isSignedIn,
 }), [isSignedIn]); 

  return (
    <AuthContext.Provider value={authValue}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}} 
          initialRouteName='SignIn'
        >
          {isSignedIn ? (
            <Stack.Screen name="Main" component={MainNavigator} />
          ) : (
            <>
              <Stack.Screen 
                name="SignIn" 
                component={SignInScreen}
                options={{title: "Sign In"}}
              />
              <Stack.Screen 
                component={SignUpScreen} 
                name="SignUp" 
                options={{title:"Sign Up"}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

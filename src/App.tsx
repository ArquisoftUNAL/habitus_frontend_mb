import React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications'

import { LIGHT_THEME } from './themes/Light.theme';
import { MainView } from './views/Main.view';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { WelcomeView } from './views/WelcomePage.view'

import { ThemeProvider } from './themes/Theme.context';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getAuthToken } from './storage/authToken';

import { GRAPHQL_SERVER } from './config';

import RNFetchBlob from 'rn-fetch-blob';


const httpLink = createHttpLink({
    uri: GRAPHQL_SERVER,
    fetch: async (info: RequestInfo, init?: RequestInit) => {

        const url = typeof info === "string" ? info : info.url;
        let headers = new Headers(init?.headers ?? {});

        let reqHeaders: { [key: string]: string } = {};

        headers.forEach((value: string, key: string) => {
            reqHeaders[key] = value;
        });

        // get the authentication token from local storage if it exists
        const token = await getAuthToken();
        reqHeaders["x-auth-token"] = token ?? "";

        const body = init?.body;

        let response: any = null;
        try {
            response = await RNFetchBlob.config({
                trusty: true,
                timeout: 10000,

            }).fetch(
                "POST", url,
                reqHeaders, body,
            );
        } catch (e) {
            console.log("[ERROR]", JSON.stringify(e), e);
            console.log(reqHeaders, body)
            return new Response("Error fetching query", {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const reactResponse = new Response(response.data, {
            status: response.respInfo.status,
            headers: response.respInfo.headers,
        });

        return reactResponse;
    }
});

const authLink = setContext(async (_: any, data) => {
    // get the authentication token from local storage if it exists
    const token = await getAuthToken();

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...data.headers,
            "x-auth-token": token ?? "",
        }
    }

});


const cache = new InMemoryCache();
const client = new ApolloClient({
    //link: authLink.concat(httpLink),
    link: httpLink,
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

const Stack = createStackNavigator();

function App(): JSX.Element {

    return (
        <ApolloProvider client={client}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider initial={LIGHT_THEME}>
                    <ToastProvider>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName="Welcome">
                                <Stack.Screen
                                    name="Main" component={MainView}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="Login" component={LoginView}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="Register" component={RegisterView}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="Welcome" component={WelcomeView}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </ToastProvider>
                </ThemeProvider>
            </GestureHandlerRootView>
        </ApolloProvider>
    )
}

export default App;
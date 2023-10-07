import React from 'react';
import { useEffect } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { useTheme } from '../themes/Theme.context';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { useLazyQuery } from '@apollo/client';

import graphql from '../graphql';
import { CalendarView } from './Calendar.view';
import { IconComponentAsFunction } from '../components/Icon';
import { createStyles } from './../styles/main.view.styles';
import { UserInfoHeader } from '../components/UserInfoHeader';
import { removeAuthToken } from '../storage/authToken';
import { LoadingView } from './LoadingView';

const Drawer = createDrawerNavigator();

interface DrawerContentProps {
    props: any,
    styles: any,
    user: any,
    theme: any,
    toggleTheme: any
}

const DrawerContent = ({ props, styles, user, theme, toggleTheme }: DrawerContentProps) => {

    return (
        <View style={styles.drawerContentView}>
            <UserInfoHeader user={user} containerStyle={styles.drawerHeader} />

            <DrawerContentScrollView {...props}
                style={{
                    width: "100%",
                    padding: 0,
                }}
                contentContainerStyle={styles.drawerContent}
            >
                <Pressable onPress={() => {
                    props.navigation.navigate('Calendar');
                }}
                    style={styles.item}
                >
                    <Text style={styles.itemText}>Calendar</Text>
                </Pressable>

                <Pressable onPress={() => {
                    props.navigation.navigate('Achievements');
                }}
                    style={styles.item}
                >
                    <Text style={styles.itemText}>Achievements</Text>
                </Pressable>

                <Pressable onPress={() => {
                    props.navigation.navigate('Statistics');
                }}
                    style={styles.item}
                >
                    <Text style={styles.itemText}>Statistics</Text>
                </Pressable>

                <Pressable onPress={() => {
                    props.navigation.navigate('Notifications');
                }}
                    style={styles.item}
                >
                    <Text style={styles.itemText}>Notifications</Text>
                </Pressable>

                <Pressable onPress={() => {
                    props.navigation.navigate('My Account');
                }}
                    style={styles.item}
                >
                    <Text style={styles.itemText}>My Account</Text>
                </Pressable>

            </DrawerContentScrollView >

            <View style={styles.drawerFooter}>
                <Pressable
                    style={styles.drawerFooterItem}
                    onPress={() => {
                        toggleTheme();
                    }}>
                    <View style={styles.drawerFooterItemContent}>
                        <Image style={{
                            width: "50%",
                            height: "60%",
                        }}
                            source={theme.images.toggleTheme}
                        />
                    </View>
                </Pressable>
                <Pressable
                    style={styles.drawerFooterItem}
                    onPress={async () => {
                        await removeAuthToken();

                        props.navigation.navigate('Login');
                    }}>
                    <View style={styles.drawerFooterItemContent}>
                        <Image style={{
                            width: "50%",
                            height: "70%",
                        }}
                            source={theme.images.logout}
                        />
                    </View>
                </Pressable>
            </View>
        </View >
    )
}

export const MainView = (): JSX.Element => {
    const { theme, toggleTheme } = useTheme();
    const styles = createStyles(theme);

    useEffect(() => {
        fetchUserData();
    }, []);

    const [fetchUserData, { loading, error, data }] = useLazyQuery(graphql.GET_USER);

    if (loading || !data) {
        return <LoadingView />;
    }

    if (error) {
        return <View><Text>{error.message}</Text></View>
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: styles.drawer,
                headerTitle: 'This is Habitus!',
                headerTintColor: theme.colors.primary,
            }}
            initialRouteName='Calendar'
            backBehavior='history'
            defaultStatus='closed'
            drawerContent={(props) => <DrawerContent
                props={props} styles={styles} user={data.getCurrentUser}
                theme={theme} toggleTheme={toggleTheme}
            />}
        >
            <Drawer.Screen
                name="Your Habits"
                component={CalendarView}
                options={{
                    drawerLabel: 'Your Habits',
                    title: "Your Habits",
                    drawerIcon: IconComponentAsFunction({ name: 'android' })
                }}
            />
            <Drawer.Screen
                name="Calendar"
                component={CalendarView}
                options={{
                    drawerLabel: 'Calendar',
                    title: "Calendar",
                    drawerIcon: IconComponentAsFunction({ name: 'android' })
                }}
            />
            <Drawer.Screen
                name="Achievements"
                component={CalendarView}
                options={{
                    drawerLabel: 'Achievements',
                    title: "Achievements"
                }}
            />
            <Drawer.Screen
                name="Statistics"
                component={CalendarView}
                options={{
                    drawerLabel: 'Statistics',
                    title: "Statistics"
                }}
            />
            <Drawer.Screen
                name="Notifications"
                component={CalendarView}
                options={{
                    drawerLabel: 'Notifications',
                    title: "Notifications"
                }}
            />
            <Drawer.Screen
                name="My Account"
                component={CalendarView}
                options={{
                    drawerLabel: 'My account',
                    title: "My account"
                }}
            />
        </Drawer.Navigator>
    );
};
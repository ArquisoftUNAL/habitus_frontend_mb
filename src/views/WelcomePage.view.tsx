import React, { memo } from 'react';
import { Text, View, Image } from 'react-native';
import { useQuery } from '@apollo/client';

import { createStyles as welcomeViewStylesBuilder } from '../styles/welcome.view.styles';
import { createStyles as testStylesBuilder } from '../styles/texts.styles';
import { createStyles as mainContainerBuilder } from '../styles/container.styles';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { CustomButton } from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { Spacing } from '../components/Spacing';
import { CommonActions } from '@react-navigation/native';
import { removeAuthToken } from '../storage/authToken';

const redirectMain = (navigation: any) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Main' }
            ]
        })
    );
}

const habitusLogo = require('./../assets/images/LogoHabitusBackBlanco.png');

interface WelcomeViewProps {
    navigation: any;
};

export const WelcomeView = React.memo<WelcomeViewProps>(({ navigation }) => {

    const { loading, data, error } = useQuery(graphql.GET_USER);

    if (data?.getCurrentUser) {
        // User is logged in, redirect to main view
        redirectMain(navigation);
    } else if (!loading || error) {
        // User is not logged in, drop the token
        removeAuthToken();
    }

    const { theme } = useTheme();
    const styles = {
        ...welcomeViewStylesBuilder(theme),
        ...testStylesBuilder(theme),
        ...mainContainerBuilder(theme)
    };

    return (
        <ScrollView
            contentContainerStyle={[styles.fullPage, { alignItems: 'center', justifyContent: 'center' }]}
        >
            <Image source={
                habitusLogo
            } style={styles.habitusLogo} />

            <Text style={styles.pageTitle}>
                Welcome to habitus
            </Text>

            <Spacing size={10} />
            <CustomButton title="Login" action={() => {
                navigation.navigate('Login');
            }} type="primary" />

            <Spacing size={10} />

            <CustomButton title="Register" action={() => {
                navigation.navigate('Register');
            }} type="secondary" />

        </ScrollView >
    );
});
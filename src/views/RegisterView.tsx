import React from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client';
import { CommonActions } from '@react-navigation/native';

import graphql from '../graphql';
import { PageTitle, Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/login.view.styles';
import { TextFieldInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { CustomButton } from '../components/Button';
import { getAuthToken, setAuthToken } from '../storage/authToken';

interface LoginViewProps {
    navigation: any;
};

const redirectRegister = (navigation: any) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Main' }
            ]
        })
    );
}

export const RegisterView: React.FC<LoginViewProps> = ({ navigation }) => {

    // Redirection if the user is already logged in
    getAuthToken()
        .then((token) => {
            if (token) {
                redirectRegister(navigation);
            }
        });

    const { theme } = useTheme();
    const styles = createStyles(theme);


    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [birthDay, setBirthDay] = React.useState<string>('');

    const [performRegister, { loading, error, data }] = useMutation(graphql.REGISTER, {
        variables: {
            email, password, name, birthDay
        }
    });

    if (loading) {
        return <View><Label title="Loading..." /></View>
    }

    if (error) {
        return <View><Label title={error.message} /></View>
    }

    if (data?.loginUser) {
        // Save the token
        setAuthToken(data.loginUser)
            .then(() => {
                // Navigate to the main view
                redirectRegister(navigation);
            });
    }

    return (
        <View style={styles.container}>

            <PageTitle title="The best decision of your life!" />

            <Spacing size={10} />
            <Label title="Type here your name or nickname (even your gamertag)" />
            <TextFieldInput title="Email" onChange={
                (value: string) => setEmail(value)
            } />

            <Spacing size={10} />
            <Label title="Your email here" />
            <TextFieldInput title="Email" onChange={
                (value: string) => setEmail(value)
            } />

            <Spacing size={20} />
            <Label title="...And your password here (Please do not include 123 on it...)" />
            <TextFieldInput title="Password" masked={true} onChange={
                (value: string) => setPassword(value)
            } />

            <Spacing size={60} />
            <CustomButton title="Register" type="primary" action={() => {
                performRegister()
            }} />

            <Spacing size={20} />
            <CustomButton title="Register if you are new!" type="secondary" action={() => {
                console.log('Register')
            }} />
        </View>
    );
}
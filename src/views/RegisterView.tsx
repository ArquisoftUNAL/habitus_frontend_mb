import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { CommonActions } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

import graphql from '../graphql';
import { PageTitle, Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/auth.view.styles';
import { TextFieldInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { Separator } from '../components/Separator';
import { CustomButton } from '../components/Button';
import { getAuthToken, setAuthToken } from '../storage/authToken';
import { LoadingView } from './LoadingView';
import { GraphQLError } from '../components/GraphQLError';

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

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [birthDay, setBirthDay] = React.useState<Date>(new Date());

    const [datepickerOpen, setDatepickerOpen] = React.useState<boolean>(false);

    const [performRegister, { loading, error, data }] = useMutation(graphql.REGISTER, {
        variables: {
            email, password, name, birthDay
        }
    });

    if (error) { console.log(error) }

    if (loading) {
        return <LoadingView />
    }

    if (data?.createUser) {
        // Save the token
        setAuthToken(data.createUser.jwt)
            .then(() => {
                // Navigate to the main view
                redirectRegister(navigation);
            });
    }

    return (
        <ScrollView>

            <View style={styles.container}>

                <PageTitle title="The best decision of your life!" />

                {
                    error && (
                        <GraphQLError error={error} />
                    )
                }

                <Spacing size={10} />
                <Label title="Type here your name or nickname (even your gamertag)" />
                <TextFieldInput title="Name" onChange={
                    (value: string) => setName(value)
                } value={name} />

                <Spacing size={10} />
                <Label title="Your email here" />
                <TextFieldInput title="Email" onChange={
                    (value: string) => setEmail(value)
                } value={email} />

                <Spacing size={20} />
                <Label title="...And your password here (Please do not include 123 on it...)" />
                <TextFieldInput title="Password" masked={true} onChange={
                    (value: string) => setPassword(value)
                } />

                <Spacing size={20} />
                <Label title="Type in your birthday, just wanting to make it more user-friendly for you!" />
                <Spacing size={20} />
                <Text style={styles.dateViewText}>
                    Chosen date: {birthDay?.toISOString().split('T')[0]}
                </Text>
                <Spacing size={15} />
                <CustomButton title="Select your birthday" type="secondary" action={() => {
                    setDatepickerOpen(true);
                }} />
                <DatePicker
                    date={birthDay}
                    onConfirm={(date) => {
                        setBirthDay(date);
                        setDatepickerOpen(false);
                    }}
                    modal
                    mode="date"
                    open={datepickerOpen}
                    onCancel={() => {
                        setDatepickerOpen(false);
                    }}
                />

                <Spacing size={10} />
                <Separator />
                <CustomButton title="Register" type="primary" action={() => {
                    performRegister()
                }} />

                <Spacing size={20} />
                <CustomButton title="Log In if you already have an account!" type="secondary" action={() => {
                    navigation.navigate('Login');
                }} />
            </View>
        </ScrollView>
    );
}
import React from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client';
import { CommonActions } from '@react-navigation/native';

import graphql from '../graphql';
import { PageTitle, Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles as buildLoginStyles } from '../styles/auth.view.styles';
import { createStyles as buildContainerStyles } from '../styles/container.styles';
import { TextFieldInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { CustomButton } from '../components/Button';
import { Separator } from '../components/Separator';
import { getAuthToken, setAuthToken } from '../storage/authToken';
import { ScrollView } from 'react-native-gesture-handler';
import { LoadingView } from './LoadingView';
import { GraphQLError } from '../components/GraphQLError';

interface LoginViewProps {
    navigation: any;
};

const redirectLogin = (navigation: any) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Main' }
            ]
        })
    );
}

export const LoginView: React.FC<LoginViewProps> = ({ navigation }) => {

    const { theme } = useTheme();
    const styles = {
        ...buildContainerStyles(theme),
        ...buildLoginStyles(theme)
    };

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [performLogin, { loading, error, data }] = useMutation(graphql.LOGIN, {
        variables: { email, password }
    });

    if (loading) {
        return <LoadingView />
    }

    if (error) {
        console.log(error);
    }

    if (data?.loginUser) {
        // Save the token
        setAuthToken(data.loginUser)
            .then(() => {
                // Navigate to the main view
                redirectLogin(navigation);
            });
    }

    return (
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <View>

                <PageTitle title="Login into Habitus!" />

                {
                    error && <GraphQLError error={error} />
                }

                <Spacing size={10} />
                <Label title="Your email goes here" />
                <TextFieldInput title="Email" onChange={
                    (value: string) => setEmail(value)
                } />

                <Spacing size={20} />
                <Label title="...And your password here" />
                <TextFieldInput title="Password" masked={true} onChange={
                    (value: string) => setPassword(value)
                } />

                <Spacing size={20} />
                <Separator />
                <CustomButton title="Login" type="primary" action={() => {
                    performLogin();
                }} />

                <Spacing size={20} />
                <CustomButton title="Register if you are new!" type="secondary" action={() => {
                    navigation.navigate('Register');
                }} />
            </View>
        </ScrollView >
    );
}
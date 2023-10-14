import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import DatePicker from 'react-native-date-picker';

import graphql from '../graphql';
import { PageTitle, Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/auth.view.styles';
import { TextFieldInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { Separator } from '../components/Separator';
import { CustomButton } from '../components/Button';
import { LoadingView } from './LoadingView';
import { GraphQLError } from '../components/GraphQLError';
import { SucessMessage } from '../components/SucessMessage';

export const UpdateUserView: React.FC = ({ navigation, fetchUserData }: any) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [birthDay, setBirthDay] = React.useState<Date>(new Date());

    // Get user data first
    const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(graphql.GET_USER);

    React.useEffect(() => {
        if (dataUser) {
            setEmail(dataUser.getCurrentUser.email);
            setName(dataUser.getCurrentUser.name);
            setBirthDay(new Date(dataUser.getCurrentUser.birthDay));
        }
    }, [dataUser]);

    const [datepickerOpen, setDatepickerOpen] = React.useState<boolean>(false);

    const [performUpdate, { loading, error, data }] = useMutation(graphql.UPDATE_USER, {
        variables: {
            email, password, name, birthDay
        }
    });

    if (errorUser) {
        return <GraphQLError error={errorUser} />
    }

    if (loadingUser) {
        return <LoadingView />
    }

    if (error) {
        console.log(JSON.stringify(error));
        return <GraphQLError error={error} />
    }

    if (loading) {
        return <LoadingView />
    }

    return (
        <ScrollView>

            <View style={styles.container}>

                <PageTitle title="Update your profile" />

                {
                    error && (
                        <GraphQLError error={error} />
                    )
                }

                {
                    data && (
                        <SucessMessage message="Your data was updated!" />
                    )
                }

                <Spacing size={10} />
                <Label title="Your nickname" />
                <TextFieldInput title="Name" onChange={
                    (value: string) => setName(value)
                } value={name} />

                <Spacing size={10} />
                <Label title="Your email" />
                <TextFieldInput title="Email" onChange={
                    (value: string) => setEmail(value)
                } value={email} />

                <Spacing size={20} />
                <Label title="Your password" />
                <TextFieldInput title="Password" masked={true} onChange={
                    (value: string) => setPassword(value)
                } />

                <Spacing size={20} />
                <Label title="Your birthdate" />
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
                <CustomButton title="Update my data!" type="primary" action={() => {
                    performUpdate()
                }} />
            </View>
        </ScrollView>
    );
}
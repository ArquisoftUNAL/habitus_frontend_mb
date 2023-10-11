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

interface CreateHabitProps {
    navigation: any;
};

export const CreateHabitView: React.FC<CreateHabitProps> = ({ navigation }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [goal, setGoal] = React.useState<number>(0);
    const [isYn, setIsYn] = React.useState<boolean>(false);
    const [units, setUnits] = React.useState<string>('');
    const [frequency, setFrequency] = React.useState<number>(0);
    const [category, setCategory] = React.useState<string>('');
    const [color, setColor] = React.useState<string>('#000000');
    const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

    const [performRegister, { loading, error, data }] = useMutation(graphql.REGISTER, {
        variables: {
            name
        }
    });

    if (error) { console.log(error) }

    if (loading) {
        return <LoadingView />
    }

    return (
        <ScrollView>

            <View style={styles.container}>

                <PageTitle title="Create an habit, a section of your life" />

                {
                    error && (
                        <GraphQLError error={error} />
                    )
                }

                <Text>Type selection here</Text>
                <Text>Favorite mark here</Text>

                <Spacing size={10} />
                <Label title="A cool name for your habit" />
                <TextFieldInput title="Name" onChange={
                    (value: string) => setName(value)
                } value={name} />

                <Spacing size={10} />
                <Label title="Provide a brief description of your habit" />
                <TextFieldInput title="Description" onChange={
                    (value: string) => setDescription(value)
                } value={description} />

                <Separator />

                <Label title="Choose a reference period for this habit, i.e. play football checking statistics per week" />
                <TextFieldInput title="Frequency type" onChange={
                    (value: string) => setFrequency(100)
                } />

                <Spacing size={20} />
                <Label title="Now please define a goal to accomplish per period" />
                <TextFieldInput title="Goal" onChange={
                    (value: string) => setGoal(100)
                } />

                <Separator />

                <Label title="Reference now a category from the ones below!" />
                <TextFieldInput title="Category" onChange={
                    (value: string) => setCategory(value)
                } />

                <Separator />

                <Label title="Choose a color for your habit" />
                <TextFieldInput title="Color" onChange={
                    (value: string) => setColor(value)
                } />

                <Spacing size={10} />
                <Separator />
                <CustomButton title="Save" type="primary" action={() => {
                    performRegister()
                }} />

                <Spacing size={20} />
                <CustomButton title="Cancel" type="secondary" action={() => {
                    navigation.navigate('Habits');
                }} />
            </View>
        </ScrollView>
    );
}
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import ColorPicker, { HueCircular, Panel1, PreviewText, Swatches } from 'reanimated-color-picker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import graphql from '../graphql';
import { PageTitle, Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/habits.view.styles';
import { TextFieldInput, BinaryConstantSelectInput, ComboBoxInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { Separator } from '../components/Separator';
import { CustomButton } from '../components/Button';
import { LoadingView } from './LoadingView';
import { GraphQLError } from '../components/GraphQLError';

interface CreateUpdateHabitProps {
    type: 'create' | 'edit';
    data?: any;
    onClose: () => void;
};

const frequences = [
    {
        label: 'Daily',
        value: "daily"
    },
    {
        label: 'Two days',
        value: "daily2"
    },
    {
        label: 'Weekly',
        value: "weekly"
    },
    {
        label: 'Two weeks',
        value: "weekly2"
    },
    {
        label: 'Monthly',
        value: "monthly"
    },
    {
        label: 'Yearly',
        value: "yearly"
    }
];

export const CreateUpdateHabitView: React.FC<CreateUpdateHabitProps> = ({ onClose, type, data }) => {


    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [name, setName] = React.useState<string>(type === 'create' ? '' : data.hab_name);
    const [description, setDescription] = React.useState<string>(type === 'create' ? '' : data.hab_description);
    const [goal, setGoal] = React.useState<number>(type === 'create' ? 0 : data.hab_goal);
    const [isYn, setIsYn] = React.useState<boolean>(type === 'create' ? false : data.hab_is_yn);
    const [units, setUnits] = React.useState<string>(type === 'create' ? '' : data.hab_units);
    const [frequency, setFrequency] = React.useState<any>(
        type === 'create' ? frequences[0] : frequences.find((freq) => freq.value === data.hab_frequency_type)
    );
    const [color, setColor] = React.useState<string>(type === 'create' ? '#000000' : data.hab_color);
    const [isFavorite, setIsFavorite] = React.useState<boolean>(type === 'create' ? false : data.hab_is_favorite);

    const { loading: loadingCategories, error: errorsCategories, data: dataCategories } = useQuery(graphql.GET_CATEGORIES);

    // Build choose category options
    let categories: any[] = [];

    if (dataCategories) {
        categories = dataCategories.categories.map((category: any) => {
            return {
                label: category.cat_name,
                value: category.cat_id
            }
        });
    }

    const [category, setCategory] = React.useState<any>(
        type === 'create' ? categories.length === 0 ? {} : categories[0] : categories.find(
            (cat: any) => cat.value === data.hab_category_id
        )
    );

    const [performMutation, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = type == 'create' ?
        useMutation(graphql.ADD_HABIT) :
        useMutation(graphql.UPDATE_HABIT);

    if (dataMutation) {
        onClose();
    }

    if (errorsCategories) {
        return <GraphQLError error={errorsCategories} />
    }

    if (loadingMutation || loadingCategories) {
        return <LoadingView />
    }

    return (
        <ScrollView>

            <View style={styles.container}>

                <PageTitle title={
                    type === 'create'
                        ? "Create a new habit"
                        : "Edit your habit"
                } />

                {
                    errorMutation && (
                        <GraphQLError error={errorMutation} />
                    )
                }

                <Spacing size={10} />
                <Label
                    title="Choose your habit's type of measure"
                />

                <BinaryConstantSelectInput titles={['Measure', 'Yes/No']} onChange={(value) => {
                    setIsYn(value);
                }} value={isYn} />

                <Spacing size={10} />
                <Label title="¿Is your habit favorite?" />

                <BinaryConstantSelectInput titles={['💓', '😐']} onChange={(value) => {
                    setIsFavorite(value);
                }} value={isFavorite} />

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
                <ComboBoxInput
                    items={frequences}
                    onChange={(value) => {
                        setFrequency(value);
                    }}
                    value={frequency}
                />
                {isYn && (
                    <>
                        <Spacing size={20} />
                        <Label title="Now please define a goal to accomplish per period" />
                        <TextFieldInput title="Goal" onChange={
                            (value: string) => setGoal(parseFloat(value))
                        } value={goal.toString()} />

                        <Spacing size={20} />
                        <Label title="Define a units measure for your habit" />
                        <TextFieldInput title="Units" onChange={
                            (value: string) => setUnits(value)
                        } value={units} />
                    </>
                )}

                <Separator />

                <Label title="Reference now a category from the ones below!" />

                <ComboBoxInput
                    items={categories}
                    onChange={(value) => {
                        setCategory(value);
                    }}
                    value={category}
                />

                <Separator />

                <Label title="Choose a color for your habit" />
                <ColorPicker
                    style={styles.colorPickerContainer}
                    thumbAnimationDuration={1}
                    sliderThickness={20}
                    thumbSize={20} onChange={(color) => {
                        setColor(color.hex);
                    }} boundedThumb>

                    <HueCircular thumbShape='pill' style={styles.colorPickerCircleContainer}>
                        <Panel1 style={styles.colorPickerBoxContainer} />
                    </HueCircular>
                    <View>
                        <Text style={[
                            styles.colorText,
                            { color: color }
                        ]}>
                            {color}
                        </Text>
                    </View>
                </ColorPicker>

                <Spacing size={10} />
                <Separator />
                <CustomButton title="Save" type="primary" action={() => {
                    performMutation(
                        {
                            variables: {
                                name, description, is_favorite: isFavorite, is_yn: isYn, color,
                                goal, units, frequency_type: frequency.value, category: category.value
                            }
                        }
                    )
                }} />

                <Spacing size={20} />
                <CustomButton title="Cancel" type="secondary" action={() => {
                    onClose();
                }} />
            </View>
        </ScrollView>
    );
}
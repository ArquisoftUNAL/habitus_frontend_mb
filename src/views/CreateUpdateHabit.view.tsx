import React, { useEffect } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import ColorPicker, { HueCircular, Panel1, PreviewText, Swatches } from 'reanimated-color-picker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';

import graphql from '../graphql';
import { PageTitle, Label } from '../components/texts';
import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/habits.view.styles';
import { TextFieldInput, BinaryConstantSelectInput, ComboBoxInput } from '../components/inputs';
import { Spacing } from '../components/Spacing';
import { Separator } from '../components/Separator';
import { CustomButton } from '../components/Button';
import { LoadingView } from './LoadingView';
import { MedicalCentersView } from './MedicalCenters.view';
import { GraphQLError } from '../components/GraphQLError';
import { ValidationError } from '../components/ValidationError';

import { habitSchema } from '../validators/habits.validators';
import { validate } from '../validators/validate';

interface CreateUpdateHabitProps {
    type: 'create' | 'edit';
    data?: any;
    onClose: () => void;
    onOperationCompleted: () => void;
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

export const CreateUpdateHabitView: React.FC<CreateUpdateHabitProps> = ({ onClose, onOperationCompleted, type, data }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const toast = useToast();

    const [medicalCentersModal, setMedicalCentersModal] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>(type === 'create' ? '' : data.hab_name);
    const [description, setDescription] = React.useState<string>(type === 'create' ? '' : data.hab_description);
    const [goal, setGoal] = React.useState<number>(type === 'create' ? 0 : data.hab_goal);
    const [isYn, setIsYn] = React.useState<boolean>(type === 'create' ? false : data.hab_is_yn);
    const [units, setUnits] = React.useState<string>(type === 'create' ? 'ocurrences' : data.hab_units);
    const [location, setLocation] = React.useState<string | null>(type === 'create' ? '' : data.hab_location);

    const [frequency, setFrequency] = React.useState<any>(
        type === 'create' ? frequences[0] : frequences.find(
            (freq) => freq.value === data.hab_freq_type
        ) ?? frequences[0]
    );
    const [category, setCategory] = React.useState<any>(null);

    let given_color = "000000";

    if (type === 'edit') {
        const regex = /([0-9A-F]{6})/i;

        const matches = regex.exec(data.hab_color);

        given_color = theme.colors.primary.slice(1);

        if (matches) {
            given_color = matches[0];
        }
    }

    const [color, setColor] = React.useState<string>(given_color);
    const [isFavorite, setIsFavorite] = React.useState<boolean>(type === 'create' ? false : data.hab_is_favorite);

    // Special case, since this is a modal, toast errors are not visible here
    const [errors, setErrors] = React.useState<string>('');

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

    useEffect(() => {
        // If updating, preselect the category
        if (!category && type === 'edit') {
            const category = categories.find((cat: any) => cat.value === data.cat_id);

            if (category) {
                setCategory(category);
            }
        }
    }, [dataCategories]);

    const [performCreateMutation, {
        loading: loadingCreateMutation, error: errorCreateMutation, data: dataCreateMutation
    }] = useMutation(graphql.ADD_HABIT);
    const [performUpdateMutation, {
        loading: loadingUpdateMutation, error: errorUpdateMutation, data: dataUpdateMutation
    }] = useMutation(graphql.UPDATE_HABIT);

    if (errorsCategories) {
        return <GraphQLError error={errorsCategories} />
    }

    if (loadingCreateMutation || loadingCategories || loadingUpdateMutation) {
        return <LoadingView />
    }

    if (errorCreateMutation)
        console.log(JSON.stringify(errorCreateMutation));

    if (errorUpdateMutation)
        console.log(JSON.stringify(errorUpdateMutation));

    return (
        <ScrollView>

            <Modal
                animationType="fade"
                presentationStyle='formSheet'
                visible={medicalCentersModal}
                onRequestClose={() => {
                    setMedicalCentersModal(false);
                }}
            >
                <MedicalCentersView
                    onLocationSelection={
                        (location: string) => {
                            setLocation(location);
                            setMedicalCentersModal(false);
                        }
                    }

                    onClose={
                        () => {
                            setMedicalCentersModal(false);
                        }
                    }
                />
            </Modal>

            <View style={styles.container}>

                <PageTitle title={
                    type === 'create'
                        ? "Create a new habit"
                        : "Edit your habit"
                } />

                {
                    errorCreateMutation && (
                        <GraphQLError error={errorCreateMutation} />
                    )
                }

                {
                    errorUpdateMutation && (
                        <GraphQLError error={errorUpdateMutation} />
                    )
                }

                <Spacing size={10} />
                <Label
                    title="Choose your habit's type of measure"
                />

                <BinaryConstantSelectInput titles={['Yes/No', 'Measure']} onChange={(value) => {
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
                {!isYn && (
                    <>
                        <Spacing size={20} />
                        <Label title="Now please define a goal to accomplish per period" />
                        <TextFieldInput title="Goal" onChange={
                            (value: string) => setGoal(parseFloat(value) || 0)
                        } value={goal.toString()} enabled={type !== 'edit'} />
                    </>
                )}

                <Spacing size={20} />
                <Label title="Define a units measure for your habit" />
                <TextFieldInput title="Units" onChange={
                    (value: string) => setUnits(value)
                } value={units} />

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
                        setColor(color.hex.slice(1));
                    }} boundedThumb
                    value={"#" + color}
                >

                    <HueCircular thumbShape='pill' style={styles.colorPickerCircleContainer}>
                        <Panel1 style={styles.colorPickerBoxContainer} />
                    </HueCircular>
                    <View>
                        <Text style={[
                            styles.colorText,
                            { color: "#" + color }
                        ]}>
                            {"#" + color}
                        </Text>
                    </View>
                </ColorPicker>

                <Spacing size={20} />
                <Label title="(Optional) Define a location reminder where you want to perform this habit" />
                <TextFieldInput title="Location" onChange={
                    (value: string) => setLocation(value)
                } value={location || ''} />

                <Spacing size={10} />
                <CustomButton
                    title="(NEW) Choose a medical institution as location"
                    type="secondary"
                    action={() => {
                        setMedicalCentersModal(true);
                    }}
                    fontSize={theme.fontSizes.small}
                />

                <Spacing size={10} />
                <Separator />
                <Spacing size={10} />
                {
                    errors.length > 0 && (
                        <ValidationError error={errors} />
                    )
                }
                <Spacing size={10} />
                <CustomButton title="Save" type="primary" action={() => {
                    // Validate data
                    const errors = validate(
                        habitSchema,
                        {
                            name, description, isFavorite, isYn, color,
                            goal, units, frequency: frequency.value, category: category.value
                        });

                    setErrors(errors ?? '');

                    if (errors) {
                        return;
                    }

                    const mutation_data = {
                        variables: {
                            name, description, is_favorite: isFavorite, is_yn: isYn, color: color,
                            goal, units, frequency_type: frequency.value, category: category.value,
                            location
                        },
                        onCompleted: () => {
                            toast.show(
                                type === 'create'
                                    ? "Habit created successfully!"
                                    : "Habit updated successfully!",
                                {
                                    type: "success"
                                }
                            );
                            onOperationCompleted();
                        },
                        onError: (error: any) => {
                            toast.show(
                                type === 'create'
                                    ? "Error creating habit!"
                                    : "Error updating habit!",
                                {
                                    type: "danger"
                                }
                            );
                            console.log(error);
                        }
                    };

                    type === 'create' ? performCreateMutation(
                        mutation_data
                    ) : performUpdateMutation({
                        ...mutation_data,
                        variables: {
                            ...mutation_data.variables,
                            id: data.hab_id
                        }
                    });
                }
                } />

                <Spacing size={10} />

                <CustomButton title="Cancel" type="secondary" action={() => {
                    onClose();
                }} />
            </View>
        </ScrollView>
    );
}
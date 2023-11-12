import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';

import { createStyles as notificationsStylesBuilder } from './../styles/notifications.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { createStyles as medicalCentersStylesBuilder } from '../styles/medicalcenters.view.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { GraphQLError } from '../components/GraphQLError';
import { CustomButton } from '../components/Button';
import { Spacing } from '../components/Spacing';
import { Separator } from '../components/Separator';

interface MedicalCentersViewProps {
    onLocationSelection: (location: string) => void;
    onClose: () => void;
}

export const MedicalCentersView: React.FC<MedicalCentersViewProps> = ({ onLocationSelection, onClose }) => {

    const { theme } = useTheme();
    const styles = {
        ...notificationsStylesBuilder(theme),
        ...textStylesBuilder(theme),
        ...medicalCentersStylesBuilder(theme),
    }
    const [chosen, setChosen] = React.useState<any>({});

    // Get habits every time the component is rendered
    const { data, error, loading } = useQuery(graphql.MEDICAl_CENTERS)

    if (error) {
        return <GraphQLError error={error} />
    }

    if (loading) return (
        <LoadingView />
    );

    const medicalCenters = data.getMedicalCenters.centers || [];

    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <Text style={styles.largeText}>
                    Choose a Medical Center
                    <Spacing size={10} />
                </Text>
                <Spacing size={30} />
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={{
                        maxHeight: 300,
                        width: '100%',
                    }}
                    nestedScrollEnabled={true}
                >
                    {medicalCenters.length > 0 ? (
                        <View>
                            {
                                medicalCenters.map((center: any, index: number) => {
                                    return (
                                        <Pressable
                                            style={
                                                center.id === chosen.id ? styles.centerContainerSelected : styles.centerContainer
                                            }
                                            key={index}
                                            onPress={() => setChosen(center)}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.smallText,
                                                    color: center.id === chosen.id ? theme.colors.background : theme.colors.primary
                                                }}
                                            >
                                                {center.name}
                                            </Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    )
                        :
                        <Text style={styles.smallText}>
                            No medical centers found
                        </Text>
                    }
                </ScrollView>
                <Spacing size={10} />
                <Text style={styles.smallText}>
                    {chosen.location ? "Chosen location: " + chosen.location : "No location chosen yet"}
                </Text>
                <Separator />
                <Spacing size={10} />
                <CustomButton
                    title="Select location"
                    type="primary"
                    action={
                        () => {
                            onLocationSelection(chosen.location)
                        }
                    }
                />
                <Spacing size={10} />
                <CustomButton
                    title="Cancel"
                    type="secondary"
                    action={
                        () => onClose()
                    }
                />
            </View >
        </ScrollView >
    );
};
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';

import { createStyles as notificationsStylesBuilder } from './../styles/notifications.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { createStyles as containerStylesBuilder } from '../styles/container.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { GraphQLError } from '../components/GraphQLError';

export const NotificationsView: React.FC = () => {

    const { theme } = useTheme();
    const styles = {
        ...notificationsStylesBuilder(theme),
        ...textStylesBuilder(theme),
        ...containerStylesBuilder(theme),
    }

    // Get habits every time the component is rendered
    const { data, error, loading } = useQuery(graphql.USER_NOTIFICATIONS)

    if (error) return (
        <GraphQLError error={error} />
    );

    if (loading) return (
        <LoadingView />
    );

    return (
        <View style={styles.fullPage}>
            <Text style={styles.largeText}>
                Notifications
            </Text>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
            >
                {data.getNotificationsUser.map((notification: any, index: any) => {
                    const date = new Date(notification.noti_init_date);
                    return (
                        <View key={"t_" + index} style={styles.notificationContainer}>
                            <Text style={[styles.mediumText, styles.textCustomVerticalSpace]}>
                                {notification.noti_title}
                            </Text>
                            <View style={styles.rowContainer}>
                                <Text style={[styles.smallText, styles.textCustomVerticalSpace]}>
                                    {notification.noti_body}
                                </Text>
                                {notification.noti_should_email && (
                                    <Text style={styles.smallText}>
                                        {"\t✉️"}
                                    </Text>
                                )}
                            </View>
                            <Text style={[styles.smallText, styles.textCustomVerticalSpace]}>
                                {"⌚ Sent at: " + date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View >
    );
};
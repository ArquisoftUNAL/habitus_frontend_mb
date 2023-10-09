import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';

import { createStyles as notificationsStylesBuilder } from './../styles/notifications.view.styles';
import { createStyles as textStylesBuilder } from '../styles/texts.styles';
import { LoadingView } from './LoadingView';
import graphql from './../graphql';
import { useTheme } from '../themes/Theme.context';
import { ScrollView } from 'react-native-gesture-handler';
import { Spacing } from '../components/Spacing';


interface CalendarDay {
    date: string,
    data: string,
    relative_frequency: number
}

export const NotificationsView = React.memo(() => {

    const { theme } = useTheme();
    const styles = {
        ...notificationsStylesBuilder(theme),
        ...textStylesBuilder(theme),
    }

    // Get habits every time the component is rendered
    const { data, error, loading } = useQuery(graphql.USER_NOTIFICATIONS)

    if (error) return (<Text>
        {error.message}
        {error.graphQLErrors.map(({ message }, i) => (
            message + "\n"
        ))}
        Error! {error.clientErrors.join(' ')}
    </Text>);

    if (loading) return (
        <LoadingView />
    );

    return (
        <View>
            <Text style={styles.mediumText}>
                Notifications
            </Text>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
            >
                {data.getNotifications.map((notification: any, index: any) => {
                    const date = new Date(notification.noti_init_date);
                    return (
                        <View key={"t_" + index} style={styles.notificationContainer}>
                            <Text key={"ti_" + index} style={styles.mediumText}>
                                {notification.noti_title}
                            </Text>
                            <View key={"r1_" + index} style={styles.rowContainer}>
                                <Text key={"bo_" + index} style={styles.smallText}>
                                    {notification.noti_body} {"\n"}
                                </Text>
                                {notification.noti_should_email && (
                                    <Text key={"se_" + index} style={styles.smallText}>
                                        ✉️
                                    </Text>
                                )}
                            </View>
                            <Text key={"sa_" + index} style={styles.smallText}>
                                {"⌚ Sent at: " + date.toISOString()}
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View >
    );
});
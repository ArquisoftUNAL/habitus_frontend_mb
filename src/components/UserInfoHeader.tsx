import React from 'react';
import { View, Pressable, Text } from 'react-native';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/texts.styles';

interface UserInfoProps {
    user: any;
    containerStyle?: any;
}

export const UserInfoHeader: React.FC<UserInfoProps> = ({ user, containerStyle }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Format the birthday
    const birthDay = new Date(user.birthDay).toLocaleDateString();

    return (
        <View style={containerStyle}>
            <Text style={styles.userWelcome} >
                Welcome again {user.name}
            </Text>
            <Text style={styles.userData}>
                ✉️ {user.email}
            </Text>
            <Text style={styles.userData}>
                🎂 {birthDay}
            </Text>
        </View>
    );
};
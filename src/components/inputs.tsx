import React from 'react';
import { View, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-element-dropdown';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/inputs.styles';
import { TextInput } from 'react-native-gesture-handler';

interface TextInputProps {
    title: string;
    masked?: boolean;
    value?: string;
    enabled?: boolean;
    onChange?: (value: string) => void;
}

export const TextFieldInput: React.FC<TextInputProps> = ({ title, masked, enabled, onChange, value }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View>
            <TextInput
                style={styles.largeTextInput}
                placeholder={title}
                placeholderTextColor={theme.colors.primary}
                secureTextEntry={masked}
                onChangeText={onChange}
                value={value}
                editable={enabled}
            />
        </View>
    );
};

export const SmallTextFieldInput: React.FC<TextInputProps> = ({ title, masked, enabled, onChange, value }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [tempValue, setTempValue] = React.useState<string>(value || "");

    return (
        <View style={styles.smallTextInputContainer}>
            <TextInput
                style={styles.smallTextInput}
                placeholder={title}
                placeholderTextColor={theme.colors.primary}
                secureTextEntry={masked}
                onChangeText={setTempValue}
                value={tempValue}
                editable={enabled}
            />
            {
                tempValue.length > 0 && enabled &&
                <Text
                    style={styles.smallTextConfirmButton}
                    onPress={() => {
                        onChange && onChange(tempValue);
                    }}
                >✔️
                </Text>
            }
        </View>
    );
}

interface ConstantSelectInputProps {
    value: boolean;
    titles: string[];
    onChange?: (item: any) => void;
}

export const BinaryConstantSelectInput: React.FC<ConstantSelectInputProps> = ({
    value, titles, onChange
}) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.selectionContainer}>
            <Pressable
                style={styles.itemContainer}
                onPress={() => {
                    onChange && onChange(!value);
                }}
            >
                <Text style={value ? styles.selectedLeftItemText : styles.unselectedLeftItemText}>
                    {titles[0]}
                </Text>
            </Pressable>
            <Pressable
                style={styles.itemContainer}
                onPress={() => {
                    onChange && onChange(!value);
                }}
            >
                <Text style={value ? styles.unselectedRightItemText : styles.selectedRightItemText}>
                    {titles[1]}
                </Text>
            </Pressable>
        </View>
    );
};

interface ComboBoxInputProps {
    items: any[];
    onChange: (item: any) => void;
    value: any;
};

export const ComboBoxInput: React.FC<ComboBoxInputProps> = ({ items, value, onChange }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.comboContainer}>
            <Dropdown
                style={styles.comboStyle}
                data={items}
                maxHeight={200}
                labelField={"label"}
                valueField={"value"}
                onChange={item => {
                    onChange(item)
                }}
                itemTextStyle={styles.comboText}
                itemContainerStyle={styles.comboItem}

                value={value}
                selectedTextStyle={styles.comboText}
                placeholderStyle={styles.comboText}
                placeholder={"⬇️ Please select"}
            />
        </View>
    );
};

interface CheckBoxInputProps {
    value: boolean;
    enabled?: boolean;
    onChange: (value: boolean) => void;
}

export const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ value, enabled, onChange }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.checkBoxContainer}>
            <Pressable
                style={styles.checkBox}
                onPress={() => {
                    onChange(!value);
                }}
                disabled={!enabled}
            >
                {value && <Text style={styles.checkBoxChecked}></Text>}
            </Pressable>
        </View>
    );
};
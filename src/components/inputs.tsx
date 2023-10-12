import React from 'react';
import { View, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';

import { useTheme } from '../themes/Theme.context';
import { createStyles } from '../styles/inputs.styles';
import { TextInput } from 'react-native-gesture-handler';

interface TextInputProps {
    title: string;
    masked?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export const TextFieldInput: React.FC<TextInputProps> = ({ title, masked, onChange, value }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View>
            <TextInput
                style={styles.largeTextInput}
                placeholder={title}
                secureTextEntry={masked}
                onChangeText={onChange}
                value={value}
            />
        </View>
    );
};

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
    onChange?: (item: any) => void;
};

export const ComboBoxInput: React.FC<ComboBoxInputProps> = ({ items, onChange }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [open, setOpen] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState<any>(items[0]);

    return (
        <View style={styles.comboContainer}>
            <DropDownPicker
                open={open}
                value={selected}
                items={items}
                setOpen={setOpen}
                setValue={setSelected}
                onChangeValue={onChange}
                style={styles.comboStyle}
                textStyle={styles.comboText}
            />
        </View>
    );
};

export const ComboBoxInput2: React.FC<ComboBoxInputProps> = ({ items, onChange }) => {

    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.comboContainer}>
            <ModalDropdown
                options={items}
                defaultIndex={0}
                multipleSelect={false}
                saveScrollPosition={true}
                renderRow={(item: any) => {
                    console.log(item)
                    return (
                        <Text style={styles.comboText}>{item.label}</Text>
                    );
                }}
                renderButtonText={(item: any) => {
                    return "⬇️ " + item.label;
                }}
                defaultValue='⬇️ Please select'
                renderRowText={(item: any) => {
                    return item.label;
                }}
                style={styles.comboStyle}
                onSelect={(index: string, item: any) => {
                    onChange && onChange(item.value);
                }}
                textStyle={styles.comboText}
                numberOfLines={items.length}
            />
        </View>
    );
};
"use client";

import Select, { components, OptionProps } from "react-select";


const options = [
    { value: 'chocolate', label: 'Chocolate', icon: '🍫' },
    { value: 'strawberry', label: 'Strawberry', icon: '🍓' },
    { value: 'vanilla', label: 'Vanilla', icon: '🍦' }
];

const CustomOption = (props: OptionProps<{ value: string, label: string, icon: string }>) => {
  return (
        <components.Option {...props}>
            <span>{props.data.icon}</span> {props.children}
        </components.Option>
    );
};

export default function SelectComponent() {
    return (
        <>
            <Select options={options} components={{ Option: CustomOption }} instanceId="custom-select" />
        </>
    )
}
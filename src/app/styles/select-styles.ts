import { StylesConfig } from "react-select";

type OptionType = {
    label: string
    value: string
}

export const homeSelectStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
       ...provided,
        width: '100%',
        borderRadius: '0.5rem',
        borderColor: state.isFocused ? '#09090b' : '#a1a1aa',
        boxShadow: state.isFocused ? '#09090b' : provided.boxShadow,
        '&:hover': {
            borderColor: '#09090b'
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#52525b' : '#27272a',
        fontSize: '0.875rem',
        overflow: 'hidden',
        backgroundColor: state.isDisabled ? 'white': undefined,
        ":hover": {background: '#d4d4d8'}
    }),
    menuList: (provided) => ({
        ...provided,
        borderRadius: '0.5rem',
        maxHeight: 200,
        overflowY: 'auto',
    })
}

export const selectStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
       ...provided,
        fontSize: '0.875rem',
        width: '100%',
        borderRadius: '0.5rem',
        borderColor: state.isFocused ? '#09090b' : '#a1a1aa',
        boxShadow: state.isFocused ? '#09090b' : provided.boxShadow,
        '&:hover': {
            borderColor: '#09090b'
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#52525b' : '#27272a',
        fontSize: '0.875rem',
        overflow: 'hidden',
        backgroundColor: state.isDisabled ? 'white': undefined,
        ":hover": {background: '#d4d4d8'}
    }),
    menuList: (provided) => ({
        ...provided,
        borderRadius: '0.5rem',
        maxHeight: 200,
        overflowY: 'auto',
    })
}
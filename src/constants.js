
const NAME_PREFIX = '__name__';

const TEMPLATE_NOT_FOUND = 'Template not found!';
const TEMPLATE_IS_REQUIRED = 'Template is required!';
const NAME_IS_REQUIRED = 'Name is required!';

const COMPONENT_EXISTS = name => `${name} exists!`;
const COMPONENT_NOT_FOUND = name => `${name} not found`;
const COMPONENT_PATH_TOO_LARGE = 'Component path too large!';

const PACKAGE_NOT_FOUND = package => `${package} not found! Run: "expo install ${package}"`;

const AXIOS_MODULE = 'axios';

const REACT_NAVIGATION_NATIVE = '@react-navigation/native';
const REACT_NAVIGATION_STACK = `@react-navigation/stack`;
const REACT_NAVIGATION_TABS = '@react-navigation/material-bottom-tabs';
const REACT_NATIVE_PAPER = 'react-native-paper';
const REACT_NATIVE_VECTOR_ICONS = 'react-native-vector-icons';

module.exports = {
    NAME_PREFIX,
    TEMPLATE_NOT_FOUND,
    TEMPLATE_IS_REQUIRED,
    NAME_IS_REQUIRED,
    COMPONENT_EXISTS,
    COMPONENT_NOT_FOUND,
    COMPONENT_PATH_TOO_LARGE,
    PACKAGE_NOT_FOUND,
    AXIOS_MODULE,
    REACT_NAVIGATION_NATIVE,
    REACT_NAVIGATION_STACK,
    REACT_NAVIGATION_TABS,
    REACT_NATIVE_PAPER,
    REACT_NATIVE_VECTOR_ICONS
};

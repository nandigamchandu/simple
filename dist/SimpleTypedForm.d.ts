import { InputFieldProps } from 'devfractal-forms';
import React from 'react';
import * as yup from 'yup';
import { Simple, SimpleCheckboxProps, SimpleFormProps, SimpleRadioGroupProps, SimpleSelectProps, SimpleTextAreaProps } from './SimpleForm';
interface Named<Values extends {}, Value> {
    readonly name: keyof Values & string;
    readonly value?: Value;
}
interface SimpleInputProps<Values extends {}, Value extends string | number | readonly string[]> extends Omit<InputFieldProps, 'name' | 'value'>, Named<Values, Value> {
    readonly schema: yup.Schema<Value>;
    readonly label?: string;
    readonly validations?: ReadonlyArray<(schema: yup.Schema<Value>) => yup.Schema<Value>>;
}
interface GenericInputProps<Values extends {}, Value extends string | number | readonly string[]> extends Omit<SimpleInputProps<Values, Value>, 'type' | 'schema'> {
}
export interface TypedFormChildren<Values extends {}> {
    readonly Text: React.FC<GenericInputProps<Values, string>>;
    readonly Number: React.FC<GenericInputProps<Values, number>>;
    readonly Password: React.FC<GenericInputProps<Values, string>>;
    readonly Email: React.FC<GenericInputProps<Values, string>>;
    readonly Telephone: React.FC<GenericInputProps<Values, number>>;
    readonly Url: React.FC<GenericInputProps<Values, string>>;
    readonly Checkbox: React.FC<SimpleCheckboxProps<Values>>;
    readonly RadioGroup: React.FC<SimpleRadioGroupProps<Values>>;
    readonly TextArea: React.FC<SimpleTextAreaProps<Values>>;
    readonly Select: React.FC<SimpleSelectProps<Values>>;
    readonly FormButtons: typeof Simple.FormButtons;
    nested<Name extends keyof Values>(name: Name): React.FC<Omit<NestedProps<Values, Name>, 'name'>>;
}
interface Children<Values extends {}> {
    children(Simple: TypedFormChildren<Values>): React.ReactNode;
}
export interface TypedFormProps<Values extends {}> extends SimpleFormProps<Values>, Children<Values> {
}
export declare function TypedForm<Values extends {}>(props: TypedFormProps<Values>): JSX.Element;
interface NestedProps<Values, Name extends keyof Values> extends Children<Values[Name]> {
    readonly name: Name;
}
export declare function Nested<Values, Name extends keyof Values>({ name, children, }: NestedProps<Values, Name>): JSX.Element;
export {};
//# sourceMappingURL=SimpleTypedForm.d.ts.map
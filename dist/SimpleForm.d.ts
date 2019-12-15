import { CheckboxFieldProps, DateFieldProps, InputFieldProps, RadioFieldProps, SelectFieldProps, TextAreaFieldProps } from 'devfractal-forms';
import { ButtonsGroupProps, FieldPropsBase } from 'devfractal-ui-core';
import { FormikActions } from 'formik';
import React from 'react';
import { DateSchema, NumberSchema, ObjectSchema, Schema, StringSchema } from 'yup';
declare type Replace<T, K extends string & keyof T, R extends string> = Omit<T, K> & {
    readonly [P in R]?: T[K];
};
declare type FieldProps = Replace<FieldPropsBase, 'size', 'fieldSize'>;
interface Named<Values extends {}> {
    readonly name: Extract<keyof Values, string>;
}
interface SimpleInputProps<Values extends {}, S extends Schema<any>> extends Omit<InputFieldProps, 'name' | 'size'>, Named<Values>, FieldProps {
    readonly schema: S;
    readonly label?: string;
    readonly validations?: ReadonlyArray<(schema: S) => S>;
}
interface GenericInputProps<Values extends {}, S extends Schema<any>> extends Omit<SimpleInputProps<Values, S>, 'type' | 'schema'> {
}
interface SimpleDateProps<Values extends {}> extends Omit<DateFieldProps, 'name' | 'size'>, Named<Values>, FieldProps {
    readonly validations?: ReadonlyArray<(schema: DateSchema) => DateSchema>;
    readonly label?: string;
}
export interface SimpleCheckboxProps<Values extends {}> extends Omit<CheckboxFieldProps, 'name' | 'size'>, Named<Values>, FieldProps {
    readonly noLabel?: boolean;
}
export interface SimpleRadioGroupProps<Values extends {}> extends Omit<RadioFieldProps, 'name' | 'size'>, Named<Values>, FieldProps {
    readonly label?: string;
}
export interface SimpleSelectProps<Values extends {}> extends Omit<SelectFieldProps, 'name' | 'size'>, Named<Values>, FieldProps {
    readonly label?: string;
}
export interface SimpleTextAreaProps<Values extends {}> extends Omit<TextAreaFieldProps, 'name' | 'size'>, Named<Values>, FieldProps {
    readonly label?: string;
}
export interface SimpleFormButtonsProps extends ButtonsGroupProps {
    readonly submit?: boolean | string;
    readonly reset?: boolean | string;
}
export interface SimpleFormProps<Values> {
    readonly initialValues: Values;
    readonly validationSchema?: ObjectSchema<Partial<Values>>;
    onSubmit?(values: Values, actions: FormikActions<Values>): void;
}
export interface TypedForm<Values extends {}> {
    readonly Text: React.FC<GenericInputProps<Values, StringSchema>>;
    readonly Date: React.FC<SimpleDateProps<Values>>;
    readonly Number: React.FC<GenericInputProps<Values, NumberSchema>>;
    readonly Password: React.FC<GenericInputProps<Values, StringSchema>>;
    readonly Email: React.FC<GenericInputProps<Values, StringSchema>>;
    readonly Checkbox: React.FC<SimpleCheckboxProps<Values>>;
    readonly Telephone: React.FC<GenericInputProps<Values, NumberSchema>>;
    readonly Url: React.FC<GenericInputProps<Values, StringSchema>>;
    readonly RadioGroup: React.FC<SimpleRadioGroupProps<Values>>;
    readonly TextArea: React.FC<SimpleTextAreaProps<Values>>;
    readonly Select: React.FC<SimpleSelectProps<Values>>;
    readonly Form: React.FC<SimpleFormProps<Values>>;
}
export declare function typedForm<Values extends {}>(): TypedForm<Values>;
export declare const Simple: {
    FormButtons: React.FunctionComponent<SimpleFormButtonsProps>;
    Debug: React.FunctionComponent<{}>;
    Text: React.FunctionComponent<GenericInputProps<{
        readonly [s: string]: any;
    }, StringSchema<string>>>;
    Date: React.FunctionComponent<SimpleDateProps<{
        readonly [s: string]: any;
    }>>;
    Number: React.FunctionComponent<GenericInputProps<{
        readonly [s: string]: any;
    }, NumberSchema<number>>>;
    Password: React.FunctionComponent<GenericInputProps<{
        readonly [s: string]: any;
    }, StringSchema<string>>>;
    Email: React.FunctionComponent<GenericInputProps<{
        readonly [s: string]: any;
    }, StringSchema<string>>>;
    Checkbox: React.FunctionComponent<SimpleCheckboxProps<{
        readonly [s: string]: any;
    }>>;
    Telephone: React.FunctionComponent<GenericInputProps<{
        readonly [s: string]: any;
    }, NumberSchema<number>>>;
    Url: React.FunctionComponent<GenericInputProps<{
        readonly [s: string]: any;
    }, StringSchema<string>>>;
    RadioGroup: React.FunctionComponent<SimpleRadioGroupProps<{
        readonly [s: string]: any;
    }>>;
    TextArea: React.FunctionComponent<SimpleTextAreaProps<{
        readonly [s: string]: any;
    }>>;
    Select: React.FunctionComponent<SimpleSelectProps<{
        readonly [s: string]: any;
    }>>;
    Form: React.FunctionComponent<SimpleFormProps<{
        readonly [s: string]: any;
    }>>;
};
export {};
//# sourceMappingURL=SimpleForm.d.ts.map
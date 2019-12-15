import React from 'react';
export interface SimpleArrayFieldComponentProps<T> {
    readonly name: string;
    readonly data: T;
    readonly index: number;
}
export interface SimpleArrayFieldProps<T> {
    readonly name: string;
    readonly data: ReadonlyArray<T>;
    readonly noRemove?: boolean;
    readonly render: React.FC<SimpleArrayFieldComponentProps<T>>;
    onAdd?(): T;
}
export declare function SimpleArrayField<T>({ name, data, noRemove, onAdd, render: Component, }: SimpleArrayFieldProps<T>): JSX.Element;
//# sourceMappingURL=SimpleArrayField.d.ts.map
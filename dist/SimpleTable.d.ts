import { TableProps } from 'devfractal-ui-core';
import React from 'react';
export interface SimpleTableHeaderProps {
    readonly headers: readonly string[];
}
export declare const SimpleTableHeader: React.FC<SimpleTableHeaderProps>;
export interface RowClickEvent<T extends Record<string, any>> {
    readonly value: T;
}
export interface RowsProps<T extends Record<string, any>, EK extends string, Select extends keyof T> extends Omit<TableViewProps<T, EK, Select>, 'override'> {
    readonly select: ReadonlyArray<Select>;
    render?(keyOrHeader: string, value: T): React.ReactNode;
}
export interface TableViewProps<T extends Record<string, any>, EK extends string, Select extends keyof T = keyof T> extends SimpleTableProps<T, EK, Select> {
    readonly data: ReadonlyArray<T>;
}
export interface SimpleTableProps<T extends Record<string, any>, EK extends string, Select extends keyof T = keyof T> extends TableProps {
    readonly select?: ReadonlyArray<Select>;
    readonly override?: Partial<Record<Select, string>>;
    readonly extra?: readonly EK[];
    readonly data: ReadonlyArray<T> | (() => Promise<ReadonlyArray<T>>);
    onRowClicked?(value: RowClickEvent<T>): void;
    children?(key: keyof T | EK, value: T): React.ReactNode;
}
export declare function SimpleTable<T extends Record<string, any>, EK extends string, Select extends keyof T = keyof T>(args: SimpleTableProps<T, EK, Select>): JSX.Element;
//# sourceMappingURL=SimpleTable.d.ts.map
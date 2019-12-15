import { RoutedTabsProps, TabsProps } from 'devfractal-ui';
import React from 'react';
export interface SimpleTabsProps extends Omit<TabsProps, 'selectedTab'> {
    readonly name?: string;
    readonly values?: readonly string[];
}
export declare const SimpleTabs: React.FC<SimpleTabsProps>;
export interface SimpleRoutedTabsProps extends Omit<RoutedTabsProps, 'selectedTab'> {
    readonly name?: string;
    readonly values?: readonly string[];
}
export declare const SimpleRoutedTabs: React.FC<SimpleRoutedTabsProps>;
//# sourceMappingURL=SimpleTabs.d.ts.map
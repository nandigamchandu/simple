import React from 'react';
interface PagerViewProps {
    readonly currentPage: number;
    readonly maximumPages: number;
    onPageChange(nextPage: number): void;
}
export declare const SimplePagerView: React.FC<PagerViewProps>;
export {};
//# sourceMappingURL=SimplePager.d.ts.map
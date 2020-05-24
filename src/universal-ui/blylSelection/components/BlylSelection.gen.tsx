/* TypeScript file generated from BlylSelection.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const BlylSelectionBS = require('./BlylSelection.bs');

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly isActive: boolean; 
  readonly name: string; 
  readonly onSelect: (_1:string) => void
};

export const make: React.ComponentType<{
  readonly isActive: boolean; 
  readonly name: string; 
  readonly onSelect: (_1:string) => void
}> = BlylSelectionBS.make;

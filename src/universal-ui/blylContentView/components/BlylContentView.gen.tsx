/* TypeScript file generated from BlylContentView.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const BlylContentViewBS = require('./BlylContentView.bs');

import {Style_t as ReactNative_Style_t} from '../../../../reason-shims/ReactNative.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly children?: React.ReactNode; 
  readonly containerStyle?: ReactNative_Style_t; 
  readonly contentContainerStyle?: ReactNative_Style_t
};

export const make: React.ComponentType<{
  readonly children?: React.ReactNode; 
  readonly containerStyle?: ReactNative_Style_t; 
  readonly contentContainerStyle?: ReactNative_Style_t
}> = BlylContentViewBS.make;

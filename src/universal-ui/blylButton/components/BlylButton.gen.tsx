/* TypeScript file generated from BlylButton.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toRE484305802: { [key: string]: any } = {"primary": 58474434, "secondary": -499495052};

// tslint:disable-next-line:no-var-requires
const BlylButtonBS = require('./BlylButton.bs');

import {Style_t as ReactNative_Style_t} from '../../../../reason-shims/ReactNative.shim';

// tslint:disable-next-line:interface-over-type-literal
export type buttonType = "primary" | "secondary";

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly buttonStyle?: ReactNative_Style_t; 
  readonly kind?: buttonType; 
  readonly onPress: () => void; 
  readonly title: string; 
  readonly titleStyle?: ReactNative_Style_t
};

export const make: React.ComponentType<{
  readonly buttonStyle?: ReactNative_Style_t; 
  readonly kind?: buttonType; 
  readonly onPress: () => void; 
  readonly title: string; 
  readonly titleStyle?: ReactNative_Style_t
}> = function BlylButton(Arg1: any) {
  const $props = {buttonStyle:Arg1.buttonStyle, kind:(Arg1.kind == null ? undefined : $$toRE484305802[Arg1.kind]), onPress:Arg1.onPress, title:Arg1.title, titleStyle:Arg1.titleStyle};
  const result = React.createElement(BlylButtonBS.make, $props);
  return result
};

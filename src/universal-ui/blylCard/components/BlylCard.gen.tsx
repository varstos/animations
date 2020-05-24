/* TypeScript file generated from BlylCard.re by genType. */
/* eslint-disable import/first */


import * as React from 'react';

const $$toRE668676361: { [key: string]: any } = {"eight": -315719345, "five": -1011099854, "four": -1010801690, "nine": -922385102, "one": 5544550, "seven": -97442547, "six": 5742370, "ten": 5791197, "three": 261117022, "two": 5795212};

// tslint:disable-next-line:no-var-requires
const BlylCardBS = require('./BlylCard.bs');

import {Style_t as ReactNative_Style_t} from '../../../../reason-shims/ReactNative.shim';

// tslint:disable-next-line:interface-over-type-literal
export type size = { readonly height: number; readonly width: number };

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly containerSize?: size; 
  readonly containerStyle?: ReactNative_Style_t; 
  readonly kind: 
    "eight"
  | "five"
  | "four"
  | "nine"
  | "one"
  | "seven"
  | "six"
  | "ten"
  | "three"
  | "two"
};

export const make: React.ComponentType<{
  readonly containerSize?: size; 
  readonly containerStyle?: ReactNative_Style_t; 
  readonly kind: 
    "eight"
  | "five"
  | "four"
  | "nine"
  | "one"
  | "seven"
  | "six"
  | "ten"
  | "three"
  | "two"
}> = function BlylCard(Arg1: any) {
  const $props = {containerSize:Arg1.containerSize, containerStyle:Arg1.containerStyle, kind:$$toRE668676361[Arg1.kind]};
  const result = React.createElement(BlylCardBS.make, $props);
  return result
};

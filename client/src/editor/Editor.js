import React from 'react';
import { useState } from "react";
import Editor from '@react-page/editor';
import slate from '@react-page/plugins-slate';
import image from '@react-page/plugins-image';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-divider';
import background from '@react-page/plugins-background';
import { Hidden } from '@material-ui/core';
import '@react-page/editor/lib/index.css';

// const backGroundConfig = {
//   enabledModes:
//     ModeEnum.COLOR_MODE_FLAG |
//     ModeEnum.IMAGE_MODE_FLAG |
//     ModeEnum.GRADIENT_MODE_FLAG,
// }

const modifiedImage = {
  ...image,
  cellStyle: (data) => ({
    maxWidth:'100%',
  }),

}
const cellPlugins = [slate(), modifiedImage, spacer, divider, background()];


export default function SimpleExample() {
  const [value, setValue] = useState(null);

  return (
    <span>
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue}/>
    </span>
  );
}

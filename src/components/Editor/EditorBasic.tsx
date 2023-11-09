/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FontColor, FontSize } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { AutoLink, Link } from "@ckeditor/ckeditor5-link";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";

import "./scss/editor.scss";

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class EditorBasic extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    AutoLink,
    BlockQuote,
    Bold,
    Essentials,
    FontColor,
    FontSize,
    Heading,
    Highlight,
    Italic,
    Link,
    Paragraph,
    Strikethrough,
    Underline,
  ];

  public static override defaultConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "fontColor",
        "fontSize",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "link",
        "|",
        "highlight",
        "|",
        "alignment",
        "|",
        "blockQuote",
      ],
    },
    language: "vi",
  };
}

export default EditorBasic;

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
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { AutoLink, Link } from "@ckeditor/ckeditor5-link";
import { List, ListProperties } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { SelectAll } from "@ckeditor/ckeditor5-select-all";
import { Table, TableCaption } from "@ckeditor/ckeditor5-table";

import "./scss/editor.scss";

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class EditorCustom extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    AutoImage,
    AutoLink,
    BlockQuote,
    Bold,
    Essentials,
    FontColor,
    FontSize,
    Heading,
    Highlight,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    List,
    ListProperties,
    Paragraph,
    SelectAll,
    Strikethrough,
    Table,
    TableCaption,
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
        "bulletedList",
        "numberedList",
        "|",
        "alignment",
        "|",
        "imageUpload",
        "blockQuote",
        "insertTable",
      ],
    },
    language: "vi",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
  };
}

export default EditorCustom;

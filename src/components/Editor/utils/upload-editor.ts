import {
  FileLoader,
  UploadAdapter,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
import _ from "lodash";

import { uploadFile } from "@/services/upload.service";

const handleDeleteImage = (event: any): void => {
  const changes = event?.source?.differ?._cachedChangesWithGraveyard;
  const listImages = _.filter(
    changes,
    (item) =>
      (item.type === "remove" || item.type === "insert") &&
      (item.name === "imageBlock" || item.name === "imageInline"),
  );

  if (
    listImages.length === 2 &&
    (changes?.length === 2 || changes?.length === 3)
  ) {
    const listAttributes = _.map(listImages, "attributes");
    if (listAttributes) {
      const listSrc: string[] = [];
      listAttributes.forEach((attribute) => {
        const src = attribute.get("src")?.replace(/^\/api\//, "");
        if (src) listSrc.push(src);
      });

      // listSrc.forEach((src) => {
      //   deleteFile({ filePath: src });
      // });
    }
  }
};

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await uploadFile({ file });
          resolve({
            default: `/api/${response?.path}`,
          });
        } catch (error) {
          reject("Hello");
        }
      });
    },
    abort: () => {},
  };
}

function uploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return uploadAdapter(loader);
  };
}

export { handleDeleteImage, uploadAdapter, uploadPlugin };

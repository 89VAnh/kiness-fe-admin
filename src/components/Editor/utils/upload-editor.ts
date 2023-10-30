import {
  FileLoader,
  UploadAdapter,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
import _ from "lodash";

import { apiClient } from "@/lib/api";

const handleDeleteImage = (event: any): void => {
  const listImages = _.filter(
    event?.source?.differ?._cachedChangesWithGraveyard,
    { type: "remove" },
  );

  const listAttributes = _.map(listImages, "attributes");
  if (listAttributes) {
    const listSrc: string[] = [];
    listAttributes.forEach((attribute) => {
      const src = attribute.get("src")?.replace(/^\/api\//, "");
      if (src) listSrc.push(src);
    });

    listSrc.forEach((src) => {
      apiClient.post(`core/delete-file`, {
        filePath: src,
      });
    });
  }
};

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await apiClient.post(
            `core/upload`,
            { file },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          resolve({
            default: `/api/${response.data.path}`,
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

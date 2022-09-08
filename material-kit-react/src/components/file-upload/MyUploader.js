import { Button } from '@mui/material';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';

const MyUploader = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  // receives array of files that are done uploading when submit button is clicked
  // const handleSubmit = (files, allFiles) => {
  //   const fileData = [];
  //   files.map((f) => fileData.push(f.meta));
  //   console.log(fileData);
  //   console.log(allFiles);
  //   return fileData;
  //   // allFiles.forEach((f) => f.remove());
  // };

  return (
    <div>
      <Dropzone
        // getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        // onSubmit={handleSubmit}
        // maxFiles={3}
        // inputContent="Drop 3 Files"
        // inputWithFilesContent={(files) => `${3 - files.length} more`}
        // submitButtonDisabled={(files) => files.length < 3}
        accept="image/*"
        styles={{ dropzone: { minHeight: 230, maxHeight: 380 } }}
      />
    </div>
  );
};

export default MyUploader;

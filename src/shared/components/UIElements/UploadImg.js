import React, { useRef, useState, useEffect } from 'react';

import Button from '../Buttons/Button';
import './UploadImg.css';

const UploadImg = props => {
  const [file, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedImage;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedImage = event.target.files[0];
      setImage(pickedImage);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedImage, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
    <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`upload-img ${props.center && 'center'}`}>
        <div className="upload-img_prev">
        {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Pick image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>UPLOAD IMAGE</Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default UploadImg;

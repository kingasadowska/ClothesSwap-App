import React, { useRef, useState, useEffect } from 'react';

import Button from '../Buttons/Button';
import './UploadImg.css';

const UploadImg = props => {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const imagePickerRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }
    const imageReader = new FileReader();
    imageReader.onload = () => {
      setPreviewUrl(imageReader.result);
    };
    imageReader.readAsDataURL(image);
  }, [image]);

  const pickedHandler = event => {
    let pickedImage;
    let imageIsValid = isValid;
    if (event.target.images && event.target.images.length === 1) {
      pickedImage = event.target.images[0];
      setImage(pickedImage);
      setIsValid(true);
      imageIsValid = true;
    } else {
      setIsValid(false);
      imageIsValid = false;
    }
    props.onInput(props.id, pickedImage, imageIsValid);
  };

  const pickImageHandler = () => {
    imagePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={imagePickerRef}
        style={{ display: 'none' }}
        type="image"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`upload-img ${props.center && 'center'}`}>
        <div className="upload-img_prev">
        {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default UploadImg;

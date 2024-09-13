import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './ImageCropperPopup.css';
import getCroppedImg from './cropImage';

const ImageCropperPopup = ({ imageSrc, onCropComplete, onClose }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            onCropComplete(croppedImage);
            onClose(); // Close the popup after cropping
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, onCropComplete, onClose, imageSrc]);

    return (
        <div className="cropper-popup">
            <div className="cropper-popup-content">
                <div className="cropper-area">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropCompleteHandler}
                    />
                </div>
            </div>
            <div className="controls">
                <label htmlFor="zoom">Zoom:</label>
                <input
                    type="range"
                    id="zoom"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(e.target.value)}
                />
                <div className="cropper-buttons">
                    <button onClick={handleCrop}>Crop & Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropperPopup;

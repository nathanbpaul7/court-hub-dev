// AvatarUpload.tsx
import { useState, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default function AvatarUpload({
  onCrop,
  closeModal,
}: {
  onCrop: (blob: Blob | null) => void;
  closeModal: () => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  let cropper: Cropper | null = null;

  useEffect(() => {
    if (imageSrc && imageRef.current) {
      cropper = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 2,
      });
    }
    return () => {
      if (cropper) {
        cropper.destroy();
      }
    };
  }, [imageSrc]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCrop = () => {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({ width: 100, height: 100 });
      canvas.toBlob((blob) => {
        onCrop(blob);
      });
      setIsClicked(true);
      closeModal();
    }
  };

  return (
    <>
      <input type="file" ref={inputFileRef} onChange={handleFileChange} />
      {imageSrc && (
        <>
          <div className="justify-items items-center">
            <img ref={imageRef} src={imageSrc} />
          </div>
          <div className="">
            <button
              className={`= mt-2  w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                isClicked ? 'bg-green-500' : 'bg-green-300 hover:bg-green-500'
              }`}
              onClick={handleCrop}
            >
              Done
            </button>
          </div>
        </>
      )}
    </>
  );
}

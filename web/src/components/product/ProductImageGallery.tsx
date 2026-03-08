import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const FALLBACK = 'https://via.placeholder.com/600x600?text=ShopNova';

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const allImages = images.length > 0 ? images : [FALLBACK];
  const [active, setActive] = useState(0);
  const [imgSrcs, setImgSrcs] = useState(allImages);

  const handleImgError = (idx: number) => {
    setImgSrcs(prev => {
      const next = [...prev];
      next[idx] = FALLBACK;
      return next;
    });
  };

  return (
    <div className="product-gallery">
      {allImages.length > 1 && (
        <div className="product-gallery-thumbs">
          {allImages.map((_src, i) => (
            <button
              key={i}
              className={`product-gallery-thumb ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={imgSrcs[i]}
                alt={`${name} thumbnail ${i + 1}`}
                onError={() => handleImgError(i)}
              />
            </button>
          ))}
        </div>
      )}

      <div className="product-gallery-main">
        <img
          src={imgSrcs[active]}
          alt={name}
          onError={() => handleImgError(active)}
        />
      </div>
    </div>
  );
}

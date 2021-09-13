import React, { FunctionComponent, useEffect, useState } from 'react';

interface ProductThumbnailProps {
    result: any;
}

export const ProductThumbnail: FunctionComponent<ProductThumbnailProps> = (props) => {
  const [thumbnail, setThumbnail] = useState(props.result.raw.ec_thumbnails);

  useEffect(() => {
      console.log('useEffect');
      setThumbnail(props.result.raw.ec_thumbnails);
    }, [props]);

  return (
    <div>
      <img alt="" src={thumbnail as string} />
      {props.result.childResults.length > 0 && (
        <img alt="" className="product_color_picker" onMouseOver={() => setThumbnail(props.result.raw.ec_thumbnails)} src={props.result.raw.product_color_image} />
      )}
      {props.result.childResults.map((child:any) => (
         <img alt="" className="product_color_picker" onMouseOver={() => setThumbnail(child.raw.ec_thumbnails)} src={child.raw.product_color_image} />
      ))}

    </div>
    
  );
}


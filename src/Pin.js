import React from 'react';
import { Box, Image, Mask } from 'gestalt';

const MAX_IMAGE_HEIGHT = 600;

export default function Pin({ data: { description, dominant_color, id, images, title }}) {
  return (
    <Box shape="rounded" _padding={1} width="100%">
      <Mask shape="rounded" wash>
        <Box maxHeight={MAX_IMAGE_HEIGHT}>
          <Image
            alt={description}
            color={dominant_color}
            naturalHeight={Math.min(images['237x'].height, MAX_IMAGE_HEIGHT)}
            naturalWidth={images['237x'].width}
            src={images['237x'].url}
          />
        </Box>
      </Mask>
    </Box>
  );
}

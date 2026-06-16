export type MediaImageData = {
  url: string
  alt?: string
};
export type MediaVideoData = {
  url: string
  title?: string
  thumbnail?: string
  blurUpThumb?: string
};
export type MediaImage = { type: 'image' } & MediaImageData;
export type MediaVideo = { type: 'video' } & MediaVideoData;
export type MediaAsset = (MediaImage | MediaVideo);


export type MediaImageProps = MediaImage & {
  responsive?: {
    fallback: { width?: number, height?: number }
    /** Mobile first (window.width > sizes.key) */
    sizes?: Record<number, { width?: number, height?: number }>
  }
};
export type MediaVideoProps = MediaVideo & {
  autoplay?: boolean
  preload?: 'none' | 'metadata' | 'auto'
};
export type MediaAssetProps = (MediaImageProps | MediaVideoProps) & {
  autoWidth?: boolean
  autoHeight?: boolean
};

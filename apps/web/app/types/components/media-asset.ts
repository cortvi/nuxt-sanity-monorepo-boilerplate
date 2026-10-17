import type { SanityImageSource } from '@sanity/image-url';


export type MediaImageData = {
  url?: string
  /** Sanity image object, so transformations respect its crop & hotspot */
  source?: SanityImageSource
  alt?: string | null
  /** Placeholder until the image loads (DatoCMS `blurUpThumb`, Sanity `metadata.lqip`) */
  blurUpThumb?: string | null
};
export type MediaVideoData = {
  muxPlaybackId?: string
  url: string
  title?: string
  thumbnail?: string
  blurUpThumb?: string
};
export type MediaImage = { type: 'image' } & MediaImageData;
export type MediaVideo = { type: 'video' } & MediaVideoData;
export type MediaAsset = (MediaImage | MediaVideo);


export type ImageSize = { width?: number, height?: number };
export type MediaImageProps = MediaImage & {
  responsive?: {
    default: ImageSize
    /** Mobile first (window.width > sizes.key) */
    sizes?: Record<number, ImageSize>
    /** Skips auto-scaling up to the default size */
    strict?: boolean
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

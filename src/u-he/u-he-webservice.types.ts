export type SkinItem = {
  name: string;
  author: SrcItem;
  device: SrcItem;
  description: string;
  previews: Array<SrcItem>;
  downloads: Array<SrcItem>;
};

export type SrcItem = {
  url: string | undefined;
  name: string;
};

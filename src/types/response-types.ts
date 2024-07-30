export type SkinItem = {
  /**
   * The name given to the skin by the author
   */
  name: string;
  /**
   * The individual or organization that created the skin
   */
  author: SrcItem;
  /**
   * The u-he device that the skin was created for
   */
  device: SrcItem;
  /**
   * Information about the skin
   */
  description: string;
  /**
   * Links to where the skin can be viewed
   */
  previews: Array<SrcItem>;
  /**
   * Links to where the skin can be downloaded
   */
  downloads: Array<SrcItem>;
};

export type SrcItem = {
  /**
   * A name for the item this object represents
   */
  name: string;
  /**
   * The url for the source, if one could be found
   */
  url: string | undefined;
};

export class JsonResponse extends Response {
  constructor(body: any, init?: ResponseInit) {
    super(JSON.stringify(body), {
      ...init,
      headers: { ...init?.headers, "Content-Type": "application/json" },
    });
  }
}

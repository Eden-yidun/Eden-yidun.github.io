
export interface RelatedLink {
  name: string;
  url: string;
}

export interface NavItemData {
  class: string;
  name: string;
  url: string;
  about: string;
  isCommon: boolean;
  relatedLinks: RelatedLink[];
}

export interface TopicData {
  name: string;
  'head name'?: string;
  'name URL'?: string;
  'about URL title'?: string;
  'about URL'?: string;
  'about read title'?: string;
  'about read URL'?: string;
}

export type TopicKey = 'comfy' | 'voice' | 'face';

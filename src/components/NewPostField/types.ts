export type CustomElement = { 
  type: 'link' | 'paragraph' | 'code';
  href?: string;
  children: CustomText[];
}
export type CustomText = { text: string }
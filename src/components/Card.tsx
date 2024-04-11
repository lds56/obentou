// card.ts
import type { BackgroundType } from './enums.tsx';

  interface CardDimensions {
    cardWidth: string;
    cardHeight: string;
    gridColSpan?: string;
    gridRowSpan?: string;
  }
  
  export function calculateCardDimensions(shape: string): CardDimensions {
    let cardWidth = '';
    let cardHeight = '';
    let gridColSpan = '';
    let gridRowSpan = '';
  
    // large square
    if (shape === 'tofu') {
      cardWidth = 'w-92';
      cardHeight = 'h-92 aspect-square';
      gridColSpan = 'col-span-4';
      gridRowSpan = 'row-span-4';
    }
    // small square
    else if (shape === 'puff') {
      cardWidth = 'w-42';
      cardHeight = 'h-42 aspect-square';
      gridColSpan = 'col-span-2';
      gridRowSpan = 'row-span-2';
    }
    // vertical rectangle
    else if (shape === 'chikuwa') {
      cardWidth = 'w-42';
      cardHeight = 'h-92';
      gridColSpan = 'col-span-2';
      gridRowSpan = 'row-span-4';
    }
    // horizontal rectangle
    else if (shape === 'tteok') {
      cardWidth = 'w-92';
      cardHeight = 'h-42';
      gridColSpan = 'col-span-4';
      gridRowSpan = 'row-span-2';
    }
    // long rectangle
    else if (shape === 'sausage') {
      cardWidth = 'w-92';
      cardHeight = 'h-20';
      gridColSpan = 'col-span-4';
      gridRowSpan = 'row-span-1';
    }
    // default
    else {
      cardWidth = 'w-42';
      cardHeight = 'h-42';
    }
  
    return { cardWidth, cardHeight, gridColSpan, gridRowSpan };
  }

  export function extractMainDomain(url: string): string {
    try {
      // 使用正则表达式匹配网址中的主要域名部分
      const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/;
      const match = url.match(regex);
      if (match && match.length > 1) {
          return match[1] || '';
      } else {
        return ''
      }
    } catch (error) {
      return '';
    }
}
  
  export function normalizeUrl(inputUrl: string): string {
    try {
        // 尝试使用 URL 对象来解析输入的网址
        const url = new URL(inputUrl);
        return url.href;
    } catch (error) {
      // 如果解析失败，则尝试添加协议并重新解析
      try {
          const urlWithProtocol = 'https://' + inputUrl;
          const url = new URL(urlWithProtocol);
          return url.href;
      } catch (error) {
          // 如果无法解析，则返回空字符串或 null，表示无效网址
          return '';
      }
    }
  }

  export function getBackgroundStyles(background: string, bgValue: string): [string, string] {
    console.log('background:', background, ', bgvalue:', bgValue);
    let cardBackgroundClasses = '';
    let cardBackgroundInlineStyles = '';
    if (background === 'color') {
      cardBackgroundClasses = bgValue;
    } else if (background === 'gradient') {
      cardBackgroundClasses = `bg-gradient-to-r ${bgValue}`;
    } else if (background === 'trgradient') {
      cardBackgroundClasses = `bg-gradient-to-tr ${bgValue}`;
    } else if (background === 'image') {
      cardBackgroundClasses = 'bg-cover bg-center bg-no-repeat';
      cardBackgroundInlineStyles = `background-image: url('${bgValue}');`;
    }
    return [cardBackgroundClasses, cardBackgroundInlineStyles];
  }

// // 用法示例
// const inputUrl = prompt('请输入网址：'); // 提示用户输入网址
// const normalizedUrl = normalizeUrl(inputUrl); // 调用函数进行转换
// if (normalizedUrl) {
//     console.log('转换后的网址：', normalizedUrl);
// } else {
//     console.log('输入的网址无效。');
// }
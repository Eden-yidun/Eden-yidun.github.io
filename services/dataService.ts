
import { NavItemData, RelatedLink } from '../types';

const SPREADSHEET_ID = '18y05qlJ0yJCHgNUaD2r9y6bbzdfosA5oJ79V4by3ASs';
const BASE_URL = `https://opensheet.elk.sh/${SPREADSHEET_ID}`;

export const fetchData = async <T,>(sheetName: string): Promise<T[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(sheetName)}`);
    if (!response.ok) throw new Error(`Failed to fetch ${sheetName}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
};

export const parseSheet1 = (rows: any[]): NavItemData[] => {
  return rows.map(row => {
    const relatedLinks: RelatedLink[] = [];
    // Dynamically extract Name1, URL1, Name2, URL2...
    let i = 1;
    while (row[`Name${i}`] !== undefined) {
      const name = row[`Name${i}`]?.trim();
      const url = row[`URL${i}`]?.trim();
      if (name && url) {
        relatedLinks.push({ name, url });
      }
      i++;
    }
    return {
      class: row['class'] || '未分类',
      name: row['name'] || '未知名称',
      url: row['URL'] || '#',
      about: row['about'] || '',
      isCommon: row['IScommon'] === '1' || row['IScommon'] === 1,
      relatedLinks
    };
  });
};

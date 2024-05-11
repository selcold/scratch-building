'use server'

const env = process.env

export async function ServerShopGET(mode: 'all' | 'today' | 'untilToday' | 'latest', parameters?: string) {
  const response = await fetch(`${env.SHOP_API_URL}?apikey=${env.SHOP_API_KEY}&mode=${mode}&${parameters}`);
  const res_data = await response.json();

  return res_data;
}

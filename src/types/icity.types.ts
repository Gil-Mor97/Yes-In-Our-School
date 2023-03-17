export default interface ICity {
  id: number,
  name: string,
  area_id: number,
  area_name?: string,
  english_name?: string,
  office?: string,
  province_id: number,
  province_name: string,
  regional_id: number
}
import districts from "./data/quan_huyen.json";
import cities from "./data/tinh_tp.json";
import communes from "./data/xa_phuong.json";

export const getCityDropdown = () =>
  Object.keys(cities).map((id) => ({
    value: id,
    label: (cities as any)[id]?.name,
  }));

export const getDistrictDropdown = (cityId: string) =>
  Object.keys(districts)
    .filter((id) => (districts as any)[id]?.parent_code === cityId)
    .map((id) => ({
      value: id,
      label: (districts as any)[id]?.name,
    }));

export const getCommuneDropdown = (districtId: string) =>
  Object.keys(communes)
    .filter((id) => (communes as any)[id]?.parent_code === districtId)
    .map((id) => ({
      value: id,
      label: (communes as any)[id]?.name,
    }));

export const getFullAddress = (communeId: string) =>
  (communes as any)[communeId]?.path_with_type;

export const getAdress = (path_with_type: string) => {
  const communeId = Object.keys(communes).find(
    (id) => (communes as any)[id]?.path_with_type === path_with_type,
  ) as string;

  const districtId = (communes as any)[communeId]?.parent_code;

  const cityId = (districts as any)[districtId]?.parent_code;

  return { cityId, districtId, communeId };
};

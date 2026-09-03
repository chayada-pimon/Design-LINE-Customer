import rawData from "@/lib/thai-address-data.json"

export type PostalCodeMatch = {
  subdistrict: string
  district: string
  province: string
  zipcode: string
}

// [subdistrict, district, province, zipcode]
const DATA = rawData as [string, string, string, number][]

const BY_ZIPCODE = new Map<string, PostalCodeMatch[]>()
for (const [subdistrict, district, province, zipcode] of DATA) {
  const zip = String(zipcode)
  const match: PostalCodeMatch = { subdistrict, district, province, zipcode: zip }
  const existing = BY_ZIPCODE.get(zip)
  if (existing) {
    existing.push(match)
  } else {
    BY_ZIPCODE.set(zip, [match])
  }
}

export function findAddressesByPostalCode(postalCode: string): PostalCodeMatch[] {
  if (postalCode.length !== 5) return []
  return BY_ZIPCODE.get(postalCode) ?? []
}

const DISTRICTS_BY_PROVINCE = new Map<string, string[]>()
const SUBDISTRICTS_BY_DISTRICT = new Map<string, PostalCodeMatch[]>()

for (const [subdistrict, district, province, zipcode] of DATA) {
  const districts = DISTRICTS_BY_PROVINCE.get(province)
  if (districts) {
    if (!districts.includes(district)) districts.push(district)
  } else {
    DISTRICTS_BY_PROVINCE.set(province, [district])
  }

  const key = `${province}|${district}`
  const match: PostalCodeMatch = { subdistrict, district, province, zipcode: String(zipcode) }
  const subdistricts = SUBDISTRICTS_BY_DISTRICT.get(key)
  if (subdistricts) {
    subdistricts.push(match)
  } else {
    SUBDISTRICTS_BY_DISTRICT.set(key, [match])
  }
}

export function findDistrictsByProvince(province: string): string[] {
  return DISTRICTS_BY_PROVINCE.get(province) ?? []
}

export function findSubdistrictsByDistrict(province: string, district: string): PostalCodeMatch[] {
  return SUBDISTRICTS_BY_DISTRICT.get(`${province}|${district}`) ?? []
}

export function findPostalCode(province: string, district: string, subdistrict: string): string {
  const match = findSubdistrictsByDistrict(province, district).find(
    (item) => item.subdistrict === subdistrict,
  )
  return match?.zipcode ?? ""
}

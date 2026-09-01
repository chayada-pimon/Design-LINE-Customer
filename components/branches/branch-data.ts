export type Branch = {
  id: string
  name: string
  code: string
  address?: string
  phone?: string
  contractStart?: string
  contractEnd?: string
}

export const branches: Branch[] = [
  {
    id: "1",
    name: "สาขาสุขุมวิท",
    code: "BR-101",
    address: "แขวงคลองตัน เขตคลองเตย กรุงเทพฯ",
    phone: "02-123-4567",
    contractStart: "2026-01-01",
    contractEnd: "2026-12-31",
  },
  {
    id: "2",
    name: "สาขารามคำแหง",
    code: "BR-102",
    address: "แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ",
    phone: "02-234-5678",
  },
  {
    id: "3",
    name: "สาขาบางนา",
    code: "BR-103",
    address: "แขวงบางนา เขตบางนา กรุงเทพฯ",
    phone: "02-345-6789",
  },
]

export function getBranchById(id: string) {
  return branches.find((branch) => branch.id === id)
}

export interface DBStatisticItem {
  date: string
  value: number
}

export interface DBStatistic {
  records: DBStatisticItem[]
  income_with_commission: DBStatisticItem[]
  income_without_commission: DBStatisticItem[]
  commission: DBStatisticItem[]
  payments : any[]
}

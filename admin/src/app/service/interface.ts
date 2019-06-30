export interface OverviewPage {
    orders: OverviewPageItem,
    gain: OverviewPageItem
}

export interface OverviewPageItem {
    percent: number,
    compare: number,
    yesterday: number,
    isHigher: boolean
}

export interface AnalyticsPage {
    average: number
    chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
    gain: number
    order: number
    label: string
}

export interface AnalyticsPage {
    average: number
    chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
    gain: number 
    order: number
    label: string
}
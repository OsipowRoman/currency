export type Wallet = {
    code: string,
    name: string,
    amount: number,
    totalSpend: number,
    total?: number,
    date?: string,
    icon?: string,
    totalAmount?: number,
    persentDifference?: number,
    grow?: boolean,
    difference?: number
}

export interface AppContextType {
    wallet:Wallet[],
    currency:  Record<string, number>,
    loading: boolean,
    message?: any;
    notification?: any;
    modal?: any;
    codeCurrency: typeCodeCurrency[],
    addAsset: (newAsset: Wallet) => void,
    error: boolean,
    updateData: () => void,
    supportedCodes: currencyCodes[]
}

export type fieldTypes = {
    code?: string,
    coin?: string,
    amount?: number,
    price?: number,
    totalCost: number,
    name?: string 
}

export type typeCodeCurrency = {
    code: string,
    currency: string,
    country: string,
}

export type currencyCodes = [code: string, name: string]

export type ExchangeRates = Record<string, number>

export type currencyResponce = {
    data: Record<string, {
        code: string,
        value: number,
    }>
}
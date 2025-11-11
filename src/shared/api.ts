import { AppWallet, codeCurrency, Currency, supportedCodes} from "./data";
import type { typeCodeCurrency, ExchangeRates, Wallet, currencyResponce, currencyCodes } from "./types";

export function FakeFetchWallet(): Promise<Wallet[]> {
    return(
        new Promise(resolve => {
            setTimeout(() => {
                resolve(AppWallet)
            },4)
        })
    )
}


export function FakeFetchCurrency():Promise<ExchangeRates> {
    return(
        new Promise(resolve => {
            setTimeout(() => {
                resolve(Currency)
            },4)
        })
    )
}

export function FakeFetchCodeCurrency():Promise<typeCodeCurrency[]> {
    return(
        new Promise(resolve => {
            setTimeout(() => {
                resolve(codeCurrency)
            },4)
        })
    )
}
export function FakeSupportedCodes():Promise<currencyCodes[]> {
    return(
        new Promise(resolve => {
            setTimeout(() => {
                resolve(supportedCodes)
            },4)
        })
    )
}

export async function EnrichedData(codes: string[], Api_Key: string): Promise<currencyResponce>{
    const currencies = codes.join("%2C")
    const response = await fetch(`//api.currencyapi.com/v3/latest?apikey=${Api_Key}&currencies=${currencies}`);
    const data = await response.json();
    return data;
}

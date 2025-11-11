import { createContext, type ReactNode, useState, useEffect } from "react";
import {type AppContextType, type Wallet, type ExchangeRates, type currencyCodes} from "./types";
import { FakeFetchCurrency, FakeFetchWallet, FakeSupportedCodes } from "./api";
import { codeCurrency  }  from "./data";

const AppContext = createContext<AppContextType>({
    wallet: [],
    currency:{},
    loading: false,
    codeCurrency: codeCurrency,
    addAsset: () => {},
    error: false,
    updateData: () => {},
    supportedCodes: []
})


export function AppContextProvider({children}:{children:ReactNode}) {
    const [loading, setLoading] = useState(false)
    const [wallet, setWallet] = useState<Wallet[]>([])
    const [currency, setCurrency] = useState<ExchangeRates>({})
    const [trigger, setTrigger] = useState(1)
    const [supportedCodes, setSupportedCodes] = useState<currencyCodes[]>([])
    const [error, setError] = useState(false)

    const API_KEY = import.meta.env.VITE_API_KEY_EXCHANGERATE
    
  useEffect(() => {
  const preload = async () => {
    try {
      setError(false)
      setLoading(true)
      
      
      const [assets, resultData, supportedCodes] = await Promise.all([
        FakeFetchWallet(),
        FakeFetchCurrency(),
        FakeSupportedCodes(),
        // fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`),
        // fetch(` https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
      ])


      // if (!resultData.ok || !supportedCodes.ok) {
      //   throw new Error(`HTTP ${resultData.status}`)
      // }

      // const [result, supported] = await Promise.all([
      //   resultData.json(),
      //   supportedCodes.json(),
      // ])

      // console.log("Result", result)
      // console.log("Supported", supported)
      
      // if (result.result === 'error' || supported.result === "error") {
      //   setError(true)
      //   throw new Error(result['error-type'])
      // }

      setWallet(assets)
      setCurrency(resultData)
      setSupportedCodes(supportedCodes)
      // setSupportedCodes(supported['supported_codes'])
      // setCurrency(result.conversion_rates)
    } catch (err) {
      setError(true)
      console.log("catch")
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  preload()

}, [trigger])


function addAsset(newAsset: Wallet) {
  setWallet(prev => {
    const existing = prev.find(a => a.code === newAsset.code);
    
    return existing 
      ? prev.map(item => item.code === newAsset.code 
            ? { 
                ...item, 
                amount: item.amount + newAsset.amount,
                totalSpend: item.totalSpend + newAsset.totalSpend
              } : item
        ) : [...prev, newAsset];
  });
}

function updateData() {
  setTrigger(prev => prev + 1)
}

    return(
        <AppContext.Provider value={{wallet, currency, loading, codeCurrency, addAsset, error, updateData, supportedCodes}} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
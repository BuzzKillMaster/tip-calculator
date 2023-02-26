import Head from 'next/head'
import { BsFillPersonFill, BsCurrencyDollar } from "react-icons/bs";
import React, {useRef, useState} from "react";
import InputField from "@/components/InputField";
import TipSelection from "@/components/TipSelection";
import PriceOutput from "@/components/PriceOutput";
import TipData from "@/types/TipData";

const initialTipData: TipData = {
    price: 0,
    percentage: 0,
    people: 1
}

export default function Home() {
    const customTip = useRef(null)
    const [tipData, setTipData] = useState<TipData>(initialTipData)

    // prevent people from ever becoming 0...
    const numPeople = tipData.people > 0 ? tipData.people : 1

    // ...and price from being null or undefined
    const realPrice = isNaN(tipData.price) ? 0 : tipData.price

    const tipAmount = isNaN(tipData.percentage) ? 0 : realPrice * tipData.percentage / 100 / numPeople
    const total = (realPrice + tipAmount) / numPeople

    const selectTip = (value: number) => {
        setTipData({
            ...tipData,
            percentage: value === tipData.percentage ? 0 : value
        })

        if (customTip.current == document.activeElement) return

        // @ts-ignore
        customTip.current.value = null
    }

    const reset = () => {
        setTipData(initialTipData)
    }

    const handleCustomTip = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // TODO: Prevent this from matching shortcuts (i.e. Ctrl + R to refresh)
        if (!event.key.match(/[0-9]/) && event.key.length == 1) event.preventDefault()
    }


    return (
        <>
            <Head>
                <title>Splitter | Tip Calculator</title>
                <meta name="description"
                      content="The next-level tip calculator with a beautiful design that works across devices and screen sizes for quick and easy access."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={"bg-slate-800 min-h-screen w-screen py-8 px-4 text-white flex items-center justify-center flex-col"}>
                <h1 className={"text-5xl font-bold w-[4ch] font-mono mb-8"}>SPLI&#8203;TTER</h1>

                <form onSubmit={event => event.preventDefault()} className={"bg-slate-700 rounded-md shadow p-6 max-w-full w-[60rem] gap-6 md:flex"}>
                    <section className={"w-full md:w-1/2 flex flex-col justify-center"}>
                        <InputField handleChange={(value) => setTipData({...tipData, price: value})} title={"Cost of meal"} icon={<BsCurrencyDollar/>} id={"billInput"} placeholder={"0"}/>

                        <h2 className={"text-lg font-bold mb-4 mt-6"}>Tip percentage</h2>

                        <div className={"mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4"}>
                            <TipSelection handleClick={selectTip} value={5} tip={tipData.percentage}/>
                            <TipSelection handleClick={selectTip} value={10} tip={tipData.percentage}/>
                            <TipSelection handleClick={selectTip} value={15} tip={tipData.percentage}/>
                            <TipSelection handleClick={selectTip} value={25} tip={tipData.percentage}/>
                            <TipSelection handleClick={selectTip} value={50} tip={tipData.percentage}/>

                            <input ref={customTip} onKeyDown={handleCustomTip} onChange={event => selectTip(parseInt(event.target.value))} onFocus={(event) => selectTip(parseInt(event.target.value))} className={"bg-cyan-600 rounded-md text-lg font-semibold text-center focus:outline outline-2 outline-cyan-500 valid:bg-slate-600"} pattern={"0"} type="text" placeholder={"custom"}/>
                        </div>

                        <InputField handleChange={(value) => setTipData({...tipData, people: value})} title={"Number of people"} icon={<BsFillPersonFill/>} id={"personInput"} placeholder={"1"}/>
                    </section>

                    <section className={"w-full md:w-1/2 bg-cyan-800 rounded-md p-6 flex flex-col justify-between md:mt-0 mt-6"}>
                        <div>
                            <PriceOutput title={"Tip Amount"} subtitle={"/ person"} value={tipAmount}/>
                            <PriceOutput title={"Total"} subtitle={"/ person"} value={total}/>
                        </div>

                        <button onClick={reset} type={"reset"} className={"w-full bg-cyan-600 hover:bg-cyan-500 px-6 py-4 rounded-md font-bold text-lg"}>Reset</button>
                    </section>
                </form>

                {/*This is only really here in order to properly center the form*/}
                <p className={"text-5xl font-bold w-[4ch] font-mono mt-8 invisible hidden md:block"}>SPLI&#8203;TTER</p>
            </main>
        </>
    )
}

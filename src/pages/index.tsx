import Head from 'next/head'
import { BsFillPersonFill, BsCurrencyDollar } from "react-icons/bs";
import React, {MutableRefObject, useRef, useState, KeyboardEvent} from "react";
import InputField from "@/components/InputField";
import TipSelection from "@/components/TipSelection";
import PriceOutput from "@/components/PriceOutput";
import TipData from "@/types/TipData";
import NaNSafe from "@/helpers/NaNSafe";

const initialTipData: TipData = {
    price: 0,
    percentage: 0,
    people: 1
}

const tipValues = [5, 10, 15, 25, 50]

export default function Home() {
    const customTip = useRef() as MutableRefObject<HTMLInputElement>
    const [tipData, setTipData] = useState<TipData>(initialTipData)

    // prevent people from ever becoming 0...
    const numPeople = tipData.people > 0 ? tipData.people : 1
    const tipAmount = tipData.price * tipData.percentage / 100 / numPeople
    const total = (tipData.price + (tipAmount * numPeople)) / numPeople

    const selectTip = (value: number) => {
        setTipData({
            ...tipData,
            percentage: value === tipData.percentage ? 0 : value
        })

        if (customTip.current !== document.activeElement) {
            customTip.current.value = ""
        }
    }

    const reset = () => {
        setTipData(initialTipData)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        // TODO: Prevent this from matching shortcuts (i.e. Ctrl + R to refresh)
        if (!event.key.match(/[0-9]/) && event.key.length === 1) event.preventDefault()
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
                        <InputField handleKeyDown={handleKeyDown} handleChange={(value) => setTipData({...tipData, price: NaNSafe(value)})} title={"Cost of meal"} icon={<BsCurrencyDollar/>} id={"billInput"} placeholder={"0"}/>

                        <h2 className={"text-lg font-bold mb-4 mt-6"}>Tip percentage</h2>

                        <div className={"mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4"}>
                            {tipValues.map(value => (
                                <TipSelection key={value} value={value} tip={tipData.percentage} handleClick={selectTip}/>
                            ))}

                            <input ref={customTip} onKeyDown={handleKeyDown} onChange={event => selectTip(NaNSafe(parseInt(event.target.value)))} className={"bg-cyan-600 rounded-md text-lg font-semibold text-center focus:outline outline-2 outline-cyan-500 valid:bg-slate-600"} type="text" placeholder={"custom"}/>
                        </div>

                        <InputField handleKeyDown={handleKeyDown} handleChange={(value) => setTipData({...tipData, people: NaNSafe(value)})} title={"Number of people"} icon={<BsFillPersonFill/>} id={"personInput"} placeholder={"1"}/>
                    </section>

                    <section className={"w-full md:w-1/2 bg-cyan-800 rounded-md p-6 flex flex-col justify-between md:mt-0 mt-6"}>
                        <div>
                            <PriceOutput title={"Tip Amount"} value={tipAmount}/>
                            <PriceOutput title={"Total"} value={total}/>
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

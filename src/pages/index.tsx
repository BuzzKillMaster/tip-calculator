import Head from 'next/head'
import { BsFillPersonFill, BsCurrencyDollar } from "react-icons/bs";
import React, {useRef, useState} from "react";
import InputField from "@/components/InputField";
import TipSelection from "@/components/TipSelection";
import PriceOutput from "@/components/PriceOutput";

export default function Home() {
    const customTip = useRef(null)

    const [tip, setTip] = useState(0)
    const [price, setPrice] = useState(0)
    const [people, setPeople] = useState(1)

    // prevent people from ever becoming 0...
    const numPeople = people > 0 ? people : 1

    // ...and price from being null or undefined
    const realPrice = isNaN(price) ? 0 : price

    const tipAmount = isNaN(tip) ? 0 : realPrice * tip / 100 / numPeople
    const total = (realPrice + tipAmount) / numPeople

    const selectTip = (value: number) => {
        setTip(value == tip ? 0 : value)

        if (customTip.current == document.activeElement) return

        // @ts-ignore
        customTip.current.value = null
    }

    const reset = () => {
        setTip(0)
        setPrice(0)
        setPeople(1)
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
                        <InputField handleChange={setPrice} title={"Cost of meal"} icon={<BsCurrencyDollar/>} id={"billInput"} placeholder={"0"}/>

                        <h2 className={"text-lg font-bold mb-4 mt-6"}>Tip percentage</h2>

                        <div className={"mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4"}>
                            <TipSelection handleClick={selectTip} value={5} tip={tip}/>
                            <TipSelection handleClick={selectTip} value={10} tip={tip}/>
                            <TipSelection handleClick={selectTip} value={15} tip={tip}/>
                            <TipSelection handleClick={selectTip} value={25} tip={tip}/>
                            <TipSelection handleClick={selectTip} value={50} tip={tip}/>

                            <input ref={customTip} onKeyDown={handleCustomTip} onChange={event => selectTip(parseInt(event.target.value))} onFocus={(event) => selectTip(parseInt(event.target.value))} className={"bg-cyan-600 rounded-md text-lg font-semibold text-center focus:outline outline-2 outline-cyan-500 valid:bg-slate-600"} pattern={"0"} type="text" placeholder={"custom"}/>
                        </div>

                        <InputField handleChange={setPeople} title={"Number of people"} icon={<BsFillPersonFill/>} id={"personInput"} placeholder={"1"}/>
                    </section>

                    <section className={"w-full md:w-1/2 bg-cyan-800 rounded-md p-6 flex flex-col justify-between md:mt-0 mt-6"}>
                        <div>
                            <PriceOutput title={"Tip Amount"} subtitle={"/ person"} value={"$" + (Math.round(tipAmount * 100) / 100).toFixed(2)}/>
                            <PriceOutput title={"Total"} subtitle={"/ person"} value={"$" + (Math.round(total * 100) / 100).toFixed(2)}/>
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

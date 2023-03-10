import React, {KeyboardEvent, ReactNode,} from "react";

export default function InputField(props: {
    title: string
    id: string
    icon: ReactNode
    placeholder: string
    handleChange: (value: number) => void
    handleKeyDown: (event: KeyboardEvent) => void
}) {
    return (
        <>
            <label htmlFor={props.id} className={"text-lg font-bold mb-4 block"}><h2>{props.title}</h2></label>
            <div className={"relative flex items-center"}>
                <div className={"absolute pl-4 text-2xl"}>
                    {props.icon}
                </div>
                <input onKeyDown={props.handleKeyDown} onChange={event => props.handleChange(parseInt(event.target.value))} id={props.id} type="text" placeholder={props.placeholder} className={"pr-4 pl-14 py-4 text-right bg-slate-600 rounded-md text-lg font-semibold w-full focus:outline outline-2 outline-cyan-500"}/>
            </div>
        </>
    )
}
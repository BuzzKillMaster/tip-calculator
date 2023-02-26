export default function TipSelection(props: {
    value: number
    tip: number
    handleClick: (value: number) => void
}) {
    return (
        <div onClick={() => props.handleClick(props.value)} className={(props.value == props.tip ? "bg-cyan-600" : "bg-slate-600") + " py-4 hover:cursor-pointer hover:bg-cyan-500 rounded-md"}>
            <p className={"text-center font-semibold text-lg"}>{props.value}%</p>
        </div>
    )
}
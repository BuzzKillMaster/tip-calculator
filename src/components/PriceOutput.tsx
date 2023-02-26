export default function PriceOutput(props: {
    title: string
    value: number
}) {
    return (
        <div className={"flex justify-between items-center w-full mb-6"}>
            <div>
                <h2 className={"text-xl font-bold"}>{props.title}</h2>
                <p className={"text-sm font-semibold opacity-80"}>/ person</p>
            </div>

            <p className={"font-bold text-3xl"}>${(Math.round(props.value * 100) / 100).toFixed(2)}</p>
        </div>
    )
}
export default function PriceOutput(props: {
    title: string
    subtitle: string
    value: string
}) {
    return (
        <div className={"flex justify-between items-center w-full mb-6"}>
            <div>
                <h2 className={"text-xl font-bold"}>{props.title}</h2>
                <p className={"text-sm font-semibold opacity-80"}>{props.subtitle}</p>
            </div>

            <p className={"font-bold text-3xl"}>{props.value}</p>
        </div>
    )
}
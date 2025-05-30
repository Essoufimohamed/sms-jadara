export default function CardChart(props) {
    return (
        <>
            <div className="card bg-yellow-50 p-x-4 py-7 text-center border-2 rounded-lg min-w-xs shadow-md">
                <div className="text-5xl font-bold mb-2 ">{props.number}</div>
                <h2 className="text-base italic text-neutral-600 capitalize">
                    {props.title}
                </h2>
            </div>
        </>
    );
}

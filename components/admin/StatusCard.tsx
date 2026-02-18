type StatusTone = "total" | "pending" | "paid" | "ready" | "completed";

type StatusCardProps = {
    value: number;
    label: string;
    tone: StatusTone;
};

const toneClasses: Record<StatusTone, string> = {
    total: "bg-slate-100 text-slate-900",
    pending: "bg-amber-100 text-amber-900",
    paid: "bg-emerald-100 text-emerald-900",
    ready: "bg-sky-100 text-sky-900",
    completed: "bg-violet-100 text-violet-900",
};

const formatNumber = (value: number) => {
    return Intl.NumberFormat("en-US").format(value);
};

const StatusCard = ({ value, label, tone }: StatusCardProps) => {
    return (
        <article
            className={` p-5 border md:h-32  transition-all duration-200 hover:scale-[1.01] hover:shadow-md ${toneClasses[tone]}`}
        >
            <p className="text-3xl font-bold leading-tight">
                {formatNumber(value)}
            </p>
            <p className="mt-1 text-sm font-medium opacity-80">{label}</p>
        </article>
    );
};

export default StatusCard;

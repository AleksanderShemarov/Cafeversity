interface CashMachineBtnProps {
    text: string,
    className?: string,
    onClick?: () => void,
}


export default function CashMachineBtn({ text, className = "", onClick }: CashMachineBtnProps) {
    return (
        <div onClick={onClick}
            className={`
                p-[2rem] bg-blue-600 rounded-[1rem]
                text-[2rem] text-white font-[Consolas_monospace]
                ${className}
            `}
        >
            {text}
        </div>
    );
}

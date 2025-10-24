import Link from "next/link";


export default function OrderPage({ params }: { params: { orderNumber: string } }) {
    return (
        <>
            <p className="text-[1.8rem]">
                Замова нумар: {params.orderNumber}
            </p>
            <Link href={"/cafeManager/orders"}
                className="
                    text-[1.5rem] font-semibold no-underline
                    py-[0.5rem] px-[0.75rem] rounded-[0.5rem]
                    bg-blue-400 text-white
                "
            >
                Ўзад
            </Link>
        </>
    );
}

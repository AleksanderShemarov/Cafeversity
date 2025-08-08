export default function DishFullDetails({ params }: { params: { foodID: string } }) {
    return (
        <p style={{ fontSize: "2rem", fontWeight: "700" }}>
            {`This page will show a choisen dish (ID: ${params.foodID}) in details.`}
        </p>
    );
}

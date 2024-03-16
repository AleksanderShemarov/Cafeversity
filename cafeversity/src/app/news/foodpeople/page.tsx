type Prop = {
    id: string,
}

export default function FoodPeople ({ id }: Prop) {
    return (
        <div id={id}>
            <h1>Знакамітыя людзі аб Ежы</h1>
        </div>
    )
}

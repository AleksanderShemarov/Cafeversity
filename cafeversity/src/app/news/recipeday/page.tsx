type Prop = {
    id: string,
}

export default function RecipeDay ({ id }: Prop) {
    return (
        <div id={id}>
            <h1>Сённяшнія Рэцэпты</h1>
        </div>
    )
}

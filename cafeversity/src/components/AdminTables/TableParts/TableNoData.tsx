export interface NoDataComponentProps<T> {
    tableLoad: boolean,
    data: T[],
    searchType: string,
}

const NoDataComponent = <T extends { id: number }>({ tableLoad, data, searchType }: NoDataComponentProps<T>) => {
    return (
        <div style={{ width: "auto" }}>
            {
                !tableLoad && data.length === 0
                ?
                <p style={{ fontSize: "1.8rem", fontWeight: 600, textAlign: "center" }}>
                    Data aren&apos;t found. Click on the browser&apos;s &#34;Refresh&#34; button
                </p>
                :
                <p style={{ fontSize: "1.8rem", fontWeight: 600, textAlign: "center" }}>
                    No rows are found by &#34;<span style={{ textDecoration: "underline 2.5px" }}>
                        {searchType === "id"
                        ? searchType.toUpperCase() :
                        searchType.charAt(0).toUpperCase() + searchType.slice(1)}
                    </span>&#34; table&apos;s column
                </p>
            }
        </div>
    );
}

export { NoDataComponent };

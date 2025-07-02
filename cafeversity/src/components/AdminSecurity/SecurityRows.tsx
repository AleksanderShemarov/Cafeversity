type AdminSecurityProps = {
    securityID: number,
    securityName: string,
    securityData: string
}

const SecurityRows = ({ securityArray }: { securityArray: AdminSecurityProps[]}) => {
    return (
        <>
            {securityArray.map(arrayItem =>
                <div key={arrayItem.securityID}>
                    <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <div>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
                                {arrayItem.securityName}
                            </p>
                            <p style={{ fontSize: "1.5rem" }}>
                                {arrayItem.securityData}
                            </p>
                        </div>
                    </div>

                    <hr style={{ border: "1px solid", width: "100%", borderRadius: "0.5px" }} />
                </div>
            )}
        </>
    )
}

export default SecurityRows;

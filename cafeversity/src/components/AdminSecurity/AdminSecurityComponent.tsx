const AdminSecurityComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {children}
        </div>
    )
}

export default AdminSecurityComponent;

import { IconClock } from "@tabler/icons-react";


interface TableLoadingComponentProps {
    loadingText?: string
}

const TableLoadingComponent = ({ loadingText = "Data Loading..." }: TableLoadingComponentProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '8px'
        }}>
            <IconClock size={48} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '1.8rem', margin: '1rem 0 0', fontWeight: 600 }}>
                {loadingText}
            </p>
        </div>
    );
}

export { TableLoadingComponent };

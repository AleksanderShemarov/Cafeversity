import { ReactNode } from "react"


interface FormBlockTypes {
    className: string,
    children: ReactNode,
    action?: ((formaData: FormData) => void),
}


export default function FormBlock ({ className, children, action }: FormBlockTypes) {
    return (
        <form className={className} action={action}>
            {children}
        </form>
    )
}

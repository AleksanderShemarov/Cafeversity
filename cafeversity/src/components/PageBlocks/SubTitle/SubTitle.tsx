import SubTitleStyle from "./SubTitle.module.css";


export default function SubTitle({ name }: { name: string }) {
    return (
        <p className={SubTitleStyle.settingsSubTitle}>
            {name}
        </p>
    )
}

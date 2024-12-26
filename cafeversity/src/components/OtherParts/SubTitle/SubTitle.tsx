import SubTitleStyle from "@/components/OtherParts/SubTitle/SubTitle.module.css";


export default function SubTitle({ name }: { name: string }) {
    return (
        <p className={SubTitleStyle.settingsSubTitle}>
            {name}
        </p>
    )
}

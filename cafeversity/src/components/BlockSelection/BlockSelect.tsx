import { IconRosetteDiscountCheck } from "@tabler/icons-react";
import { CSSProperties } from "react";
import { UserFavouriteDishes } from "../DropArea/SortableAreaComponent";


export default function BlockSelect({ idName, isOutline, switcher, style, dishData, children }: {
    idName: string,
    isOutline: boolean,
    switcher: (index: string, dishData: UserFavouriteDishes) => void,
    style?: CSSProperties,
    dishData?: UserFavouriteDishes,
    children: React.ReactNode
}) {
    return (
        <div style={{ outline: isOutline ? "5px solid var(--accent-color)" : "none", position: "relative", ...style }}
            onClick={(e) => {
                e.stopPropagation();
                switcher(idName, dishData!)
            }}
        >
            <div style={{ display: isOutline ? "block" : "none", position: "absolute", top: -10, right: -10,
                zIndex: 1000
            }}>
                <IconRosetteDiscountCheck style={{ backgroundColor: "var(--accent-color)", borderRadius: "50%" }} />
            </div>
            {children}
        </div>
    );
}

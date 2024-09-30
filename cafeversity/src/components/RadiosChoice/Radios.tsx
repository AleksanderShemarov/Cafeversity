import radioStyle from "@/components/RadiosChoice/Radios.module.css";


export default function RadiosChoice() {
    return (
        <>
            <div id={radioStyle.radiosBlock}>
                <p id={radioStyle.describe_radios_name}>Choose one of the colours</p>
                {/* <div className={radioStyle.radios}> */}
                <form className={radioStyle.radios}>
                    <input type="radio" className={`${radioStyle.radio} ${radioStyle.radioLime}`}
                        id="LimePointer" name="color_pointer" value="Lime"
                    />
                    <input type="radio" className={`${radioStyle.radio} ${radioStyle.radioGold}`}
                        id="GoldPointer" name="color_pointer" value="Gold"
                    />
                    <input type="radio" className={`${radioStyle.radio} ${radioStyle.radioPurple}`}
                        id="PurplePointer" name="color_pointer" value="Purple"
                    />
                    <input type="radio" className={`${radioStyle.radio} ${radioStyle.radioSkyblue}`}
                        id="SkybluePointer" name="color_pointer" value="SkyBlue"
                    />
                    <input type="radio" className={`${radioStyle.radio} ${radioStyle.radioOrange}`}
                        id="OrangePointer" name="color_pointer" value="Orange"
                    />
                </form>
                {/* </div> */}
            </div>
        </>
    )
}

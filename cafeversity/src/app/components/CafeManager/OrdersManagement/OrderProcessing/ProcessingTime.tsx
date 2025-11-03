"use client";

import { useDishContext } from "./ChooseDishContext";
import { useProcessContext } from "./ProcessContext";


const dishProcessTime = [
    { dishTypeId: 1, processTime: (2 * 60) + 0 },// Гарачыя Стравы
    { dishTypeId: 3, processTime: (1 * 60) + 0 },// Салаты
    { dishTypeId: 4, processTime: (1 * 60) + 30 },// Супы
    { dishTypeId: 5, processTime: (1 * 60) + 0 },// Дэсерты
    { dishTypeId: 6, processTime: (0 * 60) + 30 },// Напоі
] as const;


export default function ProcessingTime() {

    const { selectedDish, selectedDishTypeId } = useDishContext();
    const { startProcessing, getProcessingDish } = useProcessContext();

    const currentDish = selectedDish ? getProcessingDish(selectedDish) : undefined
    const processTimeConfig = dishProcessTime.find(time => time.dishTypeId === selectedDishTypeId);

    // console.log("currentDish -->", currentDish);

    const startProcessingHandle = async () => {
        if (!selectedDish || !processTimeConfig) return;

        startProcessing(selectedDish, processTimeConfig.processTime);
    }
    
    // const [buttonClicked, setButtonClicked] = useState<boolean>(processingDish ? processingDish.isProcessingEnd : false);
    const getButtonState = () => {
        if (!selectedDish) return { disabled: true, text: "Абярыце Страву" };

        if (currentDish?.dishReady) {
            return { disabled: true, text: "Падрыхтавана" };
        }

        if (currentDish?.isProcessingStart) {
            return { disabled: true, text: "Ідзе Рыхтоўка" };
        }

        return { disabled: false, text: "Пачаць" }
    }
    const buttonState = getButtonState();

    const formattingTime = (processTime: number) => {
        // const hours = Math.floor(processTime / (60 * 60));
        const minutes = Math.floor(processTime % (60 * 60) / 60);
        const seconds = Math.floor(processTime % 60);
        return `${minutes > 0 ? `${minutes} хв.` : ""}${seconds > 0 ? ` ${seconds} с.` : ""}`;
    }

    return (
        <div className="
            h-[50%] w-[20%]
            px-[1rem] py-[0.5rem]
            border-3 border-[lightgray] rounded-[0.75rem]
        ">
            <p className="text-[1.8rem] font-extrabold text-center underline p-0 m-0 mb-[1rem]">Рыхтоўка</p>
            <p className="text-[1.6rem] font-medium text-center">
                {
                    processTimeConfig
                    ? `Час падрыхтоўкі: ${formattingTime(processTimeConfig.processTime)}`
                    : "–"
                }
            </p>
            <div className="flex items-center justify-center">
                <button type="button"
                    disabled={buttonState.disabled || selectedDishTypeId === 0}
                    className="
                        mx-auto my-[1rem] px-[1rem] py-[0.5rem] rounded-[0.75rem]
                        bg-orange-300 text-[1.6rem] font-bold text-white
                        hover:bg-white hover:outline-2 hover:outline-orange-300 hover:text-orange-300 hover:cursor-pointer
                        disabled:bg-orange-200 disabled:text-[lightgray] disabled:outline-1 disabled:outline-orange-200 disabled:cursor-not-allowed
                    "
                    onClick={startProcessingHandle}
                >
                    {buttonState.text}
                </button>
            </div>
        </div>
    );
}

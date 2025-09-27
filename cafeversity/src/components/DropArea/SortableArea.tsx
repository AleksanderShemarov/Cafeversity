"use client";

import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
    DragEndEvent, UniqueIdentifier,
} from "@dnd-kit/core";
import {
    arrayMove, SortableContext,
    sortableKeyboardCoordinates, verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableItem } from "./SortableItem";
import { useState, useEffect, useRef, startTransition } from "react";
import BlockSelect from "../BlockSelection/BlockSelect";
import { SortableAreaComponentProps, UserFavouriteDishes } from "./SortableAreaComponent";
import CardBlock from "../CardParts/CardBlock";
import CardImage from "../CardParts/CardImage";
import CardTitle from "../CardParts/CardTitle";
import CardButton from "../CardParts/CardButton";
import CardButtonsZone from "../CardParts/CardButtonsZone";
import { IconCheck, IconInfoSquareRounded, IconTrash, IconX } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import toggleFavourite from "@/app/actions/toggleFavourite";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
// import generateMessage from "../../../lib/utils/geminiAnswer";


const SortableArea = ({ favouriteDishes, otherDishes, selectedDishIds, onDishSelection }: SortableAreaComponentProps) => {
    
    const dishesBlocks = useTranslations("MainUserPage");
    
    const [items, setItems] = useState<UniqueIdentifier[]>([1, 2]);
    const [favourDishes, setFavourDishes] = useState(favouriteDishes);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over?.id && active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const [isHover, setIsHover] = useState<string|number|null>(null);

    const router = useRouter();
    const pathname = usePathname();
    const handleDishInfo = (id: string|number) => {
        router.push(`${pathname}/menu/${id}`, { scroll: false });
    }

    const deleteFavouDishRef = useRef<HTMLDialogElement>(null);
    const [dishIDRemove, setDishIDRemove] = useState<number>(0);
    const deleteFavouDishDialog = () => {
        deleteFavouDishRef.current?.showModal();
    }
    const handleDishOnRemove = (id: number) => {
        // alert(`Clicking on this trash icon with ID "${id}" will call ability\nfor removing one or more dishes from "Favourite Dishes" block`)
        startTransition(async () => {
            const answer = await toggleFavourite(pathname.split("/")[2], id);
            if (answer.success) {
                setDishIDRemove(0);
                closeDelete();
                setFavourDishes(prev => prev.filter(dish => dish.dishID !== id));
                toast.success(answer.message, { position: "top-right", style: { fontSize: "1.5rem" } });
            } else {
                setDishIDRemove(0);
                closeDelete();
                toast.error(answer.message, { position: "top-right", style: { fontSize: "1.5rem" } });
            }
        })
    }
    const closeDelete = () => {
        deleteFavouDishRef.current?.close();
    }


    const handleBlockSelects = (id: string, favouriteDish: UserFavouriteDishes) => {
        const identity = id.split("-")[1];
        onDishSelection(Number(identity), {
            food_name: favouriteDish.dishes.food_name,
            imagePath: favouriteDish.dishes.imagePath,
            food_portion: favouriteDish.dishes.food_portion,
            cost: favouriteDish.dishes.cost,
            checkedDish: favouriteDish.dishes.checkedDish,
        });
    }

    const isDishSelected = (dishId: number) => {
        return selectedDishIds.includes(dishId);
    };
    
    const dishesBlockSelects1 = (
        <>
            <div style={{
                display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "5rem",
                padding: "1rem 2rem", overflowX: "auto"
            }}>
                {favourDishes.map(favouriteDish =>
                    <BlockSelect key={`blockSelect-${favouriteDish.dishID}`}
                        idName={`blockSelect-${favouriteDish.dishID}`}
                        isOutline={isDishSelected(favouriteDish.dishID)}
                        switcher={handleBlockSelects}
                        style={{ borderRadius: "1.5rem" }}
                        dishData={favouriteDish}
                    >
                        <CardBlock height="18vh" width="21vw" style={{ outline: isDishSelected(favouriteDish.dishID) ? "none" : "2px solid lightgrey" }}>
                            <CardImage imagePath={favouriteDish.dishes.imagePath.slice(8)}
                                style={{ borderRadius: "1.5rem" }}
                                fill
                            />
                            <CardTitle title={favouriteDish.dishes.food_name}
                                style={{
                                    color: "black",
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 10,
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                    padding: "0.5rem",
                                    textAlign: "center",
                                    textWrap: "pretty"
                                }}
                            />
                            <CardButtonsZone style={{
                                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                                position: "absolute", top: 3, right: 3
                            }}>
                                <CardButton btnName={
                                    <IconInfoSquareRounded style={{
                                        width: "3rem", height: "3rem", color: isHover === `info-${favouriteDish.dishID}` ? "#2563EB" : "black",
                                    }} />
                                }
                                    btnId={favouriteDish.dishID}
                                    clicker={handleDishInfo}
                                    hovering={() => setIsHover(`info-${favouriteDish.dishID}`)}
                                    leaving={() => setIsHover(null)}
                                    style={{ boxShadow: isHover === `info-${favouriteDish.dishID}` ? "0px 0px 7px 4px #2563EB" : "none" }}
                                />
                                <CardButton btnName={
                                    <IconTrash style={{
                                        width: "3rem", height: "3rem", color: isHover === `delete-${favouriteDish.dishID}` ? "red" : "black"
                                    }} />
                                }
                                    btnId={favouriteDish.dishID}
                                    clicker={() => {
                                        setDishIDRemove(favouriteDish.dishID);
                                        deleteFavouDishDialog();
                                    }}
                                    hovering={() => setIsHover(`delete-${favouriteDish.dishID}`)}
                                    leaving={() => setIsHover(null)}
                                    style={{ boxShadow: isHover === `delete-${favouriteDish.dishID}` ? "0px 0px 7px 4px orangered" : "none" }}
                                />
                            </CardButtonsZone>
                        </CardBlock>
                    </BlockSelect>
                )}
            </div>
            
            <dialog ref={deleteFavouDishRef} style={{ borderRadius: "1.25rem", backgroundColor: "rgb(252, 242, 223)", border: "none" }}>
                <p style={{
                    textAlign: "center", fontSize: "1.8rem", fontWeight: 600, marginBottom: "1rem"
                }}>
                    {dishesBlocks("deleteFavouriteDialog.name")}
                </p>
                <p style={{
                    textAlign: "justify", fontSize: "1.5rem", fontWeight: 400, textIndent: "1.25rem"
                }}>
                    {dishesBlocks("deleteFavouriteDialog.question")}
                </p>
                <div style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto" }}>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: "green",
                            cursor: "pointer",
                        }}
                        onClick={() => handleDishOnRemove(dishIDRemove)}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconCheck style={{ height: "2rem", width: "2rem" }} />
                            <span style={{ textIndent: "5px" }}>{dishesBlocks("deleteFavouriteDialog.yes")}</span>
                        </div>
                    </button>
                    <button type="button"
                        style={{
                            border: "none",
                            borderRadius: "0.75rem",
                            height: "30px",
                            padding: "2px 5px",
                            color: "whitesmoke",
                            fontWeight: "600",
                            fontSize: "1.5rem",
                            backgroundColor: "red",
                            cursor: "pointer",
                        }}
                        onClick={closeDelete}
                    >
                        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                            <IconX style={{ height: "2rem", width: "2rem" }} />
                            <span style={{ textIndent: "5px" }}>{dishesBlocks("deleteFavouriteDialog.no")}</span>
                        </div>
                    </button>
                </div>
            </dialog>
        </>
    );

    const dishesBlockSelects2 = (
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-around", rowGap: "3rem", paddingBottom: "1.5rem" }}>
            {otherDishes.map(dish =>
                <BlockSelect key={`othersBlockSelect-${dish.dishID}`}
                    idName={`othersBlockSelect-${dish.dishID}`}
                    isOutline={isDishSelected(dish.dishID)}
                    switcher={handleBlockSelects}
                    style={{ borderRadius: "1.5rem" }}
                    dishData={dish}
                >
                    <CardBlock height="18vh" width="21vw" style={{ outline: isDishSelected(dish.dishID) ? "none" : "2px solid lightgrey" }}>
                        <CardImage imagePath={dish.dishes.imagePath === "" ? "/no_image1.jpg" : dish.dishes.imagePath.slice(8)}
                            style={{ borderRadius: "1.5rem" }}
                            fill
                        />
                        <CardTitle title={dish.dishes.food_name}
                            style={{
                                color: "black",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 10,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                padding: "0.5rem",
                                textAlign: "center",
                                textWrap: "pretty"
                            }}
                        />
                        <CardButtonsZone style={{
                            display: "inline-flex", alignItems: "center", gap: "0.75rem",
                            position: "absolute", top: 3, right: 3
                        }}>
                            <CardButton btnName={
                                <IconInfoSquareRounded style={{
                                    width: "3rem", height: "3rem", color: isHover === `info-${dish.dishID}` ? "#2563EB" : "black",
                                }} />
                            }
                                btnId={dish.dishID}
                                clicker={handleDishInfo}
                                hovering={() => setIsHover(`info-${dish.dishID}`)}
                                leaving={() => setIsHover(null)}
                                style={{ boxShadow: isHover === `info-${dish.dishID}` ? "0px 0px 7px 4px #2563EB" : "none" }}
                            />
                        </CardButtonsZone>
                    </CardBlock>
                </BlockSelect>
            )}
        </div>
    );

    const [geminiMessage, setGeminiMessage] = useState<string>("");
    const effectRan = useRef(false);
    useEffect(() => {
        if(effectRan.current === true) return;

        const fetchData = async () => {
            console.log("Going into useEffect");
            try {
                // const answer = await generateMessage("Explain me, please, what lacto-ovo vegetarianism is.");
                setGeminiMessage("Don't forget to connect AI again when You will be prepared!");
            }
            catch (error) {
                console.error("Failed to fetch message from Gemini:", error);
                setGeminiMessage("Could not load explanation.");
            }
        }

        fetchData();

        return () => {
            effectRan.current = true;
        }
    }, []);
    console.log("gemini's message ->", geminiMessage);

    const dishesBlockSelects3 = (<div>Dish Cards will be here at flex container</div>);

    // const threeParts = [dishesBlockSelects1, dishesBlockSelects2, dishesBlockSelects3];

    return (
        <div style={{
            width: "auto",
            margin: "0 auto",
            borderRadius: "1rem",
            padding: "0.5rem 0.5rem",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#f2dabfff"
        }}>
            <DndContext
                sensors={sensors}
                modifiers={[restrictToVerticalAxis]}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(id =>
                        <SortableItem key={id} idName={id} itemName={id === 1 ? dishesBlocks("dishesBlocks.favourite") : id === 2 ? dishesBlocks("dishesBlocks.todays") : `Sortable Component – ${id}`}>
                        {id === 1
                        ? (dishesBlockSelects1)
                        : id === 2
                        ? (dishesBlockSelects2)
                        : (dishesBlockSelects3)
                        }    
                        </SortableItem>
                    )}
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default SortableArea

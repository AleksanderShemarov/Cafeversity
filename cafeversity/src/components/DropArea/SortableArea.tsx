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
import { useState, useEffect, useRef } from "react";
import BlockSelect from "../BlockSelection/BlockSelect";
import { SortableAreaComponentProps, UserFavouriteDishes } from "./SortableAreaComponent";
import CardBlock from "../CardParts/CardBlock";
import CardImage from "../CardParts/CardImage";
import CardTitle from "../CardParts/CardTitle";
import CardButton from "../CardParts/CardButton";
import CardButtonsZone from "../CardParts/CardButtonsZone";
import { IconInfoSquareRounded, IconTrash } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
// import generateMessage from "../../../lib/utils/geminiAnswer";


const SortableArea = ({ favouriteDishes, selectedDishIds, onDishSelection }: SortableAreaComponentProps) => {
    
    const [items, setItems] = useState<UniqueIdentifier[]>([1, 2, 3]);

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
    const handleDishOnRemove = (id: string|number) => {
        alert(`Clicking on this trash icon with ID "${id}" will call ability\nfor removing one or more dishes from "Favourite Dishes" block`)
    }


    const handleBlockSelects = (id: string, favouriteDish: UserFavouriteDishes) => {
        const identity = id.split("-")[1];
        onDishSelection(Number(identity), {
            food_name: favouriteDish.dishes.food_name,
            imagePath: favouriteDish.dishes.imagePath,
            food_portion: favouriteDish.dishes.food_portion,
            cost: favouriteDish.dishes.cost
        });
    }

    const isDishSelected = (dishId: number) => {
        return selectedDishIds.includes(dishId);
    };
    
    const dishesBlockSelects = (
        <div style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}>
            {favouriteDishes.map(favouriteDish =>
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
                                clicker={handleDishOnRemove}
                                hovering={() => setIsHover(`delete-${favouriteDish.dishID}`)}
                                leaving={() => setIsHover(null)}
                                style={{ boxShadow: isHover === `delete-${favouriteDish.dishID}` ? "0px 0px 7px 4px orangered" : "none" }}
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
                        <SortableItem key={id} idName={id} itemName={id === 1 ? "Ўпадабаныя Стравы" : `Sortable Component – ${id}`}>
                        {id === 1
                            ? (
                                dishesBlockSelects
                            )
                            : (
                                <div>Dish Cards will be here at flex container</div>
                            )
                        }    
                        </SortableItem>
                    )}
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default SortableArea

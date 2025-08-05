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
import { useState } from "react";
import BlockSelect from "../BlockSelection/BlockSelect";
import { UserFavouriteDishes } from "./SortableAreaComponent";
import CardBlock from "../CardParts/CardBlock";
import CardImage from "../CardParts/CardImage";
import CardTitle from "../CardParts/CardTitle";
import CardButton from "../CardParts/CardButton";
import CardButtonsZone from "../CardParts/CardButtonsZone";
import { IconInfoSquareRounded, IconTrash } from "@tabler/icons-react";


const SortableArea = ({ favouriteDishes }: { favouriteDishes: UserFavouriteDishes[] }) => {

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
    const handleDishInfo = (id: string|number) => {
        alert(`There will be a small modal view (intercepting route) about a dish with ID: "${id}"`);
    }
    const handleDishOnRemove = (id: string|number) => {
        alert(`Clicking on this trash icon with ID "${id}" will call ability\nfor removing one or more dishes from "Favourite Dishes" block`)
    }

    const blockSelectIds = ["blockSelect-1", "blockSelect-2", "blockSelect-3"] as const;

    const [selctedBlock, setSelectedBlock] = useState<(string|number)[]>([]);
    const handleBlockSelects = (id: string | number) => {
        setSelectedBlock(prev => 
            prev.includes(id) ? prev.filter(item => item !== id)
            : [...prev, id]
        );
    }
    
    const dishesBlockSelects = (
        <div style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}>
            {blockSelectIds.map((id, index) =>
                <BlockSelect key={index}
                    idName={id}
                    isOutline={selctedBlock.includes(id)}
                    switcher={handleBlockSelects}
                    style={{ borderRadius: "1.5rem" }}
                >
                    <CardBlock height="18vh" width="21vw" style={{ outline: selctedBlock.includes(id) ? "none" : "2px solid lightgrey" }}>
                        <CardImage imagePath={favouriteDishes[index].dishes.imagePath.slice(8)}
                            style={{ borderRadius: "1.5rem" }}
                            fill
                        />
                        <CardTitle title={favouriteDishes[index].dishes.food_name}
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
                                    width: "3rem", height: "3rem", color: isHover === `info-${favouriteDishes[index].dishID}` ? "#2563EB" : "black",
                                }} />
                            }
                                btnId={`info-${favouriteDishes[index].dishID}`}
                                clicker={handleDishInfo}
                                hovering={() => setIsHover(`info-${favouriteDishes[index].dishID}`)}
                                leaving={() => setIsHover(null)}
                                style={{ boxShadow: isHover === `info-${favouriteDishes[index].dishID}` ? "0px 0px 7px 4px #2563EB" : "none" }}
                            />
                            <CardButton btnName={
                                <IconTrash style={{
                                    width: "3rem", height: "3rem", color: isHover === `delete-${favouriteDishes[index].dishID}` ? "red" : "black"
                                }} />
                            }
                                btnId={`delete-${favouriteDishes[index].dishID}`}
                                clicker={handleDishOnRemove}
                                hovering={() => setIsHover(`delete-${favouriteDishes[index].dishID}`)}
                                leaving={() => setIsHover(null)}
                                style={{ boxShadow: isHover === `delete-${favouriteDishes[index].dishID}` ? "0px 0px 7px 4px orangered" : "none" }}
                            />
                        </CardButtonsZone>
                    </CardBlock>
                </BlockSelect>
            )}
        </div>
    );

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

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


const SortableArea = () => {

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
                    <div style={{
                        height: "10vh", width: "10vw", borderRadius: "1.5rem",
                        backgroundColor: "lightgray"
                    }}></div>
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
                        <SortableItem key={id} idName={id} itemName={`Sortable Component – ${id}`}>
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

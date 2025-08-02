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
                    {items.map((id) =>
                        <SortableItem key={id} idName={id} itemName={`Sortable Component – ${id}`}>
                            <div>Dish Cards will be here at flex container</div>
                        </SortableItem>
                    )}
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default SortableArea

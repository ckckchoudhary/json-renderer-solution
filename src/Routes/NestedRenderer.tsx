import React from "react";
import { NestedJson } from "../Models/NestedJson";
import { Accordion } from "../widgets/Accordion/Accordion";


interface NestedRendererProps {
    data: Array<NestedJson>;
    fetchCountiesForContinent(code: string): void;
}

export const NestedRenderer: React.FC<NestedRendererProps> = ({ data, fetchCountiesForContinent }) => {

    const handleAccordionToggle = (isOpen: boolean, children: Array<NestedJson>, code?: string,) => {
        if (isOpen && code && children?.length === 0) {
            fetchCountiesForContinent(code);
        }
    }

    return <div>
        {
            data.map((currentData) => {
                const { children, name, code } = currentData;
                // passing name as key, assuming that the names will be unique among siblings
                return (<Accordion key={name} title={name} code={code}
                    handleClick={(isOpen: boolean) => handleAccordionToggle(isOpen, children, code)} >
                    {(currentData.children && currentData.children.length > 0) &&
                        <NestedRenderer data={children} fetchCountiesForContinent={fetchCountiesForContinent} />
                    }
                </Accordion>)
            })
        }
    </div>
}

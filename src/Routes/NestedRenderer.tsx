import React, { useContext } from "react";
import { UiContext } from "../Contexts/UiContexts";
import { NestedJson } from "../Models/NestedJson";
import { Accordion } from "../widgets/Accordion/Accordion";



interface NestedRendererProps {
    data: Array<NestedJson>;
    fetchCountiesForContinent(code: string): void;
}

export const NestedRenderer: React.FC<NestedRendererProps> = ({ data, fetchCountiesForContinent }) => {
    const { shouldAllAccordionsBeClosed, setHideAllAccordionsFlag, unSetHideAllAccordionsFlag } = useContext(UiContext);

    const handleAccordionToggle = (isOpen: boolean, children: Array<NestedJson>, code?: string,) => {
        if (isOpen && code && children?.length === 0) {
            fetchCountiesForContinent(code);
        }
        if (!code && (!children || children.length === 0)) {
            setHideAllAccordionsFlag();
        } else {
            unSetHideAllAccordionsFlag();
        }
    }


    return <div>
        {
            data.map((currentData) => {
                const { children, name, code } = currentData;
                const shouldShowCaret = Boolean(code || (children && children.length > 0));
                // passing name as key, assuming that the names will be unique among siblings
                return (<Accordion key={name} title={name} shouldShowCaret={shouldShowCaret}
                    isAllClosed={shouldAllAccordionsBeClosed} handleClick={(isOpen: boolean) => handleAccordionToggle(isOpen, children, code)} >
                    {(currentData.children && currentData.children.length > 0) &&
                        <NestedRenderer data={children} fetchCountiesForContinent={fetchCountiesForContinent} />
                    }
                </Accordion>)
            })
        }
    </div>
}

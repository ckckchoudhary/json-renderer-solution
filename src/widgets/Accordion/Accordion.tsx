import React, { useContext, useState } from "react";
import "./Accordion.css";
import caret from "../../assets/icons/caret.png";
import { UiContext } from "../../Contexts/UiContexts";

interface AccordionProps {
    title: string;
    handleClick(localIsAccordionOpenFlag: boolean): void;
    code?: string;
}


export const Accordion: React.FC<AccordionProps> = ({ children, title, handleClick, code }) => {

    const { shouldAllAccordionsBeClosed, setHideAllAccordionsFlag, unSetHideAllAccordionsFlag } = useContext(UiContext);
    const [localIsAccordionOpenFlag, setlocalIsAccordionOpenFlag] = useState(false);


    const toggleAccordion = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (code || children) {
            if (shouldAllAccordionsBeClosed) {
                unSetHideAllAccordionsFlag();
            } else {
                handleClick(!localIsAccordionOpenFlag);
            }
            setlocalIsAccordionOpenFlag(!localIsAccordionOpenFlag);
        } else {
            setHideAllAccordionsFlag();
        }
    }
  
    React.useEffect(()=>{
        setlocalIsAccordionOpenFlag(false);
    },[shouldAllAccordionsBeClosed])

    const isOpen = localIsAccordionOpenFlag && !shouldAllAccordionsBeClosed;
    return (
        <div className={`accordionContainer${(isOpen && children) ? " open" : ""}`} onClick={toggleAccordion}>
            <div className="accordionHeader">
                <img src={caret} className="caret" alt="close-accordion" />
                <span>{title}</span>
            </div>
            {(isOpen) &&
                <>{children}</>
            }
        </div>)
}
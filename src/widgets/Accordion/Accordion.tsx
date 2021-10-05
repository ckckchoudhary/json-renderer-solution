import React, { useState } from "react";
import "./Accordion.css";
import caret from "../../assets/icons/caret.png";

interface AccordionProps {
    title: string;
    handleClick(localIsAccordionOpenFlag: boolean): void;
    isAllClosed: boolean;
    shouldShowCaret?:boolean
}


export const Accordion: React.FC<AccordionProps> = ({ children, title, handleClick, isAllClosed, shouldShowCaret }) => {

    const [localIsAccordionOpenFlag, setlocalIsAccordionOpenFlag] = useState(false);


    const toggleAccordion = (event: React.MouseEvent) => {
        event.stopPropagation();
        handleClick(!localIsAccordionOpenFlag);
        setlocalIsAccordionOpenFlag(!localIsAccordionOpenFlag);
    }

    React.useEffect(() => {
        if (isAllClosed) {
            setlocalIsAccordionOpenFlag(false);
        }
    }, [isAllClosed])

    return (
        <div className={`accordionContainer${(localIsAccordionOpenFlag && children) ? " open" : ""}`} onClick={toggleAccordion}>
            <div className="accordionHeader">
                {shouldShowCaret &&  <img src={caret} className="caret" alt="close-accordion" />}
                <span>{title}</span>
            </div>
            {(localIsAccordionOpenFlag) &&
                <>{children}</>
            }
        </div>)
}
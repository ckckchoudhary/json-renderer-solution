import { createContext } from "react";

export const UiContext = createContext({
    shouldAllAccordionsBeClosed: false,
    setHideAllAccordionsFlag: () => { },
    unSetHideAllAccordionsFlag: () => { }
});
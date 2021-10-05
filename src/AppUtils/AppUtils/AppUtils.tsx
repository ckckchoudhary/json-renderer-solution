import clone from "just-clone";
import { AnyAction } from "redux";
import { CountriesState } from "../../Models/CountriesState";

export class AppUtils {
    
    static parseApiResponseForNestedRenderer(state: CountriesState, action: AnyAction) {
        const { continentCode, data: { data: { continent: { countries } } } } = action;
        const requiredContinent = state.data.find(({ code }) => code === continentCode);
        if (requiredContinent && requiredContinent?.children) {
            requiredContinent.children = countries.map((c: any) => {
                return {
                    name: c.name,
                    children: c.languages
                }
            });
        }
        const newState = clone(state);
        return newState;
    }
}
import { createContext, useContext, useReducer, Reducer } from 'react';
import { createContainer } from 'react-tracked';
import { applyMiddleware } from 'redux';
// import initialStateValue from './initial-state';
import initialStateValue from '../../config/player.json'
import config from '../../config/endpoints.json'
const playgrdURL = config.playgroundURL;

const sendRequest = async () => {
    let url = playgrdURL;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
        "Content-Type": "text/plain"
        }
    };
    console.log(`--> Try to fetch data from API`);
    let response;
    await fetch(url, {
        method: 'GET',
        headers: {
        "Content-Type": "text/plain"
        }
    }).then(response => response.text())
    .then(data => {
        console.log(`--> Fetched data`);
        response = data;
        return response;
    }).catch(error => {
        console.log(error);
        return false;
        // this.setState({error : error});
    });
    console.log(`--> Finished fetch`);
};

// var realdata = sendRequest();
// console.log("realdata-------------", realdata);

export const StateContext = createContext([]);
export type State = typeof initialState;
export var initialState = initialStateValue;
// export const initialState = sendRequest();

console.log('--> Init data --> ', initialState);

export enum actions {
    SET_ACTIVE_PLAYER,
    SET_MOUSEOVER_PLAYER,
    SET_MOUSEOUT_PLAYER,
    SET_LOADING,
    SET_PLAYERS_VISIBLE,
    SET_ACTIVE_TEAM,
    SET_TEAM_FORMATION,
}

type Action = {
    type: actions;
    value: string | number | boolean | null;
};

export const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case actions.SET_ACTIVE_PLAYER: {
            const activePlayerId = action.value === state.activePlayerId ? null : action.value;
            return { ...state, activePlayerId, mouseOverPlayerId: null };
        }

        case actions.SET_MOUSEOVER_PLAYER: {
            return { ...state, mouseOverPlayerId: action.value };
        }

        case actions.SET_MOUSEOUT_PLAYER: {
            return { ...state, mouseOverPlayerId: null };
        }

        case actions.SET_LOADING: {
            return { ...state, isLoading: action.value as boolean };
        }

        case actions.SET_PLAYERS_VISIBLE: {
            return { ...state, playersVisible: action.value as boolean };
        }

        case actions.SET_ACTIVE_TEAM: {
            const { teams } = state;
            const teamIndex = teams.findIndex((t) => t.id === action.value);
            return {
                ...state,
                activeTeamId: action.value as number,
                activeFormationId: teams[teamIndex].formationId,
            };
        }

        case actions.SET_TEAM_FORMATION: {
            const { teams } = state;
            const teamIndex = teams.findIndex((t) => t.id === state.activeTeamId);
            teams[teamIndex].formationId = action.value as number;
            return { ...state, teams, activeFormationId: action.value as number };
        }

        default:
            return state;
    }
};

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);

export const useStateValue = () => useContext(StateContext);
export const { Provider, useTracked } = createContainer(useValue);

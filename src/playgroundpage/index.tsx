import React, { useEffect, useRef, useState } from 'react';
import { flatten } from 'lodash';
import Field from './Field';
import TeamList from './TeamList';
import Players from './Players';
import Stage from './Stage';
import Drawer from './Drawer';
import Tabs from './Tabs';
import MatchTitle from './MatchTitle';
import Disclaimer from './Disclaimer';
import Formations from './Formations';
import { Layout, Sidebar as LayoutSidebar, Main as LayoutMain } from './Layout1';
import { useTracked, actions } from './state';

const Index = (data) => {
    const [{ teams, isLoading, activePlayerId }, dispatch]: any = useTracked();
    const loaded = useRef(0);
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const isLoadingRef = useRef(isLoading);
    const playerImages = flatten([...teams.map((t) => [...t.players.map((p) => p.thumbnail)])]);
    const images = [];

    for (let i = 0; i < playerImages.length; i++) {
        images[i] = new Image();
        images[i].src = `/img/${playerImages[i]}`;
        images[i].onload = () => {
            loaded.current = loaded.current + 1;

            if (loaded.current === playerImages.length) {
                setIsLoadingImages(false);
            }
        };
    }
    // console.log(' Tested Data --> ', data);

    useEffect(() => {
        if (isLoadingImages) return;
        dispatch({ type: actions.SET_LOADING, value: false });
    }, [isLoadingImages, dispatch]);

    useEffect(() => {
        // Allow the elements to animate in...
        if (isLoadingRef.current && !isLoading) {
            setTimeout(() => dispatch({ type: actions.SET_PLAYERS_VISIBLE, value: true }), 600); // todo - themify
        }
        isLoadingRef.current = isLoading;
    }, [isLoading, dispatch]);

    const handleClick = () => {
        if (activePlayerId) {
            dispatch({ type: actions.SET_ACTIVE_PLAYER, value: null });
        }
    };

    return (
        <Layout>
            <LayoutSidebar>
                {/* <img src="/img/logo.svg" alt="Fantasy Football" /> */}
                <img src="/img/stocksfc.png" alt="Fantasy Football" />
                {/* <Tabs /> */}
                <TeamList />
                <Disclaimer />
            </LayoutSidebar>
            <LayoutMain onClick={handleClick}>
                <MatchTitle />
                {/* <Formations /> */}
                <Stage>
                    <Field>
                        <Players />
                    </Field>
                </Stage>
            </LayoutMain>
            <Drawer />
        </Layout>
    );
};

export default Index;

import React, { useContext, createContext, useState } from "react";

interface Props {
    children: React.ReactElement;
}

const WatchListContext = createContext();

export const useWatchList = () => useContext(WatchListContext);

const WatchListProvider = ({ children }: Props) => {
    const [watchListCoinIds, setWatchListCoinIds] = useState([]);

    return <WatchListContext.Provider value={{ watchListCoinIds }}>{children}</WatchListContext.Provider>;
};

export default WatchListProvider;

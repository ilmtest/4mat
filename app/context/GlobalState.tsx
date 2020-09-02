import { getAllShortcuts } from '@ilmtest/ilmtest-sdk-js';
import { ipcRenderer } from 'electron';
import React, { ReactNode, useEffect, useState } from 'react';
import SettingsContext from './SettingsContext';

type Props = {
  children: ReactNode;
};

const GlobalState = ({ children }: Props) => {
  const [shortcuts, setShortcuts] = useState({});
  const [applyRules, setApplyRules] = useState(true);
  const [fixQuotes, setFixQuotes] = useState(true);
  const [reduceSpaces, setReduceSpaces] = useState(true);
  const [condenseMultilines, setCondenseMultilines] = useState(true);
  const [singleToDoubleQuotes, setSingleToDoubleQuotes] = useState(true);
  const [monitorClipboard, setMonitorClipboard] = useState(false);

  const reload = async () => {
    console.log('Reload shortcuts');
    const { data } = await getAllShortcuts();
    setShortcuts(data);
    localStorage.setItem('shortcuts', JSON.stringify(data));
    console.log('Saved shortcuts');

    const myNotification = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet',
    });
  };

  const keyToFunction = {
    reload,
    applyRules: setApplyRules,
    fixQuotes: setFixQuotes,
    reduceSpaces: setReduceSpaces,
    condenseMultilines: setCondenseMultilines,
    singleToDoubleQuotes: setSingleToDoubleQuotes,
    monitorClipboard: setMonitorClipboard,
  };

  useEffect(() => {
    ipcRenderer.on('setting', (_, type, value) => {
      keyToFunction[type](value);
    });

    const cachedShortcuts = localStorage.getItem('shortcuts');

    if (cachedShortcuts) {
      console.log('Cached shortcuts detected');
      setShortcuts(JSON.parse(cachedShortcuts));
    } else {
      reload();
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        applyRules,
        shortcuts,
        fixQuotes,
        reduceSpaces,
        condenseMultilines,
        singleToDoubleQuotes,
        monitorClipboard,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default GlobalState;

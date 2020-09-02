import clipboard from 'electron-clipboard-extended';
import React, { useContext, useEffect, useState } from 'react';
import SettingsContext from '../context/SettingsContext';
import styles from './Home.css';
import * as sdk from './sdkUtils';

const formatText = (context: any, body: string) => {
  const formatted = [
    'fixSalutations',
    'fixQuotes',
    'condenseMultilines',
    'reduceSpaces',
    'singleToDoubleQuotes',
  ].reduce((result, key: string) => {
    return context[key] ? (sdk as any)[key](result) : result;
  }, sdk.applyRules(context.applyRules ? context.shortcuts : {}, body));

  return formatted.trim();
};

export default function Home(): JSX.Element {
  const [body, setBody] = useState('');
  const context: any = useContext(SettingsContext);
  const { monitorClipboard } = context;

  useEffect(() => {
    clipboard.stopWatching();
    clipboard.off('text-changed');

    const formatClipboard = () => {
      const copiedText = clipboard.readText();
      const formatted = formatText(context, copiedText);

      if (copiedText !== formatted) {
        clipboard.writeText(formatted);
      }
    };

    if (monitorClipboard) {
      console.log('Monitoring clipboard...');
      clipboard.on('text-changed', formatClipboard).startWatching();
    }

    return clipboard.stopWatching;
  }, [monitorClipboard, context]);

  const format = () => {
    const formatted = formatText(context, body);

    if (body !== formatted) {
      setBody(formatted);
    }
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(e.target.value);

  return (
    <div className={styles.container} data-tid="container">
      <textarea onChange={onTextChanged} value={body} />
      <button type="button" onClick={format}>
        4mat
      </button>
    </div>
  );
}
